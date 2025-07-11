import { FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import clsx from "clsx";

type ToastType = "success" | "info" | "error" | "warning";

interface GooAgroToastProps {
  show: boolean;
  type?: ToastType;
  title?: string;
  children: ReactNode;
  onClose: () => void;
}

export function GooAgroToast({
  show,
  type = "info",
  title,
  children,
  onClose,
}: GooAgroToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={clsx(
            "fixed bottom-6 right-6 z-50 max-w-sm p-4 rounded-xl shadow-xl border-l-8 text-sm",
            {
              "bg-green-100 border-green-600 text-green-800": type === "success",
              "bg-blue-100 border-blue-600 text-blue-800": type === "info",
              "bg-yellow-100 border-yellow-600 text-yellow-800": type === "warning",
              "bg-red-100 border-red-600 text-red-800": type === "error",
            }
          )}
        >
          <div className="flex justify-between items-start gap-4">
            <div>
              {title && <h4 className="font-bold mb-1">{title}</h4>}
              <div>{children}</div>
            </div>
            <button onClick={onClose} className="text-xl hover:text-black">
              <FiX />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


export const GooAgroWelcomeMessage = (
  <>
    <p className="mb-1">
      <strong>Olá Usuário-GG! 👋</strong>
    </p>
    <p className="mb-2">
      Parabéns por escolher o <strong>GooAgro</strong> para se conectar com grupos que compartilham dos mesmos propósitos que você!
    </p>
    <p className="mb-2">Agradecemos sua confiança. Aqui está o que você pode fazer:</p>
    <ul className="list-disc pl-5 mb-2">
      <li><strong>Grupos:</strong> criar, organizar e controlar seus espaços.</li>
      <li><strong>Pessoas:</strong> encontrar e ser encontrado, convidar e ser convidado.</li>
    </ul>
    <p className="mb-2">
      <strong>Dica:</strong> preencha mais informações sobre seus interesses nos grupos. Isso facilita sua experiência!
    </p>
    <p className="mb-2">Estamos à disposição para o que precisar.</p>
    <p className="text-xs italic">
      *Se você ainda não tem 14 anos, apresente o GooAgro aos seus pais — eles também podem criar os Grupos-GG! 😉
    </p>
  </>
);



