import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Star,
  Clock,
  Users,
  Eye,
  Edit,
  MoreHorizontal,
  Share2,
  Copy,
  Pause,
  Play,
  Trash2,
} from "lucide-react";

function MyGigsCard({
  gig,
  viewMode,
  onStatusToggle,
  onShare,
  onDuplicate,
  onDelete,
}) {
  return (
    <Card
      className={`flex flex-col justify-between h-full rounded-xl border shadow-sm transition-all duration-300 ${
        viewMode === "grid"
          ? "hover:shadow-lg hover:scale-[1.02]"
          : "border-l-4 hover:border-l-primary hover:shadow-md"
      }`}
    >
      <CardHeader className="pb-2 relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Badge
              variant="secondary"
              className={`px-1 py-0.5 text-[10px] sm:text-[11px]${
                gig.status === "active"
                  ? " text-green-700"
                  : " text-muted-foreground "
              }`}
            >
              {gig.status === "active" ? "Active" : "Inactive"}
            </Badge>
            <CardTitle className="mt-0 font-semibold text-xl line-clamp-2">
              {gig.title}
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
              {gig.description}
            </CardDescription>
          </div>

          <div className="flex flex-col items-end gap-1 ml-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1  cursor-pointer"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => onStatusToggle(gig.id)}>
                  {gig.status === "active" ? (
                    <Pause className="w-4 h-4 mr-2" />
                  ) : (
                    <Play className="w-4 h-4 mr-2" />
                  )}
                  {gig.status === "active" ? "Pause" : "Activate"}
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => onShare(gig.id)}>
                  <Share2 className="w-4 h-4 mr-2" /> Share
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => onDuplicate(gig.id)}>
                  <Copy className="w-4 h-4 mr-2" /> Duplicate
                </DropdownMenuItem>

                {/* Delete button */}
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => onDelete(gig)}
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col justify-between flex-grow mt-2">
        <div className="flex flex-wrap gap-2 text-xs mb-3">
          {gig.skills.slice(0, 3).map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="rounded-full px-2 py-1 text-xs sm:text-sm"
            >
              {skill}
            </Badge>
          ))}
          {gig.skills.length > 3 && (
            <Badge
              variant="outline"
              className="rounded-full px-3 py-1 text-xs sm:text-sm"
            >
              +{gig.skills.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-sm py-2 text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{gig.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{gig.students}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-right">
            <div className="text-lg font-bold text-primary">${gig.price}</div>
            <div className="text-xs text-gray-400">per session</div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-2">
          <Button variant="outline" size="sm" className="hover:scale-105">
            <Eye className="w-4 h-4 mr-1" /> View
          </Button>
          <Button variant="default" size="sm" className="hover:scale-105">
            <Edit className="w-4 h-4 mr-1" /> Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default MyGigsCard;
