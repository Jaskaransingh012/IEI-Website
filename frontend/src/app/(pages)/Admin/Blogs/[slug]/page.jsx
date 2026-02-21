import connectDB from '@/lib/db';
import Blog from '@/models/Blog';
import { notFound } from 'next/navigation';
import parse from 'html-react-parser';
import { format } from 'date-fns';

export async function generateMetadata({ params }) {
  await connectDB();
  const blog = await Blog.findOne({ slug: params.slug, published: true }).lean();
  
  if (!blog) return {};
  
  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  await connectDB();
  
  const blog = await Blog.findOneAndUpdate(
    { slug: params.slug, published: true },
    { $inc: { views: 1 } },
    { new: true }
  ).lean();

  if (!blog) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gray-900">
        {blog.featuredImage ? (
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-full object-cover opacity-60"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600" />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <div className="flex items-center justify-center gap-4 text-sm mb-4">
              <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                {blog.category}
              </span>
              <span>{format(new Date(blog.createdAt), 'MMMM d, yyyy')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">{blog.excerpt}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Author & Stats */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-8 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {blog.author.charAt(0)}
            </div>
            <div>
              <div className="font-medium">{blog.author}</div>
              <div className="text-sm text-gray-500">Author</div>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {blog.views.toLocaleString()} views
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          {parse(blog.content)}
        </div>

        {/* Tags */}
        {blog.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Additional Images Gallery */}
        {blog.images && blog.images.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {blog.images.map((image, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}