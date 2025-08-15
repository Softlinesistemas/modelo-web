"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Search,
  HelpCircle,
  MessageCircle,
  Book,
  Users,
} from "react-feather";
import { useRouter } from "next/navigation";


export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("geral");
  const [openItems, setOpenItems] = useState<number[]>([]);
  const router = useRouter();

  const categories = [
    { id: "geral", label: "Geral", icon: <HelpCircle className="w-5 h-5" /> },
    { id: "conta", label: "Conta", icon: <Users className="w-5 h-5" /> },
    { id: "produtos", label: "Produtos", icon: <Book className="w-5 h-5" /> },
    {
      id: "suporte",
      label: "Suporte",
      icon: <MessageCircle className="w-5 h-5" />,
    },
  ];

  const faqData = {
    geral: [
      {
        question: "O que é o GooAgro?",
        answer:
          "O GooAgro é uma plataforma digital que conecta produtores rurais, fornecedores e consumidores, facilitando a comercialização de produtos agrícolas e promovendo o desenvolvimento sustentável do agronegócio brasileiro.",
      },
      {
        question: "Como funciona a plataforma?",
        answer:
          "A plataforma permite que produtores cadastrem seus produtos, fornecedores ofereçam seus serviços e consumidores encontrem o que precisam. Tudo isso através de um sistema de busca avançado, chat integrado e ferramentas de gestão.",
      },
      {
        question: "A plataforma é gratuita?",
        answer:
          "Sim, o cadastro e uso básico da plataforma são totalmente gratuitos. Oferecemos também planos premium com funcionalidades avançadas para usuários que desejam mais recursos.",
      },
      {
        question: "Em quais regiões o GooAgro atua?",
        answer:
          "Atualmente, o GooAgro atua em todo o território brasileiro, com foco especial nas principais regiões produtoras do país. Estamos constantemente expandindo nossa cobertura.",
      },
    ],
    conta: [
      {
        question: "Como criar uma conta?",
        answer:
          "Para criar uma conta, clique em 'Cadastrar' na página inicial, preencha seus dados pessoais e confirme seu email. O processo é rápido e simples.",
      },
      {
        question: "Esqueci minha senha, o que fazer?",
        answer:
          "Na tela de login, clique em 'Esqueci minha senha', digite seu email e você receberá instruções para criar uma nova senha.",
      },
      {
        question: "Como alterar meus dados pessoais?",
        answer:
          "Acesse 'Configurações' no menu principal, vá para a aba 'Perfil' e edite as informações que desejar. Não se esqueça de salvar as alterações.",
      },
      {
        question: "Posso ter mais de uma conta?",
        answer:
          "Cada pessoa física ou jurídica deve ter apenas uma conta na plataforma. Isso garante a transparência e confiabilidade do sistema.",
      },
    ],
    produtos: [
      {
        question: "Como anunciar meus produtos?",
        answer:
          "Após fazer login, acesse 'Meus Produtos' no menu e clique em 'Adicionar Produto'. Preencha as informações, adicione fotos e publique seu anúncio.",
      },
      {
        question: "Posso editar um produto já publicado?",
        answer:
          "Sim, você pode editar seus produtos a qualquer momento. Acesse 'Meus Produtos', encontre o item desejado e clique em 'Editar'.",
      },
      {
        question: "Como definir o preço dos meus produtos?",
        answer:
          "Você tem total liberdade para definir os preços. Recomendamos pesquisar o mercado local e considerar fatores como qualidade, quantidade e sazonalidade.",
      },
      {
        question: "Há limite de produtos que posso anunciar?",
        answer:
          "Usuários gratuitos podem anunciar até 10 produtos simultaneamente. Usuários premium têm anúncios ilimitados.",
      },
    ],
    suporte: [
      {
        question: "Como entrar em contato com o suporte?",
        answer:
          "Você pode entrar em contato através do chat da plataforma, email (suporte@gooagro.com.br) ou telefone (11) 9999-9999. Nosso horário de atendimento é de segunda a sexta, das 8h às 18h.",
      },
      {
        question: "Qual o tempo de resposta do suporte?",
        answer:
          "Nosso tempo médio de resposta é de 2 horas durante o horário comercial. Para questões urgentes, utilize o chat da plataforma.",
      },
      {
        question: "Como reportar um problema técnico?",
        answer:
          "Use a seção 'Reportar Problema' no menu de ajuda ou entre em contato diretamente com nosso suporte técnico descrevendo detalhadamente o problema encontrado.",
      },
      {
        question: "Vocês oferecem treinamento para usar a plataforma?",
        answer:
          "Sim, oferecemos tutoriais em vídeo, guias escritos e webinars gratuitos. Usuários premium têm acesso a treinamento personalizado.",
      },
    ],
  };

  const faqItems = [
    {
      question: "Como posso me cadastrar na plataforma?",
      answer: "Acesse a página de cadastro e preencha seus dados. O processo é rápido e gratuito."
    },
    {
      question: "A plataforma é gratuita?",
      answer: "Sim, o cadastro e uso básico da plataforma são totalmente gratuitos."
    },
    {
      question: "Como posso anunciar meus produtos?",
      answer: "Após o cadastro, acesse a seção 'Meus Produtos' e clique em 'Adicionar Produto'."
    },
    {
      question: "Há suporte técnico disponível?",
      answer: "Sim, oferecemos suporte técnico via chat, email e telefone durante o horário comercial."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const filteredFAQ = faqData[activeCategory as keyof typeof faqData].filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            Perguntas Frequentes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encontre respostas para as dúvidas mais comuns sobre o GooAgro
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar perguntas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-600 hover:bg-green-50 hover:text-green-600"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.icon}
                <span>{category.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {filteredFAQ.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">
                Nenhuma pergunta encontrada
              </h3>
              <p className="text-gray-500">
                Tente usar outros termos de busca ou selecione uma categoria
                diferente
              </p>
            </div>
          ) : (
            filteredFAQ.map((item, index) => (
              <motion.div
                key={index}
                className="card overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <motion.button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  whileHover={{ backgroundColor: "#f9fafb" }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 pr-4">
                    {item.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {openItems.includes(index) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Contact Support */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="card p-8 bg-gradient-to-r from-green-600 to-green-700 text-white">
            <h2 className="text-2xl font-bold mb-4">
              Não encontrou sua resposta?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Nossa equipe de suporte está pronta para ajudar você
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/contato")}
              >
                Entrar em Contato
              </motion.button>
              <motion.button
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Chat ao Vivo
              </motion.button>
            </div>
          </div>
           {/* FAQ Rápido */}
           <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Perguntas Frequentes
              </h2>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <motion.div
                    key={index}
                    className="border-b border-gray-200 pb-4 last:border-b-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {item.question}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {item.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
              <motion.div className="mt-6">
                <motion.button
                  className="btn-secondary w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Ver Todas as Perguntas
                </motion.button>
              </motion.div>
            </div>
            </motion.div>
      </div>
    </div>
  );
}
