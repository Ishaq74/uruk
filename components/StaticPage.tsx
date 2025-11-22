import React from 'react';
import { STATIC_PAGES_CONTENT } from '../constants';

interface StaticPageProps {
  slug: string;
  navigateTo: (page: string) => void;
}

const StaticPage: React.FC<StaticPageProps> = ({ slug, navigateTo }) => {
  const pageContent = STATIC_PAGES_CONTENT.find(p => p.slug === slug);

  if (!pageContent) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Page non trouvée</h1>
        <button onClick={() => navigateTo('home')} className="mt-4 text-sky-600">Retour à l'accueil</button>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">{pageContent.title}</h1>
          <div
            className="mt-8 prose lg:prose-lg"
            dangerouslySetInnerHTML={{ __html: pageContent.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default StaticPage;
