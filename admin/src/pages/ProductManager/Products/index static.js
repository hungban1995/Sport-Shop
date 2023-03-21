import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { postData } from "../../../libs/fetchData";

const Products = () => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { variants: [{ attributes: [] }] },
  });
  const [variants, setVariants] = useState([{ attributes: [] }]);
  // Xoá biến thể
  const handleRemoveVariant = (variantIndex) => () => {
    setVariants(variants.filter((variant, index) => index !== variantIndex));
    setValue(
      "variants",
      variants.filter((variant, index) => index !== variantIndex)
    );
  };

  // Thêm thuộc tính mới vào biến thể
  const handleAddAttribute = (variantIndex) => () => {
    const newAttribute = { name: "", value: "" };
    setVariants(
      variants.map((variant, index) =>
        index === variantIndex
          ? { ...variant, attributes: [...variant.attributes, newAttribute] }
          : variant
      )
    );
  };
  //
  const handleRemoveAttribute = (variantIndex) => (attributeIndex) => {
    setVariants(
      variants.map((variant, index) =>
        index === variantIndex
          ? {
              ...variant,
              attributes: variant.attributes.filter(
                (_, attributeIdx) => attributeIdx !== attributeIndex
              ),
            }
          : variant
      )
    );
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const formData = new FormData();

      // add the other fields to the FormData object
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("content", data.content);

      // add the category field to the FormData object as an array
      data.category.forEach((category) =>
        formData.append("category", category)
      );

      // add the images field to the FormData object
      for (let i = 0; i < data.images.length; i++) {
        const fileList = [...data.images];
        fileList.forEach((item) => {
          formData.append("images", item);
        });
      }

      // add the variants field to the FormData object
      variants.forEach((variant, index) => {
        // add the image field to the FormData object
        if (variant.image && variant.image[0]) {
          formData.append(`variants[${index}].image`, variant.image[0]);
        }
        // add the other fields to the FormData object
        formData.append(`variants[${index}].price`, variant.price);
        formData.append(`variants[${index}].inStock`, variant.inStock);
        formData.append(`variants[${index}].onSale`, variant.onSale);
        // add the attributes field to the FormData object as JSON
        formData.append(
          `variants[${index}].attributes`,
          JSON.stringify(variant.attributes)
        );
      });
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));

      const response = await axios.post("products/create", formData, {
        headers: {
          Authorization: accessToken,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* other fields */}
      <label htmlFor="title">Title</label>
      <input type="text" id="title" {...register("title")} />

      <label htmlFor="description">Description</label>
      <textarea id="description" {...register("description")} />

      <label htmlFor="content">Content</label>
      <textarea id="content" {...register("content")} />

      <label htmlFor="category">Category</label>
      <select id="category" multiple {...register("category")}>
        <option value="category1">Category 1</option>
        <option value="category2">Category 2</option>
        <option value="category3">Category 3</option>
      </select>

      <label htmlFor="images">Images</label>
      <input type="file" id="images" multiple {...register("images")} />

      {/* variants */}
      <h2>Variants</h2>
      {variants.map((variant, variantIndex) => (
        <fieldset key={variantIndex}>
          {/* attributes */}
          <h3>Attributes</h3>
          {variant.attributes?.map((attribute, attributeIndex) => (
            <div key={attributeIndex}>
              <label
                htmlFor={`variant-${variantIndex}-attribute-${attributeIndex}-name`}
              >
                Name
              </label>
              <input
                type="text"
                id={`variant-${variantIndex}-attribute-${attributeIndex}-name`}
                {...register(
                  `variants[${variantIndex}].attributes[${attributeIndex}].name`
                )}
              />

              <label
                htmlFor={`variant-${variantIndex}-attribute-${attributeIndex}-value`}
              >
                Value
              </label>
              <input
                type="text"
                id={`variant-${variantIndex}-attribute-${attributeIndex}-value`}
                {...register(
                  `variants[${variantIndex}].attributes[${attributeIndex}].value`
                )}
              />

              <button
                type="button"
                onClick={() =>
                  handleRemoveAttribute(variantIndex)(attributeIndex)
                }
              >
                Remove Attribute
              </button>
            </div>
          ))}

          <button type="button" onClick={handleAddAttribute(variantIndex)}>
            Add Attribute
          </button>

          {/* other fields */}
          <label htmlFor={`variant-${variantIndex}-image`}>Image</label>
          <input
            type="file"
            id={`variant-${variantIndex}-image`}
            {...register(`variants[${variantIndex}].image`)}
          />
          <label htmlFor={`variant-${variantIndex}-price`}>Price</label>
          <input
            type="number"
            id={`variant-${variantIndex}-price`}
            {...register(`variants[${variantIndex}].price`)}
          />
          <label htmlFor={`variant-${variantIndex}-inStock`}>In Stock</label>
          <input
            type="number"
            id={`variant-${variantIndex}-inStock`}
            {...register(`variants[${variantIndex}].inStock`)}
          />
          <label htmlFor={`variant-${variantIndex}-onSale`}>On Sale</label>
          <input
            type="number"
            id={`variant-${variantIndex}-onSale`}
            {...register(`variants[${variantIndex}].onSale`)}
          />

          {/* remove variant button */}
          <button type="button" onClick={handleRemoveVariant(variantIndex)}>
            Remove Variant
          </button>
        </fieldset>
      ))}

      {/* add variant button */}
      <button
        type="button"
        onClick={() => setVariants([...variants, { attributes: [] }])}
      >
        Add Variant
      </button>

      <button type="submit">Submit</button>
    </form>
  );
};
export default Products;
