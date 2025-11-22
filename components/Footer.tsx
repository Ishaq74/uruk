import React from 'react';
import { useTranslation } from './i18n/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const sections = [
    { title: 'À propos', links: [{ label: 'Qui sommes-nous ?', href: 'qui-sommes-nous' }, { label: 'Contact', href: 'contact' }, { label: 'Presse', href: 'presse' }] },
    { title: 'Légal', links: [{ label: 'Mentions Légales', href: 'mentions-legales' }, { label: 'Confidentialité', href: 'confidentialite' }, { label: 'CGU', href: 'cgu' }, { label: 'CGV', href: 'cgv' }] },
    { title: 'Aide', links: [{ label: 'FAQ', href: 'faq' }] }
  ];

  return (
    <footer className="bg-slate-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <h3 className="font-bold text-2xl text-white">Salut Annecy</h3>
            <p className="mt-2 text-sm text-slate-400">{t('footer.tagline') || 'Le guide local et communautaire.'}</p>
          </div>
          {sections.map(section => (
            <div key={section.title}>
              <h4 className="font-semibold uppercase tracking-wider text-slate-400 text-sm">{section.title}</h4>
              <ul className="mt-4 space-y-2">
                {section.links.map(link => (
                  <li key={link.label}><a href={`#${link.href}`} className="text-slate-300 hover:text-white text-sm">{link.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-slate-700 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} Salut Annecy. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
