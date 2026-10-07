import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryProps {
  value: string;
  onChange: (value: string) => void;
}

const categories = [
  {
    id: 1,
    label: "Clothing",
  },
  {
    id: 2,
    label: "Shoes",
  },
  {
    id: 3,
    label: "Accessories",
  },
];

function Category({ value, onChange }: CategoryProps) {
  return (
    <div className="flex flex-col gap-2 ">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full cursor-pointer">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.label}>
                {category.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default Category;
