"use client";
import { useRef } from "react";
import React from "react";
import Image from "next/image";
import ImageShape from "@/assets/images/image-shape.svg";
import { Upload, Plus, Check } from "lucide-react";
import { clearUserSession } from "@/configs/clear-user-session";
import Cookies from "js-cookie";

interface UploadImage {
  isOpen: boolean;
  toggleSection: any;
  thumbnail: string;
  setLoading: any;
  setThumbnail: any;
  notifyUser: any;
}

const UploadImage: React.FC<UploadImage> = ({
  isOpen,
  toggleSection,
  thumbnail,
  setLoading,
  setThumbnail,
  notifyUser,
}) => {
  const imageFileRef: any = useRef(null);
  const token = Cookies.get("analogueshifts");

  const uploadImage = async (value: any) => {
    const url = process.env.NEXT_PUBLIC_FILE_UPLOAD_URL + "/upload";
    const axios = require("axios");
    const formData = new FormData();
    formData.append("upload", value);
    formData.append("type", "image");
    let config = {
      method: "POST",
      url: url,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token || "",
      },
      data: formData,
    };

    setLoading(true);
    try {
      const data = await axios.request(config);
      setThumbnail(data.data.data.full_path);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      notifyUser("error", error?.response?.data?.data?.message || "", "right");
      if (error?.response?.status === 401) {
        clearUserSession();
      }
    }
  };

  const handleFileChange = (e: any) => {
    const maxFileSize = 5 * 1024 * 1024;
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > maxFileSize) {
      notifyUser("error", "File size exceeds the limit (5 MB)", "right");
      return;
    }
    if (selectedFile) {
      uploadImage(selectedFile);
    }
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
          className="w-full h-[250px] sm:h-[400px] object-cover"
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
            className="w-full h-[250px] sm:h-[400px] bg-cover mb-3.5 bg-background-whisperWhite rounded-lg flex flex-col items-center justify-center gap-3.5"
          >
            <Image src={ImageShape} alt="" className="w-16" />
            <button
              onClick={() => imageFileRef.current.click()}
              className="w-max px-10 bg-white flex items-center h-12 text-sm text-primary-boulder950 font-semibold justify-center rounded-md border border-primary-boulder300"
            >
              Upload Image
            </button>
          </div>
          <p className="text-primary-boulder900 font-normal text-xs mb-5">
            · Recommended image size: 2160 x 1080px &nbsp; · Maximum file size:
            10MB &nbsp; Supported image files: JPEG, PNG
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
