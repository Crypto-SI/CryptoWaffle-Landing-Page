import ClientHero from '../components/ClientHero';
import ClientAbout from '../components/ClientAbout';
import ClientHosts from '../components/ClientHosts';
import ClientYouTubePlaylist from '../components/ClientYouTubePlaylist';
import ClientTelegram from '../components/ClientTelegram';
import ClientSocialMedia from '../components/ClientSocialMedia';
import ClientAdvertise from '../components/ClientAdvertise';
import Navigation from '../components/Navigation';
import ClientFooter from '../components/ClientFooter';
import { currentChannelSource } from '../data/youtubeSources';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-almost-black text-light-grey">
        <ClientHero />
        <ClientAbout />
        <ClientHosts />
        <ClientYouTubePlaylist
          source={currentChannelSource}
          supportingLink={{
            href: '/archive',
            label: 'Visit the Archive',
            description: 'Looking for episodes from earlier channels and playlists? The archive keeps the full back catalog available.'
          }}
        />
        <ClientTelegram />
        <ClientSocialMedia />
        <ClientAdvertise />
      </main>
      <ClientFooter />
    </>
  );
}
