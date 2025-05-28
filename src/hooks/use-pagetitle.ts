import { useEffect } from "react";
import { SITE_NAME } from "@/data/config";

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} - ${SITE_NAME}`;
  }, [title]);
}