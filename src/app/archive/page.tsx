import Navigation from '../../components/Navigation';
import ClientFooter from '../../components/ClientFooter';
import ClientYouTubePlaylist from '../../components/ClientYouTubePlaylist';
import { currentChannelSource, legacyArchiveSources } from '../../data/youtubeSources';

export default function ArchivePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-almost-black text-light-grey">
        <section className="px-4 pb-8 pt-28 md:px-8">
          <div className="container mx-auto max-w-6xl text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-teal">Archive</p>
            <h1 className="mb-6 text-4xl font-bold text-yellow md:text-5xl">Crypto Waffle Episode Library</h1>
            <p className="mx-auto max-w-3xl text-lg text-light-grey md:text-xl">
              The newest videos live on CryptoWaffleTV. Older episodes from previous playlists stay here, organized so
              the back catalog remains easy to browse.
            </p>
          </div>
        </section>

        <ClientYouTubePlaylist
          source={currentChannelSource}
          heading="CryptoWaffleTV"
          description="Browse the new home for Crypto Waffle episodes on YouTube."
          sectionId="current-channel"
        />

        {legacyArchiveSources.map((source, index) => (
          <ClientYouTubePlaylist
            key={`${source.title}-${index}`}
            source={source}
            heading={source.title}
            description={source.description}
            sectionId={`archive-${index + 1}`}
          />
        ))}
      </main>
      <ClientFooter />
    </>
  );
}
