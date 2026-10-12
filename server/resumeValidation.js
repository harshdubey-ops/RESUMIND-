const resumeSectionPatterns = [
  /\b(?:professional\s+)?(?:work\s+)?experience\b/i,
  /\b(?:education|academic\s+background|qualifications)\b/i,
  /\b(?:technical\s+)?skills\b/i,
  /\b(?:selected\s+)?projects\b/i,
  /\b(?:professional\s+)?summary\b/i,
  /\b(?:certifications?|licenses?)\b/i,
  /\b(?:career|employment)\s+history\b/i,
];

function hasPdfSignature(buffer) {
  return Buffer.isBuffer(buffer)
    && buffer.subarray(0, 1024).includes(Buffer.from("%PDF-"));
}

function hasResumeStructure(text) {
  if (typeof text !== "string" || !text.trim()) {
    return false;
  }

  const hasEmail = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(text);
  const hasPhone = [...text.matchAll(/\+?[\d\s().-]{8,}\d/g)].some(
    (match) => match[0].replace(/\D/g, "").length >= 10,
  );
  const matchedSections = resumeSectionPatterns.filter((pattern) => pattern.test(text)).length;

  return (hasEmail || hasPhone) && matchedSections >= 2;
}

module.exports = { hasPdfSignature, hasResumeStructure };
