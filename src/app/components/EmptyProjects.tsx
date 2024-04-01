"use client";
import React from 'react'
import CustomModal from "./modal"

const EmptyProjects = () => {
  return (
    <>
      <div className='bg-zinc-900 flex flex-col justify-center items-center p-4 m-5 h-80 font-semibold'>
        no projects yet
        <CustomModal />
      </div>
      {/* modal */}
    </>
  )
}

export default EmptyProjects
