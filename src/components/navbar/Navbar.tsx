import { CartIcon } from "../icons";
import BrandName from "./Brand";
import ThemeSwitch from "./ThemeSwitch";
import User from "./User";

export default function Navbar() {
  return (
    <div className="h-16 mx-10 mt-5 flex justify-start align-middle">
      <BrandName />
      <div className="flex items-end w-full justify-end">
        <ThemeSwitch />
        <div className="mx-10">
          <CartIcon />
        </div>
        <div className="mx-5 cursor-pointer">
          <User />
        </div>
      </div>
    </div>
  );
}
