const test = require("node:test");
const assert = require("node:assert/strict");
const { hasPdfSignature, hasResumeStructure } = require("./resumeValidation");

test("accepts a PDF signature near the start of the file", () => {
  const pdf = Buffer.from("%PDF-1.7\ncontent");

  assert.equal(hasPdfSignature(pdf), true);
});

test("rejects a non-PDF file even if it contains resume-like text", () => {
  assert.equal(hasPdfSignature(Buffer.from("Name, Email, Experience, Education")), false);
});

test("recognizes resume text with contact details and multiple resume sections", () => {
  const text = `
    Alex Example
    alex@example.com | +1 (555) 123-4567
    Professional Summary
    Experienced software engineer.
    Work Experience
    Senior Developer, 2022-present
    Education
    B.S. Computer Science
  `;

  assert.equal(hasResumeStructure(text), true);
});

test("rejects a non-resume document without resume sections", () => {
  const text = `
    Invoice
    billing@example.com
    Payment due within 30 days.
    Item description and total amount.
  `;

  assert.equal(hasResumeStructure(text), false);
});

test("rejects resume-like text without contact details", () => {
  const text = "Work Experience\nEducation\nSkills\nProjects";

  assert.equal(hasResumeStructure(text), false);
});
