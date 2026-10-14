import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import Home from './pages/Home';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { RootLayout } from './components/layout/RootLayout';
import { FavoritesProvider } from './context/FavoritesContext';
import { PropertiesProvider } from './context/PropertiesContext';
import { WhatsAppProvider } from './context/WhatsAppContext';

const Properties = lazy(() => import('./pages/Properties'));
const PropertyDetail = lazy(() => import('./pages/PropertyDetail'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const ListYourProperty = lazy(() => import('./pages/ListYourProperty'));
const Saved = lazy(() => import('./pages/Saved'));
const DemoAdmin = lazy(() => import('./pages/DemoAdmin'));
const StyleGuide = import.meta.env.DEV
  ? lazy(() => import('./pages/StyleGuide'))
  : null;
const NotFound = lazy(() => import('./pages/NotFound'));

function PageFallback() {
  return (
    <div
      style={{
        padding: 'clamp(3rem, 8vw, 6rem) 1rem',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-small)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}
    >
      Indexing register...
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <PropertiesProvider>
        <FavoritesProvider>
          <WhatsAppProvider>
            <HashRouter>
              <ScrollToTop />
              <Suspense fallback={<PageFallback />}>
                <Routes>
                  <Route element={<RootLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/properties" element={<Properties />} />
                    <Route path="/properties/:slug" element={<PropertyDetail />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/list-your-property" element={<ListYourProperty />} />
                    <Route path="/saved" element={<Saved />} />
                    <Route path="/demo-admin" element={<DemoAdmin />} />
                    {import.meta.env.DEV && StyleGuide && (
                      <Route path="/styleguide" element={<StyleGuide />} />
                    )}
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </Suspense>
            </HashRouter>
          </WhatsAppProvider>
        </FavoritesProvider>
      </PropertiesProvider>
    </MotionConfig>
  );
}
