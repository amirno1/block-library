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
}

export default function FeatureGrid({ variant = 'cards', eyebrow, heading, description, items }: FeatureGridProps) {
  return (
    <section className={`bl-features bl-features--${variant}`}>
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
