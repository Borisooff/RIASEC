import {JSX} from "react";
import Image from 'next/image'

import Logo from '@/assets/Logo.png'

const Header = (): JSX.Element => {
    return (
        <header className="flex items-center justify-start gap-4 w-full bg-white">
            <Image src={Logo} width={123} height={100} alt="Логоти САФУ" />
            <p className='text-[var(--primary)] font-bold text-[20px] max-w-[320px]'>
            Северный (Арктический) федеральный университет имени М.В. Ломоносова
            </p>
        </header>
    )
}

export default Header;