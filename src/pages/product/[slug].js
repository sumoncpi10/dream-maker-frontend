import { useRouter } from "next/router";

import LayoutOne from "../../components/layouts/LayoutOne";
import { capitalizeFirstLetter } from "../../common/utils";
import { getProductsBySlug } from "../../common/shopUtils";
import productData from "../../data/product.json";
import ProductDetailOne from "../../components/productDetail/ProductDetailOne";
export async function getServerSideProps(context) {
  try {
    const res = await fetch('https://book-catalog-backend-lilac.vercel.app/api/v1/books');

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

export default function pid({ productData }) {
  console.log(productData)
  const router = useRouter();
  const { slug } = router.query;
  const foundProduct = getProductsBySlug(productData, slug);
  return (
    <LayoutOne
      title={foundProduct && capitalizeFirstLetter(foundProduct.name)}
      clearSpaceTop
    >
      {foundProduct && <ProductDetailOne data={foundProduct} />}
    </LayoutOne>
  );
}
