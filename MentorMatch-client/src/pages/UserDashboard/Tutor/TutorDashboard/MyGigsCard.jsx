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
  Clock,
  Users,
  Eye,
  Edit,
  MoreHorizontal,
  Share2,
  Pause,
  Play,
  Trash2,
} from "lucide-react";
import { Link } from "react-router";
import { toast } from "../../../../hooks/use-toast";
import {
  useDeleteGigMutation,
  useUpdateGigMutation,
} from "../../../../redux/features/mentor/mentor.api";


export default function MyGigsCard({ gig, viewMode, onShare }) {
  const [deleteGig, { isLoading: deleting }] = useDeleteGigMutation();
  const [updateGig, { isLoading: updating }] = useUpdateGigMutation();

  const handleStatusToggle = async () => {
    try {
      const newStatus = gig.status === "active" ? "paused" : "active";
      await updateGig({
        id: gig._id,
        gigData: { status: newStatus },
      }).unwrap();

      toast({
        title: "Status Updated",
        description: `Gig "${gig.gigTitle}" is now ${newStatus}.`,
      });
    } catch {
      toast({
        title: "Update Failed",
        description: "Something went wrong while updating the status.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${gig.gigTitle}"?`))
      return;

    try {
      await deleteGig(gig._id).unwrap();
      toast({
        title: "Gig Deleted",
        description: `"${gig.gigTitle}" has been removed.`,
      });
    } catch {
      toast({
        title: "Delete Failed",
        description: "Unable to delete gig. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = () => {
    onShare?.(gig._id);
  };

  return (

      <Card
        className={`wrap-break-word flex flex-col justify-between w-full h-full rounded-xl border shadow-sm transition-all duration-300 
          ${viewMode === "grid"
          ? "hover:shadow-lg hover:scale-[1.02]"
          : "border-l-4 hover:border-l-primary hover:shadow-md"
          }`}
      >
        {/* === Header === */}
        <CardHeader className="pb-2 relative w-full">
          <div className="flex flex-col items-start justify-between">
            <div className="w-full flex items-center justify-between">
              <Badge
                variant="secondary"
                className={`px-1 py-0.5 text-[10px] sm:text-[11px] ${gig.status === "active"
                  ? "text-green-700"
                  : "text-muted-foreground"
                  }`}
              >
                {gig.status === "active" ? "Active" : "Inactive"}
              </Badge>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 cursor-pointer"
                    disabled={deleting || updating}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={handleStatusToggle}>
                    {gig.status === "active" ? (
                      <Pause className="w-4 h-4 mr-2" />
                    ) : (
                      <Play className="w-4 h-4 mr-2" />
                    )}
                    {updating
                      ? "Updating..."
                      : gig.status === "active"
                        ? "Pause"
                        : "Activate"}
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={handleShare}>
                    <Share2 className="w-4 h-4 mr-2" /> Share
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={handleDelete}
                    className="text-red-600"
                  >
                    {deleting ? (
                      "Deleting..."
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="w-full flex-1 flex flex-col gap-6">
              <CardTitle className="mt-0 font-semibold text-xl ">
                <p className="break-all  line-clamp-2">
                  {gig.gigTitle}
                </p>

              </CardTitle>
              <CardDescription className="break-all text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                {gig.aboutGig}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        {/* === Content === */}
        <CardContent className="w-full flex flex-col justify-between flex-grow mt-2">
          {/*         <div className="flex flex-wrap gap-2 text-xs mb-3">
          {gig.relatedTopics.slice(0, 3).map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="rounded-full px-2 py-1 text-xs sm:text-sm"
            >
              {skill}
            </Badge>
          ))}
          {gig.relatedTopics.length > 3 && (
            <Badge
              variant="outline"
              className="rounded-full px-3 py-1 text-xs sm:text-sm"
            >
              +{gig.relatedTopics.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between flex-wrap text-sm py-2 text-gray-500">
          <div className="flex items-center flex-wrap gap-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{gig.duration || "30"} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{gig.students || "44"}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap text-right">
            <div className="text-lg font-bold text-primary">
              ${gig.plans.instant.price}
            </div>
            <div className="text-xs text-gray-400">per session</div>
          </div>
        </div> */}

          <div className="flex sm:justify-end flex-wrap gap-2 mt-2">
            <Link to={`/dashboard/mentor/gig/${gig._id}`}>
              <Button variant="outline" size="sm" className="hover:scale-105">
                <Eye className="w-4 h-4 mr-1" /> View
              </Button>
            </Link>
            <Link to={`/dashboard/mentor/gig-edit/${gig._id}`}>
              <Button variant="default" size="sm" className="hover:scale-105">
                <Edit className="w-4 h-4 mr-1" /> Edit
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
  );
}
