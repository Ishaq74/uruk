import React from 'react';
import { Place, Event, Trail, Listing, Article } from '../types';
import { Card, CardContent } from './ui/Card';

interface SearchPageProps {
  query: string;
  allData: {
    places: Place[];
    events: Event[];
    trails: Trail[];
    listings: Listing[];
    articles: Article[];
  };
  navigateTo: (page: string, id?: string) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ query, allData, navigateTo }) => {
  const lowerCaseQuery = query.toLowerCase();

  const results = {
    places: allData.places.filter(p => p.name.toLowerCase().includes(lowerCaseQuery) || p.description.toLowerCase().includes(lowerCaseQuery)),
    events: allData.events.filter(e => e.title.toLowerCase().includes(lowerCaseQuery) || e.description.toLowerCase().includes(lowerCaseQuery)),
    trails: allData.trails.filter(t => t.name.toLowerCase().includes(lowerCaseQuery) || t.description.toLowerCase().includes(lowerCaseQuery)),
    listings: allData.listings.filter(l => l.title.toLowerCase().includes(lowerCaseQuery) || l.description.toLowerCase().includes(lowerCaseQuery)),
    articles: allData.articles.filter(a => a.title.toLowerCase().includes(lowerCaseQuery) || a.content.toLowerCase().includes(lowerCaseQuery)),
  };

  const totalResults = Object.values(results).reduce((sum, r) => sum + r.length, 0);

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold">Résultats pour "{query}"</h1>
        <p className="text-gray-500 mt-1">{totalResults} résultat(s) trouvé(s)</p>

        <div className="mt-8 space-y-8">
          {results.places.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Lieux</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {results.places.map(item => (
                  <Card key={item.id} onClick={() => navigateTo('place-detail', item.id)} className="cursor-pointer hover:shadow-lg">
                    <CardContent className="p-4">{item.name}</CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
          
          {results.events.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Événements</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {results.events.map(item => (
                  <Card key={item.id} onClick={() => navigateTo('event-detail', item.id)} className="cursor-pointer hover:shadow-lg">
                    <CardContent className="p-4">{item.title}</CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {results.trails.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Sentiers</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {results.trails.map(item => (
                  <Card key={item.id} onClick={() => navigateTo('trail-detail', item.id)} className="cursor-pointer hover:shadow-lg">
                    <CardContent className="p-4">{item.name}</CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {results.listings.length > 0 && (
             <section>
              <h2 className="text-2xl font-bold mb-4">Annonces</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {results.listings.map(item => (
                  <Card key={item.id} onClick={() => navigateTo('annonce-detail', item.id)} className="cursor-pointer hover:shadow-lg">
                    <CardContent className="p-4">{item.title}</CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
          
           {results.articles.length > 0 && (
             <section>
              <h2 className="text-2xl font-bold mb-4">Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {results.articles.map(item => (
                  <Card key={item.id} onClick={() => navigateTo('article-detail', item.id)} className="cursor-pointer hover:shadow-lg">
                    <CardContent className="p-4">{item.title}</CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {totalResults === 0 && (
              <div className="text-center py-12">
                  <p className="text-xl text-gray-600">Aucun résultat trouvé. Essayez d'autres mots-clés.</p>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;