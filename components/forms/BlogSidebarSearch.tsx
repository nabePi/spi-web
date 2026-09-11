import ToastForm from "@/components/forms/ToastForm";
import SearchIcon from "@/icons/SearchIcon";

const BlogSidebarSearch = ({ placeholder }: { placeholder: string }) => (
  <div className="blog-sidebar__search">
    <ToastForm successMessage="Search submitted.">
      <input type="text" name="q" placeholder={placeholder} required />
      <button type="submit">
        <SearchIcon />
      </button>
    </ToastForm>
  </div>
);

export default BlogSidebarSearch;
