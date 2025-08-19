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
} from "lucide-react";


const mockBookings = [
  {
    id: "1",
    studentName: "Emma Johnson",
    studentAvatar: "EJ",
    planType: "Intensive Weekly",
    subject: "Mathematics",
    date: "2024-01-25",
    time: "14:00",
    duration: 60,
    status: "upcoming",
    amount: 50,
    sessionType: "video",
    notes: "Focus on calculus derivatives",
  },
  {
    id: "2",
    studentName: "Michael Chen",
    studentAvatar: "MC",
    planType: "Standard Monthly",
    subject: "Physics",
    date: "2024-01-24",
    time: "16:30",
    duration: 45,
    status: "completed",
    amount: 75,
    sessionType: "video",
  },
  {
    id: "3",
    studentName: "Sarah Williams",
    studentAvatar: "SW",
    planType: "Instant Session",
    subject: "Chemistry",
    date: "2024-01-26",
    time: "10:00",
    duration: 30,
    status: "pending",
    amount: 25,
    sessionType: "chat",
    notes: "Quick question about organic compounds",
  },
  {
    id: "4",
    studentName: "David Brown",
    studentAvatar: "DB",
    planType: "Premium Monthly",
    subject: "Biology",
    date: "2024-01-23",
    time: "15:00",
    duration: 90,
    status: "cancelled",
    amount: 100,
    sessionType: "video",
  },
  {
    id: "5",
    studentName: "Lisa Anderson",
    studentAvatar: "LA",
    planType: "Basic Weekly",
    subject: "Mathematics",
    date: "2024-01-27",
    time: "13:00",
    duration: 60,
    status: "upcoming",
    amount: 40,
    sessionType: "video",
  },
  {
    id: "6",
    studentName: "John Smith",
    studentAvatar: "JS",
    planType: "Elite Monthly",
    subject: "Computer Science",
    date: "2024-01-28",
    time: "11:00",
    duration: 120,
    status: "upcoming",
    amount: 150,
    sessionType: "video",
    notes: "Data structures and algorithms",
  },
  {
    id: "7",
    studentName: "Maria Rodriguez",
    studentAvatar: "MR",
    planType: "Instant Session",
    subject: "Spanish",
    date: "2024-01-22",
    time: "17:00",
    duration: 30,
    status: "completed",
    amount: 25,
    sessionType: "chat",
  },
  {
    id: "8",
    studentName: "James Wilson",
    studentAvatar: "JW",
    planType: "Intensive Weekly",
    subject: "History",
    date: "2024-01-29",
    time: "09:00",
    duration: 60,
    status: "pending",
    amount: 50,
    sessionType: "video",
    notes: "World War II analysis",
  },
  {
    id: "9",
    studentName: "Jennifer Lee",
    studentAvatar: "JL",
    planType: "Standard Monthly",
    subject: "English Literature",
    date: "2024-01-30",
    time: "14:30",
    duration: 75,
    status: "upcoming",
    amount: 60,
    sessionType: "video",
  },
  {
    id: "10",
    studentName: "Robert Davis",
    studentAvatar: "RD",
    planType: "Premium Monthly",
    subject: "Economics",
    date: "2024-01-21",
    time: "16:00",
    duration: 90,
    status: "completed",
    amount: 100,
    sessionType: "video",
    notes: "Macroeconomic principles",
  },
  {
    id: "11",
    studentName: "Amanda Taylor",
    studentAvatar: "AT",
    planType: "Basic Weekly",
    subject: "Art History",
    date: "2024-01-31",
    time: "12:00",
    duration: 45,
    status: "upcoming",
    amount: 35,
    sessionType: "chat",
  },
  {
    id: "12",
    studentName: "Kevin Zhang",
    studentAvatar: "KZ",
    planType: "Instant Session",
    subject: "Statistics",
    date: "2024-01-20",
    time: "19:00",
    duration: 30,
    status: "completed",
    amount: 25,
    sessionType: "video",
  },
];

const Orders = () => {
  const [bookings, setBookings] = useState(mockBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [itemsToShow, setItemsToShow] = useState(5);


  const ITEMS_PER_LOAD = 5;

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

  const updateBookingStatus = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
    );
    // toast({
    //   title: "Booking Updated",
    //   description: `Booking status changed to ${newStatus}`,
    // });
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

    const Icon = icons[status];

    return (
      <Badge className={variants[status]}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
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
  return (
    <div className="pt-20 w-11/12 mx-auto">
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
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                  <span className="text-sm font-medium text-primary">
                                    {booking.studentAvatar}
                                  </span>
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
                                ${booking.amount}
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
                                  {booking.sessionType === "video" &&
                                    booking.status === "upcoming" && (
                                      <DropdownMenuItem>
                                        <Video className="w-4 h-4 mr-2" />
                                        Join Video Call
                                      </DropdownMenuItem>
                                    )}
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
