'use client';

interface IntensitySliderProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export default function IntensitySlider({ value, onChange, disabled }: IntensitySliderProps) {
  return (
    <div className="w-full">
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full items-center justify-between">
          <p className="text-base sm:text-lg font-bold">语气强烈程度</p>
          <p className="text-lg sm:text-xl font-bold">{value}</p>
        </div>
        <div className="w-full relative">
          <input
            type="range"
            min="1"
            max="10"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            disabled={disabled}
            className="pixel-slider"
          />
          <div className="w-full flex justify-between text-xs mt-1">
            <span>1</span>
            <span>10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
