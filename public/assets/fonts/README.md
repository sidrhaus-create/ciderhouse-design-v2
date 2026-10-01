# Brand font status

The supplied brandbook names:

- `Sauna-SmallCaps` for White Phoenix;
- `Cera PRO Medium` for Double Tree.

No licensed `.woff`, `.woff2`, `.ttf`, `.otf`, or `.eot` files were supplied with the original attachment set. The PDF contains outlined text and no embedded font resources, so it cannot provide a complete production font file.

Do not extract or use incomplete PDF subsets. The application keeps a temporary system fallback until complete licensed webfonts and usage rights are available.

## Interim open-licence fonts (added 2026-10-01)

Until the licensed brand fonts are supplied, the site self-hosts two SIL Open Font License families, downloaded unmodified from Google Fonts:

- `unbounded-cyrillic.woff2`, `unbounded-latin.woff2` — Unbounded (variable, 200–900), used for display type. Licence: `OFL-unbounded.txt`.
- `manrope-cyrillic.woff2`, `manrope-latin.woff2` — Manrope (variable, 200–800), used for text. Licence: `OFL-manrope.txt`.

They are declared in `app/globals.css` (`@font-face` + `--font-display` / `--font-sans`). They are a temporary design choice, not official brand typography: replace both tokens when the licensed files arrive.
