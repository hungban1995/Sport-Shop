import { IMG_URL } from "@/constant";
import Link from "next/link";
function ItemContent({ value, name }) {
  return (
    <div className="itemContent">
      <Link
        href={`/${name}/${value?._id}`}
        style={{ textDecoration: "none", color: "#666" }}
      >
        <img src={`${IMG_URL}/${value?.images[0]}`} alt="img" />
        <div className="content">
          <h4>{value?.title}</h4>
          <span>{value?.description}</span>
        </div>
      </Link>
    </div>
  );
}

export default ItemContent;
