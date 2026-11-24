"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/shared/Button";
import { Logo } from "@/components/shared/Logo";
import { WhatsAppLink } from "@/components/shared/WhatsAppLink";
import { siteConfig } from "@/lib/config";
import { whatsappMessages } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

function isActive(pathname: string, item: NavItem) {
  if (item.children) return item.children.some((c) => pathname === c.href);
  const path = item.href.split("#")[0] || "/";
  return path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`);
}

export function Navbar() {
  const pathname = usePathname();
  // Menus are "open" only for the page they were opened on, so navigating anywhere closes them
  // automatically without an effect.
  const [mobileOnPath, setMobileOnPath] = useState<string | null>(null);
  const [dropdown, setDropdown] = useState<{ label: string; path: string } | null>(null);
  const [mobileSub, setMobileSub] = useState<{ label: string; path: string } | null>(null);
  const mobileOpen = mobileOnPath === pathname;
  const openDropdown = dropdown?.path === pathname ? dropdown.label : null;
  const openMobileSub = mobileSub?.path === pathname ? mobileSub.label : null;
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!mobileOpen && !openDropdown) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (openDropdown) setDropdown(null);
      else {
        setMobileOnPath(null);
        toggleRef.current?.focus();
      }
    };
    const onPointer = (e: MouseEvent) => {
      if (openDropdown && !navRef.current?.contains(e.target as Node)) setDropdown(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [mobileOpen, openDropdown]);

  const linkClass = (active: boolean) =>
    cn(
      "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
      active ? "bg-ink text-white" : "text-body hover:text-accent",
    );

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Logo />

        <nav ref={navRef} aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          {siteConfig.nav.map((item) => {
            const active = isActive(pathname, item);
            if (item.children) {
              const open = openDropdown === item.label;
              const menuId = `menu-${item.label.toLowerCase()}`;
              return (
                <div key={item.label} className="relative">
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="true"
                    aria-controls={menuId}
                    onClick={() => setDropdown(open ? null : { label: item.label, path: pathname })}
                    className={linkClass(active)}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={cn("size-4 transition-transform duration-200", open && "rotate-180")}
                    />
                  </button>
                  {open && (
                    <div
                      id={menuId}
                      className="absolute left-0 top-full z-50 mt-2 w-60 rounded-2xl border border-line bg-surface p-2 shadow-xl shadow-black/10"
                    >
                      <ul>
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              aria-current={pathname === child.href ? "page" : undefined}
                              className="block rounded-xl px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-sunken hover:text-accent"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                        <li className="mt-1 border-t border-line pt-1">
                          <Link
                            href={item.href}
                            className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-sunken"
                          >
                            All uniforms &rarr;
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={linkClass(active)}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Wrapped (not `hidden` on the link itself) because the button's own display class would override it. */}
          <div className="hidden sm:block">
            <ButtonLink href={siteConfig.getStartedCta.href}>{siteConfig.getStartedCta.label}</ButtonLink>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface text-ink lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOnPath(mobileOpen ? null : pathname)}
          >
            {mobileOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" hidden={!mobileOpen} className="max-h-[calc(100dvh-4.25rem)] overflow-y-auto border-t border-line bg-canvas lg:hidden">
        <nav aria-label="Mobile" className="mx-auto flex max-w-7xl flex-col px-5 py-4 sm:px-8">
          {siteConfig.nav.map((item) => {
            const active = isActive(pathname, item);
            if (item.children) {
              const open = openMobileSub === item.label;
              return (
                <div key={item.label} className="border-b border-line">
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`mobile-sub-${item.label.toLowerCase()}`}
                    onClick={() => setMobileSub(open ? null : { label: item.label, path: pathname })}
                    className={cn(
                      "flex w-full items-center justify-between py-4 font-display text-2xl tracking-tight",
                      active ? "text-accent" : "text-ink",
                    )}
                  >
                    {item.label}
                    <ChevronDown aria-hidden="true" className={cn("size-5 transition-transform", open && "rotate-180")} />
                  </button>
                  <ul id={`mobile-sub-${item.label.toLowerCase()}`} hidden={!open} className="pb-3 pl-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} className="block py-2.5 text-lg text-body">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link href={item.href} className="block py-2.5 text-lg font-semibold text-accent">
                        All uniforms &rarr;
                      </Link>
                    </li>
                  </ul>
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn("border-b border-line py-4 font-display text-2xl tracking-tight", active ? "text-accent" : "text-ink")}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="mt-6 flex flex-col gap-3 pb-2">
            <ButtonLink href={siteConfig.getStartedCta.href} size="lg">
              {siteConfig.getStartedCta.label}
            </ButtonLink>
            <WhatsAppLink message={whatsappMessages.general()} size="lg" />
          </div>
        </nav>
      </div>
    </header>
  );
}
