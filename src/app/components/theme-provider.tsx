"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  // NOTE: State to track if the component has mounted, so we can fix the mismatch error I encountered
  const [mounted, setMounted] = React.useState(false);

  // Set mounted to true after the component mounts on the client
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Only render the ThemeProvider on the client (after the initial mount)
  if (!mounted) {
    return <>{children}</>; // Return children immediately without ThemeProvider
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
