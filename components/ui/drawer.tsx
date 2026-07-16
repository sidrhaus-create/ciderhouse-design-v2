"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { Button } from "./button";

export function Drawer({
  triggerLabel,
  title,
  children,
}: {
  triggerLabel: string;
  title: string;
  children: ReactNode;
}) {
  const drawerRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const drawer = drawerRef.current;
    return () => {
      if (drawer?.open) drawer.close();
      document.documentElement.classList.remove("is-overlay-open");
    };
  }, []);

  function open() {
    document.documentElement.classList.add("is-overlay-open");
    drawerRef.current?.showModal();
  }

  function close() {
    drawerRef.current?.close();
    document.documentElement.classList.remove("is-overlay-open");
  }

  return (
    <>
      <Button onClick={open} variant="secondary">
        {triggerLabel}
      </Button>
      <dialog
        aria-labelledby={titleId}
        className="drawer"
        onCancel={close}
        onClose={() =>
          document.documentElement.classList.remove("is-overlay-open")
        }
        ref={drawerRef}
      >
        <div className="drawer__inner">
          <div className="overlay-heading">
            <h2 className="type-heading type-heading-2" id={titleId}>
              {title}
            </h2>
            <button
              aria-label="Закрыть панель"
              className="icon-button"
              onClick={close}
              type="button"
            >
              ×
            </button>
          </div>
          <div className="drawer__content">{children}</div>
        </div>
      </dialog>
    </>
  );
}
