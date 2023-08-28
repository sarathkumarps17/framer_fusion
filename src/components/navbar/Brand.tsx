import { Dancing_Script } from "next/font/google";
import { default as cs } from "classnames";
const dancingScript = Dancing_Script({
  weight: ["500", "700"],
  subsets: ["latin"],
});

export default function BrandName() {
  return (
    <div className={cs(dancingScript.className, "text-5xl flex items-end")}>
      <span className="text-6xl">F</span>
      <span>ramer</span>
    </div>
  );
}
