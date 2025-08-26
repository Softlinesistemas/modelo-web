"use client";

import React, { useState } from 'react';
import { Button } from '@/utils/ui/Button';
import { Textarea } from '@/utils/ui/Textarea';
import { Label } from '@/utils/ui/Label';
import { AppModal } from '@/utils/ui/AppModal';
import { Camera, X } from 'react-feather';
import { toast } from 'react-hot-toast';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePost: (text: string, images: File[]) => Promise<void>;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onCreatePost
}) => {
  const [postText, setPostText] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validImages = files.filter(file => file.type.startsWith('image/'));
    
    if (validImages.length !== files.length) {
      toast.error('Apenas arquivos de imagem são permitidos');
    }
    
    setSelectedImages(prev => [...prev, ...validImages].slice(0, 5)); // Máximo 5 imagens
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!postText.trim()) {
      toast.error('Digite um texto para o post');
      return;
    }

    try {
      setIsCreating(true);
      await onCreatePost(postText, selectedImages);
      
      // Limpar formulário e fechar modal
      setPostText('');
      setSelectedImages([]);
      onClose();
      
      toast.success('Post criado com sucesso!');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao criar post');
    } finally {
      setIsCreating(false);
    }
  };

  const handleClose = () => {
    if (!isCreating) {
      setPostText('');
      setSelectedImages([]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AppModal onClose={handleClose}>
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-green-800">Criar novo post</h2>
          <button 
            onClick={handleClose}
            disabled={isCreating}
            className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <Label>O que você está fazendo hoje?</Label>
            <Textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Compartilhe suas atividades, conquistas ou pensamentos..."
              rows={4}
              className="mt-2"
              disabled={isCreating}
            />
          </div>

          <div>
            <Label>Adicionar fotos (opcional)</Label>
            <div className="mt-2">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
                id="post-images-modal"
                disabled={isCreating}
              />
              <label 
                htmlFor="post-images-modal"
                className={`flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition ${isCreating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Camera className="w-4 h-4" />
                Selecionar fotos ({selectedImages.length}/5)
              </label>
            </div>
          </div>

          {selectedImages.length > 0 && (
            <div>
              <Label>Fotos selecionadas</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {selectedImages.map((file, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt={`Preview ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      disabled={isCreating}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 disabled:opacity-50"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button 
              onClick={handleSubmit}
              disabled={isCreating || !postText.trim()}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {isCreating ? 'Publicando...' : 'Publicar'}
            </Button>
            <Button 
              onClick={handleClose}
              disabled={isCreating}
              variant="outline"
              className="px-6"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </AppModal>
  );
};

