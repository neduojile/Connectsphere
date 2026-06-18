import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ConnectSphere",
  description: "Connect. Collaborate. Grow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
  lang="en"
  className="dark"
>
      <body className={geist.className}>
        <Toaster
  position="top-right"
  toastOptions={{
    style: {
      background: "#111111",
      color: "#ffffff",
      border: "1px solid #27272a",
      borderRadius: "16px",
      padding: "16px",
    },

    success: {
      iconTheme: {
        primary: "#f97316",
        secondary: "#ffffff",
      },
    },

    error: {
      iconTheme: {
        primary: "#ef4444",
        secondary: "#ffffff",
      },
    },
  }}
/>
        {children}
      </body>
    </html>
  );
}
