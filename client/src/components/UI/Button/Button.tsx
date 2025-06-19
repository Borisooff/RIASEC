import {HTMLAttributes, JSX} from "react";
import {twMerge} from "tailwind-merge";

const Button = ({children, className}: HTMLAttributes<HTMLButtonElement> ): JSX.Element=>{
    return (
        <button className={twMerge(
            className,
            'px-[16px] py-[14px] text-center bg-[#FF8500] rounded-[40px] text-white max-w-[150px] w-full cursor-pointer text-[16px]',
        )}>
            {children}
        </button>
    )
}

export default Button;