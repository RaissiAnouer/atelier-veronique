import { API_ENDPOINTS } from "./apiEndpoints";

const CLOUDINARY_UPLOAD_PRESET = "atelierveronique";

const uploadProductImages = async (images) => {
  try {
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    const MAX_SIZE = 2 * 1024 * 1024;

    const files = Array.from(images).filter((file) =>
      validTypes.includes(file.type),
    );

    if (files.length === 0) {
      throw new Error("Only JPG, PNG, WEBP images are allowed.");
    }

    if (files.length > 5) {
      throw new Error("Maximum 5 images allowed.");
    }

    files.forEach((file) => {
      if (file.size > MAX_SIZE) {
        throw new Error("Each image must be less than 2MB");
      }
    });

    const uploadPromises = files.map((image) => {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      return fetch(API_ENDPOINTS.UPLOAD_IMAGE, {
        method: "POST",
        body: formData,
      }).then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error?.message || "Upload failed");
        }

        return data.secure_url;
      });
    });

    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error;
  }
};

export default uploadProductImages;
