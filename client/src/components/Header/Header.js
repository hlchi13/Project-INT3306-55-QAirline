import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo2.svg";
function Header() {
  return (
    <nav className="sticky">
        <Link to="/" className="flex items-center">
                    <img
                        src={logo}
                        className="h-full w-full sm:h-11 p-1.5"
                        style={{width: "200px", height: "100px"}}
                        alt="QAriline Logo"
                    />
        </Link>
        <button><a href="">Đặt vé máy bay</a></button>
        <button><a href="">Thông tin hành trình</a></button>
        <button><a href="">Liên hệ</a></button>
        
    </nav>
  );
}
export default Header;