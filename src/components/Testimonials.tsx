export interface Testimonial {
  quote: string;
  name: string;
  role?: string;
}

export interface TestimonialsProps {
  eyebrow?: string;
  heading?: string;
  items: Testimonial[];
}

const QuoteIcon = () => (
  <svg viewBox="0 0 32 24" fill="none" aria-hidden="true">
    <path
      d="M9.5 0C4.5 3 0 8.5 0 14.5 0 19.7 3.6 24 8.7 24c4 0 7-3 7-6.8 0-3.4-2.4-5.9-5.6-5.9-.6 0-1.2.1-1.7.3C9 8.3 11.7 4.3 15.6 1.9L9.5 0Zm17 0c-5 3-9.5 8.5-9.5 14.5 0 5.2 3.6 9.5 8.7 9.5 4 0 7-3 7-6.8 0-3.4-2.4-5.9-5.6-5.9-.6 0-1.2.1-1.7.3C26 8.3 28.7 4.3 32.6 1.9L26.5 0Z"
      fill="currentColor"
    />
  </svg>
);

export default function Testimonials({ eyebrow, heading, items }: TestimonialsProps) {
  return (
    <section className="bl-testimonials">
      {(eyebrow || heading) && (
        <div className="bl-testimonials-head">
          {eyebrow && <span className="bl-testimonials-eyebrow">{eyebrow}</span>}
          {heading && <h2 className="bl-testimonials-heading">{heading}</h2>}
        </div>
      )}
      <div className="bl-testimonials-grid">
        {items.map((item, i) => (
          <figure className="bl-testimonials-card" key={i}>
            <div className="bl-testimonials-icon">
              <QuoteIcon />
            </div>
            <blockquote>{item.quote}</blockquote>
            <figcaption>
              <span className="bl-testimonials-name">{item.name}</span>
              {item.role && <span className="bl-testimonials-role">{item.role}</span>}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
