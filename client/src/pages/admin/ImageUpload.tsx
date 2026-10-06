import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  image: Array<{ file: File | null; preview: string; public_id: string }>;
  onChange: (images: Array<{ file: File | null; preview: string; public_id: string }>) => void;
}

function ImageUpload({ image, onChange }: ImageUploadProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const file = event.target.files?.[0] || null;
    // onChange([{ file, preview: URL.createObjectURL(file), public_id: "" }]);
  };

  return (
    <div className="flex flex-col gap-2">
      <Button>Upload Image</Button>
      <label className="text-sm font-medium text-gray-700">Upload Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
      />
    </div>
  );
}

export default ImageUpload;
