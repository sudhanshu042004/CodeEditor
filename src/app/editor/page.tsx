"use client";
import { Editor, OnMount } from "@monaco-editor/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { io, Socket } from "socket.io-client";

const URL = process.env.URL;

interface SubmissionResponse {
  stdout?: string;
  stderr?: string;
  status: {
    id: number;
    description: string;
  };
}

const EditorPage = () => {
  const [code, setCode] = useState("");
  const [res, setRes] = useState<SubmissionResponse | null>(null);
  const [langId, setLangId] = useState(93);
  const editorRef = useRef(null);
  const [input, setInput] = useState("");
  const socketRef = useRef<Socket | null>(null);

  const [lang, setLang] = React.useState('javascript');

  const handleChangeBox = (event: SelectChangeEvent) => {
    const selectedLang = event.target.value as string;
    setLang(selectedLang);
    console.log(selectedLang); // Log the updated value

    // Use functional updates to ensure you're using the latest state value
    if (selectedLang === "javascript") {
      setLangId(93);
    }
    if (selectedLang === "python") {
      setLangId(92);
    }
    if (selectedLang === "c") {
      setLangId(75);
    }
  };

  //socket connection
  useEffect(() => {
    socketRef.current = io(`http://192.168.238.32:3001`);
    const socket = socketRef.current;
    socket.on("code", (code) => {
      setCode(code);
    });
  }, []);



  //socket emit
  function handleChange(value: any) {
    setCode(value);
    socketRef.current?.emit("code", value);
  }
  //
  const handleMount: OnMount = (editor: any, _monaco) => {
    editorRef.current = editor;
  }

  async function handleClick() {
    console.log(code);
    const options = {
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '435637fa93msh6f4b49cfb2a7dbep140ebbjsnb215605ca8d3',
        //'X-RapidAPI-Key': 'a3cc76cf09msh3398f5620984588p1a02afjsn3c44087b87e0',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      params: {
        base64_encoded: true,
        wait: true,
        fields: '*'
      }
    };

    const requestData = {
      language_id: langId,
      source_code: `${btoa(code)}`,
      stdin: `${btoa(input)}`
    };

    try {
      const response = await axios.post("https://judge0-ce.p.rapidapi.com/submissions", requestData, options);
      console.log(response);
      setRes(response.data);
    } catch (error) {
      console.error(error);
    }
    console.log(res);
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex py-2 bg-zinc-900 justify-center">
        <div className="mx-2 ">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel className="text-white" id="demo-simple-select-label">Language</InputLabel>
              <Select
                className="text-white"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={lang}
                label="Language"
                onChange={handleChangeBox}
              >
                <MenuItem value={"javascript"}>Javascript</MenuItem>
                <MenuItem value={"c"}>C</MenuItem>
                <MenuItem value={"python"}>Python</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <button onClick={handleClick} className="py-0 px-6 bg-blue-500 text-white rounded hover:bg-blue-600">
          Run
        </button>
      </div>

      <div className="flex">
        <Editor
          key={lang}
          height="100vh"
          width="75%"
          defaultLanguage={lang}
          defaultValue="//commet start coding"
          value={code}
          onMount={handleMount}
          theme="vs-dark"
          onChange={(value) => handleChange(value)}
        />
        <div className="bg-black text-white border-l-4 border-l-white w-80 p-4 overflow-auto">
          <div>
            <p className="text-green-200">Output : </p>
            {res != null && <div>
              {res.stdout != null && <div className="mb-4">{atob(res.stdout)}</div>}
              {res.status.id != 3 && <div className="text-red-900 ">
                <div className="mb-2">Status : {res.status.description}</div>
                <div>{res.stderr ? atob(res.stderr) : ''}</div>
              </div>}
            </div>}
          </div>
          <div className="relative my-60">
            <p className="text-green-200">Input :</p>
            <input className="text-black" onChange={(e) => setInput(e.target.value)} />
          </div>
        </div>
      </div>
    </div >
  );
};

export default EditorPage;
