"use client";

import { useEffect } from "react";
import { track, type TrackEvent } from "@/lib/track";

/** Fires one analytics event when a page is viewed (e.g. case_study_view). Renders nothing. */
export function TrackView({ event, params }: { event: TrackEvent; params?: Record<string, string | number | boolean> }) {
  useEffect(() => {
    track(event, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
