'use client';

import React, { useState } from 'react';
import { FiUser, FiStar, FiPlus, FiTrash, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { AppModal } from '../../utils/ui/AppModal';

// Tipo do membro
interface Member {
  name: string;
  role: 'admin' | 'moderator' | 'member';
}

// Dados mockados
const initialMembers: Member[] = [
  { name: 'Ramon', role: 'admin' },
  { name: 'Maria', role: 'moderator' },
  { name: 'João', role: 'member' },
  { name: 'Ana', role: 'member' },
];

// Lista de AMIGOS do admin (para adicionar)
const friendsList = ['Carlos', 'Fernanda', 'Lucas', 'Juliana'];

const roleLabel = {
  admin: 'Administrador',
  moderator: 'Moderador',
  member: 'Membro',
};

const MemberList: React.FC = () => {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState('Ramon'); // Mock: o Ramon é admin no exemplo

  // Lista de AMIGOS que ainda não estão no grupo
  const availableFriends = friendsList.filter(
    (friend) => !members.find((m) => m.name === friend)
  );

  // Seleciona/deseleciona AMIGOS para adicionar
  const toggleFriendSelection = (friend: string) => {
    setSelectedFriends((prev) =>
      prev.includes(friend) ? prev.filter((f) => f !== friend) : [...prev, friend]
    );
  };

  // Adiciona membros selecionados
  const handleAddMembers = () => {
    const newMembers = selectedFriends.map((name) => ({ name, role: 'member' }));
    setMembers((prev) => [...prev, ...newMembers as Member[]]);
    setSelectedFriends([]);
    setShowAddModal(false);
  };

  // Remover membro
  const confirmRemoveMember = () => {
    if (!confirmRemove) return;
    setMembers((prev) => prev.filter((m) => m.name !== confirmRemove));
    setConfirmRemove(null);
  };

  // Promover membro
  const promote = (name: string) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.name === name
          ? { ...m, role: m.role === 'member' ? 'moderator' : 'admin' }
          : m
      )
    );
  };

  // Rebaixar membro
  const demote = (name: string) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.name === name
          ? { ...m, role: m.role === 'admin' ? 'moderator' : 'member' }
          : m
      )
    );
  };

  // Verifica se o user atual é admin
  const isAdmin = members.find((m) => m.name === currentUser)?.role === 'admin';

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Membros do Grupo</h3>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
          Total: {members.length}
        </span>
      </div>

      <ul className="space-y-3">
        {members.map((member, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-2 border rounded hover:bg-gray-50"
          >
            <div className="flex items-center gap-2">
              <FiUser
                className={`${
                  member.role === 'admin' ? 'text-pink-700' : 'text-blue-500'
                }`}
              />
              <span
                className={`${
                  member.role === 'admin'
                    ? 'text-pink-700 font-bold'
                    : member.role === 'moderator'
                    ? 'text-green-600'
                    : 'text-gray-800'
                }`}
              >
                {member.name}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              {member.role === 'admin' && <FiStar className="text-yellow-500" />}
              {roleLabel[member.role]}

              {/* Ações só para Admin e não sobre ele mesmo */}
              {isAdmin && currentUser !== member.name && (
                <>
                  {member.role !== 'admin' && (
                    <>
                      <button
                        onClick={() => promote(member.name)}
                        className="text-blue-600 hover:underline ml-2 flex items-center gap-1"
                      >
                        <FiArrowUp /> Promover
                      </button>
                      {member.role !== 'member' && (
                        <button
                          onClick={() => demote(member.name)}
                          className="text-yellow-600 hover:underline ml-2 flex items-center gap-1"
                        >
                          <FiArrowDown /> Rebaixar
                        </button>
                      )}
                      <button
                        onClick={() => setConfirmRemove(member.name)}
                        className="text-red-600 hover:underline ml-2 flex items-center gap-1"
                      >
                        <FiTrash /> Remover
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Botão Adicionar */}
      {isAdmin && (
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded flex items-center gap-2"
        >
          <FiPlus /> Adicionar Membros
        </button>
      )}

      {/* Modal de Adicionar Membros */}
      <AppModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Adicionar Membros"
      >
        {availableFriends.length === 0 ? (
          <p className="text-gray-500">Nenhum Amigo disponível para adicionar.</p>
        ) : (
          <ul className="space-y-2">
            {availableFriends.map((friend, idx) => (
              <li
                key={idx}
                onClick={() => toggleFriendSelection(friend)}
                className={`flex items-center justify-between border-b pb-1 cursor-pointer rounded p-1 ${
                  selectedFriends.includes(friend) ? 'bg-green-100' : 'hover:bg-gray-100'
                }`}
              >
                <span>{friend}</span>
                {selectedFriends.includes(friend) && (
                  <span className="text-green-500 text-xs">Selecionado</span>
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-end gap-2 mt-3">
          <button
            onClick={() => setShowAddModal(false)}
            className="text-gray-600 text-sm hover:underline"
          >
            Cancelar
          </button>
          <button
            onClick={handleAddMembers}
            disabled={selectedFriends.length === 0}
            className={`text-white text-sm px-3 py-1 rounded ${
              selectedFriends.length > 0 ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Adicionar
          </button>
        </div>
      </AppModal>

      {/* Modal de Confirmação de Remoção */}
      <AppModal
        isOpen={!!confirmRemove}
        onClose={() => setConfirmRemove(null)}
        title="Confirmar Remoção"
      >
        <p>
          Tem certeza que deseja remover <strong>{confirmRemove}</strong> do grupo?
        </p>

        <div className="flex justify-end gap-2 mt-3">
          <button
            onClick={() => setConfirmRemove(null)}
            className="text-gray-600 text-sm hover:underline"
          >
            Cancelar
          </button>
          <button
            onClick={confirmRemoveMember}
            className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700"
          >
            Remover
          </button>
        </div>
      </AppModal>
    </div>
  );
};

export default MemberList;
