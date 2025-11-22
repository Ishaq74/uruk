import React from 'react';
import { Profile, Place } from '../types';
import Button from './ui/Button';
import Input from './ui/Input';
import Textarea from './ui/Textarea';

interface SettingsPageProps {
  currentUser: Profile | null;
  navigateTo: (page: string, id?: string, mainCategory?: Place['mainCategory'], query?: string) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ currentUser, navigateTo }) => {
  if (!currentUser) {
    return <div className="text-center py-20">Veuillez vous connecter.</div>;
  }

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">Paramètres du Compte</h1>
          <p className="mt-4 text-xl text-gray-600">
            Gérez vos informations personnelles, notifications et préférences.
          </p>

          <form className="mt-8 bg-white p-8 rounded-2xl shadow-lg space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Nom complet</label>
              <Input type="text" id="fullName" defaultValue={currentUser.fullName} className="mt-1" />
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
              <Input type="text" id="username" defaultValue={currentUser.username} className="mt-1" />
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
              <Textarea id="bio" defaultValue={currentUser.bio} rows={4} className="mt-1" />
            </div>
            <div className="pt-5 text-right">
              <Button type="submit">Enregistrer les modifications</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
