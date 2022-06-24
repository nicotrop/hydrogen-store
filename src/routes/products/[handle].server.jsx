import {
  useRouteParams,
  Seo,
  gql,
  useShopQuery,
  useServerAnalytics,
  ShopifyAnalyticsConstants,
} from "@shopify/hydrogen";
import { Suspense } from "react";
import Layout from "../../components/Layout.server";
import ProductDetails from "../../components/ProductDetails.client";

const Product = ({ params }) => {
  const { handle } = useRouteParams();

  const PRODUCT_QUERY = gql`
    query Product($language: LanguageCode, $handle: String!)
    @inContext(language: $language) {
      product(handle: $handle) {
        id
        title
        seo {
          title
          description
        }
      }
    }
  `;

  const {
    data: { product },
  } = useShopQuery({
    query: PRODUCT_QUERY,
    variables: {
      handle,
    },
  });

  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.product,
      resourceId: product.id,
    },
  });

  return (
    <Layout>
      <Suspense>
        <Seo type="product" data={product} />
      </Suspense>
      <section>
        This is a product page for <strong>{handle}</strong>
      </section>
      <ProductDetails product={product} />
    </Layout>
  );
};

export default Product;
