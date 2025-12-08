import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  User,
  MoreVertical,
  Search,
  Filter,
  Video,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock4,
  Loader2,
} from "lucide-react";
import { useGetMentorOrdersQuery } from "@/redux/features/bookings/payment.api";
import { useNavigate } from "react-router";
import { format } from "date-fns"; // Make sure you have date-fns or use native Intl

const Orders = () => {
  const navigate = useNavigate();
  const { data: apiData, isLoading } = useGetMentorOrdersQuery();

  // State
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [itemsToShow, setItemsToShow] = useState(5);

  const ITEMS_PER_LOAD = 5;

  // --- 1. Map API Data to UI Structure ---
  useEffect(() => {
    if (apiData?.data) {
      const mappedBookings = apiData.data.map((order) => {
        const student = order.learner; // User object populated
        const profile = student?.learnerProfile || {};
        const dateObj = new Date(order.startDate);

        return {
          id: order._id,
          // UI specific fields
          studentName: profile.name || student.email || "Unknown",
          studentAvatar: (profile.name || student.email || "U")
            .charAt(0)
            .toUpperCase(),
          studentImage: profile.profileImage, // Add if you want to show real image
          planType: order.planType, // "instant", "weekly"
          subject: order.gig?.gigTitle || "Untitled Gig",
          date: format(dateObj, "yyyy-MM-dd"), // "2024-01-25"
          time: format(dateObj, "HH:mm"), // "14:00"
          duration: order.durationPerSessionMinutes,
          // Map backend status to UI status (pending, upcoming, completed, cancelled)
          status: order.orderStatus || "pending",
          amount: order.price,
          sessionType: "video", // Default for your app
          meetingId: order.session?.meetingId, // Important for joining
          originalOrder: order, // Keep ref to full object if needed
        };
      });
      setBookings(mappedBookings);
    }
  }, [apiData]);

  // --- 2. Client Side Filters (Existing Logic Intact) ---
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.planType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    const matchesTab = activeTab === "all" || booking.status === activeTab;

    return matchesSearch && matchesStatus && matchesTab;
  });

  const displayedBookings = filteredBookings.slice(0, itemsToShow);
  const hasMoreItems = filteredBookings.length > itemsToShow;

  const loadMoreItems = () => {
    setItemsToShow((prev) => prev + ITEMS_PER_LOAD);
  };

  const resetPagination = () => {
    setItemsToShow(ITEMS_PER_LOAD);
  };

  useEffect(() => {
    resetPagination();
  }, [searchTerm, statusFilter, activeTab]);

  // --- 3. Actions ---
  const handleJoinSession = (meetingId) => {
    if (meetingId) {
      navigate(`/meeting/${meetingId}`);
    } else {
      alert("Session hasn't been generated yet.");
    }
  };

  // Only updates local state for UI demo purposes
  const updateBookingStatus = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
    );
  };

  const getStatusBadge = (status) => {
    const variants = {
      upcoming: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      completed: "bg-green-100 text-green-800 hover:bg-green-200",
      cancelled: "bg-red-100 text-red-800 hover:bg-red-200",
      pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    };

    const icons = {
      upcoming: Clock4,
      completed: CheckCircle,
      cancelled: XCircle,
      pending: Clock,
    };

    const Icon = icons[status] || Clock;
    const variant = variants[status] || variants.pending;

    return (
      <Badge className={variant}>
        <Icon className="w-3 h-3 mr-1" />
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Pending"}
      </Badge>
    );
  };

  const getBookingStats = () => {
    return {
      total: bookings.length,
      upcoming: bookings.filter((b) => b.status === "upcoming").length,
      completed: bookings.filter((b) => b.status === "completed").length,
      pending: bookings.filter((b) => b.status === "pending").length,
      revenue: bookings
        .filter((b) => b.status === "completed")
        .reduce((sum, b) => sum + b.amount, 0),
    };
  };

  const stats = getBookingStats();

  if (isLoading) {
    return (
      <div className="pt-20 w-11/12 mx-auto flex justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin" /> Loading orders...
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 mb-4 w-11/12 mx-auto">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Bookings
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stats.total}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {stats.upcoming}
                  </p>
                </div>
                <Clock4 className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.completed}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {stats.pending}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <CardTitle>All Bookings</CardTitle>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All ({bookings.length})</TabsTrigger>
                <TabsTrigger value="upcoming">
                  Upcoming ({stats.upcoming})
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Pending ({stats.pending})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed ({stats.completed})
                </TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Plan & Subject</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBookings.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={8}
                            className="text-center py-8 text-muted-foreground"
                          >
                            No bookings found
                          </TableCell>
                        </TableRow>
                      ) : (
                        displayedBookings.map((booking) => (
                          <TableRow
                            key={booking.id}
                            className="hover:bg-muted/50"
                          >
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                                  {booking.studentImage ? (
                                    <img
                                      src={booking.studentImage}
                                      alt=""
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <span className="text-sm font-medium text-primary">
                                      {booking.studentAvatar}
                                    </span>
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium text-foreground">
                                    {booking.studentName}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium text-foreground">
                                  {booking.planType}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {booking.subject}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium text-foreground">
                                  {booking.date}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {booking.time}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">
                                  {booking.duration} min
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-1">
                                {booking.sessionType === "video" ? (
                                  <Video className="w-4 h-4 text-blue-600" />
                                ) : (
                                  <MessageSquare className="w-4 h-4 text-green-600" />
                                )}
                                <span className="text-sm capitalize">
                                  {booking.sessionType}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(booking.status)}
                            </TableCell>
                            <TableCell>
                              <span className="font-medium text-foreground">
                                {booking.amount} ৳
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="end"
                                  className="w-48"
                                >
                                  {/* --- NEW: Video Call Action --- */}
                                  {booking.status === "upcoming" && (
                                    <>
                                      <DropdownMenuItem
                                        onClick={() =>
                                          handleJoinSession(booking.meetingId)
                                        }
                                        className="text-blue-600 focus:text-blue-700 focus:bg-blue-50"
                                      >
                                        <Video className="w-4 h-4 mr-2" />
                                        Join Video Call
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                    </>
                                  )}

                                  {booking.status === "pending" && (
                                    <>
                                      <DropdownMenuItem
                                        onClick={() =>
                                          updateBookingStatus(
                                            booking.id,
                                            "upcoming"
                                          )
                                        }
                                      >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Accept Booking
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() =>
                                          updateBookingStatus(
                                            booking.id,
                                            "cancelled"
                                          )
                                        }
                                      >
                                        <XCircle className="w-4 h-4 mr-2" />
                                        Decline Booking
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                  {booking.status === "upcoming" && (
                                    <>
                                      <DropdownMenuItem
                                        onClick={() =>
                                          updateBookingStatus(
                                            booking.id,
                                            "completed"
                                          )
                                        }
                                      >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Mark Complete
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() =>
                                          updateBookingStatus(
                                            booking.id,
                                            "cancelled"
                                          )
                                        }
                                      >
                                        <XCircle className="w-4 h-4 mr-2" />
                                        Cancel Session
                                      </DropdownMenuItem>
                                    </>
                                  )}

                                  <DropdownMenuSeparator />

                                  <DropdownMenuItem>
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    Message Student
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <User className="w-4 h-4 mr-2" />
                                    View Student Profile
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Load More Button */}
                {hasMoreItems && (
                  <div className="flex justify-center mt-6">
                    <Button
                      variant="outline"
                      onClick={loadMoreItems}
                      className="px-8"
                    >
                      Load More ({filteredBookings.length - itemsToShow}{" "}
                      remaining)
                    </Button>
                  </div>
                )}

                {/* Showing results info */}
                {filteredBookings.length > 0 && (
                  <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
                    <p>
                      Showing {displayedBookings.length} of{" "}
                      {filteredBookings.length} bookings
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Orders;
