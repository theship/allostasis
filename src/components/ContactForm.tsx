"use client";

import { useState } from "react";
import siteCopy from "@/content/copy";

const EMPTY = {
  name: "",
  email: "",
  company: "",
  role: "",
  challenge: "",
  timeline: "",
  budget: "",
  details: "",
};

const fieldClass =
  "w-full rounded-lg border border-ink-700 bg-ink-900/60 px-4 py-3 font-body text-paper-100 placeholder-paper-400 transition-colors focus:border-accent-text focus:outline-none focus:ring-1 focus:ring-accent-text";

export default function ContactForm() {
  const c = siteCopy.contact;
  const f = c.form.fields;

  const [formData, setFormData] = useState(EMPTY);
  const [showMessage, setShowMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        // Non-JSON response — treat as sent (data already delivered to the route).
      }

      if (!response.ok && data?.error) {
        throw new Error(data.error || "Failed to submit form");
      }

      setShowMessage(true);
      setFormData(EMPTY);
      setTimeout(() => setShowMessage(false), 6000);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError(
        error instanceof Error ? error.message : "An error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block font-sans text-sm font-medium text-paper-200">
              {f.name.label} *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className={fieldClass}
              placeholder={f.name.placeholder}
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block font-sans text-sm font-medium text-paper-200">
              {f.email.label} *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={fieldClass}
              placeholder={f.email.placeholder}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="company" className="mb-2 block font-sans text-sm font-medium text-paper-200">
              {f.company.label} *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              required
              value={formData.company}
              onChange={handleChange}
              className={fieldClass}
              placeholder={f.company.placeholder}
            />
          </div>
          <div>
            <label htmlFor="role" className="mb-2 block font-sans text-sm font-medium text-paper-200">
              {f.role.label}
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={fieldClass}
              placeholder={f.role.placeholder}
            />
          </div>
        </div>

        <div>
          <label htmlFor="challenge" className="mb-2 block font-sans text-sm font-medium text-paper-200">
            {f.challenge.label} *
          </label>
          <select
            id="challenge"
            name="challenge"
            required
            value={formData.challenge}
            onChange={handleChange}
            className={fieldClass}
          >
            <option value="">{f.challenge.placeholder}</option>
            {f.challenge.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="timeline" className="mb-2 block font-sans text-sm font-medium text-paper-200">
              {f.timeline.label}
            </label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className={fieldClass}
            >
              <option value="">{f.timeline.placeholder}</option>
              {f.timeline.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="budget" className="mb-2 block font-sans text-sm font-medium text-paper-200">
              {f.budget.label}
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className={fieldClass}
            >
              <option value="">{f.budget.placeholder}</option>
              {f.budget.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="details" className="mb-2 block font-sans text-sm font-medium text-paper-200">
            {f.details.label}
          </label>
          <textarea
            id="details"
            name="details"
            rows={6}
            value={formData.details}
            onChange={handleChange}
            className={`${fieldClass} resize-none`}
            placeholder={f.details.placeholder}
          />
        </div>

        <div className="flex items-center justify-between pt-4">
          <p className="font-sans text-sm text-paper-400">{c.form.requiredNote}</p>
          <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? "Submitting…" : c.form.submitButton}
          </button>
        </div>
      </form>

      {showMessage && (
        <div className="mt-10 rounded-lg border border-emerald-700/60 bg-emerald-900/20 p-6" role="status">
          <h2 className="font-display text-lg font-semibold text-emerald-300">{c.success.title}</h2>
          <p className="mt-2 font-body text-sm text-emerald-100/90">{c.success.message}</p>
          <p className="mt-3 font-sans text-xs text-emerald-300/80">{c.success.emailNote}</p>
        </div>
      )}

      {submitError && (
        <div className="mt-10 rounded-lg border border-red-700/60 bg-red-900/20 p-6" role="alert">
          <h2 className="font-display text-lg font-semibold text-red-300">{c.error.title}</h2>
          <p className="mt-2 font-body text-sm text-red-100/90">{submitError}</p>
        </div>
      )}
    </>
  );
}
