import { Button } from "@/components/ui/button";
import {
  BellIcon,
  MailIcon,
  Settings2,
  LogOut,
  HelpCircle,
  Wallet2,
  Languages,
  UserCheck,
  CardSim,
  ClipboardList,
  MessageSquareText,
  BookMarked,
  Search,
  Home,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "../../components/mode-toggle";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  useLogoutMutation,
  useToggleRoleMutation,
} from "../../redux/features/auth/authApi";
import { logout } from "../../redux/features/auth/authSlice";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";

const Unavbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logoutApi] = useLogoutMutation();
  const [toggleRole, { isLoading }] = useToggleRoleMutation();
  const [open, setOpen] = useState(false);

  // Get user from Redux
  const user = useAppSelector((state) => state.auth.user);
  const role = user?.activeRole || "learner"; // fallback role
  const roles = user?.role;

  const handleSignOut = async () => {
    try {
      // Call backend logout to clear httpOnly cookies
      await logoutApi().unwrap();

      // Clear Redux state
      dispatch(logout());
      // Redirect to login page
      navigate("/signin");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleToggle = async () => {
    try {
      await toggleRole().unwrap();
    } catch (err) {
      console.error("Failed to toggle role:", err);
    }
  };

  const navLinks = {
    learner: [
      {
        label: "All Gigs",
        path: "/dashboard/learner/all-gigs",
        icon: <CardSim size={16} />,
      },
      {
        label: "Find mentor",
        path: "/dashboard/learner/search-mentor",
        icon: <Search size={16} />,
      },
      {
        label: "My Bookings",
        path: "/dashboard/learner/bookings",
        icon: <ClipboardList size={16} />,
      },
      {
        label: "Community",
        path: "/dashboard/learner/community",
        icon: <MessageSquareText size={16} />,
      },
      {
        label: "bookmarks",
        path: "/dashboard/learner/bookmarks",
        icon: <BookMarked size={16} />,
      },
    ],
    mentor: [
      {
        label: "Community",
        path: "/dashboard/mentor/community",
        icon: <MessageSquareText size={16} />,
      },
    ],
  };

  const canToggle = roles?.includes("mentor");

  return (
    <div className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50 animate-fade-in">
      <div className="w-11/12 mx-auto  py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/dashboard/mentor/overview" className="hidden sm:block ">
            <div className="flex items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  width="32"
                  height="32"
                  aria-labelledby="title"
                  role="img"
                >
                  <title id="title">MM </title>

                  <rect
                    x="0"
                    y="0"
                    width="54"
                    height="64"
                    rx="12"
                    ry="12"
                    fill="oklch(46.2% 0.09567 235.043)"
                  />

                  <path d="M12 46 V18 L20 32 L28 18 V46" fill="white" />

                  <g transform="translate(0,64) scale(1,-1)">
                    <path d="M28 46 V18 L36 32 L44 18 V46" fill="#aaaaaa" />
                  </g>
                </svg>
              </span>
              <span className="text-lg lg:text-2xl font-bold text-primary ">
                MentorMatch
              </span>
            </div>
          </Link>
          <Link to="/" className="sm:hidden  ">
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                width="42"
                height="42"
                aria-labelledby="title"
                role="img"
              >
                <title id="title">MM</title>

                <rect
                  x="0"
                  y="0"
                  width="54"
                  height="64"
                  rx="12"
                  ry="12"
                  fill="oklch(46.2% 0.09567 235.043)"
                />

                <path d="M12 46 V18 L20 32 L28 18 V46" fill="white" />

                <g transform="translate(0,64) scale(1,-1)">
                  <path d="M28 46 V18 L36 32 L44 18 V46" fill="#aaaaaa" />
                </g>
              </svg>
            </div>
          </Link>
        </div>
        {/* learner and mentor links */}
        <div className="hidden md:flex items-center gap-3 md:gap-8 justify-evenly">
          {navLinks[role].map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                ` flex flex-col items-center gap-1 ${isActive ? "font-bold text-primary" : ""
                }`
              }
            >
              <span className="">{link.icon}</span>
              <span className="text-xs "> {link.label}</span>
            </NavLink>
          ))}
        </div>

        <div className=" flex items-center gap-2 ">
          {role == "mentor" && (
            <Link to={"/dashboard/mentor/notification"}>
              <Button variant="ghost">
                <BellIcon size={20} />
              </Button>
            </Link>
          )}
          {role == "learner" && (
            <Link to={"/dashboard/learner/notification"}>
              <Button variant="ghost">
                <BellIcon size={20} />
              </Button>
            </Link>
          )}
          <MailIcon size={19} className="mx-1" />
          <ModeToggle />
          {/* dropdown manu */}
          <DropdownMenu>
            <div className="relative inline-block">
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer border-2 border-green-600 ">
                  {user?.profileImage ? (
                    <AvatarImage src={user.profileImage} />
                  ) : (
                    <AvatarFallback>
                      {user?.name
                        ? user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                        : "CN"}
                    </AvatarFallback>
                  )}
                </Avatar>
              </DropdownMenuTrigger>
              {role && (
                <span className=" absolute -bottom-0 -right-1 flex items-center justify-center w-3 h-3 text-[8px] font-bold rounded-full text-white bg-green-600">
                  {role.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            {/* dropdown content */}
            <DropdownMenuContent
              className=" flex flex-col mt-4 lg:w-80 py-2 px-2  "
              align="end"
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuGroup className="flex flex-col mt-2">
                <DropdownMenuItem className=" mb-2 flex  hover:bg-muted/50 text-muted-foreground hover:text-foreground ">
                  <NavLink
                    to={
                      role === "mentor"
                        ? "/dashboard/mentor/mentor-profile/:id"
                        : role === "learner"
                          ? "/dashboard/learner/learner-profile/:id"
                          : " "
                    }
                    className={
                      "flex flex-1 border border-primary px-4 py-2 rounded-md  items-center gap-3 text-sm font-semibold cursor-pointer  bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-primary"
                    }
                  >
                    <Avatar>
                      {user?.profileImage ? (
                        <AvatarImage src={user.profileImage} />
                      ) : (
                        <AvatarFallback>
                          {user?.name
                            ? user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                            : "CN"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    {user?.name}
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex-1 ">
                  <Button
                    onClick={handleToggle}
                    variant="outline"
                    disabled={!canToggle || isLoading}
                    className=" px-8 py-2  w-full text-primary cursor-pointer hover:text-primary"
                  >
                    <UserCheck className="text-primary" />
                    {isLoading ? "Switching..." : `Switch to ${role === "learner" ? "Mentor" : "Learner"} Mode`}
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem >
                  <Button variant="outline" onClick={() => {navigate('learner/mentor-apply')}} className="w-full">
                    Apply for mentor
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuGroup>

              <DropdownMenuGroup className="flex md:hidden my-2 flex-col">
                {navLinks[role].map((link) => (
                  <DropdownMenuItem
                    key={link.path}
                    className="py-2 hover:bg-muted/50 text-muted-foreground hover:text-foreground flex-1 "
                  >
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `w-full flex items-center text-md font-semibold gap-2 cursor-pointer text-md ${isActive ? "font-bold text-primary" : ""
                        }`
                      }
                    >
                      <span className="">{link.icon}</span>
                      <span className=" "> {link.label}</span>
                    </NavLink>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </DropdownMenuGroup>
              <DropdownMenuGroup className="flex my-2 flex-col">
                <DropdownMenuItem className="py-2 hover:bg-muted/50 text-muted-foreground hover:text-foreground flex-1 ">
                  <NavLink
                    to=""
                    className="w-full flex items-center text-md font-semibold gap-2 text-md cursor-pointer"
                  >
                    <Settings2 className="font-semibold text-md" /> Account
                    settings
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2 hover:bg-muted/50 text-muted-foreground hover:text-foreground flex-1 ">
                  <NavLink
                    to=""
                    className="w-full flex items-center text-md font-semibold gap-2 text-md cursor-pointer"
                  >
                    <Languages /> English
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2 hover:bg-muted/50 text-muted-foreground hover:text-foreground flex-1 ">
                  <NavLink
                    to=""
                    className="w-full flex items-center text-md font-semibold gap-2 text-md cursor-pointer"
                  >
                    <Wallet2 /> Billing and payments
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2 hover:bg-muted/50 text-muted-foreground hover:text-foreground flex-1 ">
                  <NavLink
                    to=""
                    className="w-full flex items-center text-md font-semibold gap-2 text-md cursor-pointer"
                  >
                    <HelpCircle /> Help and support
                  </NavLink>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="flex flex-col">
                <DropdownMenuItem className="py-2 hover:bg-muted/50 text-muted-foreground hover:text-foreground cursor-pointer">
                  <Button
                    onClick={handleSignOut}
                    variant="destructive"
                    className="px-12 w-full  flex items-center justify-center cursor-pointer "
                  >
                    <LogOut className="text-white" /> Sign out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </div>
    </div>
  );
};

export default Unavbar;
