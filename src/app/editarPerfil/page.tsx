// app/editar-perfil/page.tsx
"use client";

/**
 * Página de Edição de Perfil (completa)
 * - Alinha todos os campos ao payload do backend (Cod*, arrays, booleans e strings)
 * - Busca opções (gênero, raça, escolaridade, etc.) do servidor
 * - Carrega perfil atual do usuário e preenche o formulário
 * - Monta o payload e valida com Zod (userUpdateSchema) antes de enviar
 *
 * Observações importantes para manutenção:
 * 1) Mantenha o contrato das rotas em /utils/server (axios/fetch). Aqui usamos `server.get`/`server.put`.
 * 2) Campos com código (CodGenero, CodRaca, CodEscolaridade, etc.) são números (ou null).
 * 3) VinculoSocial segue o schema definido em socialLinkSchema.ts (arrays de códigos + CuidadoEspecial).
 * 4) Contatos de apoio aceitam no máximo 3 itens (conforme schema).
 * 5) Alguns endpoints estão como exemplo. Ajuste as URLs de acordo com sua API.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { Save, Camera, Trash2, Link as LinkIcon, Plus, X } from "react-feather";
import { userUpdateSchema } from "@/schemas/userSchema";
import type { VinculoSocialSchema } from "@/schemas/userSchema";
import { server } from "@/utils/server";

// Componentes utilitários do seu projeto
import { Label } from "@/utils/ui/Label";
import { Button } from "@/utils/ui/Button";
import GpsButton from "@/components/GpsButton";
import VinculosSociais from "@/components/VinculosSociais";

/* =========================================================
 * Tipagens auxiliares (frontend)
 * =======================================================*/
type IdNome = { id: number; nome: string };

type EmpresaDto = {
  PerfilId: number;
  Corporativo: boolean;
  Fornecedor: boolean;
  CodEmpresa: number;
  CNPJ: string | null;
  RazaoSocial: string | null;
  DiaAbertura: number | null;
  MesAbertura: number | null;
  AnoAbertura: number | null;
  Endereco: string | null;
  NumeroEndereco: string | null;
  Pais: string | null;
  Estado: string | null;
  Cidade: string | null;
  Bairro: string | null;
  Cep: string | null;
  UF: string | null;
  CodUsuario: number;
  NomePublico: string | null;
  NomeUsuario: string | null;
  NomeFantasia: string | null;
  Telefone: string | null;
  Email: string | null;
  AtividadePrincipalId: number | null;
  AtividadePrincipalCategoriaId: number | null;
  AtividadePrincipalModalidadeId: number | null;
  Privacidade: "PUBLICO" | "PRIVADO" | "AMIGOS";
  ReceberAnuncios: boolean;
  TermosPrivacidade: boolean;
  FotoPerfil: string | null;
  Apresentacao: string | null;
  ParticiparEvento: boolean | null;
  WhatsappTelegram: string | null;
  EmailContato: string | null;
  Site: string | null;
  Facebook: string | null;
  Instagram: string | null;
  Linktree: string | null;
  Youtube: string | null;
  Tiktok: string | null;
  CodBioma: number | null;
  CodDivisaoGeopolitica: number | null;
  Latitude: number | null;
  Longitude: number | null;
  ExcluirChat: number;
};

type OutrasAtividadesItem = {
  CodAtividadeTipo: number;
  CodAtividadeCategoria?: number;
  CodAtividadeModalidade?: number;
};

type InteresseItem = {
  CodTipo: number;
  CodCategoria?: number;
  CodModalidade?: number;
};

type ContatoApoioCreate = {
  NomeContato: string;
  TelefoneContato: string;
  EmailContato?: string;
  Relacao: string;
};

type ContatoApoioConnect = {
  ContatoId: number;
  Relacao: string;
};

type ContatoApoio = ContatoApoioCreate | ContatoApoioConnect;

type CuidadoEspecialItem = {
  CodTipo: number;
  CodCategoria: number | null;
  CodModalidade: number | null;
};

type VinculoSocialUI = {
  EconomiaSolidaria?: boolean;
  ONGS?: boolean;
  CulturaPopular?: boolean;
  AcaoAmbientalEcologia?: boolean;
  Genero?: number[];
  Raca?: number[];
  Religiao?: number[];
  PovosTradicionais?: number[];
  CuidadoEspecial?: CuidadoEspecialItem[];
};

type PerfilResponse = {
  CodGenero: number | null;
  CodRaca: number | null;
  FotoPerfil: string | null;
  Apresentacao: string | null;
  AtividadePrincipalId: number | null;
  AtividadePrincipalCategoriaId: number | null;
  AtividadePrincipalModalidadeId: number | null;
  Estudante: boolean | null;
  Funcionario: boolean | null;
  CodEscolaridade: number | null;
  ParticiparEvento: boolean | null;
  WhatsappTelegram: string | null;
  EmailContato: string | null;
  Site: string | null;
  Facebook: string | null;
  Instagram: string | null;
  Linktree: string | null;
  Youtube: string | null;
  Tiktok: string | null;
  CodBioma: number | null;
  CodDivisaoGeopolitica: number | null;
  Latitude: number | null;
  Longitude: number | null;
  ExcluirChat: number;
  AtividadePrincipalCategoria: string | null;
  AtividadePrincipalModalidade: string | null;
  AtividadePrincipalTipoId: number | null;
  ContatoApoio: ContatoApoio[];
  DivisaoGeopolitica: any;
  Bioma: any;
  Genero: { CodGenero: number; Nome: string } | null;
  Empresa: EmpresaDto[];
  OutrasAtividades: {
    CodOutrasAtividades: number;
    CodUsuario: number;
    CodAtividadeTipo: number;
    CodAtividadeModalidade: number | null;
    CodAtividadeCategoria: number | null;
  }[] | null;
  Escolaridade: any;
  Interesse: {
    CodInteresse: number;
    CodUsuario: number;
    CodEmpresa: number | null;
    CodTipo: number;
    CodCategoria: number | null;
    CodModalidade: number | null;
  }[] | null;
  ParticipanteGrupo: any[];
  Produtos: any[];
  VinculoSocial: {
    Id: number;
    CodUsuario: number;
    CodEmpresa: number | null;
    CodGrupo: number | null;
    EconomiaSolidaria: boolean | null;
    ONGs: boolean | null;
    CulturaPopular: boolean | null;
    AcaoAmbientalEcologia: boolean | null;
    VinculoCuidadoEspecial: { Id: number; CodVinculoSocial: number; CodTipo: number; CodCategoria: number | null; CodModalidade: number | null }[];
    VinculoSocialReligiao: { Id: number; CodVinculoSocial: number; CodReligiao: number }[];
    VinculoSocialGenero: { Id: number; CodVinculoSocial: number; CodGenero: number }[];
    VinculoSocialPovosTradicionais: { Id: number; CodVinculoSocial: number; CodPovo: number }[];
    VinculoSocialRaca: { Id: number; CodVinculoSocial: number; CodRaca: number }[];
  }[];
};

/* =========================================================
 * Helpers visuais
 * =======================================================*/
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-green-900/20 p-3 mb-4">
      <h2 className="text-sm font-semibold text-green-800 tracking-wide">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Toggle({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-2 rounded-lg border text-sm transition ${
        active ? "bg-green-700 border-green-600 text-white" : "bg-orange-100 border-orange-500 text-orange-700"
      }`}
    >
      {children}
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="w-full">
      <Label variant="perfil">{label}</Label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

/* =========================================================
 * Página principal
 * =======================================================*/
export default function EditarPerfilPage() {
  // ======= Lookups =======
  const [generos, setGeneros] = useState<IdNome[]>([]);
  const [racas, setRacas] = useState<IdNome[]>([]);
  const [escolaridades, setEscolaridades] = useState<IdNome[]>([]);
  const [tiposAtividade, setTiposAtividade] = useState<IdNome[]>([]);
  const [categoriasAtividade, setCategoriasAtividade] = useState<IdNome[]>([]);
  const [modalidadesAtividade, setModalidadesAtividade] = useState<IdNome[]>([]);
  const [tiposInteresse, setTiposInteresse] = useState<IdNome[]>([]);
  const [categoriasInteresse, setCategoriasInteresse] = useState<IdNome[]>([]);
  const [modalidadesInteresse, setModalidadesInteresse] = useState<IdNome[]>([]);
  const [religioes, setReligioes] = useState<IdNome[]>([]);
  const [povosTradicionais, setPovosTradicionais] = useState<IdNome[]>([]);

  // ======= Estado base (alinhado ao backend) =======
  const [CodGenero, setCodGenero] = useState<number | null>(null);
  const [CodRaca, setCodRaca] = useState<number | null>(null);
  const [Apresentacao, setApresentacao] = useState<string>("");
  const [AtividadePrincipalId, setAtividadePrincipalId] = useState<number | null>(null);
  const [AtividadePrincipalCategoriaId, setAtividadePrincipalCategoriaId] = useState<number | null>(null);
  const [AtividadePrincipalModalidadeId, setAtividadePrincipalModalidadeId] = useState<number | null>(null);
  const [Estudante, setEstudante] = useState<boolean | null>(null);
  const [Funcionario, setFuncionario] = useState<boolean | null>(null);
  const [CodEscolaridade, setCodEscolaridade] = useState<number | null>(null);
  const [ParticiparEvento, setParticiparEvento] = useState<boolean | null>(null);
  const [WhatsappTelegram, setWhatsappTelegram] = useState<string>("");
  const [EmailContato, setEmailContato] = useState<string>("");
  const [Site, setSite] = useState<string>("");
  const [Facebook, setFacebook] = useState<string>("");
  const [Instagram, setInstagram] = useState<string>("");
  const [Linktree, setLinktree] = useState<string>("");
  const [Youtube, setYoutube] = useState<string>("");
  const [Tiktok, setTiktok] = useState<string>("");
  const [Bioma, setBioma] = useState<number | null>(null); // se precisar, troque por lookup
  const [DivisaoGeopolitica, setDivisaoGeopolitica] = useState<number | null>(null); // idem
  const [Latitude, setLatitude] = useState<number | null>(null);
  const [Longitude, setLongitude] = useState<number | null>(null);
  const [ExcluirChat, setExcluirChat] = useState<number>(0);

  // ======= Arrays complexos =======
  const [ContatosApoio, setContatosApoio] = useState<ContatoApoio[]>([]);
  const [OutrasAtividades, setOutrasAtividades] = useState<OutrasAtividadesItem[]>([]);
  const [Interesse, setInteresse] = useState<InteresseItem[]>([]);
  const [VinculoSocial, setVinculoSocial] = useState<VinculoSocialUI[]>([]);

  // ======= Empresas (exibição) =======
  const [Empresas, setEmpresas] = useState<EmpresaDto[]>([]);

  // ======= Foto Perfil =======
  const [FotoPerfil, setFotoPerfil] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ======= Estados de carregamento =======
  const [loadingLookups, setLoadingLookups] = useState<boolean>(true);
  const [loadingPerfil, setLoadingPerfil] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  /* ----------------------------------------
   * Busca de lookups
   * --------------------------------------*/
  useEffect(() => {
    (async () => {
      try {
        setLoadingLookups(true);
        const [
          resGeneros,
          resRacas,
          resEscolaridades,
          resTipoAtiv,
          resReligioes,
          resPovos,
          // Outras tabelas conforme sua API
        ] = await Promise.all([
          server.get("/genero"),
          server.get("/raca"),
          server.get("/escolaridade"),
          server.get("/atividade"),
          server.get("/religiao"),
          server.get("/povostradicionais"),
        ]);

        setGeneros(resGeneros.data ?? []);
        setRacas(resRacas.data ?? []);
        setEscolaridades(resEscolaridades.data ?? []);
        setTiposAtividade(resTipoAtiv.data ?? []);
        setReligioes(resReligioes.data ?? []);
        setPovosTradicionais(resPovos.data ?? []);
      } catch (err) {
        console.error("Erro ao carregar lookups:", err);
      } finally {
        setLoadingLookups(false);
      }
    })();
  }, []);

  // Busca categorias e modalidades atreladas ao tipo/categoria da Atividade Principal
  useEffect(() => {
    (async () => {
      try {
        if (AtividadePrincipalId) {
          const resCat = await server.get(`/atividade/categoria?tipoId=${AtividadePrincipalId}`);
          setCategoriasAtividade(resCat.data ?? []);
        } else {
          setCategoriasAtividade([]);
        }
      } catch (err) {
        console.error("Erro ao carregar categorias da atividade:", err);
      }
    })();
  }, [AtividadePrincipalId]);

  useEffect(() => {
    (async () => {
      try {
        if (AtividadePrincipalCategoriaId) {
          const resMod = await server.get(`/atividades/modalidades?categoriaId=${AtividadePrincipalCategoriaId}`);
          setModalidadesAtividade(resMod.data ?? []);
        } else {
          setModalidadesAtividade([]);
        }
      } catch (err) {
        console.error("Erro ao carregar modalidades da atividade:", err);
      }
    })();
  }, [AtividadePrincipalCategoriaId]);

  // Lookups de interesse (se forem distintas das de atividade)
  useEffect(() => {
    (async () => {
      try {
        const resTipos = await server.get("/interesses/tipos");
        setTiposInteresse(resTipos.data ?? []);
      } catch (err) {
        console.error("Erro ao carregar tipos de interesse:", err);
      }
    })();
  }, []);

  // Carrega categorias e modalidades de interesse (cascata única para um criador de itens)
  const [interesseTipoAtual, setInteresseTipoAtual] = useState<number | null>(null);
  const [interesseCategoriaAtual, setInteresseCategoriaAtual] = useState<number | null>(null);
  useEffect(() => {
    (async () => {
      try {
        if (interesseTipoAtual) {
          const res = await server.get(`/interesses/categorias?tipoId=${interesseTipoAtual}`);
          setCategoriasInteresse(res.data ?? []);
        } else {
          setCategoriasInteresse([]);
        }
      } catch (err) {
        console.error("Erro ao carregar categorias de interesse:", err);
      }
    })();
  }, [interesseTipoAtual]);

  useEffect(() => {
    (async () => {
      try {
        if (interesseCategoriaAtual) {
          const res = await server.get(`/interesses/modalidades?categoriaId=${interesseCategoriaAtual}`);
          setModalidadesInteresse(res.data ?? []);
        } else {
          setModalidadesInteresse([]);
        }
      } catch (err) {
        console.error("Erro ao carregar modalidades de interesse:", err);
      }
    })();
  }, [interesseCategoriaAtual]);

  /* ----------------------------------------
   * Carregar perfil do usuário
   * --------------------------------------*/
  useEffect(() => {
    (async () => {
      try {
        setLoadingPerfil(true);
        const res = await server.get<PerfilResponse>("/user"); // ajuste a rota
        const data = res.data;

        // Campos simples
        setCodGenero(data.CodGenero);
        setCodRaca(data.CodRaca);
        setFotoPerfil(data.FotoPerfil);
        setApresentacao(data.Apresentacao ?? "");
        setEstudante(data.Estudante);
        setFuncionario(data.Funcionario);
        setCodEscolaridade(data.CodEscolaridade);
        setParticiparEvento(data.ParticiparEvento);
        setWhatsappTelegram(data.WhatsappTelegram ?? "");
        setEmailContato(data.EmailContato ?? "");
        setSite(data.Site ?? "");
        setFacebook(data.Facebook ?? "");
        setInstagram(data.Instagram ?? "");
        setLinktree(data.Linktree ?? "");
        setYoutube(data.Youtube ?? "");
        setTiktok(data.Tiktok ?? "");
        setBioma(data.CodBioma);
        setDivisaoGeopolitica(data.CodDivisaoGeopolitica);
        setLatitude(data.Latitude);
        setLongitude(data.Longitude);
        setExcluirChat(data.ExcluirChat ?? 0);

        // Atividade principal
        setAtividadePrincipalId(data.AtividadePrincipalId);
        setAtividadePrincipalCategoriaId(data.AtividadePrincipalCategoriaId);
        setAtividadePrincipalModalidadeId(data.AtividadePrincipalModalidadeId);

        // Contatos de apoio
        setContatosApoio(Array.isArray(data.ContatoApoio) ? data.ContatoApoio : []);

        // Outras atividades
        const outras: OutrasAtividadesItem[] =
          data.OutrasAtividades?.map((o) => ({
            CodAtividadeTipo: o.CodAtividadeTipo,
            CodAtividadeCategoria: o.CodAtividadeCategoria ?? undefined,
            CodAtividadeModalidade: o.CodAtividadeModalidade ?? undefined,
          })) ?? [];
        setOutrasAtividades(outras);

        // Interesse
        const interesses: InteresseItem[] =
          data.Interesse?.map((i) => ({
            CodTipo: i.CodTipo,
            CodCategoria: i.CodCategoria ?? undefined,
            CodModalidade: i.CodModalidade ?? undefined,
          })) ?? [];
        setInteresse(interesses);

        // Vinculo Social (converte estrutura expandida em arrays de códigos)
        const vincs: VinculoSocialUI[] = (data.VinculoSocial ?? []).map((v) => ({
          EconomiaSolidaria: !!v.EconomiaSolidaria,
          ONGS: !!v.ONGs,
          CulturaPopular: !!v.CulturaPopular,
          AcaoAmbientalEcologia: !!v.AcaoAmbientalEcologia,
          Genero: (v.VinculoSocialGenero ?? []).map((g) => g.CodGenero),
          Raca: (v.VinculoSocialRaca ?? []).map((r) => r.CodRaca),
          Religiao: (v.VinculoSocialReligiao ?? []).map((r) => (r as any).CodReligiao),
          PovosTradicionais: (v.VinculoSocialPovosTradicionais ?? []).map((p) => (p as any).CodPovo),
          CuidadoEspecial: (v.VinculoCuidadoEspecial ?? []).map((c) => ({
            CodTipo: c.CodTipo,
            CodCategoria: c.CodCategoria,
            CodModalidade: c.CodModalidade,
          })),
        }));
        setVinculoSocial(vincs);

        // Empresas
        setEmpresas(Array.isArray(data.Empresa) ? data.Empresa : []);
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
      } finally {
        setLoadingPerfil(false);
      }
    })();
  }, []);

  /* ----------------------------------------
   * Manipuladores de UI
   * --------------------------------------*/
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    // Você pode enviar a imagem para uma rota /upload e depois setar a URL retornada
    console.log("Selecionou imagem:", f);
  };

  const openCamera = () => {
    fileInputRef.current?.setAttribute("capture", "environment");
    fileInputRef.current?.click();
  };
  const openGallery = () => {
    fileInputRef.current?.removeAttribute("capture");
    fileInputRef.current?.click();
  };

  // Outras atividades
  const addOutraAtividade = () => {
    setOutrasAtividades((prev) => [...prev, { CodAtividadeTipo: 0 }]);
  };
  const updateOutraAtividade = (index: number, patch: Partial<OutrasAtividadesItem>) => {
    setOutrasAtividades((prev) => prev.map((a, i) => (i === index ? { ...a, ...patch } : a)));
  };
  const removeOutraAtividade = (index: number) => {
    setOutrasAtividades((prev) => prev.filter((_, i) => i !== index));
  };

  // Interesse
  const addInteresse = () => {
    setInteresse((prev) => [...prev, { CodTipo: 0 }]);
  };
  const updateInteresse = (index: number, patch: Partial<InteresseItem>) => {
    setInteresse((prev) => prev.map((a, i) => (i === index ? { ...a, ...patch } : a)));
  };
  const removeInteresse = (index: number) => {
    setInteresse((prev) => prev.filter((_, i) => i !== index));
  };

  // Contatos de apoio
  const addContatoApoioNovo = () => {
    if (ContatosApoio.length >= 3) return alert("Máximo de 3 contatos de apoio.");
    setContatosApoio((prev) => [
      ...prev,
      { NomeContato: "", TelefoneContato: "", EmailContato: "", Relacao: "" } as ContatoApoioCreate,
    ]);
  };
  const addContatoApoioExistente = () => {
    if (ContatosApoio.length >= 3) return alert("Máximo de 3 contatos de apoio.");
    setContatosApoio((prev) => [...prev, { ContatoId: 0, Relacao: "" } as ContatoApoioConnect]);
  };
  const updateContatoApoio = (index: number, patch: Partial<ContatoApoio>) => {
    setContatosApoio((prev) => prev.map((c, i) => (i === index ? { ...c, ...patch } as ContatoApoio : c)));
  };
  const removeContatoApoio = (index: number) => {
    setContatosApoio((prev) => prev.filter((_, i) => i !== index));
  };

  // Vinculos sociais: adiciona um bloco
  const addVinculoSocial = () => {
    setVinculoSocial((prev) => [
      ...prev,
      { EconomiaSolidaria: false, ONGS: false, CulturaPopular: false, AcaoAmbientalEcologia: false, Genero: [], Raca: [], Religiao: [], PovosTradicionais: [], CuidadoEspecial: [] },
    ]);
  };
  const updateVinculoSocial = (index: number, patch: Partial<VinculoSocialUI>) => {
    setVinculoSocial((prev) => prev.map((v, i) => (i === index ? { ...v, ...patch } : v)));
  };
  const removeVinculoSocial = (index: number) => {
    setVinculoSocial((prev) => prev.filter((_, i) => i !== index));
  };

  // Helpers de seleção múltipla para vínculos (Genero/Raca/etc.)
  const toggleArrayCode = (arr: number[] | undefined, code: number): number[] => {
    const base = arr ?? [];
    return base.includes(code) ? base.filter((c) => c !== code) : [...base, code];
  };

  /* ----------------------------------------
   * Salvar (monta payload e valida com Zod)
   * --------------------------------------*/
  const salvarPerfil = async () => {
    try {
      setSaving(true);

      // Normaliza arrays (remove itens vazios)
      const outrasAtividadesClean = OutrasAtividades.filter((a) => a.CodAtividadeTipo && a.CodAtividadeTipo > 0).map((a) => ({
        CodAtividadeTipo: Number(a.CodAtividadeTipo),
        CodAtividadeCategoria: a.CodAtividadeCategoria ? Number(a.CodAtividadeCategoria) : undefined,
        CodAtividadeModalidade: a.CodAtividadeModalidade ? Number(a.CodAtividadeModalidade) : undefined,
      }));

      const interessesClean = Interesse.filter((i) => i.CodTipo && i.CodTipo > 0).map((i) => ({
        CodTipo: Number(i.CodTipo),
        CodCategoria: i.CodCategoria ? Number(i.CodCategoria) : undefined,
        CodModalidade: i.CodModalidade ? Number(i.CodModalidade) : undefined,
      }));

      const vinculosClean: VinculoSocialSchema[] = (VinculoSocial ?? []).map((v) => ({
        EconomiaSolidaria: !!v.EconomiaSolidaria,
        ONGS: !!v.ONGS,
        CulturaPopular: !!v.CulturaPopular,
        AcaoAmbientalEcologia: !!v.AcaoAmbientalEcologia,
        Genero: (v.Genero ?? []).map(Number),
        Raca: (v.Raca ?? []).map(Number),
        Religiao: (v.Religiao ?? []).map(Number),
        PovosTradicionais: (v.PovosTradicionais ?? []).map(Number),
        CuidadoEspecial: (v.CuidadoEspecial ?? []).map((c) => ({
          CodTipo: Number(c.CodTipo),
          CodCategoria: c.CodCategoria ? Number(c.CodCategoria) : null,
          CodModalidade: c.CodModalidade ? Number(c.CodModalidade) : null,
        })),
      })) as VinculoSocialSchema[];

      // Contatos apoio (deixa passar os dois formatos do union do schema)
      const contatosClean = ContatosApoio.slice(0, 3).map((c) => {
        if ("ContatoId" in c) {
          return { ContatoId: Number(c.ContatoId || 0), Relacao: (c as any).Relacao ?? "" } as ContatoApoioConnect;
        }
        return {
          NomeContato: (c as any).NomeContato ?? "",
          TelefoneContato: (c as any).TelefoneContato ?? "",
          EmailContato: (c as any).EmailContato || undefined,
          Relacao: (c as any).Relacao ?? "",
        } as ContatoApoioCreate;
      });

      const payload = {
        // ====== Extra (userExtraSchema) ======
        CodGenero: CodGenero ?? null,
        CodRaca: CodRaca ?? null,
        Apresentacao: Apresentacao || null,
        AtividadePrincipalId: AtividadePrincipalId ?? null,
        AtividadePrincipalCategoriaId: AtividadePrincipalCategoriaId ?? null,
        AtividadePrincipalModalidadeId: AtividadePrincipalModalidadeId ?? null,
        OutrasAtividades: outrasAtividadesClean.length ? outrasAtividadesClean : null,
        Interesse: interessesClean.length ? interessesClean : null,
        Estudante,
        Funcionario,
        CodEscolaridade: CodEscolaridade ?? null,
        ParticiparEvento,
        VinculoSocial: vinculosClean.length ? vinculosClean : null,
        WhatsappTelegram: WhatsappTelegram || null,
        EmailContato: EmailContato || null,
        Site: Site || null,
        Instagram: Instagram || null,
        Facebook: Facebook || null,
        Youtube: Youtube || null,
        Tiktok: Tiktok || null,
        Linktree: Linktree || null,
        Bioma: Bioma ?? null,
        DivisaoGeopolitica: DivisaoGeopolitica ?? null,
        Latitude: Latitude ?? null,
        Longitude: Longitude ?? null,
        ExcluirChat: Number(ExcluirChat) || 0,
        // ====== Caso queira enviar Contatos de Apoio como parte básica ======
        ContatosApoio: contatosClean.length ? contatosClean : undefined,
      };

      // Validação (parcial total)
      const validado = userUpdateSchema.parse(payload);

      // Envia (ajuste a rota)
      await server.patch("/user/complete", validado);
      alert("Perfil salvo com sucesso!");
    } catch (err: any) {
      console.error("Erro ao salvar:", err);
      alert("Erro ao salvar perfil.");
    } finally {
      setSaving(false);
    }
  };

  /* ----------------------------------------
   * Render
   * --------------------------------------*/
  if (loadingLookups || loadingPerfil) {
    return (
      <div className="min-h-screen w-full bg-[#B6D2B7] mt-8 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-white/60 rounded" />
          <div className="h-40 bg-white/60 rounded" />
          <div className="h-40 bg-white/60 rounded" />
          <div className="h-40 bg-white/60 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#B6D2B7] mt-8 pb-24">
      {/* Header */}
      <header className="sticky top-0 bg-white shadow-sm z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-base md:text-xl font-bold text-green-700">INFORMAÇÕES ADICIONAIS / EDITAR PERFIL</h1>
          <Button className="flex items-center gap-2 bg-green-600 text-white" onClick={salvarPerfil} disabled={saving}>
            <Save size={18} /> {saving ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-2 md:px-4 mt-3 space-y-4">
        {/* Foto */}
        <Section title="FOTO DE PERFIL">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="w-32 h-32 rounded-lg bg-gray-200 border-2 border-dashed border-black overflow-hidden">
              {FotoPerfil ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={FotoPerfil} alt="Foto do perfil" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full grid place-items-center text-xs text-gray-500">Sem foto</div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <button onClick={openCamera} className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg justify-center">
                <Camera size={20} className="text-green-600" />
                <span className="text-sm">Selfie</span>
              </button>
              <button onClick={openGallery} className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg justify-center">
                <span className="text-green-600 font-bold text-lg">...</span>
                <span className="text-sm">Procurar</span>
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
            </div>
          </div>
        </Section>

        {/* Gênero e Raça */}
        <Section title="IDENTIDADE">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="GÊNERO">
              <div className="flex flex-wrap gap-2">
                {generos.map((g) => (
                  <Toggle key={g.id} active={CodGenero === g.id} onClick={() => setCodGenero(g.id)}>
                    {g.nome}
                  </Toggle>
                ))}
              </div>
            </Field>

            <Field label="RAÇA/COR">
              <div className="flex flex-wrap gap-2">
                {racas.map((r) => (
                  <Toggle key={r.id} active={CodRaca === r.id} onClick={() => setCodRaca(r.id)}>
                    {r.nome}
                  </Toggle>
                ))}
              </div>
            </Field>
          </div>
        </Section>

        {/* Apresentação */}
        <Section title="APRESENTAÇÃO">
          <textarea
            value={Apresentacao}
            onChange={(e) => setApresentacao(e.target.value)}
            className="w-full min-h-36 p-3 border rounded-lg border-orange-700 resize-y"
            placeholder="Fale sobre você..."
            maxLength={3000}
          />
          <div className="text-xs text-gray-500 mt-1">{Apresentacao.length}/3000</div>
        </Section>

        {/* Escolaridade e Participação */}
        <Section title="ESCOLARIDADE E PARTICIPAÇÃO">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="ESCOLARIDADE">
              <select
                value={CodEscolaridade ?? ""}
                onChange={(e) => setCodEscolaridade(e.target.value ? Number(e.target.value) : null)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Selecione...</option>
                {escolaridades.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.nome}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="ESTUDANTE">
              <div className="flex gap-2">
                <Toggle active={!!Estudante} onClick={() => setEstudante(true)}>
                  Sim
                </Toggle>
                <Toggle active={Estudante === false} onClick={() => setEstudante(false)}>
                  Não
                </Toggle>
              </div>
            </Field>

            <Field label="FUNCIONÁRIO">
              <div className="flex gap-2">
                <Toggle active={!!Funcionario} onClick={() => setFuncionario(true)}>
                  Sim
                </Toggle>
                <Toggle active={Funcionario === false} onClick={() => setFuncionario(false)}>
                  Não
                </Toggle>
              </div>
            </Field>
          </div>

          <div className="mt-4">
            <Field label="PARTICIPA DE EVENTOS?">
              <div className="flex gap-2">
                <Toggle active={!!ParticiparEvento} onClick={() => setParticiparEvento(true)}>
                  Sim
                </Toggle>
                <Toggle active={ParticiparEvento === false} onClick={() => setParticiparEvento(false)}>
                  Não
                </Toggle>
              </div>
            </Field>
          </div>
        </Section>

        {/* Atividade Principal */}
        <Section title="ATIVIDADE PRINCIPAL">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="TIPO">
              <select
                value={AtividadePrincipalId ?? ""}
                onChange={(e) => {
                  const v = e.target.value ? Number(e.target.value) : null;
                  setAtividadePrincipalId(v);
                  setAtividadePrincipalCategoriaId(null);
                  setAtividadePrincipalModalidadeId(null);
                }}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Selecione...</option>
                {tiposAtividade.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nome}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="CATEGORIA">
              <select
                value={AtividadePrincipalCategoriaId ?? ""}
                onChange={(e) => {
                  const v = e.target.value ? Number(e.target.value) : null;
                  setAtividadePrincipalCategoriaId(v);
                  setAtividadePrincipalModalidadeId(null);
                }}
                className="w-full p-2 border rounded-lg"
                disabled={!AtividadePrincipalId}
              >
                <option value="">Selecione...</option>
                {categoriasAtividade.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="MODALIDADE">
              <select
                value={AtividadePrincipalModalidadeId ?? ""}
                onChange={(e) => setAtividadePrincipalModalidadeId(e.target.value ? Number(e.target.value) : null)}
                className="w-full p-2 border rounded-lg"
                disabled={!AtividadePrincipalCategoriaId}
              >
                <option value="">Selecione...</option>
                {modalidadesAtividade.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nome}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </Section>

        {/* Outras Atividades */}
        <Section title="OUTRAS ATIVIDADES">
          <div className="space-y-3">
            {OutrasAtividades.map((a, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end">
                <div>
                  <Label variant="perfil">Tipo</Label>
                  <select
                    value={a.CodAtividadeTipo || ""}
                    onChange={async (e) => {
                      const v = e.target.value ? Number(e.target.value) : 0;
                      updateOutraAtividade(idx, { CodAtividadeTipo: v, CodAtividadeCategoria: undefined, CodAtividadeModalidade: undefined });
                      // Carregar categorias/ modalides específicas, se quiser por item.
                    }}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Selecione...</option>
                    {tiposAtividade.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label variant="perfil">Categoria</Label>
                  <select
                    value={a.CodAtividadeCategoria || ""}
                    onChange={(e) => updateOutraAtividade(idx, { CodAtividadeCategoria: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Selecione...</option>
                    {categoriasAtividade.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label variant="perfil">Modalidade</Label>
                  <select
                    value={a.CodAtividadeModalidade || ""}
                    onChange={(e) => updateOutraAtividade(idx, { CodAtividadeModalidade: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Selecione...</option>
                    {modalidadesAtividade.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeOutraAtividade(idx)}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 text-red-700 border border-red-200"
                  >
                    <Trash2 size={16} /> Remover
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addOutraAtividade}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-600 text-white"
            >
              <Plus size={16} /> Adicionar atividade
            </button>
          </div>
        </Section>

        {/* Interesses */}
        <Section title="INTERESSES">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <Label variant="perfil">Tipo (para novo interesse)</Label>
              <select
                value={interesseTipoAtual ?? ""}
                onChange={(e) => {
                  const v = e.target.value ? Number(e.target.value) : null;
                  setInteresseTipoAtual(v);
                  setInteresseCategoriaAtual(null);
                }}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Selecione...</option>
                {tiposInteresse.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label variant="perfil">Categoria</Label>
              <select
                value={interesseCategoriaAtual ?? ""}
                onChange={(e) => setInteresseCategoriaAtual(e.target.value ? Number(e.target.value) : null)}
                className="w-full p-2 border rounded-lg"
                disabled={!interesseTipoAtual}
              >
                <option value="">Selecione...</option>
                {categoriasInteresse.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label variant="perfil">Modalidade</Label>
              <select
                value={modalidadesInteresse.length ? (modalidadesInteresse[0].id ?? "") : ""}
                onChange={() => {}}
                className="w-full p-2 border rounded-lg"
                disabled={!interesseCategoriaAtual}
              >
                {/* Apenas exibindo; para builder mais complexo, crie selects por item */}
                {modalidadesInteresse.length === 0 ? <option value="">Selecione...</option> : null}
                {modalidadesInteresse.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-3">
            {Interesse.map((a, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end mb-2">
                <div>
                  <Label variant="perfil">Tipo</Label>
                  <select
                    value={a.CodTipo || ""}
                    onChange={(e) => updateInteresse(idx, { CodTipo: e.target.value ? Number(e.target.value) : 0 })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Selecione...</option>
                    {tiposInteresse.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label variant="perfil">Categoria</Label>
                  <select
                    value={a.CodCategoria || ""}
                    onChange={(e) => updateInteresse(idx, { CodCategoria: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Selecione...</option>
                    {categoriasInteresse.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label variant="perfil">Modalidade</Label>
                  <select
                    value={a.CodModalidade || ""}
                    onChange={(e) => updateInteresse(idx, { CodModalidade: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Selecione...</option>
                    {modalidadesInteresse.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeInteresse(idx)}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 text-red-700 border border-red-200"
                  >
                    <Trash2 size={16} /> Remover
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addInteresse}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-600 text-white"
            >
              <Plus size={16} /> Adicionar interesse
            </button>
          </div>
        </Section>

        {/* Vínculos Sociais */}
        <Section title="VÍNCULOS SOCIAIS">
          <div className="space-y-4">
            {VinculoSocial.map((v, idx) => (
              <div key={idx} className="border rounded-lg p-3 border-green-900/20">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-green-700">Bloco #{idx + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeVinculoSocial(idx)}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-red-50 text-red-700 border border-red-200"
                  >
                    <Trash2 size={16} /> Remover
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <Field label="Eixos">
                    <div className="flex flex-wrap gap-2">
                      <Toggle active={!!v.EconomiaSolidaria} onClick={() => updateVinculoSocial(idx, { EconomiaSolidaria: !v.EconomiaSolidaria })}>
                        Economia Solidária
                      </Toggle>
                      <Toggle active={!!v.ONGS} onClick={() => updateVinculoSocial(idx, { ONGS: !v.ONGS })}>
                        ONGs
                      </Toggle>
                      <Toggle active={!!v.CulturaPopular} onClick={() => updateVinculoSocial(idx, { CulturaPopular: !v.CulturaPopular })}>
                        Cultura Popular
                      </Toggle>
                      <Toggle active={!!v.AcaoAmbientalEcologia} onClick={() => updateVinculoSocial(idx, { AcaoAmbientalEcologia: !v.AcaoAmbientalEcologia })}>
                        Ação Ambiental/Ecologia
                      </Toggle>
                    </div>
                  </Field>

                  <Field label="GÊNERO (vínculo)">
                    <div className="flex flex-wrap gap-2">
                      {generos.map((g) => (
                        <Toggle
                          key={g.id}
                          active={(v.Genero ?? []).includes(g.id)}
                          onClick={() => updateVinculoSocial(idx, { Genero: toggleArrayCode(v.Genero, g.id) })}
                        >
                          {g.nome}
                        </Toggle>
                      ))}
                    </div>
                  </Field>

                  <Field label="RAÇA/COR (vínculo)">
                    <div className="flex flex-wrap gap-2">
                      {racas.map((r) => (
                        <Toggle
                          key={r.id}
                          active={(v.Raca ?? []).includes(r.id)}
                          onClick={() => updateVinculoSocial(idx, { Raca: toggleArrayCode(v.Raca, r.id) })}
                        >
                          {r.nome}
                        </Toggle>
                      ))}
                    </div>
                  </Field>

                  <Field label="RELIGIÕES">
                    <div className="flex flex-wrap gap-2">
                      {religioes.map((rl) => (
                        <Toggle
                          key={rl.id}
                          active={(v.Religiao ?? []).includes(rl.id)}
                          onClick={() => updateVinculoSocial(idx, { Religiao: toggleArrayCode(v.Religiao, rl.id) })}
                        >
                          {rl.nome}
                        </Toggle>
                      ))}
                    </div>
                  </Field>

                  <Field label="POVOS TRADICIONAIS">
                    <div className="flex flex-wrap gap-2">
                      {povosTradicionais.map((p) => (
                        <Toggle
                          key={p.id}
                          active={(v.PovosTradicionais ?? []).includes(p.id)}
                          onClick={() => updateVinculoSocial(idx, { PovosTradicionais: toggleArrayCode(v.PovosTradicionais, p.id) })}
                        >
                          {p.nome}
                        </Toggle>
                      ))}
                    </div>
                  </Field>

                  <Field label="CUIDADO ESPECIAL">
                    <div className="space-y-2">
                      {(v.CuidadoEspecial ?? []).map((c, cIdx) => (
                        <div key={cIdx} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end">
                          <div>
                            <Label variant="perfil">Tipo</Label>
                            <select
                              value={c.CodTipo || ""}
                              onChange={(e) => {
                                const arr = [...(v.CuidadoEspecial ?? [])];
                                arr[cIdx] = { ...arr[cIdx], CodTipo: e.target.value ? Number(e.target.value) : 0 };
                                updateVinculoSocial(idx, { CuidadoEspecial: arr });
                              }}
                              className="w-full p-2 border rounded-lg"
                            >
                              <option value="">Selecione...</option>
                              {/* Se houver lookup próprio de tipos de cuidado, troque abaixo */}
                              {tiposInteresse.map((t) => (
                                <option key={t.id} value={t.id}>
                                  {t.nome}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <Label variant="perfil">Categoria</Label>
                            <input
                              type="number"
                              value={c.CodCategoria ?? ""}
                              onChange={(e) => {
                                const vNum = e.target.value ? Number(e.target.value) : null;
                                const arr = [...(v.CuidadoEspecial ?? [])];
                                arr[cIdx] = { ...arr[cIdx], CodCategoria: vNum };
                                updateVinculoSocial(idx, { CuidadoEspecial: arr });
                              }}
                              placeholder="(opcional)"
                              className="w-full p-2 border rounded-lg"
                            />
                          </div>

                          <div>
                            <Label variant="perfil">Modalidade</Label>
                            <input
                              type="number"
                              value={c.CodModalidade ?? ""}
                              onChange={(e) => {
                                const vNum = e.target.value ? Number(e.target.value) : null;
                                const arr = [...(v.CuidadoEspecial ?? [])];
                                arr[cIdx] = { ...arr[cIdx], CodModalidade: vNum };
                                updateVinculoSocial(idx, { CuidadoEspecial: arr });
                              }}
                              placeholder="(opcional)"
                              className="w-full p-2 border rounded-lg"
                            />
                          </div>

                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() => {
                                const arr = [...(v.CuidadoEspecial ?? [])];
                                arr.splice(cIdx, 1);
                                updateVinculoSocial(idx, { CuidadoEspecial: arr });
                              }}
                              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 text-red-700 border border-red-200"
                            >
                              <Trash2 size={16} /> Remover
                            </button>
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => updateVinculoSocial(idx, { CuidadoEspecial: [...(v.CuidadoEspecial ?? []), { CodTipo: 0, CodCategoria: null, CodModalidade: null }] })}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-600 text-white"
                      >
                        <Plus size={16} /> Adicionar cuidado
                      </button>
                    </div>
                  </Field>
                </div>
              </div>
            ))}

            <button type="button" onClick={addVinculoSocial} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-600 text-white">
              <Plus size={16} /> Adicionar vínculo
            </button>
          </div>
        </Section>

        {/* Contatos de Apoio */}
        <Section title="CONTATOS DE APOIO (máx. 3)">
          <div className="space-y-3">
            {ContatosApoio.map((c, idx) => (
              <div key={idx} className="border rounded-lg p-3 border-green-900/20">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeContatoApoio(idx)}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-red-50 text-red-700 border border-red-200"
                  >
                    <Trash2 size={16} /> Remover
                  </button>
                </div>

                {"ContatoId" in c ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label variant="perfil">Contato existente (ID)</Label>
                      <input
                        type="number"
                        value={(c as any).ContatoId || 0}
                        onChange={(e) => updateContatoApoio(idx, { ContatoId: Number(e.target.value || 0) })}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <Label variant="perfil">Relação</Label>
                      <input
                        type="text"
                        value={(c as any).Relacao || ""}
                        onChange={(e) => updateContatoApoio(idx, { Relacao: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div>
                      <Label variant="perfil">Nome</Label>
                      <input
                        type="text"
                        value={(c as any).NomeContato || ""}
                        onChange={(e) => updateContatoApoio(idx, { NomeContato: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <Label variant="perfil">Telefone</Label>
                      <input
                        type="tel"
                        value={(c as any).TelefoneContato || ""}
                        onChange={(e) => updateContatoApoio(idx, { TelefoneContato: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <Label variant="perfil">Email (opcional)</Label>
                      <input
                        type="email"
                        value={(c as any).EmailContato || ""}
                        onChange={(e) => updateContatoApoio(idx, { EmailContato: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <Label variant="perfil">Relação</Label>
                      <input
                        type="text"
                        value={(c as any).Relacao || ""}
                        onChange={(e) => updateContatoApoio(idx, { Relacao: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="flex gap-2 flex-wrap">
              <button type="button" onClick={addContatoApoioNovo} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-600 text-white">
                <Plus size={16} /> Adicionar novo contato
              </button>
              <button type="button" onClick={addContatoApoioExistente} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-600 text-white">
                <Plus size={16} /> Conectar contato existente
              </button>
            </div>
          </div>
        </Section>

        {/* Redes/Links */}
        <Section title="REDES E CONTATO">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field label="WhatsApp/Telegram">
              <input value={WhatsappTelegram} onChange={(e) => setWhatsappTelegram(e.target.value)} className="w-full p-2 border rounded-lg" />
            </Field>
            <Field label="Email de contato">
              <input type="email" value={EmailContato} onChange={(e) => setEmailContato(e.target.value)} className="w-full p-2 border rounded-lg" />
            </Field>
            <Field label="Site">
              <input value={Site} onChange={(e) => setSite(e.target.value)} className="w-full p-2 border rounded-lg" />
            </Field>
            <Field label="Instagram">
              <input value={Instagram} onChange={(e) => setInstagram(e.target.value)} className="w-full p-2 border rounded-lg" />
            </Field>
            <Field label="Facebook">
              <input value={Facebook} onChange={(e) => setFacebook(e.target.value)} className="w-full p-2 border rounded-lg" />
            </Field>
            <Field label="YouTube">
              <input value={Youtube} onChange={(e) => setYoutube(e.target.value)} className="w-full p-2 border rounded-lg" />
            </Field>
            <Field label="TikTok">
              <input value={Tiktok} onChange={(e) => setTiktok(e.target.value)} className="w-full p-2 border rounded-lg" />
            </Field>
            <Field label="Linktree">
              <input value={Linktree} onChange={(e) => setLinktree(e.target.value)} className="w-full p-2 border rounded-lg" />
            </Field>
          </div>
        </Section>

        {/* Localização e Preferências */}
        <Section title="LOCALIZAÇÃO E PREFERÊNCIAS">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Field label="Latitude">
              <input
                type="number"
                value={Latitude ?? ""}
                onChange={(e) => setLatitude(e.target.value ? Number(e.target.value) : null)}
                className="w-full p-2 border rounded-lg"
              />
            </Field>
            <Field label="Longitude">
              <input
                type="number"
                value={Longitude ?? ""}
                onChange={(e) => setLongitude(e.target.value ? Number(e.target.value) : null)}
                className="w-full p-2 border rounded-lg"
              />
            </Field>
            <div className="flex items-end">
              <GpsButton onChangeCoords={(lat: number, lng: number) => { setLatitude(lat); setLongitude(lng); }} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
            <Field label="Código Bioma (opcional)">
              <input
                type="number"
                value={Bioma ?? ""}
                onChange={(e) => setBioma(e.target.value ? Number(e.target.value) : null)}
                className="w-full p-2 border rounded-lg"
              />
            </Field>
            <Field label="Divisão Geopolítica (opcional)">
              <input
                type="number"
                value={DivisaoGeopolitica ?? ""}
                onChange={(e) => setDivisaoGeopolitica(e.target.value ? Number(e.target.value) : null)}
                className="w-full p-2 border rounded-lg"
              />
            </Field>
            <Field label="Excluir Chat (0-360 dias)">
              <input
                type="number"
                min={0}
                max={360}
                value={ExcluirChat}
                onChange={(e) => setExcluirChat(Number(e.target.value || 0))}
                className="w-full p-2 border rounded-lg"
              />
            </Field>
          </div>
        </Section>

        {/* Empresas */}
        <Section title="EMPRESAS (visualização rápida)">
          {Empresas.length === 0 ? (
            <div className="text-sm text-gray-600">Nenhuma empresa vinculada.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Empresas.map((emp) => (
                <div key={emp.CodEmpresa} className="border rounded-lg p-3 border-green-900/20 bg-white">
                  <div className="font-semibold text-green-700">{emp.NomePublico || emp.RazaoSocial || "Empresa"}</div>
                  <div className="text-xs text-gray-600">CNPJ: {emp.CNPJ || "-"}</div>
                  <div className="text-xs text-gray-600">Privacidade: {emp.Privacidade}</div>
                  <div className="text-xs text-gray-600">Telefone: {emp.Telefone || "-"}</div>
                  <div className="text-xs text-gray-600">Site: {emp.Site || "-"}</div>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Botão global salvar */}
        <div className="sticky bottom-4">
          <Button className="w-full py-4 bg-green-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-green-700" onClick={salvarPerfil} disabled={saving}>
            {saving ? "Salvando..." : "SALVAR PERFIL"}
          </Button>
        </div>
      </main>
    </div>
  );
}






// // app/editar-perfil/page.tsx
// "use client";
// import { useState, useRef } from "react";
// import { Camera, Save, Trash2, MapPin, Link as LinkIcon } from "react-feather";
// import VinculosSociais from "@/components/VinculosSociais";
// import { Label } from "@/utils/ui/Label";
// import { Button } from "@/utils/ui/Button";
// import GpsButton from "@/components/GpsButton";

// interface Tipo {
//   nome: string;
//   categorias: string[];
// }

// export default function EditarPerfilPage() {
//   const [CodGenero, setCodGenero] = useState("");
//   const [CodRaca, setCodRaca] = useState("");
//   const [doencaCronica, setDoencaCronica] = useState<string>("");
//   const [detalheDoenca, setDetalheDoenca] = useState<string>("");
//   const tipos: Tipo[] = [
//     {
//       nome: "Câncer",
//       categorias: ["Pele / Melanoma – CID C43 / D03", "Pulmão – CID C34"],
//     },
//     { nome: "Diabetes", categorias: ["Tipo 1", "Tipo 2"] },
//     { nome: "Cardíaca", categorias: ["Arritmia", "Insuficiência cardíaca"] },
//   ];

//   const [tipoSelecionado, setTipoSelecionado] = useState<string>("");
//   const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>("");

//   const categoriasDisponiveis =
//     tipos.find((t) => t.nome === tipoSelecionado)?.categorias || [];

//   const [apresentacao, setApresentacao] = useState(
//     "Sou ENGENHEIRO AGRÔNOMO, 1996, 2023. Sua principal área de atuação é promover o desenvolvimento sustentável..."
//   );
//   const [atividadePrincipal, setAtividadePrincipal] = useState(
//     "ENGENHARIA AGRÔNOMA"
//   );
//   // const [outrasAtividades, setOutrasAtividades] = useState(["GEOREFERÊNCIA"]);
//   const [participaEventos, setParticipaEventos] = useState(true);
//   const [armazenamentoMensagens, setArmazenamentoMensagens] =
//     useState("90 dias");
//   const [gpsMarcado, setGpsMarcado] = useState(false);
//   const [links, setLinks] = useState([
//     "https://www.gov.br/mda/pt-br",
//     "https://linktr.ee/mda",
//   ]);
//   const [contatosAdicionais, setContatosAdicionais] = useState([
//     {
//       nome: "Maria Oliveira",
//       usuario: "@mariaoliveira",
//       telefone: "(99) 9 9999-9999",
//       relacao: "Cônjuge",
//     },
//   ]);

//   const [outrasAtividades, setOutrasAtividades] = useState<
//     { tipo: string; categoria: string; modalidade: string }[]
//   >([]);
//   const [novaAtividade, setNovaAtividade] = useState({
//     tipo: "",
//     categoria: "",
//     modalidade: "",
//   });

//   // Função para adicionar
//   const adicionarAtividade = () => {
//     if (
//       !novaAtividade.tipo &&
//       !novaAtividade.categoria &&
//       !novaAtividade.modalidade
//     )
//       return;

//     setOutrasAtividades([...outrasAtividades, novaAtividade]);
//     setNovaAtividade({ tipo: "", categoria: "", modalidade: "" });
//   };

//   // Função para remover
//   const removerAtividade = (index: number) => {
//     setOutrasAtividades(outrasAtividades.filter((_, i) => i !== index));
//   };

//   const [outrosInteresses, setOutrosInteresses] = useState<
//     { tipo: string; categoria: string; modalidade: string }[]
//   >([]);
//   const [novoInteresse, setNovoInteresse] = useState({
//     tipo: "",
//     categoria: "",
//     modalidade: "",
//   });

//   // Função para adicionar
//   const adicionarInteresse = () => {
//     if (
//       !novoInteresse.tipo &&
//       !novoInteresse.categoria &&
//       !novoInteresse.modalidade
//     )
//       return;

//     setOutrosInteresses([...outrosInteresses, novoInteresse]);
//     setNovoInteresse({ tipo: "", categoria: "", modalidade: "" });
//   };

//   // Função para remover
//   const removerInteresse = (index: number) => {
//     setOutrosInteresses(outrosInteresses.filter((_, i) => i !== index));
//   };
//   // const [novaAtividade, setNovaAtividade] = useState("");
//   const [novoLink, setNovoLink] = useState("");

//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Funções para manipulação dos dados
//   const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     const file = e.target.files[0];
//     // Aqui você processaria a imagem selecionada
//   };

//   const openCamera = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.setAttribute("capture", "environment");
//       fileInputRef.current.click();
//     }
//   };

//   const openGallery = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.removeAttribute("capture");
//       fileInputRef.current.click();
//     }
//   };

//   const [opcoes, setOpcoes] = useState<string[]>([]);

//   const [opcaoSelecionada, setOpcaoSelecionada] = useState<string | null>(null);

//   // const adicionarAtividade = () => {
//   //   if (novaAtividade.trim()) {
//   //     setOutrasAtividades([...outrasAtividades, novaAtividade]);
//   //     setNovaAtividade("");
//   //   }
//   // };

//   // const removerAtividade = (index: number) => {
//   //   setOutrasAtividades(outrasAtividades.filter((_, i) => i !== index));
//   // };

//   const adicionarLink = () => {
//     if (novoLink.trim()) {
//       setLinks([...links, novoLink]);
//       setNovoLink("");
//     }
//   };

//   const removerLink = (index: number) => {
//     setLinks(links.filter((_, i) => i !== index));
//   };

//   const [escolaridade, setEscolaridade] = useState("");

//   const adicionarContato = () => {
//     if (contatosAdicionais.length < 3) {
//       setContatosAdicionais([
//         ...contatosAdicionais,
//         { nome: "", usuario: "", telefone: "", relacao: "Pais/Responsável" },
//       ]);
//     }
//   };

//   const removerContato = (index: number) => {
//     setContatosAdicionais(contatosAdicionais.filter((_, i) => i !== index));
//   };

//   const atualizarContato = (index: number, campo: string, valor: string) => {
//     const novosContatos = [...contatosAdicionais];
//     novosContatos[index] = { ...novosContatos[index], [campo]: valor };
//     setContatosAdicionais(novosContatos);
//   };

//   const salvarPerfil = () => {
//     alert("Perfil salvo com sucesso!");
//     // Aqui você implementaria a lógica para salvar no backend
//   };

//   return (
//     <div className="min-h-screen w-full bg-[#B6D2B7] mt-8">
//       {/* Cabeçalho */}
//       <header className="sticky top-0 bg-white shadow-sm z-10">
//         <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
//           <h1 className="text-xl font-bold text-green-700">
//             INFORMAÇÕES ADCIONAIS / EDITAR PERFIL
//           </h1>
//           <button
//             onClick={salvarPerfil}
//             className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg"
//           >
//             <Save size={18} /> Salvar
//           </button>
//         </div>
//       </header>

//       {/* SEÇÃO GPS */}
//       <div className="p-2 w-full justify-center">
//         <Label variant="perfil" className="uppercase mb-2 block">
//           Editar informações de Localização GPS
//         </Label>
//         <div className="p-2 flex gap-2 justify-center">
//           <GpsButton />
//         </div>
//       </div>

//       <div className="p-2 w-full">
//         {/* Seção Foto de Perfil */}
//         <div className="w-full mt-2">
//           <Label variant="perfil">FOTO PERFIL</Label>

//           {/* Foto à esquerda e botões à direita */}
//           <div className="flex items-center gap-6 justify-center">
//             {/* Foto quadrada */}
//             <div className="w-32 h-32 rounded-lg bg-gray-200 border-2 border-dashed flex-shrink-0  border-black" />

//             {/* Botões */}
//             <div className="flex flex-col gap-3">
//               <button
//                 onClick={openCamera}
//                 className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg w-full mt-2 justify-center"
//               >
//                 <Camera size={20} className="text-green-600" />
//                 <span className="text-sm">Selfie</span>
//               </button>

//               <button
//                 onClick={openGallery}
//                 className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg w-full mt-2 justify-center"
//               >
//                 <span className="text-green-600 font-bold text-lg">...</span>
//                 <span className="text-sm">Procurar</span>
//               </button>
//             </div>
//           </div>

//           {/* Input oculto */}
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={handleImageSelect}
//           />
//         </div>
//         {/* Seção Gênero e Raça/Cor */}
//         <div className="w-full mt-2">
//           <Label variant="perfil">GÊNERO</Label>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
//             <div className="flex flex-nowrap justify-center items-center gap-2 md:gap-2 ">
//               {["Masculino", "Feminino", "LGBTQI+", "Não declarar"].map(
//                 (opcao) => (
//                   <button
//                     key={opcao}
//                     onClick={() => setCodGenero(opcao)}
//                     className={`whitespace-nowrap shrink px-3 py-2 text-[11px] leading-tight tracking-tight rounded-lg border transition-colors duration-200
//                         md:px-3 md:py-2 md:text-sm
//                         ${
//                           CodGenero === opcao
//                             ? "bg-green-700 border-green-500 text-white hover:border-green-600" // Selecionado → Verde
//                             : "bg-orange-100 border-orange-500 text-orange-700 hover:border-orange-600" // Não selecionado → Laranja
//                         }`}
//                   >
//                     {opcao}
//                   </button>
//                 )
//               )}
//             </div>
//           </div>

//           <div className="w-full mt-2">
//             <Label variant="perfil">RAÇA/COR</Label>
//             <div className="flex flex-wrap gap-2 justify-center">
//               {["Negra", "Pardo", "Branco", "Indígena", "Amarelo"].map(
//                 (opcao) => (
//                   <button
//                     key={opcao}
//                     onClick={() => setCodRaca(opcao)}
//                     className={`whitespace-nowrap shrink px-3 py-2 text-[11px] leading-tight tracking-tight rounded-lg border transition-colors duration-200
//                         md:px-3 md:py-2 md:text-sm
//                         ${
//                           CodRaca === opcao
//                             ? "bg-green-700 border-green-500 text-white hover:border-green-600" // Selecionado → Verde
//                             : "bg-orange-100 border-orange-500 text-orange-700 hover:border-orange-600" // Não selecionado → Laranja
//                         }`}
//                   >
//                     {opcao}
//                   </button>
//                 )
//               )}
//             </div>
//           </div>
//           <div className="w-full mt-2">
//             <Label variant="perfil">
//               PRECISA CUIDADO ESPECIAL OU TEM DOENÇA CRÔNICA?
//             </Label>

//             {/* Container flex para botões + input */}
//             <div className="flex flex-wrap items-center gap-2 mt-2">
//               {["Sim", "Nao"].map((opcao) => (
//                 <button
//                   key={opcao}
//                   onClick={() => setDoencaCronica(opcao)}
//                   className={`px-3 py-2 rounded-lg border transition-colors duration-200 whitespace-nowrap ${
//                     doencaCronica === opcao
//                       ? "bg-green-700 border-green-500 text-white hover:border-green-600"
//                       : "bg-orange-100 border-orange-500 text-orange-700 hover:border-orange-600"
//                   }`}
//                 >
//                   {opcao}
//                 </button>
//               ))}

//               {/* Input ao lado dos botões */}
//               <input
//                 type="text"
//                 placeholder="Especifique a doença ou cuidado"
//                 value={detalheDoenca}
//                 onChange={(e) => setDetalheDoenca(e.target.value)}
//                 disabled={doencaCronica !== "Sim"}
//                 className={`flex-1 min-w-[150px] p-3 border rounded-lg transition-colors duration-200
//             ${
//               doencaCronica === "Sim"
//                 ? "border-green-500 bg-white text-black"
//                 : "border-gray-300 bg-gray-100 text-gray-500"
//             }`}
//               />
//             </div>
//           </div>

//           <div className="p-2">
//             <Label variant="perfil">
//               CUIDADO ESPECIAL OU DOENÇA CRÔNICA /{" "}
//               <a href="#" className="text-blue-600 underline">
//                 PCD
//               </a>
//             </Label>

//             <div className="flex flex-col gap-4">
//               {/* Tipo */}
//               <div className="flex items-center gap-2">
//                 <span className="w-24 font-semibold text-sm">Tipo</span>
//                 <select
//                   className="flex-1 border border-black p-2 rounded-md text-sm"
//                   value={tipoSelecionado}
//                   onChange={(e) => {
//                     setTipoSelecionado(e.target.value);
//                     setCategoriaSelecionada(""); // resetar categoria ao trocar tipo
//                   }}
//                 >
//                   <option value="">Selecione...</option>
//                   {tipos.map((tipo) => (
//                     <option key={tipo.nome} value={tipo.nome}>
//                       {tipo.nome}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Categoria */}
//               <div className="flex items-center gap-2">
//                 <span className="w-24 font-semibold text-sm">Categoria</span>
//                 <select
//                   className="flex-1 border border-black p-2 rounded-md text-sm"
//                   value={categoriaSelecionada}
//                   onChange={(e) => setCategoriaSelecionada(e.target.value)}
//                   disabled={!tipoSelecionado}
//                 >
//                   <option value="">Selecione...</option>
//                   {categoriasDisponiveis.map((cat) => (
//                     <option key={cat} value={cat}>
//                       {cat}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Seção Apresentação */}
//           <div className="p-2">
//             <Label variant="perfil">APRESENTAÇÃO E INFORMAÇÕES</Label>

//             <div className="relative">
//               <textarea
//                 value={apresentacao}
//                 onChange={(e) => {
//                   if (e.target.value.length <= 3000) {
//                     setApresentacao(e.target.value);
//                   }
//                 }}
//                 className="w-full mt-2 h-40 p-4 border rounded-lg resize-none border-orange-700"
//                 placeholder="Fale sobre você, sua formação, experiência profissional e interesses..."
//               />

//               {/* Contador de caracteres */}
//               <span className="absolute bottom-2 right-3 text-xs text-gray-500">
//                 {apresentacao.length}/3000
//               </span>
//             </div>
//           </div>

//           {/* Seção Atividades Profissionais */}
//           <div className="p-2">
//             <Label variant="perfil">ATIVIDADES PROFISSIONAIS</Label>

//             <div className="mt-4 space-y-4">
//               {" "}
//               {/* Espaçamento entre cada linha */}
//               {/* Linha 1: Tipo */}
//               <div className="flex items-center gap-2">
//                 <span className="w-36 font-semibold text-sm">TIPO</span>
//                 <input
//                   type="text"
//                   value={atividadePrincipal}
//                   onChange={(e) => setAtividadePrincipal(e.target.value)}
//                   className="flex-1 border border-black p-2 rounded-md text-sm"
//                 />
//               </div>
//               {/* Linha 2: Categoria */}
//               <div className="flex items-center gap-2">
//                 <span className="w-36 font-semibold text-sm">CATEGORIA</span>
//                 <input
//                   type="text"
//                   value={atividadePrincipal}
//                   onChange={(e) => setAtividadePrincipal(e.target.value)}
//                   className="flex-1 border border-black p-2 rounded-md text-sm"
//                 />
//               </div>
//               {/* Linha 3: Modalidade */}
//               <div className="flex items-center gap-2">
//                 <span className="w-36 font-semibold text-sm">MODALIDADE</span>
//                 <input
//                   type="text"
//                   value={atividadePrincipal}
//                   onChange={(e) => setAtividadePrincipal(e.target.value)}
//                   className="flex-1 border border-black p-2 rounded-md text-sm"
//                 />
//               </div>
//             </div>

//             {/* Seção Outras Atividades Profissionais */}
//             <div className="mt-2">
//               <Label variant="perfil">OUTRAS ATIVIDADES PROFISSIONAIS</Label>

//               {/* Inputs para adicionar nova atividade */}
//               <div className="flex flex-col gap-2 mb-2">
//                 <div className="flex items-center gap-2">
//                   <span className="w-36 font-semibold text-sm">TIPO</span>
//                   <input
//                     type="text"
//                     value={novaAtividade.tipo}
//                     onChange={(e) =>
//                       setNovaAtividade({
//                         ...novaAtividade,
//                         tipo: e.target.value,
//                       })
//                     }
//                     className="flex-1 border border-black p-2 rounded-md text-sm"
//                     placeholder="Tipo"
//                   />
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <span className="w-36 font-semibold text-sm">CATEGORIA</span>
//                   <input
//                     type="text"
//                     value={novaAtividade.categoria}
//                     onChange={(e) =>
//                       setNovaAtividade({
//                         ...novaAtividade,
//                         categoria: e.target.value,
//                       })
//                     }
//                     className="flex-1 border border-black p-2 rounded-md text-sm"
//                     placeholder="Categoria"
//                   />
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <span className="w-36 font-semibold text-sm">MODALIDADE</span>
//                   <input
//                     type="text"
//                     value={novaAtividade.modalidade}
//                     onChange={(e) =>
//                       setNovaAtividade({
//                         ...novaAtividade,
//                         modalidade: e.target.value,
//                       })
//                     }
//                     className="flex-1 border border-black p-2 rounded-md text-sm"
//                     placeholder="Modalidade"
//                   />
//                 </div>
//               </div>

//               {/* Botão Adicionar */}
//               <div className="flex justify-end">
//                 <button
//                   onClick={adicionarAtividade}
//                   className="bg-green-600 text-white px-4 py-2 rounded-lg"
//                 >
//                   Adicionar
//                 </button>
//               </div>
//             </div>
//             {/* Lista de atividades adicionadas em cards responsivos */}
//             <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 gap-4 mb-4">
//               {outrasAtividades.map((atividade, index) => (
//                 <div
//                   key={index}
//                   className="bg-green-100 p-1 rounded-lg shadow flex flex-col justify-between"
//                 >
//                   {/* Conteúdo da atividade */}
//                   <div className="flex flex-col gap-1">
//                     <span className="text-sm">
//                       <strong>Tipo:</strong> {atividade.tipo}
//                     </span>
//                     <span className="text-sm">
//                       <strong>Categoria:</strong> {atividade.categoria}
//                     </span>
//                     <span className="text-sm">
//                       <strong>Modalidade:</strong> {atividade.modalidade}
//                     </span>
//                   </div>

//                   {/* Botão remover */}
//                   <Button
//                     variant="danger"
//                     onClick={() => removerAtividade(index)}
//                     // className="self-end mt-2 text-red-500 hover:text-red-700"
//                   >
//                     <Trash2 size={16} />
//                   </Button>
//                 </div>
//               ))}
//             </div>

//             {/* Seção Outras Atividades Profissionais */}
//             <div className="mt-2">
//               <Label variant="perfil">ASSUNTOS COM INTERESSE</Label>

//               {/* Inputs para adicionar nova atividade */}
//               <div className="flex flex-col gap-2 mb-2">
//                 <div className="flex items-center gap-2">
//                   <span className="w-36 font-semibold text-sm">TIPO</span>
//                   <input
//                     type="text"
//                     value={novoInteresse.tipo}
//                     onChange={(e) =>
//                       setNovoInteresse({
//                         ...novoInteresse,
//                         tipo: e.target.value,
//                       })
//                     }
//                     className="flex-1 border border-black p-2 rounded-md text-sm"
//                     placeholder="Tipo"
//                   />
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <span className="w-36 font-semibold text-sm">CATEGORIA</span>
//                   <input
//                     type="text"
//                     value={novoInteresse.categoria}
//                     onChange={(e) =>
//                       setNovoInteresse({
//                         ...novoInteresse,
//                         categoria: e.target.value,
//                       })
//                     }
//                     className="flex-1 border border-black p-2 rounded-md text-sm"
//                     placeholder="Categoria"
//                   />
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <span className="w-36 font-semibold text-sm">MODALIDADE</span>
//                   <input
//                     type="text"
//                     value={novoInteresse.modalidade}
//                     onChange={(e) =>
//                       setNovoInteresse({
//                         ...novoInteresse,
//                         modalidade: e.target.value,
//                       })
//                     }
//                     className="flex-1 border border-black p-2 rounded-md text-sm"
//                     placeholder="Modalidade"
//                   />
//                 </div>
//               </div>

//               {/* Botão Adicionar */}
//               <div className="flex justify-end">
//                 <button
//                   onClick={adicionarInteresse}
//                   className="bg-green-600 text-white px-4 py-2 rounded-lg"
//                 >
//                   Adicionar
//                 </button>
//               </div>
//             </div>
//             {/* Lista de atividades adicionadas em cards responsivos */}
//             <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 gap-4 mb-4">
//               {outrosInteresses.map((interesse, index) => (
//                 <div
//                   key={index}
//                   className="bg-green-100 p-1 rounded-lg shadow flex flex-col justify-between"
//                 >
//                   {/* Conteúdo da interesse */}
//                   <div className="flex flex-col gap-1">
//                     <span className="text-sm">
//                       <strong>Tipo:</strong> {interesse.tipo}
//                     </span>
//                     <span className="text-sm">
//                       <strong>Categoria:</strong> {interesse.categoria}
//                     </span>
//                     <span className="text-sm">
//                       <strong>Modalidade:</strong> {interesse.modalidade}
//                     </span>
//                   </div>

//                   {/* Botão remover */}
//                   <Button
//                     variant="danger"
//                     onClick={() => removerInteresse(index)}
//                     // className="self-end mt-2 text-red-500 hover:text-red-700"
//                   >
//                     <Trash2 size={16} />
//                   </Button>
//                 </div>
//               ))}
//             </div>

//             <div className="flex flex-wrap gap-4 justify-center">
//               <Label variant="perfil" className="uppercase mb-2 block">
//                 escolha uma opção
//               </Label>
//               {["Sou Estudante", "Sou Trabalhador", "Sou Empreendedor"].map(
//                 (opcao) => (
//                   <label
//                     key={opcao}
//                     className="flex items-center space-x-2 cursor-pointer text-sm md:text-base"
//                   >
//                     <input
//                       type="checkbox"
//                       checked={opcaoSelecionada === opcao}
//                       onChange={() =>
//                         setOpcaoSelecionada(
//                           opcaoSelecionada === opcao ? null : opcao
//                         )
//                       }
//                       className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
//                     />
//                     <span>{opcao}</span>
//                   </label>
//                 )
//               )}
//             </div>
//           </div>
//           <div className="p-2 w-full">
//             <Label variant="perfil" className="uppercase">
//               Qual a sua Escolaridade
//             </Label>
//             <select
//               value={escolaridade}
//               onChange={(e) => setEscolaridade(e.target.value)}
//               className="w-full mt-2 p-3 border rounded-lg text-sm md:text-base focus:border-green-500 focus:ring-2 focus:ring-green-200"
//             >
//               <option value="" disabled>
//                 Selecione uma opção
//               </option>
//               {[
//                 "Sem escolaridade",
//                 "Educação Infantil",
//                 "Ensino Fundamental Incompleto",
//                 "Ensino Fundamental Completo",
//                 "Ensino Médio Incompleto",
//                 "Ensino Médio Completo",
//                 "Curso Técnico",
//                 "Ensino Superior Incompleto",
//                 "Ensino Superior Completo",
//                 "Pós-Graduação Lato Sensu (Especialização)",
//                 "Mestrado",
//                 "Doutorado",
//                 "Pós-Doutorado",
//               ].map((opcao) => (
//                 <option key={opcao} value={opcao}>
//                   {opcao}
//                 </option>
//               ))}
//             </select>
//           </div>
//           {/* Seção Vínculos Sociais */}
//           <div className="w-full mt-2">
//             <Label variant="perfil">VÍNCULOS SOCIAIS</Label>

//             <p className="flex !text-center !justify-center">
//               PCD.GÉNERO.CULTURA.SOCIAL. SSE .MEIO AMBIENTE
//             </p>

//             <div className="flex w-full mt-2 justify-center mb-2">
//               <VinculosSociais />
//             </div>
//           </div>

//           {/* Seção Preferências e Configurações */}
//           <div className="w-full p-2 justify-center">
//             <Label
//               variant="perfil"
//               className="flex flex-col items-start text-left text-lg font-semibold mb-4 p-1 rounded-lg bg-gray-100"
//             >
//               {/* Título principal */}
//               <span className="text-lg font-bold">
//                 PREFERÊNCIAS E CONFIGURAÇÕES
//               </span>

//               {/* Subtítulo / Pergunta */}
//               <span className="text-base font-medium text-gray-700 mt-1">
//                 Deseja participara de Encontros de Grupos; Eventos, Feiras;
//                 Aulas e Treinos Especiais; Campeonatos e Disputas; Palestras
//                 etc.?
//               </span>
//             </Label>

//             <div className="space-y-6">
//               <div>
//                 <div className="flex gap-4 justify-center">
//                   <button
//                     onClick={() => setParticipaEventos(true)}
//                     className={`px-4 py-2 rounded-lg border ${
//                       participaEventos
//                         ? "bg-green-100 border-green-500 text-green-700"
//                         : "bg-gray-100 border-gray-300"
//                     }`}
//                   >
//                     Sim
//                   </button>
//                   <button
//                     onClick={() => setParticipaEventos(false)}
//                     className={`px-4 py-2 rounded-lg border ${
//                       !participaEventos
//                         ? "bg-green-100 border-green-500 text-green-700"
//                         : "bg-gray-100 border-gray-300"
//                     }`}
//                   >
//                     Não
//                   </button>
//                 </div>
//               </div>

//               <div>
//                 <Label variant="perfil">
//                   As mensagens e arquivos do CHAT ficarão salvas por:
//                 </Label>
//                 <div className="grid grid-cols-5 gap-2 md:grid-cols-4">
//                   {[
//                     "15 dias",
//                     "30 dias",
//                     "45 dias",
//                     "60 dias",
//                     "90 dias",
//                     "120 dias",
//                     "180 dias",
//                     "360 dias",
//                     "NUNCA",
//                   ].map((opcao) => (
//                     <button
//                       key={opcao}
//                       onClick={() => setArmazenamentoMensagens(opcao)}
//                       className={`px-2 py-2 rounded-lg border text-sm ${
//                         armazenamentoMensagens === opcao
//                           ? "bg-green-100 border-green-500 text-green-700"
//                           : "bg-gray-100 border-gray-300"
//                       }`}
//                     >
//                       {opcao}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
          

//           {/* Seção Referências Geográficas */}
//           <div className="w-full p-2">
//             <Label variant="perfil">
//               REFERÊNCIAS GEOGRÁFICAS
//             </Label>
//             </div>
//             <div className="space-y-4">
             
//             </div>
          
//               <div className="w-full p-2">
//                 <h3 className="font-medium mb-2">LINKS</h3>
//                 <div className="space-y-2 mb-3">
//                   {links.map((link, index) => (
//                     <div key={index} className="flex items-center">
//                       <LinkIcon size={16} className="text-green-600 mr-2" />
//                       <a
//                         href={link}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-600 truncate"
//                       >
//                         {link}
//                       </a>
//                       <button
//                         onClick={() => removerLink(index)}
//                         className="ml-2 text-red-500"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     value={novoLink}
//                     onChange={(e) => setNovoLink(e.target.value)}
//                     className="flex-1 p-2 border rounded-lg"
//                     placeholder="Adicionar novo link"
//                   />
//                   <button
//                     onClick={adicionarLink}
//                     className="bg-green-600 text-white px-4 py-2 rounded-lg"
//                   >
//                     Adicionar
//                   </button>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2">
//                   Sugerimos que faça o seu Linktree, é Gratuito e Fácil:
//                   <a
//                     href="https://linktr.ee/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 ml-1"
//                   >
//                     https://linktr.ee/
//                   </a>
//                 </p>
//               </div>
//             </div>
        

//           {/* Botão Salvar */}
//           <div className="sticky bottom-4 z-10">
//             <button
//               onClick={salvarPerfil}
//               className="w-full mt-2 py-4 bg-green-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-green-700"
//             >
//               SALVAR PERFIL
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }