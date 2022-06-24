import { MediaFile, Image } from "@shopify/hydrogen";
import { useState } from "react";

const ProductGallery = ({ media }) => {
  const [selectedImage, setSelectedImage] = useState(media[0].image);
  const [data] = useState(media);

  if (!media.length) {
    return null;
  }

  const handleNext = () => {
    const index = data.findIndex(
      (item) => selectedImage.url === item.image.url
    );
    const nextIndex = index + 1;
    if (nextIndex >= data.length) {
      return null;
    } else {
      const nextImage = data[nextIndex];
      setSelectedImage(nextImage.image);
    }
  };

  const handlePrevious = () => {
    const index = data.findIndex(
      (item) => selectedImage.url === item.image.url
    );
    const previousIndex = index - 1;
    if (previousIndex <= 0) {
      return null;
    } else {
      const nextImage = data[previousIndex];
      setSelectedImage(nextImage.image);
    }
  };

  return (
    <>
      <div className="mb-2 w-full bg-white flex flex-row justify-between items-center">
        <span
          className="w-[10%] flex justify-center hover:cursor-pointer"
          onClick={handlePrevious}
        >
          ⬅️
        </span>
        <Image
          data={selectedImage}
          alt={media.alt || "Product image"}
          className="w-4/5"
        />
        <span
          className="w-[10%] flex justify-center hover:cursor-pointer"
          onClick={handleNext}
        >
          ➡️
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {media.map((asset) => {
          let extraProps = {};

          if (asset.mediaContentType === "MODEL_3D") {
            extraProps = {
              interactionPromptThreshold: "0",
              ar: true,
              loading: true,
              disableZoom: true,
            };
          }

          const data = {
            ...asset,
            image: {
              ...asset.image,
              altText: media.alt || "Product image",
            },
          };

          return (
            <div
              key={asset.id}
              className={
                selectedImage.url === data.image.url
                  ? "hidden"
                  : "hover:cursor-pointer"
              }
              onClick={() => setSelectedImage(data.image)}
            >
              <MediaFile data={data} {...extraProps} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductGallery;
