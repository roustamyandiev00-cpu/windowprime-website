import Image from "next/image";
import Link from "next/link";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link className={`brand ${compact ? "brand--compact" : ""}`} href="/" aria-label="Windowprime home">
      <Image
        src="/images/windowprime-logo.png"
        alt="Windowprime ramen en deuren"
        width={1064}
        height={1000}
        priority
        unoptimized
      />
    </Link>
  );
}
