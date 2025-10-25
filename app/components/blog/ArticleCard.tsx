// app/[lng]/blog/ArticleCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { ArticleSummary } from './ArticleList'; // Import the type from the List component

interface ArticleCardProps {
    article: ArticleSummary;
    lng: string;
    truncateContent: (text: string) => string; // Function passed from the List component
}

// Helper to format the date
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export default function ArticleCard({ article, lng, truncateContent }: ArticleCardProps) {
    const detailUrl = `/${lng}/blog/${article.slug}`;

    return (
        <Link 
            href={detailUrl} 
            className="bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden 
                       transition-transform duration-300 hover:shadow-2xl hover:-translate-y-1 
                       group block"
        >
            {/* Image - OLD CODE */}
{/* <div className="relative w-full h-56"> */}

{/* Image - Use a fixed height for the card container */}
<div className="relative w-full h-56 overflow-hidden"> 
    <Image 
        src={article.image_url || '/images/default-blog.jpg'} 
        alt={article.title} 
        fill 
        // -----------------------------------------------------------------
        // KEY CHANGE: Use 'contain' to show the whole image, no cropping
        // -----------------------------------------------------------------
        style={{ objectFit: 'contain' }} 
        sizes="(max-width: 768px) 100vw, 33vw"
        className="transition-opacity duration-500 group-hover:opacity-90 p-2" // Added p-2 for padding/border look
        priority={false}
    />
</div>

            {/* Content */}
            <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{formatDate(article.created_at)}</p>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-green-700 mb-2 group-hover:text-green-800 transition-colors duration-200">
                    {article.title}
                </h3>
                
                {/* Truncated Content */}
                <p className="text-gray-600 mb-4">
                    {truncateContent(article.content)}
                </p>
                
                {/* Read More Link */}
                <span className="text-green-600 font-semibold group-hover:text-green-700 transition-colors duration-200 flex items-center">
                    Read More 
                    <svg className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                </span>
            </div>
        </Link>
    );
}