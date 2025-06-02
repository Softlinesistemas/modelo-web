import React, { useRef, useState } from 'react';
import Image from 'next/image';
import ReactCrop, {
  Crop,
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from 'react-image-crop';
import { setCanvasPreview } from './setCanvasPreview';
import {
  ASPECT_RATIO,
  MIN_DIMENSION,
  MAX_FILE_SIZE,
  ALLOWED_IMAGE_TYPES,
  MAX_FILE_SIZE_IN_MB,
} from './userStatsCardImageCropperConstants';

interface UserStatsCardImageCropperProps {
  closeModal: () => void;
  updateImage: (avatar: string | undefined) => void;
  circularCrop?: boolean,
  aspectRatio?: number
}

const initialCrop: Crop = {
  unit: '%', 
  width: 100,
  height: 100,
  x: 0,
  y: 0,
};

export default function UserStatsCardImageCropper({
  closeModal,
  updateImage,
  circularCrop,
  aspectRatio = ASPECT_RATIO
}: UserStatsCardImageCropperProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState<Crop | undefined>();
  const [cropCanvas, setCropCanvas] = useState<Partial<Crop>>({});
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const [isNext, setIsNext] = useState(false);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setError(
        `The maximum allowed image size is ${MAX_FILE_SIZE_IN_MB} MB. Please choose a smaller file.`
      );
      setImgSrc('');
      return;
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError('Failed to load the image.');
      setImgSrc('');
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const imageUrl = reader.result?.toString() || '';
      if (error) {
        setError('');
      }
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const { width, height, naturalWidth, naturalHeight } = e.currentTarget;

    if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
      setError('The image must be at least 150x150 pixels.');
      setImgSrc('');
      return;
    }

    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;
    const crop = makeAspectCrop(
      {
        unit: '%',
        width: cropWidthInPercent,
      },
      aspectRatio,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
    setCropCanvas(centeredCrop);
  };

  const handleAdvance = () => {
    setIsNext(true);
    const dataUrl = setCanvasPreview(
      imgRef.current,
      previewCanvasRef.current,
      convertToPixelCrop(
        cropCanvas,
        imgRef.current?.width || 0,
        imgRef.current?.height || 0
      )
    );
    setImagePreview(dataUrl);
  };

  return (
    <>
      <div className="mt-6 h-[500px] w-full flex justify-center items-center cursor-pointer relative flex-col gap-6">
        <input
          id="profile-image"
          type="file"
          accept="image/*"
          className="w-full h-[500px] absolute rounded-full opacity-0 z-10 cursor-pointer"
          onChange={onSelectFile}
        />
        {imgSrc ? (
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => {
              setCrop(percentCrop);
              setCropCanvas(percentCrop);
            }}
            circularCrop={circularCrop || undefined}
            keepSelection
            aspect={aspectRatio}
            minWidth={MIN_DIMENSION}
            className="z-30">
            <div className="max-h-[500px] w-full flex justify-center">
              <Image
                ref={imgRef}
                width={500}
                height={500}
                src={imgSrc}
                alt="Upload"
                onLoad={onImageLoad}
                className="object-contain max-h-[500px] w-auto"
              />
            </div>
          </ReactCrop>
        ) : (
          <p className="text-white text-lg font-[500]">
            Click here to add a picture
          </p>
        )}
        {error && (
          <p className="text-red-400 text-lg font-[500] text-center">{error}</p>
        )}
        <div className="h-[8px] top-0 absolute left-0 w-[150px] bg-white" />
        <div className="h-[150px] top-0 absolute left-0 w-[8px] bg-white" />
        <div className="h-[8px] top-0 absolute right-0 w-[150px] bg-white" />
        <div className="h-[150px] top-0 absolute right-0 w-[8px] bg-white" />
        <div className="h-[8px] bottom-0 absolute left-0 w-[150px] bg-white" />
        <div className="h-[150px] bottom-0 absolute left-0 w-[8px] bg-white" />
        <div className="h-[8px] bottom-0 absolute right-0 w-[150px] bg-white" />
        <div className="h-[150px] bottom-0 absolute right-0 w-[8px] bg-white" />
      </div>
      {imgSrc &&
        (isNext ? (
          <div className="absolute bottom-0 left-0 z-40 w-full my-auto h-[530px] bg-[#696969e7] flex flex-col justify-center items-center">
            <div className="my-auto mx-auto flex flex-col justify-center items-center gap-2">
              <h2 className="text-xl font-[500] text-center">
                Preview
              </h2>
              {imagePreview && (
                <Image
                  src={imagePreview}
                  alt="preview imagem"
                  width={150}
                  height={150}
                  className={`mx-auto border-2 w-[150px] h-[150px] object-cover border-primary ${circularCrop ? "rounded-full" : "" }`}
                />
              )}
              <div className="flex gap-6">
                <button
                  className="ml-auto mr-0 bg-transparent border-white border-2 w-32"
                  onClick={() => {
                    setIsNext(false);
                  }}>
                  Cancel
                </button>
                <button
                  className="mr-auto ml-0 w-32"
                  onClick={() => {
                    updateImage(imagePreview);
                    closeModal();
                  }}>
                  Continue
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 flex justify-end gap-4 mx-auto">
            <div className="relative w-full">
              <button
                className="bg-transparent border-black-all text-black border-2 flex mr-0"
                onClick={() => onSelectFile}>
                Change picture
              </button>
              <input
                id="profile-image"
                type="file"
                accept="image/*"
                className=" h-full absolute opacity-0 z-10 right-0 top-0 rounded-l-3xl rounded-r-3xl cursor-pointer w-[178px]"
                onChange={onSelectFile}
              />
            </div>
            <button className="ml-0" onClick={handleAdvance}>
              Next
            </button>
          </div>
        ))}
      {crop && <canvas ref={previewCanvasRef} className="hidden" />}
    </>
  );
}
