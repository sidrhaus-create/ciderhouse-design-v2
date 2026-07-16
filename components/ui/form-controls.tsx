import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from "react";

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
};

export function FormField({
  id,
  label,
  hint,
  error,
  required,
  className = "",
  ...props
}: FormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={`form-field ${className}`.trim()}>
      <label className="form-field__label" htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <input
        aria-describedby={describedBy}
        aria-invalid={Boolean(error)}
        className="form-field__input"
        id={id}
        required={required}
        {...props}
      />
      {hint ? (
        <span className="form-field__hint" id={hintId}>
          {hint}
        </span>
      ) : null}
      {error ? (
        <span className="form-field__error" id={errorId} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}

type SelectFilterProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  children: ReactNode;
};

export function SelectFilter({
  id,
  label,
  children,
  className = "",
  ...props
}: SelectFilterProps) {
  return (
    <div className={`form-field ${className}`.trim()}>
      <label className="form-field__label" htmlFor={id}>
        {label}
      </label>
      <div className="select-shell">
        <select className="form-field__select" id={id} {...props}>
          {children}
        </select>
      </div>
    </div>
  );
}
