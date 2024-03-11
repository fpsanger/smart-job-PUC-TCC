import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MenuItem, MessageService } from 'primeng/api';
import { IVaga } from 'src/app/interfaces/vaga.interface';
import { VagaService } from 'src/app/services/vaga.service';

@Component({
  selector: 'app-cadastro-vaga',
  templateUrl: './cadastro-vaga.component.html',
  styleUrls: ['./cadastro-vaga.component.css'],
})
export class CadastroVagaComponent implements OnInit, OnChanges {
  @Input() vaga: IVaga;

  tipoVagas = [
    { name: 'Temporário', value: 'Temporário' },
    { name: 'Curta duração', value: 'Curta duração' },
    { name: 'Sazonal', value: 'Sazonal' },
  ];

  form: UntypedFormGroup;

  idEmpresa: number;

  items: MenuItem[];
  home: MenuItem;

  constructor(
    private _vagaService: VagaService,
    private _formBuilder: FormBuilder,
    private _datePipe: DatePipe,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {
    const item = localStorage.getItem('user');
    this.idEmpresa = JSON.parse(item).idUsuario;

    this.items = [{ label: 'Cadastro de vagas' }];

    this.home = { icon: 'pi pi-home', routerLink: '/empresa/inicial' };

    this.form = this._formBuilder.group({
      nomeVaga: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      remuneracao: [null, [Validators.required]],
      endereco: [null, [Validators.required]],
      estado: [null, [Validators.required]],
      cidade: [null, [Validators.required]],
      tipoVaga: [null, [Validators.required]],
      dataExpiracao: [null, [Validators.required]],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['vaga']?.currentValue) {
      this._setDadosIniciais();
    }
  }

  salvarVaga() {
    const data = {
      Id: this.vaga?.Id,
      Nome: this.form.get('nomeVaga').value as string,
      Descricao: this.form.get('descricao').value as string,
      Cidade: this.form.get('cidade').value as string,
      Endereco: this.form.get('endereco').value as string,
      Estado: this.form.get('estado').value as string,
      Remuneracao: this.form.get('remuneracao').value as string,
      TipoVaga: this.form.get('tipoVaga').value as string,
      Ativo: true,
      DataAtualizacao: this._datePipe.transform(new Date()),
      DataExpiracao: this._datePipe.transform(
        this.form.get('dataExpiracao').value
      ),
      IdEmpresa: this.idEmpresa,
    } as IVaga;

    if (this.vaga?.Id) {
      this._vagaService.editarVaga(data).subscribe({
        next: () =>
          this._messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Vaga editada com sucesso',
          }),
        error: (err) =>
          this._messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: err,
          }),
      });
    } else {
      this._vagaService.adicionarVaga(data).subscribe({
        next: () =>
          this._messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Vaga adicionada com sucesso',
          }),
        error: (err) =>
          this._messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: err,
          }),
      });
    }
  }

  private _setDadosIniciais() {
    this.form.patchValue({
      nomeVaga: this.vaga?.Nome,
      descricao: this.vaga?.Descricao,
      remuneracao: this.vaga?.Remuneracao,
      endereco: this.vaga?.Endereco,
      estado: this.vaga?.Estado,
      cidade: this.vaga?.Cidade,
      tipoVaga: this.vaga?.TipoVaga,
      dataExpiracao: new Date(this.vaga?.DataExpiracao),
    });
  }
}
