/** ประเภทข้อมูลของเนื้อหาเกม ดูรายละเอียดคำศัพท์ใน CONTEXT.md */

export type TopicId = "hardware-core" | "hardware-display" | "hardware-diag";

export interface Topic {
  id: TopicId;
  name: Record<Lang, string>;
  description: Record<Lang, string>;
}

/** รูปแบบข้อความตั้งต้นที่ถูกเจาะช่องว่าง */
export type PassageKind = "code" | "log";

/**
 * ช่องว่างหนึ่งช่องใน Passage
 * `answer` คือ Term, `accepted` คือ Accepted Answer ที่ถือว่าถูกเหมือนกัน
 * `before`/`after` คือข้อความสองฝั่งของช่องว่าง เอาไปต่อกันให้ได้ข้อความเต็ม
 */
export interface Cloze {
  answer: string;
  accepted?: string[];
  /** ข้อความหลัง Term ที่ถูกลบออกไป ไม่รวมเครื่องหมายจุดจบประโยค */
  before: string;
  after: string;
}

/** Passage หนึ่งชุด มี Cloze หนึ่งช่องเสมอ (ดู ADR 0003) */
export interface Passage {
  id: string;
  topic: TopicId;
  kind: PassageKind;
  /** ข้อความเต็มก่อนเจาะช่องว่าง ใช้แสดงผลเต็มหลังจบเกม */
  full: string;
  cloze: Cloze;
  /** คำอธิบายคำตอบ ภาษาไทย 1–2 ประโยค */
  explanation: Record<Lang, string>;
}

export type Lang = "th" | "en";

/** Hint ที่ผู้เล่นขอเปิด สุ่มจากคำอธิบายเป็นภาษาที่เล่อก */
export type Hint = string;

/** คำตอบที่ผู้เล่นพิมพ์ พร้อมผลการตรวจ */
export interface AnswerResult {
  correct: boolean;
  usedHint: boolean;
}