"use client";

import { X } from "lucide-react";

export default function MobileFilterDrawer({
  open,
  onClose,
  children,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] xl:hidden">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/35"
        aria-label="Close filters overlay"
      />

      <div className="absolute right-0 top-0 h-full w-full max-w-[360px] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
          <h2 className="text-xl font-semibold text-[#111]">Filters</h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f4f6] text-[#111] transition hover:text-indigo-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="h-[calc(100%-76px)] overflow-y-auto p-4">
          {children}

          <button
            type="button"
            onClick={onClose}
            className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#111] px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
          >
            View Results
          </button>
        </div>
      </div>
    </div>
  );
}