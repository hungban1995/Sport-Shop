import { useState } from "react";
import { useForm } from "react-hook-form";
import CreateVariants from "../../../components/variants";
import { postData } from "../../../libs/fetchData";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const CreateProduct = () => {
  const { register, handleSubmit, setValue } = useForm({});

  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" {...register("title")} />
        <label htmlFor="description">Description</label>
        <textarea id="description" {...register("description")} />

        <label htmlFor="content">Content</label>
        <CKEditor
          editor={ClassicEditor}
          name="content"
          onChange={(event, editor) => {
            const data = editor.getData();
            setValue("content", data); // Lưu giá trị vào trường "content" trong react-hook-form
          }}
        />

        <label htmlFor="category">Category</label>
        <select id="category" multiple {...register("category")}>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
        </select>

        <label htmlFor="images">Images</label>
        <input type="file" id="images" multiple {...register("images")} />

        <button type="submit">Submit</button>
      </form>
      {/* <CreateVariants /> */}
    </div>
  );
};
export default CreateProduct;
