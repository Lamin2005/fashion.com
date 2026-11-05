import { useState } from "react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { CalendarIcon, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface OrderDateRangePickerProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
}

function OrderDateRangePicker({
  dateRange,
  onDateRangeChange,
}: OrderDateRangePickerProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (range: DateRange | undefined) => {
    onDateRangeChange(range);

    if (range?.from && range?.to) {
      setOpen(false);
    }
  };

  const handleClear = () => {
    onDateRangeChange(undefined);
    setOpen(false);
  };

  const dateLabel =
    dateRange?.from && dateRange?.to
      ? `${format(dateRange.from, "MMM dd, yyyy")} - ${format(dateRange.to, "MMM dd, yyyy")}`
      : dateRange?.from
        ? format(dateRange.from, "MMM dd, yyyy")
        : "Date Range";

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "h-10 gap-2 border-zinc-800 bg-zinc-900/50 text-zinc-300",
              "hover:border-zinc-700 hover:bg-zinc-800 hover:text-white",
              !dateRange?.from && "text-zinc-400",
            )}
          >
            <CalendarIcon className="size-4" />
            <span>{dateLabel}</span>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="w-auto border-zinc-800 bg-zinc-950 p-0 text-white"
        >
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={handleSelect}
            numberOfMonths={2}
            disabled={{ after: new Date() }}
            className="rounded-md"
          />

          <div className="flex items-center justify-between border-t border-zinc-800 p-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="text-zinc-400 hover:bg-zinc-800 hover:text-white"
            >
              Clear
            </Button>

            <Button
              size="sm"
              onClick={() => setOpen(false)}
              className="bg-amber-400 text-zinc-950 hover:bg-amber-300"
            >
              Done
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {dateRange?.from && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClear}
          className="size-9 text-zinc-500 hover:bg-zinc-800 hover:text-white"
          aria-label="Clear date range"
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  );
}

export default OrderDateRangePicker;
