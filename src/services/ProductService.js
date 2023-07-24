import { privateAxios, publicAxios } from "./AxiosService";

export const createProductWithoutCategory = (product) => {
  return privateAxios
    .post(`/products`, product)
    .then((response) => response.data);
};
export const createProductInCategory = (product, categoryId) => {
  return privateAxios
    .post(`/categories/${categoryId}/products`, product)
    .then((response) => response.data);
};
export const addProductImage = (file, productId) => {
  const formData = new FormData();
  formData.append("ProductImage", file);
  return privateAxios
    .post(`/products/image/${productId}`, formData)
    .then((response) => response.data);
};
export const getAllProducts=(pageNumber=0,pageSize=10,sortBy="addedDate",sortDir="asc")=>{
    return privateAxios.get(`/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`).then(res=>res.data);
}
export const getAllProductsOfCategories=(categoryId,pageNumber=0,pageSize=10,sortBy="addedDate",sortDir="asc")=>{
    return privateAxios.get(`/categories/${categoryId}/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`).then(res=>res.data);
}
export const getSingleProduct=(productId)=>{
  return privateAxios.get(`/products/${productId}`).then(res=>res.data);
}
export const getLiveProducts=(pageNumber=0,pageSize=10,sortBy="addedDate",sortDir="asc")=>{
  return privateAxios.get(`/products/live?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`).then(res=>res.data);
}

export const deleteSingleProduct=(productId)=>{
return privateAxios.delete(`/products/${productId}`).then(res=>res.data)
}

export const updateProduct=(product)=>{
    return privateAxios.put(`/products/${product.productId}`,product).then(res=>res.data)
}
export const UpdateCategoryInProduct = (product, categoryId) => {
  return privateAxios
    .put(`/categories/products/${product.productId}`,categoryId)
    .then((response) => response.data);
};

export const searchProductsApi=(query)=>{
  return privateAxios.get(`/products/search/${query}`).then(res=>res.data)
}