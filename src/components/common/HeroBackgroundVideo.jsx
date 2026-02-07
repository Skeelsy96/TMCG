import React, { useEffect, useRef, useState } from "react";

export default function HeroBackgroundVideo({ desktopSrc, mobileSrc, poster, className = "" }) {
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasError) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((e) => {
              console.warn('Video autoplay blocked or failed:', e);
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [hasError]);

  return (
    <>
      {hasError && poster ? (
        <img
          src={poster}
          alt="Background"
          className={`absolute inset-0 w-full h-full object-cover ${className}`}
        />
      ) : (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover ${className}`}
          playsInline
          muted
          loop
          autoPlay
          preload="metadata"
          poster={poster}
          crossOrigin="anonymous"
          onError={() => setHasError(true)}
        >
          <source src={mobileSrc || desktopSrc} type="video/mp4" media="(max-width: 767px)" />
          <source src={desktopSrc} type="video/mp4" media="(min-width: 768px)" />
        </video>
      )}
    </>
  );
}