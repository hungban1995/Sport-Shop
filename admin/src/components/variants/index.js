import { useFieldArray, useForm } from "react-hook-form";

function CreateVariants() {
  const { register, handleSubmit, watch, control } = useForm({
    defaultValues: {
      attributes: [{ k: "", v: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Price</label>
      <input {...register("price")} type="number" step="0.01" />

      <label>In Stock</label>
      <input {...register("inStock")} type="number" />

      <label>Sold</label>
      <input {...register("sold")} type="number" />

      <label>On Sale</label>
      <input {...register("onSale")} type="number" step="0.01" />

      {fields.map((field, index) => (
        <div key={field.id}>
          <label>{`Attribute ${index + 1}`}</label>
          <input
            {...register(`attributes.${index}.k`)}
            type="text"
            defaultValue={field.k}
          />
          <input
            {...register(`attributes.${index}.v`)}
            type="text"
            defaultValue={field.v}
          />

          <button type="button" onClick={() => remove(index)}>
            Remove Attribute
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({ k: "", v: "" })}>
        Add Attribute
      </button>

      <input type="submit" value="Submit" />
    </form>
  );
}
export default CreateVariants;
