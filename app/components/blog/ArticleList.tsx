// app/[lng]/blog/ArticleList.tsx
'use client'; 

import { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard'; // Import the card component
import { Loader2 } from 'lucide-react';

// Simplified Article Data Type (local to this component as requested)
interface ArticleSummary {
    slug: string; 
    title: string;
    image_url: string; 
    created_at: string; 
    content: string; // Keep content here, we'll truncate it in the card
}

interface ArticleListProps {
    lng: string;
}

const truncateContent = (text: string, limit: number = 100) => {
    // Helper to truncate the content for the preview description
    return text.length > limit ? text.substring(0, limit) + '...' : text;
};


export default function ArticleList({ lng }: ArticleListProps) {
    const [articles, setArticles] = useState<ArticleSummary[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchArticles() {
            try {
                // Fetching from the internal API Route Handler we created
                const response = await fetch(`/api/articles?lang=${lng}`);
                
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to fetch articles.');
                }

                const data: ArticleSummary[] = await response.json();
                setArticles(data);
            } catch (err) {
                const message = err instanceof Error ? err.message : 'An unknown error occurred.';
                setError(message);
                console.error("Fetch error:", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchArticles();
    }, [lng]); // Re-fetch when language changes

    if (isLoading) {
        return (
            <div className="text-center py-20 flex flex-col items-center justify-center">
                <Loader2 className="w-8 h-8 text-green-600 animate-spin mb-3" />
                <p className="text-gray-600">Loading articles...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20 text-red-600">
                <p>Error loading articles: {error}</p>
                <p className="text-gray-500 text-sm mt-2">Check the server logs for details.</p>
            </div>
        );
    }
    
    if (articles.length === 0) {
        return (
             <div className="text-center py-20 text-gray-600">
                <p className="text-2xl font-semibold mb-2">No articles found.</p>
                <p>Try creating one in the admin panel!</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {articles.map((article) => (
                // Pass the whole article object to the card
                <ArticleCard 
                    key={article.slug} 
                    article={article} 
                    lng={lng} 
                    truncateContent={truncateContent}
                />
            ))}
        </div>
    );
}

// Re-export the simplified type definition to be available for the Card component
export type { ArticleSummary };