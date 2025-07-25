import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="w-16 h-16 rounded-2xl bg-primary shadow-md hover:bg-accent hover:text-primary transition-colors"
          aria-label="Прокрутить вверх страницы"
        >
          <ChevronUp className="!w-8 !h-8" />
        </Button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
