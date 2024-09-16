import React from 'react';
import { Inter, Silkscreen } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });
const silkscreen = Silkscreen({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
  title: 'CodeCoach',
  description: 'Your AI-powered coding assistant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col h-screen">
          <Navbar />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-auto p-4">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
