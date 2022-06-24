import { Link, Image, Money } from "@shopify/hydrogen";

const ProductCard = ({ product }) => {
  const { priceV2: price, compareAtPriceV2: compareAtPrice } =
    product.variants?.nodes[0] || {};

  const isDiscounted = compareAtPrice?.amount > price?.amount;

  return (
    <Link to={`/products/${product.handle}`}>
      <div className="relative">
        <Image
          className="object-cover"
          data={product.variants.nodes[0].image}
          alt="Product"
        />
        {isDiscounted && <label className="absolute top-1 right-2">Sale</label>}
      </div>
      <div>
        <h3>{product.title}</h3>
        <span>
          {isDiscounted ? (
            <Money
              className="font-bold text-green-900"
              withoutTrailingZeros
              data={price}
            />
          ) : (
            <Money className="font-bold" withoutTrailingZeros data={price} />
          )}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
