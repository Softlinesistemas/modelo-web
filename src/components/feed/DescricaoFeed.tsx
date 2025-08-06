"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/common/Card";
import { FiCopy, FiPrinter, FiDownload, FiGlobe } from "react-icons/fi";
import { useSafeReactToPrint } from "@/hooks/useSafeReactToPrint";

// Texto fixo para simulação
const rawText = `
Bem-vindo ao Sítio Canaã Agricultura Orgânica!
Uma empresa de agricultura familiar em Imbituba - SC.
Temos foco na produção orgânica agroecológica.
Oferecemos Café da Manhã - Excursão, avise antes.
Temos Banana, Mandioca, Farinha...
De Setembro à Dezembro (Primavera) temos colheita...
Visitas escolares, oficinas, turismo rural e muito mais!
`.trim();

// Limites
const MAX_CHARACTERS = 3000;
const MOBILE_LIMIT = 250;

export default function DescricaoCard() {
  const [expanded, setExpanded] = useState(false);
  const [showVerMais, setShowVerMais] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Referências
  const contentRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const fullText = rawText.slice(0, MAX_CHARACTERS);

  // Detectar se é mobile
  useEffect(() => {
    const isMobileDevice = window.innerWidth < 640;
    setIsMobile(isMobileDevice);
  }, []);

  // Lógica de ver mais
  useEffect(() => {
    if (expanded) {
      setDisplayText(fullText);
      return;
    }

    if (isMobile) {
      // Se for mobile, usar base em caracteres
      const shouldShow = fullText.length > MOBILE_LIMIT;
      setShowVerMais(shouldShow);
      setDisplayText(shouldShow ? fullText.slice(0, MOBILE_LIMIT) : fullText);
    } else {
      // Se for desktop, base em linhas
      if (previewRef.current) {
        const el = previewRef.current;
        const lineHeight = parseFloat(getComputedStyle(el).lineHeight || "20");
        const lines = el.scrollHeight / lineHeight;
        const shouldShow = lines > 5;
        setShowVerMais(shouldShow);
        setDisplayText(fullText);
      }
    }
  }, [expanded, isMobile]);

  // Copiar
  const handleCopy = () => {
    navigator.clipboard.writeText(fullText);
    alert("Texto copiado!");
  };

  // Imprimir / PDF
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "descricao",
  });

  // Tradução usando DeepL API Free //fazer o cadastro no site free
  const handleTranslate = async () => {
    try {
      const response = await fetch("https://api-free.deepl.com/v2/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `DeepL-Auth-Key SUA_CHAVE_AQUI`, // 🔁 Troque pela sua chave real da DeepL
        },
        body: new URLSearchParams({
          text: fullText,
          target_lang: "EN", // Pode ser EN, ES, FR, IT, DE
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
        {/* Conteúdo a ser impresso */}
        <div ref={printRef} className="px-3 py-2 text-sm text-gray-800 bg-white">
          {!expanded ? (
            <>
              <div
                className="overflow-hidden text-gray-700 whitespace-pre-line"
                style={{ lineClamp: 5 }}
                ref={previewRef}
              >
                {displayText}
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
            <div className="whitespace-pre-line text-gray-700">{fullText}</div>
          )}
        </div>

        {/* Botões flutuantes */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 text-gray-600">
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
            title="PDF (use imprimir)"
            className="cursor-not-allowed opacity-30"
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
