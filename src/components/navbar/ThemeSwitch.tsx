"use client";
import { Bright, Moon } from "@/components/icons";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import classNames from "classnames";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const isLight = theme === "light";
  const toggleTheme = () => (isLight ? setTheme("dark") : setTheme("light"));
  return (
    <div className="flex">
      <div className="pt-1  cursor-pointer" onClick={toggleTheme}>
        <Bright
          className={classNames(
            !isLight ? "hidden" : "relative left-5 z-10 scale-75 pb-1"
          )}
        />
        <Moon
          className={classNames(
            isLight ? "hidden" : "relative left-10 z-10 scale-75 pb-1"
          )}
        />
      </div>
      <Switch
        className="scale-125 mt-1"
        checked={!isLight}
        onCheckedChange={toggleTheme}
        aria-label="Toggle italic"
      ></Switch>
    </div>
  );
}
