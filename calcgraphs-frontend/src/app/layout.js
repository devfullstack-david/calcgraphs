import Navbar from "@/components/Navbar.js";
import "./globals.css";

export const metadata = {
  title: "CalcGraphs",
  description: "Aplicativo que demonstra a execução dos grafos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="favicon.png" />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
