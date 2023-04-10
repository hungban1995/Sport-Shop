import * as yup from "yup";

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
      "On sale price must be less than equal to price",
      function (value) {
        const price = this.parent.price;
        return value <= price;
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
    const { price, onSale, inStock, attributes } = req.body;
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
