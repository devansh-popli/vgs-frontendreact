import { privateAxios } from "./AxiosService";
import { BASE_URL } from "./HelperService";
//get orders async await
export const getOrders = async (pageNumber, pageSize, sortBy, sortDir) => {
  let result = await privateAxios.get(
    `/orders?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
  );
  return result.data;
};

export const updateOrder = async (order) => {
  let result = await privateAxios.put(
    `${BASE_URL}/orders/${order.orderId}`,
    order
  );
  return result.data;
};
export const createOrder = async (order) => {
  let result = await privateAxios.post(`${BASE_URL}/orders/${order.cartId}/user/${order.userId}`, order);
  return result.data;
};
export const getOrdersOfUser = async (userId) => {
  let result = await privateAxios.get(
    `/orders/${userId}`
  );
  return result.data;
};
export const createdTrancationOfOrder = async (amount) => {
  let result = await privateAxios.get(
    `/orders/create-transaction-razorpay/${amount}`
  );
  return result.data;
};