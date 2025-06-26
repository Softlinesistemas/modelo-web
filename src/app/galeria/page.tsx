'use client';
import { useState } from "react";
import AlbumManager from "@/components/galeria/AlbumManager";
import UploadForm from "@/components/galeria/UploadForm";
import PhotoGrid from "@/components/galeria/PhotoGrid";
import type { Album } from "@/utils/models";
// import HighlightSelector from "@/components/galeria/HighlightSelector";

export default function GaleriaPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [fotos, setFotos] = useState<any[]>([]);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      {/* Container centralizado e com limite de largura */}
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
       
        {/* Título principal */}
        <h1 className="text-4xl font-extrabold text-center text-green-700 mb-4">
          Galeria GooAgro
        </h1>

        {/* Grid de fotos com sombra e fundo branco */}
        <section className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Fotos</h2>
          <PhotoGrid fotos={fotos} setFotos={setFotos} albums={albums} setAlbums={setAlbums} />
        </section>

        {/* Seção de gerenciamento de álbuns e upload lado a lado em desktop */}
        <section className="flex flex-col md:flex-row gap-8">

          {/* Gerenciador de álbuns */}
          <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Gerenciar Álbuns</h2>
            <AlbumManager  fotos={fotos} setFotos={setFotos} albums={albums} setAlbums={setAlbums} />
          </div>

          {/* Upload de fotos */}
          <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upload de Fotos</h2>
            <UploadForm />
          </div>
        </section>

        {/* Se quiser ativar o seletor de destaque, descomente aqui */}
        {/* <section className="bg-white rounded-lg shadow-md p-6">
          <HighlightSelector />
        </section> */}

      </div>
    </main>
  );
}