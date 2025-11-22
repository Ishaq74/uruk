
import React from 'react';
import { LISTING_ICONS } from '../constants';
import { Listing, ListingType, Place } from '../types';
import Icon from './Icon';
import { useTranslation } from './i18n/LanguageContext';
import { Card, CardContent } from './ui/Card';
import Button from './ui/Button';

interface LatestListingsProps {
    listings: Listing[];
    navigateTo: (page: string, id?: string, mainCategory?: Place['mainCategory'], query?: string) => void;
}

const ListingItem: React.FC<{ listing: Listing, navigateTo: LatestListingsProps['navigateTo'] }> = ({ listing, navigateTo }) => {
    const iconInfo = LISTING_ICONS[listing.type as ListingType];
    return (
        <Card onClick={(e) => { e.preventDefault(); navigateTo('annonce-detail', listing.id); }} className="hover:bg-slate-50 transition-colors duration-200 cursor-pointer">
            <CardContent className="p-4 pt-4">
                <div className="flex items-center">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center border">
                        <Icon name={iconInfo.name} className={iconInfo.className} />
                    </div>
                    <div className="ml-4 flex-grow">
                        <p className="font-semibold text-gray-800">{listing.title}</p>
                        <p className="text-sm text-gray-500">{listing.price}</p>
                    </div>
                    <div className="ml-4 text-right flex-shrink-0">
                        <p className="text-sm font-medium text-gray-800">{listing.type}</p>
                        <p className="text-xs text-gray-500">{listing.date}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};


const LatestListings: React.FC<LatestListingsProps> = ({ listings, navigateTo }) => {
  const { t } = useTranslation();
  return (
    <section>
       <div className="flex justify-between items-center mb-6">
         <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('latest_listings.title')}</h2>
            <p className="mt-4 text-lg text-gray-600">{t('latest_listings.subtitle')}</p>
        </div>
        <Button onClick={(e) => { e.preventDefault(); navigateTo('annonces')}} className="whitespace-nowrap">
            {t('latest_listings.see_all')}
        </Button>
      </div>
       <Card className="bg-white/50 p-6">
        <div className="space-y-4">
            {listings.slice(0,3).map((listing) => (
                <ListingItem key={listing.id} listing={listing} navigateTo={navigateTo} />
            ))}
        </div>
      </Card>
    </section>
  );
};

export default LatestListings;
