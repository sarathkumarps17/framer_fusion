"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import classNames from "classnames";

function NavLinks() {
  const path = usePathname();
  const navLinks = [
    { link: "Home", path: "/" },
    { link: "Shop", path: "/shop" },
    { link: "Cart", path: "/cart" },
    { link: "Testimonials", path: "/testimonials" },
  ];
  return (
    <div className="flex w-96 items-end cursor-pointer justify-between font-bold">
      {navLinks.map((nav) => (
        <Link
          className={classNames(
            { "underline underline-offset-4": path === nav.path },
            "hover:text-primary"
          )}
          key={nav.link}
          href={nav.path}
        >
          {nav.link}
        </Link>
      ))}
    </div>
  );
}

export default NavLinks;
