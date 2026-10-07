import { Button } from "@/components/ui/button";
import { type ProductFormInput } from "@/schema/products";
import { Cross } from "lucide-react";

interface ImageUploadProps {
  image: ProductFormInput["images"];
  onChange: (images: ProductFormInput["images"]) => void;
}

function ImageUpload({ image, onChange }: ImageUploadProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      public_id: "",
    }));

    console.log(newImages);
    console.log( ...newImages);

    onChange([...image, ...newImages]);
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={() => document.getElementById("image-upload")?.click()}
        className="cursor-pointer"
      >
        Upload Image
      </Button>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        className=" w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 hidden"
      />

      <div className="flex gap-2 flex-wrap">
        {image.map((img, index) => (
          <div key={index} className="relative">
            <img
              src={img.preview}
              alt={`Preview ${index}`}
              className="w-20 h-20 object-cover rounded"
            />
            <button
              onClick={() => {
                const updatedImages = image.filter((_, i) => i !== index);
                onChange(updatedImages);
              }}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center rotate-45 cursor-pointer"
            >
              <Cross size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUpload;
