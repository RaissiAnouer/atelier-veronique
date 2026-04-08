import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import { toast } from "react-hot-toast";
import uploadProductImages from "../utils/uploadProductImages";

const CategoryOptions = [
  "Shirt",
  "Jacket",
  "T-shirt",
  "Knitwear",
  "Trouser",
  "Scarve",
  "Socks",
  "Knit Cap",
  "Belt",
  "Ties",
  "Suit",
  "Wedding",
  "Coat",
  "Add more ...",
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const Add = () => {
  // Refactored images into an array for cleaner mapping
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [customCategory, setCustomCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [bestSeller, setBestSeller] = useState(false);

  const handleImageChange = (file, index) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const imageFiles = images.filter(Boolean);
      if (imageFiles.length === 0)
        throw new Error("Please upload at least one image");

      const imagesUrls = await uploadProductImages(imageFiles);

      const payload = {
        name,
        description,
        price: Number(price),
        category: category === "Add more ..." ? customCategory : category,
        bestSeller,
        sizes: selectedSizes.map((size) => ({ size })),
        images: imagesUrls,
      };

      const response = await axiosConfig.post(
        API_ENDPOINTS.ADDPRODUCT,
        payload,
      );

      if (response.status === 201) {
        toast.success("Successfully added product");
        // Reset form
        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setCustomCategory("");
        setSelectedSizes([]);
        setBestSeller(false);
        setImages([null, null, null, null]);
      }
    } catch (err) {
      toast.error(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 p-4 max-h-screen overflow-y-auto max-w-2xl"
    >
      {/* Image Upload Section */}
      <div>
        <p className="mb-2 font-medium text-gray-700">Upload Images</p>
        <div className="flex gap-3">
          {images.map((img, index) => (
            <label
              key={index}
              htmlFor={`image${index}`}
              className="cursor-pointer"
            >
              <img
                className="w-20 h-20 object-cover border-2 border-dashed border-gray-300 rounded"
                src={img ? URL.createObjectURL(img) : assets.upload_area}
                alt="Upload Slot"
              />
              <input
                onChange={(e) => handleImageChange(e.target.files[0], index)}
                type="file"
                id={`image${index}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      {/* Main Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="PRODUCT NAME"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          required
        />
        <Input
          label="PRICE (TND)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          placeholder="0.00"
          required
        />
      </div>

      {/* Category Selection */}
      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-700">Category</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-black outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Choose an option</option>
            {CategoryOptions.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {category === "Add more ..." && (
            <Input
              placeholder="Enter new category"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
            />
          )}
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-700">Description</label>
        <textarea
          className="w-full border border-gray-300 rounded p-2 h-24 focus:ring-2 focus:ring-black outline-none"
          placeholder="Write product details here..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Sizes Section */}
      <div>
        <p className="mb-2 font-medium text-gray-700">Product Sizes</p>
        <div className="flex gap-3">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() =>
                setSelectedSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((s) => s !== size)
                    : [...prev, size],
                )
              }
              className={`w-12 h-10 border transition-all ${
                selectedSizes.includes(size)
                  ? "bg-black text-white border-black"
                  : "bg-gray-100 text-gray-600 border-transparent hover:border-gray-400"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Best Seller Checkbox */}
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          className="w-4 h-4 accent-black"
          checked={bestSeller}
          onChange={(e) => setBestSeller(e.target.checked)}
        />
        <span className="text-sm text-gray-700">Add to Best Seller</span>
      </label>

      <button
        disabled={loading}
        type="submit"
        className="w-full md:w-40 py-3 bg-black text-white font-bold hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
      >
        {loading ? "UPLOADING..." : "ADD PRODUCT"}
      </button>
    </form>
  );
};

export default Add;
