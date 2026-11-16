import { Circle, LoaderCircle } from "lucide-react";
import Image from "next/image";

export default function Loading() {
  return (
    <>
      <div className=" relative grid items-center justify-center min-h-screen bg-background overflow-hidden">
        <div>
          <Image
            src="/media/images/sea_logo.webp"
            alt="Loading"
            width={300}
            height={150}
            className="mx-auto z-10"
          />
          <LoaderCircle className="animate-spin mx-auto text-primary z-10" size={48} />
          <Circle fill="currentColor" className="z-0 absolute -top-[200px] -start-[200px] opacity-50" size={400} />
          <Circle fill="currentColor" className="z-0 absolute -bottom-[200px] -end-[200px] opacity-20" size={400} />
        </div>
      </div>
    </>
  );
}
