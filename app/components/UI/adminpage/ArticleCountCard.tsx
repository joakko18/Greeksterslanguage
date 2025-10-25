// app/components/UI/adminpage/ArticleCountCard.tsx
'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react'; // Assuming you use lucide icons

// Define props for passing required styles/classes
interface ArticleCountCardProps {
    darkText: string;
    accentGreen: string;
}

// NOTE: This component assumes you have created the minimal API route:
// GET /api/articles/count
export default function ArticleCountCard({ darkText, accentGreen }: ArticleCountCardProps) {
    const [articleCount, setArticleCount] = useState<number | '...' | null>('...');
    const [isFetching, setIsFetching] = useState(true);

    // Fetch the article count on component mount
    useEffect(() => {
        async function fetchCount() {
            try {
                // Fetch from the new dedicated count endpoint
                const res = await fetch('/api/articles/count');
                
                if (!res.ok) throw new Error('Failed to fetch article count.');

                const data = await res.json();
                
                // Ensure the count is a number, default to 0 if null/undefined
                setArticleCount(data.count ?? 0); 
            } catch (error) {
                console.error('Error fetching article count:', error);
                setArticleCount(null); // Set to null to show 'Error'
            } finally {
                setIsFetching(false);
            }
        }
        fetchCount();
    }, []);

    const displayCount = articleCount === null ? 'Error' : articleCount;
    
    return (
        // Stat Card 1 - This is the structure from your page.tsx
        <div className="bg-gray-50 rounded-lg shadow-lg p-6 border-l-4 border-green-500">
            <p className="text-sm font-medium text-gray-500">Total Blog Articles</p>
            
            {/* Display the fetched count or a loading spinner */}
            <p className={`text-4xl font-bold mt-1 ${darkText} flex items-center`}>
                {isFetching && articleCount === '...' ? (
                    <Loader2 className="w-6 h-6 animate-spin text-green-500" />
                ) : (
                    displayCount
                )}
            </p>
            
            <a href="/admin/articles" className={`mt-3 inline-block font-semibold ${accentGreen} hover:underline`}>
                Manage Articles
            </a>
        </div>
    );
}