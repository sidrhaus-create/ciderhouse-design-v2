// Flavour accent for a product name: a secondary, product-specific colour (tokens in globals.css), never a page identity.
const MAP: [RegExp, string][] = [
  [/black cherry|dark cherry|wild cherry|cherry|red apple|red orange/i, "var(--fl-cherry)"],
  [/green apple|kiwi|matcha|mint|melon|pear/i, "var(--fl-apple)"],
  [/golden|honey|banana|moscato|secco/i, "var(--fl-honey)"],
  [/pomegranate|raspberry|strawberry/i, "var(--fl-pomegranate)"],
  [/currant|grape|berries/i, "var(--fl-berry)"],
  [/mango|peach|apricot|buckthorn|orange|mandarin|grapefruit|citrus/i, "var(--fl-citrus)"],
  [/lemon|lime/i, "var(--fl-lemon)"],
  [/apple/i, "var(--fl-apple)"],
];
export function flavourAccent(name: string): string {
  for (const [re, c] of MAP) if (re.test(name)) return c;
  return "var(--fl-neutral)";
}
