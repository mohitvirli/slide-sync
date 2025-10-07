"use client";
import { useMutation, useMyPresence, useStorage } from "@liveblocks/react/suspense";
import Draggable from "./Draggable";

type Block = {
  id: string;
  text: string;
  x: number;
  y: number;
};

export default function SlideEditor() {
  const blocksMap = useStorage((root) => root.blocks as unknown as Map<string, Block>);
  const [, updateMyPresence] = useMyPresence();

  const handleUpdatePosition = useMutation(({ storage, setMyPresence }, id: string, x: number, y: number) => {
    const map = storage.get("blocks") as any;
    const current = map?.get(id) as Block | undefined;
    if (!current) return;
    if (current.x === x && current.y === y) return;
    map.set(id, { ...current, x, y });
    setMyPresence({}, { addToHistory: false });
  }, []);

  const handleUpdateText = useMutation(({ storage }, id: string, text: string) => {
    const map = storage.get("blocks") as any;
    const current = map?.get(id) as Block | undefined;
    if (!current) return;
    if (current.text === text) return;
    map.set(id, { ...current, text });
  }, []);

  const handleDeleteBlock = useMutation(({ storage }, id: string) => {
    const map = storage.get("blocks") as any;
    map?.delete(id);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    updateMyPresence({ cursor: { x: Math.floor(e.clientX), y: Math.floor(e.clientY) } });
  };

  const handlePointerLeave = () => {
    updateMyPresence({ cursor: null });
  };

  return (
    <div className="min-h-screen font-mono flex flex-col items-center justify-center px-4 z-10 relative"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}>
      <div className="mt-16 border border-white/25 rounded relative flex-1 w-full min-h-[70vh]">
        {blocksMap && Array.from(blocksMap.values()).map((block) => {
          return (
            <Draggable key={block.id}
              initialX={block.x}
              initialY={block.y}
              updatePosition={(x, y) => handleUpdatePosition(block.id, x, y)}
              deleteBlock={() => handleDeleteBlock(block.id)}
              >
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleUpdateText(block.id, e.currentTarget.innerText)}
                className="px-4 py-2 inline-block border min-w-[5rem] rounded bg-white/10 shadow focus:outline-0 whitespace-pre-wrap break-words"
              >
                {block.text}
              </div>
            </Draggable>
          );
        })}
      </div>
    </div>
  );
}