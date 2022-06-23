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
      <div>
        Collection page for <strong>{collection.title}</strong>
      </div>
      <p>
        Description: <strong>{collection.description}</strong>
      </p>
    </Layout>
  );
};

export default Collection;
