import Link from "next/link";
import type { ReactNode } from "react";
import type { CategoryCardItem } from "@/types/demos/e-learning/home";
import Icon1b4e001e from "@/icons/Icon1b4e001e";
import Icon3ff34d25 from "@/icons/Icon3ff34d25";
import Icon41b350ec from "@/icons/Icon41b350ec";
import Icon5609f19f from "@/icons/Icon5609f19f";
import Icon70f5a421 from "@/icons/Icon70f5a421";
import Iconb17804b0 from "@/icons/Iconb17804b0";
import Iconc5477adf from "@/icons/Iconc5477adf";
import Iconcdb389b3 from "@/icons/Iconcdb389b3";

const categoryIcons: Record<CategoryCardItem["id"], ReactNode> = {
  programming: (
    <Icon41b350ec />
  ),
  designing: (
    <Icon70f5a421 />
  ),
  ai: (
    <Icon3ff34d25 />
  ),
  academic: (
    <Icon1b4e001e />
  ),
  language: (
    <Iconc5477adf />
  ),
  marketing: (
    <Icon5609f19f />
  ),
  business: (
    <Iconcdb389b3 />
  ),
  "data-science": (
    <Iconb17804b0 />
  ),
  health: (
    <Iconb17804b0 />
  ),
};

const CategoryCard = ({ item }: { item: CategoryCardItem }) => {
  return (
    <div className="col-xl-4 col-md-6">
      <Link href={item.href} className="category2__card">
        <div className="category2__card-icon">{categoryIcons[item.id]}</div>
        <div className="category2__card-content">
          {item.id === "ai" ? (
            <div className="category2__card-name">
              AI Intelligent
            </div>
          ) : (
            <div className="category2__card-name">{item.name}</div>
          )}
          <span className="category2__card-learners">{item.learners}</span>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
