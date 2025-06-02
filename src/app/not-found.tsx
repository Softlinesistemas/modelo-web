import Button from '@/components/common/Button';
import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <section className="flex items-center justify-center h-[100vh] bg-[#D9D9D9]">
      <div className="flex flex-col gap-4 lg:items-center lg:h-full lg:w-full lg:justify-center sm:items-start  sm:px-6">
        <span className='text-sm text-black font-bold hidden lg:block '>ERROR 404</span>
        <h2 className='text-4xl '>Oops! Page not found</h2>
        <p className='text-base text-black font-normal'>
          We couldn't find the page you were looking for. <br /> Go back to the feed by clicking the button below
        </p>
        <Button className='mr-0 ml-0 w-fit' >
          <Link href="/">Go Back</Link>
        </Button>
      </div>
    </section>
  );
}
