import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  Clock,
  HelpCircle,
  Mail,
  MessageSquare,
  Phone,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
  { code: "+65", country: "SG" },
];

const SUBJECTS = [
  "General Inquiry",
  "Investment Question",
  "Technical Support",
  "Partnership",
  "Other",
];

type FormValues = {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  subject: string;
  message: string;
};

function SuccessCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center gap-6 py-16 px-8 rounded-xl border border-primary/30 bg-card text-center"
      data-ocid="contact.success_state"
    >
      <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center">
        <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
      </div>
      <div>
        <h3 className="text-2xl font-display font-bold text-foreground mb-2">
          Message Sent!
        </h3>
        <p className="text-muted-foreground max-w-xs">
          Thank you for reaching out. Our team will respond within 24–48
          business hours.
        </p>
      </div>
      <Badge className="bg-primary/10 text-primary border border-primary/30 px-4 py-1.5">
        Response time: 24–48 hours
      </Badge>
    </motion.div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  children,
  delay = 0,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      className="rounded-xl border border-border bg-card p-5"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg gold-gradient flex items-center justify-center flex-shrink-0">
          <Icon className="w-4.5 h-4.5 text-primary-foreground" size={18} />
        </div>
        <h4 className="font-display font-semibold text-foreground">{title}</h4>
      </div>
      <div className="text-muted-foreground text-sm leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
}

function BottomInfoCard({
  icon: Icon,
  title,
  description,
  delay = 0,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center text-center gap-4 rounded-xl border border-border bg-card p-8 hover:border-primary/40 transition-smooth"
    >
      <div className="w-14 h-14 rounded-full gold-gradient flex items-center justify-center">
        <Icon className="w-7 h-7 text-primary-foreground" />
      </div>
      <div>
        <h4 className="font-display font-bold text-lg text-foreground mb-1">
          {title}
        </h4>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </motion.div>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { countryCode: "+1", subject: "General Inquiry" },
  });

  const onSubmit = async (_data: FormValues) => {
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    toast.success("Message sent successfully!", {
      description: "We'll get back to you within 24–48 hours.",
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen bg-background" data-ocid="contact.page">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden border-b border-border bg-card">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <Badge className="mb-4 bg-primary/10 text-primary border border-primary/30 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase">
              Contact Us
            </Badge>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-4">
              Get <span className="gold-text">In Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">
              We're here to help
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Left: Contact Form (60%) */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <div className="rounded-xl border border-border bg-card p-8">
                <h2 className="text-2xl font-display font-bold text-foreground mb-1">
                  Send a Message
                </h2>
                <p className="text-muted-foreground text-sm mb-8">
                  Fill in the form below and we'll get back to you shortly.
                </p>

                {submitted ? (
                  <SuccessCard />
                ) : (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5"
                    data-ocid="contact.form"
                    noValidate
                  >
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <Label
                        htmlFor="contact-name"
                        className="text-foreground text-sm font-medium"
                      >
                        Full Name <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="contact-name"
                        placeholder="Jane Doe"
                        className="bg-secondary border-input focus:border-primary transition-smooth"
                        data-ocid="contact.name_input"
                        {...register("name", { required: "Name is required" })}
                      />
                      {errors.name && (
                        <span
                          className="text-destructive text-xs"
                          data-ocid="contact.name.field_error"
                        >
                          {errors.name.message}
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <Label
                        htmlFor="contact-email"
                        className="text-foreground text-sm font-medium"
                      >
                        Email Address <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="jane@example.com"
                        className="bg-secondary border-input focus:border-primary transition-smooth"
                        data-ocid="contact.email_input"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address",
                          },
                        })}
                      />
                      {errors.email && (
                        <span
                          className="text-destructive text-xs"
                          data-ocid="contact.email.field_error"
                        >
                          {errors.email.message}
                        </span>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-foreground text-sm font-medium">
                        Phone (optional)
                      </Label>
                      <div className="flex gap-2">
                        <select
                          className="h-10 rounded-md border border-input bg-secondary px-3 text-sm text-foreground focus:outline-none focus:border-primary transition-smooth w-28 flex-shrink-0"
                          data-ocid="contact.country_code_select"
                          {...register("countryCode")}
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.code} {c.country}
                            </option>
                          ))}
                        </select>
                        <Input
                          type="tel"
                          placeholder="555 000 1234"
                          className="bg-secondary border-input focus:border-primary transition-smooth flex-1"
                          data-ocid="contact.phone_input"
                          {...register("phone")}
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col gap-1.5">
                      <Label
                        htmlFor="contact-subject"
                        className="text-foreground text-sm font-medium"
                      >
                        Subject <span className="text-primary">*</span>
                      </Label>
                      <select
                        id="contact-subject"
                        className="h-10 w-full rounded-md border border-input bg-secondary px-3 text-sm text-foreground focus:outline-none focus:border-primary transition-smooth"
                        data-ocid="contact.subject_select"
                        {...register("subject", {
                          required: "Please select a subject",
                        })}
                      >
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      {errors.subject && (
                        <span
                          className="text-destructive text-xs"
                          data-ocid="contact.subject.field_error"
                        >
                          {errors.subject.message}
                        </span>
                      )}
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <Label
                        htmlFor="contact-message"
                        className="text-foreground text-sm font-medium"
                      >
                        Message <span className="text-primary">*</span>
                      </Label>
                      <Textarea
                        id="contact-message"
                        placeholder="Tell us how we can help you..."
                        rows={6}
                        className="bg-secondary border-input focus:border-primary transition-smooth resize-none"
                        data-ocid="contact.message_textarea"
                        {...register("message", {
                          required: "Message is required",
                          minLength: {
                            value: 20,
                            message: "Message must be at least 20 characters",
                          },
                        })}
                      />
                      {errors.message && (
                        <span
                          className="text-destructive text-xs"
                          data-ocid="contact.message.field_error"
                        >
                          {errors.message.message}
                        </span>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="gold-gradient text-primary-foreground font-semibold h-11 shadow-gold hover:opacity-90 transition-smooth mt-1"
                      data-ocid="contact.submit_button"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <MessageSquare size={16} />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Right: Info Sidebar (40%) */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 flex flex-col gap-4"
            >
              <InfoCard icon={Mail} title="Support Email" delay={0.15}>
                <p className="mb-1">Reach our dedicated support team at:</p>
                <a
                  href="mailto:support@gonext.finance"
                  className="text-primary font-medium hover:underline transition-smooth"
                  data-ocid="contact.support_email_link"
                >
                  support@gonext.finance
                </a>
                <p className="mt-2 text-xs text-muted-foreground/70">
                  Available for all account and investment inquiries.
                </p>
              </InfoCard>

              <InfoCard icon={Clock} title="Business Hours" delay={0.2}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-foreground font-medium">
                    Monday – Friday
                  </span>
                  <span className="text-primary font-semibold">
                    9:00 AM – 6:00 PM
                  </span>
                </div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Saturday</span>
                  <span className="text-muted-foreground">Closed</span>
                </div>
                <div className="flex justify-between text-xs mb-3">
                  <span>Sunday</span>
                  <span className="text-muted-foreground">Closed</span>
                </div>
                <p className="text-xs text-muted-foreground/70">
                  All times are in <span className="text-primary">UTC</span>.
                </p>
              </InfoCard>

              <InfoCard icon={Phone} title="Response Time" delay={0.25}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-foreground font-semibold">
                    24–48 business hours
                  </span>
                </div>
                <p>
                  We aim to respond to all inquiries promptly. Urgent investment
                  matters are prioritized and typically handled within the same
                  business day.
                </p>
              </InfoCard>

              <InfoCard
                icon={HelpCircle}
                title="Frequently Asked Questions"
                delay={0.3}
              >
                <p className="mb-3">
                  Many questions are already answered in our FAQ section. Browse
                  common topics around accounts, investments, and withdrawals.
                </p>
                <Link
                  to="/faq"
                  className="inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:underline transition-smooth"
                  data-ocid="contact.faq_link"
                >
                  Browse the FAQ →
                </Link>
              </InfoCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom Info Cards */}
      <section className="py-16 px-4 bg-muted/30 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-foreground mb-3">
              Multiple Ways to <span className="gold-text">Connect</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Choose the channel that works best for you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BottomInfoCard
              icon={Mail}
              title="Email Support"
              description="Direct line to our expert support team for account, investment, and technical questions."
              delay={0}
            />
            <BottomInfoCard
              icon={Clock}
              title="Business Hours"
              description="Monday to Friday, 9 AM–6 PM UTC. Fast-tracked responses for active investment accounts."
              delay={0.1}
            />
            <BottomInfoCard
              icon={Users}
              title="Community"
              description="Join the GoNext investor community to share insights, strategies, and success stories."
              delay={0.2}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
