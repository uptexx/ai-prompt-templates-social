import test from "node:test";
import assert from "node:assert/strict";
import {
  renderSocialPrompt,
  listPromptTemplates,
  getStructuredOutputSchema,
} from "../src/index.mjs";

test("listPromptTemplates returns all 6 curated B2B templates and filters by category", () => {
  const all = listPromptTemplates();
  assert.equal(all.length, 6);

  const staging = listPromptTemplates("visual-staging");
  assert.equal(staging.length, 1);
  assert.equal(staging[0].id, "product-photography-staging");

  const copywriting = listPromptTemplates("copywriting");
  assert.equal(copywriting.length, 1);
  assert.equal(copywriting[0].id, "b2b-linkedin-thought-leadership");
});

test("renderSocialPrompt interpolates variables and detects zero missingVariables when complete", () => {
  const rendered = renderSocialPrompt("b2b-linkedin-thought-leadership", {
    topic: "Autonomous Social Media Workflows",
    audience: "SaaS Founders & CMOs",
    tone: "Analytical and direct",
    brandName: "NexoPost",
    callToAction: "Try nexopost.com",
  });

  assert.equal(rendered.templateId, "b2b-linkedin-thought-leadership");
  assert.equal(rendered.missingVariables.length, 0);
  assert.equal(rendered.variablesUsed.length, 5);
  assert.ok(rendered.systemPrompt.includes("SaaS Founders & CMOs"));
  assert.ok(rendered.userPrompt.includes("Autonomous Social Media Workflows"));
  assert.ok(rendered.userPrompt.includes("NexoPost"));
});

test("renderSocialPrompt identifies missing required variables and substitutes N/A safely", () => {
  const rendered = renderSocialPrompt("product-photography-staging", {
    productDescription: "Matte black espresso machine",
  });

  assert.deepEqual(rendered.missingVariables, ["surfaceMaterial", "lightingStyle"]);
  assert.deepEqual(rendered.variablesUsed, ["productDescription"]);
  assert.ok(rendered.userPrompt.includes("Matte black espresso machine"));
  assert.ok(rendered.userPrompt.includes("resting on N/A"));
});

test("getStructuredOutputSchema returns strict JSON Schema with additionalProperties=false", () => {
  const schema = getStructuredOutputSchema("multi-platform-campaign-adapter");
  assert.equal(schema.type, "object");
  assert.equal(schema.additionalProperties, false);
  assert.deepEqual(schema.required, [
    "linkedin",
    "xThread",
    "instagramCaption",
    "shortVideoHook",
  ]);
});

test("getStructuredOutputSchema returns deep clone so mutations do not corrupt catalog", () => {
  const schema1 = getStructuredOutputSchema("crisis-response-statement");
  schema1.type = "mutated";

  const schema2 = getStructuredOutputSchema("crisis-response-statement");
  assert.equal(schema2.type, "object");
});

test("throws descriptive error on unknown templateId", () => {
  assert.throws(() => renderSocialPrompt("non-existent-template", {}), /Unknown templateId/);
  assert.throws(() => getStructuredOutputSchema("non-existent-template"), /Unknown templateId/);
});

test("renderSocialPrompt supports short-form-video-hook-script and carousel-story-architect", () => {
  const videoRes = renderSocialPrompt("short-form-video-hook-script", {
    videoTopic: "AI Subtitle Synchronization",
    targetPainPoint: "Manual caption timing takes hours",
    ctaOffer: "Try NexoPost free",
  });
  assert.equal(videoRes.category, "video");
  assert.equal(videoRes.missingVariables.length, 0);
  assert.ok(videoRes.userPrompt.includes("AI Subtitle Synchronization"));

  const carouselRes = renderSocialPrompt("carousel-story-architect", {
    deckTopic: "LinkedIn Growth Systems",
    slideCount: 8,
    audienceLevel: "B2B Executives",
  });
  assert.equal(carouselRes.category, "carousel");
  assert.ok(carouselRes.userPrompt.includes("8-slide carousel deck"));
});

test("renderSocialPrompt throws TypeError when variables is not an object", () => {
  assert.throws(
    () => renderSocialPrompt("b2b-linkedin-thought-leadership", null),
    /variables must be an object/
  );
});

