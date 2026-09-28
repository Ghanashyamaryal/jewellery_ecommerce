"use client";

import { useId } from "react";

interface EngravingInputProps {
  maxCharacters: number;
  price: number;
  enabled: boolean;
  value: string;
  onEnabledChange: (enabled: boolean) => void;
  onChange: (value: string) => void;
}

export function EngravingInput({
  maxCharacters,
  price,
  enabled,
  value,
  onEnabledChange,
  onChange,
}: EngravingInputProps) {
  const id = useId();

  return (
    <div className="space-y-3">
      <label className="flex items-center gap-3 text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onEnabledChange(e.target.checked)}
          className="h-4 w-4 accent-foreground"
        />
        <span>
          Add personal engraving{" "}
          <span className="text-muted-foreground">(+Rs. {price.toLocaleString()})</span>
        </span>
      </label>
      {enabled && (
        <div>
          <input
            id={id}
            type="text"
            value={value}
            maxLength={maxCharacters}
            onChange={(e) => onChange(e.target.value)}
            placeholder="e.g. initials or a date"
            aria-label="Engraving text"
            className="w-full h-10 px-3 border border-input bg-background text-sm focus:outline-none focus:border-foreground"
          />
          <p className="mt-1 text-xs text-muted-foreground text-right">
            {value.length}/{maxCharacters}
          </p>
        </div>
      )}
    </div>
  );
}
