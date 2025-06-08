"use client";
import React, { useEffect, useState } from "react";
import {
  EditorRoot,
  EditorCommand,
  EditorCommandItem,
  EditorCommandEmpty,
  EditorContent,
  EditorCommandList,
  EditorBubble,
} from "novel";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import { handleImageDrop, handleImagePaste } from "novel/plugins";
import { Separator } from "../ui/separator";
import { defaultExtensions } from "./extensions";
import { slashCommand, suggestionItems } from "./slash-command";
import { uploadFn } from "./image-upload";
import { NodeSelector } from "./selectors/node-selector";
import { LinkSelector } from "./selectors/link-selector";
import { TextButtons } from "./selectors/text-buttons";
import { ColorSelector } from "./selectors/color-selector";
import { MathSelector } from "./selectors/math-selector";

const extensions = [...defaultExtensions, slashCommand];

interface EditorProp {
  initialValue?: string;
  onChange: (value: string) => void;
}

const EditorX = ({ initialValue, onChange }: EditorProp) => {
  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  // This function checks if the editor's content is empty (including <p></p> or whitespace)
  const checkIfEmpty = (html: string) => {
    const strippedContent = html.replace(/<[^>]+>/g, "").trim(); // Strip tags and trim the result
    return strippedContent === ""; // True if only whitespace
  };

  useEffect(() => {
    // If there's initial content, check whether it's empty
    if (initialValue) {
      setIsEmpty(checkIfEmpty(initialValue));
    }
  }, [initialValue]);

  return (
    <EditorRoot>
      <EditorContent
        className="border p-4 rounded-xl pl-6 relative"
        {...(initialValue && { initialContent: initialValue })}
        extensions={extensions}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
          handleDrop: (view, event, _slice, moved) =>
            handleImageDrop(view, event, moved, uploadFn),
          attributes: {
            class: `prose prose-lg prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
          },
        }}
        onUpdate={({ editor }) => {
          const html = editor.getHTML();
          onChange(html);
          setIsEmpty(checkIfEmpty(html)); // Check if content is empty on every update
        }}
        slotAfter={<ImageResizer />}
      >
        {isEmpty && (
          <div className="absolute animate-pulse bottom-4 z-10 text-sm text-muted-foreground">
            Press &apos;/&apos; to type...
          </div>
        )}

        <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
          <EditorCommandEmpty className="px-2 text-muted-foreground">
            No results
          </EditorCommandEmpty>
          <EditorCommandList>
            {suggestionItems.map((item) => (
              <EditorCommandItem
                value={item.title}
                onCommand={(val) => item.command?.(val)}
                className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent `}
                key={item.title}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </EditorCommandItem>
            ))}
          </EditorCommandList>
        </EditorCommand>

        <EditorBubble
          tippyOptions={{
            placement: "top",
          }}
          className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
        >
          <Separator orientation="vertical" />
          <NodeSelector open={openNode} onOpenChange={setOpenNode} />
          <Separator orientation="vertical" />

          <LinkSelector open={openLink} onOpenChange={setOpenLink} />
          <Separator orientation="vertical" />
          <TextButtons />
          <Separator orientation="vertical" />
          <MathSelector />
          <ColorSelector open={openColor} onOpenChange={setOpenColor} />
        </EditorBubble>
      </EditorContent>
    </EditorRoot>
  );
};

export default EditorX;
