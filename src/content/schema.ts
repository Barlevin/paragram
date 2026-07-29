import { z } from "zod";

/* ==========================================================================
   Content schemas

   Every content module is parsed through these at import time, so a missing
   or malformed field fails the build instead of shipping. Two schemas below
   use `z.literal(true)` to make dishonest content structurally impossible to
   express rather than merely discouraged — see `results` and `consentOnFile`.
   ========================================================================== */

/** 05X-XXXXXXX mobile, or 0X-XXXXXXX landline, digits only. */
export const ISRAELI_PHONE = /^(05\d{8}|0[23489]\d{7})$/;

/** E.164, Israel. Used for wa.me deep links. */
export const E164_IL = /^\+972\d{8,9}$/;

const HEX_COLOR = /^#[0-9a-f]{6}$/i;

/** ISO date, YYYY-MM-DD. */
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export const ImageSchema = z.object({
  src: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  /** Hebrew, describing content and function — never the filename. */
  alt: z.string().min(1),
});
export type Image = z.infer<typeof ImageSchema>;

export const CtaSchema = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  href: z.string().min(1),
  /** Drives the analytics `location` property. */
  location: z.enum([
    "header",
    "hero",
    "services",
    "work",
    "final_cta",
    "footer",
  ]),
  variant: z.enum(["primary", "secondary", "tertiary"]).default("primary"),
});
export type Cta = z.infer<typeof CtaSchema>;

export const NavItemSchema = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  href: z.string().min(1),
  order: z.number().int(),
});
export type NavItem = z.infer<typeof NavItemSchema>;

export const SocialSchema = z.object({
  platform: z.enum(["github", "linkedin", "instagram", "facebook", "x"]),
  url: z.url(),
  labelHe: z.string().min(1),
});

export const SiteSchema = z.object({
  businessName: z.string().min(1),
  ownerName: z.string().min(1),
  tagline: z.string().min(1),
  /** Literal: the one verified number on the site cannot drift. */
  yearsOfExperience: z.literal(8),
  phone: z.string().regex(ISRAELI_PHONE),
  phoneDisplay: z.string().min(1),
  whatsapp: z.string().regex(E164_IL),
  whatsappPrefill: z.string().min(1),
  email: z.email(),
  availableForWork: z.boolean(),
  availabilityLabel: z.string().min(1),
  responsePromise: z.string().min(1),
  socials: z.array(SocialSchema),
  legal: z.object({
    privacyUpdatedAt: z.string().regex(ISO_DATE),
    accessibilityUpdatedAt: z.string().regex(ISO_DATE),
    conformanceTarget: z.string().min(1),
  }),
});
export type Site = z.infer<typeof SiteSchema>;

export const HeroSchema = z.object({
  /** Pre-split into lines for the masked reveal; also the accessible text. */
  headlineLines: z.array(z.string().min(1)).min(2).max(3),
  subheadline: z.string().min(1),
  /** Roughly 40% shorter. A content-layer field, not a CSS trick. */
  subheadlineMobile: z.string().min(1),
  primaryCta: CtaSchema,
  secondaryCta: CtaSchema,
  trustMicrocopy: z.array(z.string().min(1)).length(3),
  scrollHint: z.string().min(1),
  seamLabels: z.object({
    draft: z.string().min(1),
    built: z.string().min(1),
    control: z.string().min(1),
    hint: z.string().min(1),
  }),
  /** Alternative headlines kept for review; never rendered. */
  headlineAlternatives: z.array(
    z.object({ style: z.string().min(1), text: z.string().min(1) }),
  ),
});
export type Hero = z.infer<typeof HeroSchema>;

export const TrustSchema = z.object({
  eyebrow: z.string().min(1),
  heading: z.string().min(1),
  intro: z.string().min(1),
  yearsLabel: z.string().min(1),
  disciplines: z
    .array(
      z.object({
        key: z.string().min(1),
        /** May be a Latin technical term where that is what people say. */
        name: z.string().min(1),
        /** What it means for the client's business, in Hebrew. */
        meaning: z.string().min(1),
        technologies: z.array(z.string().min(1)).min(1),
      }),
    )
    .min(4),
});
export type Trust = z.infer<typeof TrustSchema>;

export const SERVICE_ICONS = [
  "site",
  "landing",
  "store",
  "app",
  "redesign",
  "performance",
  "booking",
  "integration",
  "care",
  "dashboard",
] as const;

export const ServiceSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  summary: z.string().min(1),
  forWhom: z.string().min(1),
  problemSolved: z.string().min(1),
  deliverables: z.array(z.string().min(1)).min(3),
  nextStep: z.object({ label: z.string().min(1), href: z.string().min(1) }),
  icon: z.enum(SERVICE_ICONS),
  order: z.number().int(),
  published: z.boolean(),
});
export type Service = z.infer<typeof ServiceSchema>;

export const WhyMeSchema = z.object({
  eyebrow: z.string().min(1),
  heading: z.string().min(1),
  points: z
    .array(
      z.object({
        key: z.string().min(1),
        statement: z.string().min(1),
        detail: z.string().min(1),
      }),
    )
    .length(6),
});
export type WhyMe = z.infer<typeof WhyMeSchema>;

export const ProcessStageSchema = z.object({
  index: z.number().int().min(1).max(9),
  title: z.string().min(1),
  explanation: z.string().min(1),
  myResponsibility: z.string().min(1),
  clientResponsibility: z.string().min(1),
  output: z.string().min(1),
});
export type ProcessStage = z.infer<typeof ProcessStageSchema>;

export const ProcessSchema = z.object({
  eyebrow: z.string().min(1),
  heading: z.string().min(1),
  intro: z.string().min(1),
  labels: z.object({
    mine: z.string().min(1),
    yours: z.string().min(1),
    output: z.string().min(1),
  }),
  stages: z.array(ProcessStageSchema).length(9),
});
export type Process = z.infer<typeof ProcessSchema>;

export const AboutSchema = z.object({
  eyebrow: z.string().min(1),
  heading: z.string().min(1),
  paragraphs: z.array(z.string().min(1)).min(3),
  portrait: ImageSchema,
  portraitCaption: z.string().min(1),
  directContactPromise: z.string().min(1),
  /** Guidance for the photo shoot. Never rendered. */
  portraitDirection: z.string().min(1),
});
export type About = z.infer<typeof AboutSchema>;

export const TestimonialSchema = z.object({
  id: z.string().min(1),
  customerName: z.string().min(1),
  customerPhoto: ImageSchema.optional(),
  businessName: z.string().min(1),
  businessLogo: ImageSchema.optional(),
  role: z.string().min(1),
  quote: z.string().min(1),
  projectSlug: z.string().optional(),
  videoUrl: z.url().optional(),
  externalUrl: z.url().optional(),
  order: z.number().int(),
  published: z.boolean(),
  /**
   * Literal: a testimonial without recorded written permission to publish the
   * person's name, photo and business cannot be represented at all.
   */
  consentOnFile: z.literal(true),
});
export type Testimonial = z.infer<typeof TestimonialSchema>;

export const TestimonialsSectionSchema = z.object({
  eyebrow: z.string().min(1),
  heading: z.string().min(1),
  /** Shown while the list is empty. Honest by design, not apologetic. */
  emptyStateBody: z.string().min(1),
  emptySlotLabel: z.string().min(1),
  emptyStateCta: CtaSchema,
  navLabels: z.object({ previous: z.string().min(1), next: z.string().min(1) }),
});

export const FAQ_CATEGORIES = ["תהליך", "מחיר", "טכני", "אחרי ההשקה"] as const;

export const FaqItemSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
  /** Gates FAQ structured data: only `final` answers are ever emitted. */
  answerStatus: z.enum(["final", "placeholder"]),
  category: z.enum(FAQ_CATEGORIES),
  order: z.number().int(),
});
export type FaqItem = z.infer<typeof FaqItemSchema>;

export const FaqSchema = z.object({
  eyebrow: z.string().min(1),
  heading: z.string().min(1),
  intro: z.string().min(1),
  items: z.array(FaqItemSchema).min(1),
});

export const FinalCtaSchema = z.object({
  headline: z.string().min(1),
  supporting: z.string().min(1),
  primaryCta: CtaSchema,
  whatsappLabel: z.string().min(1),
  phoneLabel: z.string().min(1),
  emailLabel: z.string().min(1),
  builtWithNote: z.string().min(1),
  /** Alternatives kept for review; never rendered. */
  alternatives: z.array(
    z.object({ style: z.string().min(1), text: z.string().min(1) }),
  ),
});

/* --------------------------------------------------------------------------
   Projects
   -------------------------------------------------------------------------- */

export const ProjectSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  industry: z.string().min(1),
  shortDescription: z.string().min(1),
  businessProblem: z.string().min(1),
  solution: z.string().min(1),
  myRole: z.string().min(1),
  technologies: z.array(z.string().min(1)).min(1),
  screenshots: z.object({
    desktop: ImageSchema,
    tablet: ImageSchema.optional(),
    mobile: ImageSchema,
  }),
  cover: ImageSchema,
  gallery: z.array(ImageSchema).default([]),
  liveUrl: z.url().optional(),
  caseStudyUrl: z.string().optional(),
  features: z.array(
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      /** Short mono label for a dimension-line callout. */
      annotation: z.string().optional(),
    }),
  ),
  challenges: z.array(
    z.object({
      challenge: z.string().min(1),
      resolution: z.string().min(1),
    }),
  ),
  developmentProcess: z.array(z.string().min(1)).default([]),
  /**
   * Literal `verified: true` makes an unverified metric impossible to express.
   * There is no way to accidentally publish an invented result.
   */
  results: z
    .array(
      z.object({
        label: z.string().min(1),
        value: z.string().min(1),
        verified: z.literal(true),
      }),
    )
    .default([]),
  testimonialId: z.string().optional(),
  accentColor: z.string().regex(HEX_COLOR),
  theme: z.enum(["light", "dark"]),
  order: z.number().int(),
  published: z.boolean(),
  /** `awaiting-assets` is excluded from production builds. */
  contentStatus: z.enum(["complete", "awaiting-assets"]),
});
export type Project = z.infer<typeof ProjectSchema>;

export const WorkSectionSchema = z.object({
  eyebrow: z.string().min(1),
  heading: z.string().min(1),
  intro: z.string().min(1),
  labels: z.object({
    problem: z.string().min(1),
    solution: z.string().min(1),
    role: z.string().min(1),
    stack: z.string().min(1),
    viewCase: z.string().min(1),
    viewLive: z.string().min(1),
    industry: z.string().min(1),
    devices: z.object({
      desktop: z.string().min(1),
      tablet: z.string().min(1),
      mobile: z.string().min(1),
    }),
  }),
});

/* --------------------------------------------------------------------------
   Contact form
   -------------------------------------------------------------------------- */

export const FormOptionSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
});

export const FormStepSchema = z.object({
  index: z.number().int().min(1).max(5),
  legend: z.string().min(1),
  fields: z.array(z.string().min(1)).min(1),
});

export const FormContentSchema = z.object({
  eyebrow: z.string().min(1),
  heading: z.string().min(1),
  intro: z.string().min(1),
  progressTemplate: z.string().min(1),
  steps: z.array(FormStepSchema).length(5),
  questions: z.object({
    businessType: z.object({
      label: z.string().min(1),
      options: z.array(FormOptionSchema).min(2),
    }),
    siteType: z.object({
      label: z.string().min(1),
      options: z.array(FormOptionSchema).min(2),
    }),
    hasSite: z.object({
      label: z.string().min(1),
      options: z.array(FormOptionSchema).min(2),
    }),
    goals: z.object({
      label: z.string().min(1),
      hint: z.string().min(1),
      options: z.array(FormOptionSchema).min(2),
    }),
    features: z.object({
      label: z.string().min(1),
      hint: z.string().min(1),
      options: z.array(FormOptionSchema).min(2),
    }),
    timeline: z.object({
      label: z.string().min(1),
      options: z.array(FormOptionSchema).min(2),
    }),
    budget: z.object({
      label: z.string().min(1),
      hint: z.string().min(1),
      options: z.array(FormOptionSchema).min(2),
    }),
    name: z.object({
      label: z.string().min(1),
      placeholder: z.string().min(1),
    }),
    phone: z.object({
      label: z.string().min(1),
      placeholder: z.string().min(1),
      hint: z.string().min(1),
    }),
    email: z.object({
      label: z.string().min(1),
      placeholder: z.string().min(1),
    }),
    notes: z.object({
      label: z.string().min(1),
      placeholder: z.string().min(1),
      optionalLabel: z.string().min(1),
    }),
    consent: z.object({
      label: z.string().min(1),
      linkLabel: z.string().min(1),
      linkHref: z.string().min(1),
    }),
  }),
  buttons: z.object({
    next: z.string().min(1),
    back: z.string().min(1),
    submit: z.string().min(1),
    submitting: z.string().min(1),
    retry: z.string().min(1),
  }),
  validation: z.object({
    nameRequired: z.string().min(1),
    nameTooShort: z.string().min(1),
    phoneRequired: z.string().min(1),
    phoneInvalid: z.string().min(1),
    emailRequired: z.string().min(1),
    emailInvalid: z.string().min(1),
    chipsRequired: z.string().min(1),
    consentRequired: z.string().min(1),
    notesTooLong: z.string().min(1),
  }),
  success: z.object({
    heading: z.string().min(1),
    bodyTemplate: z.string().min(1),
    whatsappLabel: z.string().min(1),
    backLabel: z.string().min(1),
    backHref: z.string().min(1),
  }),
  errors: z.object({
    server: z.string().min(1),
    rateLimited: z.string().min(1),
    turnstile: z.string().min(1),
    offline: z.string().min(1),
    validation: z.string().min(1),
  }),
});
export type FormContent = z.infer<typeof FormContentSchema>;

/* --------------------------------------------------------------------------
   SEO
   -------------------------------------------------------------------------- */

export const SeoEntrySchema = z.object({
  /** Under 60 characters so it is not truncated in Hebrew SERPs. */
  title: z.string().min(1).max(70),
  /** 140–158 characters. */
  description: z.string().min(80).max(180),
  path: z.string().min(1),
});

export const SeoSchema = z.object({
  siteName: z.string().min(1),
  titleTemplate: z.string().includes("%s"),
  defaultTitle: z.string().min(1),
  locale: z.literal("he_IL"),
  routes: z.record(z.string(), SeoEntrySchema),
});

/* --------------------------------------------------------------------------
   Parse helper
   -------------------------------------------------------------------------- */

/**
 * Parses a content module and throws with the offending path on failure, so a
 * content mistake surfaces as a readable build error rather than a runtime
 * `undefined` three components deep.
 */
export function parseContent<T extends z.ZodType>(
  schema: T,
  value: unknown,
  moduleName: string,
): z.infer<T> {
  const result = schema.safeParse(value);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  • ${i.path.join(".") || "(root)"}: ${i.message}`)
      .join("\n");
    throw new Error(
      `Invalid content in "${moduleName}":\n${issues}\n\n` +
        `Content is validated at build time on purpose — fix the content file.`,
    );
  }
  return result.data;
}
