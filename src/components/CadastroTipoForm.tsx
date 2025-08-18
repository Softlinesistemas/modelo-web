'use client';

/**
 * CadastroTipoForm.tsx
 * - Componente completo e tipado
 * - Mantém todas as seções do seu original (modal, identificação, endereço, etc.)
 * - Adiciona um card inicial "Campos do tipo selecionado" que renderiza dinamicamente a prop `fields`
 * - Exporta `FieldDef` (inclui `type`) para uso no page.tsx
 * - Evita pitfalls de tipagem (ex.: Checkbox e Select customizados)
 */

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/utils/ui/Card';
import { Button } from '@/utils/ui/Button';
import { Checkbox } from '@/utils/ui/checkbox';
import { MultiSelectButtonGroup } from '@/utils/ui/MultiSelectButtonGroup';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/utils/ui/Select';
import { Textarea } from '@/utils/ui/Textarea';

/** Tipo dos campos dinâmicos que chegam do page.tsx */
export interface FieldDef {
  name: string;
  label: string;
  /** text | number | email | date | password etc.  */
  type?: string;
  required?: boolean;
  placeholder?: string;
  options?: OptionDef[];
  prefix?: string;
  mask? : string;
  fields?: FieldDef[];
  max?: number;
}
export interface OptionDef {
  value: string | number;
  label: string;
}

/** Props do componente */
export interface CadastroTipoFormProps {
  /** Ex.: "autônomo", "empresa", etc. — só informativo/estratégico */
  tipo: string;
  /** Campos extras para renderização dinâmica (card inicial) */
  fields: FieldDef[];
  initialValues?: Record<string, any>; 
}

export default function CadastroTipoForm({ tipo, fields }: CadastroTipoFormProps) {
  // Estado do modal de boas-vindas
  const [showModal, setShowModal] = useState(true);

  // Estados de seleção (mantidos do seu original)
  const [visibilidade, setVisibilidade] = useState<Array<string | number>>([]);
  const [delivery, setDelivery] = useState<Array<string | number>>([]);
  const [prazoChat, setPrazoChat] = useState('');
  const [participaEventos, setParticipaEventos] = useState<Array<string | number>>([]);
  const [autorizo, setAutorizo] = useState(false);
  const [referenciasGeo, setReferenciasGeo] = useState<Array<string | number>>([]);
  const [condicoesEspeciais, setCondicoesEspeciais] = useState<Array<string | number>>([]);
  const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);

  // Estado simples para armazenar valores do card dinâmico
  const [dynamicData, setDynamicData] = useState<Record<string, string>>({});

  // Handler genérico para inputs do card dinâmico
  const handleDynamicChange = (name: string, value: string) => {
    setDynamicData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit geral (se quiser capturar tudo, conecta aqui)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você poderia enviar tudo que precisa: dynamicData + demais estados
    // Mantive simples para não alterar sua lógica original.
    console.log('SUBMIT :: tipo:', tipo, {
      dynamicData,
      visibilidade,
      delivery,
      prazoChat,
      participaEventos,
      autorizo,
      referenciasGeo,
      condicoesEspeciais,
      fotoPerfil: fotoPerfil?.name ?? null,
    });
    alert('Cadastro enviado! (veja o console do navegador para os dados coletados)');
  };

  return (
    <div className="p-4">
      {/* MODAL DE BOAS-VINDAS */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <Card className="max-w-lg w-full p-6">
            <CardHeader>
              <CardTitle>Bem-vindo ao GooAgro!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm whitespace-pre-line">
                {`Olá Usuário-GG! Parabéns pela escolha do GooAgro para participar de grupos com os mesmos propósitos que você tem!

Para grupos:
• Criar grupos;
• Facilitar, organizar e controlar.

Para pessoas:
• Procurar e ser procurado;
• Convidar e ser convidado para grupos que têm interesse.

Quando puder, coloque mais informações e interesses para participar de eventos, feiras, aulas e muito mais.`}
              </p>
              <Button variant="primary" size="md" onClick={() => setShowModal(false)}>
                Continuar
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* FORM: mantém toda a estrutura do seu original */}
      {!showModal && (
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* CAMPOS DINÂMICOS (usa os `fields` do page.tsx) */}
          {fields?.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>{`Campos do tipo selecionado (${tipo})`}</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map((f) => (
                  <div key={f.name} className="flex flex-col">
                    <label className="text-sm font-medium mb-1">{f.label}</label>
                    <input
                      type={f.type || 'text'}
                      name={f.name}
                      placeholder={f.placeholder || f.label}
                      required={f.required}
                      className="input"
                      value={dynamicData[f.name] || ''}
                      onChange={(e) => handleDynamicChange(f.name, e.target.value)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* IDENTIFICAÇÃO */}
          <Card>
            <CardHeader><CardTitle>Identificação</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="nome" placeholder="Nome completo" className="input" required />
              <input name="nomePublico" placeholder="Nome público no GooAgro" className="input" required />
              <input name="usuarioGG" placeholder="Usuário GooAgro (@usuario)" className="input" required />
              <input name="cpf" placeholder="CPF" className="input" required />
              <input name="telefone1" placeholder="Telefone principal" className="input" required />
              <input name="telefone2" placeholder="Telefone secundário" className="input" />
              <input type="email" name="email" placeholder="Email" className="input" required />
              <input type="password" name="senha" placeholder="Senha (6–8 caracteres, 1 letra)" className="input" required />
              <input type="password" name="confirmarSenha" placeholder="Confirmar senha" className="input" required />
            </CardContent>
          </Card>

          {/* ENDEREÇO */}
          <Card>
            <CardHeader><CardTitle>Endereço</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="cidadeUF" placeholder="Cidade / UF" className="input" required />
              <input name="bairro" placeholder="Bairro" className="input" required />
              <input name="cep" placeholder="CEP" className="input" required />
              <input name="endereco" placeholder="Endereço" className="input" required />
            </CardContent>
          </Card>

          {/* VISIBILIDADE */}
          <Card>
            <CardHeader><CardTitle>Visibilidade</CardTitle></CardHeader>
            <CardContent>
              <MultiSelectButtonGroup
                title="A minha pública poderá ser vista por:"
                options={[
                  { value: '1', label: 'Qualquer usuário do GooAgro' },
                  { value: '2', label: 'Somente meus amigos do GooAgro' },
                  { value: '3', label: 'Oculta – ninguém poderá ver' },
                ]}
                selectedValues={visibilidade}
                onChange={setVisibilidade}
                singleSelect
              />
            </CardContent>
          </Card>

          {/* DELIVERY */}
          <Card>
            <CardHeader><CardTitle>Delivery</CardTitle></CardHeader>
            <CardContent>
              <MultiSelectButtonGroup
                title="É delivery (entrega ao cliente)?"
                options={[
                  { value: 'sim', label: 'Sim' },
                  { value: 'nao', label: 'Não' },
                ]}
                selectedValues={delivery}
                onChange={setDelivery}
                singleSelect
              />
            </CardContent>
          </Card>

          {/* CATEGORIA / TIPO / MODALIDADE */}
          <Card>
            <CardHeader><CardTitle>Categoria / Tipo / Modalidade</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="categoria" placeholder="Categoria" className="input" required />
              <input name="tipo" placeholder="Tipo" className="input" required />
              <input name="modalidade" placeholder="Modalidade" className="input" required />
              <input name="localEntrega" placeholder="Local da entrega" className="input" required />
            </CardContent>
          </Card>

          {/* CONTATOS ADICIONAIS */}
          <Card>
            <CardHeader><CardTitle>Contatos adicionais (até 3)</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-2 border p-3 rounded-lg">
                  <input name={`contato${i}_nome`} placeholder="Nome" className="input" />
                  <input name={`contato${i}_relacao`} placeholder="Relação" className="input" />
                  <input name={`contato${i}_usuario`} placeholder="Usuário GooAgro" className="input" />
                  <input name={`contato${i}_telefone`} placeholder="Telefone" className="input" />
                  <input name={`contato${i}_email`} placeholder="Email" className="input" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* OUTRAS INFORMAÇÕES */}
          <Card>
            <CardHeader><CardTitle>Outras informações</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              <Textarea name="outrasAtividades" placeholder="Outras atividades profissionais" />
              <Textarea name="apresentacao" placeholder="Apresentação e informações" />
              <MultiSelectButtonGroup
                title="Deseja participar de eventos, feiras, campeonatos?"
                options={[
                  { value: 'sim', label: 'Sim' },
                  { value: 'nao', label: 'Não' },
                ]}
                selectedValues={participaEventos}
                onChange={setParticipaEventos}
                singleSelect
              />
              <input name="educacao" placeholder="Nível/Série/Grau de educação" className="input" />
              <input name="link1" placeholder="Link 1" className="input" />
              <input name="link2" placeholder="Link 2" className="input" />
              <input name="link3" placeholder="Link 3" className="input" />
            </CardContent>
          </Card>

          {/* AUTORIZAÇÕES */}
          <Card>
            <CardHeader><CardTitle>Autorizações</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {/* Usamos um toggler simples para evitar divergência de tipos do componente Checkbox */}
                <Checkbox checked={autorizo} onChange={() => setAutorizo((v) => !v)} />
                <span>Autorizo receber mensagens vinculadas aos meus interesses e atividades profissionais neste perfil.</span>
              </div>
            </CardContent>
          </Card>

          {/* FOTO PERFIL */}
          <Card>
            <CardHeader><CardTitle>Foto de perfil (selfie)</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFotoPerfil(e.target.files?.[0] || null)}
              />
              {fotoPerfil && (
                <img
                  src={URL.createObjectURL(fotoPerfil)}
                  alt="Pré-visualização"
                  className="w-32 h-32 object-cover rounded-full"
                />
              )}
            </CardContent>
          </Card>

          {/* GPS */}
          <Card>
            <CardHeader><CardTitle>Coordenadas GPS</CardTitle></CardHeader>
            <CardContent>
              <input name="gps" placeholder="Coordenadas GPS (opcional)" className="input" />
            </CardContent>
          </Card>

          {/* PRAZO DE CHAT */}
          <Card>
            <CardHeader><CardTitle>Prazo para manter arquivos do chat</CardTitle></CardHeader>
            <CardContent>
              {/* Mantido como no seu original. Se seu Select for baseado no shadcn, geralmente usa onValueChange.
                 Como você já compilava com onChange, mantive para evitar quebra. */}
              <Select value={prazoChat} onChange={setPrazoChat as unknown as (v: string) => void}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {['15', '30', '45', '60', '90', '120', '180', '360', 'nunca'].map((val) => (
                    <SelectItem key={val} value={val}>
                      {val === 'nunca' ? 'Nunca' : `${val} dias`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* REFERÊNCIAS GEOGRÁFICAS */}
          <Card>
            <CardHeader><CardTitle>Referências geográficas</CardTitle></CardHeader>
            <CardContent>
              <MultiSelectButtonGroup
                options={[
                  { value: 'sisal', label: 'TI_04 - SISAL' },
                  { value: 'bioma', label: 'Bioma' },
                  { value: 'povos', label: 'Povos tradicionais' },
                ]}
                selectedValues={referenciasGeo}
                onChange={setReferenciasGeo}
              />
            </CardContent>
          </Card>

          {/* CONDIÇÕES ESPECIAIS */}
          <Card>
            <CardHeader><CardTitle>Condições especiais</CardTitle></CardHeader>
            <CardContent>
              <MultiSelectButtonGroup
                options={[
                  { value: 'pcd', label: 'PCD / Doença crônica' },
                  { value: 'voluntariado', label: 'Projeto social sem fins lucrativos / Voluntariado' },
                  { value: 'economiaSolidaria', label: 'Economia solidária' },
                  { value: 'racaCor', label: 'De raça/cor' },
                  { value: 'genero', label: 'De gênero' },
                  { value: 'culturaPopular', label: 'Cultura popular' },
                  { value: 'acaoAmbiental', label: 'Ação ambiental / Ecologia' },
                  { value: 'religiao', label: 'Religião' },
                  { value: 'vinculosSociais', label: 'Vínculos sociais' },
                ]}
                selectedValues={condicoesEspeciais}
                onChange={setCondicoesEspeciais}
              />
            </CardContent>
          </Card>

          {/* ASSUNTOS DE INTERESSE */}
          <Card>
            <CardHeader><CardTitle>Assuntos de interesse</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="assuntoTipo" placeholder="Assunto - Tipo" className="input" />
              <input name="assuntoModalidade" placeholder="Assunto - Modalidade" className="input" />
              <input name="assuntoCategoria" placeholder="Assunto - Categoria" className="input" />
            </CardContent>
          </Card>

          {/* BOTÃO SALVAR */}
          <Button type="submit" variant="primary" size="md" className="w-full">
            Salvar Cadastro
          </Button>
        </form>
      )}
    </div>
  );
}
