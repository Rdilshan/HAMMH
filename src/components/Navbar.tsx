'use client'

import { useState } from 'react';
import { Bell, Menu, X } from 'lucide-react';
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

const Navbar = ( { role, userid }: { role: string; userid: string }) => {
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

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
            <NotificationButton 
              notifications={notifications} 
              showNotifications={showNotifications}
              toggleNotifications={toggleNotifications}
            />
            <AdminProfile role={role ?? ''}/>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-16 left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
              <div className="p-4 space-y-4">
                <NotificationButton 
                  notifications={notifications} 
                  showNotifications={showNotifications}
                  toggleNotifications={toggleNotifications}
                  isMobile={true}
                />
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

// Notification Button Component
const NotificationButton: React.FC<NotificationButtonProps> = ({ 
  notifications, 
  showNotifications, 
  toggleNotifications, 
  isMobile = false 
}) => {
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  return (
    <div className={`relative ${isMobile ? 'w-full' : ''}`}>
      <button 
        onClick={toggleNotifications}
        className={`relative p-2 rounded-full hover:bg-purple-50 transition-colors
          ${isMobile ? 'w-full flex items-center gap-3 px-4' : ''}`}
        type="button"
        aria-label="Toggle notifications"
      >
        <Bell className="h-5 w-5 text-black" />
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {unreadCount}
        </span>
        {isMobile && <span className="text-gray-700">Notifications</span>}
      </button>

      {showNotifications && (
        <div className={`
        bg-[#6800E9] rounded-lg shadow-lg border border-gray-100 overflow-hidden 
          ${isMobile ? 'w-full mt-2' : 'absolute right-0 mt-2 w-80'}
        `}>
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-white text-center">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors
                  ${!notification.isRead ? 'bg-purple-50' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-semibold text-gray-800">{notification.title}</h4>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                 
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                <hr />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Admin Profile Component
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
const AdminProfile: React.FC<AdminProfileProps> = ({ role,isMobile = false}) => (
  
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