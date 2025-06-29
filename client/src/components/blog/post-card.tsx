import { Link } from "wouter";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate, getCategoryColor } from "@/lib/utils";
import type { PostWithDetails } from "@shared/schema";

interface PostCardProps {
  post: PostWithDetails;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const cardClass = featured 
    ? "bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
    : "bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow";

  const imageHeight = featured ? "h-64" : "h-48";

  return (
    <Card className={cardClass}>
      <div className="relative">
        {post.coverImage && (
          <img 
            src={post.coverImage}
            alt={post.title}
            className={`w-full ${imageHeight} object-cover`}
          />
        )}
        {featured && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-amber-500 text-white hover:bg-amber-600">
              Featured
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className={featured ? "p-6" : "p-5"}>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <Badge 
            variant="secondary" 
            className={`text-xs font-medium ${getCategoryColor(post.category.name)}`}
          >
            {post.category.name}
          </Badge>
          <span>•</span>
          <span>{post.readTime} min read</span>
          <span>•</span>
          <span>{formatDate(post.createdAt)}</span>
        </div>
        
        <Link href={`/post/${post.slug}`}>
          <h2 className={`font-bold text-gray-900 mb-3 hover:text-eco-green transition-colors cursor-pointer ${
            featured ? "text-2xl" : "text-lg"
          }`}>
            {post.title}
          </h2>
        </Link>
        
        <p className={`text-gray-600 mb-4 leading-relaxed ${
          featured ? "text-base" : "text-sm"
        }`}>
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-eco-green rounded-full flex items-center justify-center text-white font-medium text-sm">
              {post.author.avatar || post.author.username.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-gray-900">{post.author.username}</p>
              {post.author.title && (
                <p className="text-sm text-gray-500">{post.author.title}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{post.commentsCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              <span>{Math.floor(post.views / 10)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
