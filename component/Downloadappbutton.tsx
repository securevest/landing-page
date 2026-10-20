"use client";

import { useEffect, useState } from "react";
import {
  APP_STORE_URL,
  PLAY_STORE_URL,
  DOWNLOAD_FALLBACK_HREF,
} from "./Applinks";
import { SecureVestButton } from "./button";

type Platform = "ios" | "android" | null;

const detectPlatform = (): Platform => {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return "android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  // iPadOS reports itself as a Mac, but a Mac has no touch screen
  if (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1) return "ios";
  return null;
};

export const DownloadAppButton = ({
  title = "Download the app",
  fill,
  full,
}: {
  title?: string;
  fill?: boolean;
  full?: boolean;
}) => {
  // null on the server and on first render, so there is no hydration mismatch
  const [platform, setPlatform] = useState<Platform>(null);

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const href =
    platform === "ios"
      ? APP_STORE_URL
      : platform === "android"
        ? PLAY_STORE_URL
        : DOWNLOAD_FALLBACK_HREF;

  return <SecureVestButton title={title} href={href} fill={fill} full={full} />;
};
