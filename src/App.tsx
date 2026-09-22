import { ContactFooter, Footer } from "./components/ContactFooter";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Pricing } from "./components/Pricing";
import { Projects } from "./components/Projects";
import { Services } from "./components/Services";
import { Testimonials } from "./components/Testimonials";
import { useAppPage } from "./hooks/useAppPage";
import type { AppPage } from "./lib/navigation";
import { AccessibilityPage } from "./pages/AccessibilityPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PrivacyPage } from "./pages/PrivacyPage";

type AppProps = {
  /** Set by the prerender build so each route ships real HTML. */
  page?: AppPage;
};

export default function App({ page: initialPage }: AppProps = {}) {
  const page = useAppPage(initialPage);

  return (
    <>
      <a className="skip-link" href="#main">דלגו לתוכן הראשי</a>
      <Header solid={page !== "home"} />
      <main id="main">
        {page === "home" && (
          <>
            <Hero />
            <Services />
            <Projects />
            <Pricing />
            <Testimonials />
            <ContactFooter />
          </>
        )}
        {page === "privacy" && (
          <>
            <PrivacyPage />
            <Footer />
          </>
        )}
        {page === "accessibility" && (
          <>
            <AccessibilityPage />
            <Footer />
          </>
        )}
        {page === "notFound" && (
          <>
            <NotFoundPage />
            <Footer />
          </>
        )}
      </main>
    </>
  );
}
