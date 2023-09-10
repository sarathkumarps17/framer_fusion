import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getPlaiceholder } from "plaiceholder";
async function fetcher(url: string) {
  const response = await fetch(url);
  return Buffer.from(await response.arrayBuffer());
}
export default async function Frame({ url }: { url: string }) {
  const buffer = await fetcher(url);
  const plaiceholder = await getPlaiceholder(buffer);
  return (
    <div className="w-1/3 md:w-auto border-primary border-1">
      <AspectRatio ratio={16 / 9}>
        <Image
          src={url}
          alt=""
          placeholder="blur"
          blurDataURL={plaiceholder.base64}
          fill
        />
      </AspectRatio>
    </div>
  );
}
