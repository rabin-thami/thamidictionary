"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const menuItems = [
  { name: "Home", link: "/" },
  { name: "Explore", link: "/" },
  { name: "About", link: "/" },
  { name: "Contact", link: "/" },
  { name: "Login", link: "/auth/login" },
];

const Navbar = () => {
  const [isToggle, setIsToggle] = useState<boolean>(false);

  const handleToggle = () => setIsToggle(!isToggle);
  return (
    <nav className="flex justify-between p-4 w-full shadow items-center">
      <div>
        <span className="font-medium text-lg sm:text-xl">Thami Dictionary</span>
      </div>

      {/* ==== Desktop Nav ====*/}
      <div className="hidden md:flex gap-4 lg:gap-6 items-center">
        {menuItems.map((item) => (
          <Link
            href={item.link}
            key={item.name}
            className="hover:text-primary transition-all duration-150 text-sm lg:text-base"
          >
            {item.name === "Login" ? <Button size="sm">{item.name}</Button> : item.name}
          </Link>
        ))}
      </div>

      {/* ==== Mobile Nav ====*/}
      <Menu onClick={handleToggle} className="hover:cursor-pointer md:hidden h-6 w-6" />

      {/* Backdrop overlay with blur */}
      {isToggle && (
        <button
          type="button"
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[40] transition-opacity duration-300 cursor-default md:hidden"
          onClick={handleToggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleToggle();
            }
          }}
          aria-label="Close navigation menu"
        />
      )}

      <div
        className={`fixed h-screen right-0 top-0 bg-background drop-shadow-xl transition-transform transform z-[50] ${
          isToggle ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "75%", maxWidth: "20em" }}
      >
        <span className="flex justify-end mt-5 mr-5">
          <X
            onClick={handleToggle}
            className="text-foreground hover:text-primary hover:cursor-pointer transition-colors duration-150 h-6 w-6"
          />
        </span>
        <div className="font-semibold p-6">
          <div className="flex flex-col gap-3">
            {menuItems.map((item) => (
              <Link
                href={item.link}
                key={item.name}
                className="hover:text-primary transition-all duration-150 text-foreground text-lg py-2"
                onClick={handleToggle}
              >
                {item.name === "Login" ? (
                  <Button className="w-full">{item.name}</Button>
                ) : (
                  item.name
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
