import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
