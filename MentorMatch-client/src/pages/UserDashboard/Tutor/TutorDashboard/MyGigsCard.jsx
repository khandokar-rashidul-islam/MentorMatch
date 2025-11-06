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
import { ShineBorder } from "@/components/ui/shine-border";
import Swal from "sweetalert2";

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
    Swal.fire({
      title: "Are you absolutely sure?",
      text: "This action cannot be undone. Your gig will be permanently removed.",
      icon: "warning",
      background: "oklch(46.2% 0.09567 235.043",
      color: "#ffff",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#ef4444",
      buttonsStyling: false,
      theme: "auto",
      showClass: {
        popup: "animate__animated animate__fadeInUp animate__faster",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutDown animate__faster",
      },
      customClass: {
        popup:
          "backdrop-blur-xl bg-gradient-to-b from-primary via-gray-800/40 to-gray-900/60 rounded-3xl border border-primary shadow-[0_0_40px_rgba(0,0,0,0.4)] max-w-sm p-4",
        title: "text-xl font-semibold text-white tracking-wide",
        htmlContainer: "text-gray-300 text-sm font-medium mt-2",
        confirmButton:
          "mt-4 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium shadow-lg hover:shadow-red-500/30 transition-all duration-300",
        cancelButton:
          "mt-4 bg-green-700 hover:bg-green-800 text-gray-100 px-5 py-2 rounded-lg font-medium shadow-sm transition-all duration-300 ml-2",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteGig(gig._id).unwrap();
        toast({
          title: "Gig Deleted",
          description: `"${gig.gigTitle}" has been removed.`,
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        toast({
          title: "Delete Failed",
          description: "Unable to delete gig. Please try again.",
          variant: "destructive",
        });
      }
    });
    /* if (!window.confirm(`Are you sure you want to delete "${gig.gigTitle}"?`))
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
    } */
  };

  const handleShare = () => {
    onShare?.(gig._id);
  };

  return (
    <Card
      className={`wrap-break-word flex flex-col justify-between overflow-hidden relative
          w-full h-full rounded-xl border shadow-sm transition-all duration-300 
          ${
            viewMode === "grid"
              ? "hover:shadow-lg hover:scale-[1.02]"
              : "border-l-4 hover:border-l-primary hover:shadow-md"
          }`}
    >
      <ShineBorder shineColor={["#A07CFE", "#36b1e5", "#36b1e5", "#36b1e5"]} />
      {/* === Header === */}
      <CardHeader className="pb-2 relative w-full">
        <div className="flex flex-col items-start justify-between">
          <div className="w-full flex items-center justify-between">
            <Badge
              variant="secondary"
              className={`px-1 py-0.5 text-[10px] sm:text-[11px] ${
                gig.status === "active"
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
              <p className="break-all  line-clamp-2">{gig.gigTitle}</p>
            </CardTitle>
            <CardDescription className="break-all text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
              {gig.aboutGig}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

        {/* === Content === */}
        <CardContent className="w-full flex flex-col justify-between flex-grow mt-2">
          <div className="flex sm:justify-end flex-wrap gap-2 mt-2">
            <Link to={`/dashboard/mentor/gig-details/${gig._id}`}>
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
