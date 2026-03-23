import React, { useState, useEffect, useRef, useCallback } from "react";
import { fetchPreviewUrl } from "./iTunesApi";

const CIRCUMFERENCE = Math.PI * 2 * 20; // r=20

const AudioPreview = ({ artist, album, isActive, onPlayStateChange }) => {
  const [status, setStatus] = useState("loading"); // loading|idle|playing|paused|error
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

  // Pre-fetch preview URL on mount, with retry on failure
  useEffect(() => {
    let cancelled = false;
    let retryTimer;

    const attempt = (retries) => {
      fetchPreviewUrl(artist, album)
        .then((data) => {
          if (cancelled) return;
          if (data) {
            previewDataRef.current = data;
            setStatus("idle");
          } else {
            setStatus("not-found");
          }
        })
        .catch(() => {
          if (cancelled) return;
          if (retries > 0) {
            retryTimer = setTimeout(() => attempt(retries - 1), 5000);
          } else {
            setStatus("not-found");
          }
        });
    };

    attempt(1);
    return () => { cancelled = true; clearTimeout(retryTimer); };
  }, [artist, album]);

  // Stop playback when slide becomes inactive
  useEffect(() => {
    if (!isActive && status !== "loading" && status !== "not-found") cleanup();
  }, [isActive, cleanup, status]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Hide button if no preview available or still loading
  if (status === "not-found" || status === "loading") return null;

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

    if (status === "buffering") return;

    // idle or error — attempt to play
    setStatus("buffering");

    try {
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
      : status === "buffering"
        ? "progress_activity"
        : "play_arrow";
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <button
      className={`audio-preview audio-preview--${status}`}
      onClick={handleClick}
      title={
        status === "error"
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
