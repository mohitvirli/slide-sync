import React, { use, useEffect, useRef, useState } from "react";

interface DraggableProps {
  children: React.ReactNode;
  initialX: number;
  initialY: number;
  updatePosition: (x: number, y: number, updateHistory?: boolean) => void;
  deleteBlock: () => void;
};
// Reusable Draggable Component
export default function Draggable({ children, initialX, initialY, updatePosition, deleteBlock}: DraggableProps) {
  const [position, setPosition] = useState({ x: initialX ?? 0, y: initialY ?? 0 });
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const draggableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !draggableRef.current) return;

      const parent = draggableRef.current.parentElement;
      if (!parent) return;

      const container = parent.getBoundingClientRect();
      const draggable = draggableRef.current.getBoundingClientRect();

      let newX = e.clientX - container.left - dragStart.x;
      let newY = e.clientY - container.top - dragStart.y;

      // Constrain to parent bounds
      const minX = 0;
      const minY = 0;
      const maxX = container.width - draggable.width;
      const maxY = container.height - draggable.height;

      newX = Math.max(minX, Math.min(newX, maxX));
      newY = Math.max(minY, Math.min(newY, maxY));

      setPosition({ x: newX, y: newY });
      // updatePosition(newX, newY);
    };

    const handleMouseUp = () => {
      // recordHistory();
      // updatePosition(position.x, position.y);
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!draggableRef.current) return;

    const parent = draggableRef.current.parentElement;
    if (!parent) return;

    const containerRect = parent.getBoundingClientRect();
    setDragStart({
      x: e.clientX - containerRect.left - position.x,
      y: e.clientY - containerRect.top - position.y
    });
    setIsDragging(true);
  };

  useEffect(() => {
    // set the initial position if provided within the bounds if not provided
    const parent = draggableRef.current?.parentElement;
    if (!parent) return;

    const containerRect = parent.getBoundingClientRect();
    const pos = {
      x: initialX ?? Math.floor(Math.random() * (containerRect.width - 80)),
      y: initialY ?? Math.floor(Math.random() * (containerRect.height - 60))
    };

    if (updatePosition) { updatePosition(pos.x, pos.y); }

    setTimeout(() => setVisible(true), 0);
  }, [draggableRef.current]);

  useEffect(() => {
    if (initialX !== undefined && initialY !== undefined) {
      setPosition({ x: initialX, y: initialY });
    }
  }, [initialX, initialY]);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (deleteBlock) { deleteBlock(); }
  }

  useEffect(() => {
    if (!isDragging) {
      updatePosition(position.x, position.y);
    }
  }, [isDragging]);

  return (
    <div
      ref={draggableRef}
      onMouseDown={handleMouseDown}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        opacity: visible ? 1 : 0,
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none'
      }}
      className={`transition-opacity duration-300 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
    >
      {children}

      <button className="absolute cursor-pointer -top-3 -right-3 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
        style={{ opacity: hover ? 1 : 0, transition: 'opacity 0.3s' }}
        onClick={handleDelete}
      >
        ×
      </button>
    </div>
  );
}
