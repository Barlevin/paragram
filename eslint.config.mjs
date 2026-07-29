import coreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/**
 * Physical direction utilities are a bug in an RTL-native codebase: they
 * hardcode a screen edge instead of the inline axis. Tailwind v4 ships the
 * logical equivalents in core, so there is never a reason to reach for these.
 *
 * This is the rule that mechanically prevents the site from being built
 * LTR-first and flipped afterwards.
 */
const bannedDirectionUtilities = [
  {
    pattern: "(^|[\\s:\\[])-?(ml|mr)-",
    replacement: "ms-* / me-* (margin-inline-start / -end)",
  },
  {
    pattern: "(^|[\\s:\\[])-?(pl|pr)-",
    replacement: "ps-* / pe-* (padding-inline-start / -end)",
  },
  {
    pattern: "(^|[\\s:\\[])text-(left|right)(?![a-z-])",
    replacement: "text-start / text-end",
  },
  {
    pattern: "(^|[\\s:\\[])-?(left|right)-",
    replacement: "inset-s-* / inset-e-*",
  },
  {
    pattern: "(^|[\\s:\\[])border-(l|r)(-|$|\\s)",
    replacement: "border-s-* / border-e-*",
  },
  {
    pattern: "(^|[\\s:\\[])rounded-(tl|tr|bl|br)(-|$|\\s)",
    replacement: "rounded-ss-* / rounded-se-* / rounded-es-* / rounded-ee-*",
  },
  {
    pattern: "(^|[\\s:\\[])float-(left|right)(?![a-z-])",
    replacement: "float-start / float-end",
  },
  {
    pattern: "(^|[\\s:\\[])clear-(left|right)(?![a-z-])",
    replacement: "clear-start / clear-end",
  },
];

const directionRestrictions = bannedDirectionUtilities.flatMap(
  ({ pattern, replacement }) => {
    const message = `Physical direction utility found. Use ${replacement} instead — this codebase is RTL-native and must never hardcode a screen edge.`;
    return [
      { selector: `Literal[value=/${pattern}/]`, message },
      { selector: `TemplateElement[value.raw=/${pattern}/]`, message },
    ];
  },
);

const eslintConfig = [
  ...coreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "coverage/**",
      "playwright-report/**",
      "test-results/**",
      "next-env.d.ts",
    ],
  },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": ["error", ...directionRestrictions],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      eqeqeq: ["error", "always", { null: "ignore" }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
  {
    // CSS-in-tokens and test fixtures legitimately contain direction words.
    files: ["tests/**/*.{ts,tsx}", "src/styles/**"],
    rules: { "no-restricted-syntax": "off" },
  },
];

export default eslintConfig;
