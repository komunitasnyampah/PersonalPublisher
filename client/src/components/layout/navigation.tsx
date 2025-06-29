import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logoImage from "@assets/Nyampah_Bersama_Logo png_1751206526334.png";

export function Navigation() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/write", label: "Write" },
    { href: "/profile", label: "Profil CV" },
    { href: "/documents", label: "Dokumen" },
    { href: "/demo", label: "Demo JS" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results - for now just log
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3" id="main-logo">
            <div className="w-12 h-12 flex items-center justify-center">
              <img 
                src={logoImage} 
                alt="Nyampah Bersama Logo" 
                className="w-12 h-12 object-contain"
                id="logo-image"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900" id="site-title">NYAMPAH</h1>
              <p className="text-xs text-gray-500" id="site-subtitle">NYAMPAH BERSAMA</p>
            </div>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8" id="search-container">
            <form onSubmit={handleSearch} className="relative w-full" id="search-form">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search posts, topics, or members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-eco-green focus:border-transparent"
                id="search-input"
              />
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6" id="desktop-nav">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium transition-colors ${
                  location === item.href
                    ? "text-eco-green"
                    : "text-gray-600 hover:text-eco-green"
                }`}
                id={`nav-link-${item.label.toLowerCase()}`}
              >
                {item.label}
              </Link>
            ))}
            <div 
              className="w-8 h-8 bg-eco-green rounded-full flex items-center justify-center text-white font-medium text-sm cursor-pointer"
              id="user-avatar"
            >
              JD
            </div>
          </div>

          {/* Mobile menu button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" id="mobile-menu-btn">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]" id="mobile-menu">
              <div className="flex flex-col space-y-6 mt-6">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="relative" id="mobile-search-form">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    id="mobile-search-input"
                  />
                </form>

                {/* Mobile Navigation */}
                <div className="flex flex-col space-y-4" id="mobile-nav-links">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-lg font-medium transition-colors ${
                        location === item.href
                          ? "text-eco-green"
                          : "text-gray-600 hover:text-eco-green"
                      }`}
                      id={`mobile-nav-${item.label.toLowerCase()}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Mobile Profile */}
                <div className="flex items-center space-x-3 pt-4 border-t" id="mobile-profile">
                  <div 
                    className="w-10 h-10 bg-eco-green rounded-full flex items-center justify-center text-white font-medium"
                    id="mobile-user-avatar"
                  >
                    JD
                  </div>
                  <div>
                    <p className="font-medium text-gray-900" id="mobile-username">John Doe</p>
                    <p className="text-sm text-gray-500" id="mobile-user-role">Community Member</p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
