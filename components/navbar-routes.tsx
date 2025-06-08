// v0.0.01 Salah
"use client";

import {
  ClerkLoaded,
  ClerkLoading,
  OrganizationSwitcher,
  useAuth,
  UserButton,
} from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  Dot,
  Home,
  Loader,
  LogOut,
  Plus,
  TvMinimalPlay,
  User,
} from "lucide-react";
import Link from "next/link";
import ModeToggle from "./ui/theme-toggle";
import { SearchInput } from "./search-input";
import { SearchInputNotes } from "./search-input-notes";
import { isTutor } from "@/lib/tutor";
import { useEffect } from "react";
import { Logo } from "@/app/(dashboard)/_components/logo";
import { LogoR } from "@/app/(dashboard)/_components/logoR";

const NavbarRoutes = () => {
  const router = useRouter();
  const { userId } = useAuth();

  // Use useEffect to call router.refresh() after render
  useEffect(() => {
    if (userId) {
      router.refresh();
    }
  }, [userId, router]);
  const pathname = usePathname();

  const isTutorPage = pathname?.startsWith("/tutor");
  const isCoursePage = pathname?.includes("/courses");
  const isNotePage = pathname?.includes("/notes");
  const isSearchPage = pathname === "/search" || pathname === "/search-courses";
  const isNotesPage = pathname === "/search-notes";
  const isTrackerPage =
    (pathname?.includes("/group") || pathname?.includes("/tracker")) &&
    !pathname?.includes("/select-group");
  const isHubPage = pathname?.includes("/studyhub");
  const isSprintPage =
    pathname?.includes("/sprint") || pathname?.includes("/template-sprint");

  const SprintOrTracker =
    pathname?.includes("/group") ||
    pathname?.includes("/sprint") ||
    pathname?.includes("/template-sprint");

  return (
    <>
      {SprintOrTracker && (
        <div className="flex items-center">
          <div className="hidden md:flex">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          {/* <Button className="ml-4 text-[1rem] h-auto py-2 px-3 hidden md:block">
            Create
          </Button>{" "}
          <Button className="ml-4  md:hidden block" size={"sm"}>
            <Plus className="h-5 w-5" />
          </Button> */}
        </div>
      )}
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}{" "}
      {isNotesPage && (
        <div className="hidden md:block">
          <SearchInputNotes />
        </div>
      )}{" "}
      <div className="flex gap-x-2 ml-auto">
        {isTutorPage ||
        isTrackerPage ||
        isCoursePage ||
        isHubPage ||
        isNotePage ? (
          <Link
            href={
              isTutorPage
                ? "/dashboard"
                : isNotePage
                ? "/search-notes"
                : isCoursePage
                ? "/search-courses"
                : isTrackerPage
                ? "/tracker/select-group"
                : "/dashboard"
            }
          >
            <Button
              className="mt-1
           hover:bg-slate-800
           bg-n-7
           "
              variant={"default"}
            >
              <LogOut className="h-4 w-4 mr-2" /> Exit
            </Button>
          </Link>
        ) : isTutor(userId) ? (
          <Link href="/tutor/courses">
            {" "}
            <Button
              className="mt-1
           hover:bg-slate-800
                      bg-n-7
           "
              variant={"default"}
            >
              Tutor Mode
            </Button>
          </Link>
        ) : null}
        <ClerkLoading>
          <Loader className="h-5 w-5 to-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          {!isTrackerPage && !isSprintPage && (
            <UserButton afterSwitchSessionUrl="/home">
              <UserButton.UserProfileLink
                label="Dashboard"
                url="/dashboard"
                labelIcon={<Home className="size-5" />}
              />{" "}
              <UserButton.UserProfileLink
                label="Public Profile"
                url="/profile"
                labelIcon={<User className="size-5" />}
              />
            </UserButton>
          )}
          {SprintOrTracker && (
            <div className="md:ml-2 ml-0 items-center">
              <OrganizationSwitcher
                afterLeaveOrganizationUrl="/tracker/select-group"
                afterCreateOrganizationUrl={"/tracker/group/:id"}
                afterSelectOrganizationUrl={"/tracker/group/:id"}
                hidePersonal
              />
            </div>
          )}
        </ClerkLoaded>{" "}
      </div>
    </>
  );
};

export default NavbarRoutes;
