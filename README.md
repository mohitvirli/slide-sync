## Slides App

Collaborative slide playground built with Next.js 15, Tailwind CSS, and Liveblocks.

Features
- Create or join a room using a short 4‑char ID (see `lib/id.ts`).
- Real‑time collaborative editing powered by Liveblocks.
- Draggable, editable text blocks inside a bounded slide area.
- Live presence: avatars and remote cursors.
- Tailwind‑only styling.

## Setup

1) Install dependencies

```bash
npm install
# or: pnpm install / yarn install / bun install
```

2) Environment

Create a `.env.local` with your Liveblocks keys (example):

```bash
LIVEBLOCKS_PUBLIC_KEY=your_public_key
```

3) Run the dev server

```bash
npm run dev
```

Open http://localhost:3000.

## How it works

- Room IDs: `generateRoomId()` returns a readable 4‑char code (A–Z, 2–9). `normalizeRoomId()` uppercases input; `isValidRoomId()` validates format.
- Provider: Each room page (`app/room/[roomId]/page.tsx`) wraps content with a `Provider` that mounts the Liveblocks `RoomProvider`.
- Slide editor: `components/SlideEditor.tsx` renders text blocks from Liveblocks storage (`storage.blocks`).
	- Dragging is bounded to the slide container using a custom `components/Draggable.tsx`.
	- Text blocks are `contentEditable` and saved on blur.
	- Presence is updated on every pointer move (no throttling), and cleared on pointer leave.
- Cursors & avatars: [Reused from the Liveblocks examples]
	- `components/CollaboratorCursors.tsx` shows remote cursors and can optionally display labels.
	- `components/LiveAvatars.tsx` shows a compact stack of participant avatars using Tailwind classes.

## Commands

```bash
npm run dev        # start dev server
npm run build      # production build
npm run start      # start production server
```

## Folder structure (partial)

```
app/
	room/[roomId]/page.tsx      # Room page with Provider
components/
	SlideEditor.tsx             # Draggable, editable blocks
	Draggable.tsx               # Simple bounded drag logic
	CollaboratorCursors.tsx     # Remote cursors
	LiveAvatars.tsx             # Participant avatars (Tailwind only)
	Toolbar.tsx                 # Add block, undo/redo, copy room link
lib/
	id.ts                       # 4‑char ID utils
```

## Improvements
- Handle multiple slides per room.
- Mobile support: Dragging and text editing need work on touch devices.
- Pointer throttling, to reduce network chatter.
- Better error handling and user feedback for network issues.
- Authentication and user profiles.
