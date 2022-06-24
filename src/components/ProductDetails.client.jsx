import { ProductOptionsProvider } from "@shopify/hydrogen";
import ProductForm from "./ProductForm.client";
import ProductGallery from "./ProductGallery.client";

const ProductDetails = ({ product }) => {
  return (
    <ProductOptionsProvider data={product}>
      <section className="w-full border-2 border-black grid grid-cols-2 gap-4">
        <div className="border-2 border-black">
          <ProductGallery media={product.media.nodes} />
        </div>
        <div className="p-4">
          <h1 className="font-extrabold text-2xl mb-3">{product.vendor}</h1>
          <span>
            <div
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            ></div>
            <ProductForm product={product} />
          </span>
        </div>
      </section>
    </ProductOptionsProvider>
  );
};

export default ProductDetails;
