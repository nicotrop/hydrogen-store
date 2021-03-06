import {
  BuyNowButton,
  ProductPrice,
  useProductOptions,
} from "@shopify/hydrogen";
import { useState } from "react";
import OptionRadio from "./OptionRadio.client";

const ProductForm = ({ product }) => {
  const { options, selectedVariant } = useProductOptions();

  const [selectedOption, setSelectedOption] = useState(selectedVariant);

  const isOutOfStock = !selectedVariant?.availableForSale || false;

  console.log(selectedOption.id);

  return (
    <form>
      <div>
        {options.map(({ name, values }, index) => {
          if (values.length === 1) {
            return null;
          }
          return (
            <div key={index}>
              <legend>{name}</legend>
              <div className="grid grid-cols-3">
                <OptionRadio name={name} values={values} />
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <ProductPrice
          priceType="compareAt"
          variantId={selectedVariant?.id}
          data={product}
        />
        <ProductPrice variantId={selectedVariant?.id} data={product} />
      </div>
      <div>
        {isOutOfStock ? (
          <span>Available in 2-3 weeks</span>
        ) : (
          <BuyNowButton variantId={selectedVariant?.id}>
            <span>Buy it now</span>
          </BuyNowButton>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
