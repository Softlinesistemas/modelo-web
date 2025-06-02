export function extractServer(email: string) {
  if (!email?.includes("@") || !email?.includes(".")) {
      return "";
  }
  
  let domain = email?.split("@")[1];
  return domain?.split(".")[0];
}
