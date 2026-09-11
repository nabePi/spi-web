const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type FormFieldElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

export function isFormField(el: Element): el is FormFieldElement {
  return (
    el instanceof HTMLInputElement ||
    el instanceof HTMLTextAreaElement ||
    el instanceof HTMLSelectElement
  );
}

function isSkippableInput(el: FormFieldElement): boolean {
  return (
    el instanceof HTMLInputElement &&
    (el.type === "button" ||
      el.type === "submit" ||
      el.type === "reset" ||
      el.type === "hidden" ||
      el.disabled)
  );
}

export function fieldLabel(
  el: FormFieldElement,
  labels?: Record<string, string>,
): string {
  if (el.name && labels?.[el.name]) return labels[el.name];
  const labelled = el.labels?.[0]?.textContent?.replace(/\*/g, "").trim();
  if (labelled) return labelled;
  if ("placeholder" in el && el.placeholder) return el.placeholder;
  return el.name || "this field";
}

export function fieldValue(el: FormFieldElement): string {
  if (el instanceof HTMLInputElement) {
    if (el.type === "checkbox") return el.checked ? "on" : "";
    if (el.type === "radio") return el.checked ? el.value : "";
  }
  return el.value.trim();
}

export function collectMissingFields(
  form: HTMLFormElement,
  labels?: Record<string, string>,
): string[] {
  const missing: string[] = [];
  const fields = Array.from(form.elements).filter(isFormField);

  for (const el of fields) {
    if (!el.name || isSkippableInput(el)) continue;
    if (el instanceof HTMLInputElement && el.type === "radio") {
      if (!el.required) continue;
      const group = fields.filter(
        (field): field is HTMLInputElement =>
          field instanceof HTMLInputElement &&
          field.type === "radio" &&
          field.name === el.name,
      );
      if (group[0] !== el) continue;
      if (!group.some((radio) => radio.checked)) {
        missing.push(fieldLabel(el, labels));
      }
      continue;
    }

    const value = fieldValue(el);
    if (el.required && !value) {
      missing.push(fieldLabel(el, labels));
      continue;
    }
    if (
      el instanceof HTMLInputElement &&
      el.type === "email" &&
      value &&
      !EMAIL_PATTERN.test(value)
    ) {
      missing.push(fieldLabel(el, labels));
    }
  }

  return [...new Set(missing)];
}

export function passwordsMatch(form: HTMLFormElement): boolean {
  const password = form.elements.namedItem("password");
  const confirm =
    form.elements.namedItem("confirmPassword") ??
    form.elements.namedItem("confirm-password");
  if (!(password instanceof HTMLInputElement)) return true;
  if (!(confirm instanceof HTMLInputElement)) return true;
  if (!password.value || !confirm.value) return true;
  return password.value === confirm.value;
}

export function refreshNiceSelect(form: HTMLFormElement): void {
  const $ = (window as Window & { jQuery?: JQueryStatic }).jQuery;
  if (!$ || typeof $.fn.niceSelect !== "function") return;
  $(form).find("select").niceSelect("update");
}
