"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ageGateCopy } from "@/data/legal.placeholder";

export type AgeGateStatus = "unknown" | "required" | "accepted" | "denied";

const storageKey = "cider-house-age-confirmed";
const previewRoutes = new Set([
  "/design-system",
  "/components-preview",
  "/motion-playground",
]);

export function AgeGate({ enabled }: { enabled: boolean }) {
  const pathname = usePathname();
  const shouldRun = enabled && !previewRoutes.has(pathname);
  const [status, setStatus] = useState<AgeGateStatus>(
    shouldRun ? "unknown" : "accepted",
  );
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!shouldRun) {
        setStatus("accepted");
        return;
      }
      const accepted = window.localStorage.getItem(storageKey) === "accepted";
      setStatus(accepted ? "accepted" : "required");
    }, 0);

    return () => window.clearTimeout(timer);
  }, [shouldRun]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (
      (status === "required" || status === "denied") &&
      dialog &&
      !dialog.open
    ) {
      document.documentElement.classList.add("is-overlay-open");
      dialog.showModal();
    }
    return () => document.documentElement.classList.remove("is-overlay-open");
  }, [status]);

  function accept() {
    window.localStorage.setItem(storageKey, "accepted");
    dialogRef.current?.close();
    document.documentElement.classList.remove("is-overlay-open");
    setStatus("accepted");
  }

  function decline() {
    const destination = process.env.NEXT_PUBLIC_UNDERAGE_DESTINATION;
    if (destination) {
      window.location.assign(destination);
      return;
    }
    setStatus("denied");
  }

  if (!shouldRun || status === "accepted") return null;

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
          {status === "denied" ? ageGateCopy.deniedTitle : ageGateCopy.title}
        </h2>
        <p className="type-text type-body-lg text--muted" id={descriptionId}>
          {status === "denied" ? ageGateCopy.deniedBody : ageGateCopy.body}
        </p>
        <div className="age-gate__actions">
          {status === "denied" ? (
            <Button onClick={() => setStatus("required")}>
              {ageGateCopy.deniedAction}
            </Button>
          ) : (
            <>
              <Button onClick={accept}>{ageGateCopy.accept}</Button>
              <Button onClick={decline} variant="secondary">
                {ageGateCopy.decline}
              </Button>
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}
