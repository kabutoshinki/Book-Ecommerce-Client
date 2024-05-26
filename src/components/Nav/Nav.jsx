import "./Nav.css";
import { Link, NavLink } from "react-router-dom";
import { navLinks, navRight } from "../../data/data";
import Logo from "../../assets/book-logo-2.gif";
import { VscMenu } from "react-icons/vsc";
import { GrClose } from "react-icons/gr";
import { useState } from "react";

import SuggestBooks from "../SuggestBook/SuggestBooks";

export default function Nav() {
  const [isNavLinksShowing, setIsNavLinksShowing] = useState(false);

  if (innerWidth < 1024) {
    window.addEventListener("scroll", () => {
      document.querySelector(".nav-links").classList.add("navLinksHide");
      setIsNavLinksShowing(false);
    });
  }
  window.addEventListener("scroll", () => {
    document.querySelector("nav").classList.toggle("navShadow", window.screenY > 0);
    setIsNavLinksShowing(false);
  });

  return (
    <nav>
      <div className="container nav-container">
        {/* ......................Logo............................ */}
        <Link to={"/"} className="logo">
          <img src={Logo} alt />
        </Link>

        {/* Search Suggests */}
        <SuggestBooks />

        {/* ......................Nav Link............................ */}
        <ul className={`nav-links ${isNavLinksShowing ? "navLinksShow" : "navLinksHide"}`}>
          {navLinks.map(({ name, path }, index) => {
            return (
              <li key={index}>
                <NavLink to={path} className={({ isActive }) => (isActive ? "active" : "")}>
                  {name}
                </NavLink>
              </li>
            );
          })}
        </ul>
        {/* ......................Nav Right Link............................ */}
        <div className="nav-right">
          {navRight.managements.map((item, index) => {
            return (
              <Link key={index} to={item.link} className="management-icons">
                <item.icon />
              </Link>
            );
          })}
          <button className="menu-button" onClick={() => setIsNavLinksShowing(!isNavLinksShowing)}>
            {!isNavLinksShowing ? <VscMenu /> : <GrClose />}
          </button>
        </div>
      </div>
    </nav>
  );
}
