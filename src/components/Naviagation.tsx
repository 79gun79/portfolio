import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronRight, SquareTerminal, LogOut } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../hooks/useAuth';
import { loginWithGooglePopup, logout } from '../services/auth';

export function Navigation() {
  const { user } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'border-b border-slate-200 bg-white/98 shadow-sm backdrop-blur-xl'
            : 'border-b border-slate-200/50 bg-white/95 backdrop-blur-xl'
        }`}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between sm:h-20 lg:h-24">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsMobileMenuOpen(false);
              }}
              className={`group flex items-center gap-2 transition-colors sm:gap-3 ${
                isScrolled ? 'text-slate-900' : 'text-white'
              }`}
            >
              <img
                src="/favicon.svg"
                alt="Logo"
                className="h-6 w-6 sm:h-12 sm:w-12"
              />
              <span className="font-mono text-lg font-semibold text-slate-900 transition-colors group-hover:text-green-600 sm:text-xl lg:text-2xl">
                Jaegeon. Lee.
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-1 lg:flex xl:gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`rounded-lg px-4 py-2 text-base font-medium text-slate-700 transition-all hover:bg-green-50 hover:text-green-600`}
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
                      ? 'bg-green-600 text-white shadow-lg shadow-green-600/25 hover:bg-green-700'
                      : 'border border-white/20 bg-white text-slate-900 hover:bg-green-50',
                  )}
                >
                  로그인
                </button>
              ) : (
                <div className="relative ml-4" ref={profileMenuRef}>
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-2 rounded-full transition-all hover:ring-2 hover:ring-green-600 hover:ring-offset-2"
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
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg transition-all lg:hidden ${
                isScrolled
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-white text-slate-900 hover:bg-green-50'
              }`}
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
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600 shadow-md shadow-green-600/20">
                    <SquareTerminal className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-mono text-xl font-semibold text-slate-900">
                    Jaegeon. Lee.
                  </span>
                </div>
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
                      <span className="text-lg font-medium text-slate-900 transition-colors group-hover:text-green-600">
                        {item.label}
                      </span>
                      <ChevronRight className="h-5 w-5 text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:text-green-600" />
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
                        'bg-green-600 text-white shadow-green-600/25 hover:bg-green-700',
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

                  <a
                    href="#openpositions"
                    onClick={(e) => handleNavClick(e, '#openpositions')}
                    className="block w-full rounded-xl bg-slate-100 px-6 py-4 text-center font-medium text-slate-900 transition-colors hover:bg-slate-200 active:scale-[0.98]"
                  >
                    다시 보기
                  </a>
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
