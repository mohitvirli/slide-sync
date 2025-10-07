'use client';

import { LiveMap } from "@liveblocks/client";
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";

export default function Provider({ children, roomId }: { children: React.ReactNode, roomId: string }) {
  const publicApiKey = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!;

  return (
    <LiveblocksProvider publicApiKey={publicApiKey} throttle={16}>
      <RoomProvider id={roomId}
        initialPresence={{ cursor: null }}
        initialStorage={{
          blocks: new LiveMap()
        }}>
        <ClientSideSuspense fallback={<Loader />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}

export function Loader() {
  return <div className="h-screen flex items-center justify-center">Loading App...</div>;
}
