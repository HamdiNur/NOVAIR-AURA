/** TODO: replace every value in this file before launch. */
export const SITE = {
  brand: "NOVAIR",
  // Digits only, with country code, no + or spaces. Example: 254700000000
  whatsappNumber: "000000000000", // TODO
  instagram: "https://instagram.com/novair", // TODO
  tiktok: "https://tiktok.com/@novair",      // TODO
  email: "hello@novair.com",                 // TODO
  deliveryAreas: "We deliver locally and ship internationally. Ask us on WhatsApp for your area.", // TODO
  about: {
    title: "Air, made visible.",
    body: [
      "NOVAIR began with a simple idea: a fragrance should feel like atmosphere, not like a statement. Light, weightless, and unmistakably yours.",
      "Each scent is composed around a single mood, from the sunlit freshness of Aura to the deep warmth of Oud, and finished in a bottle made to be kept.",
    ], // TODO: rewrite in your own words
  },
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}