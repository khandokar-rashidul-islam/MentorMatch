import { Button } from "@/components/ui/button";
import { User, BookOpen, Menu, X, MenuIcon } from "lucide-react";
import { Link, NavLink } from "react-router";
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
import { ModeToggle } from "../../components/mode-toggle";

const Unavbar = () => {
  return (
    <div className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50 animate-fade-in">
      <div className="w-11/12 mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center justify-center space-x-2 hover-scale transition-all duration-300"
        >
          <div className="flex items-end gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl lg:text-2xl font-bold text-primary">
              MentorMatch
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex md:text-xs lg:text-base  items-center space-x-4 lg:space-x-8">
            nav options here
        </nav>
        {/* Desktop Actions */}
        <div className="hidden md:flex  items-center space-x-2">
          <ModeToggle />
          <Link to="/registration">
                profile avtar here
          </Link>
        </div>
        {/* for small devices */}
        <div className="md:hidden flex gap-2">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MenuIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" md:hidden" align="start">
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <NavLink to="/">Mobile nav options here</NavLink>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="flex">
                <DropdownMenuItem>
                  <Link to="/registration">
                            here other options
                  </Link>
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
