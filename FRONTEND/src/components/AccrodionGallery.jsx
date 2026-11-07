import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { Link, useNavigate } from 'react-router-dom';
import { showcaseJurusan as DEFAULT_ITEMS } from '../data/showcaseJurusan';

const AccordionGallery = ({
  items = DEFAULT_ITEMS,
  defaultIndex = 0,
  accentColor = '#EF4444',
  overlayColor = '#060010',
  textColor = '#ffffff',
  height = 490,
  gap = 14,
  radius = 18,
  expandRatio = 0.38,
  orientation = 'horizontal',
  duration = 0.6,
  ease = 'power3.out',
  parallax = 0.25,
  tilt = 0,
  stagger = 0.05,
  trigger = 'hover',
  showLabels = true,
  grayscale = false,
  highlightedIndex = null,
  className = ''
}) => {
  const rootRef = useRef(null);
  const panelRefs = useRef([]);
  const mediaRefs = useRef([]);
  const contentRefs = useRef([]);
  const tlRef = useRef(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(480);
  const navigate = useNavigate();

  const vertical = orientation === 'vertical';
  const count = items.length;
  const [active, setActive] = useState(
    Math.min(Math.max(defaultIndex, 0), Math.max(0, count - 1))
  );
  const [hovered, setHovered] = useState(null);

  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const applyLayout = useCallback(
    animate => {
      const panels = panelRefs.current;
      if (!panels.length) return;

      const r = Math.min(Math.max(expandRatio, 0.2), 0.85);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
      const mediaSize = mediaSizeRef.current;

      tlRef.current?.kill();
      const dur = animate && !prefersReduced ? duration : 0;
      const tl = gsap.timeline();

      panels.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === active;
        const media = mediaRefs.current[i];
        const content = contentRefs.current[i];

        const rot = isActive ? 0 : i < active ? tilt : -tilt;
        const rotProp = vertical ? { rotateX: -rot } : { rotateY: rot };

        tl.to(
          panel,
          { flexGrow: isActive ? grow : 1, ...rotProp, duration: dur, ease },
          0
        );

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - i));
          const shift = drift * parallax * mediaSize * 0.05;
          const gray = grayscale ? (isActive ? 0 : 1) : 0;
          tl.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: vertical ? 0 : isActive ? 0 : shift,
              y: vertical ? (isActive ? 0 : shift) : 0,
              '--ag-gray': gray,
              '--ag-dim': isActive ? 0 : 0.12,
              duration: dur,
              ease
            },
            0
          );
        }

        if (showLabels && content) {
          if (isActive) {
            tl.to(
              content,
              {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: dur,
                ease,
                stagger: prefersReduced ? 0 : stagger
              },
              0
            );
          } else {
            tl.to(
              content,
              {
                opacity: 0,
                x: -18,
                scale: 0.96,
                duration: dur * 0.5,
                ease
              },
              0
            );
          }
        }
      });

      tlRef.current = tl;
    },
    [
      active,
      count,
      expandRatio,
      duration,
      ease,
      vertical,
      tilt,
      parallax,
      grayscale,
      showLabels,
      stagger,
      prefersReduced
    ]
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const total = vertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size = Math.max(
        360,
        usable * Math.min(Math.max(expandRatio, 0.2), 0.85) * 1.25
      );
      mediaSizeRef.current = size;
      el.style.setProperty('--ag-media-size', `${size}px`);
      applyLayout(!firstRunRef.current);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [applyLayout, gap, count, expandRatio, vertical]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(
    () => () => {
      tlRef.current?.kill();
    },
    []
  );

  const handleMouseEnter = i => {
    setHovered(i);
    if (trigger === 'hover') {
      setActive(i);
    }
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const handleClick = (i, item, e) => {
    if (i !== active) {
      e.preventDefault();
      e.stopPropagation();
      setActive(i);
    } else if (item.link) {
      navigate(item.link);
    }
  };

  const handleKeyDown = (i, item, e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (i !== active) {
        setActive(i);
      } else if (item.link) {
        navigate(item.link);
      }
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i + 1) % count);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i - 1 + count) % count);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`flex ${vertical ? 'flex-col' : 'flex-row'} w-full max-w-full select-none [perspective:1400px] max-[640px]:!flex-col max-[640px]:[perspective:none] max-[640px]:!h-auto max-[640px]:min-h-[580px] ${className}`}
      style={{
        gap: `${gap}px`,
        height: vertical ? `${Math.round(height * 1.6)}px` : `${height}px`
      }}
      role="list"
      aria-label="Galeri Program Keahlian SMK Negeri 26 Jakarta"
    >
      {items.map((item, i) => {
        const isActive = i === active;
        const isHovered = hovered === i;
        const isBorderActive = isHovered || highlightedIndex === i;
        const currentAccent = item.accentColor || accentColor;

        return (
          <div
            key={item.id || i}
            ref={el => (panelRefs.current[i] = el)}
            className={`group relative block min-w-0 min-h-0 flex-[1_1_0] cursor-pointer overflow-hidden bg-[#0a0713] outline-none transition-[border-color,box-shadow] duration-200 border-2 [box-shadow:0_10px_25px_-15px_rgba(0,0,0,0.4)] max-[640px]:min-h-[70px] ${
              isActive ? 'max-[640px]:min-h-[200px]' : ''
            } ${
              isBorderActive
                ? 'border-[#0088FF] shadow-[0_0_15px_rgba(0,136,255,0.35)]'
                : 'border-transparent'
            }`}
            style={{
              borderRadius: `${radius}px`,
              willChange: 'flex-grow, transform'
            }}
            onClick={e => handleClick(i, item, e)}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
            onFocus={() => setActive(i)}
            onKeyDown={e => handleKeyDown(i, item, e)}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? 'true' : undefined}
            aria-label={`${item.singkatan || item.label} - ${item.nama || item.subtitle}`}
          >
            {/* Image Container with Parallax & Filter */}
            <span className="absolute inset-0 overflow-hidden [border-radius:inherit]">
              <span
                ref={el => (mediaRefs.current[i] = el)}
                className="absolute top-1/2 left-1/2 [filter:grayscale(var(--ag-gray,0))]"
                style={{
                  width: vertical ? '100%' : 'var(--ag-media-size, 480px)',
                  height: vertical ? 'var(--ag-media-size, 480px)' : '100%',
                  willChange: 'transform, filter'
                }}
              >
                <img
                  src={item.image}
                  alt={item.alt || item.nama || item.label || ''}
                  draggable="false"
                  className="block h-full w-full select-none object-cover object-center [-webkit-user-drag:none]"
                />
              </span>

              {/* Dynamic Gradient Overlay */}
              <span
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                style={{
                  background: isActive
                    ? 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.88) 100%)'
                    : 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.45) 100%)'
                }}
                aria-hidden="true"
              />
            </span>

            {/* Inactive mobile indicator pill */}
            {!isActive && (
              <div className="hidden max-[640px]:flex absolute inset-0 items-center justify-between px-4 z-10 pointer-events-none">
                <span className="font-montserrat font-bold text-white text-base drop-shadow-md">
                  {item.singkatan || item.label}
                </span>
                <span className="text-white/70 text-xs font-medium truncate max-w-[180px]">
                  {item.nama || item.subtitle}
                </span>
              </div>
            )}

            {/* Active Card Content (Pill Button, Accent Bar, Acronym, and Full Name) */}
            {showLabels && (
              <div
                ref={el => (contentRefs.current[i] = el)}
                className={`absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-10 flex flex-col items-start select-none transition-all duration-300 ${
                  isActive
                    ? 'opacity-100 translate-x-0 pointer-events-auto'
                    : 'opacity-0 -translate-x-4 pointer-events-none'
                }`}
                aria-hidden={!isActive}
              >
                {/* "Lihat Jurusan →" Pill Button */}
                <div className="flex items-center gap-2 mb-2 sm:mb-3.5">
                  <Link
                    to={item.link || '#'}
                    onClick={e => e.stopPropagation()}
                    className="group/btn inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 hover:border-white/40 text-white text-[11px] sm:text-[13px] font-medium tracking-wide transition-all duration-300 shadow-sm cursor-pointer active:scale-95"
                  >
                    <span>Lihat Jurusan</span>
                    <span className="text-xs sm:text-sm font-bold transition-transform duration-300 group-hover/btn:translate-x-1">
                      →
                    </span>
                  </Link>
                  <span className="hidden max-[640px]:inline-block text-[10.5px] font-semibold text-white/90 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                    Ketuk lagi untuk buka
                  </span>
                </div>

                {/* Vertical Accent Bar + Title Block */}
                <div className="flex items-stretch gap-2.5 sm:gap-3.5 w-full">
                  {/* Red Vertical Accent Bar */}
                  <div
                    className="w-1 sm:w-1.2 rounded-full self-stretch flex-none"
                    style={{
                      backgroundColor: currentAccent,
                      boxShadow: `0 0 12px ${currentAccent}80`
                    }}
                  />

                  {/* Major Acronym and Full Name */}
                  <div className="flex flex-col justify-center min-w-0">
                    <h3 className="font-montserrat font-extrabold text-xl sm:text-3xl lg:text-[32px] text-white tracking-tight leading-none drop-shadow-md">
                      {item.singkatan || item.label || item.title}
                    </h3>
                    <p
                      className="text-[11px] sm:text-sm font-medium leading-snug mt-1 sm:mt-1.5 line-clamp-2 drop-shadow"
                      style={{ color: textColor }}
                    >
                      {item.nama || item.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AccordionGallery;
