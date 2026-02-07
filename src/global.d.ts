import ruCommon from './messages/ru/common.json';
import ruTopics from './messages/ru/topics.json';

// Объединяем структуру обоих файлов
type Messages = typeof ruCommon & typeof ruTopics;

declare global {
  // Это даст подсказки для t("PythonThemes.content...")
  interface IntlMessages extends Messages {}
}