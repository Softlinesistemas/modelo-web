import { BuscadorResultado } from './BuscadorResultado';

export const fetchMockResults = async (filters: any): Promise<BuscadorResultado[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          nome: 'João da Feira',
          descricao: 'Agricultor familiar que vende produtos orgânicos',
          localizacao: 'São Paulo',
          tipo: filters.tipo || 'amigos',
          id: ''
        },
        {
          nome: 'Grupo Agroecológico de Minas',
          descricao: 'Comunidade focada em agroflorestas',
          localizacao: 'Belo Horizonte',
          tipo: 'grupos',
          id: ''
        },
        {
          nome: 'Máquinas Verdes',
          descricao: 'Venda e manutenção de tratores e colheitadeiras',
          localizacao: 'São Paulo',
          tipo: 'fornecedores',
          id: ''
        },
        {
          nome: 'AgroSoluções',
          descricao: 'Serviços técnicos para irrigação e automação',
          localizacao: 'Goiás',
          tipo: 'clientes',
          id: ''
        },
        {
          nome: 'Mercado do Campo',
          descricao: 'Cliente atacadista de produtos naturais',
          localizacao: '',
          tipo: 'clientes',
          id: ''
        },
        {
          nome: 'Mercado do Campo',
          descricao: 'Cliente atacadista de produtos naturais',
          localizacao: '',
          tipo: 'clientes',
          id: ''
        },
      ]);
    }, 500);
  });
};