"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ageGateCopy } from "@/data/legal.placeholder";

export type AgeGateStatus = "unknown" | "required" | "accepted";

const storageKey = "cider-house-age-gate-session";

export function AgeGate({ enabled }: { enabled: boolean }) {
  const [status, setStatus] = useState<AgeGateStatus>(
    enabled ? "unknown" : "accepted",
  );
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!enabled) return;

    const timer = window.setTimeout(() => {
      const accepted = window.sessionStorage.getItem(storageKey) === "accepted";
      setStatus(accepted ? "accepted" : "required");
    }, 0);

    return () => window.clearTimeout(timer);
  }, [enabled]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (status === "required" && dialog && !dialog.open) {
      document.documentElement.classList.add("is-overlay-open");
      dialog.showModal();
    }
    return () => document.documentElement.classList.remove("is-overlay-open");
  }, [status]);

  function accept() {
    window.sessionStorage.setItem(storageKey, "accepted");
    dialogRef.current?.close();
    document.documentElement.classList.remove("is-overlay-open");
    setStatus("accepted");
  }

  if (!enabled || status === "accepted") return null;

  return (
    <dialog
      aria-describedby={descriptionId}
      aria-labelledby={titleId}
      className="age-gate"
      onCancel={(event) => event.preventDefault()}
      ref={dialogRef}
    >
      <div className="age-gate__inner">
        <p className="age-gate__eyebrow">{ageGateCopy.eyebrow}</p>
        <h2 className="type-heading type-heading-1" id={titleId}>
          {ageGateCopy.title}
        </h2>
        <p className="type-text type-body-lg text--muted" id={descriptionId}>
          {ageGateCopy.body}
        </p>
        <div className="age-gate__actions">
          <Button onClick={accept}>{ageGateCopy.accept}</Button>
          <a
            className="button button--secondary button--default"
            href={ageGateCopy.exitHref}
          >
            {ageGateCopy.exit}
          </a>
        </div>
      </div>
    </dialog>
  );
}
