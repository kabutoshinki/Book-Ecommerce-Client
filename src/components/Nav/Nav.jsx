import "./Nav.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { navLinks } from "../../data/data";
import Logo from "../../assets/book-logo-2.gif";
import { VscMenu } from "react-icons/vsc";
import { GrClose } from "react-icons/gr";
import { useState } from "react";
import SuggestBooks from "../SuggestBook/SuggestBooks";
import { getUserInfo } from "../../utils/getUserInfo";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { BsBag } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { authApi } from "../../services/auth-api";
import { useQuery } from "@tanstack/react-query";
import { cartApi } from "../../services/cart-api";
import { generateDeviceId } from "../../utils/generateDeviceId";
import { Badge } from "antd";
export default function Nav() {
  const [isNavLinksShowing, setIsNavLinksShowing] = useState(false);
  const userInfo = getUserInfo();
  const userId = userInfo ? userInfo.sub : generateDeviceId();
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["cartQuantity"],
    queryFn: () => cartApi.getCartQuantity(userId),
  });
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
  const handleLogout = () => {
    authApi.logout();
    navigate("/");
  };

  return (
    <nav>
      <div className="container nav-container">
        {/* ......................Logo............................ */}
        <Link to={"/"} className="logo">
          <img src={Logo} alt="logo" />
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
          <Link to={"/cart"} className="management-icons">
            <Badge count={data || 0} size="small">
              <BsBag />
            </Badge>
          </Link>
          {userInfo ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar src={userInfo.avatar} size="sm" />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" disabledKeys={["profile"]} variant="flat">
                <DropdownSection aria-label="Profile & Actions" showDivider>
                  <DropdownItem isReadOnly key="profile" className="h-14 gap-2 opacity-100">
                    <User
                      name={userInfo.email}
                      classNames={{
                        name: "text-default-600",
                        description: "text-default-500",
                      }}
                      avatarProps={{
                        size: "sm",
                        src: userInfo.avatar,
                      }}
                    />
                  </DropdownItem>
                  <DropdownItem key="my-profile" onClick={() => navigate("/profile")}>
                    My Profile
                  </DropdownItem>
                  <DropdownItem key="order-history" onClick={() => navigate("/order_history")}>
                    Order History
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection aria-label="Help & Feedback">
                  <DropdownItem key="logout" onClick={handleLogout}>
                    Logout
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Link to={"/login"} className="management-icons">
              <FiUser />
            </Link>
          )}
          <button className="menu-button" onClick={() => setIsNavLinksShowing(!isNavLinksShowing)}>
            {!isNavLinksShowing ? <VscMenu /> : <GrClose />}
          </button>
        </div>
      </div>
    </nav>
  );
}
