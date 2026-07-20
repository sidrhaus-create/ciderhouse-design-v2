export const foundationNavigation = [
  { href: "/design-system", label: "Дизайн-система" },
  { href: "/components-preview", label: "Компоненты" },
  { href: "/motion-playground", label: "Motion" },
] as const;

const previewRoutePrefixes = [
  "/design-system",
  "/components-preview",
  "/motion-playground",
] as const;

export function isPreviewRoute(pathname: string): boolean {
  return previewRoutePrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
