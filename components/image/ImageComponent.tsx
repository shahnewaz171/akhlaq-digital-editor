"use client";

import Image from "next/image";
import { memo, useEffect, useState } from "react";
import { getImgixFileURL } from "@/components/image/imgix-server";
import { useEditorEnv } from "@/components/tiptap-templates/use-editor-env-context";
import type { ImageComponentParams } from "@/components/tiptap-node/types";

const ImageComponent: React.FC<ImageComponentParams> = ({
  alt,
  generatedUrl,
  className = "",
  height = 500,
  path,
  src = "",
  rotate,
  width = 500,
  defaultImageName = "",
  textSize = "text-10",
  fit = "scale",
  quality = 100,
  isPrivate = true,
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [notFound, setNotFound] = useState(false);

  const { envConfig } = useEditorEnv();
  const { cdnDomain } = envConfig || {};

  // generated image path
  const imagePath = generatedUrl || imageUrl || src;

  const handleFetchImage = async () => {
    if (generatedUrl || !path || notFound) return;

    const url = isPrivate
      ? await getImgixFileURL({
          isPrivate,
          height,
          path,
          rotate,
          width,
          fit,
          quality,
          envConfig,
        })
      : `https://${cdnDomain}-public.imgix.net/${path}?h=${height}&w=${width}&fit=${fit}&q=${quality}`;

    if (url) {
      setImageUrl(url);
    } else {
      setNotFound(true);
    }
  };

  // fetch image
  useEffect(() => {
    handleFetchImage();
  }, []);

  if (imagePath) {
    return (
      <Image
        alt={alt}
        className={className}
        height={height}
        width={width}
        loading="lazy"
        quality={quality}
        placeholder="blur"
        blurDataURL="Loading..."
        src={imagePath}
        onError={() => setNotFound(true)}
        unoptimized
      />
    );
  }

  return (
    <p
      className={`${className} rounded-full bg-blue-light-800 flex items-center justify-center ring-2 ring-border-light ring-offset-1`}
    >
      <span className={`block text-brand font-medium ${textSize}`}>
        {defaultImageName}
      </span>
    </p>
  );
};

export default memo(ImageComponent);
