// app/editar-feed/page.tsx
'use client';
import { useState, useEffect, useRef } from "react";
import { Calendar, Camera, Image, X, Grid, Check } from "react-feather";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Photo {
  id: string;
  src: string;
}

export default function EditarFeedPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [caption, setCaption] = useState("");
  const [galleryPhotos, setGalleryPhotos] = useState<Photo[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<Photo[]>([]);
  const [showGallery, setShowGallery] = useState(false);
  const maxCaptionLength = 220;
  const maxPhotos = 6;
  
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Carregar fotos da galeria
  useEffect(() => {
    const savedPhotos = localStorage.getItem("photos");
    if (savedPhotos) {
      try {
        const parsedPhotos = JSON.parse(savedPhotos);
        setGalleryPhotos(parsedPhotos);
      } catch (error) {
        console.error("Erro ao carregar fotos:", error);
      }
    }
  }, []);

  const handleDateSelect = (daysFromToday: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromToday);
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const togglePhotoSelection = (photo: Photo) => {
    setSelectedPhotos(prev => {
      const isSelected = prev.some(p => p.id === photo.id);
      
      if (isSelected) {
        return prev.filter(p => p.id !== photo.id);
      } else {
        return prev.length < maxPhotos ? [...prev, photo] : prev;
      }
    });
  };

  const handleDeviceImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) return;
    
    const files = Array.from(e.target.files);
    const newPhotos: Photo[] = [];
    
    files.slice(0, maxPhotos - selectedPhotos.length).forEach(file => {
      const id = `device-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      newPhotos.push({
        id,
        src: URL.createObjectURL(file)
      });
    });
    
    setSelectedPhotos(prev => [...prev, ...newPhotos]);
  };

  const openCamera = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.setAttribute("capture", "environment");
      cameraInputRef.current.click();
    }
  };

  const openDeviceGallery = () => {
    if (galleryInputRef.current) {
      galleryInputRef.current.removeAttribute("capture");
      galleryInputRef.current.click();
    }
  };

  const removePhoto = (id: string) => {
    setSelectedPhotos(prev => prev.filter(photo => photo.id !== id));
  };

  const handleSubmit = () => {
    if (selectedPhotos.length === 0) {
      alert('Selecione pelo menos uma foto!');
      return;
    }
    
    alert('Feed publicado com sucesso!');
    console.log({ date: selectedDate, caption, photos: selectedPhotos });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cabeçalho */}
      <header className="sticky top-0 bg-white shadow-sm z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <button className="text-gray-500">
            <X size={24} />
          </button>
          <h1 className="text-xl font-bold text-green-700">Editar Feed</h1>
          <div className="w-6" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Seção de Data */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Data do Encontro ou da Publicação</h2>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {[-1, 0, 1].map(days => (
              <button
                key={days}
                onClick={() => handleDateSelect(days)}
                className={`px-4 py-2 rounded-lg border ${
                  selectedDate?.getDate() === new Date().getDate() + days
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white border-gray-300'
                }`}
              >
                {format(new Date().setDate(new Date().getDate() + days), 'dd MMM yyyy', { locale: ptBR })}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex items-center gap-2 text-green-600 font-medium"
          >
            <Calendar size={18} />
            {selectedDate 
              ? format(selectedDate, 'dd MMM yyyy', { locale: ptBR }) 
              : 'Escolher outra data'}
          </button>
          
          {showDatePicker && (
            <div className="mt-3 p-4 bg-white rounded-lg shadow-md">
              <input 
                type="date" 
                className="w-full p-2 border rounded-lg"
                value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
                onChange={(e) => setSelectedDate(e.target.value ? new Date(e.target.value) : null)}
              />
            </div>
          )}
        </section>

        {/* Campo de Legenda */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">TEXTO DA LEGENDA</h2>
          <div className="relative">
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Nosso encontro... percebo que qualquer atividade física é uma decisão honesta e pessoal e intransferível) de se manter determinado no com"
              className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              maxLength={maxCaptionLength}
            />
            <div className="absolute bottom-3 right-3 text-sm text-gray-500">
              {caption.length}/{maxCaptionLength}
            </div>
          </div>
        </section>

        {/* Seção de Imagens */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">ESCOLHER IMAGENS</h2>
          
          {/* Três botões com ícones autoexplicativos */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {/* Botão Galeria GooAgro */}
            <button
              onClick={() => setShowGallery(true)}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Grid size={24} className="text-green-600" />
              <span className="text-xs">Galeria GooAgro</span>
            </button>
            
            {/* Botão Câmera */}
            <button
              onClick={openCamera}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Camera size={24} className="text-green-600" />
              <span className="text-xs">Câmera</span>
            </button>
            
            {/* Botão Galeria do Dispositivo */}
            <button
              onClick={openDeviceGallery}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Image size={24} className="text-green-600" />
              <span className="text-xs">Galeria do Dispositivo</span>
            </button>
          </div>
          
          {/* Inputs escondidos para câmera e galeria */}
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleDeviceImageSelect}
          />
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleDeviceImageSelect}
          />
          
          {/* Contador de fotos selecionadas */}
          <div className="text-sm text-gray-600 mb-3">
            {selectedPhotos.length} de {maxPhotos} fotos selecionadas
          </div>
          
          {/* Pré-visualização das imagens selecionadas */}
          {selectedPhotos.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-4">
              {selectedPhotos.map((photo) => (
                <div key={photo.id} className="relative group">
                  <img 
                    src={photo.src} 
                    alt="Foto selecionada"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removePhoto(photo.id)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Botão de Publicação */}
        <button
          onClick={handleSubmit}
          disabled={!selectedDate || caption.length === 0 || selectedPhotos.length === 0}
          className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 ${
            !selectedDate || caption.length === 0 || selectedPhotos.length === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          Publicar FEED
        </button>
      </main>

      {/* Modal da Galeria GooAgro */}
      {showGallery && (
        <div className="fixed inset-0 bg-white z-50 p-4 overflow-auto">
          <div className="max-w-4xl mx-auto">
            {/* Cabeçalho do modal */}
            <div className="sticky top-0 bg-white py-4 flex justify-between items-center border-b">
              <h2 className="text-xl font-bold">Galeria GooAgro</h2>
              <button onClick={() => setShowGallery(false)} className="text-gray-500">
                <X size={24} />
              </button>
            </div>
            
            {/* Contador de seleção */}
            <div className="my-4 text-center font-medium">
              {selectedPhotos.length} de {maxPhotos} fotos selecionadas
            </div>
            
            {/* Grid de fotos da galeria */}
            <div className="grid grid-cols-3 gap-2">
              {galleryPhotos.map(photo => (
                <div 
                  key={photo.id}
                  className="relative aspect-square cursor-pointer"
                  onClick={() => togglePhotoSelection(photo)}
                >
                  <img 
                    src={photo.src} 
                    alt="Foto da galeria"
                    className={`w-full h-full object-cover rounded-lg ${
                      selectedPhotos.some(p => p.id === photo.id) 
                        ? 'ring-4 ring-green-500' 
                        : ''
                    }`}
                  />
                  
                  {/* Indicador de seleção */}
                  {selectedPhotos.some(p => p.id === photo.id) && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                      <Check size={14} />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Botão de confirmação */}
            <div className="sticky bottom-0 bg-white py-4 border-t">
              <button
                onClick={() => setShowGallery(false)}
                className="w-full py-3 bg-green-600 text-white rounded-lg font-medium"
              >
                Confirmar Seleção
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}