import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
    const requestedLocale = await requestLocale;

    // 1. Проверяем, входит ли полученная локаль в список разрешенных
    const locale = routing.locales.includes(requestedLocale as any) 
        ? (requestedLocale as "ru" | "uz" | "en") // Принудительно приводим к типу
        : routing.defaultLocale;

    // 2. Загружаем файлы сообщений
    const common = (await import(`../../messages/${locale}/common.json`)).default;
    const topics = (await import(`../../messages/${locale}/topics.json`)).default;

    return {
        locale,
        messages: {
            ...common,
            ...topics 
        }
    };
});