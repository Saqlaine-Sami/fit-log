"use client";

interface ToastProps {
  message: string;
  onClose: () => void;
}

export default function Toast({
  message,
  onClose,
}: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4 rounded-full border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm text-white shadow-2xl">

      <span>{message}</span>

      <button
        onClick={onClose}
        className="text-zinc-400 transition hover:text-white"
      >
        ×
      </button>

    </div>
  );
}