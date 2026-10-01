/**
 * ตรวจว่า Passage ทุกชุดถูกต้องตามกติกาใน types.ts
 *   1. `before + answer + after` ต้องได้ข้อความเดียวกับ `full`
 *   2. Term และ Accepted Answer ต้องไม่ว่าง
 *   3. คำอธิบายต้องมีทั้งไทยและอังกฤษ
 *   4. id ต้องไม่ซ้ำ
 *   5. ต้องมีอย่างน้อยหนึ่งหัวข้อ
 *
 * รันด้วย `npm run test:content` — ถ้าผ่านไม่ เกมจะแสดงผลผิด
 * ใช้ type stripping ของ Node 22+ จึง import ไฟล์ .ts ได้ตรง ๆ
 */

const { PASSAGES } = await import("../src/data/passages.ts");
const { TOPICS } = await import("../src/data/topics.ts");

const errors = [];
const seen = new Set();

for (const p of PASSAGES) {
  const where = `[${p.id}]`;

  if (seen.has(p.id)) errors.push(`${where} id ซ้ำ`);
  seen.add(p.id);

  const rebuilt = p.cloze.before + p.cloze.answer + p.cloze.after;
  if (rebuilt !== p.full) {
    errors.push(
      `${where} before+answer+after ไม่ตรงกับ full\n` +
        `    rebuilt: ${JSON.stringify(rebuilt)}\n` +
        `    full:    ${JSON.stringify(p.full)}`,
    );
  }

  if (p.cloze.answer.trim().length === 0) errors.push(`${where} answer ว่างเปล่า`);
  for (const a of p.cloze.accepted ?? []) {
    if (a.trim().length === 0) errors.push(`${where} accepted มีค่าว่างเปล่า`);
  }
  if (!p.explanation?.th?.trim()) errors.push(`${where} คำอธิบายภาษาไทยว่างเปล่า`);
  if (!p.explanation?.en?.trim()) errors.push(`${where} คำอธิบายภาษาอังกฤษว่างเปล่า`);
}

const topicIds = new Set(TOPICS.map((t) => t.id));
for (const p of PASSAGES) {
  if (!topicIds.has(p.topic)) errors.push(`[${p.id}] topic "${p.topic}" ไม่มีใน topics.ts`);
}
for (const t of TOPICS) {
  const count = PASSAGES.filter((p) => p.topic === t.id).length;
  if (count === 0) errors.push(`หัวข้อ "${t.id}" ไม่มี Passage เลย`);
}

const byTopic = {};
for (const p of PASSAGES) byTopic[p.topic] = (byTopic[p.topic] ?? 0) + 1;

console.log(`ตรวจ Passage ทั้งหมด ${PASSAGES.length} ชุด`);
console.log(byTopic);

if (errors.length > 0) {
  console.error(`\nพบ ${errors.length} ปัญหา:`);
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log("ผ่านทั้งหมด");