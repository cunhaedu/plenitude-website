import { useState } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import { BsArrowDownCircleFill, BsArrowLeftCircleFill, BsArrowRightCircleFill, BsArrowUpCircleFill } from 'react-icons/bs';
import Link from 'next/link';
import Image from 'next/image';
import { ITestimonial } from '../../interfaces/ITestimonial';

const testimonials: ITestimonial[] = [
  {
    id: 1,
    name: 'Bruno Gabriel',
    content: 'Entrei na Comunidade Plenitude com uma enfermidade nas pernas, ela me incomodava por muito tempo e eu não conseguia fazer algumas tarefas de casa, mas para a glória de Deus recebi minha cura naquele lugar. Eu me lembro que o Ap.Diego Melo convidou as pessoas que precisavam ser curadas para ir na frente do altar e com fé eu fui, no outro dia acordei sem a dor que me incomodava.'
  },
  {
    id: 1,
    name: 'Jorginho',
    content: 'Entrei na Comunidade Plenitude com uma enfermidade nas pernas, ela me incomodava por muito tempo e eu não conseguia fazer algumas tarefas de casa, mas para a glória de Deus recebi minha cura naquele lugar. Eu me lembro que o Ap.Diego Melo convidou as pessoas que precisavam ser curadas para ir na frente do altar e com fé eu fui, no outro dia acordei sem a dor que me incomodava.'
  },
  {
    id: 1,
    name: 'Joãozinho',
    content: 'Entrei na Comunidade Plenitude com uma enfermidade nas pernas, ela me incomodava por muito tempo e eu não conseguia fazer algumas tarefas de casa, mas para a glória de Deus recebi minha cura naquele lugar. Eu me lembro que o Ap.Diego Melo convidou as pessoas que precisavam ser curadas para ir na frente do altar e com fé eu fui, no outro dia acordei sem a dor que me incomodava.'
  }
];

export function Testimonials() {
  const [selectedTestimonialIndex, setSelectedTestimonialIndex] = useState(0);

  function handleSelectedTestimonial(action: string) {
    setSelectedTestimonialIndex(
      action === 'add' ? selectedTestimonialIndex + 1 : selectedTestimonialIndex - 1
    );
  }

  return (
    <section className='py-20 px-10 flex flex-col lg:flex-row justify-center lg:justify-evenly bg-[#F0EDFF]'>
      <div className='flex flex-col justify-center align-middle'>
        <h2 className='font-bold text-3xl text-indigo-600 pb-3 flex self-center lg:self-start'>
          <FaQuoteLeft className='pr-2 fill-indigo-600' />Testemunhos
        </h2>

        <p className='pb-10 text-indigo-600 font-medium self-center text-center lg:self-start lg:text-left'>
          Não vai faltar motivação!
        </p>

        <p className='pb-10 text-gray-500 font-medium max-w-sm self-center text-center lg:self-start lg:text-left'>
          Seja edificado(a) por testemunhos de pessoas que viveram algo incrível
          da parte do Senhor.
        </p>

        <Link href='#'>
          <a className='w-32 bg-indigo-700 text-white text-center hover:bg-indigo-800 py-3 px-5 rounded-lg self-center lg:self-start'>
            Testemunhar
          </a>
        </Link>
      </div>

      {testimonials.length ? (
        <div className='flex justify-center align-middle gap-10 pt-10'>
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

          <button
            className='lg:hidden disabled:opacity-75 cursor-pointer h-7 mt-32'
            onClick={() => handleSelectedTestimonial('minus')}
            disabled={selectedTestimonialIndex <= 0}
          >
            <BsArrowLeftCircleFill
              className='w-7 h-7 fill-indigo-700 hover:fill-indigo-800'
            />
          </button>

          <div className='flex flex-col gap-3 justify-evenly p-5 w-[calc(100vw-10rem)] lg:w-96 h-64 bg-white rounded-lg'>
            <p className='text-sm max-h-48 line-clamp-6'>
              {testimonials[selectedTestimonialIndex].content}
            </p>

            <span className='font-medium'>
              {testimonials[selectedTestimonialIndex].name}
            </span>
          </div>

          <button
            className='lg:hidden disabled:opacity-75 cursor-pointer h-7 mt-32'
            onClick={() => handleSelectedTestimonial('add')}
            disabled={selectedTestimonialIndex >= testimonials.length - 1}
          >
            <BsArrowRightCircleFill
              className='w-7 h-7 fill-indigo-700 hover:fill-indigo-800'
            />
          </button>
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
