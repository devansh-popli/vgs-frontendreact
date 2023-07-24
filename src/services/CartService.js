import { privateAxios } from "./AxiosService";
// get cart
export const getCart = async (userId) => {
  const res = await privateAxios.get(`/carts/${userId}`);
  return res.data;
};

//add item to cart
export const addItemToCart = async (userId, productId, quantity) => {
  const res = await privateAxios.post(`/carts/${userId}`, {
    productId,
    quantity,
  });
  return res.data;
};
//add all localstorage items to cart
export const addItemsToCart = async (userId, cart) => {
  const arr=cart.items.map(item=>{
    return {productId:item.product.productId,quantity:item.quantity}
  })
  const res = await privateAxios.post(`/carts/list/${userId}`, {
    cart:arr
  });
  return res.data;
};

export const clearCart = async (userId) => {
  console.log(userId,"userID")
  const res = await privateAxios.delete(`/carts/${userId}`);
  return res.data;
};

export const removeItemFromCart = async (userId, itemId) => {
  const res = await privateAxios.delete(`/carts/${userId}/items/${itemId}`);
  return res.data;
};
