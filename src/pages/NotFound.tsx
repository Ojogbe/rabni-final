import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-9xl font-extrabold text-primary mb-4">404</h1>
        <h2 className="display-text text-primary mb-6">Page Not Found</h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
          Please check the URL or navigate back to the homepage.
        </p>
        <Link to="/">
          <Button className="btn-secondary">
            Go to Homepage
          </Button>
        </Link>
      </div>
    </>
  );
};
