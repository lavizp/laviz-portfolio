import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { profile } from '@/data/portfolio';
import { useSlidingIndicator } from '@/hooks/use-sliding-indicator';

const links = [
  { label: 'Work', id: 'work' },
  { label: 'Experience', id: 'experience' },
  { label: 'About', id: 'about' },
  { label: 'Writing', id: 'writing' },
];

export function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [hovered, setHovered] = useState('');
  const { pathname } = useLocation();
  const home = pathname === '/';
  // The pill follows the pointer while hovering, and falls back to whichever
  // section is currently on screen.
  const navRef = useSlidingIndicator<HTMLElement>(
    'indicator',
    hovered || active,
  );
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 761px)');
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener('change', closeOnDesktop);
    const update = () => setScrolled(window.scrollY > 80);
    update();
    window.addEventListener('scroll', update, { passive: true });
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', key);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('keydown', key);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, []);
  useEffect(() => {
    setOpen(false);
    setActive('');
    if (!home) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-20% 0px -55% 0px' },
    );
    links.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [pathname, home]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const elements = Array.from(
        headerRef.current?.querySelectorAll<HTMLElement>('a[href], button') ??
          [],
      ).filter(
        (element) =>
          element.getClientRects().length > 0 && !element.closest('[inert]'),
      );
      const first = elements[0],
        last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener('keydown', trapFocus);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', trapFocus);
    };
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header
        ref={headerRef}
        className={`portfolio-nav ${scrolled ? 'is-scrolled' : ''} ${home ? 'on-home' : ''} ${open ? 'menu-open' : ''}`}
      >
        <div className="nav-shell">
          <Link
            to="/"
            className="portfolio-brand"
            aria-label="Laviz Pandey, home"
          >
            <span>
              lp
              <i />
            </span>
            <b>{profile.name}</b>
          </Link>
          <nav
            className="portfolio-desktop-nav"
            aria-label="Main navigation"
            ref={navRef}
            onMouseLeave={() => setHovered('')}
          >
            {links.map((link) => (
              <a
                key={link.id}
                href={`/#${link.id}`}
                data-key={link.id}
                onMouseEnter={() => setHovered(link.id)}
                onFocus={() => setHovered(link.id)}
                onBlur={() => setHovered('')}
                aria-current={active === link.id ? 'location' : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a className="nav-contact" href="/#contact">
            <i className="live-dot" />
            Let’s talk <ArrowUpRight size={18} />
          </a>
          <button
            className="portfolio-menu-toggle"
            type="button"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls="portfolio-mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        <div
          id="portfolio-mobile-nav"
          className="portfolio-mobile-nav"
          inert={!open}
          aria-hidden={!open}
        >
          <nav aria-label="Mobile navigation">
            {[...links, { label: 'Contact', id: 'contact' }].map(
              (link, index) => (
                <a
                  key={link.id}
                  href={`/#${link.id}`}
                  style={{ ['--i' as string]: index }}
                  onClick={() => setOpen(false)}
                >
                  <small>0{index + 1}</small>
                  {link.label}
                  <ArrowUpRight />
                </a>
              ),
            )}
          </nav>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <span>Kathmandu, Nepal</span>
        </div>
      </header>
    </>
  );
}
