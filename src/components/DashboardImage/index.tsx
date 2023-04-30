import Image from 'next/image';

type DashboardImageProps = {
  url: string;
  alt: string;
}

export function DashboardImage({ url, alt }: DashboardImageProps) {
  return (
    <div className='dashboard__image_container'>
      <div>
        <Image
          src={url}
          alt={alt}
          width={120}
          height={120}
        />
      </div>
    </div>
  )
}
