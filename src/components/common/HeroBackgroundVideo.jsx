import React, { useEffect, useRef } from "react";

export default function HeroBackgroundVideo({ desktopSrc, mobileSrc, poster, className = "" }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className={`absolute inset-0 w-full h-full object-cover ${className}`}
      playsInline
      muted
      loop
      autoPlay
      preload="none"
      poster={poster}
    >
      <source src={mobileSrc || desktopSrc} type="video/mp4" media="(max-width: 767px)" />
      <source src={desktopSrc} type="video/mp4" media="(min-width: 768px)" />
    </video>
  );
}