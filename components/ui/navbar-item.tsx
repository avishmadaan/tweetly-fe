import Link from "next/link";
import { ReactElement } from "react"

export function NavbarItem(props:{
    name?:string,
    icon:ReactElement,
    url:string,
    isActive?:boolean,
    open:boolean
}) {

  

    return(
        <Link href={props.url}>
        <div className={`flex  p-2  w-full dark:hover:bg-customHover cursor-pointer hover:bg-gray-100 rounded-md my-4 dark:text-white text-customBlack ${
          props.isActive ? "dark:bg-customHover bg-gray-100 " : ""
        }`}>
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