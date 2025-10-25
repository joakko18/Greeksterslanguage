// app/admin/page.tsx
// This page uses a simplified public layout aesthetic for the admin dashboard.

import { Metadata } from 'next';
import ArticleCreatorForm from '@/app/components/UI/adminpage/ArticleCreatorForm';
import ArticleDeleter from '@/app/components/UI/adminpage/ArticleDeleter';
import ArticleCountCard from '@/app/components/UI/adminpage/ArticleCountCard'; 


// Static Metadata for the Admin Page
export const metadata: Metadata = {
    title: "Admin Dashboard",
    description: "Manage content, users, and settings.",
};

export default function AdminDashboardPage() {
    
    // Define colors based on the green tonalities you use:
    const primaryGreen = 'bg-[#e4f1d4]'; 
    const darkText = 'text-gray-800';
    const accentGreen = 'text-green-700';

    return (
        <>
            {/* === Hero Section (Admin Header) - Simple, non-image background === */}
            <section className={`relative py-24 md:py-32 text-center ${primaryGreen} border-b border-gray-300`}>
                <div className="relative z-10 container mx-auto px-4">
                    <h1 className={`text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-sm ${darkText}`}>
                        Admin Dashboard
                    </h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-600">
                        Welcome, Administrator. Manage your site's content and operations here.
                    </p>
                </div>
            </section>

            {/* === Main Content Section (Stats & Quick Access) === */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className={`text-3xl font-bold ${accentGreen} mb-10 text-center`}>
                        Quick Overview
                    </h2>
                    
                    {/* Card Grid - Centered using max-w-sm and mx-auto */}
                    <div className="grid grid-cols-1 gap-8 max-w-sm mx-auto">
                        
                        <ArticleCountCard darkText={darkText} accentGreen={accentGreen} />
                        
                    </div>
                </div>
            </section>
            
            {/* === Content Creation Area (Now houses the Form) === */}
            <section className="py-16 bg-gray-100 border-t border-gray-300">
                <div className="container mx-auto px-4">
                    <h2 className={`text-3xl font-bold ${accentGreen} mb-6`}>Content Creation Area</h2>
                    
                    {/* Inject the Article Creation/Deletion Components */}
                    {/* 🎯 FIX: Added mb-8 (margin-bottom: 2rem) to create space */}
                    <div className="mb-8"> 
                        <ArticleCreatorForm />
                    </div>
                    
                    <ArticleDeleter/>
                    
                </div>
            </section>
        </>
    );
}