import { useEffect, useRef } from 'react';
import UserStatsCardImageCropper from './UserStatsCard/UserStatsCardImageCropper';
import { IoMdClose } from "react-icons/io";

export default function ChangeImageModal({
  closeModal,
  updateImage,
}: any) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
    className="relative z-50"
    aria-labelledby="crop-image-dialog"
    role="dialog"
    aria-modal="true">
    <div className="fixed inset-0 bg-gray-900 bg-opacity-20 transition-all backdrop-blur-sm"></div>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-[750px] justify-center px-2 py-12 text-center ">
          <div
            className="relative w-[60%] sm:w-[80%] min-h-[60vh] rounded-2xl bg-white-light text-black text-left shadow-xl transition-all"
            ref={modalRef}>
            <div className="px-8 py-4 relative">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-[500]">Crop picture</h2>
                <IoMdClose onClick={closeModal} className="cursor-pointer text-white text-3xl"/>
              </div>
              <UserStatsCardImageCropper                
                closeModal={closeModal}
                updateImage={updateImage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
