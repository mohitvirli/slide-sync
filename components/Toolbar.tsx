'use client';

import { useCanRedo, useCanUndo, useMutation, useRedo, useUndo } from '@liveblocks/react/suspense';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { LiveAvatars } from './LiveAvatars';

export default function Toolbar() {

  const roomId = useParams().roomId as string;
  const canUndo = useCanUndo();
  const undo = useUndo();
  const canRedo = useCanRedo();
  const redo = useRedo();

  const addTextBlock = useMutation(({ storage }) => {
    const blocks = storage.get("blocks");
    const id = nanoid();
    const length = (blocks as any)?.size || 0;
    (blocks as any)?.set(id, { id: id, text: "Click to edit", x: 100 + length * 40, y: 100 + length * 50 });
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard! Share it with collaborators.');
  };

  return (
    <div className="fixed font-mono p-4 flex justify-between items-center w-full z-20">
      <div className="flex items-center gap-4">
        <Link href="/" className="font-bold">SlideSync</Link>
        <div onClick={handleShare} className="border p-2 rounded text-xs text-gray-500 cursor-copy">Room ID: <b>{roomId} 🔗</b></div>
      </div>
      <div className="flex gap-2">
        <LiveAvatars />
        <button className="cursor-pointer px-3 py-2 rounded border hover:bg-white/10" onClick={() => addTextBlock()}>Add Text Block</button>

        <div className="flex gap-2 border-l border-gray-300 pl-3">
          <button
            onClick={undo}
            disabled={!canUndo}
            className="px-3 py-2 cursor-pointer bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Undo
          </button>

          <button
            onClick={redo}
            disabled={!canRedo}
            className="px-3 py-2 cursor-pointer bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Redo
          </button>
        </div>
      </div>
    </div>
  );
}