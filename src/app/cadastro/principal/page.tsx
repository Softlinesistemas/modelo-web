'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MainBanner } from '@/components/MainBanner';
import Link from 'next/link';

interface MainCadastroData {
  nome: string;
  email: string;
  cpf: string;
  // … outros campos
}

type Tipo = {
  slug: string;
  label: string;
  description: string;
  color: string;
  hoverColor: string;
};

const tipos: Tipo[] = [
  {
    slug: 'autonomo',
    label: 'Pessoa Jurídica – Autônomo / Beneficiário',
    description: `CNPJ – Data de Abertura – Endereço – CEP – Bairro – Cargo/Função – Responsáveis (Participantes de Grupos Diversos; Clientes de Serviços & Produtos; Órgãos Públicos; Filiais; Escolas; Universidades; Mercadinho; Hotéis; Cozinhas; Distribuidoras etc.)`.trim(),
    color: 'bg-yellow-500',
    hoverColor: 'bg-yellow-600',
  },
  {
    slug: 'fornecedor-pf',
    label: 'Fornecedor Pessoa Física',
    description: `Profissionais Autônomos de Serviços & Produtos:Carro-do-Ovo; Colheitior Manual; Roçador; Motorista; Mecânico; Diarista; Eletricista; Bebidas; Comidas;                   Água; Refrigeração etc. COM ou SEM DELIVERY – Entrega ao cliente`.trim(),    color: 'bg-green-500',
    hoverColor: 'bg-green-600',
  },
  {
    slug: 'fornecedor-pj',
    label: 'Fornecedor PJ / CAF',
    description:  `Agricultura Familiar; Cooperativas; Lojas; AgroPecuária;                   Indústrias; AgroTurismo; Café da Manhã; Restaurantes; Mercados;                   Hotéis; Cozinhas; Distribuidoras etc. COM ou SEM DELIVERY – Entrega ao cliente`.trim(),
    color: 'bg-blue-500',
    hoverColor: 'bg-blue-600',
  },
  {
    slug: 'corporativo',
    label: 'Pessoa Jurídica Corporativo (White‑Label)',    
    description: `Instituições; Órgãos Públicos; Indústrias; Empresas; Redes de Escolas; Cooperativas;                   Consórcios etc. (Que têm Funcionário/RH e/ou Estudantes.)                   *Pode colocar sua marca no BANNER do seu beneficiário.                  AVISOS/PopUp a qualquer momento`.trim(),
    color: 'bg-purple-500',
    hoverColor: 'bg-purple-600',
  },
];

export default function CadastroTiposPage() {
  const router = useRouter();
  const [mainData, setMainData] = useState<MainCadastroData | null>(null);
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  useEffect(() => {
    const json = localStorage.getItem('cadastroPrincipal');
    if (!json) {
      router.replace('/cadastro/principal');
      return;
    }
    try {
      setMainData(JSON.parse(json));
    } catch {
      router.replace('/cadastro/principal');
    }
  }, [router]);

  // if (!mainData) {
  //   return <div className="p-6 text-center">Carregando seus dados…</div>;
  // }

 return (
    <>
      <div className="mx-auto max-w-lg p-6 space-y-6">
        <MainBanner />
        <h1 className="text-2xl font-bold text-center">Cadastros adicionais</h1>
        {/* <p className="text-center">Olá, {mainData.nome}! Escolha:</p> */}
        <p className="text-center">Olá! Escolha o tipo do cadastro:</p>
        <ul className="space-y-4">
          {tipos.map(({ slug, label, color, hoverColor }) => (
            <li key={slug}>
              <button
                onClick={() => setOpenSlug(slug)}
                className={`
                  w-full py-3 px-4 text-white rounded-lg transition
                  ${color} hover:${hoverColor}
                `}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {openSlug && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setOpenSlug(null)}
        >
          <div
            className="bg-white rounded-lg max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenSlug(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {/* Aqui usamos Link para realmente navegar */}
            {tipos
              .filter((t) => t.slug === openSlug)
              .map(({ slug, label, description }) => (
                <div key={slug} className="space-y-4">
                  <h2 className="text-xl font-semibold">{label}</h2>
                  <p className="whitespace-pre-line text-gray-700">{description}</p>

                  <Link href={`/cadastro/${slug}`} passHref>
                    <button
                      type="button"
                      className="mt-4 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      Iniciar cadastro
                    </button>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}