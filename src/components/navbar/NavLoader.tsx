import { Skeleton } from "../ui/skeleton";
import ThemeSwitch from "./ThemeSwitch";

export default function NavLoader() {
  return (
    <div className="flex items-center w-full justify-end space-x-5">
      <ThemeSwitch />
      <Skeleton className="h-8 w-60" />
      <Skeleton className="h-12 w-12 rounded-full" />
    </div>
  );
}
