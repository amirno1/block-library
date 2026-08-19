'use client';

import { useState, type CSSProperties, type FormEvent } from 'react';

export interface FormField {
  name: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  label: string;
  required?: boolean;
  /** Regex string. Only meaningful for text-like inputs (mainly "tel", where formats vary a lot by client/country) — falls back to a loose international pattern for "tel" if unset, and to no extra constraint for other types. */
  pattern?: string;
  placeholder?: string;
  /** type="select" only. */
  options?: string[];
  /** Standard HTML autocomplete token, e.g. "name", "email", "tel". */
  autoComplete?: string;
  /** Span both grid columns instead of sharing a row. "textarea" always does this regardless of this flag. */
  fullWidth?: boolean;
}

export interface FormProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
  fields: FormField[];
  submitText?: string;
  successMessage?: string;
  genericErrorMessage?: string;
  /** Called with { [field.name]: value } once native validation passes. Throw (or reject) to show genericErrorMessage — throw an Error with a custom message to show that instead. */
  onSubmit: (data: Record<string, string>) => Promise<void> | void;
  /** Per-instance overrides for any text size in this component — e.g. `{ '--bl-form-heading-size': '3rem' }`. See Form.css for the full list of --bl-form-*-size variables. */
  style?: CSSProperties;
}

const DEFAULT_TEL_PATTERN = '^[+]?[0-9 ()-]{6,20}$';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function Form({
  eyebrow,
  heading,
  description,
  fields,
  submitText = 'Send',
  successMessage = 'Thanks — your message has been sent.',
  genericErrorMessage = 'Something went wrong. Please try again.',
  onSubmit,
  style,
}: FormProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formEl = event.currentTarget;
    if (!formEl.checkValidity()) {
      formEl.reportValidity();
      return;
    }

    const formData = new FormData(formEl);
    const data: Record<string, string> = {};
    fields.forEach((field) => {
      data[field.name] = String(formData.get(field.name) || '');
    });

    setStatus('submitting');
    setErrorMessage(null);
    try {
      await onSubmit(data);
      setStatus('success');
      formEl.reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error && err.message ? err.message : null);
    }
  };

  if (status === 'success') {
    return (
      <div className="bl-form-success" style={style} role="status">
        <p>{successMessage}</p>
      </div>
    );
  }

  return (
    <section className="bl-form" style={style}>
      {(eyebrow || heading || description) && (
        <div className="bl-form-head">
          {eyebrow && <span className="bl-form-eyebrow">{eyebrow}</span>}
          {heading && <h2 className="bl-form-heading">{heading}</h2>}
          {description && <p className="bl-form-description">{description}</p>}
        </div>
      )}
      <form className="bl-form-fields" onSubmit={handleSubmit}>
        {fields.map((field) => {
          const isFull = field.type === 'textarea' || field.fullWidth;
          return (
            <div className={`bl-form-field${isFull ? ' bl-form-field--full' : ''}`} key={field.name}>
              <label className="bl-form-label" htmlFor={field.name}>
                {field.label}
                {field.required && (
                  <span className="bl-form-required" aria-hidden="true">
                    {' '}
                    *
                  </span>
                )}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  rows={5}
                />
              ) : field.type === 'select' ? (
                <select id={field.name} name={field.name} required={field.required} defaultValue="" autoComplete={field.autoComplete}>
                  <option value="" disabled>
                    {field.placeholder || 'Choose an option'}
                  </option>
                  {field.options?.map((opt) => (
                    <option value={opt} key={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  pattern={field.type === 'tel' ? field.pattern || DEFAULT_TEL_PATTERN : field.pattern}
                />
              )}
            </div>
          );
        })}
        <button type="submit" className="bl-form-submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? '…' : submitText}
        </button>
        {status === 'error' && (
          <p className="bl-form-error" role="alert">
            {errorMessage || genericErrorMessage}
          </p>
        )}
      </form>
    </section>
  );
}
