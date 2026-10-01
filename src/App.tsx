import { useState } from "react";
import { Home } from "./components/Home";
import { Game, type RoundResult } from "./components/Game";
import { Review } from "./components/Review";
import { Summary } from "./components/Summary";
import { Leaderboard } from "./components/Leaderboard";
import { loadPlayerName, savePlayerName } from "./lib/storage";
import type { Lang, TopicId } from "./types";

type Screen = "home" | "game" | "review" | "summary" | "leaderboard";

export function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [topic, setTopic] = useState<TopicId>("hardware-core");
  const [playerCode, setPlayerCode] = useState("");
  const [lang, setLang] = useState<Lang>("th");
  const [results, setResults] = useState<RoundResult[]>([]);
  const [livesLeft, setLivesLeft] = useState(3);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function handleStart(topicId: TopicId, code: string, language: Lang) {
    setTopic(topicId);
    setPlayerCode(code);
    setLang(language);
    setResults([]);
    setLivesLeft(3);
    setSubmitError(null);
    setScreen("game");
  }

  function handleGameFinish(resultsList: RoundResult[], left: number, ranOutOfLives: boolean) {
    setResults(resultsList);
    setLivesLeft(left);
    if (ranOutOfLives) {
      setScreen("review");
    } else {
      setScreen("summary");
    }
  }

  function handleExit() {
    setScreen("home");
  }

  /** ตั้งชื่อแล้วส่งคะแนนขึ้น Firestore แล้วเปิดลีดเดอร์บอร์ด */
  async function handleViewLeaderboard(name: string) {
    const trimmed = name.trim();
    if (trimmed.length === 0) return;
    savePlayerName(trimmed);
    const score = results.reduce((sum, r) => sum + r.scoreDelta, 0);
    try {
      const { submitScore } = await import("./lib/leaderboard");
      await submitScore(topic, playerCode, trimmed, score);
      setSubmitError(null);
    } catch (err) {
      console.warn("ไม่สามารถส่งคะแนนขึ้นลีดเดอร์บอร์ดได้:", err);
      setSubmitError(
        `ส่งคะแนน ${score} ของคุณไม่สำเร็จ — คะแนนยังไม่ถูกบันทึก ตรวจว่าเปิด Anonymous Authentication ใน Firebase แล้วหรือยัง`,
      );
    }
    setScreen("leaderboard");
  }

  switch (screen) {
    case "home":
      return <Home onStart={handleStart} />;
    case "game":
      return <Game topic={topic} playerCode={playerCode} lang={lang} onFinish={handleGameFinish} />;
    case "review":
      return <Review results={results} lang={lang} onExit={handleExit} />;
    case "summary":
      return (
        <Summary
          results={results}
          livesLeft={livesLeft}
          playerCode={playerCode}
          playerName={loadPlayerName() ?? ""}
          onExit={handleExit}
          onViewLeaderboard={handleViewLeaderboard}
        />
      );
    case "leaderboard":
      return (
        <Leaderboard
          topic={topic}
          playerCode={playerCode}
          notice={submitError}
          onExit={handleExit}
        />
      );
    default:
      return null;
  }
}