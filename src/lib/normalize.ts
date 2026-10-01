/**
 * การทำให้คำตรงกัน (Normalize) — ดูคำศัพท์ใน CONTEXT.md
 * ไม่สนตัวพิมพ์ใหญ่เล็ก ไม่สนช่องว่างภายใน ไม่สนขีดและเครื่องหมาย
 */
export function normalize(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, " ")
    .replace(/[.,!?:;'"`~^/\\()[\]{}<>|+*=]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** เทียบคำตอบของผู้เล่นกับ Term และ Accepted Answer ทั้งหมด */
export function isCorrect(input: string, answer: string, accepted: string[] = []): boolean {
  const guess = normalize(input);
  if (guess.length === 0) return false;
  return [answer, ...accepted].some((candidate) => normalize(candidate) === guess);
}