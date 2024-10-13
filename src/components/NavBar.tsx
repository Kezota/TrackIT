import { useState } from "react";

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

export default function NavBar({ currentNav }: { currentNav: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ["Home", "Attendance", "Profile", "Lecturer"];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">TrackIT</p>
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
          <Button as={Link} color="primary" href="/login" variant="flat">
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              className="w-full"
              href="#"
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
