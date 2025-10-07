import { customAlphabet } from 'nanoid/non-secure';

// Use a readable alphabet (no O, 0, I, 1) to avoid confusion.
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const LENGTH = 4;

const gen = customAlphabet(ALPHABET, LENGTH);

export function generateRoomId(): string {
  return gen();
}

export function isValidRoomId(id: string): boolean {
  return new RegExp(`^[${ALPHABET}]{${LENGTH}}$`).test(id.toUpperCase());
}

export function normalizeRoomId(id: string): string {
  return id.trim().toUpperCase();
}