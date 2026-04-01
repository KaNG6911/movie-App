import React from "react";
import { TbMovie } from "react-icons/tb";
import { CiMail } from "react-icons/ci";
import { PiPhoneThin } from "react-icons/pi";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  return (
    <div className="bg-[#4338CA] dark:bg-gray-900 flex flex-col md:flex-row md:justify-between text-white py-10 gap-8 px-6 md:px-20">
      <div className="flex flex-col gap-3">
        <div className="flex align-center gap-2 italic font-bold items-center">
          <TbMovie className="h-5 w-5" />
          Movie Z
        </div>
        <div>© 2026 Movie Z. All Rights Reserved.</div>
      </div>

      <div className="flex flex-row gap-12 md:gap-24 items-start md:justify-end">
        {/* Contact Information */}
        <div className="flex flex-col gap-4">
          <div className="pb-0.5 font-semibold">Contact Information</div>
          <div className="flex gap-5 items-center">
            <CiMail className="h-4 w-4 shrink-0" />
            <div className="flex flex-col">
              <div>Email:</div>
              <div>support@movieZ.com</div>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <PiPhoneThin className="h-4 w-4 shrink-0" />
            <div className="flex flex-col">
              <div>Phone:</div>
              <div>+976 (11) 123-4567</div>
            </div>
          </div>
        </div>

        {/* Follow Us */}
        <div className="flex flex-col gap-3">
          <div className="font-semibold">Follow us</div>
          {/* Mobile: vertical */}
          <div className="flex flex-col gap-3 md:hidden">
            <a href="#" className="flex items-center gap-3 hover:opacity-75 transition">
              <FaFacebook className="h-5 w-5" />
              <span>Facebook</span>
            </a>
            <a href="#" className="flex items-center gap-3 hover:opacity-75 transition">
              <FaInstagram className="h-5 w-5" />
              <span>Instagram</span>
            </a>
            <a href="#" className="flex items-center gap-3 hover:opacity-75 transition">
              <FaXTwitter className="h-5 w-5" />
              <span>Twitter</span>
            </a>
            <a href="#" className="flex items-center gap-3 hover:opacity-75 transition">
              <FaYoutube className="h-5 w-5" />
              <span>Youtube</span>
            </a>
          </div>
          {/* Desktop: horizontal with text */}
          <div className="hidden md:flex flex-row gap-4">
            <a href="#" className="flex items-center gap-2 hover:opacity-75 transition"><FaFacebook className="h-5 w-5" /><span>Facebook</span></a>
            <a href="#" className="flex items-center gap-2 hover:opacity-75 transition"><FaInstagram className="h-5 w-5" /><span>Instagram</span></a>
            <a href="#" className="flex items-center gap-2 hover:opacity-75 transition"><FaXTwitter className="h-5 w-5" /><span>Twitter</span></a>
            <a href="#" className="flex items-center gap-2 hover:opacity-75 transition"><FaYoutube className="h-5 w-5" /><span>Youtube</span></a>
          </div>
        </div>
      </div>
    </div>
  );
};
