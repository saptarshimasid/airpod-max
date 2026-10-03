import type { Metadata, Viewport } from 'next';
import { DM_Sans, Manrope } from 'next/font/google';
import './globals.css';
import { LenisProvider } from '@/components/LenisProvider';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#edf0ef',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'AirPods Max — Sound in Form',
  description:
    'An independent design study of Apple AirPods Max. Explore immersive sound, thoughtful craftsmanship, and a different kind of listening.',
  keywords: ['AirPods Max', 'Apple', 'Spatial Audio', 'Active Noise Cancellation', 'Design Study', 'Sound in Form'],
  authors: [{ name: 'Sound in Form' }],
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='9' fill='%2318201d'/%3E%3Cpath d='M8 19v-5a8 8 0 0116 0v5M8 17v7m16-7v7' fill='none' stroke='%23c5ebbe' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning className={`${dmSans.variable} ${manrope.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{document.documentElement.dataset.theme=localStorage.getItem('am-theme')||'light'}catch(e){}`,
          }}
        />
      </head>
      <body className="antialiased selection:bg-[#bbdfb5] selection:text-[#15201b]">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
