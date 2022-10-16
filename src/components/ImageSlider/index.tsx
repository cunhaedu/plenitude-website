import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import "swiper/css/pagination";

type ImageSliderProps = {
  data: Array<{
    identifier: string;
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
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1536: {
            slidesPerView: 5,
            spaceBetween: 30,
          }
        }}
      >
        {data.map(content => (
          <SwiperSlide key={content.identifier}>
            <div
              style={{backgroundImage: `url('${content.imageURL}')`}}
              className={`bg-no-repeat bg-cover bg-center rounded-md mx-2 cursor-pointer duration-200`}>
              <div className='h-80 w-full flex flex-col bg-gradient-to-t from-[#0a0a0a] hover:from-black rounded-md'>
                <span className='mt-60 text-white font-bold pl-5'>{content.title}</span>
                <span className='text-white pl-5'>{content.shortDescription}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
