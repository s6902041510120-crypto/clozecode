import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { auth, db, ensureSignedIn } from "./firebase";
import type { TopicId } from "@/types";

/**
 * โครงสร้างใน Firestore
 *   scores/{topicId}/entries/{playerCode} { name, score, uid, updatedAt }
 *
 * ข้อจำกัดที่ยอมรับไว้ตาม ADR 0004: คะแนนถูกส่งมาจาก client และตรวจสอบได้เพียงด้วย Firestore rules
 * เกมนี้ไม่มีรางวัลมูลค่าจริง จึงไม่มี Cloud Function มาคำนวณซ้ำ
 */

export interface LeaderboardEntry {
  playerCode: string;
  name: string;
  score: number;
  updatedAt: Date;
}

const entriesPath = (topic: TopicId) => collection(db, "scores", topic, "entries");

export async function submitScore(
  topic: TopicId,
  playerCode: string,
  name: string,
  score: number,
): Promise<void> {
  await ensureSignedIn();
  const uid = auth.currentUser?.uid ?? "";
  const ref = doc(entriesPath(topic), playerCode);
  const existing = await getDoc(ref);

  // เก็บเฉพาะ Best Score ต่อหัวข้อ ต่อ Player Code — ตามที่ตกลงไว้
  if (existing.exists() && existing.data().score >= score) return;

  await setDoc(ref, { name, score, uid, updatedAt: new Date() });
}

export async function fetchLeaderboard(topic: TopicId, limitCount = 20): Promise<LeaderboardEntry[]> {
  const q = query(entriesPath(topic), orderBy("score", "desc"), limit(limitCount));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    playerCode: d.id,
    name: d.data().name,
    score: d.data().score,
    updatedAt: d.data().updatedAt?.toDate() ?? new Date(0),
  }));
}