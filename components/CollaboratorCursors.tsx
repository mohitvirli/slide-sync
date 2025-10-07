'use client';

import { useMyPresence, useOthers } from '@liveblocks/react/suspense';
import { useEffect } from 'react';
// import { Cursor } from './Cursor';

const COLORS = [
  "#E57373",
  "#9575CD",
  "#4FC3F7",
  "#81C784",
  "#FFF176",
  "#FF8A65",
  "#F06292",
  "#7986CB",
];

type CursorProps = {
  x: number;
  y: number;
  color: string;
};

export default function CollaboratorCursors() {
  const users = useOthers();
  return (
    <>
      {users.map(({ connectionId, presence: { cursor } }) => (
        <Cursor
            key={connectionId}
            x={(cursor as any)?.x}
            y={(cursor as any)?.y}
            color={COLORS[connectionId % COLORS.length]}
          />
      ))}
    </>
  );
}

export function Cursor({ color, x, y }: CursorProps) {
  return (
    <svg
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
      width="24"
      height="36"
      viewBox="0 0 24 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
        fill={color}
      />
    </svg>
  );
}