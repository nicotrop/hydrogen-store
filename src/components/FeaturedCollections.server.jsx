import { gql, useShopQuery, CacheLong, Link } from "@shopify/hydrogen";

const FeaturedCollections = () => {
  const QUERY = gql`
    query featuredCollections {
      collections(first: 5, sortKey: UPDATED_AT) {
        nodes {
          id
          title
          handle
          image {
            url
          }
        }
      }
    }
  `;
  const {
    data: { collections },
  } = useShopQuery({ query: QUERY, cache: CacheLong() });

  return (
    <>
      <h2 className="font-extrabold text-3xl mb-4 mt-4">Collections</h2>
      <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap">
        {collections.nodes.map((collection) => {
          const { url } = { ...collection.image };
          if (url)
            return (
              <Link
                className="mb-2 mr-2.5 sm:w-[calc((100%/2)-10px/2)] lg:w-[calc((100%/4)-10px/4)] sm:even:mr-0 lg:even:mr-2.5 lg:last:mr-0 lg:mb-0"
                key={collection.id}
                to={`/collections/${collection.handle}`}
              >
                <div className="h-28 flex justify-center bg-white border-1 shadow-lg rounded-lg p-2">
                  <img
                    className="object-cover h-full"
                    src={url}
                    alt={collection.title}
                  />
                </div>
              </Link>
            );
        })}
      </div>
    </>
  );
};

export default FeaturedCollections;
