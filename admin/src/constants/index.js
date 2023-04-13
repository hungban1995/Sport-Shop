// export const BASE_URL = "http://localhost:8000/api";
// export const IMG_URL = "http://localhost:8000";
// export const SOCKET_URL = "http://localhost:8000";

export const BASE_URL = "https://severnodejs.onrender.com/api";
export const IMG_URL = "https://severnodejs.onrender.com";
export const SOCKET_URL = "https://severnodejs.onrender.com";

export const BLANK_AVT =
  "https://roottogether.net/wp-content/uploads/2020/04/img-avatar-blank.jpg";
export const BLANK_IMG =
  "https://www.jaipuriaschoolbahraich.in/wp-content/uploads/2016/11/blank-img.jpg";
export const payment = ["CASH", "CREDIT CARD"];
export const status = ["WAITING", "SHIPPING", "SUCCESS", "CANCEL"];
export const valueSortOrder = [
  { name: "Ngày tạo ⬆", value: "createdAt" },
  { name: "Ngày tạo ⬇", value: "-createdAt" },
  { name: "Tổng Tiền ⬆", value: "totalPrice" },
  { name: "Tổng Tiền ⬇", value: "-totalPrice" },
];
export const valueSortPost = [
  { name: "Ngày đăng ⬆", value: "createdAt" },
  { name: "Ngày đăng ⬇", value: "-createdAt" },
];
export const valueSortUser = [
  { name: "Username a-z", value: "username" },
  { name: "Username z-a", value: "-username" },
];
export const valueSortProduct = [
  { name: "giá bán ⬆", value: { price: 1 } },
  { name: "giá bán ⬇", value: { price: -1 } },
  { name: "giảm giá ⬆", value: { onSale: 1 } },
  { name: "giảm giá ⬇", value: { onSale: -1 } },
  { name: "Tồn kho ⬆", value: { inStock: 1 } },
  { name: "Tồn kho ⬇", value: { inStock: -1 } },
  { name: "Đã bán ⬆", value: { sold: 1 } },
  { name: "Đã bán ⬇", value: { sold: -1 } },
];
export const valueSortCat = [
  { name: "Ngày tạo ⬆", value: "createdAt" },
  { name: "Ngày tạo ⬇", value: "-createdAt" },
];
export const socketConfigs = {
  secure: true,
  reconnection: true,
  reconnectionDelay: 5000,
  reconnectionAttempts: 5,
};
