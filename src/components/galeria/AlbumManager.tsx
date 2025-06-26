// components/AlbumManager.tsx
"use client";

import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
// import { getItem, setItem } from "@/utils/storage";
import type { Album } from "@/utils/models";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { PlusCircle } from "react-feather";
import api from "@/utils/api";

export default function AlbumManager({
  onAlbumCreated,
  fotos, 
  setFotos,
  albums, 
  setAlbums
}: {
  onAlbumCreated?: () => void;
  fotos: any[];
  setFotos: (value: any[]) => void;
  albums: Album[];
  setAlbums: (value: Album[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  // useEffect(() => {
  //   const saved = getItem<Album[]>("albums") || [];
  //   setAlbums(saved);
  // }, []);

  const createAlbum = () => {
    if (!name) return;
    const newAlbum = { id: uuid(), name, description: desc };
    const updated = [...albums, newAlbum];
    setAlbums(updated);
    // setItem("albums", updated);
    setName("");
    setDesc("");
    setIsOpen(false);
    onAlbumCreated?.();

    setTimeout(() => {
      if (confirm("Adicionar fotos agora?")) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        document.getElementById("upload-form")?.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const viewAlbumImages = async (albumId: any) => {
    // Esperar o felipe mandar a rota correta
    try {
      const response = await api.get("api/pegar/imagens/album/" + albumId);
      const fotosArray = response.data;
      setFotos(fotosArray);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Álbuns</h3>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <PlusCircle size={18} /> Criar Álbum
        </button>
      </div>

      <ul className="text-sm text-gray-700 grid grid-cols-2 sm:grid-cols-3 gap-2">
        {albums.map((a) => (
          <li onClick={() => viewAlbumImages(a.id)} key={a.id} className="bg-gray-100 rounded p-2 shadow-sm">
            <strong>{a.name}</strong>
            <p className="text-xs text-gray-500">{a.description}</p>
          </li>
        ))}
      </ul>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <DialogPanel className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <DialogTitle className="text-xl font-bold mb-4">Criar Novo Álbum</DialogTitle>
            <input
              placeholder="Nome do álbum"
              className="border p-2 w-full mb-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              placeholder="Descrição (opcional)"
              className="border p-2 w-full mb-4 rounded resize-none"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={createAlbum}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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