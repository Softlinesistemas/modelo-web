import React, { ReactNode, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import useOutsideClick from '@/hooks/useOutsideClick';
import { useTranslation } from "react-i18next";

interface ModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  onSave?: () => void | any;
  cancelLabel?: string;
  saveLabel?: string;
  cancelButtonClassName?: string;
  saveButtonClassName?: string;
  contentClassName?: string;
  isLoading?: boolean;
  overflowHidden?: boolean;
  full?: boolean;
  noMargin?: boolean;
  fitModal?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  title,
  children,
  onClose,
  onSave,
  cancelLabel = 'Cancel',
  saveLabel = 'Save',
  cancelButtonClassName,
  saveButtonClassName,
  contentClassName = '',
  isLoading = false,
  overflowHidden = false,
  full = false,
  noMargin = false,
  fitModal = false,
}) => {
  const { t, i18n } = useTranslation();

  const modalRef = useOutsideClick(onClose);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center overflow-x-hidden ${
        overflowHidden ? 'overflow-y-hidden' : 'overflow-y-auto'
      } ${noMargin ? "mt-0" : "mt-16"}`}
    >
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className={`relative z-50 w-full ${
          full ? 'mx-48 lg:mx-8 md:mx-4 sm:mx-1' : 'max-w-3xl mx-auto'
        } ${noMargin ? "my-2" :"my-16"} bg-white-light rounded-lg shadow-lg transform ${fitModal ? "w-fit mx-0 max-w-[500px]" : ""}`}
      >

        <div
          className={`flex flex-wrap justify-start items-start gap-4 px-6 ${contentClassName}`}
        >
          {children}
        </div>

        <div className="px-6 py-4 border-t rounded-b-lg">
          <div className="flex justify-end gap-2">
            <Button
              className={`ml-0 mr-0 w-auto items-center border-white-dark bg-transparent border text-gray-700 font-medium shadow-custom hover:bg-white-dark ${cancelButtonClassName}`}
              onClick={onClose}
            >
              {cancelLabel}
            </Button>
            {onSave && (
              <Button
                className={`mx-0 ${saveButtonClassName}`}
                onClick={onSave}
                loading={isLoading}
              >
                {saveLabel}
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="fixed inset-0 z-40 bg-black-all bg-opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
};

export default Modal;
