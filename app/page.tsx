'use client';

import { generateRoomId, isValidRoomId, normalizeRoomId } from "@/lib/id";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [joinId, setJoinId] = useState("");

  const createRoom = () => {
    const id = generateRoomId();
    router.push(`/room/${id}`);
  };

  const joinRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = normalizeRoomId(joinId);
    if (!isValidRoomId(id)) return;
    router.push(`/room/${id}`);
  };

  return (
     <div className="min-h-screen font-mono flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        <Image src="/next.svg" alt="Next.js" width={180} height={38} />
        <h1 className="text-3xl font-bold mt-6">Slides App</h1>
        <p className="mt-2 text-sm text-muted-foreground">Create a room and collaborate in real time.</p>

        <div className="mt-8 flex flex-col gap-3 justify-center">
          <button onClick={createRoom} className="px-4 py-2 rounded bg-blue-600 text-white cursor-pointer hover:bg-blue-700">
            Create Room
          </button>

          <p> or </p>
          <form onSubmit={joinRoom} className="flex gap-2 items-center">
            <input
              value={joinId}
              onChange={(e) => setJoinId(e.target.value)}
              placeholder="Enter room id"
              className="px-3 py-2 border rounded flex-1"
            />
            <button type="submit" className="px-3 py-2 rounded border cursor-pointer hover:bg-white/10">
              Join
            </button>
          </form>
        </div>

        <p className="mt-6 text-xs text-gray-500">Tip: share the room id or the URL to collaborate.</p>
      </div>
    </div>
  );
}
