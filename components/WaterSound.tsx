"use client";

import { useEffect, useRef, useState } from "react";

export default function WaterSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = 0.80; //80%
    audio.loop = true;

    // Check user's previous preference
    const saved = localStorage.getItem("moana-sound");

    if (saved === "on") {
      setPlaying(false);
    }

    // Handle leaving / returning to the tab
    const handleVisibilityChange = async () => {
      if (document.hidden) {
        // User left the website
        audio.pause();
        setPlaying(false);
      } else {
        // User came back
        const soundEnabled = localStorage.getItem("moana-sound");

        if (soundEnabled === "on") {
          try {
            await audio.play();
            setPlaying(true);
          } catch (error) {
            console.log("Could not resume ocean sound:", error);
            setPlaying(false);
          }
        }
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    // Stop sound when component/page is unloaded
    const handlePageHide = () => {
      audio.pause();
      audio.currentTime = 0;
    };

    window.addEventListener("pagehide", handlePageHide);

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      window.removeEventListener("pagehide", handlePageHide);

      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const toggleSound = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      if (playing) {
        audio.pause();
        setPlaying(false);

        localStorage.setItem("moana-sound", "off");
      } else {
        audio.volume = 0.12;
        audio.loop = true;

        await audio.play();

        setPlaying(true);
        localStorage.setItem("moana-sound", "on");
      }
    } catch (error) {
      console.error("Ocean sound error:", error);
      setPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audios/ocean-waves.mp3"
        preload="auto"
        loop
      />

      <button
        onClick={toggleSound}
        className="
          fixed
          bottom-6
          right-6
          z-50
          flex
          items-center
          gap-2
          rounded-full
          border
          border-white/30
          bg-background/80
          px-4
          py-2.5
          text-sm
          font-medium
          text-slate-800
          shadow-lg
          backdrop-blur-md
          transition-all
          duration-300
          hover:scale-105
          hover:bg-background
          active:scale-95
        "
      >
        <span className="text-base">
          {playing ? "🔊" : "🌊"}
        </span>

        <span>
          {playing ? "Sound On" : "Sound Off"}
        </span>
      </button>
    </>
  );
}

