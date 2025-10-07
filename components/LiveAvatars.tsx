"use client";

import React from "react";
import { useOthers, useSelf } from "@liveblocks/react/suspense";

const IMAGE_SIZE = 32;
const AVATAR_SIZE_CLASSES = "w-8 h-8"; // 32px
const AVATAR_BASE =
  "relative flex items-center justify-center rounded-full text-xs font-medium bg-[#dbdde2] text-gray-500 ring-2 ring-gray-100";
const AVATAR_STACKED_MARGIN = "-ml-3"; // overlap subsequent avatars

export function LiveAvatars() {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 3;
  const showYouSpacer = users.length > 0; // put space before "you" if any remote users are shown

  return (
    <div className="flex flex-row items-center justify-center">
      {users.slice(0, 3).map(({ connectionId }) => (
        <Avatar
          key={connectionId}
          src={`https://liveblocks.io/avatars/avatar-${connectionId % 30}.png`}
          stacked
        />
      ))}

      {hasMoreUsers && <MoreCount count={users.length - 3} />}

      {currentUser && (
        <div className={showYouSpacer ? "ml-5" : undefined}>
          <Avatar
            src={`https://liveblocks.io/avatars/avatar-${currentUser.connectionId % 30}.png`}
          />
        </div>
      )}
    </div>
  );
}

function Avatar({ src, stacked = false }: { src: string; stacked?: boolean }) {
  return (
    <div className={[AVATAR_BASE, AVATAR_SIZE_CLASSES, stacked ? AVATAR_STACKED_MARGIN : ""].join(" ").trim()}>
      <img
        src={src}
        height={IMAGE_SIZE}
        width={IMAGE_SIZE}
        alt="Collaborator avatar"
        className="w-full h-auto rounded-full"
      />
    </div>
  );
}

function MoreCount({ count }: { count: number }) {
  return (
    <div
      aria-label={`and ${count} more`}
      className={[AVATAR_BASE, AVATAR_SIZE_CLASSES, AVATAR_STACKED_MARGIN].join(" ")}
    >
      +{count}
    </div>
  );
}