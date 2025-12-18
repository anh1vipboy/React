import type { Metadata } from "next";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapClient from './home/components/BootstrapClient';

export const metadata: Metadata = {
  title: "Hỗ Trợ Pháp Lý Cho Doanh Nghiệp",
  description: "Cổng thông tin hỗ trợ pháp lý cho doanh nghiệp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <BootstrapClient />
        {children}
      </body>
    </html>
  );
}
