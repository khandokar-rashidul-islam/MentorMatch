
import { useLocation, NavLink } from "react-router";
import {
  ChevronRight,
  Menu,
  User,
  HomeIcon,
  BarChart3Icon,
  BriefcaseBusinessIcon,
  FileTextIcon,
  Calendar1,
  CreditCardIcon,
  MessageSquareCode,
  User2,
  Wallet2,
  Settings2,
  ClipboardList,
} from "lucide-react";
import {
  Card,

} from "@/components/ui/card";
const menuItems = [
  { title: "Overview", url: "/dashboard/mentor/overview", icon: <HomeIcon /> },
  {
    title: "Bookings",
    url: "/dashboard/mentor/bookings",
    icon: <ClipboardList />,
  },
  {
    title: "Mentor Stats",
    url: "/dashboard/mentor/stats",
    icon: <BarChart3Icon />,
  },
  {
    title: "Create Gigs",
    url: "/dashboard/mentor/create-gigs",
    icon: <BriefcaseBusinessIcon />,
  },
  {
    title: "My Gigs",
    url: "/dashboard/mentor/my-gigs",
    icon: <FileTextIcon />,
  },
  { title: "Schedule", url: "/dashboard/mentor/schedule", icon: <Calendar1 /> },
  {
    title: "Payment History",
    url: "/dashboard/mentor/payments-history",
    icon: <CreditCardIcon />,
  },
  {
    title: "Community Posts",
    url: "/dashboard/mentor/community-posts",
    icon: <MessageSquareCode />,
  },
  {
    title: "Previous Jobs",
    url: "/dashboard/mentor/Previous-jobs",
    icon: <User2 />,
  },
  { title: "Wallet", url: "/dashboard/mentor/wallet", icon: <Wallet2 /> },
  { title: "Settings", url: "/dashboard/mentor/settings", icon: <Settings2 /> },
];

const TutorSidebar = ({collapsed,setCollapsed}) => {
  
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleCollapse = () => setCollapsed(!collapsed);

  const isActive = (path) => currentPath === path;

  const getNavCls = ({ isActive }) =>
    `transition-all duration-200 ${
      isActive
        ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-primary border-r-2 border-blue-500"
        : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
    } flex items-center w-full rounded-md px-3 py-2`;

  return (
    <Card
      className={`rounded-md pt-2 mb-2 mt-20  ${
        collapsed ? "w-16" : "w-55"
      } border-r border-primary flex flex-col`}
      role="navigation"
      aria-label="Sidebar navigation"
    >
      {/* Header */}
      <div className="flex items-center justify-end px-4 pb-1 border-b">
        <button
          onClick={toggleCollapse}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors "
          type="button"
        >
          <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Navigation Content */}
      <nav
        className="flex-1 px-2 overflow-y-auto mt-2"
        aria-label="Primary Navigation"
      >
        <ul className="space-y-1">
          {menuItems.map(({ title, url, icon }) => (
            <li key={title}>
              <NavLink to={url} end className={getNavCls}>
                <span
                  className={`h-5 w-5 ${
                    collapsed ? "mx-auto" : "mr-3"
                  } flex items-center justify-center`}
                >
                  {icon}
                </span>
                {!collapsed && (
                  <>
                    <span className="flex-1 font-semibold ">{title}</span>
                    {isActive(url) && (
                      <ChevronRight className="h-4 w-4 text-blue-500" />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </Card>
  );
};

export default TutorSidebar;
