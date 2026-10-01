/** Russian plural form: plural(3, ["позиция", "позиции", "позиций"]) → "позиции". */
export function plural(
  count: number,
  forms: readonly [one: string, few: string, many: string],
) {
  const mod100 = Math.abs(count) % 100;
  const mod10 = mod100 % 10;
  if (mod100 > 10 && mod100 < 20) return forms[2];
  if (mod10 === 1) return forms[0];
  if (mod10 >= 2 && mod10 <= 4) return forms[1];
  return forms[2];
}

export const POSITIONS = ["позиция", "позиции", "позиций"] as const;
export const FLAVORS = ["вкус", "вкуса", "вкусов"] as const;
