"use client";

import {
  type FormEvent,
  type FormHTMLAttributes,
  type ReactNode,
} from "react";
import toast from "react-hot-toast";
import {
  collectMissingFields,
  passwordsMatch,
  refreshNiceSelect,
} from "@/lib/form/toastForm";

type ToastFormProps = Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> & {
  children: ReactNode;
  successMessage: string;
  fieldLabels?: Record<string, string>;
};

const ToastForm = ({
  children,
  successMessage,
  fieldLabels,
  noValidate = true,
  ...props
}: ToastFormProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!passwordsMatch(form)) {
      toast.error("Passwords do not match.");
      return;
    }

    const missing = collectMissingFields(form, fieldLabels);
    if (missing.length) {
      toast.error(`Please fill in: ${missing.join(", ")}`);
      return;
    }

    toast.success(successMessage);
    form.reset();
    refreshNiceSelect(form);
  };

  return (
    <form {...props} noValidate={noValidate} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default ToastForm;
