// export const BASE_URL=`http://localhost:9090`;
// export const BASE_URL=`http://3.7.134.102:9091`;
export const BASE_URL=`https://electrostorebackend-production.up.railway.app`;
export const ADMIN_ORDER_PAGE_SIZE=4
export const ADMIN_CATEGORY_PAGE_SIZE=10
export const ADMIN_USERS_PAGE_SIZE=10
export const getProductImageUrl=(productId)=>{
    return `${BASE_URL}/products/image/${productId}`
}
export const getUserImageUrl=(userId)=>{
    return `${BASE_URL}/users/image/${userId}`
}
export const getCategoryImageUrl=(categoryId)=>{
    return `${BASE_URL}/categories/image/${categoryId}`
}

export const formatDate=(date)=>{
    return new Date(date).toLocaleString()
}
export const defaultImage=`../../assets/profile-icon.png`