"use client";

import React, { useState, useEffect, JSX } from "react";
import Link from "next/link";
import Image from "next/image";
import { NavLink } from "@/components/ui/NavLink";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

// Icon mapping helper
const getIcon = (iconName: string) => {
  const icons: Record<string, JSX.Element> = {
    book: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    tax: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    users: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    shield: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    "trending-up": (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    heart: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    "shopping-bag": (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    building: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    monitor: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    briefcase: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    cog: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  description: string;
  icon: string;
}

interface NavigationData {
  services: NavItem[];
  industries: NavItem[];
  hireStaff: NavItem[];
}

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [navData, setNavData] = useState<NavigationData | null>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Fetch navigation data from API
  useEffect(() => {
    fetch('/api/navigation')
      .then(res => res.json())
      .then(data => setNavData(data))
      .catch(err => console.error('Failed to fetch navigation:', err));
  }, []);

  const handleMouseEnter = (menuName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHoveredMenu(menuName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredMenu(null);
    }, 200);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    {
      name: "About Us",
      href: "#",
      submenu: [
        {
          name: "Our Company",
          href: "/about",
          description: "Learn about our mission, values, and what drives us",
          icon: getIcon("building"),
        },
        {
          name: "Our Team",
          href: "/team",
          description: "Meet the talented professionals behind our success",
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
        description: service.description,
        icon: getIcon(service.icon),
      })) || [],
    },
    {
      name: "Hire Our Staff",
      href: "#",
      submenu: navData?.hireStaff.map(position => ({
        name: position.title,
        href: `/${position.slug}`,  // Removed /hire-staff/ prefix
        description: position.description,
        icon: getIcon(position.icon),
      })) || [],
    },
    {
      name: "Industries We Serve",
      href: "#",
      submenu: navData?.industries.map(industry => ({
        name: industry.title,
        href: `/industries/${industry.slug}`,  // Kept /industries/ prefix
        description: industry.description,
        icon: getIcon(industry.icon),
      })) || [],
    },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>


      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-30 bg-white border-b border-neutral-200 transition-shadow duration-200",
          isScrolled && "shadow-md"
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="relative h-12 w-auto transition-transform duration-200 group-hover:scale-105">
                <Image
                  src="/logo_autocropped.png"
                  alt="Xconcile"
                  width={163} // Based on 403/138 ratio * 56px height ≈ 163px width
                  height={56}
                  className="h-full w-auto object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => {
                if (item.submenu) {
                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(item.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "px-3 py-2 text-base font-medium transition-colors duration-200 flex items-center gap-1",
                          "text-neutral-700 hover:text-primary-600"
                        )}
                      >
                        {item.name}
                        <svg
                          className={cn(
                            "w-4 h-4 transition-transform duration-200",
                            hoveredMenu === item.name && "rotate-180"
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
                      </Link>

                      {/* Mega Menu */}
                      {hoveredMenu === item.name && item.submenu.length > 0 && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[56rem] bg-white rounded-xl shadow-2xl border border-neutral-200 p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                          {item.name === "About Us" ? (
                            // About Us: Full width without featured section
                            <>
                              <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-100">
                                <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider">
                                  {item.name}
                                </h3>
                              </div>
                              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                {item.submenu.map((subItem) => (
                                  <Link
                                    key={subItem.href}
                                    href={subItem.href}
                                    className="group flex items-start gap-4 p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                                  >
                                    <div className="mt-1 p-2 bg-primary-50 text-primary-600 rounded-lg group-hover:bg-primary-100 group-hover:text-primary-700 transition-colors">
                                      {subItem.icon}
                                    </div>
                                    <div>
                                      <div className="text-base font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                                        {subItem.name}
                                      </div>
                                      <p className="text-sm text-neutral-500 line-clamp-2 mt-0.5">
                                        {subItem.description}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </>
                          ) : (
                            // Other menus: 8-column submenu + 4-column featured section
                            <div className="grid grid-cols-12 gap-8">
                              {/* Services Column */}
                              <div className="col-span-8">
                                <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-100">
                                  <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider">
                                    {item.name}
                                  </h3>
                                </div>
                                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                  {item.submenu.map((subItem) => (
                                    <Link
                                      key={subItem.href}
                                      href={subItem.href}
                                      className="group flex items-start gap-4 p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                                    >
                                      <div className="mt-1 p-2 bg-primary-50 text-primary-600 rounded-lg group-hover:bg-primary-100 group-hover:text-primary-700 transition-colors">
                                        {subItem.icon}
                                      </div>
                                      <div>
                                        <div className="text-base font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                                          {subItem.name}
                                        </div>
                                        <p className="text-sm text-neutral-500 line-clamp-2 mt-0.5">
                                          {subItem.description}
                                        </p>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>

                              {/* Featured Section */}
                              <div className="col-span-4 bg-neutral-900 rounded-xl p-6 text-white flex flex-col justify-between relative overflow-hidden group">
                                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl group-hover:bg-primary-500/20 transition-all duration-500"></div>
                                <div>
                                  <span className="inline-block px-2 py-1 bg-primary-500/20 text-primary-300 text-xs font-bold uppercase tracking-widest rounded mb-3">
                                    Partner with us
                                  </span>
                                  <h4 className="text-xl font-bold mb-2">Ready to scale?</h4>
                                  <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
                                    Let our expert team handle your finances while you focus on what you do best.
                                  </p>
                                </div>
                                <Link href="/contact" className="w-full">
                                  <Button
                                    size="sm"
                                    className="w-full bg-white text-neutral-900 hover:bg-neutral-100 border-none text-sm font-bold"
                                  >
                                    Free Consultation
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <NavLink key={item.href} href={item.href}>
                    {item.name}
                  </NavLink>
                );
              })}
            </nav>

            {/* CTA Button & Mobile Menu */}
            <div className="flex items-center gap-4">
              <Link href="/contact" className="hidden md:inline-flex">
                <Button
                  variant="primary"
                  size="md"
                  className="bg-secondary-600 hover:bg-secondary-700 w-48"
                >
                  Schedule a Call
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-neutral-700 hover:text-primary-600 hover:bg-neutral-100 rounded-lg transition-colors"
                aria-label="Open menu"
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navData={navData}
      />
    </>
  );
};
