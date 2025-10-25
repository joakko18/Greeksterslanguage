// app/admin/ArticleCreatorForm.tsx
'use client';

import { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react'; // Added Loader2 for loading state

export default function ArticleCreatorForm() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState(''); // NEW: State for the article slug
  const [content, setContent] = useState('');
  // NEW: State for language, defaulting to English
  const [lang, setLang] = useState('en'); 
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // State for loading/submission status
  const [error, setError] = useState<string | null>(null);

  // Define available languages
  const availableLangs = [
    { code: 'en', name: 'English' },
    { code: 'gr', name: 'Greek' },
  ];

  // Helper function to auto-generate slug from title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove all non-word characters (except spaces and hyphens)
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with a single hyphen
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    // Auto-update slug if the admin hasn't manually edited it yet
    if (slug === '' || slug === generateSlug(title)) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // 1. Prepare data for FormData
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('lang', lang);
    formData.append('slug', slug || generateSlug(title)); // Ensure slug is present
    if (image) {
      formData.append('image', image);
    }

    // 2. Send data to the API Route Handler (which we will create next)
    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        body: formData, // FormData correctly sends text fields and the image file
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to publish article.');
      }

      alert(`Article successfully published! (Slug: ${result.slug})`);
      
      // Reset form
      setTitle('');
      setSlug('');
      setContent('');
      setImage(null);

    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
        Create New Blog Article
      </h3>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p className="font-bold">Submission Error</p>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* NEW: Language Selection Input */}
        <div>
          <label htmlFor="lang" className="block text-sm font-medium text-gray-700 mb-1">
            Article Language
          </label>
          <select
            id="lang"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
          >
            {availableLangs.map((l) => (
                <option key={l.code} value={l.code}>
                    {l.name}
                </option>
            ))}
          </select>
        </div>
        
        {/* 1. Title Input (Updated with handleTitleChange) */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Article Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange} // Use the new handler
            required
            placeholder="e.g., The Beauty of Ancient Greek"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
          />
        </div>

        {/* NEW: Slug Input */}
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
            Article Slug (URL Path)
          </label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            placeholder="e.g., the-beauty-of-ancient-greek"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150 bg-gray-50"
          />
          <p className="mt-1 text-xs text-gray-500">Auto-generated from title, but can be manually overridden.</p>
        </div>

        {/* 2. Content Input (Textarea) */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Article Content
          </label>
          <textarea
            id="content"
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Write your article body here..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
          />
        </div>

        {/* 3. Image Upload Input (Simplified) */}
        <div>
          <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-2">
            Featured Image
          </label>
          
          <div className="flex items-center space-x-4">
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            
            {/* Custom File Input Button */}
            <label
              htmlFor="image-upload"
              className="flex items-center justify-center cursor-pointer 
                         bg-green-500 text-white font-semibold 
                         py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
            >
              <Upload className="w-5 h-5 mr-2" />
              {image ? 'Change Image' : 'Upload Image'}
            </label>
            
            {/* Display selected file name or placeholder */}
            {image ? (
              <span className="flex items-center text-sm text-gray-600 bg-gray-100 p-2 rounded-lg">
                {image.name} 
                <button 
                  type="button" 
                  onClick={() => setImage(null)} 
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ) : (
              <span className="text-sm text-gray-500">No file selected.</span>
            )}
          </div>
          <p className="mt-1 text-xs text-gray-500">Recommended size: 1200x630 pixels</p>
        </div>

        {/* Submit Button (Updated with loading state) */}
        <div className="pt-4 border-t mt-6">
          <button
            type="submit"
            disabled={isSubmitting} // Disable button while submitting
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg 
                       transition-colors duration-200 shadow-lg disabled:bg-gray-400"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Publishing...
              </span>
            ) : (
              'Publish Article'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}