import { privateAxios } from "./AxiosService";
import { ADMIN_CATEGORY_PAGE_SIZE } from "./HelperService";

export const addCategory = (category) => {
  return privateAxios
    .post("/categories", category)
    .then((response) => response.data);
};

export const addCategoryImage = (file, categoryId) => {
  const data = new FormData();
  data.append("categoryImage", file);
  return privateAxios
    .post(`/categories/image/${categoryId}`, data)
    .then((res) => res.data);
};

export const getCategories=(pageNumber=0,pageSize=ADMIN_CATEGORY_PAGE_SIZE)=>{
  return privateAxios.get(`/categories?pageNumber=${pageNumber}&pageSize=${pageSize}`).then(response=>response.data);
}
export const deleteCategory=(categoryId)=>{
  return privateAxios.delete(`/categories/${categoryId}`).then(res=>res.data)
}

export const updateCategory=(category)=>{
 return privateAxios.put(`/categories/${category.categoryId}`,category).then(res=>res.data)
}
