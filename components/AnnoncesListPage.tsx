import React, { useState } from 'react';
import { Listing, Place, ListingType, Profile } from '../types';
import { LISTING_ICONS } from '../constants';
import Icon from './Icon';
import { Card, CardContent } from './ui/Card';
import Button from './ui/Button';

interface AnnoncesListPageProps {
  listings: Listing[];
  navigateTo: (page: string, id?: string) => void;
  currentUser: Profile | null;
  filter?: 'my-listings';
}

const AnnonceCard: React.FC<{ listing: Listing, navigateTo: (page: string, id: string) => void }> = ({ listing, navigateTo }) => {
    const iconInfo = LISTING_ICONS[listing.type as ListingType];
    return (
        <Card onClick={() => navigateTo('annonce-detail', listing.id)} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
            <CardContent className="p-4 flex items-center space-x-4">
                 {listing.imageUrl && <img src={listing.imageUrl} alt={listing.title} className="w-24 h-24 rounded-md object-cover flex-shrink-0" />}
                <div className="flex-grow">
                    <div className="flex items-center space-x-2">
                        <Icon name={iconInfo.name} className={`${iconInfo.className} w-4 h-4`} />
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{listing.type}</span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-800 mt-1">{listing.title}</h3>
                    <p className="font-semibold text-sky-600 text-md">{listing.price}</p>
                    <p className="text-xs text-gray-400 mt-2">{listing.date}</p>
                </div>
            </CardContent>
        </Card>
    );
};

const AnnoncesListPage: React.FC<AnnoncesListPageProps> = ({ listings: allListings, navigateTo, currentUser, filter }) => {
  const [activeFilter, setActiveFilter] = useState<ListingType | 'all'>('all');

  const listings = filter === 'my-listings' 
    ? allListings.filter(l => l.userId === currentUser?.id)
    : allListings;
  
  const filteredListings = activeFilter === 'all' 
    ? listings 
    : listings.filter(l => l.type === activeFilter);

  const pageTitle = filter === 'my-listings' ? "Mes Annonces" : "Petites Annonces";

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">{pageTitle}</h1>
            <p className="mt-4 max-w-2xl text-xl text-gray-600">
              Trouvez ce que vous cherchez ou déposez votre annonce.
            </p>
          </div>
          <Button onClick={() => navigateTo('propose-listing')} className="mt-4 sm:mt-0">Déposer une annonce</Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <Button variant={activeFilter === 'all' ? 'primary' : 'secondary'} onClick={() => setActiveFilter('all')}>Toutes</Button>
          {Object.values(ListingType).map(type => (
            <Button key={type} variant={activeFilter === type ? 'primary' : 'secondary'} onClick={() => setActiveFilter(type)}>{type}</Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredListings.map(listing => (
            <AnnonceCard key={listing.id} listing={listing} navigateTo={navigateTo} />
          ))}
        </div>
        {filteredListings.length === 0 && (
            <Card className="col-span-full text-center py-16">
                <p className="text-gray-500">Aucune annonce ne correspond à votre recherche.</p>
            </Card>
        )}
      </div>
    </div>
  );
};

export default AnnoncesListPage;
