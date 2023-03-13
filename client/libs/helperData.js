export const toSlug = (str) => {
  str = str.toLowerCase();
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  str = str.replace(/[đĐ]/g, "d");

  str = str.replace(/([^0-9a-z-\s])/g, "");

  str = str.replace(/(\s+)/g, "-");

  str = str.replace(/-+/g, "-");

  str = str.replace(/^-+|-+$/g, "");

  // return
  return str;
};
export const generateRandomString = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};
