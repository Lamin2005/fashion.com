import { Button } from "@/components/ui/button";
import { convertFileToBase64 } from "@/lib/utils";
import { type ProductFormInput } from "@/schema/products";
import { Cross } from "lucide-react";

interface ImageUploadProps {
  image: ProductFormInput["images"];
  onChange: (images: ProductFormInput["images"]) => void;
}

function ImageUpload({ image, onChange }: ImageUploadProps) {
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      const newImagesPromises = files.map(async (file) => {
        const base64String = await convertFileToBase64(file);
        return {
          file,
          preview: base64String,
        };
      });

      const newImages = await Promise.all(newImagesPromises);
      onChange([...image, ...newImages]);
    } catch (error) {
      console.error("Error converting images to Base64:", error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
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
          <div key={index} className="relative group">
            <img
              src={img.preview}
              alt={`Preview ${index}`}
              className="w-20 h-20 object-cover rounded"
            />
            <button
              type="button"
              onClick={() => {
                const removedImages = image.filter((_, i) => i !== index);
                onChange(removedImages);
              }}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center rotate-45 cursor-pointer md:opacity-0 md:group-hover:opacity-100 transition-opacity"
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
