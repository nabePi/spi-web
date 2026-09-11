import type { StaticImageData } from "next/image";

export type { StaticImageData };

export type ImageAsset = {
  src: StaticImageData;
  alt: string;
};
