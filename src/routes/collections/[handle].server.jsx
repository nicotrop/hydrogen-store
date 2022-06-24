import { Suspense } from "react";
import {
  useRouteParams,
  useShopQuery,
  gql,
  Seo,
  useServerAnalytics,
  ShopifyAnalyticsConstants,
} from "@shopify/hydrogen";
import Layout from "../../components/Layout.server";
import ProductCard from "../../components/ProductCard.server";

const Collection = () => {
  const { handle } = useRouteParams();

  const QUERY = gql`
    query CollectionDetails($handle: String!) {
      collection(handle: $handle) {
        title
        id
        description
        seo {
          description
          title
        }
        image {
          id
          url
          width
          height
          altText
        }
        products(first: 10) {
          nodes {
            id
            title
            publishedAt
            handle
            variants(first: 1) {
              nodes {
                id
                image {
                  url
                  altText
                  width
                  height
                }
                priceV2 {
                  amount
                  currencyCode
                }
                compareAtPriceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  `;

  const {
    data: { collection },
  } = useShopQuery({
    query: QUERY,
    variables: {
      handle,
    },
  });

  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.collection,
      resourceId: collection.id,
    },
  });

  return (
    <Layout>
      <Suspense>
        <Seo type="collection" data={collection} />
      </Suspense>
      <h2 className="font-extrabold text-3xl mb-4 mt-4">{collection.title}</h2>
      <section>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1">
          {collection.products.nodes.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </section>
    </Layout>
  );
};

export default Collection;
