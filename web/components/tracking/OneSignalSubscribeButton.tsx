"use client";

import { useEffect, useState } from "react";
import OneSignal from "react-onesignal";

export function OneSignalSubscribeButton() {
  const [visible, setVisible] = useState(false);
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID) return;

    const syncVisibility = () => {
      const denied = typeof Notification !== "undefined" && Notification.permission === "denied";
      setVisible(!denied && !OneSignal.User.PushSubscription.optedIn);
    };
    let attached = false;
    const attach = () => {
      if (attached) return;
      attached = true;
      syncVisibility();
      OneSignal.Notifications.addEventListener("permissionChange", syncVisibility);
      OneSignal.User.PushSubscription.addEventListener("change", syncVisibility);
    };
    const detach = () => {
      if (!attached) return;
      OneSignal.Notifications.removeEventListener("permissionChange", syncVisibility);
      OneSignal.User.PushSubscription.removeEventListener("change", syncVisibility);
      attached = false;
    };

    if (document.documentElement.dataset.onesignalReady === "true") attach();
    window.addEventListener("onesignal-ready", attach);
    return () => {
      window.removeEventListener("onesignal-ready", attach);
      detach();
    };
  }, []);

  if (!visible) return null;

  const prompt = async () => {
    setRequesting(true);
    try {
      if (!OneSignal.Notifications.isPushSupported()) {
        setVisible(false);
        return;
      }
      await OneSignal.Slidedown.promptPush();
    } catch (error) {
      console.error("Could not open the OneSignal notification prompt:", error);
    } finally {
      setRequesting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={() => void prompt()}
      disabled={requesting}
      className="min-h-11 rounded-full border border-forest bg-ivory px-5 py-2 font-sub text-sm font-bold text-forest transition-colors hover:bg-forest hover:text-ivory disabled:cursor-wait disabled:opacity-70"
    >
      {requesting ? "Opening notification settings..." : "Get notified of new posts"}
    </button>
  );
}