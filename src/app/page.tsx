import ClientHero from '../components/ClientHero';
import ClientAbout from '../components/ClientAbout';
import ClientHosts from '../components/ClientHosts';
import ClientYouTubePlaylist from '../components/ClientYouTubePlaylist';
import ClientTelegram from '../components/ClientTelegram';
import ClientAdvertise from '../components/ClientAdvertise';
import Navigation from '../components/Navigation';
import ClientFooter from '../components/ClientFooter';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-almost-black text-light-grey">
        <ClientHero />
        <ClientAbout />
        <ClientHosts />
        <ClientYouTubePlaylist />
        <ClientTelegram />
        <ClientAdvertise />
      </main>
      <ClientFooter />
    </>
  );
}
