import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Banners from "../components/shop/Banners";
import LayoutOne from "../components/layouts/LayoutOne";
import ShopLayout from "../components/shop/ShopLayout";
import productData from "../data/product.json";
import useProductData from "../common/useProductData";
import ShopLayoutHome from "@/components/shop/ShopLayoutHome";
export async function getStaticProps() {
  const res = await fetch('https://dream-maker-super-shop-backend.vercel.app/api/v1/products/product-type');
  const data = await res.json();

  return {
    props: {
      productDataBooks: data.data,
    },
    revalidate: 10,
  };
}
export default function Home({ productDataBooks }) {
  console.log(productDataBooks)
  const router = useRouter();
  const globalState = useSelector((state) => state.globalReducer);
  const data = useProductData(
    productData,
    globalState.category,
    router.query.q
  );
  const { category: globalCategory } = useSelector((state) => state.globalReducer);
  // const dataBooks = useProductData(
  //   productDataBooks?.healthAndBeauty,
  //   globalState.category,
  //   router.query.q
  // );
  console.log(data)
  return (
    <LayoutOne title="Homepage 1" style={{ padding: '20px' }}>
      <Banners />
      {
        globalCategory == 'All' ? <>
          {/* <ShopLayoutHome
            eightColumn
            typeSc="Women's & Girl's Fashion"
            shopSidebarResponsive={{ xs: 24, lg: 4 }}
            shopContentResponsive={{ xs: 32, lg: 24 }}
            productResponsive={{ xs: 24, sm: 8, md: 4, lg: 3, xl: 3 }}
            productPerPage={8}
            data={[...productDataBooks]}
          /> */}
          <ShopLayoutHome
            eightColumn
            typeSc='Health & Beauty'
            shopSidebarResponsive={{ xs: 24, lg: 4 }}
            shopContentResponsive={{ xs: 32, lg: 24 }}
            productResponsive={{ xs: 24, sm: 8, md: 4, lg: 3, xl: 3 }}
            productPerPage={8}
            data={[...productDataBooks?.healthAndBeauty]}
          />
          <ShopLayoutHome
            eightColumn
            typeSc='Electronics Accessories'
            shopSidebarResponsive={{ xs: 24, lg: 4 }}
            shopContentResponsive={{ xs: 32, lg: 24 }}
            productResponsive={{ xs: 24, sm: 8, md: 4, lg: 3, xl: 3 }}
            productPerPage={8}
            data={[...productDataBooks?.electronicAccessories]}
          />
          <ShopLayoutHome
            eightColumn
            typeSc='Electronics Devices'
            shopSidebarResponsive={{ xs: 24, lg: 4 }}
            shopContentResponsive={{ xs: 32, lg: 24 }}
            productResponsive={{ xs: 24, sm: 8, md: 4, lg: 3, xl: 3 }}
            productPerPage={8}
            data={[...productDataBooks?.electronicsDevices]}
          />
          <ShopLayoutHome
            eightColumn
            typeSc='Watches, Bags, Jewellery'
            shopSidebarResponsive={{ xs: 24, lg: 4 }}
            shopContentResponsive={{ xs: 32, lg: 24 }}
            productResponsive={{ xs: 24, sm: 8, md: 4, lg: 3, xl: 3 }}
            productPerPage={8}
            data={[...productDataBooks?.watchesBagsJewellery]}
          />
          <ShopLayoutHome
            eightColumn
            typeSc="Men & Boy's Fashion"
            shopSidebarResponsive={{ xs: 24, lg: 4 }}
            shopContentResponsive={{ xs: 32, lg: 24 }}
            productResponsive={{ xs: 24, sm: 8, md: 4, lg: 3, xl: 3 }}
            productPerPage={8}
            data={[...productDataBooks?.menAndBoysFashion]}
          />
          <ShopLayoutHome
            eightColumn
            typeSc="Home & Lifestyle"
            shopSidebarResponsive={{ xs: 24, lg: 4 }}
            shopContentResponsive={{ xs: 32, lg: 24 }}
            productResponsive={{ xs: 24, sm: 8, md: 4, lg: 3, xl: 3 }}
            productPerPage={8}
            data={[...productDataBooks?.homeAndLifestyle]}
          />
          <ShopLayoutHome
            eightColumn
            typeSc="Sports & Outdoors"
            shopSidebarResponsive={{ xs: 24, lg: 4 }}
            shopContentResponsive={{ xs: 32, lg: 24 }}
            productResponsive={{ xs: 24, sm: 8, md: 4, lg: 3, xl: 3 }}
            productPerPage={8}
            data={[...productDataBooks?.sportsAndOutdoors]}
          />
          <ShopLayoutHome
            eightColumn
            typeSc="Groceries"
            shopSidebarResponsive={{ xs: 24, lg: 4 }}
            shopContentResponsive={{ xs: 32, lg: 24 }}
            productResponsive={{ xs: 24, sm: 8, md: 4, lg: 3, xl: 3 }}
            productPerPage={8}
            data={[...productDataBooks?.groceries]}
          />
          <ShopLayoutHome
            eightColumn
            typeSc="Automotive & Motorbike"
            shopSidebarResponsive={{ xs: 24, lg: 4 }}
            shopContentResponsive={{ xs: 32, lg: 24 }}
            productResponsive={{ xs: 24, sm: 8, md: 4, lg: 3, xl: 3 }}
            productPerPage={8}
            data={[...productDataBooks?.automotiveMotorbike]}
          />
        </> :
          <ShopLayout
            fiveColumn
            shopSidebarResponsive={{ xs: 24, lg: 4 }}
            shopContentResponsive={{ xs: 24, lg: 20 }}
            productResponsive={{ xs: 12, sm: 8, md: 6 }}
            productPerPage={15}
            data={[...data]}
          />
      }


    </LayoutOne>
  );
}

