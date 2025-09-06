"use client";

import React, { useEffect, useState } from "react";

interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

const navigationItems: NavigationItem[] = [
  { id: "getting-started", label: "Getting Started", href: "#getting-started" },
  { id: "features", label: "Features", href: "#features" },
  { id: "extensions", label: "Extensions", href: "#extensions" },
  { id: "api-reference", label: "API Reference", href: "#api-reference" },
  { id: "customization", label: "Customization", href: "#customization" },
  { id: "examples", label: "Examples", href: "#examples" },
  { id: "troubleshooting", label: "Troubleshooting", href: "#troubleshooting" },
];

export const DocsNavigation = () => {
  const [activeSection, setActiveSection] = useState<string>("getting-started");

  useEffect(() => {
    // Set initial active section based on URL hash
    const hash = window.location.hash.replace("#", "");
    if (hash && navigationItems.some((item) => item.id === hash)) {
      setActiveSection(hash);
    }

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -75% 0px", // Adjusted for better detection
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], // Multiple thresholds for better accuracy
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      let maxVisibleSection = null;
      let maxRatio = 0;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          maxVisibleSection = entry.target.id;
        }
      });

      if (maxVisibleSection) {
        setActiveSection(maxVisibleSection);
      }
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe all sections
    navigationItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (href: string) => {
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      // Immediately set active state for better UX
      setActiveSection(targetId);

      // Update URL hash without causing a jump
      history.pushState(null, "", `#${targetId}`);

      // Scroll to element with offset for sticky header
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="border-b border-gray-200 sticky top-0 z-50 shadow-md backdrop-blur-sm bg-white/95">
      <div className="max-w-6xl mx-auto px-4">
        <nav className="flex space-x-4 sm:space-x-6 md:space-x-8 py-4 overflow-x-auto scrollbar-hide">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.href)}
              className={`whitespace-nowrap font-medium transition-all cursor-pointer duration-200 text-sm sm:text-base px-3 py-2 rounded-md relative ${
                activeSection === item.id
                  ? "text-blue-600 bg-blue-50 font-semibold"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};
