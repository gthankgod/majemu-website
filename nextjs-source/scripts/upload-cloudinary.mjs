/**
 * One-shot upload of every file in public/images to Cloudinary,
 * into the "majemu" folder, keeping filenames as public IDs
 * (portrait-brown.jpg -> majemu/portrait-brown).
 *
 * Setup:
 *   npm i -D cloudinary
 *   export CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
 *     (copy this whole URL from your Cloudinary dashboard home page)
 *
 * Run:
 *   node scripts/upload-cloudinary.mjs
 */
import { v2 as cloudinary } from "cloudinary";
import { readdirSync } from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "public", "images");
const FOLDER = "majemu";

if (!process.env.CLOUDINARY_URL) {
  console.error("Set CLOUDINARY_URL first (see comment at top of this file).");
  process.exit(1);
}

const files = readdirSync(DIR).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
console.log(`Uploading ${files.length} images to "${FOLDER}/"...`);

for (const file of files) {
  const publicId = path.parse(file).name;
  const res = await cloudinary.uploader.upload(path.join(DIR, file), {
    folder: FOLDER,
    public_id: publicId,
    overwrite: true,
    resource_type: "image",
  });
  console.log(`  ✓ ${FOLDER}/${publicId}  (${Math.round(res.bytes / 1024)} KB uploaded)`);
}

console.log("\nDone. Now set NEXT_PUBLIC_CLOUDINARY_CLOUD=<your cloud name> in .env.local");
