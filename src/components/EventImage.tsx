"use client";

import { useState } from "react";

export default function EventImage({ src, alt }: { src: string; alt: string }) {
  const [broken, setBroken] = useState(false);

  return (
    <img
      src={broken ? "/gallery/hands-plant.jpg" : src}
      alt={alt}
      className="h-full w-full object-cover"
      onError={() => setBroken(true)}
    />
  );
}
