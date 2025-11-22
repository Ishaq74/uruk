import React from 'react';
import { Place, Event, Trail, Listing, Article } from '../types';
import Hero from './Hero';
import FeaturedContent from './FeaturedContent';
import AgendaCarousel from './AgendaCarousel';
import CategoryGrid from './CategoryGrid';
import LatestListings from './LatestListings';
import MagazineSection from './MagazineSection';

interface HomePageProps {
  places: Place[];
  events: Event[];
  trails: Trail[];
  listings: Listing[];
  articles: Article[];
  navigateTo: (page: string, id?: string, mainCategory?: Place['mainCategory'], query?: string) => void;
  onSearch: (query: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ places, events, trails, listings, articles, navigateTo, onSearch }) => {
  return (
    <main>
      <Hero onSearch={onSearch} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        <FeaturedContent places={places} events={events} trails={trails} navigateTo={navigateTo} />
        <AgendaCarousel events={events} navigateTo={navigateTo} />
        <CategoryGrid navigateTo={navigateTo} />
        <LatestListings listings={listings} navigateTo={navigateTo} />
        <MagazineSection articles={articles} navigateTo={navigateTo} />
      </div>
    </main>
  );
};

export default HomePage;
