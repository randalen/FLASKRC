import {HiMenu} from 'react-icons/hi';
import {AiOutlineClose} from 'react-icons/ai';
import logo from '../../images/logo.png';
import { useState } from 'react';
import {NavLink, Link} from 'react-router-dom';

const Navbar = () => {

    const NavbarItem= ({title, classProps})=>{
        return (
            <li className={`mx-4 cursor-pointer ${classProps}`}>
                {title}
            </li>
        );
    }

    const [toggleMenu, setToggleMenu] = useState(false);
    const setToken = () => {sessionStorage.setItem('token', ''); return <Navigate to={'/'}/>; }


    return (
        <nav className="w-full flex md:justify-center justify-between items-center p-4">
            {(sessionStorage.getItem('token') && sessionStorage.getItem('token') !== undefined && sessionStorage.getItem('token') !== ''
            )? 
<><div className="md:flex-[0.5] flex-initial justify-center items-center">
                        <Link to="/">
                            <img src={logo} alt="logo" className="w-32 cursor-pointer">
                            </img>
                        </Link>
                    </div><ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
                            <Link to="/profile" className="mx-4 cursor-pointer">
                                Profile
                            </Link>
                            <Link to="/projects" className="mx-4 cursor-pointer">
                                Projects
                            </Link>
                            <li className="mx-4 cursor-pointer">
                                Collections
                            </li>
                            <li className="mx-4 cursor-pointer">
                                About
                            </li>
                            <Link to="/" className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
                                onClick={() => setToken()}>
                                Log Out
                            </Link>
                        </ul><div className='flex relative'>
                            {toggleMenu ? <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
                                : <HiMenu fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />}
                            {toggleMenu && (
                                <ul className="z-40 fixed top-0 -right-2 p-3 w-[70vw] h-screen-2x1 md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in">
                                    <li className='text-xl w-full my-2'>
                                        <AiOutlineClose onClick={() => setToggleMenu(false)} />
                                    </li>
                                    <Link to="/profile" className={'mx-4 cursor-pointer my-2- text-lg '}>
                                        Profile
                                    </Link>
                                    <Link to="/projects" className={'mx-4 cursor-pointer my-2- text-lg '}>
                                        Projects
                                    </Link>
                                    <Link className={'mx-4 cursor-pointer my-2- text-lg '}>
                                        Collections
                                    </Link>
                                    <Link className={'mx-4 cursor-pointer my-2- text-lg '}>
                                        About
                                    </Link>
                                    <Link to="/" className={'mx-4 cursor-pointer my-2- text-lg '}
                                    onClick={() => setToken()}>
                                    Log Out
                                    </Link>
                                </ul>
                            )}
                        </div></>
            : 
            <><div className="md:flex-[0.5] flex-initial justify-center items-center">
            <Link to="/">
                <img src={logo} alt="logo" className="w-32 cursor-pointer">
                </img>
            </Link>
        </div><ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
                <Link to="/subscribe" className="mx-4 cursor-pointer">
                    Subscribe
                </Link>
                <Link to="/projects" className="mx-4 cursor-pointer">
                    Projects
                </Link>
                <li className="mx-4 cursor-pointer">
                    Collections
                </li>
                <Link  className="mx-4 cursor-pointer">
                    API
                </Link>
                <li className="mx-4 cursor-pointer">
                    About
                 </li>
                <Link to="/login" className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
                    Log in
                </Link>
            </ul><div className='flex relative'>
                {toggleMenu ? <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
                    : <HiMenu fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />}
                {toggleMenu && (
                    <ul className="z-40 fixed top-0 -right-2 p-3 w-[70vw] h-screen-2x1 md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in">
                        <li className='text-xl w-full my-2'>
                            <AiOutlineClose onClick={() => setToggleMenu(false)} />
                        </li>
                        {["", "", "", ""].map((item, index) => <NavbarItem key={item + index} title={item} classProps="my-2- text-lg" />
                        )}

                        <Link to="/subscribe" className={'mx-4 cursor-pointer my-2- text-lg '}>
                            Subscribe
                        </Link>
                        <Link to="/projects" className={'mx-4 cursor-pointer my-2- text-lg '}>
                            Projects
                        </Link>
                        <Link className={'mx-4 cursor-pointer my-2- text-lg '}>
                            Collections
                        </Link>
                        <Link  className={'mx-4 cursor-pointer my-2- text-lg '}>
                             API
                        </Link>
                        <Link className={'mx-4 cursor-pointer my-2- text-lg '}>
                             About
                        </Link>
                        <Link to="/login" className={'mx-4 cursor-pointer my-2- text-lg '}>
                            Log In
                        </Link>
                    </ul>
                )}
            </div></>
            
            }
        </nav>
    );
}

export default Navbar;