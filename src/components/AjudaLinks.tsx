import React from 'react';
import Link from 'next/link';

export const AjudaLinks = () => {
  return (
    <div className="w-full text-center text-sm text-gray-600 mt-8 space-x-4">
      <Link href="/ajuda">
        <span className="hover:underline hover:text-green-700 cursor-pointer">Ajuda</span>
      </Link>
      <span className="text-gray-400">/</span>
      <Link href="/faq">
        <span className="hover:underline hover:text-green-700 cursor-pointer">FAQ</span>
      </Link>
      <span className="text-gray-400">/</span>
      <Link href="/tutoriais">
        <span className="hover:underline hover:text-green-700 cursor-pointer">Tutoriais</span>
      </Link>
    </div>
  );
};
