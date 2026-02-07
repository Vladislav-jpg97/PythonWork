"use client"

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';

// Импорт стилей Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// 1. Описываем интерфейс данных
interface Slide {
    id: number;
    img: string;
    title: string;
    text: string;
}

interface TopicSliderProps {
    slides: Slide[]; // Принимаем слайды извне
}

export function TopicSlider({ slides }: TopicSliderProps) {
    const [mounted, setMounted] = useState(false);
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

    // Исправление гидратации и обработка Escape
    useEffect(() => {
        setMounted(true);
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedImg(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Если данных еще нет или они пустые
    if (!mounted || !slides || slides.length === 0) {
        return (
            <div className="w-full h-[650px] rounded-[2.5rem] bg-[#0b0e14] border border-white/5 animate-pulse flex items-center justify-center">
                <span className="text-slate-700 font-mono text-sm uppercase tracking-widest">
                    {!mounted ? "Loading Preview..." : "No slides available"}
                </span>
            </div>
        );
    }

    return (
        <div className="w-full group relative">

            {/* --- МОДАЛЬНОЕ ОКНО (70% РАЗМЕРА) --- */}
            {selectedImg && (
                <div
                    className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in duration-300"
                    onClick={() => setSelectedImg(null)}
                >
                    <div
                        className="relative w-[70vw] h-[70vh] flex items-center justify-center bg-[#0d1117] rounded-[2rem] border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.9)] overflow-hidden animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImg}
                            className="w-full h-full object-contain p-8 md:p-12"
                            alt="Code Detail View"
                        />

                        {/* Кнопка закрытия */}
                        <button
                            className="absolute top-6 right-6 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white w-12 h-12 rounded-2xl transition-all flex items-center justify-center border border-white/10 group/btn"
                            onClick={() => setSelectedImg(null)}
                        >
                            <span className="text-3xl font-light leading-none transform translate-y-[-2px] group-hover:scale-110 transition-transform">
                                &times;
                            </span>
                        </button>
                    </div>
                </div>
            )}

            {/* --- ОСНОВНОЙ КОНТЕЙНЕР --- */}
            <div className="w-full h-[650px] rounded-b-[2.5rem] overflow-hidden border border-white/10 bg-[#06080a] relative shadow-2xl">
                <Swiper
                    modules={[Navigation, Pagination, EffectFade]}
                    effect="fade"
                    slidesPerView={1}
                    navigation={true}
                    pagination={{ clickable: true }}
                    loop={slides.length > 1} // Цикл только если больше 1 слайда
                    className="h-full w-full"
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="relative h-full w-full flex flex-col bg-[#080a0f]">

                                {/* ЗОНА КАРТИНКИ (МАКСИМАЛЬНО КРУПНО) */}
                                <div
                                    className="flex-1 relative flex items-center justify-center p-6 md:p-10 cursor-zoom-in group/slide overflow-hidden"
                                    onClick={() => setSelectedImg(slide.img)}
                                >
                                    {/* Декоративное свечение */}
                                    <div className="absolute w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />

                                    <img
                                        src={slide.img}
                                        alt={slide.title}
                                        className="relative z-10 max-w-full max-h-full object-contain rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] transition-all duration-700 group-hover/slide:scale-[1.02]"
                                    />

                                    {/* ПЛАВАЮЩЕЕ ОПИСАНИЕ */}
                                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 translate-y-6 opacity-0 group-hover/slide:translate-y-0 group-hover/slide:opacity-100 transition-all duration-500 z-20 pointer-events-none">
                                        <div className="bg-[#11141b]/95 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-2xl shadow-2xl min-w-[320px]">
                                            <h3 className="text-white font-bold text-base tracking-tight text-center">{slide.title}</h3>
                                            <p className="text-blue-400 text-xs text-center mt-1 font-mono opacity-80">{slide.text}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <style jsx global>{`
                  /* Твои стили без изменений */
                  .swiper-pagination { bottom: 25px !important; }
                  .swiper-pagination-bullet {
                    background: white !important;
                    opacity: 0.15;
                    width: 12px;
                    height: 4px;
                    border-radius: 2px;
                    transition: all 0.4s ease;
                  }
                  .swiper-pagination-bullet-active {
                    opacity: 1;
                    width: 45px;
                    background: #3b82f6 !important;
                  }
                  .swiper-button-next, .swiper-button-prev {
                    color: white !important;
                    background: rgba(15, 17, 23, 0.4);
                    width: 54px !important;
                    height: 54px !important;
                    border-radius: 18px;
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255,255,255,0.08);
                    opacity: 0;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                  }
                  .group:hover .swiper-button-next, 
                  .group:hover .swiper-button-prev { opacity: 1; }
                  .swiper-button-next:hover, .swiper-button-prev:hover {
                    background: #3b82f6;
                    border-color: #60a5fa;
                    transform: scale(1.1);
                  }
                  .swiper-button-next:after, .swiper-button-prev:after {
                    font-size: 18px !important;
                    font-weight: 900;
                  }
                `}</style>
            </div>
        </div>
    );
}