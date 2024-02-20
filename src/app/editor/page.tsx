"use client";
import { Editor } from "@monaco-editor/react";
import React from "react";

const EditorPage = () => {
  return (
    <div>
      <div>EditorPage</div>
      <div>
        <Editor
          height="90vh"
          width="90vw"
          defaultLanguage="javascript"
          defaultValue="//work here"
          theme="vs-dark"
        />
      </div>
    </div>
  );
};

export default EditorPage;
