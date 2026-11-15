"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useTranslation } from "react-i18next";

const VOLUME = 0.25;
const STORAGE_KEY = "moana-sound";

export default function WaterSound() {
  const { t } = useTranslation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = VOLUME;
    audio.loop = true;

    let cancelled = false;

    const resumeIfEnabled = async () => {
      if (localStorage.getItem(STORAGE_KEY) !== "on") return;

      try {
        await audio.play();
        if (!cancelled) setPlaying(true);
      } catch {
        if (!cancelled) setPlaying(false);
      }
    };

    void resumeIfEnabled();

    const handleVisibilityChange = async () => {
      if (document.hidden) {
        audio.pause();
        setPlaying(false);
      } else {
        await resumeIfEnabled();
      }
    };

    const handlePageHide = () => {
      audio.pause();
      audio.currentTime = 0;
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const toggleSound = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      localStorage.setItem(STORAGE_KEY, "off");
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
      localStorage.setItem(STORAGE_KEY, "on");
    } catch {
      setPlaying(false);
    }
  };

  const label = playing ? t("sound.on") : t("sound.off");

  return (
    <>
      <audio ref={audioRef} src="/audios/ocean-waves.mp3" preload="none" loop />

      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={playing}
        aria-label={label}
        title={label}
        className="fixed bottom-6 end-6 z-50 flex items-center gap-2 rounded-full border border-white/30 bg-background/80 px-4 py-2.5 text-sm font-medium text-slate-800 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-background active:scale-95"
      >
        {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
        <span>{label}</span>
      </button>
    </>
  );
}
