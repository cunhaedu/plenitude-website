import { EyeIcon } from '@heroicons/react/outline';
import { FaQuoteLeft } from 'react-icons/fa';
import { useState } from 'react';
import Image from 'next/image';
import {
  BsArrowDownCircleFill,
  BsArrowLeftCircleFill,
  BsArrowRightCircleFill,
  BsArrowUpCircleFill
} from 'react-icons/bs';

import { Dialog } from '../Dialog';

type TestimonialsProps = {
  testimonials: Array<{
    name: string;
    description: string;
  }>
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [selectedTestimonialIndex, setSelectedTestimonialIndex] = useState(0);
  let [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleSelectedTestimonial(action: string) {
    setSelectedTestimonialIndex(
      action === 'add' ? selectedTestimonialIndex + 1 : selectedTestimonialIndex - 1
    );
  }

  return (
    <section className='py-20 px-10 flex flex-col lg:flex-row justify-center lg:justify-evenly bg-[#F0EDFF]'>
      <div className='flex flex-col justify-center align-middle gap-5'>
        <h2 className='font-bold text-3xl text-indigo-600 pb-3 flex self-center lg:self-start'>
          <FaQuoteLeft className='pr-2 fill-indigo-600' />Testemunhos
        </h2>

        <p className='pb-10 text-gray-500 text-lg font-medium max-w-sm lg:max-w-xs self-center text-center lg:self-start lg:text-left'>
          Seja edificado(a) por testemunhos de pessoas que viveram algo incrível
          da parte do Senhor.
        </p>
      </div>

      {testimonials.length ? (
        <div className='flex justify-center align-middle gap-10 pt-10'>
          {testimonials.length > 1 && (
            <div className='hidden h-64 lg:flex flex-col align-middle justify-center gap-7'>
              <button
                className='disabled:opacity-75 cursor-pointer'
                onClick={() => handleSelectedTestimonial('minus')}
                disabled={selectedTestimonialIndex <= 0}
              >
                <BsArrowUpCircleFill
                  className='w-7 h-7 fill-indigo-700 hover:fill-indigo-800'
                />
              </button>

              <button
                className='disabled:opacity-75 cursor-pointer'
                onClick={() => handleSelectedTestimonial('add')}
                disabled={selectedTestimonialIndex >= testimonials.length - 1}
              >
                <BsArrowDownCircleFill
                  className='w-7 h-7 fill-indigo-700 hover:fill-indigo-800'
                />
              </button>
            </div>
          )}

          {testimonials.length > 1 && (
            <button
              className='lg:hidden disabled:opacity-75 cursor-pointer h-7 mt-32'
              onClick={() => handleSelectedTestimonial('minus')}
              disabled={selectedTestimonialIndex <= 0}
            >
              <BsArrowLeftCircleFill
                className='w-7 h-7 fill-indigo-700 hover:fill-indigo-800'
              />
            </button>
          )}

          <div className='flex flex-col gap-3 justify-evenly p-5 w-[calc(100vw-10rem)] lg:w-96 h-64 bg-white rounded-lg'>
            <p className='text-sm max-h-48 line-clamp-6'>
              {testimonials[selectedTestimonialIndex].description}
            </p>

            <div className='flex flex-col align-middle justify-center gap-5 md:flex-row md:justify-between'>
              <span className='font-medium'>
                {testimonials[selectedTestimonialIndex].name}
              </span>

              <button
                className='w-full h-8 md:w-12 bg-indigo-700/70 hover:bg-indigo-700 rounded-md flex align-middle justify-center'
                onClick={openModal}
              >
                <EyeIcon className='text-white cursor-pointer w-6 h-6 self-center'/>
              </button>
              <Dialog
                title={testimonials[selectedTestimonialIndex].name}
                text={testimonials[selectedTestimonialIndex].description}
                isOpen={isOpen}
                closeModal={closeModal}
              />
            </div>

          </div>

          {testimonials.length > 1 && (
            <button
              className='lg:hidden disabled:opacity-75 cursor-pointer h-7 mt-32'
              onClick={() => handleSelectedTestimonial('add')}
              disabled={selectedTestimonialIndex >= testimonials.length - 1}
            >
              <BsArrowRightCircleFill
                className='w-7 h-7 fill-indigo-700 hover:fill-indigo-800'
              />
            </button>
          )}
        </div>
      ) : (
        <div className='hidden lg:flex justify-center align-middle'>
          <Image
            src='/assets/illustrations/empty-testimonial.svg'
            alt='Nenhum testemunho encontrado'
            width={200}
            height={200}
          />
        </div>
      )}
    </section>
  )
}
