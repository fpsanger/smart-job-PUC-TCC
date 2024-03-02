import { AbstractControl, ValidatorFn } from '@angular/forms';

export function NumeroDocumentoValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    console.log(control.value);
    const cpfCnpj = control.value;
    if (cpfCnpj.length === 11) {
      if (!validarCPF(cpfCnpj)) {
        return { cpfInvalido: true };
      }
    } else if (cpfCnpj.length === 14) {
      if (!validarCNPJ(cpfCnpj)) {
        return { cnpjInvalido: true };
      }
    }
    return null;
  };
}

function validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]/g, '');

  if (cpf.length !== 11) {
    return false;
  }

  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = 11 - (sum % 11);
  let digit = remainder >= 10 ? 0 : remainder;

  if (parseInt(cpf.charAt(9)) !== digit) {
    return false;
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = 11 - (sum % 11);
  digit = remainder >= 10 ? 0 : remainder;

  if (parseInt(cpf.charAt(10)) !== digit) {
    return false;
  }

  return true;
}

function validarCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/[^\d]/g, '');

  if (cnpj.length !== 14) {
    return false;
  }

  if (/^(\d)\1{13}$/.test(cnpj)) {
    return false;
  }

  let sum = 0;
  let weight = 5;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpj.charAt(i)) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  let remainder = sum % 11;
  let digit = remainder < 2 ? 0 : 11 - remainder;

  if (parseInt(cnpj.charAt(12)) !== digit) {
    return false;
  }

  sum = 0;
  weight = 6;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cnpj.charAt(i)) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  remainder = sum % 11;
  digit = remainder < 2 ? 0 : 11 - remainder;

  if (parseInt(cnpj.charAt(13)) !== digit) {
    return false;
  }

  return true;
}
