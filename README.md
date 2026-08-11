# block-library

Shared, versioned library of page-builder blocks — Sanity schema +
matching React component, bundled together per block. Every client site
(built from `client-site-template`) depends on this as a real package, so
improving a block once makes it available everywhere.

This is **not** tied to any client. Nothing client-specific belongs here —
if it's specific to one site's copy or branding, it belongs in that site's
own project, not here.

## The convention: one block, one `variant` field

Don't create a separate schema type per visual variation (`heroCentered`,
`heroSplit`, ...). Create **one** type per block family, with a `variant`
field selecting the look. This keeps Studio's "add block" list short and
keeps all a block's variations discoverable in one place.

Worked example — adding a `carousel` block with two variants:

**`src/schema/carousel.ts`**
```ts
import { defineField, defineType } from 'sanity';

export const carousel = defineType({
  name: 'carousel',
  title: 'Carousel',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Style',
      type: 'string',
      options: { list: ['quotes', 'images'] },
      initialValue: 'quotes',
    }),
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'text', type: 'text' }),
        defineField({ name: 'attribution', type: 'string' }),
      ] }],
    }),
  ],
});
```

**`src/components/Carousel.tsx`**
```tsx
export default function Carousel({ block }: { block: any }) {
  switch (block.variant) {
    case 'images':
      return <ImageCarousel slides={block.slides} />;
    default:
      return <QuoteCarousel slides={block.slides} />;
  }
}
```

Then register both in `src/schema/index.ts` and `src/components/index.ts`.

## Publishing an update

```
npm run build
git add -A && git commit -m "Add carousel block"
git tag v0.2.0
git push && git push --tags
```

## Consuming this from a client project

Install it (no npm registry needed — installs straight from GitHub):
```
npm install github:<you>/block-library#v0.2.0
```

In `studio/schemaTypes/index.ts`:
```ts
import { blocks } from 'block-library/schema';
export const schemaTypes = [page, post, ...blocks];
```

In `site/components/PageBuilder.tsx`, import the components you want from
`block-library/components` and add a `case` for each `_type`.

To pick up a newer version later: bump the version in `package.json`
(`npm install github:<you>/block-library#v0.3.0`) — deliberate, not automatic.

## Moving a block from a client project into this library

Happens when something built for one client turns out to be worth reusing.
The usual flow: point out the component in the client project and which
block family/variant it should become, and it gets adapted here (parameterized,
client-specific copy/styling stripped out, given a `variant` name) and
published as a new version.
