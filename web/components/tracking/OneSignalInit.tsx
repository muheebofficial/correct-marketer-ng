"use client";

import { useEffect } from "react";
import OneSignal from "react-onesignal";

let initialization: Promise<void> | undefined;

export function OneSignalInit() {
  useEffect(() => {
    const appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
    if (typeof window === "undefined" || !appId) return;

    initialization ??= OneSignal.init({
      appId,
      notifyButton: {
        enable: true,
        position: "bottom-left",
        prenotify: false,
        showCredit: false,
        text: {
          "dialog.blocked.message": "Enable notifications in your browser settings to subscribe.",
          "dialog.blocked.title": "Notifications are blocked",
          "dialog.main.button.subscribe": "Subscribe",
          "dialog.main.button.unsubscribe": "Unsubscribe",
          "dialog.main.title": "Manage notifications",
          "message.action.resubscribed": "You are subscribed to notifications.",
          "message.action.subscribed": "You are subscribed to notifications.",
          "message.action.subscribing": "Subscribing to notifications...",
          "message.action.unsubscribed": "You are unsubscribed from notifications.",
          "message.prenotify": "New post notifications are available",
          "tip.state.blocked": "Notifications are blocked",
          "tip.state.subscribed": "You are subscribed",
          "tip.state.unsubscribed": "Subscribe to notifications",
        },
      },
      promptOptions: { slidedown: { prompts: [{ type: "push", autoPrompt: false, delay: {} }] } },
    })
      .then(() => {
        document.documentElement.dataset.onesignalReady = "true";
        window.dispatchEvent(new Event("onesignal-ready"));
      })
      .catch((error: unknown) => {
        initialization = undefined;
        console.error("OneSignal initialization failed:", error);
      });
  }, []);

  return null;
}