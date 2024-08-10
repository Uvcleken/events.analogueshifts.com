"use client";

import { Color } from "@tiptap/extension-color";
import "./tiptap.css";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";

import {
  Bold,
  CaseSensitive,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Pilcrow,
  Redo,
  Undo,
} from "lucide-react";

// Define prop types for MenuBar
interface MenuBarProps {
  valueChanged: (value: string) => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ valueChanged }) => {
  const { editor } = useCurrentEditor();

  if (editor) {
    editor.setOptions({
      editorProps: {
        attributes: {
          class:
            "px-3 z-30 pt-2 scroll-hidden text-sm font-medium max-h-[120px] text-primary-boulder900 min-h-[130px] overflow-y-auto w-full rounded-b-2xl outline-none border ",
        },
      },
    });
  }

  useEffect(() => {
    if (editor) {
      valueChanged(editor.getHTML());
    }
  }, [editor, valueChanged]);

  if (!editor) {
    return null;
  }

  return (
    <div
      className={`flex w-full overflow-x-auto gap-x-3 gap-y-3 px-3 py-3 top-0 z-40 bg-white rounded-t-2xl border-b-0 border-x border-t`}
    >
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`${
          editor.isActive("bold")
            ? "text-primary-boulder700"
            : "text-primary-boulder500"
        } px-3 py-1 `}
      >
        <Bold width={17} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`${
          editor.isActive("italic")
            ? "text-primary-boulder700"
            : "text-primary-boulder500"
        } px-3 py-1 rounded-lg`}
      >
        <Italic width={17} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`${
          editor.isActive("paragraph")
            ? "text-primary-boulder700"
            : "text-primary-boulder500"
        } px-3 py-1 rounded-lg`}
      >
        <Heading2 width={17} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${
          editor.isActive("bulletList")
            ? "text-primary-boulder700"
            : "text-primary-boulder500"
        } px-3 py-1 `}
      >
        <List width={17} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${
          editor.isActive("orderedList")
            ? "text-primary-boulder700"
            : "text-primary-boulder500"
        } px-3 py-1 `}
      >
        <ListOrdered width={17} />
      </button>

      <button
        className="text-primary-boulder500"
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Undo width={17} />
      </button>
      <button
        className="text-primary-boulder500"
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <Redo width={17} />
      </button>
    </div>
  );
};

// Define prop types for Tiptap component
interface TiptapProps {
  changed: (value: string) => void;
  initialData: string;
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

const Tiptap: React.FC<TiptapProps> = ({ changed, initialData }) => {
  return (
    <EditorProvider
      slotBefore={<MenuBar valueChanged={(data) => changed(data)} />}
      extensions={extensions}
      content={initialData}
    ></EditorProvider>
  );
};

export default Tiptap;
