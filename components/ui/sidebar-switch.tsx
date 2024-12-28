import { PanelLeft } from 'lucide-react'
import React from 'react'

const SidebarSwitch = ({
    onClick
}:{

    onClick:(callback: (value:boolean)=>boolean) => void;
}) => {

  return <PanelLeft size={36} onClick={() => onClick((value) => !value)} className='dark:hover:bg-customSearch p-1 cursor-pointer  rounded-lg dark:hover:bg-opacity-80 hover:bg-gray-100 ' />
}

export default SidebarSwitch
