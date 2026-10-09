import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight } from 'lucide-react';
import { profile } from '@/data/portfolio';

// A living contour field: pointer movement bends the surface rather than moving the page.
function ContourField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = { x: 0.65, y: 0.4 };
    let width = 0,
      height = 0,
      frame = 0,
      visible = true;
    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const move = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - bounds.left) / width;
      pointer.y = (event.clientY - bounds.top) / height;
    };
    const draw = (time: number) => {
      if (visible && !document.hidden) {
        context.clearRect(0, 0, width, height);
        const phase = reduced.matches ? 0 : time * 0.00012;
        const cx = width * (0.62 + (pointer.x - 0.5) * 0.13);
        const cy = height * (0.44 + (pointer.y - 0.5) * 0.15);
        context.lineWidth = 0.8;
        for (let ring = 0; ring < 33; ring++) {
          context.beginPath();
          for (let step = 0; step <= 160; step++) {
            const angle = (step / 160) * Math.PI * 2;
            const radius = 28 + ring * 19;
            const distortion =
              1 +
              0.13 * Math.sin(angle * 3 + phase) +
              0.08 * Math.cos(angle * 5 - phase * 1.4);
            const x = cx + Math.cos(angle) * radius * distortion * 1.6;
            const y = cy + Math.sin(angle) * radius * distortion * 0.68;
            if (step === 0) context.moveTo(x, y);
            else context.lineTo(x, y);
          }
          context.strokeStyle = `rgba(209,242,128,${0.08 + (1 - ring / 33) * 0.13})`;
          context.stroke();
        }
        const angle = phase * 3;
        const x = cx + Math.cos(angle) * 135,
          y = cy + Math.sin(angle) * 65;
        context.beginPath();
        context.arc(x, y, 5, 0, Math.PI * 2);
        context.fillStyle = '#d1f280';
        context.fill();
        context.beginPath();
        context.arc(x, y, 12, 0, Math.PI * 2);
        context.strokeStyle = 'rgba(209,242,128,.5)';
        context.stroke();
      }
      if (!reduced.matches) frame = requestAnimationFrame(draw);
    };
    const observer = new ResizeObserver(() => {
      resize();
      if (reduced.matches) draw(0);
    });
    observer.observe(canvas);
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibility.observe(canvas);
    const restart = () => {
      cancelAnimationFrame(frame);
      draw(0);
    };
    reduced.addEventListener('change', restart);
    canvas.parentElement?.addEventListener('pointermove', move);
    resize();
    draw(0);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      reduced.removeEventListener('change', restart);
      canvas.parentElement?.removeEventListener('pointermove', move);
    };
  }, []);
  return <canvas ref={ref} className="hero-contours" aria-hidden="true" />;
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [clock, setClock] = useState('Nepal Time · UTC+5:45');
  useEffect(() => {
    const updateClock = () =>
      setClock(
        new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Kathmandu',
          hour: '2-digit',
          minute: '2-digit',
        }).format(new Date()) + ' NPT · UTC+5:45',
      );
    updateClock();
    const timer = window.setInterval(updateClock, 60000);
    let frame = 0;
    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const element = ref.current;
        if (element)
          element.style.setProperty(
            '--hero-out',
            String(
              Math.min(1, Math.max(0, window.scrollY / element.offsetHeight)),
            ),
          );
      });
    };
    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();
    return () => {
      clearInterval(timer);
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateScroll);
    };
  }, []);
  return (
    <section
      ref={ref}
      id="top"
      className="portfolio-hero"
      aria-label="Introduction"
    >
      <div className="hero-stage">
        <ContourField />
        <div className="hero-meta" style={{ ['--i' as string]: 0 }}>
          <span>
            <b lang="ne">काठमाडौँ</b> Kathmandu, Nepal
          </span>
          <span>27.7172° N · 85.3240° E · 1,400 m</span>
        </div>
        <div className="hero-time" style={{ ['--i' as string]: 1 }}>
          {clock}
        </div>
        <div className="hero-composition">
          <h1 className="hero-title">
            <span className="hero-line">
              <span style={{ ['--i' as string]: 0 }}>From schema</span>
            </span>
            <span className="hero-line">
              <span style={{ ['--i' as string]: 1 }}>
                to <em>screen.</em>
                <svg viewBox="0 0 350 35" aria-hidden="true">
                  <path d="M5 25 Q170 0 340 18" />
                </svg>
              </span>
            </span>
          </h1>
          <div className="hero-copy" style={{ ['--i' as string]: 2 }}>
            <p>
              I’m {profile.firstName}, a full-stack developer. I design the
              backend, model the data, and build the interface on top of it.
            </p>
            <a className="pill-button pill-lime" href="#work">
              Explore the work <ArrowDownRight size={19} />
            </a>
            <div className="hero-availability">
              <i className="live-dot" />
              {profile.availability}
              <span>Nepal / Remote</span>
            </div>
          </div>
        </div>
        <div className="hero-foot" style={{ ['--i' as string]: 3 }}>
          <span>2+ years · AI-driven products</span>
          <span>Platforms serving 10,000+ users</span>
          <span>
            Scroll for selected work <ArrowDownRight size={16} />
          </span>
        </div>
      </div>
    </section>
  );
}
