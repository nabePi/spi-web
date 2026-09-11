export function listingHref(
  href: string | undefined,
  pathname: string,
  pageLabel?: string,
): string {
  if (href && href !== "#" && href !== "#!") return href;

  const page = pageLabel?.replace(/^0+/, "") ?? "";
  if (page && /^\d+$/.test(page) && page !== "1") {
    return `${pathname}?page=${page}`;
  }

  return pathname;
}
