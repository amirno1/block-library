import type { ReactNode } from 'react';

/**
 * Body copy for a block. Either a plain string — paragraphs separated by a
 * blank line, which is how every block took copy originally — or already
 * rendered rich text from a CMS, e.g. a `<PortableText />` element.
 *
 * A string is itself a valid ReactNode, so this widening is backwards
 * compatible: existing callers keep the paragraph-splitting behaviour.
 */
export type BodyCopy = ReactNode;

/**
 * Renders either shape. Strings are split into `<p>` elements carrying
 * `paragraphClassName`; anything else is passed through inside a wrapper
 * carrying `richClassName`, which each block's stylesheet targets so
 * CMS-authored paragraphs, lists and links inherit the block's typography.
 */
export function RichBody({
  body,
  paragraphClassName,
  richClassName,
}: {
  body: BodyCopy;
  paragraphClassName: string;
  richClassName: string;
}) {
  if (body === null || body === undefined || body === false) return null;

  if (typeof body === 'string') {
    return (
      <>
        {body.split('\n\n').map((paragraph, i) => (
          <p key={i} className={paragraphClassName}>
            {paragraph}
          </p>
        ))}
      </>
    );
  }

  return <div className={richClassName}>{body}</div>;
}
