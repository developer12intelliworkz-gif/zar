import type { Metadata } from "next";
import "@/styles/index.css";
import 'swiper/css';
import ReduxProvider from "@/store/ReduxProvider";
import Header from "@/components/ui/organisms/Header/Header";
import Footer from "@/components/ui/organisms/Footer/Footer";
import PageTransitionProvider from "@/components/ui/organisms/PageTransitionProvider/PageTransitionProvider";
import FirstVisitLoader from "@/components/ui/organisms/FirstVisitLoader/FirstVisitLoader";
import CartDrawer from "@/components/ui/organisms/CartDrawer/CartDrawer";
import { ToastProvider } from "@/components/ui/Toast/ToastContext";

export const metadata: Metadata = {
  title: "Zar Jewels — India's Trusted Gold Bangle Manufacturer",
  description:
    "Crafting lightweight, elegant gold bangles through innovation, precision, and timeless craftsmanship. 60+ years of excellence.",
  openGraph: {
    images: ['https://zar-one.vercel.app/images/zar-logo.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ReduxProvider>
          <ToastProvider>
            <CartDrawer />
            {/* <FirstVisitLoader /> */}
            <Header />
            <main className="main">
              {/* <PageTransitionProvider> */}
                {children}
                {/* </PageTransitionProvider> */}
            </main>
            <Footer />
          </ToastProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}