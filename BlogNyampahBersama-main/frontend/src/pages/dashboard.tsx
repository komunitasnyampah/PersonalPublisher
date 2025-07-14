import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Plus, TrendingUp, Users, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CommunityStatsWidget } from "@/components/dashboard/community-stats";
import { TopContributorsWidget } from "@/components/dashboard/top-contributors";
import { RecentActivityWidget } from "@/components/dashboard/recent-activity";
import { PostCard } from "@/components/blog/post-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { PostWithDetails } from "@shared/schema";

export default function Dashboard() {
  const { data: recentPosts = [], isLoading } = useQuery<PostWithDetails[]>({
    queryKey: ["/api/posts", { limit: 6 }],
    queryFn: () => fetch("/api/posts?limit=6").then(res => res.json()),
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Community Dashboard</h1>
              <p className="mt-2 text-gray-600">
                Monitor community activity, engagement, and growth metrics
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button asChild className="bg-eco-green hover:bg-eco-emerald">
                <Link href="/write">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Post
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Dashboard Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <TrendingUp className="h-8 w-8 text-eco-green" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Total Engagement</p>
                      <p className="text-2xl font-bold text-gray-900">12.4k</p>
                      <p className="text-sm text-green-600">↗ +12% from last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">New Members</p>
                      <p className="text-2xl font-bold text-gray-900">284</p>
                      <p className="text-sm text-green-600">↗ +8% from last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Award className="h-8 w-8 text-amber-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Impact Score</p>
                      <p className="text-2xl font-bold text-gray-900">9.2</p>
                      <p className="text-sm text-green-600">↗ +0.3 from last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Posts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Recent Community Posts
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/">View All</Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="space-y-3">
                        <Skeleton className="h-32 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    ))}
                  </div>
                ) : recentPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recentPosts.slice(0, 4).map((post) => (
                      <div key={post.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {post.category.name}
                          </Badge>
                          <span className="text-xs text-gray-500">{post.readTime} min read</span>
                        </div>
                        <Link href={`/post/${post.slug}`}>
                          <h3 className="font-semibold text-gray-900 hover:text-eco-green transition-colors cursor-pointer line-clamp-2">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                          <span>By {post.author.username}</span>
                          <div className="flex gap-3">
                            <span>❤️ {post.likes}</span>
                            <span>💬 {post.commentsCount}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No recent posts available.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Environmental Impact Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-eco-green">1.2k</div>
                    <div className="text-sm text-gray-600">Tons CO2 Saved</div>
                    <div className="text-xs text-green-600 mt-1">+15% this month</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">847</div>
                    <div className="text-sm text-gray-600">Trees Planted</div>
                    <div className="text-xs text-blue-600 mt-1">+23% this month</div>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-lg">
                    <div className="text-3xl font-bold text-amber-600">2.8M</div>
                    <div className="text-sm text-gray-600">kWh Renewable</div>
                    <div className="text-xs text-amber-600 mt-1">+31% this month</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <CommunityStatsWidget />
            <TopContributorsWidget />
            <RecentActivityWidget />
          </div>
        </div>
      </div>
    </div>
  );
}
