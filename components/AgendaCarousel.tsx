
import React from 'react';
import { Event, Place } from '../types';
import { useTranslation } from './i18n/LanguageContext';
import { Card, CardContent } from './ui/Card';
import Button from './ui/Button';

interface AgendaCarouselProps {
    events: Event[];
    navigateTo: (page: string, id?: string, mainCategory?: Place['mainCategory'], query?: string) => void;
}

const EventCard: React.FC<{ event: Event, navigateTo: AgendaCarouselProps['navigateTo'] }> = ({ event, navigateTo }) => (
  <div className="flex-shrink-0 w-64 snap-start">
    <Card 
        onClick={(e) => { e.preventDefault(); navigateTo('event-detail', event.id); }} 
        className="group block overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      <img src={event.imageUrl} alt={event.title} className="w-full h-40 object-cover" />
      <CardContent className="p-4 pt-4">
        <p className="text-sm font-bold text-rose-600">{event.date}</p>
        <h4 className="mt-1 font-semibold text-gray-800 group-hover:text-sky-600 transition-colors">{event.title}</h4>
        <p className="text-xs text-gray-500 mt-1">{event.location}</p>
      </CardContent>
    </Card>
  </div>
);

const AgendaCarousel: React.FC<AgendaCarouselProps> = ({ events, navigateTo }) => {
  const { t } = useTranslation();
  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('agenda.title')}</h2>
            <p className="mt-4 text-lg text-gray-600">{t('agenda.subtitle')}</p>
        </div>
        <Button onClick={(e) => { e.preventDefault(); navigateTo('events'); }} className="whitespace-nowrap">
            {t('agenda.see_all')}
        </Button>
      </div>
      <div className="flex space-x-6 overflow-x-auto pb-4 custom-scroll-bar snap-x snap-mandatory">
        {events.slice(0, 5).map((event) => (
          <EventCard key={event.id} event={event} navigateTo={navigateTo} />
        ))}
        {/* Add an empty div for better snapping at the end */}
        <div className="flex-shrink-0 w-1 snap-end"></div>
      </div>
    </section>
  );
};

export default AgendaCarousel;
