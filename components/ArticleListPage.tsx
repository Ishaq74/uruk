import React from 'react';
import { Article, Profile, Place } from '../types';
import { Card, CardContent } from './ui/Card';

interface ArticleListPageProps {
  articles: Article[];
  profiles: Profile[];
  navigateTo: (page: string, id?: string, mainCategory?: Place['mainCategory'], query?: string) => void;
}

const ArticleCard: React.FC<{ article: Article, author?: Profile, navigateTo: (page: string, id: string) => void }> = ({ article, author, navigateTo }) => (
  <Card 
    onClick={() => navigateTo('article-detail', article.id)}
    className="group block overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
  >
    <img src={article.imageUrl} alt={article.title} className="w-full h-56 object-cover" />
    <CardContent className="p-6">
      <h3 className="text-xl font-bold text-gray-900 group-hover:text-sky-600 transition-colors">{article.title}</h3>
      <p className="mt-2 text-gray-600 text-sm leading-relaxed">{article.excerpt}</p>
      {author && (
          <div className="mt-4 flex items-center space-x-2 text-xs text-gray-500">
              <img src={author.avatarUrl} alt={author.fullName} className="w-6 h-6 rounded-full" />
              <span>Par <b>{author.fullName}</b> le {article.publishedAt}</span>
          </div>
      )}
    </CardContent>
  </Card>
);


const ArticleListPage: React.FC<ArticleListPageProps> = ({ articles, profiles, navigateTo }) => {
  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">Le Magazine</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Nos articles, guides et inspirations pour profiter pleinement d'Annecy et sa région.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => {
            const author = profiles.find(p => p.id === article.authorId);
            return <ArticleCard key={article.id} article={article} author={author} navigateTo={navigateTo} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ArticleListPage;
