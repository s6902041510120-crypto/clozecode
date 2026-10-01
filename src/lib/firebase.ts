import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(config);

export const db = getFirestore(app);
export const auth = getAuth(app);

let authReady: Promise<void> | null = null;

/** เข้าสู่ระบบแบบไม่ระบุตัวตน เพื่อให้ Firestore rules อ้างอิง user ได้ */
export function ensureSignedIn(): Promise<void> {
  if (!authReady) {
    authReady = signInAnonymously(auth).then(() => undefined);
  }
  return authReady;
}