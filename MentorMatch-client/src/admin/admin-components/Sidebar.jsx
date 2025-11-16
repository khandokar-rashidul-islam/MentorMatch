import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  CreditCard,
  Calendar,
  Briefcase,
  TrendingUp,
  Bell,
  MessageSquare,
  Shield,
  LifeBuoy,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link, NavLink } from "react-router";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Mentor Approval", href: "/admin/mentors-approve", icon: UserCheck },
  { name: "User Management", href: "/admin/users", icon: Users },
  { name: "Payments", href: "/admin/payments", icon: CreditCard },
  { name: "Bookings", href: "/admin/bookings", icon: Calendar },
  { name: "Gigs QA", href: "/admin/gigs", icon: Briefcase },
  { name: "Gig Rankings", href: "/admin/rankings", icon: TrendingUp },
  { name: "Notifications", href: "/admin/notifications", icon: Bell },
  { name: "Community", href: "/admin/community", icon: MessageSquare },
  { name: "Admin Management", href: "/admin/admins", icon: Shield },
  { name: "Support", href: "/admin/support", icon: LifeBuoy },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "relative min-h-screen border-r border-border bg-card transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center gap-2 animate-fade-in">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                to="/dashboard/mentor/overview"
                className="hidden sm:block "
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
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <ScrollArea className="min-h-screen ">
        <nav className="flex flex-col gap-1 p-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === "/admin"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  collapsed ? "justify-center" : "",
                  isActive
                    ? "bg-primary/20 text-primary shadow-sm" // ACTIVE STYLE
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )
              }
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && (
                <span className="animate-fade-in">{item.name}</span>
              )}
            </NavLink>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}
