
import React, { useState } from 'react';
import { FORUM_CATEGORIES } from '../constants';
import { Profile, Place, ForumThread } from '../types';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import Textarea from './ui/Textarea';

interface NewThreadPageProps {
  categoryId?: string;
  currentUser: Profile | null;
  navigateTo: (page: string, id?: string, mainCategory?: Place['mainCategory'], query?: string) => void;
  onAddThread: (thread: Omit<ForumThread, 'id' | 'posts' | 'createdAt'>, firstPostContent: string) => void;
}

const NewThreadPage: React.FC<NewThreadPageProps> = ({ categoryId: initialCategoryId, currentUser, navigateTo, onAddThread }) => {
    const [categoryId, setCategoryId] = useState(initialCategoryId || FORUM_CATEGORIES[0]?.id || '');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    if (!currentUser) {
        // This should ideally be handled by routing, but as a safeguard:
        return <div className="text-center py-20">Veuillez vous connecter pour créer un sujet.</div>;
    }
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim() || !categoryId) {
            alert("Veuillez remplir tous les champs.");
            return;
        }
        
        onAddThread({
            authorId: currentUser.id,
            title,
            categoryId,
        }, content);
    };

    return (
        <div className="bg-slate-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                 <div className="max-w-3xl mx-auto">
                    <div className="text-left mb-12">
                        <Button variant="link" onClick={(e) => { e.preventDefault(); navigateTo('forums'); }} className="p-0 h-auto">&larr; Retour aux forums</Button>
                        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">Créer un nouveau sujet</h1>
                        <p className="mt-4 text-xl text-gray-600">
                            Partagez une idée, posez une question ou lancez un débat avec la communauté.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Catégorie</label>
                            <Select 
                                id="category" 
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                className="mt-1"
                            >
                                {FORUM_CATEGORIES.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.title}</option>
                                ))}
                            </Select>
                        </div>
                         <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre du sujet</label>
                            <Input 
                                type="text" 
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1"
                                placeholder="Un titre clair et concis"
                            />
                        </div>
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Votre message</label>
                            <Textarea 
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={8}
                                className="mt-1"
                                placeholder="Exprimez-vous ici..."
                            />
                        </div>
                        <div className="pt-5 text-right">
                             <Button
                                type="submit"
                                disabled={!title.trim() || !content.trim() || !categoryId}
                            >
                                Publier le sujet
                            </Button>
                        </div>
                    </form>
                 </div>
            </div>
        </div>
    );
};

export default NewThreadPage;
