"use client";
import { Editor } from "@monaco-editor/react";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const EditorPage = () => {
  const [code, setCode] = useState("");
  const editorRef = useRef(null);
  const cursor = [
    { lineNumber: 1, column: 1 },
    { lineNumber: 2, column: 1 },
  ];
  //socket connection
  useEffect(() => {
    socket.on("code", (code) => {
      setCode(code);
    });
  }, []);

  //socket emit
  function handleChange(value: any) {
    setCode(value);
    socket.emit("code", value);
  }
  //
  function handleMount(editor, _monaco) {
    editorRef.current = editor;
  }

  function getCursorPositon() {
    if (editorRef.current) {
      console.log(editorRef.current.getPosition());
    }
  }
  function setCursorPosition() {
    const postion = { lineNumber: 4, column: 3 };
    if (editorRef.current) {
      editorRef.current.setPosition(postion);
    }
  }
  function renderCursors() {
    return cursor.map((cursorPosition, index) => {
      return (
        <div
          key={index}
          style={{
            position: "absolute",
            left: cursorPosition.column * 100,
            top: cursorPosition.lineNumber * 200,
            color: "red",
          }}
        >
          &bull;
        </div>
      );
    });
  }

  return (
    <div style={{ position: "relative" }}>
      <div>EditorPage</div>
      <button onClick={getCursorPositon}>show curson</button>
      <button onClick={setCursorPosition}>setCursor</button>
      <div>
        <Editor
          height="90vh"
          width="90vw"
          defaultLanguage="javascript"
          defaultValue="//commet"
          value={code}
          onMount={handleMount}
          theme="vs-dark"
          onChange={(value) => handleChange(value)}
        />
        {renderCursors()}
      </div>
    </div>
  );
};

export default EditorPage;
