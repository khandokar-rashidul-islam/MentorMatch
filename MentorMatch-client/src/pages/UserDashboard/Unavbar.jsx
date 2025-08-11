import { Button } from "@/components/ui/button";
import {
  User,
  BookOpen,
  Menu,
  X,
  MenuIcon,
  BellIcon,
  ChartBar,
  MessageCircleCodeIcon,
  MessageCircle,
  MessageSquareCodeIcon,
  LucideMessageSquare,
  MailIcon,
  Settings2,
  LogOut,
  HelpCircle,
  Wallet2,
  Languages,
  UserCheck,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "../../components/mode-toggle";

import { useContext } from "react";
import { RoleContext } from "../../context/RoleContext";

const Unavbar = () => {




  
  const { role, toggleRole } = useContext(RoleContext);
  const navigate = useNavigate();

  const handleToggle = () => {
    toggleRole();

    // Navigate to the appropriate dashboard route
    if (role === "learner") {
      navigate("/dashboard/mentor/overview"); // or any default mentor route
    } else {
      navigate("/dashboard/learner/all-gigs"); // or any default learner route
    }
  };


  const navLinks = {
    learner: [
      { label: "All Gigs", path: "/dashboard/learner/all-gigs" },
      { label: "My Bookings", path: "/dashboard/learner/bookings" },
      { label: "Community", path: "/dashboard/learner/community" },
      { label: "Find mentor", path: "/dashboard/learner/search-mentor" },
      { label: "bookmarks", path: "/dashboard/learner/bookmarks" },
    ],
    mentor: [
      { label: "Home", path: "/dashboard/mentor/overview" },
      { label: "Community", path: "/dashboard/mentor/community" },
    ],
  };

  return (
    <div className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50 animate-fade-in">
      <div className="w-11/12 mx-auto  py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center justify-center space-x-2 hover-scale transition-all duration-300"
        >
          <div className="flex items-end gap-2">
            <BookOpen className="hidden h-6 w-6 text-primary sm:block" />
            <span className="text-lg lg:text-2xl font-bold text-primary ">
              MentorMatch
            </span>
          </div>
        </Link>
        {/* learner and mentor links */}
        <div className="flex items-center gap-2 justify-between">
          {navLinks[role].map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `${isActive ? "font-bold text-primary" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* for small devices */}
        <div className=" flex items-center gap-2 ">
          <Link to={"/dashboard/mentor/notification"}>
            <Button variant="ghost">
              <BellIcon size={20} />
            </Button>
          </Link>
          <MailIcon size={19} className="mx-1" />
          <ModeToggle />
          {/* dropdown manu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            {/* dropdown content */}
            <DropdownMenuContent
              className=" flex flex-col mt-4 lg:w-80 py-2 px-2  "
              align="end"
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuGroup className="flex flex-col mt-2">
                <DropdownMenuItem className=" mb-2 flex  hover:bg-muted/50 text-muted-foreground hover:text-foreground ">
                  <NavLink
                    to=""
                    className={
                      "flex flex-1 border border-primary px-4 py-2 rounded-md  items-center gap-3 text-sm font-semibold cursor-pointer  bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-primary"
                    }
                  >
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    Khandokar Rashidul Islam
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex-1 ">
                  <Button
                    onClick={handleToggle}
                    variant="outline"
                    className=" px-8 py-2  w-full text-primary cursor-pointer hover:text-primary"
                  >
                    <UserCheck className="text-primary" /> Switch to{" "}
                    {role === "learner" ? "Mentor" : "Learner"} Mode
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
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
