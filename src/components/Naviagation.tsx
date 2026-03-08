import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronRight, LogOut } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../hooks/useAuth';
import { loginWithGooglePopup, logout } from '../services/auth';

export function Navigation() {
  const { user } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInHome, setIsInHome] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const handleLoginPopup = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);

    try {
      await loginWithGooglePopup();
    } catch (e) {
      console.error(e);
      alert('팝업 로그인 실패');
    } finally {
      setIsMobileMenuOpen(false);
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsProfileMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const compute = () => {
      const y = window.scrollY || 0;
      setIsScrolled(y > 20);

      // "Home" 구간: About 섹션(#about) 도달 전까지로 간주
      const aboutEl = document.getElementById('about');
      if (aboutEl) {
        const aboutTop = aboutEl.getBoundingClientRect().top + y;
        const navOffset = 120;
        setIsInHome(y < aboutTop - navOffset);
        return;
      }

      // Fallback: About이 아직 렌더되지 않은 경우 대략 첫 화면을 Home으로 취급
      setIsInHome(y < (window.innerHeight || 0) * 0.9);
    };

    compute();
    window.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute);
    return () => {
      window.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  const navItems = [
    { label: 'About Me', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const element = document.querySelector(href);
    if (element) {
      const offset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <nav
        className={twMerge(
          'fixed top-0 right-0 left-0 z-50 backdrop-blur-xl transition-all duration-300',
          isInHome
            ? [
                'bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(245,248,245,0.62))]',
                'shadow-[0_10px_30px_rgba(2,6,23,0.12)]',
                'ring-1 ring-black/5',
              ].join(' ')
            : isScrolled
              ? 'border-b border-slate-200/70 bg-white/92 shadow-sm'
              : 'border-b border-white/25 bg-white/80 shadow-sm shadow-black/10',
        )}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between sm:h-20 lg:h-18">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsMobileMenuOpen(false);
              }}
              aria-label="Home"
              className="group flex items-center text-slate-900 transition-colors"
            >
              <img
                src="/icon/logo_none.png"
                alt="Logo"
                className="h-6 w-auto object-contain sm:h-12"
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-1 lg:flex xl:gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={twMerge(
                    'rounded-lg px-4 py-2 text-base font-medium transition-all',
                    'focus-visible:ring-2 focus-visible:outline-none',
                    'active:scale-[0.98]',
                    isInHome
                      ? [
                          'text-slate-800!',
                          'hover:bg-white/55 hover:text-slate-900!',
                          'active:bg-emerald-50/70',
                          'focus-visible:ring-emerald-200/60',
                        ].join(' ')
                      : [
                          'text-slate-700!',
                          'hover:bg-emerald-50/80 hover:text-emerald-700!',
                          'active:bg-emerald-100/80',
                          'focus-visible:ring-emerald-200',
                        ].join(' '),
                  )}
                >
                  {item.label}
                </a>
              ))}
              {!user ? (
                <button
                  onClick={handleLoginPopup}
                  disabled={isLoggingIn}
                  type="button"
                  className={twMerge(
                    'ml-4 cursor-pointer rounded-lg px-6 py-2.5 font-semibold transition-all',
                    isScrolled
                      ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/15 hover:bg-slate-800'
                      : 'border border-slate-200 bg-white/80 text-slate-900 hover:bg-slate-50',
                  )}
                >
                  로그인
                </button>
              ) : (
                <div className="relative ml-4" ref={profileMenuRef}>
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-2 rounded-full transition-all hover:ring-2 hover:ring-emerald-400/60 hover:ring-offset-2"
                    aria-label="프로필 메뉴"
                  >
                    <img
                      src={user.photoURL ?? ''}
                      alt="프로필"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </button>

                  <AnimatePresence>
                    {isProfileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
                      >
                        <div className="border-b border-slate-100 p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={user.photoURL ?? ''}
                              alt="프로필"
                              className="h-12 w-12 rounded-full object-cover"
                            />
                            <div className="flex-1 overflow-hidden">
                              <p className="truncate font-semibold text-slate-900">
                                {user.displayName}
                              </p>
                              <p className="truncate text-sm text-slate-500">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-2">
                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-red-50"
                          >
                            <LogOut className="h-5 w-5 text-red-600" />
                            <span className="font-medium text-slate-900">
                              로그아웃
                            </span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white/80 text-slate-900 shadow-sm transition-all hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:outline-none lg:hidden"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Slide-in Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full bg-white shadow-2xl sm:w-80 lg:hidden"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-6">
                <span className="pl-2 text-xl font-semibold text-slate-900">
                  Gun's Portfolio
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-slate-100"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6 text-slate-900" />
                </button>
              </div>

              {/* Menu Content */}
              <div className="h-[calc(100%-80px)] overflow-y-auto">
                <nav className="space-y-1 p-4 sm:p-6">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="group flex items-center justify-between rounded-xl px-4 py-4 transition-colors hover:bg-slate-50 active:scale-[0.98]"
                    >
                      <span className="text-lg font-medium text-slate-900 transition-colors group-hover:text-emerald-700">
                        {item.label}
                      </span>
                      <ChevronRight className="h-5 w-5 text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-700" />
                    </a>
                  ))}
                </nav>

                {/* CTA Section */}
                <div className="space-y-3 p-4 sm:p-6">
                  {!user ? (
                    <button
                      onClick={handleLoginPopup}
                      disabled={isLoggingIn}
                      type="button"
                      className={twMerge(
                        'block w-full cursor-pointer rounded-xl px-6 py-4 text-center font-semibold shadow-lg transition-colors active:scale-[0.98]',
                        'bg-slate-900 text-white shadow-slate-900/15 hover:bg-slate-800',
                      )}
                    >
                      로그인
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.photoURL ?? ''}
                            alt="프로필"
                            className="h-12 w-12 rounded-full object-cover"
                          />
                          <div className="flex-1 overflow-hidden">
                            <p className="truncate font-semibold text-slate-900">
                              {user.displayName}
                            </p>
                            <p className="truncate text-sm text-slate-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-4 font-semibold! text-white shadow-lg shadow-red-600/25 transition-colors hover:bg-red-700 active:scale-[0.98]"
                      >
                        <LogOut className="h-5 w-5" />
                        로그아웃
                      </button>
                    </div>
                  )}
                </div>

                {/* Footer Info */}
                <div className="border-t border-slate-100 p-4 text-center sm:p-6">
                  <p className="text-sm text-slate-500">Gun. Official.</p>
                  <p className="mt-1 text-xs text-slate-400">
                    내용을 입력하세요
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
