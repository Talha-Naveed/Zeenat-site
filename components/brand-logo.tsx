import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className, priority = false }: BrandLogoProps) {
  return (
    <Image
      src="/brand/zeenat-logo.svg"
      alt="Zeenat"
      width={680}
      height={325}
      className={className}
      priority={priority}
      unoptimized
    />
  );
}
