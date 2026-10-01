/** เก็บข้อมูลผู้เล่นไว้ในเบราว์เซอร์ (localStorage) */

const PLAYER_CODE_KEY = "clozecode.playerCode";
const PLAYER_NAME_KEY = "clozecode.playerName";

export function loadPlayerCode(): string | null {
  return localStorage.getItem(PLAYER_CODE_KEY);
}

export function savePlayerCode(code: string): void {
  localStorage.setItem(PLAYER_CODE_KEY, code);
}

export function loadPlayerName(): string | null {
  return localStorage.getItem(PLAYER_NAME_KEY);
}

export function savePlayerName(name: string): void {
  localStorage.setItem(PLAYER_NAME_KEY, name);
}