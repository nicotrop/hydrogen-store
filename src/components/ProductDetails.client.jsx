import { ProductOptionsProvider } from "@shopify/hydrogen";

const ProductDetails = ({ product }) => {
  return (
    <ProductOptionsProvider data={product}>
      <section>
        <div>
          <h1>{product.title}</h1>
          <span>{product.vendor}</span>
        </div>
      </section>
    </ProductOptionsProvider>
  );
};

export default ProductDetails;
