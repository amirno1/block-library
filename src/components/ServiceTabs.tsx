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
  const hasImages = items.some((item) => item.imageSrc);

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
          {items.map((item, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`bl-service-tabs-item ${isActive ? 'is-active' : ''}`}
                onClick={() => setActiveIndex(i)}
              >
                <span className="bl-service-tabs-item-title">{item.title}</span>
                {item.description && (
                  <span className="bl-service-tabs-item-collapse">
                    <span className="bl-service-tabs-item-collapse-inner">
                      <span className="bl-service-tabs-item-description">{item.description}</span>
                    </span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {hasImages && (
          <div className="bl-service-tabs-media">
            {items.map(
              (item, i) =>
                item.imageSrc && (
                  <img
                    key={item.title}
                    src={item.imageSrc}
                    alt={item.imageAlt || ''}
                    className={i === activeIndex ? 'is-active' : ''}
                    loading="lazy"
                    decoding="async"
                  />
                ),
            )}
          </div>
        )}
      </div>
    </section>
  );
}
