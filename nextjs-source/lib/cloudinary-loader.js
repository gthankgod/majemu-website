/**
 * Custom next/image loader for Cloudinary.
 *
 * When NEXT_PUBLIC_CLOUDINARY_CLOUD is set, every <Image src="/images/x.jpg">
 * resolves to a Cloudinary URL with automatic format (AVIF/WebP), automatic
 * quality, and the exact width next/image requests for the viewport.
 *
 * When it is NOT set (local dev before you create the account), images are
 * served as-is from /public/images — no code changes needed anywhere.
 */
const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD;
// Newer Cloudinary accounts use "dynamic folders": the folder is a display
// label only and is NOT part of the image URL. Leave this empty for those
// accounts (public ID = plain name, e.g. "portrait-brown"). If your account
// includes the folder in public IDs, set NEXT_PUBLIC_CLOUDINARY_FOLDER=majemu.
const FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || "";

export default function cloudinaryLoader({ src, width, quality }) {
  if (!CLOUD) return src;
  // "/images/portrait-brown.jpg" -> "portrait-brown"
  const name = src.replace(/^\/images\//, "").replace(/\.[a-z]+$/i, "");
  const q = quality ? `q_${quality}` : "q_auto";
  const prefix = FOLDER ? `${FOLDER}/` : "";
  return `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,${q},w_${width},c_limit/${prefix}${name}`;
}
