import React from 'react';
import { Article, Place } from '../types';
import { useTranslation } from './i18n/LanguageContext';
import { Card, CardContent } from './ui/Card';
import Button from './ui/Button';

interface MagazineSectionProps {
  articles: Article[];
  navigateTo: (page: string, id?: string, mainCategory?: Place['mainCategory'], query?: string) => void;
}

const ArticleCard: React.FC<{ article: Article, navigateTo: (page: string, id: string) => void }> = ({ article, navigateTo }) => (
  <Card 
    onClick={(e) => { e.preventDefault(); navigateTo('article-detail', article.id); }} 
    className="group block overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
  >
    <img src={article.imageUrl} alt={article.title} className="w-full h-56 object-cover" />
    <CardContent className="p-6">
      <h3 className="text-xl font-bold text-gray-900 group-hover:text-sky-600 transition-colors">{article.title}</h3>
      <p className="mt-2 text-gray-600 text-sm leading-relaxed">{article.excerpt}</p>
      <span className="mt-4 inline-block text-sm font-semibold text-sky-600 group-hover:text-sky-800 transition-colors">
        Lire la suite &rarr;
      </span>
    </CardContent>
  </Card>
);

const MagazineSection: React.FC<MagazineSectionProps> = ({ articles, navigateTo }) => {
  const { t } = useTranslation();
  return (
    <section>
       <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('magazine.title')}</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            {t('magazine.subtitle')}
        </p>
      </div>
      <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} navigateTo={navigateTo} />
        ))}
      </div>
       <div className="mt-12 text-center">
         <Button onClick={(e) => { e.preventDefault(); navigateTo('articles'); }} size="lg" className="bg-emerald-600 hover:bg-emerald-700">
            {t('magazine.read_all')}
        </Button>
      </div>
    </section>
  );
};

export default MagazineSection;
