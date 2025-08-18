

'use client';

/**
 * CadastroTipoForm.tsx
 * Formulário completo para tipos diferentes
 * - Sem modal
 * - Campos dinâmicos
 * - Identificação completa
 * - Endereço
 * - Multiselects e checkboxes
 * - Foto de perfil
 * - Submit funcionando
 */

import { useState } from 'react';
import { Button } from '@/utils/ui/Button';
import { Checkbox } from '@/utils/ui/checkbox';
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
  // Estado de todos os campos dinâmicos
  const [dynamicData, setDynamicData] = useState<Record<string, any>>({});

  // Estados adicionais
  const [visibilidade, setVisibilidade] = useState<string[]>([]);
  const [delivery, setDelivery] = useState<string[]>([]);
  const [autorizo, setAutorizo] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);

  // Handle campos dinâmicos
  const handleDynamicChange = (name: string, value: any) => {
    setDynamicData(prev => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      tipo,
      dynamicData,
      visibilidade,
      delivery,
      autorizo,
      fotoPerfil: fotoPerfil?.name ?? null,
    };
    console.log(payload);
    alert('Cadastro enviado! Veja console.');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-4">
      <h2 className="text-2xl font-bold mb-6">Cadastro de {tipo}</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Campos dinâmicos */}
        {fields.length > 0 && (
          <div className="border p-4 rounded-lg space-y-4">
            <h3 className="font-semibold">Informações adicionais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map(f => (
                <div key={f.name} className="flex flex-col">
                  <label className="mb-1">{f.label}</label>
                  {f.type === 'textarea' ? (
                    <Textarea
                      placeholder={f.placeholder || f.label}
                      required={f.required}
                      value={dynamicData[f.name] || ''}
                      onChange={e => handleDynamicChange(f.name, e.target.value)}
                    />
                  ) : (
                    <input
                      type={f.type || 'text'}
                      placeholder={f.placeholder || f.label}
                      required={f.required}
                      className="input"
                      value={dynamicData[f.name] || ''}
                      onChange={e => handleDynamicChange(f.name, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Identificação */}
        <div className="border p-4 rounded-lg space-y-4">
          <h3 className="font-semibold">Identificação</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Nome completo"
              className="input"
              required
              onChange={e => handleDynamicChange('nome', e.target.value)}
            />
            <input
              placeholder="Nome público"
              className="input"
              required
              onChange={e => handleDynamicChange('nomePublico', e.target.value)}
            />
            <input
              placeholder="Usuário GooAgro"
              className="input"
              required
              onChange={e => handleDynamicChange('usuarioGG', e.target.value)}
            />
            <input
              placeholder="CPF"
              className="input"
              required
              onChange={e => handleDynamicChange('cpf', e.target.value)}
            />
            <input
              placeholder="Telefone principal"
              className="input"
              required
              onChange={e => handleDynamicChange('telefone1', e.target.value)}
            />
            <input
              placeholder="Telefone secundário"
              className="input"
              onChange={e => handleDynamicChange('telefone2', e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="input"
              required
              onChange={e => handleDynamicChange('email', e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              className="input"
              required
              onChange={e => handleDynamicChange('senha', e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirmar senha"
              className="input"
              required
              onChange={e => handleDynamicChange('confirmarSenha', e.target.value)}
            />
          </div>
        </div>

        {/* Endereço */}
        <div className="border p-4 rounded-lg space-y-4">
          <h3 className="font-semibold">Endereço</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Cidade / UF"
              className="input"
              required
              onChange={e => handleDynamicChange('cidadeUF', e.target.value)}
            />
            <input
              placeholder="Bairro"
              className="input"
              required
              onChange={e => handleDynamicChange('bairro', e.target.value)}
            />
            <input
              placeholder="CEP"
              className="input"
              required
              onChange={e => handleDynamicChange('cep', e.target.value)}
            />
            <input
              placeholder="Endereço"
              className="input"
              required
              onChange={e => handleDynamicChange('endereco', e.target.value)}
            />
          </div>
        </div>

        {/* Multiselects e Checkboxes */}
        <div className="border p-4 rounded-lg space-y-4">
          <h3 className="font-semibold">Preferências</h3>

          {/* Visibilidade */}
          <div>
            <span className="block mb-1">Visibilidade:</span>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={visibilidade.includes('publico')}
                  onCheckedChange={checked =>
                    setVisibilidade(prev =>
                      checked ? [...prev, 'publico'] : prev.filter(v => v !== 'publico')
                    )
                  }
                />
                Público
              </label>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={visibilidade.includes('privado')}
                  onCheckedChange={checked =>
                    setVisibilidade(prev =>
                      checked ? [...prev, 'privado'] : prev.filter(v => v !== 'privado')
                    )
                  }
                />
                Privado
              </label>
            </div>
          </div>

          {/* Delivery */}
          <div>
            <span className="block mb-1">Delivery:</span>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={delivery.includes('sim')}
                  onCheckedChange={checked =>
                    setDelivery(prev =>
                      checked ? [...prev, 'sim'] : prev.filter(v => v !== 'sim')
                    )
                  }
                />
                Sim
              </label>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={delivery.includes('nao')}
                  onCheckedChange={checked =>
                    setDelivery(prev =>
                      checked ? [...prev, 'nao'] : prev.filter(v => v !== 'nao')
                    )
                  }
                />
                Não
              </label>
            </div>
          </div>

          {/* Autorizo */}
          <div>
            <label className="flex items-center gap-2">
              <Checkbox checked={autorizo} onCheckedChange={setAutorizo} />
              Autorizo compartilhamento de dados
            </label>
          </div>
        </div>

        {/* Foto de perfil */}
        <div className="border p-4 rounded-lg space-y-4">
          <h3 className="font-semibold">Foto de perfil</h3>
          <input
            type="file"
            accept="image/*"
            onChange={e => setFotoPerfil(e.target.files?.[0] ?? null)}
          />
          {fotoPerfil && <p className="mt-2">Arquivo selecionado: {fotoPerfil.name}</p>}
        </div>

        {/* Submit */}
        <Button type="submit">
          Enviar Cadastro
        </Button>
      </form>
    </div>
  );
}
