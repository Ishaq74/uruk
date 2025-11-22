
import React from 'react';
import { Place, Profile } from '../types';
import StarRating from './StarRating';
import { Card, CardContent } from './ui/Card';
import Button from './ui/Button';

interface FavoritesPageProps {
  currentUser: Profile | null;
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

const FavoritesPage: React.FC<FavoritesPageProps> = ({ currentUser, places, navigateTo }) => {
  if (!currentUser) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-800">Accès non autorisé</h1>
        <p className="text-gray-600 mt-2">Vous devez être connecté pour voir vos favoris.</p>
        <Button onClick={() => navigateTo('home')} className="mt-4">
            Retour à l'accueil
        </Button>
      </div>
    );
  }

  const favoritePlaces = places.filter(place => currentUser.favoritePlaceIds?.includes(place.id));

  return (
    <div className="bg-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">Mes Favoris</h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-600">
            Retrouvez ici tous les lieux que vous avez aimés et sauvegardés.
          </p>
        </div>

        {favoritePlaces.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {favoritePlaces.map(item => (
              <PlaceCard key={item.id} item={item} navigateTo={navigateTo} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-800">Votre liste de favoris est vide</h2>
            <p className="mt-2 text-gray-500">Cliquez sur l'icône ❤️ sur la page d'un lieu pour l'ajouter ici.</p>
            <Button
              onClick={() => navigateTo('restaurants')}
              className="mt-6 bg-emerald-600 hover:bg-emerald-700"
            >
              Découvrir des lieux
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
