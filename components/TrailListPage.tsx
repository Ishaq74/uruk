import React from 'react';
import { Trail, Place, TrailDifficulty } from '../types';
import { Card, CardContent } from './ui/Card';

interface TrailListPageProps {
  trails: Trail[];
  navigateTo: (page: string, id?: string, mainCategory?: Place['mainCategory'], query?: string) => void;
}

const getDifficultyClass = (difficulty: TrailDifficulty) => {
    switch(difficulty) {
        case TrailDifficulty.Easy: return 'bg-emerald-100 text-emerald-800';
        case TrailDifficulty.Medium: return 'bg-sky-100 text-sky-800';
        case TrailDifficulty.Hard: return 'bg-amber-100 text-amber-800';
        case TrailDifficulty.Expert: return 'bg-rose-100 text-rose-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const TrailCard: React.FC<{ trail: Trail, navigateTo: (page: string, id: string) => void }> = ({ trail, navigateTo }) => (
    <Card 
        onClick={() => navigateTo('trail-detail', trail.id)}
        className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
    >
        <div className="relative">
            <img className="h-48 w-full object-cover" src={trail.imageUrl} alt={trail.name} />
            <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded-full ${getDifficultyClass(trail.difficulty)}`}>
                {trail.difficulty}
            </div>
        </div>
        <CardContent className="p-6 flex flex-col flex-grow pt-6">
            <div>
                <h3 className="block text-lg leading-tight font-bold text-black group-hover:text-sky-600 transition-colors">{trail.name}</h3>
                <p className="mt-2 text-sm text-gray-600">{trail.excerpt}</p>
            </div>
             <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between text-sm text-gray-500">
                <span>{trail.distanceKm} km</span>
                <span>{Math.floor(trail.durationMin/60)}h{trail.durationMin%60}</span>
                <span>{trail.ascentM}m D+</span>
            </div>
        </CardContent>
    </Card>
);

const TrailListPage: React.FC<TrailListPageProps> = ({ trails, navigateTo }) => {
  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">Randonnées & Sentiers</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Explorez les montagnes et les paysages à couper le souffle autour du lac d'Annecy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {trails.map(trail => (
            <TrailCard key={trail.id} trail={trail} navigateTo={navigateTo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrailListPage;
