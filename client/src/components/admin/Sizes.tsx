import { Button } from "@/components/ui/button";

interface SizeProp {
  sizes: string[];
  onChange: (sizes: string[]) => void;
}

function Sizes({ sizes, onChange }: SizeProp) {
  const availableSizes = ["S", "M", "L", "XL", "XXL"];

  const toggleSizes = (selectedsize: string) => {
    if (sizes.includes(selectedsize)) {
      onChange(sizes.filter((s) => s != selectedsize));
    } else {
      onChange([...sizes, selectedsize]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {availableSizes.map((size) => {
        const isSelected = sizes.includes(size);
        return (
          <Button
            key={size}
            type="button"
            variant="ghost"
            onClick={() => toggleSizes(size)}
            className={`cursor-pointer h-10 min-w-12 rounded-xl border backdrop-blur-xl transition-all duration-200 ${isSelected ? "border-white/30 bg-white/20 text-white shadow-lg" : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"} `}
          >
            {size}
          </Button>
        );
      })}{" "}
    </div>
  );
}

export default Sizes;
