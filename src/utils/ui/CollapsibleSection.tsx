// components/CollapsibleSection.tsx
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface CollapsibleSectionProps {
  title: string;
  subTitle?: string;
  children: React.ReactNode;
  bgColor?: string;
}

export const CollapsibleSection = ({ title, subTitle, children, bgColor = 'bg-green-500' }: CollapsibleSectionProps) => {
  const [open, setOpen] = useState(true);

  return (
    <div className={`rounded border mb-4 ${bgColor} text-white`}>
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer flex justify-between items-center px-4 py-2 font-bold text-center"
      >
        <FaChevronDown className={`${open ? 'rotate-180' : ''} transition`} />
          <h3 className="font-semibold text-base md:text-lg">{title}</h3>
          {/* <p className="text-xs md:text-sm mt-1">{subTitle}</p> */}
        <FaChevronDown className={`${open ? 'rotate-180' : ''} transition`} />
      </div>
      {open && <div className="bg-white text-black p-4">{children}</div>}
    </div>
  );
};
