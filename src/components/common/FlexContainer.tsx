export default function FlexContainer({ children, className, onClick, ref }: any) {
  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`bg-white-light rounded-[20px] text-black font-normal text-base input-placeholder shadow-custom py-2 ${className}`}
    >
      {children}
    </div>
  );
}
