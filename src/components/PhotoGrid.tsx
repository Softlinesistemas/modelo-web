"use client";

const photos = [
  { src: "https://via.placeholder.com/600x600", caption: "Plantação verdejante" },
  { src: "https://via.placeholder.com/600x600", caption: "Colheita do milho" },
  { src: "https://via.placeholder.com/600x600", caption: "Feira orgânica" },
  { src: "https://via.placeholder.com/600x600", caption: "Trator em ação" },
  { src: "https://via.placeholder.com/600x600", caption: "Produção local" },
  { src: "https://via.placeholder.com/600x600", caption: "Equipe em campo" },
];

export default function PhotoGrid() {
  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Galeria</h2>

      <div className="overflow-x-auto">
        <div className="flex gap-6 min-w-full md:min-w-0">
          {photos.slice(0, 6).map((photo, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[80vw] md:w-[200px] lg:w-[300px] rounded-xl bg-white shadow overflow-hidden"
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-[200px] md:h-[300px] object-cover"
              />
              <div className="p-3">
                <p className="text-center text-sm text-gray-700">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}