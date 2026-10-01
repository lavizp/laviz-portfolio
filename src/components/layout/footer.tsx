import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { profile, socials } from '@/data/portfolio';

export function Footer() {
  return (
    <footer className="portfolio-footer">
      <div className="footer-top" data-reveal="up">
        <p>
          Built with intent.
          <br />
          Made to be useful.
        </p>
        <div>
          {socials
            .filter((social) => social.icon !== 'twitter')
            .map((social) => (
              <a
                key={social.label}
                href={
                  social.icon === 'mail'
                    ? `mailto:${profile.email}`
                    : social.href
                }
              >
                {social.label}
                <ArrowUpRight size={14} />
              </a>
            ))}
        </div>
        <span>
          Kathmandu, Nepal
          <br />
          Nepal Time · UTC+5:45
        </span>
      </div>
      <a
        className="footer-wordmark"
        href="#top"
        aria-label="Laviz Pandey, back to top"
        data-reveal="lines"
      >
        <span className="line-mask">
          <span className="line-in">Laviz Pandey</span>
        </span>
        <span className="footer-star">✳</span>
      </a>
      <div className="footer-bottom" data-reveal="up">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>TypeScript. Tools. Curiosity.</span>
        <a
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
                .matches
                ? 'instant'
                : 'smooth',
            });
          }}
        >
          Back to top <ArrowUp size={14} />
        </a>
      </div>
    </footer>
  );
}
