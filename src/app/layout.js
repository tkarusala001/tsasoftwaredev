import "./globals.css";
import { Inter } from 'next/font/google'

export const metadata = {
  title: "Global Warming Information",
  description: "Critical information about global warming and its impact on the environment.",
  icons: {
    icon: [
      { url: '/logo.png' },
      new URL('/logo.png', 'https://example.com'),
      { url: '/logo.png', media: '(prefers-color-scheme: dark)' },
    ],
    shortcut: ['/logo.png'],
    apple: [
      { url: '/apple-icon.png' },
      { url: '/apple-icon-x3.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon-precomposed.png',
      },
    ],
  },
};

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
