import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import Image from 'next/future/image';

import 'swiper/css';
import "swiper/css/pagination";
import Link from 'next/link';

type ImageSliderProps = {
  data: Array<{
    slug: string;
    title: string;
    shortDescription: string;
    imageURL: string;
  }>
}

export function ImageSlider({ data }: ImageSliderProps) {
  return (
    <div className='max-w-full 2xl:max-w-screen-2xl 2xl:self-center overflow-x-hidden my-10'>
      <Swiper
        modules={[Pagination]}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2,
            centeredSlides: true,
            centeredSlidesBounds: true,
            pagination: false,
          }
        }}
      >
        {data.map(content => (
          <SwiperSlide key={content.slug}>
            <Link href={`/leadership/${content.slug}`} passHref>
              <a>
                <div className="h-80 w-full md:w-80 md:mx-5 cursor-pointer relative">
                  <Image
                    src={content.imageURL}
                    alt={content.title}
                    fill
                    className='object-cover object-center rounded-md w-[calc(20rem-2.5rem)]'
                  />
                  <div className='h-80 w-full flex flex-col bg-gradient-to-t from-[#0a0a0a] hover:from-black rounded-md relative'>
                    <span className='mt-60 text-white font-bold pl-5'>{content.title}</span>
                    <span className='text-white pl-5'>{content.shortDescription}</span>
                  </div>
                </div>
              </a>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
