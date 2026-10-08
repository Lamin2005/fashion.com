import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ColorPickerProp {
  colors: string[];
  onChange: (colors: string[]) => void;
}

function Colorpicker({ colors, onChange }: ColorPickerProp) {
  const [color, setColor] = useState("#0000");

  const addColor = () => {
    if (colors.includes(color)) return;

    onChange([...colors, color]);
  };

  const removeColor = (color: string) => {
    const filterColors = colors.filter((c) => c != color);

    onChange([...filterColors]);
  };

  return (
    <div className="flex items-center gap-3">
      <div
        className="
    flex h-11 w-11
    items-center justify-center
    rounded-xl
    border border-white/20
    bg-white/10
    shadow-lg shadow-black/5
    backdrop-blur-md
    transition-all duration-200
    hover:bg-white/20
  "
      >
        <Input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="
      h-8
      w-20
      cursor-pointer
      rounded-lg
      border-0
      p-0
      bg-transparent
    "
        />
      </div>

      <Button type="button" className="h-11 rounded-lg px-5 cursor-pointer" onClick={addColor}>
        Add Color
      </Button>

      {colors.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <div
              key={color}
              className="
            flex items-center gap-2
            rounded-full
            border border-white/20
            bg-white/10
            px-3 py-1.5
            shadow-lg shadow-black/5
            backdrop-blur-xl
            transition-all duration-200
            hover:-translate-y-0.5
            hover:bg-white/20
          "
            >
              <div
                className="
              h-5 w-5
              rounded-full
              border border-white/30
              shadow-sm
            "
                style={{ backgroundColor: color }}
              />

              <span className="text-sm font-medium uppercase text-white">
                {color}
              </span>
              <span
                className="text-sm font-medium uppercase text-white cursor-pointer"
                onClick={() => {
                  removeColor(color);
                }}
              >
                X
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Colorpicker;
