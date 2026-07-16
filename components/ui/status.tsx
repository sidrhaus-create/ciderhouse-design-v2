"use client";

import { useState } from "react";
import { Button } from "./button";

export function StatusMessage({
  tone = "info",
  children,
}: {
  tone?: "info" | "success" | "error" | "loading";
  children: React.ReactNode;
}) {
  return (
    <div
      aria-live={tone === "error" ? "assertive" : "polite"}
      className={`status-message status-message--${tone}`}
      role={tone === "error" ? "alert" : "status"}
    >
      {tone === "loading" ? (
        <span aria-hidden="true" className="status-spinner" />
      ) : null}
      {children}
    </div>
  );
}

export function ToastPreview() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="toast-preview">
      <Button onClick={() => setVisible(true)} variant="secondary">
        Показать toast
      </Button>
      {visible ? (
        <div aria-live="polite" className="toast" role="status">
          <span>Настройки предпросмотра сохранены.</span>
          <button
            aria-label="Закрыть уведомление"
            onClick={() => setVisible(false)}
            type="button"
          >
            ×
          </button>
        </div>
      ) : null}
    </div>
  );
}
