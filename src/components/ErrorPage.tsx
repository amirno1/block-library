export interface ErrorPageAction {
  text: string;
  /** A navigational recovery (e.g. "Go to the homepage"). Provide exactly one of `href`/`onClick`. */
  href?: string;
  /** A non-navigational recovery (e.g. a Next.js error boundary's retry function). Provide exactly one of `href`/`onClick`. */
  onClick?: () => void;
}

export interface ErrorPageProps {
  /** e.g. "404" or "500" — shown as a large label above the heading. Omit for an error with no meaningful code. */
  code?: string;
  heading: string;
  message?: string;
  /** Likely causes, rendered as a bullet list under the message — e.g. "The URL was mistyped", "The page has moved". */
  reasons?: string[];
  primaryAction: ErrorPageAction;
  secondaryAction?: ErrorPageAction;
  /** Per-instance overrides — e.g. `{ '--bl-error-code-size': '4rem' }`. See ErrorPage.css for the full list of --bl-error-*-size variables. */
  style?: React.CSSProperties;
}

function ErrorAction({ action, className }: { action: ErrorPageAction; className: string }) {
  if (action.onClick) {
    return (
      <button type="button" className={className} onClick={action.onClick}>
        {action.text}
      </button>
    );
  }
  return (
    <a className={className} href={action.href}>
      {action.text}
    </a>
  );
}

export default function ErrorPage({
  code,
  heading,
  message,
  reasons,
  primaryAction,
  secondaryAction,
  style,
}: ErrorPageProps) {
  return (
    <div className="bl-error" style={style}>
      <div className="bl-error-inner">
        {code && <span className="bl-error-code">{code}</span>}
        <h1 className="bl-error-heading">{heading}</h1>
        {message && <p className="bl-error-message">{message}</p>}
        {reasons && reasons.length > 0 && (
          <ul className="bl-error-reasons">
            {reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        )}
        <div className="bl-error-actions">
          <ErrorAction action={primaryAction} className="bl-error-button bl-error-button--primary" />
          {secondaryAction && (
            <ErrorAction action={secondaryAction} className="bl-error-button bl-error-button--secondary" />
          )}
        </div>
      </div>
    </div>
  );
}
