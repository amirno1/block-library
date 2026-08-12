export interface PricingRow {
  label: string;
  duration?: string;
  price: string;
  note?: string;
}

export interface PricingTableProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
  /** Column headers, in order — length should match the row shape (label, duration, price, note). */
  columns: string[];
  rows: PricingRow[];
}

export default function PricingTable({ eyebrow, heading, description, columns, rows }: PricingTableProps) {
  return (
    <section className="bl-pricing">
      {(eyebrow || heading || description) && (
        <div className="bl-pricing-head">
          {eyebrow && <span className="bl-pricing-eyebrow">{eyebrow}</span>}
          {heading && <h2 className="bl-pricing-heading">{heading}</h2>}
          {description && <p className="bl-pricing-description">{description}</p>}
        </div>
      )}
      <div className="bl-pricing-table-wrap">
        <table className="bl-pricing-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td data-label={columns[0]}>{row.label}</td>
                {row.duration !== undefined && <td data-label={columns[1]}>{row.duration}</td>}
                <td data-label={columns[row.duration !== undefined ? 2 : 1]}>
                  <span className="bl-pricing-price">{row.price}</span>
                  {row.note && <span className="bl-pricing-note">{row.note}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
