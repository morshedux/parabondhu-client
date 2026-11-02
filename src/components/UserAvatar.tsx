"use client";

import { useState } from "react";

interface Props {
  name: string;
  image?: string | null;
  size?: string;
}

export default function UserAvatar({ name, image, size = "size-10" }: Props) {
  const [broken, setBroken] = useState(false);

  if (!image || broken) {
    return (
      <span
        className={`${size} flex items-center justify-center rounded-full bg-secondary font-semibold text-secondary-content`}
      >
        {name.charAt(0).toUpperCase()}
      </span>
    );
  }
  return (
    <img
      src={image}
      alt={name}
      referrerPolicy="no-referrer"
      className={`${size} rounded-full object-cover`}
      onError={() => setBroken(true)}
    />
  );
}
