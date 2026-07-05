import { HiOutlineShoppingBag } from "react-icons/hi";

import Nikelogo from "../assets/nike-logo.svg?react";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink } from "react-router-dom";

export default function Nav({
  cartCount = 0,
  isDark = false,
  onCartOpen,
  detailsPath = "/details/1",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const routes = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Details", path: detailsPath },
    { label: "Services", path: "/#services" },
    { label: "Contact", path: "/contact" },
  ];
  const mobileMenu = (
    <>
      <button
        type="button"
        className={`fixed inset-0 z-[100] bg-black/40 transition-opacity lg:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
        aria-label="Close menu overlay"
      />
      <div
        className={`fixed right-0 top-0 z-[110] h-screen w-72 bg-white text-black shadow-2xl transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <button
          type="button"
          className="absolute right-6 top-6 z-[120] rounded-full border border-gray-200 bg-white p-3 text-black shadow-md transition-colors hover:bg-gray-100 focus:ring-2 focus:ring-gray-200"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
          <RxCross2 size={25} />
        </button>
        <ul className="mt-20">
          {routes.map((route) => (
            <li key={`${route.label}-${route.path}`} className="p-2">
              <Link
                to={route.path}
                className="block w-full px-4 py-3 text-left text-2xl font-semibold text-gray-400 transition-transform duration-200 hover:translate-x-2 hover:text-lime-400"
                onClick={() => setIsOpen(false)}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  return (
    <nav className="relative z-40 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" onClick={() => setIsOpen(false)} aria-label="Go to home">
        <Nikelogo className="h-20 w-20" />
      </Link>
      {/* Triger Open*/}
      <button
        type="button"
        className={`rounded-md p-2 transition-colors focus:ring-2 focus:ring-gray-200 lg:hidden ${
          isDark ? "text-white hover:bg-white/10" : "text-black hover:bg-gray-100"
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <RxHamburgerMenu size={25} />
      </button>
      {createPortal(mobileMenu, document.body)}
      {/* Desktop */}
      <div className="hidden lg:block">
        <ul className="flex gap-6">
          {routes.map((route) => (
            <li key={`${route.label}-${route.path}`}>
              <NavLink
                to={route.path}
                end={route.path === "/"}
                className={({ isActive }) =>
                  `transition-colors hover:text-lime-400 ${
                    isActive && !route.path.includes("#")
                      ? "text-lime-400"
                      : isDark
                        ? "text-white/80"
                        : "text-gray-400"
                  }`
                }
              >
                {route.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        onClick={() => onCartOpen?.()}
        className="fixed left-4 bottom-4 lg:static lg:mr-8"
        aria-label={`Open cart with ${cartCount} items`}
      >
        <div className="relative h-12 w-12 rounded-full bg-white text-black shadow-md flex-center">
          <HiOutlineShoppingBag />
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-lime-400 text-xs font-black text-black">
              {cartCount}
            </span>
          )}
        </div>
      </button>
    </nav>
  );
}
