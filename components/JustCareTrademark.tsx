import Image from "next/image";

export default function JustCareTrademark() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-6 text-center text-xs text-muted-foreground">
      <div className="flex items-center gap-2">
        <Image
          src="/assets/icons/logo-full.svg"
          alt="JustCare Pvt. Limited Trademark Logo"
          width={40}
          height={40}
          className="inline-block"
        />
        <span className="font-semibold text-sm text-foreground">JustCare Pvt. Limited<sup>™</sup></span>
      </div>
      <span className="block">All rights reserved by S.Jeston Singh.</span>
    </div>
  );
} 