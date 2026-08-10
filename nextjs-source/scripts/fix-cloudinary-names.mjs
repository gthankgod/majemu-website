/**
 * Fixes the public IDs of Majemu's photos on Cloudinary automatically.
 *
 * It recognizes each uploaded photo by its exact dimensions (and file size as
 * a tiebreaker), then renames its public ID to the canonical name the website
 * expects (e.g. "event-cod-hosting"). Safe to run repeatedly — already-correct
 * photos are skipped.
 *
 * Setup (Teegee):
 *   npm i -D cloudinary
 *   export CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@dti84lbnc
 *     (copy the real value from the Cloudinary dashboard — "API Keys" section)
 *
 * Run:
 *   node scripts/fix-cloudinary-names.mjs         # dry run — shows the plan
 *   node scripts/fix-cloudinary-names.mjs --apply # actually renames
 */
import { v2 as cloudinary } from "cloudinary";

if (!process.env.CLOUDINARY_URL) {
  console.error("Set CLOUDINARY_URL first (see comment at top of this file).");
  process.exit(1);
}

const APPLY = process.argv.includes("--apply");

// Fingerprints of the 14 site images: name -> [width, height, bytes]
const EXPECTED = {
  "bts-selfie": [1800, 1350, 263161],
  "event-1pct-edge": [800, 1000, 111097],
  "event-becoming-mom-panel": [1000, 800, 122913],
  "event-becoming-mom": [800, 1000, 100766],
  "event-cod-hosting": [1800, 1440, 234420],
  "event-fireside-lbs": [1000, 800, 133824],
  "event-fireside-orange": [1206, 694, 102168],
  "event-harde": [1206, 1568, 146490],
  "event-moderating": [1000, 800, 105574],
  "event-unilag": [1206, 2048, 196966],
  "portrait-brown": [1024, 1280, 70026],
  "portrait-cod-peace": [1600, 1999, 441939],
  "portrait-red": [1122, 1402, 173068],
  "stage-green-dress": [1170, 1023, 112275],
};

// List every image in the account (well under the 500 cap)
const { resources } = await cloudinary.api.resources({
  resource_type: "image",
  type: "upload",
  max_results: 500,
});

console.log(`Found ${resources.length} images in the account.\n`);

const matchFor = (r) => {
  // exact dimensions first; bytes as tiebreaker when two names share WxH
  const candidates = Object.entries(EXPECTED).filter(
    ([, [w, h]]) => r.width === w && r.height === h
  );
  if (candidates.length === 1) return candidates[0][0];
  const exact = candidates.find(([, [, , b]]) => r.bytes === b);
  return exact ? exact[0] : null;
};

let renamed = 0, ok = 0, skipped = 0;
for (const r of resources) {
  const target = matchFor(r);
  if (!target) { skipped++; continue; } // not one of the site photos (e.g. Cloudinary samples)
  if (r.public_id === target) {
    console.log(`  ✓ already correct: ${target}`);
    ok++;
    continue;
  }
  if (APPLY) {
    await cloudinary.uploader.rename(r.public_id, target, { overwrite: false });
    console.log(`  ✏ renamed: ${r.public_id}  ->  ${target}`);
  } else {
    console.log(`  would rename: ${r.public_id}  ->  ${target}`);
  }
  renamed++;
}

console.log(
  `\n${ok} already correct, ${renamed} ${APPLY ? "renamed" : "to rename"}, ${skipped} unrelated images ignored.`
);
if (!APPLY && renamed > 0) console.log("Run again with --apply to make the changes.");
