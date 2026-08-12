'use client';

import { useState } from 'react';

export interface ServiceTabItem {
  title: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export interface ServiceTabsProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
  items: ServiceTabItem[];
}

export default function ServiceTabs({ eyebrow, heading, description, items }: ServiceTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex];

  return (
    <section className="bl-service-tabs">
      {(eyebrow || heading || description) && (
        <div className="bl-service-tabs-head">
          {eyebrow && <span className="bl-service-tabs-eyebrow">{eyebrow}</span>}
          {heading && <h2 className="bl-service-tabs-heading">{heading}</h2>}
          {description && <p className="bl-service-tabs-description">{description}</p>}
        </div>
      )}
      <div className="bl-service-tabs-grid">
        <div className="bl-service-tabs-list" role="tablist">
          {items.map((item, i) => (
            <button
              key={item.title}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              className={`bl-service-tabs-item ${i === activeIndex ? 'is-active' : ''}`}
              onClick={() => setActiveIndex(i)}
            >
              <span className="bl-service-tabs-item-title">{item.title}</span>
              {i === activeIndex && item.description && (
                <span className="bl-service-tabs-item-description">{item.description}</span>
              )}
            </button>
          ))}
        </div>
        {active?.imageSrc && (
          <div className="bl-service-tabs-media">
            <img src={active.imageSrc} alt={active.imageAlt || ''} />
          </div>
        )}
      </div>
    </section>
  );
}
