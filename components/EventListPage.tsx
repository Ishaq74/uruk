import React from 'react';
import { Event, Place } from '../types';
import { Card, CardContent } from './ui/Card';

interface EventListPageProps {
  events: Event[];
  navigateTo: (page: string, id?: string, mainCategory?: Place['mainCategory'], query?: string) => void;
}

const EventCard: React.FC<{ event: Event, navigateTo: (page: string, id: string) => void }> = ({ event, navigateTo }) => (
    <Card 
        onClick={() => navigateTo('event-detail', event.id)}
        className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
    >
        <img className="h-48 w-full object-cover" src={event.imageUrl} alt={event.title} />
        <CardContent className="p-6 flex flex-col flex-grow pt-6">
            <div>
                <p className="tracking-wide text-sm text-rose-600 font-bold">{event.date}</p>
                <h3 className="block mt-1 text-lg leading-tight font-bold text-black group-hover:text-sky-600 transition-colors">{event.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{event.location}</p>
            </div>
            <div className="mt-4 flex-grow flex items-end">
                <span className="text-sm font-semibold text-sky-600 group-hover:text-sky-800">
                    Voir les détails &rarr;
                </span>
            </div>
        </CardContent>
    </Card>
);

const EventListPage: React.FC<EventListPageProps> = ({ events, navigateTo }) => {
  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">Agenda des Événements</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Ne manquez rien de ce qu'il se passe à Annecy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {events.map(event => (
            <EventCard key={event.id} event={event} navigateTo={navigateTo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventListPage;
