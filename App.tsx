import React, { useState, useEffect } from 'react';
import {
    Place, Profile, Event, Trail, Listing, Article, Comment, ForumThread, ForumPost, Group, Conversation, Message, PlaceClaim, Report, LiveEvent
} from './types';
import {
    PLACES, PROFILES, EVENTS, TRAILS, ALL_LISTINGS, MAGAZINE_ARTICLES, FORUM_THREADS, GROUPS, CONVERSATIONS, CLAIMS, REPORTS, LIVE_EVENTS
} from './constants';

import { LanguageProvider } from './components/i18n/LanguageContext';
import { ThemeProvider } from './components/ThemeProvider';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import PlaceListPage from './components/PlaceListPage';
import PlaceDetailPage from './components/PlaceDetailPage';
import EventListPage from './components/EventListPage';
import EventDetailPage from './components/EventDetailPage';
import TrailListPage from './components/TrailListPage';
import TrailDetailPage from './components/TrailDetailPage';
import AnnoncesListPage from './components/AnnoncesListPage';
import AnnonceDetailPage from './components/AnnonceDetailPage';
import ArticleListPage from './components/ArticleListPage';
import ArticleDetailPage from './components/ArticleDetailPage';
import ForumListPage from './components/ForumListPage';
import ForumCategoryPage from './components/ForumCategoryPage';
import ForumThreadPage from './components/ForumThreadPage';
import NewThreadPage from './components/NewThreadPage';
import GroupListPage from './components/GroupListPage';
import GroupDetailPage from './components/GroupDetailPage';
import NewGroupPage from './components/NewGroupPage';
import MemberListPage from './components/MemberListPage';
import ProfilePage from './components/ProfilePage';
import FavoritesPage from './components/FavoritesPage';
import DashboardPage from './components/DashboardPage';
import SettingsPage from './components/SettingsPage';
import ConversationsListPage from './components/ConversationsListPage';
import ConversationDetailPage from './components/ConversationDetailPage';
import SearchPage from './components/SearchPage';
import ProposeContentPage from './components/ProposeContentPage';
import ProposePlaceForm from './components/propose/ProposePlaceForm';
import ProposeEventForm from './components/propose/ProposeEventForm';
import ProposeTrailForm from './components/propose/ProposeTrailForm';
import ProposeListingForm from './components/propose/ProposeListingForm';
import EspaceProPage from './components/EspaceProPage';
import ClaimPlacePage from './components/ClaimPlacePage';
import ManagePlacePage from './components/ManagePlacePage';
import PlaceAnalyticsPage from './components/PlaceAnalyticsPage';
import ManageProductsPage from './components/ManageProductsPage';
import ManageServicesPage from './components/ManageServicesPage';
import OrdersListPage from './components/OrdersListPage';
import BookingsListPage from './components/BookingsListPage';
import AdCampaignsPage from './components/AdCampaignsPage';
import StaticPage from './components/StaticPage';
import CookieBanner from './components/CookieBanner';
import ReportModal from './components/ReportModal';
import LivePage from './components/LivePage';


type Page = 
  'home' | 'restaurants' | 'hebergements' | 'activites' | 'commerces' | 'place-detail' |
  'events' | 'event-detail' | 'trails' | 'trail-detail' | 'annonces' | 'annonce-detail' |
  'articles' | 'article-detail' | 'forums' | 'forum-category' | 'forum-thread' | 'new-thread' |
  'groupes' | 'group-detail' | 'new-group' | 'members' | 'profile' | 'favorites' | 'dashboard' |
  'settings' | 'conversations' | 'conversation-detail' | 'search' | 'propose' |
  'propose-place' | 'propose-event' | 'propose-trail' | 'propose-listing' |
  'espace-pro' | 'claim-place' | 'manage-place' | 'place-analytics' |
  'manage-products' | 'manage-services' | 'pro-orders' | 'pro-bookings' | 'ad-campaigns' |
  'static' | 'live';

type PageParams = {
  id?: string;
  mainCategory?: Place['mainCategory'];
  query?: string;
  slug?: string;
  filter?: 'my-listings' | 'my-groups' | 'contributions';
};

const App: React.FC = () => {
    const [page, setPage] = useState<Page>('home');
    const [pageParams, setPageParams] = useState<PageParams>({});
    
    // Data state
    const [places, setPlaces] = useState<Place[]>(PLACES);
    const [articles, setArticles] = useState<Article[]>(MAGAZINE_ARTICLES);
    const [forumThreads, setForumThreads] = useState<ForumThread[]>(FORUM_THREADS);
    const [groups, setGroups] = useState<Group[]>(GROUPS);
    const [conversations, setConversations] = useState<Conversation[]>(CONVERSATIONS);
    const [claims, setClaims] = useState<PlaceClaim[]>(CLAIMS);
    const [reports, setReports] = useState<Report[]>(REPORTS);
    const [liveEvents, setLiveEvents] = useState<LiveEvent[]>(LIVE_EVENTS);

    const [currentUser, setCurrentUser] = useState<Profile | null>(null);
    const [showCookieBanner, setShowCookieBanner] = useState(true);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [reportTarget, setReportTarget] = useState({ id: '', type: '' });

    const navigateTo = (page: string, id?: string, mainCategory?: Place['mainCategory'], query?: string, slug?: string, filter?: PageParams['filter']) => {
        setPage(page as Page);
        setPageParams({ id, mainCategory, query, slug, filter });
        window.scrollTo(0, 0);
    };
    
    const handleLogin = () => {
        // Mock login - sets user to first profile
        setCurrentUser(PROFILES[0]);
    };
    
    const handleLogout = () => {
        setCurrentUser(null);
        navigateTo('home');
    };

    const handleAddComment = (articleId: string, comment: Omit<Comment, 'id' | 'createdAt' | 'target_entity_id'>) => {
        const newComment: Comment = {
            ...comment,
            id: `comm${Date.now()}`,
            createdAt: 'à l\'instant',
            target_entity_id: articleId,
        };
        setArticles(prevArticles => prevArticles.map(article => 
            article.id === articleId 
            ? { ...article, comments: [...article.comments, newComment] }
            : article
        ));
    };

    const handleOpenReportModal = (targetId: string, targetType: string) => {
        setReportTarget({ id: targetId, type: targetType });
        setIsReportModalOpen(true);
    };

    const handleReportSubmit = (reportData: { targetId: string; targetType: string; reason: string; comment: string }) => {
        if (!currentUser) return;
        const newReport: Report = {
            ...reportData,
            id: `rep${Date.now()}`,
            reporterId: currentUser.id,
        };
        setReports(prev => [...prev, newReport]);
        setIsReportModalOpen(false);
        alert('Signalement envoyé. Merci.');
    };
    
    const handleAddThread = (thread: Omit<ForumThread, 'id' | 'posts' | 'createdAt'>, firstPostContent: string) => {
        const newThreadId = `ft${Date.now()}`;
        const newPost: ForumPost = {
            id: `fp${Date.now()}`,
            threadId: newThreadId,
            authorId: thread.authorId,
            content: firstPostContent,
            createdAt: 'à l\'instant',
        };
        const newThread: ForumThread = {
            ...thread,
            id: newThreadId,
            createdAt: 'à l\'instant',
            posts: [newPost],
        };
        setForumThreads(prev => [newThread, ...prev]);
        navigateTo('forum-thread', newThreadId);
    };

    const renderPage = () => {
        switch (page) {
            case 'home':
                return <HomePage places={places} events={EVENTS} trails={TRAILS} listings={ALL_LISTINGS} articles={articles} navigateTo={navigateTo} onSearch={(q) => navigateTo('search', undefined, undefined, q)} />;
            case 'restaurants':
                return <PlaceListPage mainCategory="restauration" places={places} navigateTo={navigateTo} />;
            case 'hebergements':
                return <PlaceListPage mainCategory="hebergement" places={places} navigateTo={navigateTo} />;
            case 'activites':
                return <PlaceListPage mainCategory="activites" places={places} navigateTo={navigateTo} />;
            case 'commerces':
                return <PlaceListPage mainCategory="commerces" places={places} navigateTo={navigateTo} />;
            case 'place-detail':
                return <PlaceDetailPage id={pageParams.id!} places={places} profiles={PROFILES} navigateTo={navigateTo} currentUser={currentUser} onLogin={handleLogin} onOpenReportModal={handleOpenReportModal} />;
            case 'events':
                return <EventListPage events={EVENTS} navigateTo={navigateTo} />;
            case 'event-detail':
                return <EventDetailPage id={pageParams.id!} events={EVENTS} navigateTo={navigateTo} currentUser={currentUser} />;
             case 'trails':
                return <TrailListPage trails={TRAILS} navigateTo={navigateTo} />;
            case 'trail-detail':
                return <TrailDetailPage id={pageParams.id!} trails={TRAILS} navigateTo={navigateTo} />;
            case 'annonces':
                return <AnnoncesListPage listings={ALL_LISTINGS} navigateTo={navigateTo} filter={pageParams.filter === 'my-listings' ? 'my-listings' : undefined} currentUser={currentUser}/>;
            case 'annonce-detail':
                return <AnnonceDetailPage id={pageParams.id!} listings={ALL_LISTINGS} profiles={PROFILES} navigateTo={navigateTo} currentUser={currentUser} onStartConversation={() => {}} />;
            case 'articles':
                 return <ArticleListPage articles={articles} profiles={PROFILES} navigateTo={navigateTo} />;
            case 'article-detail':
                 return <ArticleDetailPage id={pageParams.id!} articles={articles} profiles={PROFILES} navigateTo={navigateTo} currentUser={currentUser} onAddComment={handleAddComment} onLogin={handleLogin} onOpenReportModal={handleOpenReportModal} />;
            case 'forums':
                return <ForumListPage threads={forumThreads} profiles={PROFILES} navigateTo={navigateTo} />;
            case 'forum-category':
                return <ForumCategoryPage categoryId={pageParams.id!} threads={forumThreads} profiles={PROFILES} navigateTo={navigateTo} />;
            case 'forum-thread':
                 return <ForumThreadPage id={pageParams.id!} threads={forumThreads} profiles={PROFILES} navigateTo={navigateTo} currentUser={currentUser} onLogin={handleLogin} />;
            case 'new-thread':
                return <NewThreadPage categoryId={pageParams.id} currentUser={currentUser} navigateTo={navigateTo} onAddThread={handleAddThread}/>;
            case 'groupes':
                return <GroupListPage groups={groups} navigateTo={navigateTo} filter={pageParams.filter === 'my-groups' ? 'my-groups' : undefined} currentUser={currentUser} />;
            case 'group-detail':
                return <GroupDetailPage id={pageParams.id!} groups={groups} profiles={PROFILES} navigateTo={navigateTo} currentUser={currentUser} onToggleMembership={() => {}}/>;
            case 'new-group':
                return <NewGroupPage currentUser={currentUser} navigateTo={navigateTo} onAddGroup={() => {}} />;
            case 'members':
                return <MemberListPage profiles={PROFILES} navigateTo={navigateTo} />;
            case 'profile':
                return <ProfilePage id={pageParams.id!} profiles={PROFILES} places={places} navigateTo={navigateTo} currentUser={currentUser} filter={pageParams.filter} />;
            case 'favorites':
                return <FavoritesPage currentUser={currentUser} places={places} navigateTo={navigateTo} />;
            case 'dashboard':
                return <DashboardPage currentUser={currentUser} navigateTo={navigateTo} />;
            case 'settings':
                return <SettingsPage currentUser={currentUser} navigateTo={navigateTo} />;
            case 'conversations':
                return <ConversationsListPage conversations={conversations} profiles={PROFILES} currentUser={currentUser} navigateTo={navigateTo} />;
            case 'conversation-detail':
                return <ConversationDetailPage id={pageParams.id!} conversations={conversations} profiles={PROFILES} currentUser={currentUser} navigateTo={navigateTo} onSendMessage={() => {}} />;
            case 'search':
                return <SearchPage query={pageParams.query || ''} allData={{ places, events: EVENTS, trails: TRAILS, listings: ALL_LISTINGS, articles }} navigateTo={navigateTo} />;
            case 'propose':
                return <ProposeContentPage currentUser={currentUser} navigateTo={navigateTo} />;
            case 'propose-place':
                return <ProposePlaceForm currentUser={currentUser} navigateTo={navigateTo} onAddPlace={() => {}} />;
            case 'propose-event':
                return <ProposeEventForm currentUser={currentUser} navigateTo={navigateTo} onAddEvent={() => {}} />;
            case 'propose-trail':
                return <ProposeTrailForm currentUser={currentUser} navigateTo={navigateTo} onAddTrail={() => {}} />;
            case 'propose-listing':
                return <ProposeListingForm currentUser={currentUser} navigateTo={navigateTo} onAddListing={() => {}} />;
            case 'espace-pro':
                return <EspaceProPage currentUser={currentUser} navigateTo={navigateTo} />;
            case 'claim-place':
                return <ClaimPlacePage currentUser={currentUser} navigateTo={navigateTo} onClaim={() => {}} />;
            case 'manage-place':
                 return <ManagePlacePage id={pageParams.id!} currentUser={currentUser} navigateTo={navigateTo} onUpdatePlace={() => {}} />;
            case 'place-analytics':
                 return <PlaceAnalyticsPage id={pageParams.id!} currentUser={currentUser} navigateTo={navigateTo} />;
            case 'manage-products':
                return <ManageProductsPage orgId={pageParams.id!} currentUser={currentUser} navigateTo={navigateTo} />;
            case 'manage-services':
                return <ManageServicesPage orgId={pageParams.id!} currentUser={currentUser} navigateTo={navigateTo} />;
            case 'pro-orders':
                return <OrdersListPage orgId={pageParams.id!} currentUser={currentUser} navigateTo={navigateTo} />;
            case 'pro-bookings':
                return <BookingsListPage orgId={pageParams.id!} currentUser={currentUser} navigateTo={navigateTo} />;
            case 'ad-campaigns':
                return <AdCampaignsPage currentUser={currentUser} navigateTo={navigateTo} />;
            case 'static':
                return <StaticPage slug={pageParams.slug!} navigateTo={navigateTo} />;
            case 'live':
                return <LivePage liveEvents={liveEvents} profiles={PROFILES} navigateTo={navigateTo} currentUser={currentUser} onAddEvent={()=>{}} onVote={()=>{}} onLogin={handleLogin} />;
            default:
                return <div>Page not found</div>;
        }
    };

    return (
        <ThemeProvider>
            <LanguageProvider>
                <div className="flex flex-col min-h-screen">
                    <Header currentUser={currentUser} navigateTo={navigateTo} onLogin={handleLogin} onLogout={handleLogout} />
                    <main className="flex-grow">
                        {renderPage()}
                    </main>
                    <Footer />
                    {showCookieBanner && <CookieBanner onAccept={() => setShowCookieBanner(false)} />}
                    <ReportModal
                        isOpen={isReportModalOpen}
                        onClose={() => setIsReportModalOpen(false)}
                        onSubmit={handleReportSubmit}
                        targetId={reportTarget.id}
                        targetType={reportTarget.type}
                    />
                </div>
            </LanguageProvider>
        </ThemeProvider>
    );
};

export default App;