import React from 'react';
import { ForumThread, Profile, Place } from '../types';
import { FORUM_CATEGORIES } from '../constants';
import Button from './ui/Button';
import { Card } from './ui/Card';

interface ForumCategoryPageProps {
  categoryId: string;
  threads: ForumThread[];
  profiles: Profile[];
  navigateTo: (page: string, id?: string) => void;
}

const ThreadRow: React.FC<{ thread: ForumThread, author?: Profile, navigateTo: (page: string, id: string) => void }> = ({ thread, author, navigateTo }) => (
    <div onClick={() => navigateTo('forum-thread', thread.id)} className="flex items-center justify-between p-4 hover:bg-slate-50 cursor-pointer">
        <div className="flex items-center space-x-4">
            <img src={author?.avatarUrl} alt={author?.fullName} className="w-10 h-10 rounded-full" />
            <div>
                <h4 className="font-bold text-gray-800">{thread.title}</h4>
                <p className="text-sm text-gray-500">par {author?.fullName} &middot; {thread.createdAt}</p>
            </div>
        </div>
        <div className="text-right text-sm">
            <p className="font-semibold">{thread.posts.length}</p>
            <p className="text-gray-500">réponses</p>
        </div>
    </div>
);

const ForumCategoryPage: React.FC<ForumCategoryPageProps> = ({ categoryId, threads, profiles, navigateTo }) => {
  const category = FORUM_CATEGORIES.find(c => c.id === categoryId);
  const categoryThreads = threads.filter(t => t.categoryId === categoryId);

  if (!category) {
    return <div className="text-center py-20">Catégorie non trouvée.</div>;
  }

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
          <div>
            <Button variant="link" onClick={() => navigateTo('forums')} className="p-0 h-auto -ml-2 mb-2">&larr; Tous les forums</Button>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">{category.title}</h1>
            <p className="mt-4 max-w-2xl text-xl text-gray-600">{category.description}</p>
          </div>
          <Button onClick={() => navigateTo('new-thread', categoryId)} size="lg" className="mt-4 sm:mt-0">Créer un sujet</Button>
        </div>

        <Card>
            <div className="divide-y divide-gray-200">
                {categoryThreads.length > 0 ? categoryThreads.map(thread => {
                    const author = profiles.find(p => p.id === thread.authorId);
                    return <ThreadRow key={thread.id} thread={thread} author={author} navigateTo={navigateTo} />;
                }) : (
                    <p className="p-8 text-center text-gray-500">Aucun sujet dans cette catégorie pour le moment.</p>
                )}
            </div>
        </Card>
      </div>
    </div>
  );
};

export default ForumCategoryPage;
