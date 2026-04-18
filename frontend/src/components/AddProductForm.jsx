import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
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

const AddProductForm = ({ initialData = null, onSuccess }) => {
  const isEditMode = !!initialData;
  const [images, setImages] = useState(
    initialData?.images && initialData.images.length > 0
      ? [
          ...initialData.images,
          ...Array(Math.max(0, 4 - initialData.images.length)).fill(null),
        ].slice(0, 4)
      : [null, null, null, null],
  );
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [price, setPrice] = useState(initialData?.price || "");

  const initialCategoryMatches = initialData
    ? CategoryOptions.includes(initialData.category)
    : true;
  const [category, setCategory] = useState(
    initialData?.category
      ? initialCategoryMatches
        ? initialData.category
        : "Add more ..."
      : "",
  );
  const [customCategory, setCustomCategory] = useState(
    initialData?.category && !initialCategoryMatches
      ? initialData.category
      : "",
  );

  const [selectedSizes, setSelectedSizes] = useState(
    initialData?.sizes ? initialData.sizes.map((s) => s.size) : [],
  );
  const [loading, setLoading] = useState(false);
  const [bestSeller, setBestSeller] = useState(
    initialData?.bestSeller || false,
  );

  const handleImageChange = (file, index) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const filesToUpload = images.filter(
        (img) => img && typeof img !== "string",
      );

      let uploadedUrls = [];
      if (filesToUpload.length > 0) {
        uploadedUrls = await uploadProductImages(filesToUpload);
      }

      const finalImages = images
        .map((img) => {
          if (!img) return null;
          if (typeof img === "string") return img;
          return uploadedUrls.shift();
        })
        .filter(Boolean);

      if (finalImages.length === 0)
        throw new Error("Please upload at least one image");

      const payload = {
        name,
        description,
        price: Number(price),
        category: category === "Add more ..." ? customCategory : category,
        bestSeller,
        sizes: selectedSizes.map((size) => ({ size })),
        images: finalImages,
      };

      let response;
      if (isEditMode) {
        response = await axiosConfig.patch(
          API_ENDPOINTS.EDITPRODUCT(initialData.id),
          payload,
        );
      } else {
        response = await axiosConfig.post(API_ENDPOINTS.ADDPRODUCT, payload);
      }

      if (response.status === 201 || response.status === 200) {
        toast.success(
          isEditMode
            ? "Successfully updated product"
            : "Successfully added product",
        );
        if (onSuccess) onSuccess();

        if (!isEditMode) {
          setName("");
          setDescription("");
          setPrice("");
          setCategory("");
          setCustomCategory("");
          setSelectedSizes([]);
          setBestSeller(false);
          setImages([null, null, null, null]);
        }
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
      className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full max-w-5xl"
    >
      {/* Left Column: Media & Settings */}
      <div className="lg:col-span-5 flex flex-col gap-4 bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
        <div>
          <h4 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-1">
            Product Media
          </h4>
          <p className="text-xs text-gray-500 mb-3">
            Upload up to 4 high-quality images. The first image will be the
            cover.
          </p>
          <div className="grid grid-cols-4 gap-2">
            {images.map((img, index) => (
              <label
                key={index}
                htmlFor={`image${index}`}
                className="cursor-pointer group relative overflow-hidden rounded-xl bg-white border-2 border-dashed border-gray-200 hover:border-[#C9A96E] hover:bg-[#C9A96E]/5 transition-all aspect-square flex items-center justify-center shadow-sm"
              >
                {img ? (
                  <img
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    src={
                      typeof img === "string" ? img : URL.createObjectURL(img)
                    }
                    alt="Upload Slot"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-[#C9A96E] transition-colors">
                    <img
                      src={assets.upload_area}
                      alt="Upload"
                      className="w-6 h-6 opacity-50 group-hover:opacity-100 transition-opacity"
                    />
                    <span className="text-[10px] font-medium tracking-wider">
                      SLOT {index + 1}
                    </span>
                  </div>
                )}
                {img && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-semibold px-3 py-1 bg-black/60 rounded-full backdrop-blur-sm">
                      Replace
                    </span>
                  </div>
                )}
                <input
                  onChange={(e) => handleImageChange(e.target.files[0], index)}
                  type="file"
                  id={`image${index}`}
                  hidden
                  accept="image/*"
                />
              </label>
            ))}
          </div>
        </div>

        <hr className="border-gray-200" />

        <div>
          <h4 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-2">
            Available Sizes
          </h4>
          <div className="flex gap-2 flex-wrap">
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
                className={`w-12 h-10 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                  selectedSizes.includes(size)
                    ? "bg-[#1A1A1A] text-[#C9A96E] border-none scale-[1.02]"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center gap-3 cursor-pointer select-none bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-all">
            <div
              className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${bestSeller ? "bg-[#C9A96E] border-[#C9A96E]" : "border-gray-300"}`}
            >
              {bestSeller && (
                <span className="text-white text-xs font-bold">✓</span>
              )}
            </div>
            <input
              type="checkbox"
              className="hidden"
              checked={bestSeller}
              onChange={(e) => setBestSeller(e.target.checked)}
            />
            <div>
              <span className="block text-sm font-semibold text-gray-900">
                Mark as Best Seller
              </span>
              <span className="block text-xs text-gray-500 mt-0.5">
                Highlight this product in the catalog.
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* Right Column: Core Information */}
      <div className="lg:col-span-7 flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 tracking-wider uppercase">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/40 focus:border-[#C9A96E] transition-all text-sm font-medium"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Premium Wool Coat..."
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 tracking-wider uppercase">
                Price (TND) <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/40 focus:border-[#C9A96E] transition-all text-sm font-medium"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 tracking-wider uppercase">
              Category <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/40 focus:border-[#C9A96E] transition-all text-sm font-medium"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Choose a category</option>
                {CategoryOptions.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {category === "Add more ..." && (
                <input
                  className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/40 focus:border-[#C9A96E] transition-all text-sm font-medium"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Enter custom category..."
                  required
                />
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 tracking-wider uppercase">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/40 focus:border-[#C9A96E] transition-all text-sm font-medium text-gray-700 resize-none min-h-[120px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description..."
              required
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            disabled={loading}
            type="submit"
            className="w-full md:w-auto px-10 py-3.5 bg-[#1A1A1A] text-white rounded-xl text-sm font-bold tracking-wider hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-md shadow-[#C9A96E]/10"
          >
            {loading
              ? isEditMode
                ? "SAVING CHANGES..."
                : "PUBLISHING..."
              : isEditMode
                ? "SAVE CHANGES"
                : "PUBLISH PRODUCT"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddProductForm;
