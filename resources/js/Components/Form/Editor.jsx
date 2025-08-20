// Editor.jsx
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import Quill from "quill";
import { QuillEditor } from "react-quill";
import "react-quill/dist/quill.snow.css";

// Forward ref agar parent bisa akses Quill instance
const Editor = forwardRef(
    ({ defaultValue, onSelectionChange, onTextChange, readOnly }, ref) => {
        const editorRef = useRef();

        useImperativeHandle(ref, () => ({
            getLength: () => {
                return editorRef.current?.getEditor()?.getLength?.();
            },
            getEditor: () => {
                return editorRef.current?.getEditor?.();
            },
        }));

        return (
            <QuillEditor
                ref={editorRef}
                defaultValue={defaultValue}
                onChangeSelection={(range, source, editor) => {
                    onSelectionChange?.(range);
                }}
                onChange={(content, delta, source, editor) => {
                    onTextChange?.(delta);
                }}
                readOnly={readOnly}
                theme="snow"
            />
        );
    }
);

export default Editor;
