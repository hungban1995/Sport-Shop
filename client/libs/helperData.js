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
export const PriceVnd = (price) => {
  return new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
//render attribute
export const RenderAttribute = (attributes) => {
  return attributes.map((atb, idx) => {
    if (atb.k) {
      return (
        <li key={idx}>
          {atb.k} : {atb.v}
        </li>
      );
    } else return null;
  });
};
//render total
export const renderTotal = (value) => {
  let total = 0;
  value.forEach((item) => {
    let priceItem = item.productVariant.onSale || item.productVariant.price;
    total += priceItem * item.quantity;
  });
  let totalPrice = PriceVnd(total);
  return totalPrice;
};
export const listStyle = (value, bg) => {
  const styles = {
    WAITING: { color: "#FACC15", bgColor: "#FEFCE8" },
    SHIPPING: { color: "#60A5FA", bgColor: "#EFF6F8" },
    SUCCESS: { color: "#34D399", bgColor: "#ECFDF5" },
    CANCEL: { color: "#F87171", bgColor: "#FEF2F2" },
  };
  const { color, bgColor } = styles[value] || {};
  const backgroundColor = bg ? bgColor : "#fff";
  return { color, fontWeight: "bold", backgroundColor };
};
