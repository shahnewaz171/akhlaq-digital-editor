/* eslint-disable @typescript-eslint/no-unused-vars */

"use server";

import ImgixClient from "@imgix/js-core";
import type { ImgixFileURLWIthEnvParams } from "@/components/tiptap-node/types";

export const getImgixFileURL = async ({
  isPrivate = true,
  height: h,
  path = "",
  rotate: r,
  width: w,
  fit = "scale",
  quality = 100,
  envConfig,
}: ImgixFileURLWIthEnvParams): Promise<string | null> => {
  const { cdnDomain, cdnSecret } = envConfig || {};

  // updated domain
  const updatedDomain = `${cdnDomain}-${
    isPrivate ? "private" : "public"
  }.imgix.net`;

  try {
    const client = new ImgixClient({
      domain: updatedDomain,
      secureURLToken: isPrivate ? cdnSecret : "",
    });

    return client.buildURL(path, { h, r, w, fit, q: quality });
  } catch (err) {
    return null;
  }
};
