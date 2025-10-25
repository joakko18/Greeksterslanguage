// app/admin/ArticleDeleter.tsx
'use client';

import { useState, useEffect } from 'react';
import { Loader2, Trash2 } from 'lucide-react';

// Define the shape of the data returned from the listing API
interface ArticleSummary {
    id: string; // We use the UUID for the delete operation
    title: string;
    lang: string | null; 
}

export default function ArticleDeleter() {
    const [articles, setArticles] = useState<ArticleSummary[]>([]);
    const [selectedArticleId, setSelectedArticleId] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

    // --- 1. Fetch Articles for Dropdown (Unchanged) ---
    useEffect(() => {
        async function fetchArticles() {
            try {
                // Fetching from the new dedicated minimal route /api/articles/list
                const res = await fetch('/api/articles/list'); 
                
                if (!res.ok) {
                    const errorBody = await res.json().catch(() => ({ error: 'Unknown server error.' }));
                    throw new Error(errorBody.error || 'Failed to fetch articles for deletion list.');
                }

                const data: ArticleSummary[] = await res.json();
                setArticles(data);
                
                if (data.length > 0) {
                    setSelectedArticleId(data[0].id);
                }
            } catch (err) {
                setStatusMessage({ 
                    type: 'error', 
                    message: err instanceof Error ? err.message : 'An unknown error occurred during fetch.' 
                });
            } finally {
                setIsLoading(false);
            }
        }
        fetchArticles();
    }, []);

    // --- 🎯 NEW: Auto-hide Status Message Logic ---
    useEffect(() => {
        // Only run if there is a message to show
        if (statusMessage) {
            // Success and Info messages disappear after 5 seconds (5000ms)
            // Error messages persist until the user does something else
            if (statusMessage.type === 'success' || statusMessage.type === 'info') {
                const timer = setTimeout(() => {
                    setStatusMessage(null);
                }, 5000); 

                // Cleanup function: Clear the timeout if the component unmounts or the message changes
                return () => clearTimeout(timer);
            }
        }
    }, [statusMessage]); // Re-run effect whenever statusMessage changes

    // --- 2. Handle Deletion Logic (Unchanged) ---
    const handleDelete = async () => {
        if (!selectedArticleId) {
            setStatusMessage({ type: 'error', message: 'Please select an article to delete.' });
            return;
        }

        const articleToDelete = articles.find(a => a.id === selectedArticleId);
        if (!articleToDelete) return;

        // --- Confirmation ---
        const articleTitle = articleToDelete.title || 'Untitled Article'; 
        const isConfirmed = window.confirm(
            `Are you absolutely sure you want to delete the article titled: \n\n"${articleTitle}" (ID: ${articleToDelete.id})? \n\nTHIS ACTION CANNOT BE UNDONE.`
        );

        if (!isConfirmed) {
            setStatusMessage({ type: 'info', message: 'Deletion cancelled by user.' });
            return;
        }

        setIsDeleting(true);
        setStatusMessage(null);

        try {
            const res = await fetch(`/api/articles?id=${selectedArticleId}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to delete article.');
            }

            // Success: Update UI
            setStatusMessage({ type: 'success', message: `Article "${articleTitle}" deleted successfully!` });
            
            const updatedArticles = articles.filter(a => a.id !== selectedArticleId);
            setArticles(updatedArticles);
            
            setSelectedArticleId(updatedArticles.length > 0 ? updatedArticles[0].id : '');


        } catch (err) {
            setStatusMessage({ type: 'error', message: err instanceof Error ? err.message : 'Deletion failed due to an unknown error.' });
        } finally {
            setIsDeleting(false);
        }
    };

    const statusClasses = statusMessage 
        ? (statusMessage.type === 'success' ? 'bg-green-100 text-green-700' : statusMessage.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700') 
        : 'hidden';

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3 flex items-center">
                <Trash2 className="w-6 h-6 mr-2 text-red-600" />
                Delete Article
            </h2>

            {/* Status Message */}
            {statusMessage && (
                <div className={`p-3 mb-4 rounded-md font-medium ${statusClasses}`}>
                    {statusMessage.message}
                </div>
            )}

            {isLoading ? (
                <div className="flex items-center justify-center h-24 text-gray-600">
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Loading articles...
                </div>
            ) : articles.length === 0 ? (
                <div className="p-4 bg-yellow-100 text-yellow-700 rounded-md font-medium">
                    No articles found to delete.
                </div>
            ) : (
                <>
                    <div className="mb-6">
                        <label htmlFor="article-select" className="block text-lg font-medium text-gray-700 mb-2">
                            Select Article to Delete
                        </label>
                        <select
                            id="article-select"
                            value={selectedArticleId}
                            onChange={(e) => setSelectedArticleId(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-lg rounded-md shadow-sm"
                        >
                            {articles.map((article) => (
                                <option key={article.id} value={article.id}>
                                    {`[${article.lang?.toUpperCase() ?? '??'}] ${article.title}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={handleDelete}
                        disabled={isDeleting || !selectedArticleId}
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition duration-150 ease-in-out"
                    >
                        {isDeleting ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 className="w-5 h-5 mr-2" />
                                Delete Article Permanently
                            </>
                        )}
                    </button>
                </>
            )}
        </div>
    );
}