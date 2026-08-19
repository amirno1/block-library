export interface FeatureItem {
  icon?: React.ReactNode;
  title: string;
  description?: string;
}

export interface FeatureGridProps {
  variant?: 'cards' | 'minimal';
  eyebrow?: string;
  heading?: string;
  description?: string;
  items: FeatureItem[];
  /** Per-instance overrides for any text size in this component — e.g. `{ '--bl-features-heading-size': '3rem' }`. See FeatureGrid.css for the full list of --bl-features-*-size variables. Falls back to the shared --fs-* scale when unset. */
  style?: React.CSSProperties;
}

export default function FeatureGrid({ variant = 'cards', eyebrow, heading, description, items, style }: FeatureGridProps) {
  return (
    <section className={`bl-features bl-features--${variant}`} style={style}>
      {(eyebrow || heading || description) && (
        <div className="bl-features-head">
          {eyebrow && <span className="bl-features-eyebrow">{eyebrow}</span>}
          {heading && <h2 className="bl-features-heading">{heading}</h2>}
          {description && <p className="bl-features-description">{description}</p>}
        </div>
      )}
      <div className="bl-features-grid">
        {items.map((item, i) => (
          <article className="bl-features-item" key={i}>
            {item.icon && <div className="bl-features-icon">{item.icon}</div>}
            <h3 className="bl-features-item-title">{item.title}</h3>
            {item.description && <p className="bl-features-item-description">{item.description}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}
