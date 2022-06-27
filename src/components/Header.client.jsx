import { useUrl, Link, useCart } from "@shopify/hydrogen";
import Drawer from "./Drawer.client";
import useDrawer from "./useDrawer.client";

const Header = ({ shop }) => {
  const { pathname } = useUrl();
  const { isOpen, openDrawer, closeDrawer } = useDrawer();

  const isHome = pathname === "/";

  return (
    <>
      <Drawer open={isOpen} onClose={closeDrawer}></Drawer>
      <header className="flex justify-between pt-4 pb-4">
        <div></div>
        <div>
          <Link className="uppercase font-extrabold text-xl" to="/">
            {shop.name}
          </Link>
        </div>
        <button className="text-xl" onClick={openDrawer}>
          <IconBag />
          <CartBadge dark={isHome} />
        </button>
      </header>
    </>
  );
};

export default Header;

const IconBag = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-7 h-7"
    >
      <title>Bag</title>
      <path
        fillRule="evenodd"
        d="M8.125 5a1.875 1.875 0 0 1 3.75 0v.375h-3.75V5Zm-1.25.375V5a3.125 3.125 0 1 1 6.25 0v.375h3.5V15A2.625 2.625 0 0 1 14 17.625H6A2.625 2.625 0 0 1 3.375 15V5.375h3.5ZM4.625 15V6.625h10.75V15c0 .76-.616 1.375-1.375 1.375H6c-.76 0-1.375-.616-1.375-1.375Z"
      />
    </svg>
  );
};

const CartBadge = ({ dark }) => {
  const { totalQuantity } = useCart();

  if (totalQuantity < 1) {
    return null;
  }
  return (
    <div
      className={`${
        dark ? "text-black bg-white" : "text-white bg-black"
      } absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px`}
    >
      <span>{totalQuantity}</span>
    </div>
  );
};
