import type { locales } from "@/configs/i18n.config";
// 1. Импортируем оба новых файла
import common from "./../../messages/ru/common.json";
import topics from "./../../messages/ru/topics.json";

// 2. Создаем объединенный тип, который содержит ключи из обоих файлов
type AllMessages = typeof common & typeof topics;

declare module "next-intl" {
    interface AppConfig {
        Locale: (typeof locales)[number];
        // 3. Указываем обновленный тип здесь
        Messages: AllMessages;
    }
}