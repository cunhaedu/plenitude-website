interface IVideoPlayerProps {
  src: string;
}

export function VideoPlayer({ src }: IVideoPlayerProps) {
  return (
    <div className="p-4 mt-3 flex items-center justify-center">
      <div className="flex-1 px-4 max-w-2xl">
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            className='rounded-3xl'
            src={src}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
          </iframe>
        </div>
      </div>
    </div>
  )
}
