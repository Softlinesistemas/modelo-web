import { Label } from '@/utils/ui/Label';
import { ReactNode } from 'react';

type Props = {
  icon: ReactNode;
  children: ReactNode;
};

export const DemographicLabel = ({ icon, children }: Props) => {
  return (
    <Label className="flex flex-wrap items-center gap-2 font-bold text-green-700 text-sm sm:text-base leading-snug sm:leading-tight mb-2">
      {icon}
      <span className="block break-words max-w-[240px] sm:max-w-full">{children}</span>
    </Label>
  );
};
