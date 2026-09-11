export type ListingPaginationItem = {
  label: string;
  href: string;
  active?: boolean;
  ellipsis?: boolean;
  direction?: "prev" | "next";
};
