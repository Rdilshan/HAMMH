'use client'

import { useState } from 'react';
import { Bell, Menu, X, LogOut } from 'lucide-react';
import Image from 'next/image';
import logo from '../../public/logo.png';
import admin from '../../public/admin.jpg';


interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

interface NotificationButtonProps {
  notifications: Notification[];
  showNotifications: boolean;
  toggleNotifications: () => void;
  isMobile?: boolean;
}

interface AdminProfileProps {
  isMobile?: boolean;
  role?: string;
}

const Navbar = ({ role, userid }: { role: string; userid: string }) => {
  console.log(userid)
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/Auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        window.location.href = "/";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Demo notifications
  const notifications: Notification[] = [
    {
      id: 1,
      title: "Notifications",
      message: "Notifications",
      time: "5 minutes ago",
      isRead: false
    },
    {
      id: 2,
      title: "Notifications",
      message: "Notifications",
      time: "1 hour ago",
      isRead: false
    },
    {
      id: 3,
      title: "System Update",
      message: "System maintenance scheduled for tonight",
      time: "2 hours ago",
      isRead: false
    }
  ];

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close notifications when opening mobile menu
    if (!isMobileMenuOpen) {
      setShowNotifications(false);
    }
  };

  const toggleNotifications = (): void => {
    setShowNotifications(!showNotifications);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50">
      <div className="mx-auto px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <Image
              src={logo}
              alt="Logo"
              className="w-20 h-auto"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={handleLogout}
              className={`
            flex items-center h-12 px-4 text-red-500 hover:bg-gray-50
          `}
            >
              <LogOut className="h-5 w-5 min-w-[20px]" />
              <span className="hidden lg:block ml-4 text-sm font-medium">Logout</span>
              <div className="lg:hidden absolute left-16 px-3 py-2 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                Logout
              </div>
            </button>

            <AdminProfile role={role ?? ''} />
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-16 left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
              <div className="p-4 space-y-4">
                <button
                  onClick={handleLogout}
                  className={`
            flex items-center h-12 px-4 text-red-500 hover:bg-gray-50
          `}
                >
                  <LogOut className="h-5 w-5 min-w-[20px]" />
                  <span className="hidden lg:block ml-4 text-sm font-medium">Logout</span>
                  <div className="lg:hidden absolute left-16 px-3 py-2 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                    Logout
                  </div>
                </button>

                <div className="border-t border-gray-100 pt-4">
                  <AdminProfile isMobile={true} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};



// Admin Profile Component
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
const AdminProfile: React.FC<AdminProfileProps> = ({ role, isMobile = false }) => (

  <div className={`flex items-center ${isMobile ? 'w-full' : 'gap-3'}`}>
    <div className={`${isMobile ? 'flex-1' : 'text-right'}`}>
      <p className="text-sm font-medium text-gray-700">{role ? capitalize(role) : ''}</p>
    </div>
    <Image
      src={admin}
      alt="Admin"
      className="w-8 h-8 rounded-full"
    />
  </div>
);

export default Navbar;