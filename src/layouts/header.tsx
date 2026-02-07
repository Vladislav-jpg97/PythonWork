"use client"
import { useState, useEffect } from "react"
import { Link, usePathname, useRouter } from "@/i18n/navigation"
import { useLocale, useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

type Locale = "ru" | "uz" | "en";

export const Header = () => {
    const t = useTranslations("Header")
    const pathname = usePathname()
    const locale = useLocale() as Locale;
    const router = useRouter()
    
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const languages = [
        { id: "ru" as Locale, label: "RU" },
        { id: "uz" as Locale, label: "UZ" },
        { id: "en" as Locale, label: "EN" }
    ] as const;

    const handleLanguageChange = (nextLocale: Locale) => {
        router.replace(pathname, { locale: nextLocale, scroll: false });
        setIsMenuOpen(false);
    };

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    return (
        <div className="fixed top-3 sm:top-6 z-[100] w-full px-4 sm:px-8">
            <header className={cn(
                "max-w-7xl mx-auto relative transition-all duration-700 ease-in-out",
                "bg-[#0b0e14]/70 backdrop-blur-3xl",
                "border border-white/[0.08] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]",
                isMenuOpen ? "rounded-[2rem]" : "rounded-[2.5rem] sm:rounded-[4rem]",
                "h-16 sm:h-24"
            )}>
                {/* Внутреннее свечение (Inner Glow) */}
                <div className="absolute inset-0 rounded-inherit border-t border-white/[0.05] pointer-events-none" />
                
                <div className="relative z-10 h-full px-6 sm:px-10 lg:px-14 flex items-center justify-between">
                    
                    {/* ЛОГОТИП */}
                    <Link href="/" className="group flex items-center gap-2 relative transition-transform active:scale-95">
                        <div className="text-base sm:text-xl font-black tracking-[0.25em] text-white uppercase italic">
                            PY<span className="text-slate-500 group-hover:text-slate-300 transition-colors">THON</span>
                            <span className="text-blue-500 group-hover:text-blue-400 group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all">WORK</span>
                        </div>
                    </Link>

                    {/* ДЕСКТОПНАЯ НАВИГАЦИЯ */}
                    <div className="hidden lg:flex items-center gap-12">
                        <nav className="flex items-center gap-10 text-[10px] uppercase tracking-[0.4em] font-black text-slate-500">
                            {[
                                { href: "/", label: t("navigation.home") },
                                { href: "/about", label: t("navigation.about") },
                                { href: "/contacts", label: t("navigation.contacts") }
                            ].map((item) => (
                                <Link 
                                    key={item.label}
                                    href={item.href} 
                                    className={cn(
                                        "relative py-2 transition-all duration-300 hover:text-white group",
                                        pathname === item.href && "text-blue-500"
                                    )}
                                >
                                    {item.label}
                                    <span className="absolute bottom-0 left-0 w-0 h-px bg-blue-500 transition-all duration-500 group-hover:w-full" />
                                </Link>
                            ))}
                        </nav>

                        <div className="h-8 w-px bg-white/10" />

                        {/* Переключатель языков (Desktop) */}
                        <div className="flex items-center gap-1 bg-black/40 p-1.5 rounded-[1.5rem] border border-white/5 shadow-inner">
                            {languages.map((lang) => (
                                <button
                                    key={lang.id}
                                    onClick={() => handleLanguageChange(lang.id)}
                                    className={cn(
                                        "px-4 py-2 rounded-xl text-[9px] font-black transition-all duration-500 uppercase tracking-widest",
                                        locale === lang.id 
                                            ? "bg-blue-600 text-white shadow-[0_10px_20px_rgba(37,99,235,0.3)]" 
                                            : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                                    )}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* МОБИЛЬНЫЙ БЛОК */}
                    <div className="flex lg:hidden items-center gap-4">
                        <div className="flex bg-black/40 p-1 rounded-2xl border border-white/5">
                            {languages.map((lang) => (
                                <button
                                    key={lang.id}
                                    onClick={() => handleLanguageChange(lang.id)}
                                    className={cn(
                                        "px-2.5 py-1.5 rounded-xl text-[9px] font-black transition-all duration-300",
                                        locale === lang.id ? "bg-blue-600 text-white shadow-lg" : "text-slate-500"
                                    )}
                                >
                                    {lang.id.toUpperCase()}
                                </button>
                            ))}
                        </div>

                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-3 text-white bg-white/5 hover:bg-white/10 rounded-2xl transition-all active:scale-90"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={22} className="text-blue-500" /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* МОБИЛЬНОЕ ВЫПАДАЮЩЕЕ МЕНЮ */}
                <div className={cn(
                    "lg:hidden absolute top-[110%] left-0 w-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
                    isMenuOpen ? "max-h-[400px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-4"
                )}>
                    <nav className="bg-[#0b0e14]/95 backdrop-blur-3xl border border-white/[0.08] rounded-[2.5rem] p-8 flex flex-col gap-2 shadow-2xl shadow-blue-500/10">
                        {[
                            { href: "/", label: t("navigation.home") },
                            { href: "/about", label: t("navigation.about") },
                            { href: "/contacts", label: t("navigation.contacts") }
                        ].map((link) => (
                            <Link 
                                key={link.label}
                                href={link.href} 
                                className="group flex justify-between items-center text-xs font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white p-4 rounded-2xl hover:bg-white/5 transition-all"
                            >
                                {link.label}
                                <div className={cn(
                                    "w-1.5 h-1.5 rounded-full bg-blue-600 transition-opacity",
                                    pathname === link.href ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                )} />
                            </Link>
                        ))}
                    </nav>
                </div>
            </header>
        </div>
    )
}