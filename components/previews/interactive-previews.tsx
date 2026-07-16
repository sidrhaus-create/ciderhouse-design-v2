"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { FormField, SelectFilter } from "@/components/ui/form-controls";
import { StatusMessage } from "@/components/ui/status";

type FormStatus = "idle" | "loading" | "success" | "error";

export function FormPreview() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Введите корректный email для проверки error-state.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 550);
  }

  return (
    <form className="preview-form" noValidate onSubmit={handleSubmit}>
      <FormField
        autoComplete="email"
        error={error}
        hint="Демонстрационные данные никуда не отправляются."
        id="preview-email"
        label="Рабочий email"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="name@example.com"
        required
        type="email"
        value={email}
      />
      <SelectFilter defaultValue="all" id="preview-filter" label="Линейка">
        <option value="all">Все линейки</option>
        <option value="double-tree">Double Tree</option>
        <option value="white-phoenix">White Phoenix</option>
        <option value="mister-bee">Mister Bee</option>
        <option value="zero">0% collection</option>
      </SelectFilter>
      <Button disabled={status === "loading"} type="submit">
        {status === "loading" ? "Проверяем…" : "Проверить форму"}
      </Button>
      {status === "loading" ? (
        <StatusMessage tone="loading">
          Выполняется локальная проверка.
        </StatusMessage>
      ) : null}
      {status === "success" ? (
        <StatusMessage tone="success">
          Success-state: форма прошла проверку.
        </StatusMessage>
      ) : null}
      {status === "error" ? (
        <StatusMessage tone="error">
          Error-state: исправьте отмеченное поле.
        </StatusMessage>
      ) : null}
    </form>
  );
}
