import * as yup from "yup";

//----------Product validate----------//
// const productSchema = yup.object().shape({
//   title: yup.string().required("Product title is required"),
// });
// export const validateProduct = async (req, res, next) => {
//   try {
//     console.log("Product validate: ", req.body);
//     const { title, price, onSale, inStock, sold } = req.body;
//     await productSchema.validate({ title, price, onSale, inStock, sold });
//     next();
//   } catch (error) {
//     console.log(error.message);
//     next({
//       status: 400,
//       error: error.message,
//     });
//   }
// };

//----------Product variants validate----------//
const productsVariantsSchema = yup.object().shape({
  price: yup
    .number()
    .required("Price is required")
    .min(0, "Price must be greater than or equal to 0"),
  onSale: yup
    .number()
    .test(
      "lessThanPrice",
      "On sale price must be less than regular price",
      function (value) {
        const price = this.parent.price;
        return value < price;
      }
    ),
  inStock: yup
    .number()
    .required("InStock is required")
    .min(0, "InStock must be greater than or equal to 0"),
  attributes: yup.array(),
});
export const productsVariantValidate = async (req) => {
  try {
    let attributes = [];
    if (req.body.attributes) {
      attributes = JSON.parse(req.body.attributes);
    }
    const { price, onSale, inStock } = req.body;
    await productsVariantsSchema.validate({
      price,
      onSale,
      inStock,
      attributes,
    });
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
