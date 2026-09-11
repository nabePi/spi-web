import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = createMetadata({
  title: siteConfig.title,
  path: "/",
  absoluteTitle: true,
});

/**
 * Blank base page.
 *
 * Step 1 of the PRD implementation: proves the base layout (header `area2`,
 * footer `footer2`, global chrome, SCSS and plugin bootstrap) renders on its
 * own. Sections are composed in step 2.
 */
const Page = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>{siteConfig.name}</h1>
            <p>Halaman dasar. Konten akan ditambahkan pada tahap berikutnya.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
