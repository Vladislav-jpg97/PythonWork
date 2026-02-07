import { routing } from "@/i18n/routing";
import { Footer } from "@/layouts/footer";
import { Header } from "@/layouts/header";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

interface LocaleLayoutProps {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
    const { locale } = await params;

    // Проверка корректности локали
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    // Настройка локали для серверных компонентов
    setRequestLocale(locale);

    // Загружаем сообщения для переводов (важно для t.raw в Sidebar)
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning className="scroll-smooth">
            <body className="bg-[#0b0e14] text-slate-200 antialiased overflow-x-hidden">
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <SidebarProvider defaultOpen={true}>
                        {/* Левая часть: Меню */}
                        <AppSidebar />

                        {/* Правая часть: Основной контент */}
                        <SidebarInset className="flex flex-col min-h-svh bg-[#0b0e14]">
                            {/* Хедер с кнопкой управления сайдбаром */}
                            <header className="flex h-16 shrink-0 items-center gap-4 px-4 sticky top-0 bg-[#0b0e14]/80 backdrop-blur-md z-30">
                                <SidebarTrigger className="-ml-1" />
                                <div className="flex-1">
                                    <Header />
                                </div>
                            </header>

                            {/* Зона контента */}
                            <main className="flex flex-1 flex-col">
                                <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
                                    {children}
                                </div>
                            </main>

                            <Footer />
                        </SidebarInset>
                    </SidebarProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}