import Frame from "@/components/shop/Frame";

export default function Home() {
  const baseArray = Array.from(Array(200).keys());
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-2">
        {baseArray.map((ind) => (
          <Frame
            key={ind}
            url={`https://picsum.photos/600?random=${ind + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
