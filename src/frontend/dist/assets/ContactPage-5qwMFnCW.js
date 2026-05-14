import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-BC8DNmFm.js";
import { B as Badge, a as Button } from "./button-DRTZ0JvA.js";
import { I as Input } from "./input-C7KJYqwe.js";
import { L as Label } from "./label-O211LDnS.js";
import { u as useForm, T as Textarea } from "./index.esm-DxyjVheB.js";
import { u as ue } from "./index-XZE9eRwQ.js";
import { m as motion } from "./proxy-DMwnWbnd.js";
import { C as Clock } from "./clock-CPLLIZ88.js";
import { C as CircleHelp } from "./circle-help-K4ok-L1o.js";
import { U as Users } from "./users-DomGzG8v.js";
import { C as CircleCheck } from "./circle-check-BxRpc8Es.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
];
const MessageSquare = createLucideIcon("message-square", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode);
const COUNTRY_CODES = [
  { code: "+1", country: "US/CA" },
  { code: "+44", country: "UK" },
  { code: "+49", country: "DE" },
  { code: "+33", country: "FR" },
  { code: "+61", country: "AU" },
  { code: "+81", country: "JP" },
  { code: "+86", country: "CN" },
  { code: "+91", country: "IN" },
  { code: "+971", country: "UAE" },
  { code: "+65", country: "SG" }
];
const SUBJECTS = [
  "General Inquiry",
  "Investment Question",
  "Technical Support",
  "Partnership",
  "Other"
];
function SuccessCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      className: "flex flex-col items-center justify-center gap-6 py-16 px-8 rounded-xl border border-primary/30 bg-card text-center",
      "data-ocid": "contact.success_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full gold-gradient flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-10 h-10 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-display font-bold text-foreground mb-2", children: "Message Sent!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xs", children: "Thank you for reaching out. Our team will respond within 24–48 business hours." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border border-primary/30 px-4 py-1.5", children: "Response time: 24–48 hours" })
      ]
    }
  );
}
function InfoCard({
  icon: Icon,
  title,
  children,
  delay = 0
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.45, delay },
      className: "rounded-xl border border-border bg-card p-5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg gold-gradient flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4.5 h-4.5 text-primary-foreground", size: 18 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-foreground", children: title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-sm leading-relaxed", children })
      ]
    }
  );
}
function BottomInfoCard({
  icon: Icon,
  title,
  description,
  delay = 0
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay },
      className: "flex flex-col items-center text-center gap-4 rounded-xl border border-border bg-card p-8 hover:border-primary/40 transition-smooth",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full gold-gradient flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-7 h-7 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-bold text-lg text-foreground mb-1", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: description })
        ] })
      ]
    }
  );
}
function ContactPage() {
  const [submitted, setSubmitted] = reactExports.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: { countryCode: "+1", subject: "General Inquiry" }
  });
  const onSubmit = async (_data) => {
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    ue.success("Message sent successfully!", {
      description: "We'll get back to you within 24–48 hours.",
      duration: 5e3
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "contact.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative py-20 px-4 overflow-hidden border-b border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-primary/5 blur-3xl" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto relative text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-4 bg-primary/10 text-primary border border-primary/30 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase", children: "Contact Us" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-5xl md:text-6xl font-display font-bold text-foreground mb-4", children: [
              "Get ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gold-text", children: "In Touch" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-muted-foreground max-w-xl mx-auto", children: "We're here to help" })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: -24 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5, delay: 0.1 },
          className: "lg:col-span-3",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground mb-1", children: "Send a Message" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-8", children: "Fill in the form below and we'll get back to you shortly." }),
            submitted ? /* @__PURE__ */ jsxRuntimeExports.jsx(SuccessCard, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleSubmit(onSubmit),
                className: "flex flex-col gap-5",
                "data-ocid": "contact.form",
                noValidate: true,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Label,
                      {
                        htmlFor: "contact-name",
                        className: "text-foreground text-sm font-medium",
                        children: [
                          "Full Name ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "*" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "contact-name",
                        placeholder: "Jane Doe",
                        className: "bg-secondary border-input focus:border-primary transition-smooth",
                        "data-ocid": "contact.name_input",
                        ...register("name", { required: "Name is required" })
                      }
                    ),
                    errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-destructive text-xs",
                        "data-ocid": "contact.name.field_error",
                        children: errors.name.message
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Label,
                      {
                        htmlFor: "contact-email",
                        className: "text-foreground text-sm font-medium",
                        children: [
                          "Email Address ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "*" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "contact-email",
                        type: "email",
                        placeholder: "jane@example.com",
                        className: "bg-secondary border-input focus:border-primary transition-smooth",
                        "data-ocid": "contact.email_input",
                        ...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address"
                          }
                        })
                      }
                    ),
                    errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-destructive text-xs",
                        "data-ocid": "contact.email.field_error",
                        children: errors.email.message
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-foreground text-sm font-medium", children: "Phone (optional)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "select",
                        {
                          className: "h-10 rounded-md border border-input bg-secondary px-3 text-sm text-foreground focus:outline-none focus:border-primary transition-smooth w-28 flex-shrink-0",
                          "data-ocid": "contact.country_code_select",
                          ...register("countryCode"),
                          children: COUNTRY_CODES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: c.code, children: [
                            c.code,
                            " ",
                            c.country
                          ] }, c.code))
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          type: "tel",
                          placeholder: "555 000 1234",
                          className: "bg-secondary border-input focus:border-primary transition-smooth flex-1",
                          "data-ocid": "contact.phone_input",
                          ...register("phone")
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Label,
                      {
                        htmlFor: "contact-subject",
                        className: "text-foreground text-sm font-medium",
                        children: [
                          "Subject ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "*" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "select",
                      {
                        id: "contact-subject",
                        className: "h-10 w-full rounded-md border border-input bg-secondary px-3 text-sm text-foreground focus:outline-none focus:border-primary transition-smooth",
                        "data-ocid": "contact.subject_select",
                        ...register("subject", {
                          required: "Please select a subject"
                        }),
                        children: SUBJECTS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
                      }
                    ),
                    errors.subject && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-destructive text-xs",
                        "data-ocid": "contact.subject.field_error",
                        children: errors.subject.message
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Label,
                      {
                        htmlFor: "contact-message",
                        className: "text-foreground text-sm font-medium",
                        children: [
                          "Message ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "*" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        id: "contact-message",
                        placeholder: "Tell us how we can help you...",
                        rows: 6,
                        className: "bg-secondary border-input focus:border-primary transition-smooth resize-none",
                        "data-ocid": "contact.message_textarea",
                        ...register("message", {
                          required: "Message is required",
                          minLength: {
                            value: 20,
                            message: "Message must be at least 20 characters"
                          }
                        })
                      }
                    ),
                    errors.message && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-destructive text-xs",
                        "data-ocid": "contact.message.field_error",
                        children: errors.message.message
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      disabled: isSubmitting,
                      className: "gold-gradient text-primary-foreground font-semibold h-11 shadow-gold hover:opacity-90 transition-smooth mt-1",
                      "data-ocid": "contact.submit_button",
                      children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" }),
                        "Sending..."
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 16 }),
                        "Send Message"
                      ] })
                    }
                  )
                ]
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 24 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5, delay: 0.2 },
          className: "lg:col-span-2 flex flex-col gap-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(InfoCard, { icon: Mail, title: "Support Email", delay: 0.15, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1", children: "Reach our dedicated support team at:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "mailto:support@gonext.finance",
                  className: "text-primary font-medium hover:underline transition-smooth",
                  "data-ocid": "contact.support_email_link",
                  children: "support@gonext.finance"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground/70", children: "Available for all account and investment inquiries." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(InfoCard, { icon: Clock, title: "Business Hours", delay: 0.2, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "Monday – Friday" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: "9:00 AM – 6:00 PM" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Saturday" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Closed" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Sunday" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Closed" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/70", children: [
                "All times are in ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "UTC" }),
                "."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(InfoCard, { icon: Phone, title: "Response Time", delay: 0.25, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: "24–48 business hours" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We aim to respond to all inquiries promptly. Urgent investment matters are prioritized and typically handled within the same business day." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              InfoCard,
              {
                icon: CircleHelp,
                title: "Frequently Asked Questions",
                delay: 0.3,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3", children: "Many questions are already answered in our FAQ section. Browse common topics around accounts, investments, and withdrawals." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/faq",
                      className: "inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:underline transition-smooth",
                      "data-ocid": "contact.faq_link",
                      children: "Browse the FAQ →"
                    }
                  )
                ]
              }
            )
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 px-4 bg-muted/30 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.45 },
          className: "text-center mb-12",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl font-display font-bold text-foreground mb-3", children: [
              "Multiple Ways to ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gold-text", children: "Connect" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-lg mx-auto", children: "Choose the channel that works best for you." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          BottomInfoCard,
          {
            icon: Mail,
            title: "Email Support",
            description: "Direct line to our expert support team for account, investment, and technical questions.",
            delay: 0
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          BottomInfoCard,
          {
            icon: Clock,
            title: "Business Hours",
            description: "Monday to Friday, 9 AM–6 PM UTC. Fast-tracked responses for active investment accounts.",
            delay: 0.1
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          BottomInfoCard,
          {
            icon: Users,
            title: "Community",
            description: "Join the GoNext investor community to share insights, strategies, and success stories.",
            delay: 0.2
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  ContactPage as default
};
