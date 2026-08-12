# block-library

Shared, versioned library of React block components (Hero, Carousel, etc.),
each with multiple variants. Used across every client site built from
`client-site-template`.

**Layout lives in code, not in Sanity.** A client's page is composed by
writing React — `<Hero variant="split" heading={...} />` — directly in that
client's `site/` project. This library only supplies the components; it
does not touch Sanity at all. Clients get Editor access to Sanity for
content (text/images/video) and never see or touch layout, because layout
isn't a Sanity-editable thing in the first place.

Browse everything visually with Storybook:
```
npm install
npm run storybook
```
Opens `http://localhost:6006` — every block and every variant, rendered.

## The convention

One component per block family, one `variant` prop for its different looks
— not a separate component per variant. See `src/components/Hero.tsx` /
`Hero.stories.tsx` for the reference example.

- Component + its CSS live together: `Block.tsx`, `Block.css`
- CSS is scoped with a `bl-` prefix (`.bl-hero`, `.bl-hero-media`, ...) to
  avoid colliding with a client site's own classes
- Styling reads from **design tokens** (CSS custom properties) that every
  client site's `globals.css` defines — `--color-primary`, `--font-heading`,
  `--space-4`, etc. Don't hardcode colors/fonts/spacing; read the token.
  This is the contract that makes one component look right across every
  client's different theme.
- One `.stories.tsx` file per block, one story per variant, using
  realistic placeholder content (not "Lorem ipsum" — real-looking headline
  length, etc.) so it's actually useful to browse.

## Adding a block

1. `src/components/YourBlock.tsx` + `YourBlock.css`
2. `src/components/YourBlock.stories.tsx` — a story per variant
3. Export it from `src/components/index.ts`
4. `npm run storybook` and check it renders correctly

## Publishing an update

```
npm run build
git add -A && git commit -m "Add YourBlock"
git push
```
No registry, no version pinning required by default — client projects
depend on `github:<you>/block-library` and get the latest on `npm install`.
Tag a release (`git tag vX.Y.Z && git push --tags`) if you want a specific
client pinned to a specific version instead.

## Using a block in a client project

In the client's `site/` project:
```tsx
import { Hero } from 'block-library/components';

<Hero
  variant="split"
  heading="..."
  subheading="..."
  imageSrc={urlFor(content.heroImage).width(640).height(800).url()}
/>
```
Content (`heading`, `imageSrc`, etc.) comes from that client's Sanity
document fields — plain fields, not a blocks array. See
`client-site-template`'s README for the full page-composition pattern.
