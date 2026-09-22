import { type MouseEvent, type ReactNode } from "react";
import { goHome, navigate } from "../lib/navigation";

type AppLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
};

export function AppLink({ href, children, className, ariaLabel, onClick }: AppLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;

    if (href.startsWith("#")) {
      event.preventDefault();
      goHome(href);
      onClick?.();
      return;
    }

    if (href.startsWith("/") && !href.startsWith("//")) {
      event.preventDefault();
      navigate(href);
      onClick?.();
    }
  }

  return (
    <a className={className} href={href} aria-label={ariaLabel} onClick={handleClick}>
      {children}
    </a>
  );
}
