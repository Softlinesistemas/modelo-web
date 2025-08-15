'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Sun, 
  Smartphone, 
  Mail, 
  Lock,
  Eye,
  EyeOff,
  Save,
  Trash2
} from 'react-feather';

export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState('perfil');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
    allowMessages: true
  });

  const tabs = [
    { id: 'perfil', label: 'Perfil', icon: <User className="w-5 h-5" /> },
    { id: 'notificacoes', label: 'Notificações', icon: <Bell className="w-5 h-5" /> },
    { id: 'privacidade', label: 'Privacidade', icon: <Shield className="w-5 h-5" /> },
    { id: 'aparencia', label: 'Aparência', icon: <Moon className="w-5 h-5" /> },
    { id: 'conta', label: 'Conta', icon: <Lock className="w-5 h-5" /> }
  ];

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handlePrivacyChange = (key: string) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'perfil':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Informações do Perfil
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  className="input"
                  defaultValue="João Silva"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="input"
                  defaultValue="joao@exemplo.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  className="input"
                  defaultValue="(11) 99999-9999"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cidade
                </label>
                <input
                  type="text"
                  className="input"
                  defaultValue="São Paulo, SP"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Biografia
              </label>
              <textarea
                className="input resize-none"
                rows={4}
                placeholder="Conte um pouco sobre você..."
              />
            </div>

            <div className="flex justify-end">
              <motion.button
                className="btn-primary flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Save className="w-5 h-5" />
                <span>Salvar Alterações</span>
              </motion.button>
            </div>
          </div>
        );

      case 'notificacoes':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Preferências de Notificação
            </h2>
            
            <div className="space-y-4">
              {[
                { key: 'email', label: 'Notificações por Email', description: 'Receber atualizações importantes por email' },
                { key: 'push', label: 'Notificações Push', description: 'Notificações no navegador e dispositivo móvel' },
                { key: 'sms', label: 'SMS', description: 'Mensagens de texto para alertas urgentes' },
                { key: 'marketing', label: 'Marketing', description: 'Ofertas especiais e novidades' }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">{item.label}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <motion.button
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications[item.key as keyof typeof notifications] ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                    onClick={() => handleNotificationChange(item.key)}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </motion.button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'privacidade':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Configurações de Privacidade
            </h2>
            
            <div className="space-y-4">
              {[
                { key: 'profileVisible', label: 'Perfil Público', description: 'Permitir que outros usuários vejam seu perfil' },
                { key: 'showEmail', label: 'Mostrar Email', description: 'Exibir seu email no perfil público' },
                { key: 'showPhone', label: 'Mostrar Telefone', description: 'Exibir seu telefone no perfil público' },
                { key: 'allowMessages', label: 'Permitir Mensagens', description: 'Receber mensagens de outros usuários' }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">{item.label}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <motion.button
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      privacy[item.key as keyof typeof privacy] ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                    onClick={() => handlePrivacyChange(item.key)}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        privacy[item.key as keyof typeof privacy] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </motion.button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'aparencia':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Aparência e Tema
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  {darkMode ? <Moon className="w-6 h-6 text-gray-600" /> : <Sun className="w-6 h-6 text-yellow-500" />}
                  <div>
                    <h3 className="font-medium text-gray-800">Modo Escuro</h3>
                    <p className="text-sm text-gray-600">Alternar entre tema claro e escuro</p>
                  </div>
                </div>
                <motion.button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    darkMode ? 'bg-gray-800' : 'bg-gray-300'
                  }`}
                  onClick={() => setDarkMode(!darkMode)}
                  whileTap={{ scale: 0.95 }}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </motion.button>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-4">Tamanho da Fonte</h3>
                <div className="grid grid-cols-3 gap-3">
                  {['Pequena', 'Média', 'Grande'].map((size, index) => (
                    <motion.button
                      key={size}
                      className={`p-3 border rounded-lg text-center ${
                        index === 1 ? 'border-green-600 bg-green-50 text-green-600' : 'border-gray-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-4">Idioma</h3>
                <select className="input">
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (US)</option>
                  <option value="es-ES">Español</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'conta':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Configurações da Conta
            </h2>
            
            <div className="space-y-6">
              <div className="card p-6 border-l-4 border-yellow-500">
                <h3 className="font-medium text-gray-800 mb-2">Alterar Senha</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Mantenha sua conta segura com uma senha forte
                </p>
                <motion.button
                  className="btn-secondary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Alterar Senha
                </motion.button>
              </div>

              <div className="card p-6 border-l-4 border-blue-500">
                <h3 className="font-medium text-gray-800 mb-2">Autenticação em Duas Etapas</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Adicione uma camada extra de segurança à sua conta
                </p>
                <motion.button
                  className="btn-secondary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Configurar 2FA
                </motion.button>
              </div>

              <div className="card p-6 border-l-4 border-green-500">
                <h3 className="font-medium text-gray-800 mb-2">Exportar Dados</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Baixe uma cópia dos seus dados pessoais
                </p>
                <motion.button
                  className="btn-secondary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Solicitar Exportação
                </motion.button>
              </div>

              <div className="card p-6 border-l-4 border-red-500">
                <h3 className="font-medium text-gray-800 mb-2">Excluir Conta</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Esta ação é irreversível. Todos os seus dados serão permanentemente removidos.
                </p>
                <motion.button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Excluir Conta</span>
                </motion.button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Configurações
          </h1>
          <p className="text-xl text-gray-600">
            Personalize sua experiência no GooAgro
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="card p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-green-100 text-green-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="card p-8">
              {renderTabContent()}
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
}

