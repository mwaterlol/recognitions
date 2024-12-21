import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";
import { RichTextEditor as MantineRichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const RichTextEditor = forwardRef(
    ({ value, onChange }: RichTextEditorProps, ref) => {
        const editor = useEditor({
            extensions: [
                StarterKit,
                Underline,
                Link,
                Superscript,
                SubScript,
                Highlight,
                TextAlign.configure({ types: ["heading", "paragraph"] }),
                Color,
                TextStyle,
            ],
            content: value,
            onUpdate: ({ editor }) => {
                onChange(editor.getHTML());
            },
        });

        useEffect(() => {
            if (editor && editor.getHTML() !== value) {
                editor.commands.setContent(value);
            }
        }, [value, editor]);

        useImperativeHandle(ref, () => ({
            insertTextAtCursor: (text: string) => {
                console.log(1);
                if (editor) {
                    editor.chain().focus().insertContent(text).run();
                }
            },
        }));

        return (
            <MantineRichTextEditor
                editor={editor}
                mih={350}
                style={{
                    fontFamily: "FlaviusUniversal",
                }}
            >
                <MantineRichTextEditor.Toolbar sticky stickyOffset={60}>
                    <MantineRichTextEditor.ControlsGroup>
                        <MantineRichTextEditor.H1 />
                        <MantineRichTextEditor.H2 />
                        <MantineRichTextEditor.H3 />
                        <MantineRichTextEditor.H4 />
                    </MantineRichTextEditor.ControlsGroup>
                    <MantineRichTextEditor.ControlsGroup>
                        <MantineRichTextEditor.Bold />
                        <MantineRichTextEditor.Italic />
                        <MantineRichTextEditor.Underline />
                        <MantineRichTextEditor.Strikethrough />
                        <MantineRichTextEditor.ClearFormatting />
                        <MantineRichTextEditor.Highlight />
                        <MantineRichTextEditor.Code />
                    </MantineRichTextEditor.ControlsGroup>
                    <MantineRichTextEditor.ControlsGroup>
                        <MantineRichTextEditor.AlignLeft />
                        <MantineRichTextEditor.AlignCenter />
                        <MantineRichTextEditor.AlignJustify />
                        <MantineRichTextEditor.AlignRight />
                    </MantineRichTextEditor.ControlsGroup>
                </MantineRichTextEditor.Toolbar>
                <MantineRichTextEditor.Content />
            </MantineRichTextEditor>
        );
    }
);

export default RichTextEditor;
