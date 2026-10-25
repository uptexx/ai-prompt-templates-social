/**
 * @uptexx/ai-prompt-templates-social
 * Structured, variable-interpolated system prompt templates and JSON output schemas
 * for B2B social copywriting, product staging, and multi-network adaptation.
 *
 * Built by Uptexx (https://uptexx.com) — Powered by NexoPost (https://nexopost.com)
 */

const PROMPT_CATALOG = {
  "b2b-linkedin-thought-leadership": {
    id: "b2b-linkedin-thought-leadership",
    name: "B2B LinkedIn Thought Leadership Post",
    category: "copywriting",
    description:
      "Generates an authoritative, high-dwell-time B2B LinkedIn post with a contrarian or data-backed hook and structured takeaways.",
    requiredVariables: ["topic", "audience", "tone"],
    optionalVariables: ["callToAction", "brandName"],
    systemPrompt:
      "You are an executive B2B editorial strategist. Write crisp, high-signal LinkedIn thought-leadership content tailored for {{audience}} in a {{tone}} tone. Avoid generic clichés and fluff.",
    userPrompt:
      "Create a LinkedIn thought-leadership post about: {{topic}}. Target audience: {{audience}}. Tone: {{tone}}. Brand context: {{brandName}}. Closing CTA: {{callToAction}}.",
    outputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["hook", "bodyParagraphs", "keyTakeaways", "callToAction", "hashtags"],
      properties: {
        hook: { type: "string", description: "Scroll-stopping opening line under 140 characters." },
        bodyParagraphs: {
          type: "array",
          items: { type: "string" },
          description: "Short, readable narrative paragraphs.",
        },
        keyTakeaways: {
          type: "array",
          items: { type: "string" },
          description: "Bullet-point actionable insights.",
        },
        callToAction: { type: "string", description: "Conversation-starting closing question or CTA." },
        hashtags: {
          type: "array",
          items: { type: "string" },
          description: "3 to 5 relevant B2B hashtags.",
        },
      },
    },
  },
  "multi-platform-campaign-adapter": {
    id: "multi-platform-campaign-adapter",
    name: "Multi-Platform Social Campaign Adapter",
    category: "campaign",
    description:
      "Adapts a core product announcement or blog post into native copy for LinkedIn, X (Twitter), Instagram, and TikTok/Reels.",
    requiredVariables: ["coreMessage", "brandVoice"],
    optionalVariables: ["targetUrl"],
    systemPrompt:
      "You are a multi-network social publishing architect. Adapt the source message into native platform formats while maintaining a consistent {{brandVoice}} brand voice.",
    userPrompt:
      "Adapt the following announcement across LinkedIn, X, Instagram, and Short-Form Video: {{coreMessage}}. Brand voice: {{brandVoice}}. Reference URL: {{targetUrl}}.",
    outputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["linkedin", "xThread", "instagramCaption", "shortVideoHook"],
      properties: {
        linkedin: { type: "string", description: "Long-form B2B LinkedIn post." },
        xThread: {
          type: "array",
          items: { type: "string" },
          description: "Concise posts (each <= 280 chars) forming an X thread.",
        },
        instagramCaption: { type: "string", description: "Engaging Instagram caption with line breaks." },
        shortVideoHook: { type: "string", description: "Spoken 3-second hook for Reels/TikTok/Shorts." },
      },
    },
  },
  "product-photography-staging": {
    id: "product-photography-staging",
    name: "AI Product Photography Studio Staging",
    category: "visual-staging",
    description:
      "Builds deterministic diffusion/FLUX/image-generation prompts for placing a cutout product into realistic commercial studio scenes.",
    requiredVariables: ["productDescription", "surfaceMaterial", "lightingStyle"],
    optionalVariables: ["backgroundMood", "cameraAngle"],
    systemPrompt:
      "You are a commercial product photography director and lighting specialist. Craft photorealistic scene staging instructions that preserve product geometry and label legibility.",
    userPrompt:
      "Stage the following product: {{productDescription}} resting on {{surfaceMaterial}} with {{lightingStyle}} lighting. Background mood: {{backgroundMood}}. Camera angle: {{cameraAngle}}.",
    outputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["positivePrompt", "negativePrompt", "lightingSetup", "recommendedAspectRatio"],
      properties: {
        positivePrompt: { type: "string", description: "Detailed photorealistic scene generation prompt." },
        negativePrompt: { type: "string", description: "Artifacts and distortions to exclude." },
        lightingSetup: { type: "string", description: "Key, fill, and rim lighting breakdown." },
        recommendedAspectRatio: {
          type: "string",
          enum: ["1:1", "4:5", "9:16", "16:9"],
        },
      },
    },
  },
  "short-form-video-hook-script": {
    id: "short-form-video-hook-script",
    name: "Short-Form Video Hook & Retention Script",
    category: "video",
    description:
      "Creates a 30-to-60-second vertical video script for Reels, TikTok, and YouTube Shorts with visual cues and spoken narration.",
    requiredVariables: ["videoTopic", "targetPainPoint"],
    optionalVariables: ["ctaOffer"],
    systemPrompt:
      "You are a short-form vertical video producer. Optimize scripts for first-3-second retention, pattern interrupts, and clear spoken pacing.",
    userPrompt:
      "Write a vertical video script about {{videoTopic}} addressing the pain point: {{targetPainPoint}}. Closing offer: {{ctaOffer}}.",
    outputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["spokenHook", "visualHook", "scenes", "ctaLine"],
      properties: {
        spokenHook: { type: "string", description: "First 3 seconds spoken audio." },
        visualHook: { type: "string", description: "On-screen text and visual action in first 3 seconds." },
        scenes: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["timecode", "narration", "visualDirection"],
            properties: {
              timecode: { type: "string" },
              narration: { type: "string" },
              visualDirection: { type: "string" },
            },
          },
        },
        ctaLine: { type: "string", description: "Closing call-to-action." },
      },
    },
  },
  "carousel-story-architect": {
    id: "carousel-story-architect",
    name: "Multi-Slide Carousel Storyboard Architect",
    category: "carousel",
    description:
      "Structures a step-by-step educational narrative into a multi-slide LinkedIn PDF or Instagram 4:5 carousel deck.",
    requiredVariables: ["deckTopic", "slideCount"],
    optionalVariables: ["audienceLevel"],
    systemPrompt:
      "You are an editorial carousel designer. Structure complex topics into swipeable, punchy slides with one core idea per slide.",
    userPrompt:
      "Architect a {{slideCount}}-slide carousel deck on: {{deckTopic}}. Audience level: {{audienceLevel}}.",
    outputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["deckTitle", "slides"],
      properties: {
        deckTitle: { type: "string" },
        slides: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["slideNumber", "type", "headline", "body"],
            properties: {
              slideNumber: { type: "number" },
              type: { type: "string", enum: ["cover", "content", "quote", "stat", "cta"] },
              headline: { type: "string" },
              body: { type: "string" },
            },
          },
        },
      },
    },
  },
  "crisis-response-statement": {
    id: "crisis-response-statement",
    name: "Corporate Incident & Crisis Communications Statement",
    category: "communications",
    description:
      "Drafts a transparent, calm, and accountable B2B status update or public response during service incidents.",
    requiredVariables: ["incidentSummary", "resolutionStatus", "customerImpact"],
    optionalVariables: ["supportContact"],
    systemPrompt:
      "You are a corporate communications director. Write transparent, factual, and empathetic public incident updates without speculation.",
    userPrompt:
      "Draft an official status update for: {{incidentSummary}}. Current status: {{resolutionStatus}}. Customer impact: {{customerImpact}}. Support contact: {{supportContact}}.",
    outputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["headline", "publicStatement", "nextUpdateTimeline"],
      properties: {
        headline: { type: "string" },
        publicStatement: { type: "string" },
        nextUpdateTimeline: { type: "string" },
      },
    },
  },
};

function interpolateText(templateStr, variables) {
  return templateStr.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_, key) => {
    const val = variables[key];
    if (val === undefined || val === null || String(val).trim() === "") {
      return "N/A";
    }
    return String(val).trim();
  });
}

/**
 * Lists built-in curated B2B social media & visual staging prompt templates,
 * optionally filtered by category.
 *
 * @param {string} [category] - Optional category filter (e.g. "copywriting", "campaign", "visual-staging", "video", "carousel", "communications").
 * @returns {Array<{id: string, name: string, category: string, description: string, requiredVariables: string[], optionalVariables: string[]}>}
 */
export function listPromptTemplates(category) {
  const all = Object.values(PROMPT_CATALOG).map((tpl) => ({
    id: tpl.id,
    name: tpl.name,
    category: tpl.category,
    description: tpl.description,
    requiredVariables: [...tpl.requiredVariables],
    optionalVariables: [...tpl.optionalVariables],
  }));

  if (!category || String(category).trim() === "") {
    return all;
  }

  const normCat = String(category).toLowerCase().trim();
  return all.filter((tpl) => tpl.category.toLowerCase() === normCat);
}

/**
 * Returns a deep clone of the strict JSON Schema object (compatible with OpenAI,
 * Gemini, and Claude structured outputs) for the given `templateId`.
 *
 * @param {string} templateId
 * @returns {object} Strict JSON Schema object.
 */
export function getStructuredOutputSchema(templateId) {
  const tpl = PROMPT_CATALOG[templateId];
  if (!tpl) {
    throw new Error(
      `Unknown templateId "${templateId}". Available templates: ${Object.keys(PROMPT_CATALOG).join(", ")}`
    );
  }
  return JSON.parse(JSON.stringify(tpl.outputSchema));
}

/**
 * Safely interpolates `{{variable}}` placeholders in system and user prompts,
 * checks required variables, and returns the rendered prompt bundle along with its JSON schema.
 *
 * @param {string} templateId - Identifier of the built-in template.
 * @param {Record<string, string|number>} [variables={}] - Key-value map of template variables.
 * @returns {{
 *   templateId: string,
 *   category: string,
 *   systemPrompt: string,
 *   userPrompt: string,
 *   variablesUsed: string[],
 *   missingVariables: string[],
 *   outputSchema: object
 * }}
 */
export function renderSocialPrompt(templateId, variables = {}) {
  const tpl = PROMPT_CATALOG[templateId];
  if (!tpl) {
    throw new Error(
      `Unknown templateId "${templateId}". Available templates: ${Object.keys(PROMPT_CATALOG).join(", ")}`
    );
  }

  if (!variables || typeof variables !== "object") {
    throw new TypeError("variables must be an object.");
  }

  const missingVariables = tpl.requiredVariables.filter((reqKey) => {
    const val = variables[reqKey];
    return val === undefined || val === null || String(val).trim() === "";
  });

  const allAllowedKeys = [...tpl.requiredVariables, ...tpl.optionalVariables];
  const variablesUsed = allAllowedKeys.filter((k) => {
    const val = variables[k];
    return val !== undefined && val !== null && String(val).trim() !== "";
  });

  const systemPrompt = interpolateText(tpl.systemPrompt, variables);
  const userPrompt = interpolateText(tpl.userPrompt, variables);

  return {
    templateId: tpl.id,
    category: tpl.category,
    systemPrompt,
    userPrompt,
    variablesUsed,
    missingVariables,
    outputSchema: JSON.parse(JSON.stringify(tpl.outputSchema)),
  };
}
