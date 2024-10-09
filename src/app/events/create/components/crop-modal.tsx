"use client";
import { X } from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

import Cropper from "react-cropper";

interface Params {
  close: () => void;
  imageToCrop: any;
  croppedImage: any;
  cropImage: any;
  cropperRef: any;
  loading: boolean;
}

export default function CropModal({
  close,
  imageToCrop,
  croppedImage,
  cropImage,
  cropperRef,
  loading,
}: Params) {
  return (
    <AnimatePresence>
      {imageToCrop && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed duration-300 top-0 left-0 z-40 bg-black/10 tablet:bg-black/60 w-screen h-screen flex justify-center items-center"
        >
          <div className="w-4/5 tablet:w-[90%] h-[94vh] tablet:h-max tablet:max-h-[90vh] tablet:bg-transparent bg-white flex tablet:flex-col flex-row">
            <div className="w-[70%] tablet:hidden tablet:w-full  h-full">
              <div className="w-full pl-5 border-b h-20 flex items-center">
                <h3 className="text-base font-medium text-primary-boulder700">
                  <b>Crop Thumbnail</b>
                </h3>
              </div>
              <div className="w-full overflow-y-auto h-max max-h-[calc(100%-80px)] px-6 md:px-10 py-3 flex flex-wrap gap-y-3">
                <div className="h-max w-full  flex justify-center items-center ">
                  <Cropper
                    src={imageToCrop}
                    style={{ height: 400, width: "100%" }}
                    initialAspectRatio={2}
                    aspectRatio={2160 / 1080} // Force 2160x1080 aspect ratio (2:1)
                    guides={true}
                    ref={cropperRef}
                    viewMode={2}
                  />
                </div>
              </div>
            </div>
            <div className="w-[30%] tablet:w-full tablet:flex flex-col justify-center relative h-full tablet:border-l-0 bg-background-darkPurple border-l">
              <motion.img
                initial={{ y: "-100%" }}
                animate={{
                  y: 0,
                }}
                transition={{ duration: 0.2 }}
                alt=""
                src={croppedImage}
                className="w-full h-[30%] tablet:hidden object-cover "
              />{" "}
              <Cropper
                src={imageToCrop}
                style={{ height: 400, width: "100%" }}
                initialAspectRatio={2}
                aspectRatio={2160 / 1080} // Force 2160x1080 aspect ratio (2:1)
                guides={true}
                ref={cropperRef}
                viewMode={2}
                className="hidden tablet:block"
              />
              <div
                onClick={close}
                className="w-11 text-primary-boulder900 cursor-pointer h-11 rounded-full hover:bg-white/70 bg-white/60 flex justify-center items-center absolute right-2 top-2"
              >
                <X width={16} />
              </div>
              <div className="h-[70%] tablet:h-max w-full py-2 px-2  tablet:py-0 tablet:px-0">
                <button
                  disabled={loading}
                  onClick={cropImage}
                  className="w-full h-12 tablet:h-14 mb-2 tablet:bg-background-darkYellow tablet:text-primary-boulder50 tablet:mb-0 hover:opacity-80 duration-200 bg-white text-[13px] font-medium text-primary-boulder700"
                >
                  {loading ? "Saving..." : "Crop and save"}
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
