import React from 'react';
import Error403Image from './Error403Image';
import Button from '../common/Button';
import Link from 'next/link';

export default function Error403() {
  return (
    <section className="flex items-center h-[100vh] bg-white-light gap-4 lg:gap-0">
    <Error403Image />
    <div className="flex flex-col gap-4 lg:items-center lg:h-full lg:w-full lg:justify-center sm:items-start  sm:px-6 lg:text-center sm:text-left">
      <span className='text-sm text-black font-bold lg:block '>ERROR 403</span>
      <h2 className='text-4xl '>Acesso negado!</h2>
      <p className='text-base text-black font-normal'>
      Parece que você não tem permissão para acessar esse
      conteúdo. <br /> Volte para o login clicando no botão abaixo
      </p>
      <Button className='mr-0 ml-0 w-fit' >
        <Link href="/">Voltar para o feed</Link>
      </Button>
    </div>
  </section>
  )
}
