"use client";

import React, { useState, useEffect, JSX } from "react";
import { NavLink } from "@/components/ui/NavLink";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

// Icon mapping helper (same as Header)
const getIcon = (iconName: string) => {
  const icons: Record<string, JSX.Element> = {
    book: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    tax: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    users: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    shield: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    "trending-up": (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    heart: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    "shopping-bag": (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    building: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    monitor: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    briefcase: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    cog: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  };

  return icons[iconName] || icons['briefcase'];
};

interface NavItem {
  title: string;
  slug: string;
  description?: string;
  icon: string;
}

interface NavigationData {
  services: NavItem[];
  industries: NavItem[];
  hireStaff: NavItem[];
}

export const MobileMenu: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  navData: NavigationData | null;
}> = ({ isOpen, onClose, navData }) => {
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (menuName: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const navigation = [
    { name: "Home", href: "/" },
    {
      name: "About Us",
      href: "#",
      submenu: [
        {
          name: "Our Company",
          href: "/about",
          icon: getIcon("building"),
        },
        {
          name: "Our Team",
          href: "/team",
          icon: getIcon("users"),
        },
      ],
    },
    {
      name: "Services",
      href: "#",
      submenu: navData?.services.map(service => ({
        name: service.title,
        href: `/${service.slug}`,  // Removed /services/ prefix
        icon: getIcon(service.icon),
      })) || [],
    },
    {
      name: "Hire Our Staff",
      href: "#",
      submenu: navData?.hireStaff.map(position => ({
        name: position.title,
        href: `/${position.slug}`,  // Removed /hire-staff/ prefix
        icon: getIcon(position.icon),
      })) || [],
    },
    {
      name: "Industries We Serve",
      href: "#",
      submenu: navData?.industries.map(industry => ({
        name: industry.title,
        href: `/industries/${industry.slug}`,  // Kept /industries/ prefix
        icon: getIcon(industry.icon),
      })) || [],
    },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200">
            <Link href="/" className="relative h-8 w-32" onClick={onClose}>
              <Image
                src="/logo_autocropped.png"
                alt="Xconcile"
                fill
                className="object-contain object-left"
              />
            </Link>
            <button
              onClick={onClose}
              className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto">
            {navigation.map((item) => {
              if (item.submenu) {
                const isExpanded = expandedMenus[item.name] || false;
                return (
                  <div key={item.name}>
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className="w-full px-4 py-3 text-left flex items-center justify-between text-base font-medium border-b border-neutral-200 text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 transition-colors"
                    >
                      <span>{item.name}</span>
                      <svg
                        className={cn(
                          "w-5 h-5 text-neutral-600 flex-shrink-0 transition-transform duration-200",
                          isExpanded && "rotate-180"
                        )}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300 ease-in-out bg-neutral-50",
                        isExpanded ? "max-h-[62.5rem] opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={onClose}
                          className="flex items-center gap-3 px-8 py-3 text-sm text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 transition-colors border-l-4 border-transparent hover:border-primary-200"
                        >
                          <div className="text-neutral-400 group-hover:text-primary-500">
                            {subItem.icon}
                          </div>
                          <span>{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <div key={item.href} onClick={onClose}>
                  <NavLink href={item.href} mobile>
                    {item.name}
                  </NavLink>
                </div>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="p-4 border-t border-neutral-200">
            <Link href="/meeting">
                <Button
                  variant="primary"
                  className="w-full bg-secondary-600 hover:bg-secondary-700"
                  onClick={() => {
                    onClose();
                // Handle schedule call action
              }}
                >
                  Schedule a Meeting
                </Button>
              </Link>
            </div>
        </div>
      </div>
    </>
  );
};
