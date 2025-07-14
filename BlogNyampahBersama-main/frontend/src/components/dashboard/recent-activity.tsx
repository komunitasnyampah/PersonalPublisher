import { useQuery } from "@tanstack/react-query";
import { Clock, Plus, MessageCircle, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";

interface Activity {
  type: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
}

export function RecentActivityWidget() {
  const { data: activities = [], isLoading } = useQuery<Activity[]>({
    queryKey: ["/api/community/recent-activity"],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-400" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "post":
        return Plus;
      case "comment":
        return MessageCircle;
      case "like":
        return Heart;
      default:
        return Clock;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "post":
        return "bg-green-100 text-eco-green";
      case "comment":
        return "bg-blue-100 text-blue-500";
      case "like":
        return "bg-amber-100 text-amber-500";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-gray-400" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = getActivityIcon(activity.type);
          return (
            <div key={index} className="flex gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">
                  <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                  {activity.target && (
                    <span className="text-gray-600">"{activity.target.length > 30 ? 
                      activity.target.substring(0, 30) + "..." : 
                      activity.target}"</span>
                  )}
                </p>
                <p className="text-xs text-gray-500">{formatDate(activity.timestamp)}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
