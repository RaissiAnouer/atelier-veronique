import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Format } from "@cloudinary/url-gen/qualifiers";
import Input from "./Input";

const AddProductForm = () => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [Category, setCategory] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  return (
    <form className="flex flex-col gap-4 ">
      <div>
        <p>Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt="Image 1"
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              className="w-20"
              hidden
            />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="NAME"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            type="text"
          />
          <Input
            label="PRICE (TND)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price En TND"
            type="number"
          />
          <Input
            label="CATEGORY"
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            type="text"
          />
        </div>
      </div>
    </form>
  );
};

export default AddProductForm;
