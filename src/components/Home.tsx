import { useEffect, useState } from "react";
import { TOPICS } from "@/data/topics";
import { PASSAGES } from "@/data/passages";
import { generatePlayerCode } from "@/lib/shuffle";
import { loadPlayerCode, savePlayerCode, loadPlayerName, savePlayerName } from "@/lib/storage";
import type { Lang, TopicId } from "@/types";

const LANG_LABEL: Record<Lang, string> = { th: "ไทย", en: "English" };

export function Home({ onStart }: { onStart: (topic: TopicId, code: string, lang: Lang) => void }) {
  const [playerCode, setPlayerCode] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [lang, setLang] = useState<Lang>("th");

  useEffect(() => {
    let code = loadPlayerCode();
    if (!code) {
      code = generatePlayerCode();
      savePlayerCode(code);
    }
    setPlayerCode(code);
    setPlayerName(loadPlayerName() ?? "");
  }, []);

  function start(topic: TopicId) {
    onStart(topic, playerCode, lang);
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col gap-6 px-4 py-10">
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">ClozeCode</h1>
        <p className="mt-2 text-sm text-neutral-500">
          กูคำศัพท์อุปกรณ์คอมพิวเตอร์ที่ถูกลบออกจากข้อความจริงตอนเปิดเครื่อง
        </p>
      </header>

      <div className="flex flex-col gap-2 rounded-xl border border-neutral-200 p-4">
        <div className="flex items-center justify-between gap-2 text-sm">
          <span className="font-mono text-neutral-500">{playerCode}</span>
          <div className="flex items-center gap-1 rounded-lg bg-neutral-100 p-1">
            {(["th", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition ${
                  lang === l ? "bg-white shadow-sm" : "text-neutral-500"
                }`}
              >
                {LANG_LABEL[l]}
              </button>
            ))}
          </div>
        </div>

        {editingName ? (
          <div className="flex gap-2">
            <input
              autoFocus
              value={playerName}
              maxLength={12}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  savePlayerName(playerName.trim());
                  setEditingName(false);
                }
              }}
              placeholder="ตั้งชื่อผู้เล่น"
              className="flex-1 rounded-lg border border-neutral-300 px-3 py-1.5 text-sm outline-none focus:border-neutral-900"
            />
            <button
              onClick={() => {
                savePlayerName(playerName.trim());
                setEditingName(false);
              }}
              className="rounded-lg bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white"
            >
              บันทึก
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditingName(true)}
            className="text-left text-sm text-neutral-500 underline decoration-dotted"
          >
            {playerName ? (
              <span className="text-neutral-900">{playerName}</span>
            ) : (
              "ยังไม่ได้ตั้งชื่อ — คลิกเพื่อตั้ง (สูงสุด 12 ตัว)"
            )}
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-neutral-500">เลือกหัวข้อ</h2>
        {TOPICS.map((topic) => {
          const count = PASSAGES.filter((p) => p.topic === topic.id).length;
          return (
            <button
              key={topic.id}
              onClick={() => start(topic.id)}
              className="rounded-xl border border-neutral-200 p-4 text-left transition hover:border-neutral-900"
            >
              <div className="font-medium">{topic.name[lang]}</div>
              <div className="mt-1 text-sm text-neutral-500">{topic.description[lang]}</div>
              <div className="mt-2 text-xs text-neutral-400">{count} passages</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}