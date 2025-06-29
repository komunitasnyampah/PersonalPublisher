import { useQuery } from "@tanstack/react-query";
import { Users, Edit, Leaf, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { CommunityStats } from "@shared/schema";

export function CommunityStatsWidget() {
  const { data: stats, isLoading } = useQuery<CommunityStats>({
    queryKey: ["/api/community/stats"],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-eco-green" />
            Community Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-3 bg-gray-50 rounded-lg">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!stats) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-500 text-center">Failed to load community stats</p>
        </CardContent>
      </Card>
    );
  }

  const statsData = [
    {
      label: "Active Members",
      value: stats.activeMembers.toLocaleString(),
      counterValue: stats.activeMembers,
      icon: Users,
      bgColor: "bg-green-50",
      iconColor: "text-eco-green",
    },
    {
      label: "Posts This Month",
      value: stats.monthlyPosts.toString(),
      counterValue: stats.monthlyPosts,
      icon: Edit,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "CO2 Saved",
      value: stats.co2Saved,
      counterValue: parseFloat(stats.co2Saved) || 0,
      icon: Leaf,
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-eco-green" />
          Community Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {statsData.map((stat) => (
          <div key={stat.label} className={`flex items-center justify-between p-3 ${stat.bgColor} rounded-lg`}>
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p 
                className={`text-2xl font-bold ${stat.iconColor}`}
                data-counter={stat.counterValue}
              >
                {stat.value}
              </p>
            </div>
            <stat.icon className={`h-8 w-8 ${stat.iconColor}`} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
