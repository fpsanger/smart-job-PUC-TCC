import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-vaga',
  templateUrl: './cadastro-vaga.component.html',
  styleUrls: ['./cadastro-vaga.component.css'],
})
export class CadastroVagaComponent implements OnInit {
  tipoVagas = [
    { name: 'Temporário', value: 1 },
    { name: 'Curta duração', value: 2 },
    { name: 'Sazonal', value: 3 },
  ];

  selectedVaga: any;
  text1: string;

  constructor() {}

  ngOnInit(): void {}
}
