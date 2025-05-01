/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from 'next';
import './globals.css';
import './animations.css';

export const metadata: Metadata = {
  title: 'Leonardo Cech | Portfólio',
  description: 'Portfólio de Leonardo Cech',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt'>
      <head>
        <title>Leonardo Cech | Portfólio</title>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link href='https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap' rel='stylesheet' />
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0" />
      </head>
      <body className='antialiased'>
        {children}
      </body>
    </html>
  );
}
