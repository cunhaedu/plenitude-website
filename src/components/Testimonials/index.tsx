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

import styles from './styles.module.scss';

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
    const calculatedTestimonialIndex = action === 'add'
      ? selectedTestimonialIndex + 1
      : selectedTestimonialIndex - 1

    setSelectedTestimonialIndex(calculatedTestimonialIndex);
  }

  function renderDesktopNavigation() {
    if(!testimonials.length) return null;

    return (
      <div className={styles.testimonial__desktop_navigation_container}>
        <button
          onClick={() => handleSelectedTestimonial('minus')}
          disabled={selectedTestimonialIndex <= 0}
        >
          <BsArrowUpCircleFill />
        </button>

        <button
          onClick={() => handleSelectedTestimonial('add')}
          disabled={selectedTestimonialIndex >= testimonials.length - 1}
        >
          <BsArrowDownCircleFill />
        </button>
      </div>
    )
  }

  function renderPhonePreviousTestimonialNavigation() {
    if(!testimonials.length) return null;

    return (
      <button
        className={styles.testimonial_phone_navigation_button}
        onClick={() => handleSelectedTestimonial('minus')}
        disabled={selectedTestimonialIndex <= 0}
      >
        <BsArrowLeftCircleFill />
      </button>
    )
  }

  function renderPhoneNextTestimonialNavigation() {
    if(!testimonials.length) return null;

    return (
      <button
        className={styles.testimonial_phone_navigation_button}
        onClick={() => handleSelectedTestimonial('add')}
        disabled={selectedTestimonialIndex >= testimonials.length - 1}
      >
        <BsArrowRightCircleFill />
      </button>
    )
  }

  return (
    <section className={styles.testimonials}>
      <div>
        <h3>
          <FaQuoteLeft className='pr-2 fill-indigo-600' />Testemunhos
        </h3>

        <p>
          Seja edificado(a) por testemunhos de pessoas que viveram algo incrível
          da parte do Senhor.
        </p>
      </div>

      {!testimonials.length && (
        <div className={styles.empty_testimonials}>
          <Image
            src='/assets/illustrations/empty-testimonial.svg'
            alt='Nenhum testemunho encontrado'
            width={200}
            height={200}
          />
        </div>
      )}

      {!!testimonials.length && (
        <aside className={styles.testimonials_container}>
          {renderDesktopNavigation()}

          {renderPhonePreviousTestimonialNavigation()}

          <div className={styles.testimonials_content_container}>
            <p>{testimonials[selectedTestimonialIndex].description}</p>

            <div>
              <span>{testimonials[selectedTestimonialIndex].name}</span>

              <button onClick={openModal}>
                <EyeIcon />
              </button>

              <Dialog
                title={testimonials[selectedTestimonialIndex].name}
                text={testimonials[selectedTestimonialIndex].description}
                isOpen={isOpen}
                closeModal={closeModal}
              />
            </div>
          </div>

          {renderPhoneNextTestimonialNavigation()}
        </aside>
      )}
    </section>
  )
}
