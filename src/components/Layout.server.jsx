import {
  useShopQuery,
  CacheLong,
  gql,
  useUrl,
  Link,
  Seo,
} from "@shopify/hydrogen";
import { Suspense } from "react";

const Layout = ({ children }) => {
  const { pathname } = useUrl();
  const isHome = pathname === "/";

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
        <header className="border-2 border-solid mb-4 flex justify-center items-center h-20 font-extrabold uppercase hover:text-gray-600 hover:cursor-pointer	">
          <Link to="/">{shop.name}</Link>
        </header>
        <main className="pb-6">
          <Suspense>{children}</Suspense>
        </main>
      </div>
    </>
  );
};

export default Layout;
