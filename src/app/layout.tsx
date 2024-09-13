import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import NavBar from "@/components/navbar";
import {Toaster} from "@/components/ui/toaster";
import {AuthProvider} from "@/contexts/AuthContext";

const poppins = Poppins({ subsets: ["latin"] ,weight:["300","400","500","600","700","800"] });

export const metadata: Metadata = {
  title: "QuoteShare",
  description: "Share and explore quotes with ease. Join QuoteShare to post, comment, and discover inspiration.",

};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("RootLayout");

  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className={"max-w-[1200px] mx-auto px-4 min-h-screen mb-8"}>
              <NavBar />
              {children}
            </div>
          </ThemeProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
