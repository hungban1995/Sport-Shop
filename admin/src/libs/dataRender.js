export const PriceVnd = (price) => {
  return new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
//render status

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
//render number

export const renderNumber = (value, key) => {
  let number = 0;
  value.forEach((item) => (number += item[key]));
  return <span>{number}</span>;
};
