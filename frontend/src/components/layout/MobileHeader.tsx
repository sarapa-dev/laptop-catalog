import { Link, NavLink } from "react-router";
import { Menu } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { UserType } from "../../types/user";

export interface MenuItem {
  label: string;
  href: string;
}

interface MobileNavbarProps {
  menuItems: MenuItem[];
  authUser?: UserType;
  logout: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const MobileHeader = ({
  menuItems,
  authUser,
  logout,
  isOpen,
  setIsOpen,
}: MobileNavbarProps) => {
  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="size-6" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Navigation Menu</SheetTitle>
            <SheetDescription>Access all pages and account options here.</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col space-y-4 mt-4 ml-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary underline" : "text-primary"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}

            <div className="border-t pt-4">
              {authUser ? (
                <>
                  {authUser?.status === "ADMIN" && (
                    <Link
                      to="/add-laptop"
                      className="block py-2 text-sm font-medium transition-colors hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Add Laptop
                    </Link>
                  )}

                  <Button
                    variant="ghost"
                    className="w-full justify-start px-0"
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 mr-2">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Sign up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
