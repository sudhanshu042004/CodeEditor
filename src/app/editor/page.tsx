"use client";
import { Editor } from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http;//localhost:3001");

const EditorPage = () => {
  const [code, setCode] = useState<string[]>([]);
  const [newCode, setNewCode] = useState(1);

  // useEffect(() => {
  //   socket.on("code", (code) => {
  //     setCode((prevCode) => [...prevCode, code]);
  //   });
  // }, []);
  //
  // const sendCode = () => {
  //   socket.emit("code", newCode);
  //   setNewCode("");
  // };
  // console.log(code);
  function change(value) {}
  return (
    <div>
      <div>EditorPage</div>
      <div>
        <Editor
          height="90vh"
          width="90vw"
          defaultLanguage="javascript"
          defaultValue="//commet"
          theme="vs-dark"
          onChange={(value) => {
            console.log(value);
          }}
        />
      </div>
    </div>
  );
};

export default EditorPage;
