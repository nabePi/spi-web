"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { listingHref } from "@/lib/listingHref";

type ListingPageLinkProps = {
  href: string;
  pageLabel?: string;
  className?: string;
  children: ReactNode;
};

const ListingPageLink = ({
  href,
  pageLabel,
  className,
  children,
}: ListingPageLinkProps) => {
  const pathname = usePathname();

  return (
    <Link href={listingHref(href, pathname, pageLabel)} className={className}>
      {children}
    </Link>
  );
};

export default ListingPageLink;
