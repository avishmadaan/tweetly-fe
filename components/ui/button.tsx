import { Loader2 } from "lucide-react";
import { ReactElement } from "react";

export interface ButtonProps {
    variant: "primary" | "secondary" | "outline",
    children:React.ReactNode;
    onClick?: ()=> void;
    size?:"sm" | "md" | "lg";
    text?:string;
    startIcon?:ReactElement;
    endIcon?:ReactElement;
    className?:string;
    type?:"submit" | "reset" |"button";
    loading?:boolean;
    disabled?:boolean
}

const variantStyles = {
    "primary":"bg-customBlack text-white  dark:bg-white dark:text-customBlack",

    "outline":"text-customBlack dark:text-white border dark:border-customWhite border-black border-opacity-20 bg-transparent" ,

    "secondary":"bg-white text-customBlack"
}

const defaultStyles = `rounded-md px-6 py-3 flex items-center justify-center gap-2 h hover:-translate-y-1 duration-200 dark:border-opacity-20 `;



export const Button = (props:ButtonProps)=> {

    return <button type={props.type} onClick={props.onClick} className={`  ${props.className} ${variantStyles[props.variant]} ${defaultStyles}  ${props.disabled ? " ":""}`}
    disabled={props.disabled}
    >

        {!props.loading && (
            <>
            {props.startIcon}
            {props.children}
            {props.endIcon}
            </>
        )}
    
    {props.loading && <Loader2 className="animate-spin" />}
    
    </button>



}