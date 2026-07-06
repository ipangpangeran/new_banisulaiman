import type { Metadata, Viewport } from 'next';
import { LanguageProvider } from '@/components/LanguageContext';
import { ThemeProvider } from '@/components/ThemeContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsappFloat } from '@/components/WhatsappFloat';
import { AnnouncementPopup } from '@/components/AnnouncementPopup';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "Ma'had Tahfidz Bani Sulaiman - Bandung",
  description: "Pondok Pesantren Tahfidz Al-Quran dan Pembelajaran Bahasa Arab di Dago, Bandung Utara. Mendidik generasi Qur'ani yang menguasai Bahasa Arab.",
  keywords: ["tahfidz", "pesantren", "bandung", "bahasa arab", "huffazh", "bani sulaiman"],
  authors: [{ name: "Ma'had Bani Sulaiman" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <LanguageProvider>
          <ThemeProvider>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Header />
              <main style={{ flexGrow: 1 }}>
                {children}
              </main>
              <Footer />
              <WhatsappFloat />
              <AnnouncementPopup />
            </div>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
