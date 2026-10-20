"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { FiSend } from "react-icons/fi";
import { display } from "./Section";

// Where messages go. Keep in sync with the email in the legal pages.
export const SUPPORT_EMAIL = "support@securevests.com";

const topics = [
  "Account or sign-in",
  "Savings plans",
  "Wallet, transfers or payments",
  "Complaint",
  "Privacy or my data",
  "Something else",
];

const field =
  "mt-2 w-full rounded-xl border border-[#0F2B22]/15 bg-white px-4 py-3 text-[15px] text-[#0F2B22] placeholder:text-[#0F2B22]/40 transition-colors focus-visible:border-[#1B6B47] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B6B47]";

type Values = { name: string; email: string; topic: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

const validate = (v: Values): Errors => {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Enter your name.";
  if (!/^\S+@\S+\.\S+$/.test(v.email.trim()))
    e.email = "Enter a valid email address, like name@example.com.";
  if (v.message.trim().length < 10)
    e.message = "Tell us a little more, at least 10 characters.";
  return e;
};

export const ContactForm = () => {
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    topic: topics[0],
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [opened, setOpened] = useState(false);

  const onChange =
    (key: keyof Values) =>
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  // No backend yet: this opens the visitor's email app with the message filled in.
  // To send from the site instead, replace the mailto line with a fetch() to an API route.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    const subject = encodeURIComponent(
      `${values.topic} - ${values.name.trim()}`,
    );
    const body = encodeURIComponent(
      `${values.message.trim()}\n\nFrom: ${values.name.trim()}\nReply to: ${values.email.trim()}`,
    );
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
    setOpened(true);
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-[#0F2B22]/10 bg-white/80 p-6 backdrop-blur-sm sm:p-8"
    >
      <h2 className={`${display} text-xl font-semibold tracking-tight`}>
        Send us a message
      </h2>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            Your name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={onChange("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={field}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-sm text-[#B42318]">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={onChange("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={field}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-sm text-[#B42318]">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="topic" className="text-sm font-medium">
          What is this about?
        </label>
        <select
          id="topic"
          name="topic"
          value={values.topic}
          onChange={onChange("topic")}
          className={field}
        >
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="text-sm font-medium">
          Your message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={values.message}
          onChange={onChange("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : "message-hint"}
          className={`${field} resize-y`}
        />
        {errors.message ? (
          <p id="message-error" className="mt-1.5 text-sm text-[#B42318]">
            {errors.message}
          </p>
        ) : (
          <p id="message-hint" className="mt-1.5 text-sm text-[#0F2B22]/60">
            Never share your password, OTP or full card details here.
          </p>
        )}
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0F2B22] px-6 py-3 text-[15px] font-medium text-[#F7F3E8] transition-colors hover:bg-[#1B6B47] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F2B22]"
      >
        Send message
        <FiSend size={16} aria-hidden="true" />
      </button>

      <p role="status" className="mt-4 text-sm text-[#0F2B22]/70">
        {opened &&
          `Your email app should have opened with the message ready. If it didn't, write to ${SUPPORT_EMAIL}.`}
      </p>
    </form>
  );
};
