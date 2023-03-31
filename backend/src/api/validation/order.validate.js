import * as yup from "yup";

//----------Order schema----------//
const orderSchema = yup.object().shape({
  firstName: yup.string().required("Please enter your first name"),
  lastName: yup.string().required("Please enter your last name"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Please enter your email"),
  phoneNumber: yup.string().required("Please enter your phone number"),
  address: yup
    .string()
    .required("Please enter your address for convenient delivery"),
  orderDetail: yup.array().required("Must be an product"),
  status: yup.string(),
  user: yup.string(),
  paymentMethod: yup.string().required("Please select an payment method"),
});

//----------Order validate----------//
const validateOrders = async (req, res, next) => {
  try {
    const order = req.body;
    await orderSchema.validate(order);
    return null;
  } catch (error) {
    return {
      error: {
        status: 400,
        error: error.message,
      },
    };
  }
};
export default validateOrders;
