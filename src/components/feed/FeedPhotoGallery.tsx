import Image from "next/image";

interface FeedPhoto {
  url: string;
  date: string; // formato: "dd/MM/yy"
}

interface FeedPhotoGalleryProps {
  photos: FeedPhoto[];
}

export const FeedPhotoGallery: React.FC<FeedPhotoGalleryProps> = ({ photos }) => {
  return (
    <div className="flex gap-2 overflow-x-auto p-2 bg-green-100 rounded-md">
      {photos.map((photo, index) => (
        <div
          key={index}
          className="relative min-w-[180px] h-[130px] rounded-md overflow-hidden border border-black shadow-sm"
        >
          <Image
            src={photo.url}
            alt={`Foto ${index + 1}`}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 py-0.5 rounded-sm">
            {photo.date}
          </div>
        </div>
      ))}
    </div>
  );
};
