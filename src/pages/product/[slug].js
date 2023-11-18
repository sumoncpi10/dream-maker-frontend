import { useRouter } from "next/router";
import LayoutOne from "../../components/layouts/LayoutOne";
import { capitalizeFirstLetter } from "../../common/utils";
import { getProductsBySlug } from "../../common/shopUtils";
import ProductDetailOne from "../../components/productDetail/ProductDetailOne";

export async function getServerSideProps(context) {
  console.log(context.params)
  try {
    const res = await fetch(`https://dream-maker-super-shop-backend.vercel.app/api/v1/products/slug/${context.params.slug}`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();

    return {
      props: {
        productData: data.data,
      },
    };
  } catch (error) {
    return {
      props: {
        productData: [],
        error: 'Failed to fetch data',
      },
    };
  }
}

function Pid({ productData }) {
  console.log(productData)
  return (
    <LayoutOne title={productData && capitalizeFirstLetter(productData?.name)} clearSpaceTop>
      {productData && <ProductDetailOne data={productData} />}
    </LayoutOne>
  );
}

export default Pid;
