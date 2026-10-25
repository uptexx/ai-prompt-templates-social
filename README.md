# @uptexx/ai-prompt-templates-social

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6.svg)](https://www.typescriptlang.org/)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-success.svg)](https://github.com/uptexx/ai-prompt-templates-social)
[![Built by Uptexx](https://img.shields.io/badge/Built%20by-Uptexx-0A0A0A.svg)](https://uptexx.com)
[![Powered by NexoPost](https://img.shields.io/badge/Powered%20by-NexoPost-6366F1.svg)](https://nexopost.com)
[![NVIDIA Inception](https://img.shields.io/badge/NVIDIA%20Inception-Program%20Member-76B900.svg)](https://www.nvidia.com/en-us/startups/)

> **Built by [Uptexx](https://uptexx.com)** — This open-source package is maintained by the engineering team behind **[NexoPost](https://nexopost.com)**, the AI-powered B2B social media scheduling, editorial calendar, and autonomous publishing platform. Proud **NVIDIA Inception Program Member**.

Structured, variable-interpolated system prompt templates and strict JSON output schemas for B2B social copywriting, AI product photography staging, vertical video hooks, and multi-network campaign adaptation.

---

## Features

- **Curated B2B & Creative Prompt Library:** Includes production-tested templates:
  - `b2b-linkedin-thought-leadership` (`copywriting`)
  - `multi-platform-campaign-adapter` (`campaign`)
  - `product-photography-staging` (`visual-staging`)
  - `short-form-video-hook-script` (`video`)
  - `carousel-story-architect` (`carousel`)
  - `crisis-response-statement` (`communications`)
- **Safe Variable Interpolation & Validation:** Replaces `{{variable}}` tokens, tracks `variablesUsed`, and reports `missingVariables` without throwing on optional fields.
- **Strict Structured Output Schemas:** Every template includes a strict JSON Schema (`additionalProperties: false`) ready for OpenAI, Gemini, and Claude structured output modes.
- **Zero Dependencies & TypeScript Native:** Pure ES2022 module with full `.d.ts` type definitions.

---

## Installation

```bash
npm install @uptexx/ai-prompt-templates-social
```

---

## Quick Start (Usage Examples)

### 1. Render a B2B LinkedIn Thought-Leadership Prompt & JSON Schema

```javascript
import {
  renderSocialPrompt,
  listPromptTemplates,
  getStructuredOutputSchema,
} from "@uptexx/ai-prompt-templates-social";

const rendered = renderSocialPrompt("b2b-linkedin-thought-leadership", {
  topic: "Autonomous AI Editorial Calendars",
  audience: "B2B SaaS Founders & Marketing Directors",
  tone: "Executive, data-driven, and concise",
  brandName: "NexoPost",
  callToAction: "Explore nexopost.com",
});

console.log(rendered.systemPrompt);
console.log(rendered.userPrompt);
console.log(rendered.outputSchema);
```

### 2. List Templates by Category

```javascript
const stagingTemplates = listPromptTemplates("visual-staging");
console.log(stagingTemplates);
```

---

## API Reference

| Function | Parameters | Return Type | Description |
| :--- | :--- | :--- | :--- |
| `renderSocialPrompt` | `(templateId, variables?)` | `RenderedPromptResult` | Interpolates `{{variable}}` placeholders, validates required variables, and returns system/user prompts + JSON schema. |
| `listPromptTemplates` | `(category?)` | `PromptTemplateSummary[]` | Lists all built-in templates or filters by `category`. |
| `getStructuredOutputSchema` | `(templateId)` | `Record<string, unknown>` | Returns a deep clone of the strict JSON Schema for the given `templateId`. |

---

## About Uptexx & NexoPost

**[Uptexx](https://uptexx.com)** builds next-generation AI workflow and media automation infrastructure. Our flagship platform, **[NexoPost](https://nexopost.com)**, empowers B2B brands, agencies, and growth teams with AI-assisted content creation, multi-network social scheduling, product staging, and autonomous publishing pipelines.

- **Company Website:** [https://uptexx.com](https://uptexx.com)
- **Product Platform:** [https://nexopost.com](https://nexopost.com)
- **Ecosystem:** Proud **NVIDIA Inception Program Member**

## License

MIT © [Uptexx](https://uptexx.com) (`Kuzey Tech Bilgi Teknolojileri Ticaret Limited Sirketi`)
