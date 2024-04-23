export const checkValidData = (email,password) =>{
    const isEmailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    if(!isEmailValid) return "Email is not Valid";
    if(!isPasswordValid) return "Password is not Valid";

    return null;
} 
export const isNameValid = (name,email,password)=>{
    console.log(name)
    const checkName = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);
    const isEmailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    if(!checkName) return "Name is not Valid"; 
    if(!isEmailValid) return "Email is not Valid";
    if(!isPasswordValid) return "Password is not Valid";
    return null;
}