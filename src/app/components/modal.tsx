"use client";
import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Modal from 'react-modal';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    // Add additional styles as needed
    border: '1px solid #ccc',
    background: '#fff',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px'
  },
}

const CustomModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('');
  const router = useRouter();

  // async function handleClick() {
  //   try {
  //     const res = await axios.post("http://localhost:3000/api/container")
  //     console.log(res.data);
  //   } catch (error) {
  //     console.error("error comes up while fetching data : " + error);
  //   } finally {
  //     setIsOpen(false);
  //     router.push("/editor");
  //   }
  // }
  return (

    <div className='text-white'>
      <button className='bg-black p-4 m-4' onClick={() => { setIsOpen(true); router.push("/editor"); }}>Start Coding</button>
      {/* <Modal */}
      {/*   isOpen={isOpen} */}
      {/*   style={customStyles} */}
      {/*   onRequestClose={() => setIsOpen(false)} */}
      {/* > */}
      {/**/}
      {/*   <div className='text-black m-5 font-semibold'>Select Language</div> */}
      {/*   <Box sx={{ minWidth: 150 }}> */}
      {/*     <FormControl fullWidth> */}
      {/*       <InputLabel id="language-select">Languages</InputLabel> */}
      {/*       <Select */}
      {/*         labelId='language-select' */}
      {/*         value={language} */}
      {/*         label="Language" */}
      {/*         onChange={(e) => setLanguage(e.target.value)} */}
      {/*       > */}
      {/*         <MenuItem value={"js"}>Javascript</MenuItem> */}
      {/*       </Select> */}
      {/*     </FormControl> */}
      {/*   </Box> */}
      {/**/}
      {/*   <button className='text-black m-5 p-2 px-7 border-2 rounded-s border-black' onClick={handleClick}>Enter</button> */}
      {/* </Modal> */}
      {/**/}
    </div>
  )
}

export default CustomModal
