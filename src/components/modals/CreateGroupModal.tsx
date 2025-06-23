'use client'

import React, { useState } from 'react';
import { AppModal } from '@/utils/ui/AppModal';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

type CreateGroupModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  // Estado do formulário
  const [form, setForm] = useState({
    groupName: '',
    groupLogin: '',
    groupType: 'Esportes Coletivos',
    modalities: [] as string[],
    category: '',
    location: '',
    neighborhood: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const modalitiesOptions = [
    'Futebol',
    'Vôlei',
    'Basquete',
    'Handebol',
    'Queimada / Baleado',
    'Baseball e Softball',
    'Futebol americano',
    'Rugby',
    'Pólo Aquático',
    'Outro',
  ];

  // Função genérica para campos de input
  const handleInputChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Controle de modalidades (checkbox)
  const handleModalityToggle = (modality: string) => {
    setForm((prev) => ({
      ...prev,
      modalities: prev.modalities.includes(modality)
        ? prev.modalities.filter((m) => m !== modality)
        : [...prev.modalities, modality],
    }));
  };

  // Resetar formulário
  const resetForm = () => {
    setForm({
      groupName: '',
      groupLogin: '',
      groupType: 'Esportes Coletivos',
      modalities: [],
      category: '',
      location: '',
      neighborhood: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    });
  };

  // Ação ao salvar
  const handleSubmit = () => {
    console.log('Dados do Grupo Criado:', form);

    const confirmGoToGroup = window.confirm('Deseja ir para a página do grupo agora?');

    if (confirmGoToGroup) {
      // Aqui você pode pegar o ID real depois (ex: vindo do backend)
      const mockGroupId = '123';
      router.push('/group/123');
      // router.push(`/group/${mockGroupId}`);
    } else {
      // Apenas fecha o modal e limpa os campos
      onClose();
      resetForm();
    }
  };

  return (
    <AppModal isOpen={isOpen} onClose={onClose} title="Criar Grupo - GG">
      {/* Campos do formulário */}
      <div className="flex gap-2">
        <input
          readOnly
          value={format(new Date(), 'dd/MM/yyyy')}
          className="w-1/2 p-2 border rounded bg-gray-100 text-gray-600"
          placeholder="Data"
        />
        <input
          readOnly
          value="SergioBitencourt"
          className="w-1/2 p-2 border rounded bg-gray-100 text-gray-600"
          placeholder="Criador"
        />
      </div>

      <input
        type="text"
        placeholder="Nome do Grupo *"
        className="w-full p-2 border rounded"
        value={form.groupName}
        onChange={(e) => handleInputChange('groupName', e.target.value)}
      />

      <input
        type="text"
        placeholder="Login do Grupo *"
        className="w-full p-2 border rounded"
        value={form.groupLogin}
        onChange={(e) => handleInputChange('groupLogin', e.target.value)}
      />

      <select
        className="w-full p-2 border rounded"
        value={form.groupType}
        onChange={(e) => handleInputChange('groupType', e.target.value)}
      >
        <option value="Esportes Coletivos">Esportes Coletivos</option>
        <option value="Outro">Outro</option>
      </select>

      <div className="border p-2 rounded">
        <p className="font-semibold mb-2">Modalidade:</p>
        <div className="grid grid-cols-2 gap-1">
          {modalitiesOptions.map((modality, idx) => (
            <label key={idx} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={form.modalities.includes(modality)}
                onChange={() => handleModalityToggle(modality)}
              />
              <span>{modality}</span>
            </label>
          ))}
        </div>
      </div>

      <input
        type="text"
        placeholder="Categoria"
        className="w-full p-2 border rounded"
        value={form.category}
        onChange={(e) => handleInputChange('category', e.target.value)}
      />

      <input
        type="text"
        placeholder="Cidade / Estado / País"
        className="w-full p-2 border rounded"
        value={form.location}
        onChange={(e) => handleInputChange('location', e.target.value)}
      />

      <input
        type="text"
        placeholder="Bairro"
        className="w-full p-2 border rounded"
        value={form.neighborhood}
        onChange={(e) => handleInputChange('neighborhood', e.target.value)}
      />

      <div className="border p-2 rounded">
        <p className="font-semibold mb-2">Situação do Grupo:</p>
        {['Ativar Grupo-GG', 'Cancelar e Excluir Grupo-GG'].map((status, idx) => (
          <label key={idx} className="flex items-center space-x-2">
            <input
              type="checkbox"
              onChange={(e) => console.log(`${status}: ${e.target.checked}`)}
            />
            <span>{status}</span>
          </label>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="password"
          placeholder="Senha"
          className="w-1/2 p-2 border rounded"
          value={form.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmar Senha"
          className="w-1/2 p-2 border rounded"
          value={form.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
        />
      </div>

      <label className="flex items-start space-x-2 text-sm">
        <input
          type="checkbox"
          checked={form.termsAccepted}
          onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
        />
        <span>
          Eu li e concordo com a{' '}
          <a href="#" className="text-blue-500 underline">
            Política de Privacidade
          </a>{' '}
          e desejo me cadastrar gratuitamente.
        </span>
      </label>

      {/* Botão Salvar com confirmação */}
      <button
        onClick={handleSubmit}
        className="w-full py-2 mt-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        SALVAR
      </button>
    </AppModal>
  );
};
