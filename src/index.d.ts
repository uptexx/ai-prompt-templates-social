export type PromptCategory =
  | "copywriting"
  | "campaign"
  | "visual-staging"
  | "video"
  | "carousel"
  | "communications";

export interface PromptTemplateSummary {
  id: string;
  name: string;
  category: PromptCategory;
  description: string;
  requiredVariables: string[];
  optionalVariables: string[];
}

export interface RenderedPromptResult {
  templateId: string;
  category: PromptCategory;
  systemPrompt: string;
  userPrompt: string;
  variablesUsed: string[];
  missingVariables: string[];
  outputSchema: Record<string, unknown>;
}

export declare function listPromptTemplates(category?: string): PromptTemplateSummary[];
export declare function getStructuredOutputSchema(
  templateId: string
): Record<string, unknown>;
export declare function renderSocialPrompt(
  templateId: string,
  variables?: Record<string, string | number | undefined>
): RenderedPromptResult;
