// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0b0e14] flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-slate-400 mt-2 mb-6">Страница не найдена</p>
      <Link 
        href="/" 
        className="px-6 py-2 bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors"
      >
        На главную
      </Link>
    </div>
  );
}