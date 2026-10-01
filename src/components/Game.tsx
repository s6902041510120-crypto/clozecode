import { useMemo, useState } from "react";
import { PASSAGES } from "@/data/passages";
import { TOPIC_BY_ID } from "@/data/topics";
import { isCorrect } from "@/lib/normalize";
import { shuffleSeeded } from "@/lib/shuffle";
import type { Lang, TopicId } from "@/types";

export const CORRECT_POINTS = 100;
export const HINT_PENALTY = 50;
export const STARTING_LIVES = 3;

export interface RoundResult {
  passageId: string;
  correct: boolean;
  usedHint: boolean;
  scoreDelta: number;
  explanation: Record<Lang, string>;
  answer: string;
}

interface Props {
  topic: TopicId;
  playerCode: string;
  lang: Lang;
  onFinish: (results: RoundResult[], livesLeft: number, ranOutOfLives: boolean) => void;
}

/**
 * Hint: เผยตัวอักษรแรกของแต่ละคำ ที่เหลือเป็นจุด เพื่อให้ผู้เล่นเดาต่อได้
 * คำสั้นสองตัวอักษรลงมาทั้งคำ เพราะบังตัวอักษรแล้วไม่เหลืออะไรให้ดู
 */
function maskAnswer(answer: string): string {
  return answer
    .split(" ")
    .map((word) => (word.length <= 2 ? word : word[0] + "•".repeat(word.length - 1)))
    .join(" ");
}

export function Game({ topic, playerCode, lang, onFinish }: Props) {
  const passages = useMemo(
    () =>
      shuffleSeeded(
        PASSAGES.filter((p) => p.topic === topic),
        `${playerCode}:${topic}`,
      ),
    [topic, playerCode],
  );

  const [index, setIndex] = useState(0);
  const [lives, setLives] = useState(STARTING_LIVES);
  const [input, setInput] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);
  const [results, setResults] = useState<RoundResult[]>([]);

  const passage = passages[index];
  const isLast = index === passages.length - 1;

  function submit() {
    const correct = isCorrect(input, passage.cloze.answer, passage.cloze.accepted);
    const scoreDelta = correct ? (showHint ? CORRECT_POINTS - HINT_PENALTY : CORRECT_POINTS) : 0;
    const nextResults: RoundResult[] = [
      ...results,
      {
        passageId: passage.id,
        correct,
        usedHint: showHint,
        scoreDelta,
        explanation: passage.explanation,
        answer: passage.cloze.answer,
      },
    ];

    setResults(nextResults);
    setWasCorrect(correct);
    setRevealed(true);

    if (!correct) {
      const left = lives - 1;
      setLives(left);
      if (left === 0) {
        onFinish(nextResults, left, true);
      }
    }
  }

  /** ปุ่มถัดไป: ผ่านโจทย์หมดแล้วจบหัวข้อ, ยังไม่หมดก็ไปโจทย์ต่อไป */
  function next() {
    if (isLast) {
      onFinish(results, lives, false);
      return;
    }
    setInput("");
    setShowHint(false);
    setRevealed(false);
    setWasCorrect(false);
    setIndex((i) => i + 1);
  }

  const rendered = (
    <>
      <span>{passage.cloze.before}</span>
      <span className="border-b-2 border-dashed border-neutral-400 px-1">
        {revealed ? passage.cloze.answer : " ".repeat(Math.max(6, passage.cloze.answer.length))}
      </span>
      <span>{passage.cloze.after}</span>
    </>
  );

  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col gap-5 px-4 py-8">
      <header className="flex items-center justify-between text-sm">
        <span className="font-medium">{TOPIC_BY_ID[topic].name[lang]}</span>
        <span className="flex items-center gap-3 text-neutral-500">
          <span className="tracking-widest">
            {index + 1} / {passages.length}
          </span>
          <span className="text-red-500" title="โอกาสที่เหลือ">
            {"♥".repeat(lives)}
            <span className="text-neutral-300">{"♥".repeat(STARTING_LIVES - lives)}</span>
          </span>
        </span>
      </header>

      <div
        className={`overflow-x-auto rounded-xl border p-5 font-mono text-sm leading-relaxed ${
          passage.kind === "code"
            ? "bg-neutral-950 text-neutral-100"
            : "bg-neutral-100 text-neutral-800"
        }`}
      >
        <pre className="whitespace-pre-wrap break-words">{rendered}</pre>
      </div>

      {!revealed ? (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
            className="flex gap-2"
          >
            <input
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="พิมพ์คำศัพท์ที่หายไป"
              className="flex-1 rounded-lg border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-900"
            />
            <button
              type="submit"
              disabled={input.trim().length === 0}
              className="rounded-lg bg-neutral-900 px-5 py-3 font-medium text-white disabled:opacity-30"
            >
              ตอบ
            </button>
          </form>

          <button
            onClick={() => setShowHint(true)}
            disabled={showHint}
            className="text-sm text-neutral-500 underline decoration-dotted disabled:no-underline"
          >
            {showHint
              ? `คำใบ้: ${maskAnswer(passage.cloze.answer)} — ${passage.explanation[lang]}`
              : "ขอคำใบ้ (หัก 50 คะแนน)"}
          </button>
        </>
      ) : (
        <div className="flex flex-col gap-3">
          <p className={wasCorrect ? "text-emerald-600" : "text-red-600"}>
            {wasCorrect
              ? `ถูกต้อง${showHint ? ` (+${CORRECT_POINTS - HINT_PENALTY})` : ` (+${CORRECT_POINTS})`}`
              : `ไม่ถูก คำตอบคือ ${passage.cloze.answer}`}
          </p>
          <p className="text-sm text-neutral-500">{passage.explanation[lang]}</p>
          <button
            onClick={next}
            autoFocus
            className="rounded-lg bg-neutral-900 px-5 py-3 font-medium text-white"
          >
            {isLast ? "จบหัวข้อ" : "ถัดไป"}
          </button>
        </div>
      )}
    </div>
  );
}