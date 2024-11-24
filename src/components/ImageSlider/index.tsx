import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Pagination } from 'swiper';
import Link from 'next/link';

import "swiper/css/pagination";
import 'swiper/css';

import styles from './styles.module.scss';

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
    <div className={styles.image_slider_container}>
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
            <Link href={`/leadership/${content.slug}`}>
              <div className={styles.item_container}>
                <Image
                  src={content.imageURL}
                  alt={content.title}
                  fill
                />
                <div>
                  <p>{content.title}</p>
                  <span>{content.shortDescription}</span>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
