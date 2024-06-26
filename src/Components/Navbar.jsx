import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin, FaSearchengin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import Model from "./Model";
import { IoIosSearch } from "react-icons/io";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useMediaQuery } from "react-responsive";
import { User, useAuth0 } from "@auth0/auth0-react";
import UserDashboard from "./UserDashboard";
import { useEffect } from "react";

const Navbar = () => {
     const [isMenuOpen, setIsMenuOpen] = useState(false);
     const [isModelOpen, setIsModelOpen] = useState(false);
     const [showDashboard, setShowDashboard] = useState(false)

     // FOR SMALL SCREENS
     const isSmallScreen = useMediaQuery({ query: "(max-width: 640px)" });
     const toggleMenu = () => {
          setIsMenuOpen(!isMenuOpen);
     };

     const navItems = [
          // { path: "/", link: "Home" },
          // { path: "/about", link: "About" },
          // { path: "/blog", link: "Blog" },
          // { path: "/service", link: "Service" },
          // { path: "/contact", link: "Contact Us" },
     ];

     // MODAL DETAIL
     const openModel = () => {
          setIsModelOpen(true);
     };
     const closeModel = () => {
          setIsModelOpen(false);
     };

     const navigate = useNavigate();
     // LOGIN HANDLER
     const handleLogin = () => {
          navigate("/login");
     };

     const { loginWithRedirect, logout, isAuthenticated, user, nickname } = useAuth0();



     // LETS ADD NEW BLOG
     
     const handleAddNewBlog = ()=> {
       navigate("/blogs/add")
     }

     // Implement userdashboard
     useEffect(() => {
          const handleScroll = () => {
            setShowDashboard(false);
          };
      
          window.addEventListener("scroll", handleScroll);
      
          return () => {
            window.removeEventListener("scroll", handleScroll);
          };
        }, []);
      
    
      
        const showUserDashboard = () => {
          setShowDashboard(!showDashboard);
        };

     //    OBFUSCATE EMAIL
     const obfuscateEmail = (email) => {
          const [user, domain] = email.split("@");
          const numAsterisks = Math.max(user.length - 2, 3);
          console.log("user", numAsterisks)
          const obfuscatedUser = user.slice(0, 2) + "*".repeat(numAsterisks);
          return `${obfuscatedUser}@${domain}`;
      };
     return (
          <header className={`bg-white fixed top-0 left-0 right-0 z-10 border-b-1 ${isSmallScreen ? "border-b-2" : ""}`}>
               <nav className="py-4 px-8 max-w7xl mx-auto flex justify-between items-center">
                    <a href="/" className="text-xl md:text-3xl text-blue-800 ">
                         Native<span className="text-blue-400">DevDiary</span>
                    </a>

                    {/* FOR LARGE DEVICES  */}
                    {/* <ul className="md:flex gap-12 text-lg hidden">
                         {navItems.map(({ path, link }) => (
                              <li key={link}>
                                   <NavLink
                                        className={({ isActive, isPending, isTransitioning }) =>
                                             [
                                                  isPending ? "pending" : "",
                                                  isActive ? "active" : "",
                                                  isTransitioning ? "transitioning" : "",
                                             ].join(" ")
                                        }
                                        to={path}
                                   >
                                        {" "}
                                        {link}
                                   </NavLink>
                              </li>
                         ))}
                    </ul> */}
                    {/* IMPLEMENTING SEARCH BAR HERE */}
                    <div className="flex items-center relative right-24">
                         <IoIosSearch
                              className={`relative bg-gray-100 h-10 w-9 left-3 rounded-l-2xl text-gray-700  ${
                                   isSmallScreen ? "left-[140px] text-[24px] bottom-[3px]" : ""
                              }`}
                              style={{ paddingLeft: "0.5rem" }}
                         />

                         <input
                              type="search"
                              placeholder="Search"
                              className="bg-gray-100 p-2 min-w-[470px] rounded-2xl mr-6 outline-0 right-8 font-semibold text-md placeholder: pl-5 hidden  md:block"
                         />
                    </div>

                    {/* MENU ICONS */}
                    <div className="lg:flex gap-4 items-center hidden">
                         {/* IMPLEMENTING NEW POST HERE */}
                         <div className="flex justify-center items-center cursor-pointer text-gray-500  hover:text-gray-800 " onClick={()=> handleAddNewBlog()}>
                              <HiOutlinePencilSquare className="text-[25px]  leading-4 " />
                              <h3 className="text-md ml-1 font-medium">Write</h3>
                         </div>

                         {isAuthenticated ? (
                              <>
                                   <button
                                        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                                        className=" border-2 border-blue-400 px-9 py-2 bg-blue-100 hover:bg-blue-800 hover:text-white hover: font-medium ease-in duration-300 rounded-md ml-6"
                                   >
                                        Log Out
                                   </button>
                                 <div className="cursor-pointer " onClick={showUserDashboard}>
                                 <img src={user.picture} className="w-[33px] rounded-2xl"/>
                                 </div>
                              </>
                         ) : (
                              <button
                                   onClick={() => loginWithRedirect()}
                                   className=" border-2 border-blue-400 px-9 py-2 bg-blue-100 hover:bg-blue-800 hover:text-white hover: font-medium ease-in duration-300 rounded-md ml-6"
                              >
                                   Login
                              </button>
                         )}
                         {/* <a href="/" className="opacity-60 hover:opacity-100 text-2xl">
                              <FaGithub />
                         </a>
                         <a href="/" className="opacity-60 hover:opacity-100 text-2xl">
                              <FaLinkedin />
                         </a> */}
                         {/* <a href="/" className="opacity-60 hover:opacity-100 text-2xl ">
                              <FaTwitter />
                         </a> */}
                    </div>

                    {/* <Model isOpen = {isModelOpen} onClose={closeModel}/> */}

                    {/* FOR MOBILE DEVICES */}
                    {/* <div className="md:hidden z-15">
                         <button onClick={toggleMenu}>
                              {isMenuOpen ? <RxCross1 /> : <RxHamburgerMenu className=" w-5 h-6 " />}
                         </button>
                    </div> */}
               </nav>
               {/* MENU FOR MOBILE SCREEN */}
               <ul
                    className={`bg-white md:hidden gap-12 text-lg block space-y-4 px-5 py-6 mt-24 ${
                         isMenuOpen ? "fixed top-0 left-0 w-full transition-all ease-out duration-150" : "hidden"
                    }`}
               >
                    {navItems.map(({ path, link }) => (
                         <li key={link}>
                              <NavLink onClick={toggleMenu} to={path}>
                                   {" "}
                                   {link}
                              </NavLink>
                         </li>
                    ))}
               </ul>
               <div className="absolute right-5 md:right-10 transition-opacity duration-500">
               {showDashboard && <UserDashboard user={obfuscateEmail(user.name)} />}
               </div>
          </header>
     );
};

export default Navbar;
