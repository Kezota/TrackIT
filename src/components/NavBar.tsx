import { useEffect, useState } from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { useLocation } from "react-router-dom";
import getLoggedUser from "@/helper/getLoggedUser";
import onLogout from "@/helper/onLogout";

export default function NavBar({ currentNav }: { currentNav: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const isCurrentPage = (path: string) => location.pathname === path;

  useEffect(() => {
    const loggedUser = getLoggedUser();

    if (loggedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const menuItems = ["Home", "Attendance", "Profile", "Lecturer"];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      className="lg:px-[10%]"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="">
          <p className="font-bold text-inherit">
            <Link href="/" className="cursor-pointer text-xl">
              TrackIT
            </Link>
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-10 sm:flex" justify="center">
        <NavbarItem isActive={currentNav === "home"}>
          <Link
            color={currentNav !== "home" ? "foreground" : undefined}
            href="/"
            aria-current={currentNav === "home" ? "page" : undefined}
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={currentNav === "attendance"}>
          <Link
            color={currentNav !== "attendance" ? "foreground" : undefined}
            href="/attendance"
            aria-current={currentNav === "attendance" ? "page" : undefined}
          >
            Attendance
          </Link>
        </NavbarItem>
        <NavbarItem isActive={currentNav === "profile"}>
          <Link
            color={currentNav !== "profile" ? "foreground" : undefined}
            href="/profile"
            aria-current={currentNav === "profile" ? "page" : undefined}
          >
            Profile
          </Link>
        </NavbarItem>
        <NavbarItem isActive={currentNav === "lecturer"}>
          <Link
            color={currentNav !== "lecturer" ? "foreground" : undefined}
            href="/lecturer"
            aria-current={currentNav === "lecturer" ? "page" : undefined}
          >
            Lecturer
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem isActive={currentNav === "login"}>
          {isLoggedIn ? (
            <Button as={Link} color="primary" onClick={onLogout} variant="flat">
              Logout
            </Button>
          ) : (
            <Button as={Link} color="primary" href="/login" variant="flat">
              Login
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={isCurrentPage(`/${item}`) ? "primary" : "foreground"}
              className="w-full"
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
