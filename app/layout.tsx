import { Metadata } from 'next';
import './index.css';

export const metadata: Metadata = {
  title: 'React App 2026',
  description:
    'My App is is an educational project for the React 2026 course at RS School.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-mist-700">
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
