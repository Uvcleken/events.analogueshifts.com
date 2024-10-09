"use client";
import { useRef, useState } from "react";
import React from "react";
import Image from "next/image";
import ImageShape from "@/assets/images/image-shape.svg";
import { Upload, Plus, Check } from "lucide-react";
import "cropperjs/dist/cropper.css";
import CropModal from "./crop-modal";
import { uploadImage } from "@/configs/upload-event/upload-image";

interface UploadImage {
  isOpen: boolean;
  toggleSection: any;
  thumbnail: string;
  setThumbnail: any;
  notifyUser: any;
}

const UploadImage: React.FC<UploadImage> = ({
  isOpen,
  toggleSection,
  thumbnail,
  setThumbnail,
  notifyUser,
}) => {
  const imageFileRef: any = useRef(null);
  const [loading, setLoading] = useState(false);
  const [croppedImage, setCroppedImage] = useState<string>(""); // State to store the cropped image
  const [imageToCrop, setImageToCrop] = useState<string | null>(null); // State to store the image preview for cropping

  // Reference to the Cropper instance
  const cropperRef: any = useRef(null);

  // Function to handle cropping
  const cropImage = () => {
    if (cropperRef.current) {
      const cropper: any = cropperRef.current.cropper;
      const croppedCanvas = cropper.getCroppedCanvas({
        width: 2160, // Set the width to 2160px
        height: 1080, // Set the height to 1080px
      });
      setCroppedImage(croppedCanvas.toDataURL()); // Save the cropped image as a base64 string
      handleUploadCroppedImage(croppedCanvas.toDataURL());
    }
  };

  // Handle file input change
  const handleFileChange = (e: any) => {
    const maxFileSize = 5 * 1024 * 1024;
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > maxFileSize) {
      notifyUser("error", "File size exceeds the limit (5 MB)", "right");
      return;
    }
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageToCrop(reader.result as string); // Display the image in the cropper
        setCroppedImage(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Handle cropping and uploading the image
  const handleUploadCroppedImage = async (img: string) => {
    if (img) {
      const croppedBlob = dataURLToBlob(croppedImage); // Convert base64 to Blob
      try {
        await uploadImage(croppedBlob, setLoading, setThumbnail, notifyUser);
        setImageToCrop(null);
      } catch (error) {
        setImageToCrop(null);
      }
    }
  };

  // Utility function to convert base64 to Blob
  const dataURLToBlob = (dataURL: string) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  return (
    <div
      className={`section w-full rounded-lg border-2 hover:border-background-darkYellow ${
        isOpen
          ? "open border-background-darkYellow"
          : "closed border-gray-700/10"
      }`}
      onClick={() => toggleSection("image")}
    >
      <div
        className={`rounded-lg overflow-hidden relative ${
          isOpen ? "hidden" : "flex"
        }`}
      >
        <img
          src={
            thumbnail.length > 0 && thumbnail !== "null"
              ? thumbnail
              : "/concert.jpg"
          }
          alt=""
          className="w-full h-[200px] object-center sm:h-[400px] object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-white/20 cursor-pointer flex justify-center items-center">
          <div className="w-36 h-max bg-white rounded-lg border-2 p-4 flex flex-col items-center gap-4 border-gray-700/10">
            <div className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-700/5 text-background-darkYellow">
              <Upload width={20} />
            </div>
            <p className="text-[13px] font-medium text-background-darkYellow text-center">
              Upload event cover photo
            </p>
          </div>
          <div
            className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full  ${
              thumbnail.length > 0 && thumbnail !== "null"
                ? "bg-green-600 text-white"
                : "bg-white text-background-darkYellow"
            }`}
          >
            {thumbnail.length > 0 && thumbnail !== "null" ? (
              <Check width={20} />
            ) : (
              <Plus width={20} />
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="w-full rounded-lg overflow-hidden h-max p-6 flex flex-col">
          <input
            onChange={handleFileChange}
            ref={imageFileRef}
            type="file"
            accept="image/jpeg,image/png"
            className="absolute hidden -z-10 opacity-0"
          />
          <h4 className="text-primary-boulder900 font-bold text-xl mb-3.5">
            Upload cover photo
          </h4>
          <p className="text-primary-boulder900 font-normal text-sm mb-5">
            Upload a cover photo for your event. It can be a banner that shows
            what your event is about.
          </p>
          <div
            style={{ backgroundImage: `url(${thumbnail})` }}
            className="w-full h-[200px] sm:h-[400px] bg-cover mb-3.5 bg-background-whisperWhite rounded-lg flex flex-col items-center justify-center gap-3.5"
          >
            <Image src={ImageShape} alt="" className="w-16" />
            <button
              onClick={() => imageFileRef.current.click()}
              className="w-max px-10 bg-white flex items-center h-12 text-sm text-primary-boulder950 font-semibold justify-center rounded-md border border-primary-boulder300"
            >
              Upload Image
            </button>
          </div>

          <CropModal
            loading={loading}
            close={() => {
              setImageToCrop(null);
            }}
            cropImage={cropImage}
            croppedImage={croppedImage}
            cropperRef={cropperRef}
            imageToCrop={imageToCrop}
          />
          <p className="text-primary-boulder900 font-normal text-xs mb-5">
            · Recommended image size: 2160 x 1080px &nbsp; · Maximum file size:
            5MB &nbsp; Supported image files: JPEG, PNG
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
