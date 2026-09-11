import type { ReactNode } from "react";
import type { ListingPaginationItem } from "@/types/pagination";
import ListingPageLink from "@/components/shared/ListingPageLink";

type ListingPaginationProps = {
  items: ListingPaginationItem[];
  prevIcon?: ReactNode;
  nextIcon?: ReactNode;
  className?: string;
};

const ListingPagination = ({
  items,
  prevIcon,
  nextIcon,
  className = "pagination justify-content-center",
}: ListingPaginationProps) => (
  <ul className={className}>
    {items.map((item, index) => {
      if (item.ellipsis) {
        return (
          <li key={`ellipsis-${index}`}>
            <span>{item.label}</span>
          </li>
        );
      }

      if (item.direction === "prev") {
        return (
          <li key={`prev-${index}`}>
            <ListingPageLink href={item.href}>{prevIcon}</ListingPageLink>
          </li>
        );
      }

      if (item.direction === "next") {
        return (
          <li key={`next-${index}`}>
            <ListingPageLink href={item.href}>{nextIcon}</ListingPageLink>
          </li>
        );
      }

      return (
        <li key={`page-${item.label}-${index}`}>
          <ListingPageLink
            href={item.href}
            pageLabel={item.label}
            className={item.active ? "active" : undefined}
          >
            {item.label}
          </ListingPageLink>
        </li>
      );
    })}
  </ul>
);

export default ListingPagination;
