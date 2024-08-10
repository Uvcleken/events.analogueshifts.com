"use client";
import React from "react";
import html2canvas from "html2canvas";
import Image from "next/image";
import VerifiedImage from "@/assets/images/verified-check.png";
import { Download } from "lucide-react";

interface ReceiptProps {
  register: {
    reference: string;
    name: string;
    amount: string;
    created_at: string;
    status: string;
    email: string;
    contact: string;
  };
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
    <section
      id="receipt"
      className="w-full bg-primary-boulder50 bg-contain bg-no-repeat overflow-y-auto relative bg-top h-[calc(100vh-64px)] flex justify-center items-center"
    >
      <div className="bg-white  p-5 h-max md:p-8 rounded-2xl max-w-sm w-full">
        <div className="w-full flex-col gap-3 flex items-center justify-between">
          <Image src={VerifiedImage} alt="" className="w-12" />
          <p className="text-base font-medium text-center text-primary-boulder500">
            Registration successful!
          </p>
          <h1 className="text-primary-boulder900 text-2xl font-bold text-center">
            <b>USD {register.amount}</b>
          </h1>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-6 flex flex-col gap-2">
          <div className="w-full flex justify-between">
            <p className="text-sm text-primary-boulder400 font-normal max-w-[40%]">
              Guest Name
            </p>
            <p className="text-sm text-primary-boulder900 font-medium max-w-[60%]">
              {register.name}
            </p>
          </div>{" "}
          <div className="w-full flex justify-between">
            <p className="text-sm text-primary-boulder400 font-normal max-w-[40%]">
              Reference
            </p>
            <p className="text-sm text-primary-boulder900 font-medium max-w-[60%]">
              {register.reference}
            </p>
          </div>
          <div className="w-full flex justify-between">
            <p className="text-sm text-primary-boulder400 font-normal max-w-[40%]">
              Registration Time
            </p>
            <p className="text-sm text-primary-boulder900 font-medium max-w-[60%]">
              {new Date(register.created_at).toLocaleString()}
            </p>
          </div>
          <div className="w-full flex justify-between">
            <p className="text-sm text-primary-boulder400 font-normal max-w-[40%]">
              Guest Contact
            </p>
            <p className="text-sm text-primary-boulder900 font-medium max-w-[60%]">
              {register.contact}
            </p>
          </div>
          <div className="w-full flex justify-between">
            <p className="text-sm text-primary-boulder400 font-normal max-w-[40%]">
              Guest Email
            </p>
            <p className="text-sm text-primary-boulder900 font-medium max-w-[60%]">
              {register.email}
            </p>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="mt-6 w-max mx-auto  font-semibold bg-white  text-primary-boulder500 h-12 flex items-center justify-center gap-1 rounded-lg duration-200"
        >
          <Download width={22} />
        </button>
      </div>
    </section>
  );
};

export default Receipt;
