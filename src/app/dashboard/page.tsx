'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  TrendingUp, 
  Users, 
  Package, 
  MessageSquare, 
  Calendar,
  DollarSign,
  Eye,
  Heart,
  Share2,
  Plus,
  Filter
} from 'react-feather';

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    {
      title: "Produtos Ativos",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: <Package className="w-6 h-6" />,
      color: "green"
    },
    {
      title: "Visualizações",
      value: "1,234",
      change: "+23%",
      trend: "up",
      icon: <Eye className="w-6 h-6" />,
      color: "blue"
    },
    {
      title: "Mensagens",
      value: "89",
      change: "+5%",
      trend: "up",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "purple"
    },
    {
      title: "Vendas",
      value: "R$ 12.450",
      change: "+18%",
      trend: "up",
      icon: <DollarSign className="w-6 h-6" />,
      color: "yellow"
    }
  ];

  const recentProducts = [
    {
      id: 1,
      name: "Milho Orgânico",
      category: "Grãos",
      price: "R$ 45,00/saca",
      views: 156,
      likes: 23,
      status: "Ativo",
      image: "/api/placeholder/80/80"
    },
    {
      id: 2,
      name: "Soja Premium",
      category: "Grãos",
      price: "R$ 78,00/saca",
      views: 234,
      likes: 45,
      status: "Ativo",
      image: "/api/placeholder/80/80"
    },
    {
      id: 3,
      name: "Tomate Cereja",
      category: "Hortaliças",
      price: "R$ 12,00/kg",
      views: 89,
      likes: 12,
      status: "Pausado",
      image: "/api/placeholder/80/80"
    }
  ];

  const recentMessages = [
    {
      id: 1,
      sender: "Maria Silva",
      message: "Olá! Tenho interesse no seu milho orgânico...",
      time: "2 min atrás",
      unread: true
    },
    {
      id: 2,
      sender: "João Santos",
      message: "Qual a disponibilidade da soja premium?",
      time: "1 hora atrás",
      unread: true
    },
    {
      id: 3,
      sender: "Ana Costa",
      message: "Obrigada pela resposta rápida!",
      time: "3 horas atrás",
      unread: false
    }
  ];

  const activities = [
    {
      id: 1,
      type: "product",
      message: "Produto 'Milho Orgânico' foi visualizado 15 vezes",
      time: "30 min atrás"
    },
    {
      id: 2,
      type: "message",
      message: "Nova mensagem de Maria Silva",
      time: "1 hora atrás"
    },
    {
      id: 3,
      type: "like",
      message: "Seu produto 'Soja Premium' recebeu 3 curtidas",
      time: "2 horas atrás"
    },
    {
      id: 4,
      type: "product",
      message: "Produto 'Tomate Cereja' foi adicionado",
      time: "1 dia atrás"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: "bg-green-100 text-green-600",
      blue: "bg-blue-100 text-blue-600",
      purple: "bg-purple-100 text-purple-600",
      yellow: "bg-yellow-100 text-yellow-600"
    };
    return colors[color as keyof typeof colors] || colors.green;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600">
              Bem-vindo de volta! Aqui está um resumo da sua atividade.
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="input py-2 px-3 text-sm"
            >
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
              <option value="90d">Últimos 90 dias</option>
            </select>
            
            <motion.button
              className="btn-primary flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-5 h-5" />
              <span>Novo Produto</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                  {stat.icon}
                </div>
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {stat.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-600 text-sm">
                {stat.title}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Chart Placeholder */}
            <motion.div
              className="card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Visualizações dos Produtos
                </h2>
                <button className="text-gray-500 hover:text-gray-700">
                  <Filter className="w-5 h-5" />
                </button>
              </div>
              <div className="h-64 bg-gradient-to-r from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  <p className="text-gray-600">Gráfico de visualizações</p>
                </div>
              </div>
            </motion.div>

            {/* Recent Products */}
            <motion.div
              className="card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Produtos Recentes
                </h2>
                <button className="text-green-600 hover:text-green-700 font-medium">
                  Ver todos
                </button>
              </div>
              
              <div className="space-y-4">
                {recentProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                      <Package className="w-8 h-8 text-green-600" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {product.category} • {product.price}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{product.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{product.likes}</span>
                      </div>
                    </div>
                    
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.status === 'Ativo' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {product.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Recent Messages */}
            <motion.div
              className="card p-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-800">
                  Mensagens Recentes
                </h2>
                <button className="text-green-600 hover:text-green-700">
                  <MessageSquare className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {recentMessages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-800 text-sm">
                          {message.sender}
                        </h3>
                        {message.unread && (
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {message.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {message.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              className="card p-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <h2 className="text-lg font-bold text-gray-800 mb-6">
                Atividade Recente
              </h2>
              
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {activity.type === 'product' && <Package className="w-4 h-4 text-green-600" />}
                      {activity.type === 'message' && <MessageSquare className="w-4 h-4 text-green-600" />}
                      {activity.type === 'like' && <Heart className="w-4 h-4 text-green-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </div>
  );
}

