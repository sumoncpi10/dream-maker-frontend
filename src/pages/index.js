import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import Banners from "../components/shop/Banners";
import LayoutOne from "../components/layouts/LayoutOne";
import ShopLayout from "../components/shop/ShopLayout";
// import productData from "../data/product.json";
import useProductData from "../common/useProductData";
export async function getStaticProps() {
  const res = await fetch('http://localhost:5000/api/v1/books');
  const data = await res.json();

  return {
    props: {
      productData: data.data,
    },
  };
}
export default function Home({ productData }) {
  console.log(productData)
  const router = useRouter();
  const globalState = useSelector((state) => state.globalReducer);
  const data = useProductData(
    productData,
    globalState.category,
    router.query.q
  );
  console.log(data)
  return (
    <LayoutOne title="Homepage 1">
      <Banners />
      <ShopLayout
        fiveColumn
        shopSidebarResponsive={{ xs: 24, lg: 4 }}
        shopContentResponsive={{ xs: 24, lg: 20 }}
        productResponsive={{ xs: 12, sm: 8, md: 6 }}
        productPerPage={15}
        data={[...data]}
      />
    </LayoutOne>
  );
}

