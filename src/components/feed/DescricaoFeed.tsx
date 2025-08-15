"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/common/Card";
import { FiCopy, FiPrinter, FiDownload, FiGlobe } from "react-icons/fi";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";

/**
 * Mostra preview de até PREVIEW_CHARACTERS ou PREVIEW_LINES (o que ocorrer primeiro),
 * e permite expandir até MAX_CHARACTERS.
 *
 * O toggle ("ver mais"/"ver menos") é um <button> separado (fora do elemento de texto)
 * então ele NÃO é contado como caractere nem atrapalha a medição visual.
 */

const descricaoPorTipo: Record<string, string> = {
  empresa: `
Bem-vindo à Empresa XYZ!
Somos uma referência em soluções tecnológicas inovadoras.
Oferecemos consultoria, desenvolvimento e suporte.
Nosso foco é qualidade e atendimento personalizado.
Venha crescer conosco!
`.trim(),

  grupo: `
Grupo Comunidade Ativa
Nos unimos para promover ações sociais e culturais.
Realizamos eventos, palestras e workshops.
Junte-se a nós para fazer a diferença na sua região!
`.trim(),

  fornecedor: `
Bem-vindo ao Sítio Canaã Agricultura Orgânica!
Uma empresa de agricultura familiar em Imbituba-SC.
Temos foco na produção orgânica agroecológica.
Oferecemos Café da Manhã - Excursão, avise antes.
Temos Banana, Mandioca, Farinha...
De Setembro à Dezembro (Primavera) temos colheita...
Visitas escolares, oficinas, turismo rural e muito mais!
`.trim(),

  pessoal: `
Perfil Pessoal
Sou uma pessoa apaixonada por desenvolvimento web e design.
Sempre buscando inovar e aprender coisas novas.
Gosto de escrever, criar e compartilhar conhecimento.
Vamos conectar e trocar ideias!
`.trim(),
};

const MAX_CHARACTERS = 3000;
const PREVIEW_CHARACTERS = 250;
const PREVIEW_LINES = 5;

interface DescricaoCardProps {
  tipo: "empresa" | "grupo" | "fornecedor" | "pessoal";
}

export default function DescricaoCard({ tipo }: DescricaoCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [previewText, setPreviewText] = useState<string>(""); // texto lógico do preview
  const [hasMoreContent, setHasMoreContent] = useState(false); // controla exibição do toggle

  const printRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  const rawText = descricaoPorTipo[tipo] ?? "Descrição não disponível";
  const fullText = rawText.slice(0, MAX_CHARACTERS);

  // ==== Construir preview lógico (até PREVIEW_LINES ou PREVIEW_CHARACTERS) ====
  useEffect(() => {
    if (!fullText) {
      setPreviewText("");
      setHasMoreContent(false);
      return;
    }

    // Quebra por linhas lógicas (quebras '\n') e preenche até PREVIEW_LINES e PREVIEW_CHARACTERS
    const lines = fullText.split("\n");
    let built = "";
    let chars = 0;
    let usedLines = 0;

    for (let i = 0; i < lines.length && usedLines < PREVIEW_LINES && chars < PREVIEW_CHARACTERS; i++) {
      const line = lines[i];
      const remaining = PREVIEW_CHARACTERS - chars;

      if (line.length <= remaining) {
        // adiciona linha inteira
        built += (built === "" ? "" : "\n") + line;
        chars += line.length;
      } else {
        // adiciona somente o que cabe em remaining
        built += (built === "" ? "" : "\n") + line.slice(0, remaining);
        chars = PREVIEW_CHARACTERS;
      }

      usedLines++;
      if (chars >= PREVIEW_CHARACTERS) break;
    }

    // Se o texto inteiro coube no "built", o preview é o texto completo
    const isShort = fullText.length <= built.length;
    setPreviewText(isShort ? fullText : built);

    // Se o texto completo é maior que o preview lógico, há mais conteúdo
    setHasMoreContent(!isShort);
  }, [fullText]);

  // ==== Medição visual: garante que se o texto "wrapar" e exceder 5 linhas, o toggle aparece ====
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    // Se estiver expandido, sempre mostrar o botão de "ver menos" (se o fullText for maior que preview lógico)
    if (expanded) {
      // garantindo que o botão apareça quando houver mais conteúdo que o preview lógico
      setHasMoreContent(fullText.length > previewText.length);
      // remove limites visuais
      el.style.maxHeight = "";
      el.style.overflow = "";
      return;
    }

    // não expandido -> aplicamos restrição visual de 5 linhas
    const cs = getComputedStyle(el);
    let lineHeight = parseFloat(cs.lineHeight);
    if (isNaN(lineHeight)) {
      const fontSize = parseFloat(cs.fontSize) || 16;
      lineHeight = fontSize * 1.2; // fallback razoável
    }
    const maxHeight = lineHeight * PREVIEW_LINES;

    // Aplicar limitação visual
    el.style.maxHeight = `${maxHeight}px`;
    el.style.overflow = "hidden";

    // Se o scrollHeight ultrapassar maxHeight, então visualmente ultrapassou 5 linhas
    const visualOverflow = el.scrollHeight > maxHeight + 1; // margem pequena
    // Ou se fullText é maior que previewText logicamente (por chars), também mostramos o toggle
    setHasMoreContent(visualOverflow || fullText.length > previewText.length);
  }, [previewText, expanded, fullText]);

  // ==== Ações utilitárias ====
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullText);
      alert("Texto copiado!");
    } catch (err) {
      console.error(err);
      alert("Erro ao copiar");
    }
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "descricao",
  });

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

  const handleTranslate = async () => {
    try {
      const res = await fetch("https://api-free.deepl.com/v2/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `DeepL-Auth-Key SUA_CHAVE_AQUI`, // troque aqui
        },
        body: new URLSearchParams({
          text: fullText,
          target_lang: "EN",
        }),
      });

      const data = await res.json();
      if (data?.translations?.[0]?.text) {
        alert("Tradução:\n\n" + data.translations[0].text);
      } else {
        console.error("DeepL:", data);
        alert("Erro ao traduzir");
      }
    } catch (err) {
      console.error(err);
      alert("Falha ao acessar serviço de tradução");
    }
  };

  // ==== Render ====
  return (
    <Card className="relative shadow-sm">
      <CardContent className="p-0">
        {/* Elemento que será impresso/baixado */}
        <div ref={printRef} className="px-3 py-3 text-sm text-black">
          {/* textRef contém APENAS o texto (sem o botão). Assim o botão não conta como caractere nem altera a medição. */}
          <div
            ref={textRef}
            className="whitespace-pre-wrap leading-6 break-words"
            aria-live="polite"
          >
            {expanded ? fullText : previewText}
          </div>

          {/* Toggle separado DO LADO (não faz parte do texto) */}
          {hasMoreContent && (
            <button
              type="button"
              onClick={() => setExpanded((s) => !s)}
              // estilo: transparente, sem borda, ocupa mínimo, pode ajustar visualmente
              className="ml-1 mt-1 inline-block bg-transparent border-0 p-0 text-red-600 font-bold text-sm cursor-pointer"
              aria-expanded={expanded}
            >
              {expanded ? "ver menos" : "...ver mais"}
            </button>
          )}
        </div>

        {/* Botões flutuantes */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 text-green-700 transition">
          <FiCopy
            title="Copiar"
            className="cursor-pointer hover:text-orange-600"
            onClick={handleCopy}
          />
          <FiPrinter
            title="Imprimir / Print"
            className="cursor-pointer hover:text-orange-600"
            onClick={handlePrint}
          />
          <FiDownload
            title="Baixar PDF"
            className="cursor-pointer hover:text-orange-600"
            onClick={handleDownloadPdf}
          />
          <FiGlobe
            title="Traduzir (DeepL)"
            className="cursor-pointer hover:text-orange-600"
            onClick={handleTranslate}
          />
        </div>
      </CardContent>
    </Card>
  );
}
