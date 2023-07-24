import { getTokenFromLocalStorage } from "../auth/HelperAuth"
import { privateAxios } from "./AxiosService"


//regsiter new user
export const registerUser=(userData)=>{
   return privateAxios.post(`/users`,userData).then((response) => {
        return response.data
    })
}

export const loginUser=(loginData)=>{
    return privateAxios.post("/auth/login",loginData).then(response=>{
        return response.data
    })
}
export const loginUserByGoogle=(loginData)=>{
    return privateAxios.post("/auth/google",loginData).then(response=>{
        return response.data
    })
}
export const getUserById=(userId)=>{
   return privateAxios.get(`/users/${userId}`,{headers:{
    "Authorization":"Bearer " +getTokenFromLocalStorage()
}}).then((response)=>response.data)
}

export const updateUser=(user)=>{
    return privateAxios.put(`/users/${user.userId}`,user).then((response)=>response.data)
}

export const updateUserProfileImage=(file,userId)=>{
  if(file==null)
  {
    return
  }
    const data=new FormData()
    data.append("userImage",file)
    return privateAxios.post(`/users/image/${userId}`,data).then((response)=>response.data)
}

export const getAllUsers=(pageNumber,pageSize,sortBy,sortDir)=>{
return privateAxios.get(`/users?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`).then(res=>res.data)
}