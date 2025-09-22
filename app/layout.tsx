import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { CartProvider } from '@/contexts/CartContext';
import { UserProvider } from '@/contexts/UserContext';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk'
});

export const metadata: Metadata = {
  title: 'Mentify AI - Your Personal AI Buddies',
  description: 'Get personalized AI assistance for problem-solving, education, health, relationships, finance, and social media success.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider>
          <CartProvider>
            <UserProvider>
              {children}
              <Toaster />
            </UserProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}