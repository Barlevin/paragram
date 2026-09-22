import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "../data/site-content";
import { AppLink } from "./AppLink";

type HeaderProps = {
  solid?: boolean;
};

export function Header({ solid = false }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className={`site-header ${scrolled || solid ? "site-header--scrolled" : ""}`}>
      <nav className="shell nav" aria-label="ניווט ראשי">
        <AppLink className="logo" href="/" ariaLabel="Paragram, לעמוד הבית">
          <img className="logo__img logo__img--light" src="/images/logo-light.webp" alt="" width="387" height="140" />
          <img className="logo__img logo__img--dark" src="/images/logo.webp" alt="" width="387" height="140" />
        </AppLink>

        <div className="nav__links">
          {navItems.map((item) => (
            <AppLink href={item.href} key={item.href}>{item.label}</AppLink>
          ))}
        </div>

        <AppLink className="button button--small nav__cta" href="#contact">בואו נדבר</AppLink>
        <button
          className="nav__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      <div id="mobile-menu" className={`mobile-menu ${open ? "mobile-menu--open" : ""}`}>
        {navItems.map((item, index) => (
          <AppLink href={item.href} key={item.href} onClick={() => setOpen(false)}>
            <span>0{index + 1}</span>{item.label}
          </AppLink>
        ))}
        <AppLink className="button" href="#contact" onClick={() => setOpen(false)}>מתחילים פרויקט</AppLink>
      </div>
    </header>
  );
}
