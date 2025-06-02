import { useTranslation } from "react-i18next";

export function useLimitItems() {
  const { t } = useTranslation("budgetsForm");

  const limit1 = [
    { value: 8, label: `8 ${t("items")}` },
    { value: 15, label: `15 ${t("items")}` },
    { value: 20, label: `20 ${t("items")}` },
    { value: 30, label: `30 ${t("items")}` },
    { value: 50, label: `50 ${t("items")}` },
    { value: 100, label: `100 ${t("items")}` },
  ];

  const limit2 = [
    { value: 10, label: `10 ${t("items")}` },
    { value: 20, label: `20 ${t("items")}` },
    { value: 25, label: `25 ${t("items")}` },
    { value: 40, label: `40 ${t("items")}` },
    { value: 50, label: `50 ${t("items")}` },
    { value: 100, label: `100 ${t("items")}` },
  ];

  return { limit1, limit2 };
}
