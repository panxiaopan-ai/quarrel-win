'use client';

interface ArgumentInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function ArgumentInput({ value, onChange, disabled }: ArgumentInputProps) {
  return (
    <div className="w-full">
      <label className="flex flex-col">
        <p className="text-base sm:text-lg font-bold pb-1.5">对方说了什么？</p>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="在这里输入对方的话..."
          className="pixel-textarea"
          maxLength={500}
        />
      </label>
      <div className="text-right text-xs mt-1 opacity-60">
        {value.length}/500
      </div>
    </div>
  );
}
