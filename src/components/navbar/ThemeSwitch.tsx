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
      <div className="cursor-pointer" onClick={toggleTheme}>
        <Bright
          className={classNames(
            !isLight ? "hidden" : "relative left-5 top-[2px] z-10 scale-50"
          )}
        />
        <Moon
          className={classNames(
            isLight ? "hidden" : "relative left-9 z-10 top-[2px] scale-50"
          )}
        />
      </div>
      <Switch
        className="mt-1"
        checked={!isLight}
        onCheckedChange={toggleTheme}
        aria-label="Toggle italic"
      ></Switch>
    </div>
  );
}
