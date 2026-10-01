import { useState } from "react";
import type { RoundResult } from "./Game";

/**
 * หน้าสรุปหลังเล่นครบหัวข้อ — ตั้งชื่อบนลีดเดอร์บอร์ดได้ตรงนี้ ก่อนกดดูลีดเดอร์บอร์ด
 */
export function Summary({
  results,
  livesLeft,
  playerCode,
  playerName,
  onViewLeaderboard,
  onExit,
}: {
  results: RoundResult[];
  livesLeft: number;
  playerCode: string;
  playerName: string;
  onViewLeaderboard: (name: string) => void;
  onExit: () => void;
}) {
  const [name, setName] = useState(playerName);
  const trimmed = name.trim();
  const canSubmit = trimmed.length > 0 && trimmed.length <= 12;

  const score = results.reduce((sum, r) => sum + r.scoreDelta, 0);
  const correctCount = results.filter((r) => r.correct).length;

  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col gap-5 px-4 py-10">
      <header>
        <h1 className="text-2xl font-bold">เล่นครบหัวข้อแล้ว</h1>
        <p className="mt-1 font-mono text-sm text-neutral-500">{playerCode}</p>
      </header>

      <div className="grid grid-cols-3 gap-3">
        <Stat label="คะแนน" value={score} />
        <Stat label="ตอบถูก" value={`${correctCount}/${results.length}`} />
        <Stat label="โอกาสเหลือ" value={livesLeft} />
      </div>

      <div className="rounded-xl border border-neutral-200 p-4">
        <label className="text-sm font-medium" htmlFor="player-name">
          ชื่อบนลีดเดอร์บอร์ด
        </label>
        <input
          id="player-name"
          autoFocus
          value={name}
          maxLength={12}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && canSubmit) onViewLeaderboard(trimmed);
          }}
          placeholder="ตั้งชื่อที่จะแสดงบนลีดเดอร์บอร์ด"
          className="mt-2 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
        />
        <p className="mt-1 text-xs text-neutral-400">
          {trimmed.length === 0
            ? "ต้องตั้งชื่อก่อนจึงจะส่งคะแนนขึ้นลีดเดอร์บอร์ดได้"
            : `เหลืออีก ${12 - trimmed.length} ตัวอักษร`}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onViewLeaderboard(trimmed)}
          disabled={!canSubmit}
          className="flex-1 rounded-lg border border-neutral-900 px-5 py-3 font-medium disabled:opacity-30"
        >
          ดูลีดเดอร์บอร์ด
        </button>
        <button
          onClick={onExit}
          className="flex-1 rounded-lg bg-neutral-900 px-5 py-3 font-medium text-white"
        >
          กลับหน้าแรก
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-neutral-200 p-3 text-center">
      <div className="text-xl font-bold">{value}</div>
      <div className="mt-0.5 text-xs text-neutral-500">{label}</div>
    </div>
  );
}