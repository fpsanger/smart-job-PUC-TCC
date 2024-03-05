import { Component, OnInit } from '@angular/core';
import { VagaService } from '../services/vaga.service';
import { IVaga } from '../interfaces/vaga.interface';

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

  nomeVaga: string = ' ';
  remuneracao: string = ' ';
  descricao: string = ' ';

  selectedVaga: any = ' ';
  text1: string = ' ';

  constructor(private _vagaService: VagaService) {}

  ngOnInit(): void {}

  adicionarVaga() {
    const data = {
      Nome: this.nomeVaga,
      Remuneracao: this.remuneracao,
      TipoVaga: this.selectedVaga,
      Ativo: true,
      Cidade: 'SP',
      Estado: 'SP',
      DataAtualizacao: new Date(),
      DataExpiracao: new Date(),
      Descricao: this.descricao,
      Endereco: 'Rua ENdereco',
      IdEmpresa: 1,
    } as IVaga;
    this._vagaService.adicionarVaga(data).subscribe();
  }
}
