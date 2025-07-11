'use client';
import { useState, useEffect } from "react";
import AlbumManager from "@/components/galeria/AlbumManager";
import UploadForm from "@/components/galeria/UploadForm";
import PhotoGrid from "@/components/galeria/PhotoGrid";
import HighlightSelector from "@/components/galeria/HighlightSelector";
import type { Album, Photo } from "@/utils/models";
import { Home, Grid, PlusCircle, User, Camera } from "react-feather";

// Dados mockados para demonstração
const initialAlbums: Album[] = [
  {
    id: '1',
    name: 'Férias na Praia',
    description: 'Melhores momentos das férias',
    createdAt: '2024-01-15',
    cover: '/sample/1.jpg'
  },
  {
    id: '2',
    name: 'Festa de Aniversário',
    description: 'Meu aniversário de 30 anos',
    createdAt: '2024-02-20',
    cover: '/sample/2.jpg'
  }
];

const initialPhotos: Photo[] = [
  {
    id: 'p1',
    albumId: '1',
    date: '2024-01-15',
    src: '/sample/1.jpg',
    description: 'Pôr do sol na praia',
    likes: 5,
    liked: false,
    isHighlighted: true
  },
  {
    id: 'p2',
    albumId: '1',
    date: '2024-01-16',
    src: '/sample/2.jpg',
    description: 'Café da manhã com vista',
    likes: 8,
    liked: true,
    isHighlighted: true
  },
  {
    id: 'p3',
    albumId: '2',
    date: '2024-02-20',
    src: '/sample/3.jpg',
    description: 'Bolo de aniversário',
    likes: 12,
    liked: false,
    isHighlighted: false
  }
];

export default function GaleriaPage() {
  const [albums, setAlbums] = useState<Album[]>(initialAlbums);
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [activeTab, setActiveTab] = useState<'gallery' | 'albums' | 'profile'>('gallery');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Carregar dados do localStorage ao montar
  useEffect(() => {
    const savedAlbums = localStorage.getItem("albums");
    const savedPhotos = localStorage.getItem("photos");
    
    if (savedAlbums) setAlbums(JSON.parse(savedAlbums));
    if (savedPhotos) setPhotos(JSON.parse(savedPhotos));
  }, []);

  // Persistir álbuns
  useEffect(() => {
    localStorage.setItem("albums", JSON.stringify(albums));
  }, [albums]);

  // Persistir fotos
  useEffect(() => {
    localStorage.setItem("photos", JSON.stringify(photos));
  }, [photos]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-green-700">GooAgro Gallery</h1>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="bg-green-600 text-white p-2 rounded-full shadow-md"
          >
            <PlusCircle size={20} />
          </button>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="pb-16 pt-4">
        {activeTab === 'gallery' && (
          <PhotoGrid fotos={photos} setFotos={setPhotos} albums={albums} setAlbums={setAlbums} />
        )}

        {activeTab === 'albums' && (
          <div className="p-4">
            <AlbumManager 
              albums={albums} 
              setAlbums={setAlbums} 
            />
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="p-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-dashed rounded-xl flex items-center justify-center" />
              <div>
                <h2 className="font-bold text-lg">Seu Perfil</h2>
                <p className="text-gray-500">@{'usuario_gooagro'}</p>
              </div>
            </div>
            <HighlightSelector photos={photos} setPhotos={setPhotos} />
          </div>
        )}
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 flex justify-around">
          <button 
            className={`flex flex-col items-center ${activeTab === 'gallery' ? 'text-green-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('gallery')}
          >
            <Home size={24} />
            <span className="text-xs mt-1">Início</span>
          </button>
          
          <button 
            className={`flex flex-col items-center ${activeTab === 'albums' ? 'text-green-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('albums')}
          >
            <Grid size={24} />
            <span className="text-xs mt-1">Álbuns</span>
          </button>
          
          <button 
            className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-green-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={24} />
            <span className="text-xs mt-1">Perfil</span>
          </button>
        </div>
      </nav>

      {/* Modal de Upload */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-xl">
            <div className="p-6">
              <h3 className="font-bold text-lg mb-4 text-center">Adicionar Fotos</h3>
              <UploadForm 
                onUpload={() => setShowUploadModal(false)} 
                setPhotos={setPhotos}
              />
              <button 
                onClick={() => setShowUploadModal(false)}
                className="mt-4 w-full py-3 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-gray-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}