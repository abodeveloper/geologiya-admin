import { localized } from "@/i18n";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQuery } from "@tanstack/react-query";
import { Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { getCompanyData } from "../api/company";
import { resolveCompanyLogoUrl } from "../utils/resolveCompanyLogoUrl";

type Variant = "sidebar" | "login";

/** Index /dashboard → Navigate to home (asosiy sahifa) */
const DASHBOARD_ROOT = "/dashboard";

export function CompanyBranding({ variant }: { variant: Variant }) {
  const { t } = useTranslation();
  const [imgError, setImgError] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["company"],
    queryFn: getCompanyData,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const logoUrl = resolveCompanyLogoUrl(data?.logo);
  const showImage = Boolean(logoUrl) && !imgError;
  const name = data ? localized(data, "name") : "";
  const tooltipLabel = name.trim() || t("Company");

  useEffect(() => {
    setImgError(false);
  }, [logoUrl]);

  const isLogin = variant === "login";
  const sizeClass = isLogin ? "h-32 w-32" : "h-14 w-14";
  const iconClass = isLogin ? "h-14 w-14" : "h-10 w-10";

  const mark = (
    <>
      {isLoading ? (
        <Building2
          className={cn("animate-pulse text-muted-foreground", iconClass)}
          strokeWidth={1.5}
        />
      ) : showImage ? (
        <img
          src={logoUrl!}
          alt=""
          className={cn(sizeClass, "rounded-full object-contain")}
          onError={() => setImgError(true)}
        />
      ) : (
        <Building2
          className={cn("text-primary", iconClass)}
          strokeWidth={1.5}
        />
      )}
    </>
  );

  const tooltipContent = (
    <TooltipContent
      side={isLogin ? "bottom" : "right"}
      className="max-w-[min(20rem,calc(100vw-2rem))] text-left text-xs leading-snug"
    >
      {tooltipLabel}
    </TooltipContent>
  );

  if (isLogin) {
    const trigger = (
      <TooltipTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full border-0 bg-transparent p-0",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            sizeClass
          )}
        >
          {mark}
        </button>
      </TooltipTrigger>
    );

    return (
      <div className="mb-12 flex items-center justify-center">
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            {trigger}
            {tooltipContent}
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  const sidebarTrigger = (
    <TooltipTrigger asChild>
      <NavLink
        to={DASHBOARD_ROOT}
        className={cn(
          "flex min-w-0 items-center gap-2 rounded-md px-1 py-0.5",
          "text-sidebar-foreground no-underline outline-none",
          "hover:bg-sidebar-accent/60 focus-visible:bg-sidebar-accent/60",
          "focus-visible:ring-2 focus-visible:ring-sidebar-ring"
        )}
      >
        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full",
            sizeClass
          )}
        >
          {mark}
        </span>
        <span className="truncate text-base font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
          {t("GGI")}
        </span>
      </NavLink>
    </TooltipTrigger>
  );

  return (
    <div className="flex min-w-0 items-center">
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          {sidebarTrigger}
          {tooltipContent}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
