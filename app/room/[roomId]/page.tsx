'use client';

import CollaboratorCursors from "@/components/CollaboratorCursors";
import SlideEditor from "@/components/SlideEditor";
import Toolbar from "@/components/Toolbar";
import { isValidRoomId } from "@/lib/id";
import { useParams, useRouter } from "next/navigation";
import Provider from "./Provider";

export default function Page() {
  const roomId = useParams().roomId as string;
  const router = useRouter();

  if (!roomId || !isValidRoomId(roomId)) {
    return (
      <div className="h-screen font-mono flex items-center justify-center">
        <div className="text-center font-mono">
          <div className="text-red-500 mb-4">Invalid Room ID</div>
          <p>Please check the link or create a new room.</p>
          <button
            onClick={() => router.push('/')}
            className="cursor-pointer mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <Provider roomId={roomId.toUpperCase()}>
      <Toolbar />
      <SlideEditor />
      <CollaboratorCursors />
    </Provider>
  );
}