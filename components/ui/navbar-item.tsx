import Link from "next/link";
import { ReactElement } from "react"

export function NavbarItem(props:{
    name?:string,
    icon:ReactElement,
    url:string,
    isActive?:boolean,
    open?:boolean,
    className?:string
    onClick?:()=>void
}) {

    if(props.onClick) {

        return (
            <div className={`flex  p-2  w-full dark:hover:bg-customHover cursor-pointer hover:bg-gray-100 rounded-md  dark:text-white text-customBlack 
                ${
                props.isActive ? "dark:bg-customHover bg-gray-100 " : ""} 
              }
             ${props.className} ` } onClick={props.onClick} >
      
                  <span className="pr-4
                  ">
                  {props.icon}
      
                  </span>
                  {props.open && (
      
                  <span className="">
                  {props.name}
      
                  </span>
                  )}
      
      
              </div>


        )
    }

    else {

    return(
        <Link href={props.url}>
        <div className={`flex  p-2  w-full dark:hover:bg-customHover cursor-pointer hover:bg-gray-100 rounded-md dark:text-white text-customBlack ${props.className} ${
          props.isActive ? "dark:bg-customHover bg-gray-100 " : ""
        }
        `} onClick={props.onClick? props.onClick:undefined} >

            <span className="pr-4
            ">
            {props.icon}

            </span>
            {props.open && (

            <span className="">
            {props.name}

            </span>
            )}


        </div>
        </Link>
    )
}
}