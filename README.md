# ClozeCode

เกมเว็บที่ผู้เล่นกู้คำศัพท์อุปกรณ์คอมพิวเตอร์ที่ถูกลบออกจากข้อความจริงตอนเปิดเครื่อง —
ผลลัพธ์จากคำสั่งตรวจเครื่อง, log ของระบบ, ข้อความเตือน — แล้วพิมพ์คำที่หายไปกลับเข้าไป

รอบแรกเจาะฮาร์ดแวร์ 3 หัวข้อ: ชิ้นส่วนหลัก, การ์ดจอและความแรง, ตรวจอาการเสีย

คำศัพท์ทั้งหมดเป็นภาษาอังกฤษ ส่วนคำอธิบายสลับไทย/อังกฤษได้ตอนเล่น

**เล่นออนไลน์:** https://clozecode.vercel.app

Deploy บน Vercel ต่อกับ GitHub repo โดยตรง — push ลง `main` แล้วขึ้นเว็บเอง

## เริ่มเล่น

```bash
npm install
npm run dev
```

เปิด http://localhost:5173

## คำสั่งที่ใช้บ่อย

| คำสั่ง | ทำอะไร |
| --- | --- |
| `npm run dev` | dev server |
| `npm run build` | typecheck แล้ว build ลง `dist/` |
| `npm run typecheck` | ตรวจชนิดข้อมูลอย่างเดียว ไม่ emit |
| `npm run test:content` | ตรวจว่า Passage ทุกชุดประกอบกลับเป็น `full` ได้ตรง |

## Firestore

ลีดเดอร์บอร์ดเก็บใน Firestore ต้องตั้งค่า Firebase ก่อน

1. คัดลอก `.env.example` เป็น `.env.local` แล้วกรอกค่าจาก Firebase console
2. เปิด **Authentication → Sign-in method → Anonymous**
3. สร้าง Firestore database
4. วาง `firestore.rules` ไว้ในโปรเจกต์ แล้ว publish ผ่าน Firebase console หรือ
   `firebase deploy --only firestore:rules`

`.env.local` ถูก gitignore ไว้ ไม่ commit ค่าที่กรอกจริง

## Deploy

ใช้ Vercel ต่อกับ repo นี้อยู่แล้ว ไม่ต้องตั้งอะไรเพิ่ม — `VITE_FIREBASE_*` ทั้ง 6 ตัวถูก
เก็บเป็น Environment Variables ของโปรเจกต์ Vercel แล้ว

push ลง `main` เพื่อ deploy หรือ deploy เองจากเครื่องก็ได้

```bash
npm install -g vercel
vercel login
vercel deploy --prod
```

### โครงสร้างข้อมูล

```
scores/{topicId}/entries/{playerCode}
  { name, score, uid, updatedAt }
```

เก็บเฉพาะ Best Score ต่อหนึ่งหัวข้อต่อหนึ่ง Player Code

## เนื้อหา

อยู่ใน `src/data/` — `topics.ts` คือหัวข้อ, `passages.ts` คือชุดโจทย์

กติกาของ Passage หนึ่งชุด: `before + answer + after` ต้องได้ข้อความเดียวกับ `full` เสมอ
`npm run test:content` จะตรวจกติกานี้ ถ้าไม่ตรงเกมจะแสดงผลผิด

หนึ่ง Passage มีหนึ่งช่องว่างเสมอ และ `accepted` คือ Accepted Answer ที่ถือว่าถูกด้วย

## กติกาเกม

- Lives 3 ต่อหัวข้อ เต็มใหม่ทุกครั้งที่เข้าหัวข้อ
- ตอบถูก 100 คะแนน เปิดคำใบ้หัก 50
- หมด Lives แล้วหัวข้อจบ และต้องดู Review ที่รวมคำที่พลาดก่อนออก
- ลำดับ Passage สุ่มแบบ deterministic จาก Player Code ทำให้ทุกคนเจอชุดโจทย์เดียวกันคนละลำดับ

รายละเอียดทั้งหมดอ่านที่ `CONTEXT.md` และ `docs/adr/`