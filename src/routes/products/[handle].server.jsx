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

const Product = ({}) => {
  const { handle } = useRouteParams();

  const PRODUCT_QUERY = gql`
    fragment MediaFields on Media {
      mediaContentType
      alt
      previewImage {
        url
      }
      ... on MediaImage {
        id
        image {
          url
          width
          height
        }
      }
    }
    query Product($handle: String!) {
      product(handle: $handle) {
        id
        title
        vendor
        descriptionHtml
        media(first: 7) {
          nodes {
            ...MediaFields
          }
        }
        variants(first: 100) {
          nodes {
            id
            availableForSale
            compareAtPriceV2 {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            image {
              id
              url
              altText
              width
              height
            }
            priceV2 {
              amount
              currencyCode
            }
            sku
            title
            unitPrice {
              amount
              currencyCode
            }
          }
        }
        seo {
          description
          title
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
      <ProductDetails product={product} />
    </Layout>
  );
};

export default Product;
