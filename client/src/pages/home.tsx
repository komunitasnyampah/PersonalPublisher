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
      <section className="eco-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Building a Sustainable Future Together
              </h1>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">
                Join our community of environmental advocates, renewable energy enthusiasts, and decentralized technology pioneers sharing knowledge and driving change.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild
                  className="bg-white text-eco-green hover:bg-gray-100"
                >
                  <Link href="/dashboard">Join Our Community</Link>
                </Button>
                <Button 
                  variant="outline" 
                  asChild
                  className="border-2 border-white text-white hover:bg-white hover:text-eco-green"
                >
                  <Link href="/write">Start Writing</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Community garden with diverse people working together" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className={selectedCategory === null ? "bg-eco-green hover:bg-eco-emerald" : ""}
              >
                All Posts
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id ? "bg-eco-green hover:bg-eco-emerald" : ""}
                >
                  {category.name}
                </Button>
              ))}
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <select 
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-eco-green"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="commented">Most Commented</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog Posts */}
          <div className="lg:col-span-2 space-y-8">
            {postsLoading ? (
              <div className="space-y-6">
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
                  <PostCard post={featuredPost} featured={true} />
                )}

                {/* Regular Posts Grid */}
                {regularPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {regularPosts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No posts found.</p>
                    <Button asChild className="mt-4 bg-eco-green hover:bg-eco-emerald">
                      <Link href="/write">Write the first post</Link>
                    </Button>
                  </div>
                )}

                {/* Load More Button */}
                {regularPosts.length > 0 && (
                  <div className="text-center pt-8">
                    <Button className="bg-eco-green hover:bg-eco-emerald">
                      Load More Posts
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <CommunityStatsWidget />
            <TopContributorsWidget />
            <RecentActivityWidget />

            {/* Popular Tags */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-gray-400">#</span>
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="secondary"
                    className={`cursor-pointer hover:opacity-80 transition-opacity ${getTagColor(tag.name)}`}
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
