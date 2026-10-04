import type { Metadata } from "next";
import ReactQueryProvider from "@/components/core/providers/react-query-provider";
import { Provider } from "@/components/ui/provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Maryama",
    template: "%s – Maryama",
  },
  description: "Maryama — a boutique guest house with three rooms in Imsouane, Morocco.",
  openGraph: {
    siteName: "Maryama",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Provider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </Provider>
      </body>
    </html>
  );
}
