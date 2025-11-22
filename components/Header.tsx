import React, { useState } from 'react';
import { Profile } from '../types';
import Icon from './Icon';
import { useTranslation } from './i18n/LanguageContext';
import { useTheme } from './ThemeProvider';
import Button from './ui/Button';

interface HeaderProps {
  currentUser: Profile | null;
  navigateTo: (page: string, id?: string) => void;
  onLogin: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, navigateTo, onLogin, onLogout }) => {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="flex-shrink-0 font-bold text-2xl text-sky-600">
              Salut Annecy
            </a>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Button variant="ghost" onClick={() => navigateTo('live')}>En Direct</Button>
                <Button variant="ghost" onClick={() => navigateTo('restaurants')}>Découvrir</Button>
                <Button variant="ghost" onClick={() => navigateTo('annonces')}>Petites Annonces</Button>
                <Button variant="ghost" onClick={() => navigateTo('articles')}>Magazine</Button>
                <Button variant="ghost" onClick={() => navigateTo('forums')}>Forum</Button>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
             {currentUser ? (
              <div className="relative group">
                <button onClick={() => navigateTo('dashboard')} className="flex items-center space-x-2">
                  <img src={currentUser.avatarUrl} alt={currentUser.fullName} className="w-10 h-10 rounded-full" />
                  <span className="font-semibold text-gray-700">{currentUser.fullName.split(' ')[0]}</span>
                  <Icon name="chevronDown" className="w-4 h-4 text-gray-500" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('dashboard')}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Tableau de bord</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onLogout()}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Déconnexion</a>
                </div>
              </div>
            ) : (
              <Button onClick={onLogin}>Connexion</Button>
            )}
             <Button onClick={() => navigateTo('propose')} variant="primary">Proposer un contenu</Button>
             
             {/* Theme toggle */}
             <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="p-2 rounded-full hover:bg-gray-200">
                <Icon name={theme === 'light' ? 'moon' : 'sun'} className="w-6 h-6 text-gray-600" />
             </button>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
                <Icon name="search" className="w-6 h-6" /> {/* Placeholder, should be a menu icon */}
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
            {/* Mobile menu content */}
        </div>
      )}
    </header>
  );
};

export default Header;
