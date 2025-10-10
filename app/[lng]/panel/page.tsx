// app/admin/page.tsx
// This page uses a simplified public layout aesthetic for the admin dashboard.

import { Metadata } from 'next';
// NOTE: Since this is likely a client-side component for interactivity, 
// we won't use 'use client' unless necessary for future components.

// If you need translations, you would need to set up i18n for the admin area, 
// but for simplicity, we'll use static English for now.

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
          
          {/* Card Grid (Using a simplified version of your section grid) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Stat Card 1 */}
            <div className="bg-gray-50 rounded-lg shadow-lg p-6 border-l-4 border-green-500">
              <p className="text-sm font-medium text-gray-500">Total Blog Articles</p>
              <p className={`text-4xl font-bold mt-1 ${darkText}`}>42</p>
              <a href="/admin/articles" className={`mt-3 inline-block font-semibold ${accentGreen} hover:underline`}>Manage Articles</a>
            </div>

            {/* Stat Card 2 */}
            <div className="bg-gray-50 rounded-lg shadow-lg p-6 border-l-4 border-green-500">
              <p className="text-sm font-medium text-gray-500">Pending Comments</p>
              <p className={`text-4xl font-bold mt-1 ${darkText}`}>15</p>
              <a href="/admin/comments" className={`mt-3 inline-block font-semibold ${accentGreen} hover:underline`}>Review Comments</a>
            </div>

            {/* Stat Card 3 */}
            <div className="bg-gray-50 rounded-lg shadow-lg p-6 border-l-4 border-green-500">
              <p className="text-sm font-medium text-gray-500">Website Status</p>
              <p className={`text-4xl font-bold mt-1 text-green-500`}>Operational</p>
              <a href="/admin/settings" className={`mt-3 inline-block font-semibold ${accentGreen} hover:underline`}>View Logs</a>
            </div>
            
          </div>
        </div>
      </section>

      {/* === Placeholder Section for Future Components === */}
      <section className="py-16 bg-gray-100 border-t border-gray-300">
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold ${accentGreen} mb-6`}>Content Creation Area</h2>
          
          {/* Placeholder for a "New Article" button or a simple form */}
          <div className="bg-white p-8 rounded-lg shadow-xl min-h-[250px] flex flex-col justify-center items-center border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Start a New Post</h3>
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200">
              Create New Article
            </button>
            <p className="mt-4 text-gray-500 text-sm">Components for the rich text editor will be placed here.</p>
          </div>
        </div>
      </section>
    </>
  );
}