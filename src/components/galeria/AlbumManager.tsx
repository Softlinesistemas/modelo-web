"use client";

import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Dialog, DialogPanel } from "@headlessui/react";
import { PlusCircle, X } from "react-feather";
import type { Album } from "@/utils/models";

interface AlbumManagerProps {
  albums: Album[];
  setAlbums: (albums: Album[]) => void;
}

export default function AlbumManager({
  albums, 
  setAlbums
}: AlbumManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const createAlbum = () => {
    if (!name.trim()) return;
    
    const newAlbum: Album = { 
      id: uuid(), 
      name, 
      description: desc,
      createdAt: new Date().toISOString(),
      cover: albums.length > 0 ? albums[0].cover : null
    };
    
    const updated = [...albums, newAlbum];
    setAlbums(updated);
    
    setName("");
    setDesc("");
    setIsOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Seus Álbuns</h3>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded text-sm"
        >
          <PlusCircle size={16} /> Novo
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {albums.map((album) => (
          <div key={album.id} className="bg-white border rounded-lg overflow-hidden shadow">
            {album.cover ? (
              <img src={album.cover} alt={album.name} className="aspect-square object-cover w-full" />
            ) : (
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Sem capa</span>
              </div>
            )}
            <div className="p-3">
              <h4 className="font-bold truncate">{album.name}</h4>
              <p className="text-sm text-gray-500 truncate">{album.description}</p>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <DialogPanel className="bg-white rounded-xl w-full max-w-md shadow-lg">
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Criar Álbum</h3>
                <button onClick={() => setIsOpen(false)} className="text-gray-500">
                  <X size={20} />
                </button>
              </div>
              
              <input
                placeholder="Nome do álbum *"
                className="w-full border rounded-lg px-4 py-2.5 mb-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              
              <textarea
                placeholder="Descrição (opcional)"
                className="w-full border rounded-lg px-4 py-2.5 mb-4 resize-none"
                rows={3}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              
              <button
                onClick={createAlbum}
                disabled={!name.trim()}
                className={`w-full py-3 rounded-lg font-medium ${
                  !name.trim()
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                Criar Álbum
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}