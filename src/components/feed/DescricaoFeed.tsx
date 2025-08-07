"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/common/Card";
import { FiCopy, FiPrinter, FiDownload, FiGlobe } from "react-icons/fi";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";

// Texto fixo simulado
const rawText = `
Bem-vindo ao Sítio Canaã Agricultura Orgânica!
Uma empresa de agricultura familiar em Imbituba-SC.
Temos foco na produção orgânica agroecológica.
Oferecemos Café da Manhã - Excursão, avise antes.
Temos Banana, Mandioca, Farinha...
De Setembro à Dezembro (Primavera) temos colheita...
Visitas escolares, oficinas, turismo rural e muito mais!
`.trim();

const MAX_CHARACTERS = 3000;
const PREVIEW_CHARACTERS = 250;

export default function DescricaoCard() {
  const [expanded, setExpanded] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [showVerMais, setShowVerMais] = useState(false);

  const printRef = useRef<HTMLDivElement>(null);

  const fullText = rawText.slice(0, MAX_CHARACTERS);

  // Define preview e ver mais
  useEffect(() => {
    if (expanded) {
      setDisplayText(fullText);
      setShowVerMais(false);
    } else {
      const shouldTruncate = fullText.length > PREVIEW_CHARACTERS;
      setDisplayText(shouldTruncate ? fullText.slice(0, PREVIEW_CHARACTERS) : fullText);
      setShowVerMais(shouldTruncate);
    }
  }, [expanded]);

  // Copiar texto para área de transferência
  const handleCopy = () => {
    navigator.clipboard.writeText(fullText);
    alert("Texto copiado!");
  };

  // Função de impressão
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "descricao",
  });

  // Baixar PDF com html2pdf
  const handleDownloadPdf = () => {
    const element = printRef.current;
    if (!element) return;

    html2pdf()
      .from(element)
      .set({
        margin: 1,
        filename: "descricao.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .save();
  };

  // Traduzir usando DeepL API
  const handleTranslate = async () => {
    try {
      const response = await fetch("https://api-free.deepl.com/v2/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `DeepL-Auth-Key SUA_CHAVE_AQUI`, // Troque por sua chave real da DeepL
        },
        body: new URLSearchParams({
          text: fullText,
          target_lang: "EN",
        }),
      });

      const data = await response.json();
      if (data?.translations?.[0]?.text) {
        alert("Tradução: \n" + data.translations[0].text);
      } else {
        alert("Erro ao traduzir");
      }
    } catch (err) {
      console.error(err);
      alert("Falha ao acessar o serviço de tradução");
    }
  };

  return (
    <Card className="relative border shadow-sm">
      <CardContent className="p-0">
        {/* Conteúdo a ser impresso e baixado */}
        <div
          ref={printRef}
          className="px-3 py-2 text-sm text-gray-800 bg-white whitespace-pre-line"
        >
          {displayText}
          {showVerMais && (
            <span
              onClick={() => setExpanded(true)}
              className="text-green-600 text-sm cursor-pointer ml-1"
            >
              ...ver mais
            </span>
          )}
        </div>

        {/* Botões flutuantes */}
        <div className="absolute top-2 right-2 flex flex-col gap-2  text-green-700 hover:text-orange-500 transition">
          <FiCopy
            title="Copiar"
            className="cursor-pointer hover:text-green-600"
            onClick={handleCopy}
          />
          <FiPrinter
            title="Imprimir / PDF"
            className="cursor-pointer hover:text-green-600"
            onClick={handlePrint}
          />
          <FiDownload
            title="Baixar PDF"
            className="cursor-pointer hover:text-green-600"
            onClick={handleDownloadPdf}
          />
          <FiGlobe
            title="Traduzir (DeepL)"
            className="cursor-pointer hover:text-green-600"
            onClick={handleTranslate}
          />
        </div>
      </CardContent>
    </Card>
  );
}
