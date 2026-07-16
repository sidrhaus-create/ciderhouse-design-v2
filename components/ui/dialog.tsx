"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { Button } from "./button";

export function Dialog({
  triggerLabel,
  title,
  children,
}: {
  triggerLabel: string;
  title: string;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      if (dialog?.open) dialog.close();
      document.documentElement.classList.remove("is-overlay-open");
    };
  }, []);

  function open() {
    document.documentElement.classList.add("is-overlay-open");
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
    document.documentElement.classList.remove("is-overlay-open");
  }

  return (
    <>
      <Button onClick={open} variant="secondary">
        {triggerLabel}
      </Button>
      <dialog
        aria-labelledby={titleId}
        className="dialog"
        onCancel={close}
        onClose={() =>
          document.documentElement.classList.remove("is-overlay-open")
        }
        ref={dialogRef}
      >
        <div className="dialog__inner">
          <div className="overlay-heading">
            <h2 className="type-heading type-heading-2" id={titleId}>
              {title}
            </h2>
            <button
              aria-label="Закрыть диалог"
              className="icon-button"
              onClick={close}
              type="button"
            >
              ×
            </button>
          </div>
          <div className="dialog__content">{children}</div>
          <Button onClick={close}>Готово</Button>
        </div>
      </dialog>
    </>
  );
}
