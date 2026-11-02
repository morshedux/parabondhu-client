"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import Field from "@/components/Field";
import UserAvatar from "@/components/UserAvatar";
import { authClient } from "@/lib/auth-client";
import { isHttpUrl } from "@/lib/validation";

const PHOTO_SIZE = 200;

async function photoToDataUrl(file: File) {
  const bitmap = await createImageBitmap(file);
  const side = Math.min(bitmap.width, bitmap.height);
  const canvas = document.createElement("canvas");
  canvas.width = PHOTO_SIZE;
  canvas.height = PHOTO_SIZE;
  canvas
    .getContext("2d")
    ?.drawImage(
      bitmap,
      (bitmap.width - side) / 2,
      (bitmap.height - side) / 2,
      side,
      side,
      0,
      0,
      PHOTO_SIZE,
      PHOTO_SIZE,
    );
  return canvas.toDataURL("image/jpeg", 0.8);
}

interface Props {
  name: string;
  email: string;
  image: string;
}

export default function ProfileForm({ name: initialName, email, image: initialImage }: Props) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [image, setImage] = useState(initialImage);
  const [errors, setErrors] = useState<{ name?: string | null; image?: string | null }>({});
  const [busy, setBusy] = useState(false);

  const uploaded = image.startsWith("data:image/");

  const choosePhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setImage(await photoToDataUrl(file));
      setErrors((current) => ({ ...current, image: null }));
    } catch {
      setErrors((current) => ({ ...current, image: "Choose a JPG, PNG or WebP image." }));
    }
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const found = {
      name: name.trim().length < 2 ? "Name needs at least 2 characters." : null,
      image: uploaded || isHttpUrl(image) ? null : "Upload a photo or enter a valid photo URL.",
    };
    setErrors(found);
    if (found.name || found.image) return;

    setBusy(true);
    const { error } = await authClient.updateUser({ name: name.trim(), image: image.trim() });
    setBusy(false);
    if (error) {
      toast.error(error.message || "Profile could not be updated. Try again.");
      return;
    }
    authClient.$store.notify("$sessionSignal");
    toast.success("Profile updated.");
    router.refresh();
  };

  return (
    <form onSubmit={submit} noValidate className="mx-auto max-w-lg space-y-5">
      <div className="flex items-center gap-4">
        <UserAvatar key={image} name={name || email} image={image} size="size-20" />
        <div className="min-w-0">
          <p className="truncate font-display text-xl font-bold">{name}</p>
          <p className="truncate text-sm opacity-75">{email}</p>
        </div>
      </div>
      <Field label="Name" htmlFor="name" error={errors.name}>
        <input id="name" className="input w-full" value={name} onChange={(e) => setName(e.target.value)} />
      </Field>
      <Field label="Upload a photo" htmlFor="photo">
        <input id="photo" type="file" accept="image/jpeg,image/png,image/webp" className="file-input w-full" onChange={choosePhoto} />
      </Field>
      <Field label="Or use a photo URL" htmlFor="image" error={errors.image}>
        <input id="image" type="url" className="input w-full" placeholder={uploaded ? "Using your uploaded photo" : "https://example.com/photo.jpg"} value={uploaded ? "" : image} onChange={(e) => setImage(e.target.value)} />
      </Field>
      <button type="submit" className="btn btn-primary w-full" disabled={busy}>
        {busy ? "Saving..." : "Save profile"}
      </button>
    </form>
  );
}
