"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

interface CountdownProps {
  targetDate: string;
  isCompleted?: boolean;
}

const emptySubscribe = () => () => {};

export default function EventCountdown({ targetDate, isCompleted }: CountdownProps) {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = new Date(targetDate).getTime() - Date.now();
    if (diff <= 0 || isCompleted) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
    }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      ended: false,
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0 || isCompleted) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, ended: true });
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
          ended: false,
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, isCompleted]);

  if (!isClient) {
    return (
      <div className="event-widget__promo">
        <h4 className="widget-title">Menuju Waktu Acara</h4>
        <div className="promo1__countdown">
          <div className="count-item"><div className="number">--</div><div className="label">Hari</div></div>
          <span className="separator">:</span>
          <div className="count-item"><div className="number">--</div><div className="label">Jam</div></div>
          <span className="separator">:</span>
          <div className="count-item"><div className="number">--</div><div className="label">Menit</div></div>
          <span className="separator">:</span>
          <div className="count-item"><div className="number">--</div><div className="label">Detik</div></div>
        </div>
      </div>
    );
  }

  if (timeLeft.ended || isCompleted) {
    return (
      <div className="event-widget__promo">
        <h4 className="widget-title">Status Kegiatan</h4>
        <div className="p-3 text-center rounded bg-light border">
          <span className="badge bg-secondary mb-2">Selesai</span>
          <p className="mb-0 text-muted small">Kegiatan ini telah terlaksana. Simak materi atau rekaman melalui tautan di bawah.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="event-widget__promo">
      <h4 className="widget-title">Hitung Mundur Acara</h4>
      <div className="promo1__countdown">
        <div className="count-item">
          <div className="number">{String(timeLeft.days).padStart(2, "0")}</div>
          <div className="label">Hari</div>
        </div>
        <span className="separator">:</span>
        <div className="count-item">
          <div className="number">{String(timeLeft.hours).padStart(2, "0")}</div>
          <div className="label">Jam</div>
        </div>
        <span className="separator">:</span>
        <div className="count-item">
          <div className="number">{String(timeLeft.minutes).padStart(2, "0")}</div>
          <div className="label">Menit</div>
        </div>
        <span className="separator">:</span>
        <div className="count-item">
          <div className="number">{String(timeLeft.seconds).padStart(2, "0")}</div>
          <div className="label">Detik</div>
        </div>
      </div>
    </div>
  );
}
