import Link from "next/link";
import { PAPER_TYPE_LABELS, type PapersFilters } from "@/lib/getPapers";

interface Props {
  categories: Array<{ slug: string; name: string }>;
  years: number[];
  current: PapersFilters;
}

/** Plain GET form: filters live in the URL, no client JS needed. */
export default function PapersFilterBar({ categories, years, current }: Props) {
  const hasFilters = Boolean(
    current.q ||
      current.categorySlug ||
      current.tagSlug ||
      current.year ||
      current.paperType,
  );

  return (
    <form method="get" action="/papers" className="row g-2 align-items-end mb-5">
      <div className="col-lg-4">
        <label className="form-label small fw-medium" htmlFor="papers-q">
          Cari
        </label>
        <input
          id="papers-q"
          name="q"
          type="search"
          defaultValue={current.q ?? ""}
          placeholder="Judul, penulis, atau abstrak"
          className="form-control"
        />
      </div>
      <div className="col-6 col-lg-2">
        <label className="form-label small fw-medium" htmlFor="papers-type">
          Jenis
        </label>
        <select
          id="papers-type"
          name="type"
          defaultValue={current.paperType ?? ""}
          className="form-select"
        >
          <option value="">Semua</option>
          {Object.entries(PAPER_TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="col-6 col-lg-2">
        <label className="form-label small fw-medium" htmlFor="papers-category">
          Kategori
        </label>
        <select
          id="papers-category"
          name="category"
          defaultValue={current.categorySlug ?? ""}
          className="form-select"
        >
          <option value="">Semua</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="col-6 col-lg-2">
        <label className="form-label small fw-medium" htmlFor="papers-year">
          Tahun
        </label>
        <select
          id="papers-year"
          name="year"
          defaultValue={current.year ? String(current.year) : ""}
          className="form-select"
        >
          <option value="">Semua</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      {current.tagSlug && <input type="hidden" name="tag" value={current.tagSlug} />}
      <div className="col-6 col-lg-2 d-flex gap-2">
        <button type="submit" className="theme-btn btn-black-border flex-grow-1">
          <span>Terapkan</span>
        </button>
        {hasFilters && (
          <Link href="/papers" className="btn btn-light border" aria-label="Reset filter">
            ✕
          </Link>
        )}
      </div>
    </form>
  );
}
