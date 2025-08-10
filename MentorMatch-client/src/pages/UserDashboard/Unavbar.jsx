import { Button } from "@/components/ui/button";
import { User, BookOpen, Menu, X, MenuIcon, BellIcon, ChartBar, MessageCircleCodeIcon, MessageCircle, MessageSquareCodeIcon, LucideMessageSquare, MailIcon } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "../../components/mode-toggle";

const Unavbar = () => {
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

        {/* Desktop Nav */}
        <nav className="hidden md:flex md:text-xs lg:text-base  items-center space-x-4 lg:space-x-8">
          nav options here
        </nav>

        {/* for small devices */}
        <div className=" flex items-center gap-2">
          <Link to={'/dashboard/mentor/notification'}>
            <Button variant="ghost" ><BellIcon size={20} /></Button>
          </Link>
          <MailIcon size={20} className="mx-1" />
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="" align="start">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <NavLink to="" className={'flex items-center justify-between gap-3 text-sm font-semibold'}>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    username
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <NavLink to="">Profile settings</NavLink>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Button variant="outline">switch to learner</Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="flex">
                <DropdownMenuItem>
                  <Button>logout</Button>
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
