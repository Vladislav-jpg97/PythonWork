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
        <div className="fixed top-3 sm:top-6 left-0 right-0 z-[100] px-3 sm:px-8 flex sm:justify-center pointer-events-none">
            <header className={cn(
                "relative transition-all duration-700 ease-in-out pointer-events-auto",
                "ml-12 sm:ml-0", 
                "w-[calc(100%-3.5rem)] sm:w-full sm:max-w-7xl",
                "h-14 sm:h-24", 
                "bg-[#0b0e14]/80 backdrop-blur-3xl",
                "border border-white/[0.08] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]",
                isMenuOpen ? "rounded-[1.5rem]" : "rounded-full",
            )}>

                
                <div className="relative z-10 h-full px-4 sm:px-14 flex items-center justify-between gap-2">
                    
                    {/* ЛОГОТИП С ВЕРНУТОЙ АНИМАЦИЕЙ */}
                    <Link href="/" className="group flex items-center gap-2 relative shrink-0 transition-transform duration-300 active:scale-95">
                        <div className="text-[10px] sm:text-xl font-black tracking-[0.1em] sm:tracking-[0.2em] text-white uppercase italic transition-all">
                            PY<span className="text-slate-500 group-hover:text-slate-300 transition-colors duration-300">THON</span>
                            <span className="text-blue-500 group-hover:text-blue-400 group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-300">WORK</span>
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
                        <div className="flex items-center gap-1 bg-black/40 p-1.5 rounded-full border border-white/5 shadow-inner">
                            {languages.map((lang) => (
                                <button 
                                    key={lang.id} 
                                    onClick={() => handleLanguageChange(lang.id)} 
                                    className={cn(
                                        "px-4 py-2 rounded-full text-[9px] font-black transition-all duration-500 uppercase tracking-widest", 
                                        locale === lang.id ? "bg-blue-600 text-white shadow-[0_10px_20px_rgba(37,99,235,0.3)]" : "text-slate-500 hover:text-slate-300"
                                    )}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* МОБИЛЬНЫЙ БЛОК */}
                    <div className="flex lg:hidden items-center gap-2">
                        <div className="flex bg-black/40 p-0.5 rounded-full border border-white/5">
                            {languages.map((lang) => (
                                <button 
                                    key={lang.id} 
                                    onClick={() => handleLanguageChange(lang.id)} 
                                    className={cn(
                                        "px-2 py-1 rounded-full text-[7px] font-bold transition-all duration-300", 
                                        locale === lang.id ? "bg-blue-600 text-white shadow-md" : "text-slate-500"
                                    )}
                                >
                                    {lang.id.toUpperCase()}
                                </button>
                            ))}
                        </div>

                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)} 
                            className="p-2 text-white bg-white/5 hover:bg-white/10 rounded-full transition-all active:scale-90"
                        >
                            {isMenuOpen ? <X size={16} className="text-blue-500" /> : <Menu size={16} />}
                        </button>
                    </div>
                </div>

                {/* ВЫПАДАЮЩЕЕ МЕНЮ */}
                <div className={cn(
                    "lg:hidden absolute top-[115%] left-0 right-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]", 
                    isMenuOpen ? "max-h-[300px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"
                )}>
                    <nav className="bg-[#0b0e14]/95 backdrop-blur-3xl border border-white/[0.08] rounded-[1.5rem] p-2 flex flex-col gap-1 shadow-2xl mx-1">
                        {[
                            { href: "/", label: t("navigation.home") },
                            { href: "/about", label: t("navigation.about") },
                            { href: "/contacts", label: t("navigation.contacts") }
                        ].map((link) => (
                            <Link 
                                key={link.label} 
                                href={link.href} 
                                className={cn(
                                    "flex justify-between items-center text-[9px] font-black uppercase tracking-widest p-3 rounded-xl transition-all",
                                    pathname === link.href ? "bg-white/5 text-blue-500" : "text-slate-400 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                {link.label}
                                {pathname === link.href && <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_#2563eb]" />}
                            </Link>
                        ))}
                    </nav>
                </div>
            </header>
        </div>
    )
}