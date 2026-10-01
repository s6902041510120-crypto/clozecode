/**
 * ลำดับ Passage แบบ deterministic จาก Player Code — ดู ADR 0005
 * คนละคนได้ลำดับต่างกัน แต่คนเดิมเล่นหัวข้อเดิมซ้ำได้ลำดับเดิมเสมอ
 */

/** hash แบบ xmur3 ให้ตัวเลข seed จาก string */
function hashSeed(str: string): number {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  h = Math.imul(h ^ (h >>> 16), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  return (h ^= h >>> 16) >>> 0;
}

/** mulberry32: PRNG เร็วและคงที่เมื่อได้ seed เดิม */
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * สลับลำดับแบบไม่อิงสุ่ม ใช้ seed เดิมได้ผลเดิมทุกครั้ง
 * ใช้ Fisher–Yates เพื่อให้การกระจายสม่ำเสมอ ไม่มีอคติจากวิธี splice
 */
export function shuffleSeeded<T>(items: T[], seed: string): T[] {
  const rand = mulberry32(hashSeed(seed));
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** สร้าง Player Code รูปแบบ Fox-4821 */
const ADJECTIVES = [
  "Fox", "Nyx", "Pixel", "Byte", "Ember", "Quartz", "Cipher", "Lumen",
  "Onyx", "Rust", "Vapor", "Zephyr", "Cobalt", "Dune", "Echo", "Flux",
];

export function generatePlayerCode(): string {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const num = Math.floor(1000 + Math.random() * 9000);
  return `${adj}-${num}`;
}