import { Link, Image, Money } from "@shopify/hydrogen";

const ProductCard = () => {
  const { priceV2: price, compareAtPriceV2: compareAtPrice } =
    product.variants?.nodes[0] || {};

  return <div>ProductCard</div>;
};

export default ProductCard;
