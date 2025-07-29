"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/common/Card";
import { FiCopy, FiPrinter, FiDownload, FiGlobe } from "react-icons/fi";
import { useReactToPrint } from "react-to-print";

// Limite de caracteres
const MAX_CHARACTERS = 3000;

export default function DescricaoCard() {
  const [expanded, setExpanded] = useState(false);
  const [showVerMais, setShowVerMais] = useState(false);

  // Referências
  const contentRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Texto (você pode puxar de props ou API depois)
  const rawText = `
    Bem vindo ao Sitio Canaã Agricultura Orgânica!
    Uma empresa de agricultura familiar em Imbituba - SC
    Temos foco a produção orgânica agroecológica
    Oferecemos Café da Manhã - Excursão, avise antes.
    Temos Banana, Mandioca, Farinha...
    De Setembro à Dezembro (Primavera) temos colheita...
    Visitas escolares, oficinas, turismo rural e muito mais!
  `.trim();

  // Limita o texto a 3000 caracteres
  const fullText = rawText.slice(0, MAX_CHARACTERS);

  // Verifica se o texto passa de 3 linhas
  useEffect(() => {
    if (previewRef.current) {
      const el = previewRef.current;
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight || "20");
      const lines = el.scrollHeight / lineHeight;
      setShowVerMais(lines > 3);
    }
  }, []);

  // Copiar para área de transferência
  const handleCopy = () => {
    navigator.clipboard.writeText(fullText);
    alert("Texto copiado!");
  };

  // Gerar PDF / Imprimir com react-to-print
  const handlePrint = useReactToPrint({
    content: () => contentRef.current as HTMLDivElement,
    documentTitle: "descricao",
  });

  // Simulação de tradução
  const handleTranslate = () => {
    alert("Tradução simulada. Use i18n para implementar de verdade.");
  };

  return (
    <Card className="relative border shadow-sm">
      <CardContent className="p-0.5">
        {/* Conteúdo principal */}
        <div
          className="px-3 py-2 text-sm bg-gray-50 text-gray-800"
          ref={contentRef}
        >
          {!expanded ? (
            <>
              <div
                className="line-clamp-3 overflow-hidden"
                ref={previewRef}
                style={{ whiteSpace: "pre-line" }}
              >
                {fullText}
              </div>
              {showVerMais && (
                <span
                  onClick={() => setExpanded(true)}
                  className="text-green-600 text-sm cursor-pointer ml-1"
                >
                  Ver mais
                </span>
              )}
            </>
          ) : (
            <div style={{ whiteSpace: "pre-line" }}>{fullText}</div>
          )}
        </div>

        {/* Botões verticais no canto superior direito */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 text-gray-600">
          <FiCopy
            title="Copiar"
            className="cursor-pointer hover:text-green-600"
            onClick={handleCopy}
          />
          <FiPrinter
            title="Imprimir / Salvar como PDF"
            className="cursor-pointer hover:text-green-600"
            onClick={handlePrint}
          />
          <FiDownload
            title="PDF (use imprimir)"
            className="cursor-not-allowed opacity-30"
          />
          <FiGlobe
            title="Traduzir"
            className="cursor-pointer hover:text-green-600"
            onClick={handleTranslate}
          />
        </div>
      </CardContent>
    </Card>
  );
}
