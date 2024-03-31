export interface IVaga {
  Id?: number;
  Nome: string;
  Descricao: string;
  Remuneracao: number;
  Endereco: string;
  Estado: string;
  Cidade: string;
  Ativo: boolean;
  TipoVaga: string;
  DataAtualizacao: string;
  DataExpiracao: string;
  IdEmpresa?: number;
  Status: number;
  LimiteTrabalhadores: number;
  Telefone: string;
  Email: string;
}
