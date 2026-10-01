import type { RoundResult } from "./Game";
import type { Lang } from "@/types";

/**
 * Review — หน้าจอที่ต้องผ่านก่อนออกจากหัวข้อเมื่อ Lives หมด (ดู ADR 0002)
 */
export function Review({
  results,
  lang,
  onExit,
}: {
  results: RoundResult[];
  lang: Lang;
  onExit: () => void;
}) {
  const missed = results.filter((r) => !r.correct);

  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col gap-5 px-4 py-10">
      <header>
        <h1 className="text-2xl font-bold">โอกาสหมด หัวข้อจบแล้ว</h1>
        <p className="mt-1 text-sm text-neutral-500">
          คุณพลาด {missed.length} คำ ทบทวนก่อนออกไปหัวข้อถัดไป
        </p>
      </header>

      <div className="flex flex-col gap-3">
        {missed.map((r) => (
          <div key={r.passageId} className="rounded-xl border border-neutral-200 p-4">
            <div className="font-mono font-medium">{r.answer}</div>
            <p className="mt-1 text-sm text-neutral-600">{r.explanation[lang]}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onExit}
        className="rounded-lg bg-neutral-900 px-5 py-3 font-medium text-white"
      >
        กลับหน้าแรก
      </button>
    </div>
  );
}