import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { UserContext } from "./UserContext";
import {
  addItemToCart,
  addItemsToCart,
  clearCart,
  getCart,
  removeItemFromCart,
} from "../services/CartService";
import { toast } from "react-toastify";

export const CartContextProvider = ({ children }) => {
  const { isLogin, userData } = useContext(UserContext);
  const [cart, setCart] = useState({ items: [] });
  const [showCart, setShowCart] = useState(false);
  const showCartSideBar = () => {
    setShowCart(!showCart);
  };
  const loadUserCart = async (userId = 1) => {
    try {
      if (isLogin) {
        if (cart.items.length > 0) {
          const data = await addItemsToCart(userData.userId, cart);
          localStorage.setItem("cart", JSON.stringify({ items: [] }));
          // setCart({ ...data });
        }
        const data = await getCart(userId);
        setCart({ ...data });
      } else {
        const crt = JSON.parse(localStorage.getItem("cart"));
        setCart(crt ? crt : { items: [] });
      }
    } catch (e) {
      console.log(e);
      setCart({ items: [] });
    }
  };

  const addItem = async (product, quantity) => {
    try {
      if (isLogin) {
        console.log(quantity,"loginq")
        const data = await addItemToCart(
          userData.userId,
          product.productId,
          quantity
        );
        setCart({ ...data });
      } else {
        if (cart.items.length == 0) {
          setCart({
            items: [{ product, quantity: 1, price: product.discountedPrice }],
          });
        } else {
          if (
            cart.items.some(
              (item) => item.product.productId === product.productId
            )
          ) {
            setCart({
              items: cart.items.map((item) => {
                item.quantity =
                  item.product.productId == product.productId
                    ? item.quantity + quantity
                    : item.quantity;
                item.price =
                  item.product.productId == product.productId
                    ? quantity > 0
                      ? item.price + product.discountedPrice
                      : item.price - product.discountedPrice
                    : item.price;
                    console.log(item.price,"item price")
                return item;
              }),
            });
          } else {
            setCart({
              items: [
                ...cart.items,
                {
                  product: product,
                  quantity: 1,
                  price: product.discountedPrice,
                },
              ],
            });
          }
        }
      }
    } catch (e) {
      console.log(e);
      toast.error("error while adding item to cart");
    }
  };
  const removeItemFrmCart = async (itemId, productId) => {
    try {
      if (itemId) {
        const data = await removeItemFromCart(userData.userId, itemId);
      }
      if (cart.items.length > 1) {
        if (itemId) {
          setCart({
            ...cart,
            items: cart.items.filter((item) => {
              if (item.cartItemId != itemId) {
                return item;
              }
            }),
          });
        } else {
          setCart({
            ...cart,
            items: cart.items.filter((item) => {
              if (item.product.productId != productId) {
                return item;
              }
            }),
          });
        }
      } else {
        setCart({ items: [] });
        localStorage.setItem("cart", JSON.stringify({ items: [] }));
      }
    } catch (e) {
      console.log(e);
      toast.error("error while removing item from cart");
    }
  };
  const clearUserCart = async () => {
    try {
      if (isLogin) {
        const data = await clearCart(userData.userId);
      }
      setCart({ items: [] });
      localStorage.setItem("cart", JSON.stringify({ items: [] }));
    } catch (e) {
      toast.error("error while clear cart");
    }
  };
  useEffect(() => {
    if (isLogin) {
      loadUserCart(userData.userId);
    }
  }, [isLogin]);
  useEffect(() => {
    if (!isLogin) {
      loadUserCart();
    }
  }, []);
  useEffect(() => {
    if (!isLogin && cart.items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);
  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addItem,
        removeItemFromCart: removeItemFrmCart,
        clearCart: clearUserCart,
        showCartSideBar,
        showCart,
        setShowCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
