export interface IVaga {
  Nome: string;
  Descricao: string;
  Remuneracao: string;
  Endereco: string;
  Estado: string;
  Cidade: string;
  Ativo: boolean;
  TipoVaga: string;
  DataAtualizacao: string;
  DataExpiracao: string;
  IdEmpresa?: number;
}
