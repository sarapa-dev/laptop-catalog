import { Link, NavLink } from "react-router";
import { ModeToggle } from "../ui/mode-toggle";
import { Button } from "../../components/ui/button";
import { LaptopMinimal, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { useState } from "react";
import { MobileHeader } from "./MobileHeader";
import { UserType } from "../../types/user";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: authUser } = useQuery<UserType>({ queryKey: ["authUser"] });

  const { mutate: logout } = useMutation({
    mutationFn: () => axiosInstance.post("/user/logout"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setIsOpen(false);
    },
  });

  const menuItems = [
    { label: "Laptops", href: "/laptops" },
    { label: "Categories", href: "/categories" },
    { label: "Compare", href: "/compare" },
  ];

  return (
    <header className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="" className="flex items-center space-x-2">
            <LaptopMinimal className="size-8" />
            <span className="text-xl font-bold text-foreground">LaptopCatalog</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary underline" : "text-primary"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <ModeToggle />

            <div className="hidden md:block">
              {authUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="size-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {authUser?.status === "ADMIN" && (
                      <DropdownMenuItem>
                        <Link to="/add-laptop">Add Laptop</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login">
                    <Button variant={"outline"}>Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button>Sign up</Button>
                  </Link>
                </div>
              )}
            </div>

            <MobileHeader
              menuItems={menuItems}
              authUser={authUser}
              logout={() => logout()}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
