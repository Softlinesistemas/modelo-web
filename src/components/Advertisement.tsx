'use client';

type AdvertisementProps = {
  type: "image" | "video";
  src: string;
  link: string;
  caption1?: string;
  caption2?: string;
};

export default function Advertisement({
  type,
  src,
  link,
  caption1,
  caption2
}: AdvertisementProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl shadow-lg overflow-hidden bg-white transition hover:scale-[1.02]"
    >
      {/* Imagem ou vídeo */}
      {type === "image" ? (
        <img
          src={src}
          alt={caption1 || "Publicidade"}
          className="w-full h-[300px] md:h-[400px] object-cover"
        />
      ) : (
        <video
          src={src}
          className="w-full h-[300px] md:h-[400px] object-cover"
          controls
          muted
          autoPlay
          loop
        />
      )}

      {/* Captions exibidos abaixo da mídia */}
      {(caption1 || caption2) && (
        <div className="p-3 space-y-1">
          {caption1 && (
            <p className="text-center text-sm text-gray-700">{caption1}</p>
          )}
          {caption2 && (
            <p className="text-center text-sm text-gray-700">{caption2}</p>
          )}
        </div>
      )}
    </a>
  );
}