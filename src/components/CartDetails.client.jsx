import {
  CartCheckoutButton,
  CartLineProvider,
  useCart,
} from "@shopify/hydrogen";
import { CartLineItem, OrderSummary } from "./CartFunctions.client";

const CartDetails = ({ onClose }) => {
  const { lines } = useCart();

  return (
    <form className="grid grid-cols-1 h-[calc(100vh-6rem)]">
      <section className="px-4 pb-4 transition md:px-12">
        <ul className="grid gap-6 md:gap-10 overflow-y-scroll">
          {lines.map((line) => {
            return (
              <CartLineProvider key={line.id} line={line}>
                <CartLineItem />
              </CartLineProvider>
            );
          })}
        </ul>
      </section>
      <section>
        <span>Order summary</span>
        <OrderSummary />
        <CartCheckoutButton />
      </section>
    </form>
  );
};

export default CartDetails;
