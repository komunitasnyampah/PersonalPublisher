import { useQuery } from "@tanstack/react-query";
import { Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { User, UserStats } from "@shared/schema";

type TopContributor = User & UserStats;

export function TopContributorsWidget() {
  const { data: contributors = [], isLoading } = useQuery<TopContributor[]>({
    queryKey: ["/api/users/top-contributors"],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            Top Contributors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="w-6 h-6 rounded-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-amber-500";
      case 2:
        return "bg-gray-400";
      case 3:
        return "bg-amber-600";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" />
          Top Contributors
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {contributors.slice(0, 5).map((contributor) => (
          <div key={contributor.id} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-eco-green rounded-full flex items-center justify-center text-white font-medium">
              {contributor.avatar || contributor.username.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{contributor.username}</p>
              <p className="text-xs text-gray-500">
                {contributor.totalPosts} posts • {contributor.followersCount.toLocaleString()} followers
              </p>
            </div>
            <div className="text-right">
              <Badge 
                className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${getRankBadgeColor(contributor.rank)}`}
              >
                {contributor.rank}
              </Badge>
            </div>
          </div>
        ))}
        
        <button className="w-full mt-4 text-eco-green font-medium text-sm hover:text-eco-emerald transition-colors">
          View All Contributors →
        </button>
      </CardContent>
    </Card>
  );
}
