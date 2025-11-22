import React, { useState } from 'react';
import Icon from './Icon';
import { useTranslation } from './i18n/LanguageContext';
import Input from './ui/Input';
import Button from './ui/Button';

interface HeroProps {
    onSearch: (query: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="relative h-[60vh] min-h-[400px] max-h-[600px] flex items-center justify-center text-white">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <img
        src="https://picsum.photos/seed/lake/1920/1080"
        alt="Vue sur le lac d'Annecy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-md">
          {t('hero.title')}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-200 drop-shadow-sm">
          {t('hero.subtitle')}
        </p>
        <div className="mt-8 max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('hero.search_placeholder')}
              className="w-full h-14 pl-12 pr-4 rounded-full shadow-lg"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Icon name="search" className="w-6 h-6 text-gray-400" />
            </div>
          </form>
          <div className="mt-4 flex flex-wrap justify-center items-center gap-x-2 gap-y-2 text-sm">
            <span className="font-semibold mr-2">{t('hero.suggestions')}</span>
            <Button onClick={() => onSearch('Restaurants')} className="bg-white/20 hover:bg-white/30 text-white" size="sm">{t('hero.suggestion1')}</Button>
            <Button onClick={() => onSearch('Randonnée facile')} className="bg-white/20 hover:bg-white/30 text-white" size="sm">{t('hero.suggestion2')}</Button>
            <Button onClick={() => onSearch('Événements ce week-end')} className="bg-white/20 hover:bg-white/30 text-white" size="sm">{t('hero.suggestion3')}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
