import React, { useState, useEffect, useRef, useCallback } from "react";
import { fetchPreviewUrl } from "./iTunesApi";

const CIRCUMFERENCE = Math.PI * 2 * 20; // r=20

const AudioPreview = ({ artist, album, isActive, onPlayStateChange }) => {
  const [status, setStatus] = useState("idle"); // idle|loading|playing|paused|not-found|error
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const previewDataRef = useRef(null);

  const cleanup = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setStatus("idle");
    setProgress(0);
    onPlayStateChange && onPlayStateChange(false);
  }, [onPlayStateChange]);

  // Stop playback when slide becomes inactive
  useEffect(() => {
    if (!isActive) cleanup();
  }, [isActive, cleanup]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleClick = async (e) => {
    e.stopPropagation();

    if (status === "playing") {
      audioRef.current.pause();
      setStatus("paused");
      onPlayStateChange && onPlayStateChange(false);
      return;
    }

    if (status === "paused") {
      audioRef.current.play();
      setStatus("playing");
      onPlayStateChange && onPlayStateChange(true);
      return;
    }

    if (status === "not-found") return;

    // idle or error — attempt to fetch and play
    setStatus("loading");

    try {
      if (!previewDataRef.current) {
        const data = await fetchPreviewUrl(artist, album);
        if (!data) {
          setStatus("not-found");
          return;
        }
        previewDataRef.current = data;
      }

      const audio = new Audio(previewDataRef.current.previewUrl);
      audioRef.current = audio;

      audio.addEventListener("timeupdate", () => {
        if (audio.duration) {
          setProgress(audio.currentTime / audio.duration);
        }
      });

      audio.addEventListener("ended", () => {
        setStatus("idle");
        setProgress(0);
        onPlayStateChange && onPlayStateChange(false);
      });

      audio.addEventListener("error", () => {
        setStatus("error");
        onPlayStateChange && onPlayStateChange(false);
      });

      await audio.play();
      setStatus("playing");
      onPlayStateChange && onPlayStateChange(true);
    } catch {
      setStatus("error");
      onPlayStateChange && onPlayStateChange(false);
    }
  };

  const iconName =
    status === "playing"
      ? "pause"
      : status === "not-found" || status === "error"
        ? "music_off"
        : "play_arrow";

  const isDisabled = status === "not-found";
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <button
      className={`audio-preview audio-preview--${status}`}
      onClick={handleClick}
      disabled={isDisabled}
      title={
        status === "not-found"
          ? "No preview available"
          : status === "error"
            ? "Error — click to retry"
            : previewDataRef.current
              ? previewDataRef.current.trackName
              : "Play preview"
      }
    >
      <svg className="audio-preview__ring" viewBox="0 0 48 48">
        <circle
          className="audio-preview__ring-bg"
          cx="24"
          cy="24"
          r="20"
          fill="none"
          strokeWidth="3"
        />
        <circle
          className="audio-preview__ring-progress"
          cx="24"
          cy="24"
          r="20"
          fill="none"
          strokeWidth="3"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          transform="rotate(-90 24 24)"
        />
      </svg>
      <span className="material-symbols-rounded audio-preview__icon">
        {iconName}
      </span>
    </button>
  );
};

export default AudioPreview;
