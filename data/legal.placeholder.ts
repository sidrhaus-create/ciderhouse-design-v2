/**
 * Editable production candidate. Final legal review is still required.
 * NEXT_PUBLIC_UNDERAGE_DESTINATION may provide an approved destination.
 */
export const ageGateCopy = {
  eyebrow: "18+",
  title: "Вам уже исполнилось 18 лет?",
  body: "На сайте представлена информация об алкогольной продукции. Подтвердите, что вам уже исполнилось 18 лет.",
  accept: "Да, мне есть 18",
  decline: "Нет, мне нет 18",
  deniedTitle: "Доступ ограничен",
  deniedBody:
    "Материалы об алкогольной продукции доступны только совершеннолетним посетителям.",
  deniedAction: "Вернуться к вопросу",
  reviewStatus: "requires-approval",
} as const;
