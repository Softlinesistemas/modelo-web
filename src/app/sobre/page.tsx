'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Heart } from 'react-feather';

export default function SobrePage() {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Conectando Pessoas",
      description: "Unimos agricultores, fornecedores e clientes em uma única plataforma"
    },
    {
      icon: <Target className="w-8 h-8 text-green-600" />,
      title: "Foco no Agronegócio",
      description: "Especializada nas necessidades específicas do setor agrícola"
    },
    {
      icon: <Award className="w-8 h-8 text-green-600" />,
      title: "Qualidade Garantida",
      description: "Produtos e serviços verificados e de alta qualidade"
    },
    {
      icon: <Heart className="w-8 h-8 text-green-600" />,
      title: "Sustentabilidade",
      description: "Promovendo práticas sustentáveis no agronegócio"
    }
  ];

  const team = [
    {
      name: "João Silva",
      role: "CEO & Fundador",
      description: "Engenheiro Agrônomo com 15 anos de experiência"
    },
    {
      name: "Maria Santos",
      role: "CTO",
      description: "Especialista em tecnologia para agronegócio"
    },
    {
      name: "Pedro Costa",
      role: "Head de Produto",
      description: "Focado na experiência do usuário rural"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Sobre o GooAgro
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conectando o campo à mesa através da tecnologia
          </p>
        </motion.div>

        {/* Missão */}
        <motion.div 
          className="card p-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Nossa Missão
          </h2>
          <p className="text-lg text-gray-600 text-center leading-relaxed">
            Revolucionar o agronegócio brasileiro através de uma plataforma digital 
            que conecta produtores rurais, fornecedores e consumidores, promovendo 
            transparência, eficiência e sustentabilidade em toda a cadeia produtiva.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Por que escolher o GooAgro?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* História */}
        <motion.div 
          className="card p-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Nossa História
          </h2>
          <div className="space-y-6 text-gray-600">
            <p className="text-lg leading-relaxed">
              O GooAgro nasceu da necessidade de modernizar e digitalizar o agronegócio brasileiro. 
              Fundada em 2023, nossa plataforma surgiu da experiência de profissionais que vivenciaram 
              as dificuldades de comunicação e comercialização no setor rural.
            </p>
            <p className="text-lg leading-relaxed">
              Desde então, temos trabalhado incansavelmente para criar uma solução que não apenas 
              conecte pessoas, mas que também promova o desenvolvimento sustentável do agronegócio, 
              valorizando tanto os pequenos produtores quanto as grandes empresas do setor.
            </p>
          </div>
        </motion.div>

        {/* Equipe */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Nossa Equipe
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="card p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-green-600 font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="card p-8 bg-gradient-to-r from-green-600 to-green-700 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Faça parte da revolução do agronegócio
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Junte-se a milhares de produtores e empresas que já confiam no GooAgro
            </p>
            <motion.button
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Começar Agora
            </motion.button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

