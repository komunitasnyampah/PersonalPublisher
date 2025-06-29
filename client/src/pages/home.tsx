import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PostCard } from "@/components/blog/post-card";
import { CommunityStatsWidget } from "@/components/dashboard/community-stats";
import { TopContributorsWidget } from "@/components/dashboard/top-contributors";
import { RecentActivityWidget } from "@/components/dashboard/recent-activity";
import { Skeleton } from "@/components/ui/skeleton";
import { getCategoryColor, getTagColor } from "@/lib/utils";
import type { PostWithDetails, Category, Tag } from "@shared/schema";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("latest");

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: tags = [] } = useQuery<Tag[]>({
    queryKey: ["/api/tags"],
  });

  const { data: posts = [], isLoading: postsLoading } = useQuery<PostWithDetails[]>({
    queryKey: ["/api/posts", { categoryId: selectedCategory }],
    queryFn: () => {
      const params = new URLSearchParams();
      if (selectedCategory) params.append("category", selectedCategory.toString());
      return fetch(`/api/posts?${params}`).then(res => res.json());
    },
  });

  const featuredPost = posts.find(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="eco-gradient text-white py-16" id="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div id="hero-content">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight" id="hero-title">
                Membangun Masa Depan Berkelanjutan Bersama
              </h1>
              <p className="text-xl text-green-100 mb-8 leading-relaxed" id="hero-description">
                Bergabunglah dengan komunitas Nyampah Bersama dalam mengadvokasi lingkungan, energi terbarukan, dan teknologi desentralisasi untuk mendorong perubahan positif.
              </p>
              <div className="flex flex-col sm:flex-row gap-4" id="hero-buttons">
                <Button 
                  asChild
                  className="bg-white text-eco-green hover:bg-gray-100"
                  id="join-community-btn"
                >
                  <Link href="/dashboard">Bergabung Komunitas</Link>
                </Button>
                <Button 
                  variant="outline" 
                  asChild
                  className="border-2 border-white text-white hover:bg-white hover:text-eco-green"
                  id="start-writing-btn"
                >
                  <Link href="/write">Mulai Menulis</Link>
                </Button>
              </div>
            </div>
            <div className="relative" id="hero-image-container">
              <img 
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Community garden with diverse people working together" 
                className="rounded-2xl shadow-2xl w-full h-auto"
                id="hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white shadow-sm border-b border-gray-200" id="category-filter-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2" id="category-buttons">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className={selectedCategory === null ? "bg-eco-green hover:bg-eco-emerald" : ""}
                id="btn-all-posts"
                data-category="all"
              >
                Semua Post
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id ? "bg-eco-green hover:bg-eco-emerald" : ""}
                  id={`btn-category-${category.slug}`}
                  data-category={category.slug}
                >
                  {category.name}
                </Button>
              ))}
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500" id="sort-container">
              <select 
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-eco-green"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                id="sort-select"
              >
                <option value="latest">Terbaru</option>
                <option value="popular">Terpopuler</option>
                <option value="commented">Paling Banyak Komentar</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="main-content">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog Posts */}
          <div className="lg:col-span-2 space-y-8" id="posts-container">
            {postsLoading ? (
              <div className="space-y-6" id="posts-loading">
                <div className="bg-white rounded-2xl p-6">
                  <Skeleton className="h-64 w-full mb-4" />
                  <Skeleton className="h-8 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-xl p-5">
                    <Skeleton className="h-48 w-full mb-4" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* Featured Post */}
                {featuredPost && (
                  <div id="featured-post">
                    <PostCard post={featuredPost} featured={true} />
                  </div>
                )}

                {/* Regular Posts Grid */}
                {regularPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="regular-posts-grid">
                    {regularPosts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12" id="no-posts-message">
                    <p className="text-gray-500 text-lg">Belum ada post ditemukan.</p>
                    <Button asChild className="mt-4 bg-eco-green hover:bg-eco-emerald" id="btn-write-first-post">
                      <Link href="/write">Tulis post pertama</Link>
                    </Button>
                  </div>
                )}

                {/* Load More Button */}
                {regularPosts.length > 0 && (
                  <div className="text-center pt-8" id="load-more-container">
                    <Button className="bg-eco-green hover:bg-eco-emerald" id="btn-load-more">
                      Muat Lebih Banyak Post
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6" id="sidebar">
            <div id="community-stats-widget">
              <CommunityStatsWidget />
            </div>
            <div id="top-contributors-widget">
              <TopContributorsWidget />
            </div>
            <div id="recent-activity-widget">
              <RecentActivityWidget />
            </div>

            {/* Popular Tags */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6" id="popular-tags-widget">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2" id="popular-tags-title">
                <span className="text-gray-400">#</span>
                Tag Populer
              </h3>
              <div className="flex flex-wrap gap-2" id="tags-container">
                {tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="secondary"
                    className={`cursor-pointer hover:opacity-80 transition-opacity ${getTagColor(tag.name)}`}
                    id={`tag-${tag.slug}`}
                  >
                    #{tag.slug}
                  </Badge>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
