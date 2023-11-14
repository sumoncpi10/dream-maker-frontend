import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Banners from "../components/shop/Banners";
import LayoutOne from "../components/layouts/LayoutOne";
import ShopLayout from "../components/shop/ShopLayout";
// import productData from "../data/product.json";
import useProductData from "../common/useProductData";
import ShopLayoutHome from "@/components/shop/ShopLayoutHome";
import Link from "next/link";
export async function getStaticProps() {
  const res = await fetch('https://dream-maker-super-shop-backend.vercel.app/api/v1/products/product-type');
  const data = await res.json();
  const resAll = await fetch('https://dream-maker-super-shop-backend.vercel.app/api/v1/products');
  const dataAll = await resAll.json();
  const resItemType = await fetch('https://dream-maker-super-shop-backend.vercel.app/api/v1/product-type/product-type');
  const dataItemType = await resItemType.json();
  return {
    props: {
      productDataHome: data.data || [],
      productData: dataAll.data || [],
      itemType: dataItemType.data || [],
    },
    revalidate: 30,
  };
}
export default function Home({ productDataHome, productData, itemType }) {
  const router = useRouter();
  console.log(productDataHome)
  console.log(productData)
  console.log(router.query.q)
  const globalState = useSelector((state) => state.globalReducer);
  const data = useProductData(
    productData,
    globalState.category,
    router.query.q
  );
  const { category: globalCategory } = useSelector((state) => state.globalReducer);
  // const dataBooks = useProductData(
  //   productDataHome?.healthAndBeauty,
  //   globalState.category,
  //   router.query.q
  // );
  // console.log(data)
  return (
    <LayoutOne title="Dream Maker" style={{ padding: '20px' }} itemType={itemType}>

      {
        globalCategory == 'All' ?
          <>

            {/* <ShopLayoutHome
              eightColumn
              typeSc="Women's & Girl's Fashion"
              shopSidebarResponsive={{ xs: 24, lg: 4 }}
              shopContentResponsive={{ xs: 32, lg: 24 }}
              productResponsive={{ xs: 24, sm: 8, md: 4, lg: 3, xl: 3 }}
              productPerPage={8}
              data={[...productDataHome]}
            /> */}
            <Banners itemType={itemType} />
            <ShopLayoutHome
              eightColumn
              typeSc='Health & Beauty'
              shopSidebarResponsive={{ xs: 24, lg: 4 }}
              shopContentResponsive={{ xs: 32, lg: 24 }}
              productResponsive={{ xs: 24, sm: 8, md: 4, lg: 3, xl: 3 }}
              productPerPage={8}
              data={[...productDataHome?.healthAndBeauty]}
            />
            <ShopLayoutHome
              eightColumn
              typeSc='Electronics Accessories'
              shopSidebarResponsive={{ xs: 24, lg: 4 }}
              shopContentResponsive={{ xs: 32, lg: 24 }}
              productResponsive={{ xs: 24, sm: 8, md: 4, lg: 3, xl: 3 }}
              productPerPage={8}
              data={[...productDataHome?.electronicAccessories]}
            />
            <ShopLayoutHome
              eightColumn
              typeSc='Electronics Devices'
              shopSidebarResponsive={{ xs: 24, lg: 4 }}
              shopContentResponsive={{ xs: 32, lg: 24 }}
              productResponsive={{ xs: 24, sm: 8, md: 4, lg: 3, xl: 3 }}
              productPerPage={8}
              data={[...productDataHome?.electronicsDevices]}
            />
            <ShopLayoutHome
              eightColumn
              typeSc='Watches, Bags, Jewellery'
              shopSidebarResponsive={{ xs: 24, lg: 4 }}
              shopContentResponsive={{ xs: 32, lg: 24 }}
              productResponsive={{ xs: 24, sm: 8, md: 4, lg: 3, xl: 3 }}
              productPerPage={8}
              data={[...productDataHome?.watchesBagsJewellery]}
            />
            <ShopLayoutHome
              eightColumn
              typeSc="Men & Boy's Fashion"
              shopSidebarResponsive={{ xs: 24, lg: 4 }}
              shopContentResponsive={{ xs: 32, lg: 24 }}
              productResponsive={{ xs: 24, sm: 8, md: 4, lg: 3, xl: 3 }}
              productPerPage={8}
              data={[...productDataHome?.menAndBoysFashion]}
            />
            <ShopLayoutHome
              eightColumn
              typeSc="Home & Lifestyle"
              shopSidebarResponsive={{ xs: 24, lg: 4 }}
              shopContentResponsive={{ xs: 32, lg: 24 }}
              productResponsive={{ xs: 24, sm: 8, md: 4, lg: 3, xl: 3 }}
              productPerPage={8}
              data={[...productDataHome?.homeAndLifestyle]}
            />
            <ShopLayoutHome
              eightColumn
              typeSc="Sports & Outdoors"
              shopSidebarResponsive={{ xs: 24, lg: 4 }}
              shopContentResponsive={{ xs: 32, lg: 24 }}
              productResponsive={{ xs: 24, sm: 8, md: 4, lg: 3, xl: 3 }}
              productPerPage={8}
              data={[...productDataHome?.sportsAndOutdoors]}
            />
            <ShopLayoutHome
              eightColumn
              typeSc="Groceries"
              shopSidebarResponsive={{ xs: 24, lg: 4 }}
              shopContentResponsive={{ xs: 32, lg: 24 }}
              productResponsive={{ xs: 24, sm: 8, md: 4, lg: 3, xl: 3 }}
              productPerPage={8}
              data={[...productDataHome?.groceries]}
            />
            <ShopLayoutHome
              eightColumn
              typeSc="Automotive & Motorbike"
              shopSidebarResponsive={{ xs: 24, lg: 4 }}
              shopContentResponsive={{ xs: 32, lg: 24 }}
              productResponsive={{ xs: 24, sm: 8, md: 4, lg: 3, xl: 3 }}
              productPerPage={8}
              data={[...productDataHome?.automotiveMotorbike]}
            />
          </>
          :
          // <></>
          <ShopLayout
            fiveColumn
            shopSidebarResponsive={{ xs: 24, lg: 4 }}
            shopContentResponsive={{ xs: 24, lg: 20 }}
            productResponsive={{ xs: 12, sm: 8, md: 6 }}
            productPerPage={15}
            data={[...data]}
            itemType={itemType}
          />
      }


    </LayoutOne>
  );
}

