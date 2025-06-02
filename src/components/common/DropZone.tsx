import { useState } from 'react';
import Button from './Button';
import Image from 'next/image';
import { TiArrowBack, TiDelete } from "react-icons/ti";
import { toast } from "react-toastify";
import {
  ASPECT_RATIO,
  MIN_DIMENSION,
  MAX_FILE_SIZE,
  ALLOWED_IMAGE_TYPES,
  MAX_FILE_SIZE_IN_MB } from "@/components/common/UserStatsCard/userStatsCardImageCropperConstants";

export default function DropZone({ formState, setChangeImageModal, handleFileChange, setIsDragActive, setFileName, setFileData, isDragActive, fileData, fileName, handleRemoveImage }: any) {

const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
  event.preventDefault();
  event.stopPropagation();
  toast.dismiss();
  setIsDragActive(false);
  const file = event.dataTransfer.files?.[0];

  if (file && file.type.startsWith("image/")) {
    const img = new window.Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
       const { width, height } = img;

      if (file.size > MAX_FILE_SIZE) {
          toast.warning(
            `The maximum allowed image size is ${MAX_FILE_SIZE_IN_MB} MB. Please choose a smaller file.`
          );
          URL.revokeObjectURL(objectUrl);
        return;
      }


      if (width !== height) {
        toast.warning("The image must be square (equal width and height).");
        URL.revokeObjectURL(objectUrl);
         setChangeImageModal(true);
        return;
      }

      if (width < 150 || height < 150) {
        toast.warning("The image must be at least 150x150 pixels.");
        URL.revokeObjectURL(objectUrl);
        return;
      }

      setFileName(file.name);
      setFileData(file);
      URL.revokeObjectURL(objectUrl);
    };

    img.onerror = () => {
      toast.error("Failed to load the image.");
      URL.revokeObjectURL(objectUrl);
    };

    img.src = objectUrl;
  } else {
    toast.error("Please upload only image files.");
  }
};


  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(true);
  };

  const getMediaPreview = (file: File | null) => {
      if (!file) return null;
      const url = URL.createObjectURL(file);
  
      if (file.type.startsWith("image/")) {
          return <Image src={url} alt="Prévia da mídia" width={300} height={300} className="rounded-lg shadow" />;
      }
      return null;
  };

  return (
    <label
      htmlFor="dropzone-file"
      className={`absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center w-full h-fit border-2 border-dashed rounded-lg cursor-pointer shadow-custom ${
        (isDragActive || fileData || formState?.CaminhoVenda || formState?.Caminho2)
          ? 'border-blue-500 bg-blue-50/20'
          : 'border-gray-300 bg-gray-100'
      } z-50`}
      onDragOver={handleDragOver} 
      onDrop={handleDrop}
      onClick={handleFileChange}
      onDragLeave={handleDragLeave}
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex flex-col items-center justify-center p-4 w-full">
            {fileData ? (
              <div className="w-full h-auto max-h-[500px] flex justify-center relative">
                  <div className="w-full h-auto max-h-[500px] flex justify-center">
                      {getMediaPreview(fileData)}
                  </div>
                  <Button
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 text-white bg-custom-gradient-red hover:bg-custom-gradient-red-hover rounded-full p-1"
                  >
                      <TiDelete size={18} />
                  </Button>
              </div>
            ) : (formState?.CaminhoVenda || formState?.Caminho2) && (
              <div className="w-full h-auto max-h-[500px] flex justify-center relative">
                  <div className="w-full h-auto max-h-[500px] flex justify-center">
                    <Image width={300} height={300} src={process.env.NEXT_PUBLIC_IMAGE_URL + (formState?.CaminhoVenda || formState?.Caminho2)} alt="Prévia da mídia" className="rounded-lg shadow" />
                  </div>
                  <Button
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 text-white bg-custom-gradient-red hover:bg-custom-gradient-red-hover rounded-full p-1"
                  >
                      <TiDelete size={18} />
                  </Button>
              </div>
            )}
          {!fileData && !formState?.CaminhoVenda && !formState?.Caminho2 ? (
            <>
               <span className="font-bold">Click to send</span> or drop file here.
            </>
          ) : (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {fileData || formState?.CaminhoVenda || formState?.Caminho2
                ? `${fileName || ""}`
                : 'JPG, JPEG, PNG'}
            </p>
          )}
          </div>
        </p>
      </div>
    </label>
  );
}
