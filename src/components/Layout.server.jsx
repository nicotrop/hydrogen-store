import { useShopQuery, CacheLong, gql, Seo } from "@shopify/hydrogen";
import { Suspense } from "react";
import Header from "./Header.client";

const Layout = ({ children }) => {
  const SHOP_QUERY = gql`
    query shopInfo {
      shop {
        name
        description
      }
    }
  `;

  const {
    data: { shop },
  } = useShopQuery({
    query: SHOP_QUERY,
    cache: CacheLong(),
  });

  return (
    <>
      <Suspense>
        <Seo
          type="defaultSeo"
          data={{ title: shop.name, description: shop.description }}
        />
      </Suspense>
      <div className="antialiased bg-slate-300 min-h-screen pr-6 pl-6 md:pr-8 md:pl-8 lg:pl-12 lg:pr-12 min-w-screen">
        <Header shop={shop} />
        <main className="pb-6">
          <Suspense fallback={null}>{children}</Suspense>
        </main>
      </div>
    </>
  );
};

export default Layout;
