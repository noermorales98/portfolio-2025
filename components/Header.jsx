import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4'>
      <div>
        <Image src={assets.profile_img} alt='' className='rounded-full w-32'/>
      </div>
      <h3 className='flex items-end gap-2 text-xl md:text-2xl mb-3 font-Ovo'>
            ¡Hola! Soy Noe Rodriguez </h3>
    <h1 className='text-3xl sm:text-6xl lg:text-[66px] font-Ovo flex items-center justify-center gap-2 flex-wrap'>
        <span>Desarrollador Web</span> <Image src={assets.computer_icon} alt='' className='w-10 sm:w-16'/> <span>& Gestor de Contenido</span></h1>

        <p className='max-w-2xl mx-auto font-Ovo'>
        Convierto ideas en experiencias digitales visuales y funcionales.
        </p>

        <div className='flex flex-col sm:flex-row items-center gap-4 mt-4'>
            <a
            href="#cotizar"
            className='px-10 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2 dark:bg-transparent'
            >Cotizar <Image src={assets.right_arrow_white} alt='' className='w-4'/></a>

            <a
            href="#work"
            className='px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2 bg-white dark:text-black'>
                Ver Portfolio <Image src={assets.right_arrow} alt='' className='w-4 rotate-90'/></a>
        </div>
    </div>
  )
}

export default Header
