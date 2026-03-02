import { useState } from 'react';

import { Skeleton } from './ui/Skeleton';

export default function Skills() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isImageError, setIsImageError] = useState(false);

  return (
    <>
      <section id="skills" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full max-w-2xl">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {!isImageLoaded && !isImageError ? (
                  <Skeleton className="absolute inset-0 rounded-none" />
                ) : null}

                {isImageError ? (
                  <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm font-medium text-slate-600">
                    이미지를 불러오지 못했습니다.
                  </div>
                ) : null}

                <img
                  src="/JG.png"
                  alt="Skills placeholder"
                  className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-200 ${
                    isImageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading="eager"
                  onLoad={() => setIsImageLoaded(true)}
                  onError={() => setIsImageError(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
