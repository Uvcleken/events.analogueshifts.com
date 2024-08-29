"use client";
import React from "react";
import html2canvas from "html2canvas";
import Image from "next/image";
import VerifiedImage from "@/assets/images/verified-check.png";
import { Download } from "lucide-react";

interface ReceiptProps {
  register: any;
}

const Receipt: React.FC<ReceiptProps> = ({ register }) => {
  const handleDownload = () => {
    const receiptElement = document.getElementById("receipt");
    if (receiptElement) {
      html2canvas(receiptElement).then((canvas: any) => {
        const link = document.createElement("a");
        link.download = `${register.reference}-receipt-analogueshifts.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  };

  return (
    <section className="w-full bg-primary-boulder50 bg-contain bg-no-repeat  overflow-y-auto relative bg-top h-[calc(100vh-64px)] flex flex-col justify-center items-center">
      <div className="w-full flex h-max pt-8 justify-end pr-10 tablet:hidden">
        <button
          type="button"
          onClick={handleDownload}
          className="flex w-max items-center gap-1.5 text-xs font-semibold text-primary-boulder700"
        >
          Download <Download width={16} />
        </button>
      </div>
      <div
        id="receipt"
        className="flex bg-primary-boulder50 justify-center items-center w-[800px] h-[750px] max-w-full"
      >
        <div className="bg-white  p-5 h-max md:p-8 rounded-2xl tablet:max-w-[85%] max-w-sm w-full">
          <div className="w-full flex-col gap-3 flex items-center justify-between">
            <Image
              src={VerifiedImage}
              alt=""
              className="w-12 h-max tablet:w-10 object-contain object-center"
            />
            <p className="text-base tablet:text-sm font-medium text-center text-primary-boulder500">
              Registration successful!
            </p>
            <h1 className="text-primary-boulder900 tablet:text-xl text-2xl font-bold text-center">
              <b>USD {register?.register?.amount}</b>
            </h1>
          </div>

          <div className="mt-6 tablet:mt-3.5 border-t border-gray-200 pt-6 flex flex-col gap-2">
            <div className="w-full pb-2  flex justify-between">
              <p className="tablet:text-xs text-sm text-primary-boulder400 font-normal max-w-[40%]">
                Name
              </p>
              <p className="tablet:text-xs text-sm text-primary-boulder900 font-medium max-w-[60%]">
                {register?.register?.name}
              </p>
            </div>{" "}
            <div className="w-full pb-2 flex justify-between">
              <p className="tablet:text-xs text-sm text-primary-boulder400 font-normal max-w-[40%]">
                Reference
              </p>
              <p className="tablet:text-xs text-sm text-primary-boulder900 font-medium max-w-[60%]">
                {register?.register?.reference}
              </p>
            </div>
            <div className="w-full pb-2 flex justify-between">
              <p className="tablet:text-xs text-sm text-primary-boulder400 font-normal max-w-[40%]">
                Time
              </p>
              <p className="tablet:text-xs text-sm text-primary-boulder900 font-medium max-w-[60%]">
                {new Date(register?.register?.created_at).toLocaleString()}
              </p>
            </div>
            <div className="w-ful pb-2 flex justify-between">
              <p className="tablet:text-xs text-sm text-primary-boulder400 font-normal max-w-[40%]">
                Contact
              </p>
              <p className="tablet:text-xs text-sm text-primary-boulder900 font-medium max-w-[60%]">
                {register?.register?.contact}
              </p>
            </div>
            <div className="w-full pb-2 flex justify-between">
              <p className="tablet:text-xs text-sm text-primary-boulder400 font-normal max-w-[40%]">
                Email
              </p>
              <p className="tablet:text-xs text-sm text-primary-boulder900 font-medium max-w-[60%]">
                {register?.register?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Receipt;
