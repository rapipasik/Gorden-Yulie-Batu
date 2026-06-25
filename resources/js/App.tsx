import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Beranda from './components/Beranda';
import TentangKami from './components/TentangKami';
import Katalog from './components/Katalog';
import Portofolio from './components/Portofolio';
import Testimoni from './components/Testimoni';
import HubungiKami from './components/HubungiKami';
import AdminDashboard from './components/AdminDashboard';
import { motion, AnimatePresence } from 'motion/react';

import { SiteImages } from './types';

const DEFAULT_SITE_IMAGES: SiteImages = {
  logo: '/assets/images/logo.png',
  berandaHeroBg: '/assets/images/curtains_hero_bg_1782007616516.jpg',
  berandaContentImg: '/assets/images/curtains_minimal_interior_1782007633904.jpg',
  berandaBeforeImg: 'https://picsum.photos/seed/barewindow/1200/900?blur=1',
  tentangKamiHeroBg: '/assets/images/curtains_hero_bg_1782007616516.jpg',
  tentangKamiContentImg: '/assets/images/curtains_minimal_interior_1782007633904.jpg',
  katalogHeroBg: '/assets/images/curtains_hero_bg_1782007616516.jpg',
  portofolioHeroBg: '/assets/images/curtains_hero_bg_1782007616516.jpg',
  testimoniHeroBg: '/assets/images/curtains_hero_bg_1782007616516.jpg',
  hubungiKamiHeroBg: '/assets/images/curtains_hero_bg_1782007616516.jpg'
};

export default function App() {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return window.location.pathname === '/admin' || window.location.hash === '#/admin' || window.location.pathname.startsWith('/admin');
  });

  const validTabs = ['beranda', 'tentang-kami', 'katalog', 'portofolio', 'testimoni', 'hubungi-kami'];

  const [activeTab, setActiveTab] = useState<string>(() => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    return validTabs.includes(hash) ? hash : 'beranda';
  });

  const [siteImages, setSiteImages] = useState<SiteImages>(() => {
    const stored = localStorage.getItem('yulie_site_images');
    if (stored) {
      try {
        return { ...DEFAULT_SITE_IMAGES, ...JSON.parse(stored) };
      } catch (e) {
        return DEFAULT_SITE_IMAGES;
      }
    }
    return DEFAULT_SITE_IMAGES;
  });

  // Fetch site images on mount
  useEffect(() => {
    fetch('/api/site-images')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch site images');
        return res.json();
      })
      .then((data) => {
        setSiteImages((prev) => {
          const updated = { ...prev, ...data };
          localStorage.setItem('yulie_site_images', JSON.stringify(updated));
          window.dispatchEvent(new Event('yulie_site_images_updated'));
          return updated;
        });
      })
      .catch((err) => console.error('Error fetching site images:', err));
  }, []);

  const handleUpdateImages = (updated: Partial<SiteImages>) => {
    setSiteImages((prev) => {
      const nextImages = { ...prev, ...updated };
      localStorage.setItem('yulie_site_images', JSON.stringify(nextImages));
      window.dispatchEvent(new Event('yulie_site_images_updated'));
      return nextImages;
    });
  };

  // Keep track of route changes or hash changes dynamically
  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdmin(window.location.pathname === '/admin' || window.location.hash === '#/admin' || window.location.pathname.startsWith('/admin'));
      
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Update hash when activeTab changes
  useEffect(() => {
    if (!isAdmin) {
      window.location.hash = activeTab;
    }
  }, [activeTab, isAdmin]);

  // Set browser page titles dynamically
  useEffect(() => {
    if (isAdmin) {
      document.title = 'Panel Admin | Gorden Yulie Batu';
      return;
    }

    let titleSuffix = 'Gorden Yulie Batu';
    let titlePrefix = '';

    switch (activeTab) {
      case 'beranda':
        titlePrefix = 'Beranda';
        break;
      case 'tentang-kami':
        titlePrefix = 'Tentang Kami';
        break;
      case 'katalog':
        titlePrefix = 'Katalog';
        break;
      case 'portofolio':
        titlePrefix = 'Portofolio';
        break;
      case 'testimoni':
        titlePrefix = 'Testimoni';
        break;
      case 'hubungi-kami':
        titlePrefix = 'Hubungi Kami';
        break;
    }

    document.title = titlePrefix ? `${titlePrefix} | ${titleSuffix}` : titleSuffix;
  }, [activeTab, isAdmin]);

  if (isAdmin) {
    return <AdminDashboard siteImages={siteImages} onUpdateImages={handleUpdateImages} />;
  }

  // Render active component based on selected state tab
  const renderContent = () => {
    switch (activeTab) {
      case 'beranda':
        return <Beranda setActiveTab={setActiveTab} siteImages={siteImages} />;
      case 'tentang-kami':
        return <TentangKami setActiveTab={setActiveTab} siteImages={siteImages} />;
      case 'katalog':
        return <Katalog setActiveTab={setActiveTab} siteImages={siteImages} />;
      case 'portofolio':
        return <Portofolio setActiveTab={setActiveTab} siteImages={siteImages} />;
      case 'testimoni':
        return <Testimoni setActiveTab={setActiveTab} siteImages={siteImages} />;
      case 'hubungi-kami':
        return <HubungiKami setActiveTab={setActiveTab} siteImages={siteImages} />;
      default:
        return <Beranda setActiveTab={setActiveTab} siteImages={siteImages} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans antialiased text-gray-800 bg-gray-50 selection:bg-gold-accent/20">
      
      {/* Universal Floating Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Body with Transition Animations */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Universal Dark Footer */}
      <Footer setActiveTab={setActiveTab} />
      
    </div>
  );
}
