import { useEffect, useState } from "react";
import type { LeaderboardEntry } from "@/lib/leaderboard";
import { TOPIC_BY_ID } from "@/data/topics";
import type { TopicId } from "@/types";

export function Leaderboard({
  topic,
  playerCode,
  notice,
  onExit,
}: {
  topic: TopicId;
  playerCode: string;
  /** ข้อความจากการส่งคะแนน เช่น เขียน Firestore ไม่สำเร็จ */
  notice?: string | null;
  onExit: () => void;
}) {
  const [entries, setEntries] = useState<LeaderboardEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    // โหลด Firebase เฉพาะตอนเปิดหน้านี้ เพื่อไม่ให้ผู้เล่นที่ไม่แตะลีดเดอร์บอร์ดต้องรอดาวน์โหลด SDK
    import("@/lib/leaderboard")
      .then(({ fetchLeaderboard }) => fetchLeaderboard(topic))
      .then((rows) => !cancelled && setEntries(rows))
      .catch(() => !cancelled && setError("โหลดลีดเดอร์บอร์ดไม่สำเร็จ ตรวจ Firestore rules ด้วย"));
    return () => {
      cancelled = true;
    };
  }, [topic]);

  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col gap-5 px-4 py-10">
      <header>
        <h1 className="text-2xl font-bold">ลีดเดอร์บอร์ด</h1>
        <p className="mt-1 text-sm text-neutral-500">{TOPIC_BY_ID[topic].name.th}</p>
      </header>

      {notice && <p className="text-sm text-amber-700">{notice}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!error && entries === null && <p className="text-sm text-neutral-500">กำลังโหลด…</p>}
      {entries !== null && entries.length === 0 && (
        <p className="text-sm text-neutral-500">ยังไม่มีคะแนนในหัวข้อนี้ เล่นเป็นคนแรกเสีย</p>
      )}

      <ol className="flex flex-col gap-2">
        {entries?.map((e, i) => (
          <li
            key={e.playerCode}
            className={`flex items-center gap-3 rounded-xl border p-3 ${
              e.playerCode === playerCode ? "border-neutral-900 bg-neutral-50" : "border-neutral-200"
            }`}
          >
            <span className="w-6 text-center font-mono text-neutral-400">{i + 1}</span>
            <span className="flex-1 truncate">{e.name || e.playerCode}</span>
            <span className="font-mono font-medium">{e.score}</span>
          </li>
        ))}
      </ol>

      <button
        onClick={onExit}
        className="rounded-lg bg-neutral-900 px-5 py-3 font-medium text-white"
      >
        กลับ
      </button>
    </div>
  );
}