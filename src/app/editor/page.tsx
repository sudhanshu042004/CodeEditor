"use client";
import { Editor } from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const EditorPage = () => {
  const [code, setCode] = useState("");
  useEffect(() => {
    socket.on("code", (code) => {
      setCode(code);
    });
  }, []);

  function handleChange(value: any) {
    console.log(value);
    setCode(value);
    socket.emit("code", value);
  }

  return (
    <div>
      <div>EditorPage</div>
      <div>
        <Editor
          height="90vh"
          width="90vw"
          defaultLanguage="javascript"
          defaultValue="//commet"
          value={code}
          theme="vs-dark"
          onChange={(value) => handleChange(value)}
        />
      </div>
    </div>
  );
};

export default EditorPage;
