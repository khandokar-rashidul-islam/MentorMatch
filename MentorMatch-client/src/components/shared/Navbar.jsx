import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, BookOpen, Menu, X } from "lucide-react";
import { Link } from "react-router";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50 animate-fade-in">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 hover-scale transition-all duration-300"
        >
          <BookOpen className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-foreground">
            MentorMatch
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground transition-all duration-300"
          >
            Features
          </Link>
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground transition-all duration-300"
          >
            How It Works
          </Link>
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground transition-all duration-300"
          >
            Pricing
          </Link>
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground transition-all duration-300"
          >
            About
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <Link to="/">
            <Button
              variant="ghost"
              size="sm"
              className="hover-scale transition-all duration-300"
            >
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </Link>
          <Link to="/">
            <Button
              variant="hero"
              size="sm"
              className="hover-scale transition-all duration-300"
            >
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <nav className="flex flex-col space-y-3">
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="flex flex-col space-y-2 pt-4">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="hero" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
