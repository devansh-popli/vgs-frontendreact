// data save localstorage

export const doLoginLocalStorage = (data) => {
  localStorage.setItem("userData", JSON.stringify(data));
};
export const isAdminUser=()=>{
  if(isLoggedIn){
    if(getUserFromLocalStorage()?.roles.find((role)=>role.roleId=='abcd1245'))
    {
      return true;
    }
  }
  return false;
}
//data : fetch
export const getUserFromLocalStorage = () => {
const data= getDataFromLocalStorage();
if(data!=null){
    return data.user;
}
return null;
};

export const getTokenFromLocalStorage = () => {
    const data= getDataFromLocalStorage();
    if(data!=null){
        return data.jwtToken;
    }
    return null;

};

export const isLoggedIn=()=>{
    if(getTokenFromLocalStorage())
    {
        return true
    }
    else{
        return false
    }
}
export const getDataFromLocalStorage = () => {
  const data = localStorage.getItem("userData");
  if (data != null) {
    return JSON.parse(data);
  }
  return null;
};
//log out
export const doLogoutFromLocalStorage = () => {
  localStorage.removeItem("userData");
};
