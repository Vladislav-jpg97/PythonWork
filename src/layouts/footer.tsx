"use client"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

export const Footer = () => {
    return (
        <footer className="relative px-6 pb-12 pt-16 overflow-hidden bg-[#0b0e14]">
            {/* Декоративное свечение */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/[0.02] blur-[120px] pointer-events-none" />

            <div className={cn(
                "max-w-7xl mx-auto relative z-10",
                "bg-[#11141b]/40 backdrop-blur-xl",
                "border border-white/[0.05] shadow-2xl",
                "rounded-[3.5rem] p-10 lg:p-16" // В стиле основных карточек курса
            )}>
                <div className="flex flex-col gap-16">
                    
                    {/* ВЕРХНЯЯ ЧАСТЬ */}
                    <div className="flex flex-col lg:row justify-between items-center lg:items-start gap-12 lg:flex-row">
                        
                        {/* Блок бренда */}
                        <div className="space-y-6 text-center lg:text-left">
                            <Link href="/" className="text-2xl font-black tracking-[0.4em] text-white uppercase group inline-block">
                                PYTHON<span className="text-blue-500 group-hover:text-blue-400 transition-colors">WORK</span>
                            </Link>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] max-w-[280px] leading-relaxed">
                                Образовательная платформа для будущих разработчиков
                            </p>
                        </div>

                        {/* Навигация / Контакты */}
                        <div className="flex flex-col sm:flex-row items-center gap-8 lg:gap-16">
                            <div className="flex flex-col items-center lg:items-end gap-3">
                                <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Связаться</span>
                                <a 
                                    href="mailto:vladoc@mail.ru" 
                                    className="text-lg font-semibold text-slate-300 hover:text-blue-400 transition-colors tracking-tight"
                                >
                                    vladoc@mail.ru
                                </a>
                            </div>

                            <div className="h-10 w-px bg-white/5 hidden sm:block" />

                            <div className="flex gap-10">
                                {[
                                    { label: "Telegram", href: "#" },
                                    { label: "GitHub", href: "#" }
                                ].map((social) => (
                                    <div key={social.label} className="group cursor-pointer">
                                        <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] group-hover:text-white transition-all">
                                            {social.label}
                                        </span>
                                        <div className="h-px w-0 group-hover:w-full bg-blue-500 transition-all duration-500 mt-1" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* НИЖНЯЯ ЧАСТЬ (КОПИРАЙТ) */}
                    <div className="pt-10 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] flex items-center gap-4">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-20"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500/50 shadow-[0_0_10px_#3b82f6]" />
                            </span>
                            Тё Владислав Олегович — 2026
                        </div>

                        <div className="flex items-center gap-6">
                             <div className="text-[9px] font-bold text-slate-700 uppercase tracking-widest">
                                Built with Next.js & Tailwind
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}