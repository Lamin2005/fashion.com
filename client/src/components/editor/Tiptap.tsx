import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "../ui/button";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  List,
  ListOrdered,
  Quote,
} from "lucide-react";

interface TiptapProps {
  content: string;
  onChange: (content: string) => void;
}

const Tiptap = ({ content, onChange }: TiptapProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "tiptap-editor min-h-[250px] px-4 py-3 text-sm text-zinc-100 outline-none focus:outline-none",
      },
    },
  });

  if (!editor) return null;

  const toolbarButton =
    "h-8 w-8 p-0 border-0 text-zinc-400 hover:bg-zinc-800 hover:text-white";

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-black text-white shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-zinc-800 bg-zinc-950 p-2">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className={`${toolbarButton} ${
            editor.isActive("bold") ? "bg-zinc-800 text-white" : ""
          }`}
          onClick={() => editor.chain().focus().toggleBold().run()}
          aria-label="Bold"
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          size="icon"
          variant="ghost"
          className={`${toolbarButton} ${
            editor.isActive("italic") ? "bg-zinc-800 text-white" : ""
          }`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Italic"
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          size="icon"
          variant="ghost"
          className={`${toolbarButton} ${
            editor.isActive("strike") ? "bg-zinc-800 text-white" : ""
          }`}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          aria-label="Strikethrough"
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </Button>

        <div className="mx-1 h-5 w-px bg-zinc-800" />

        <Button
          type="button"
          size="icon"
          variant="ghost"
          className={`${toolbarButton} ${
            editor.isActive("heading", { level: 2 })
              ? "bg-zinc-800 text-white"
              : ""
          }`}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          aria-label="Heading 2"
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          size="icon"
          variant="ghost"
          className={`${toolbarButton} ${
            editor.isActive("bulletList") ? "bg-zinc-800 text-white" : ""
          }`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="Bullet list"
          title="Bullet list"
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          size="icon"
          variant="ghost"
          className={`${toolbarButton} ${
            editor.isActive("orderedList") ? "bg-zinc-800 text-white" : ""
          }`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label="Numbered list"
          title="Numbered list"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          size="icon"
          variant="ghost"
          className={`${toolbarButton} ${
            editor.isActive("blockquote") ? "bg-zinc-800 text-white" : ""
          }`}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          aria-label="Blockquote"
          title="Blockquote"
        >
          <Quote className="h-4 w-4" />
        </Button>
      </div>

      <EditorContent editor={editor} />

      <div className="flex items-center justify-between border-t border-zinc-800 px-4 py-2">
        <span className="text-xs text-zinc-500">Rich text editor</span>
        <span className="text-xs text-zinc-500">
          {editor.storage.characterCount?.characters?.() ?? ""}
        </span>
      </div>
    </div>
  );
};

export default Tiptap;
