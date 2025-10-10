"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/app/i18n/client";

export default function MegaMenu({ lng }: { lng: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation(lng, "translation");
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    // Determine the active section based on the current URL path
    const path = window.location.pathname;
    if (path === `/${lng}`) {
      setActiveSection("Home");
    } else if (path.includes("about")) {
      setActiveSection("About");
    } else if (path.includes("contact")) {
      setActiveSection("Contact");
    } else {
      setActiveSection("Menu");
    }
  }, [lng]);

  return (
    <nav className="relative bg- border- border- shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 items-center relative">
          
        {/* Mega Menu Trigger */}
<div className="relative">
  <button
    className="flex items-center border bg-gray-100 border-black text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
    onClick={() => setIsOpen(!isOpen)}
  >
    {activeSection}
    <svg
      className="ml-1 w-4 h-4 text-black"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>

  {/* Animated Mega Menu Panel */}
  <AnimatePresence>
    {isOpen && (
      <motion.div
        key="megaMenu"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="absolute right-0 top-full mt-3 w-screen max-w-lg z-50"
      >
        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white p-6 grid grid-cols-2 gap-6">
          <Link
            href={`/${lng}/about`}
            className="block p-2 rounded-md hover:bg-gray-50"
            onClick={() => {
              setActiveSection("About");
              setIsOpen(false);
            }}
          >
            <p className="font-medium text-gray-900">
              {t("about_hero_title")}
            </p>
            <p className="text-sm text-gray-500">
              Learn more about us and our mission.
            </p>
          </Link>
          <Link
            href={`#footer-contact`}
            className="block p-2 rounded-md hover:bg-gray-50"
            onClick={() => {
              setActiveSection("Contact");
              setIsOpen(false);
            }}
          >
            <p className="font-medium text-gray-900">Contact Us</p>
            <p className="text-sm text-gray-500">
              Get in touch with our team.
            </p>
          </Link>
          <Link
            href={`/${lng}`}
            className="block p-2 rounded-md hover:bg-gray-50"
            onClick={() => {
              setActiveSection("Home");
              setIsOpen(false);
            }}
          >
            <p className="font-medium text-gray-900">
              {t("footer_home_link")}
            </p>
            <p className="text-sm text-gray-500">
              Go back to the homepage.
            </p>
          </Link>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>
        </div>

        {/* Mobile Menu Button */}
      <button
  onClick={() => setIsOpen(!isOpen)}
  className="md:hidden w-full flex items-center justify-between px-2 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
  aria-label="Toggle menu"
>
  {/* Text shrinks on very small screens */}
  <span className="font-medium text-sm sm:text-base truncate">{activeSection}</span>

  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    {isOpen ? (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    )}
  </svg>
</button>
      </div>

     {/* Mobile Dropdown */}
<AnimatePresence>
  {isOpen && (
    <motion.div
      key="mobileMenu"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25 }}
      className="md:hidden bg-white border-t border-gray-200 shadow-md overflow-hidden"
    >
      <div className="px-4 py-3 space-y-2">
        <Link
          href={`/${lng}`}
          onClick={() => {
            setActiveSection("Home");  // ✅ update active section
            setIsOpen(false);
          }}
          className="block text-gray-700 hover:text-indigo-600"
        >
          {t("footer_home_link")}
        </Link>

        <div className="space-y-1">
          <Link
            href={`/${lng}/about`}
            onClick={() => {
              setActiveSection("About"); // ✅ update active section
              setIsOpen(false);
            }}
            className="block text-gray-700 hover:text-indigo-600"
          >
            {t("about_hero_title")}
          </Link>
          <Link
            href={`#footer-contact`}
            onClick={() => {
              setActiveSection("Contact"); // ✅ update active section
              setIsOpen(false);
            }}
            className="block text-gray-700 hover:text-indigo-600"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </nav>
  );
}