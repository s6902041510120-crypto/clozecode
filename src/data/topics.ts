import type { Topic } from "@/types";

export const TOPICS: Topic[] = [
  {
    id: "hardware-core",
    name: { th: "ชิ้นส่วนหลัก", en: "Core Components" },
    description: {
      th: "อุปกรณ์ที่ต้องมีในเครื่อง: CPU, RAM, ฮาร์ดดิสก์, มอเบอร์บอร์ด, ไฟ, พัดลม",
      en: "What sits inside the case: CPU, RAM, disks, motherboard, power supply, fans",
    },
  },
  {
    id: "hardware-display",
    name: { th: "การ์ดจอและความแรง", en: "GPU and Performance" },
    description: {
      th: "ผลลัพธ์ของเครื่อง: ความเร็ว, ความร้อน, การ์ดจอ, ความละเอียดจอ และการวัดประสิทธิภาพ",
      en: "How fast it feels: clocks, heat, the graphics card, screen resolution, benchmarks",
    },
  },
  {
    id: "hardware-diag",
    name: { th: "ตรวจอาการเสีย", en: "Troubleshooting" },
    description: {
      th: "อ่านอาการและข้อความเตือนจากเครื่อง ทั้งไฟดับ, จอฟ้า, ฮาร์ดดิสก์เสีย",
      en: "Read symptoms and warning messages: no power, blue screen, failing disk",
    },
  },
];

export const TOPIC_BY_ID = Object.fromEntries(TOPICS.map((t) => [t.id, t])) as Record<
  Topic["id"],
  Topic
>;
