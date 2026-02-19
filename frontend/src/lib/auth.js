import bcrypt from "bcrypt";

export function verifyAdmin(
  adminId,
  password
){
  if (adminId !== process.env.ADMIN_ID) {
    console.log("false");
    return false;
  }

  if(password !== process.env.ADMIN_PASSWORD){
    console.log("false");
    return false;
  }

  return true;
}
