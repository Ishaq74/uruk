import React from 'react';
import { Place } from '../types';
import StarRating from './StarRating';
import { Card, CardContent } from './ui/Card';

interface PlaceListPageProps {
  mainCategory: Place['mainCategory'];
  places: Place[];
  navigateTo: (page: string, id?: string, mainCategory?: Place['mainCategory'], query?: string) => void;
}

const PlaceCard: React.FC<{ item: Place; navigateTo: (page: string, id: string) => void }> = ({ item, navigateTo }) => (
    <Card 
        onClick={() => navigateTo('place-detail', item.id)}
        className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
    >
        <img className="h-48 w-full object-cover" src={item.imageUrl} alt={item.name} />
        <CardContent className="p-6 flex flex-col flex-grow pt-6">
            <div>
                <div className="tracking-wide text-sm text-sky-600 font-bold">{item.category} &middot; {item.priceRange}</div>
                <h3 className="block mt-1 text-lg leading-tight font-bold text-black group-hover:underline">{item.name}</h3>
            </div>
            <div className="mt-4 flex items-center flex-grow items-end">
                <StarRating rating={item.rating} />
                <span className="text-gray-600 ml-2 text-sm">({item.reviewCount} avis)</span>
            </div>
        </CardContent>
    </Card>
);

const categoryTitles = {
    restauration: { title: "Restaurants", subtitle: "Savourez le meilleur de la gastronomie locale et d'ailleurs." },
    hebergement: { title: "Hébergements", subtitle: "Trouvez le lieu parfait pour votre séjour à Annecy." },
    activites: { title: "Activités", subtitle: "Aventures, culture et détente vous attendent." },
    commerces: { title: "Commerces & Services", subtitle: "Découvrez les boutiques et artisans qui font le charme de la ville." },
};

const PlaceListPage: React.FC<PlaceListPageProps> = ({ mainCategory, places, navigateTo }) => {
  const filteredPlaces = places.filter(place => place.mainCategory === mainCategory);
  const { title, subtitle } = categoryTitles[mainCategory];

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredPlaces.map(item => (
            <PlaceCard key={item.id} item={item} navigateTo={navigateTo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaceListPage;
