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
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "../mode-toggle";


const Navbar = () => {
  return (
    <div className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50 animate-fade-in">
      <div className="w-11/12 mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center justify-center space-x-2 hover-scale transition-all duration-300"
        >
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

        {/* Desktop Nav */}
        <nav className="hidden md:flex md:text-xs lg:text-base  items-center space-x-4 lg:space-x-8">
          <NavLink
            to="/"
            className="text-muted-foreground hover:text-foreground transition-all duration-300"
          >
            Features
          </NavLink>
          <NavLink
            to="/"
            className="text-muted-foreground hover:text-foreground transition-all duration-300"
          >
            How It Works
          </NavLink>
          <NavLink
            to="/"
            className="text-muted-foreground hover:text-foreground transition-all duration-300"
          >
            About
          </NavLink>
        </nav>
        {/* Desktop Actions */}
        <div className="hidden md:flex  items-center space-x-2">
          <ModeToggle />
          <Link to="/signin">
            <Button
              variant="ghost"
              size="sm"
              className="hover-scale transition-all duration-300 cursor-pointer hover:border hover:text-primary text-primary"
            >
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </Link>
          <Link to="/registration">
            <Button
              variant="ghost"
              size="sm"
              className="hover-scale transition-all duration-300 cursor-pointer hover:border text-primary hover:text-primary "
            >
              Get Started
            </Button>
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
                  <NavLink to="/">Features</NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <NavLink to="/">How It Works</NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <NavLink to="/">About</NavLink>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="flex">
                <DropdownMenuItem>
                  <Link to="/signin">
                    <Button
                      variant=""
                      size="sm"
                      className="hover-scale transition-all duration-300"
                    >
                      <User className="h-4 w-4 mr-2 text-secondary" />
                      Sign In
                    </Button>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/registration">
                    <Button
                      variant="default"
                      size="sm"
                      className="hover-scale transition-all duration-300"
                    >
                      Get Started
                    </Button>
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

export default Navbar;
