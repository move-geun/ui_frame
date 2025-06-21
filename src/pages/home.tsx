import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useCarousel } from "@/hooks/useCarousel";
import SortSlide from "@/components/SortSlide";
import ButtonsSlide from "@/components/ButtonsSlide";
import CanvasSlide from "@/components/CanvasSlide";
import ThreeSlide from "@/components/ThreeSlide";
import Footer from "@/components/Footer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const { curIdx, totalIdx, nextSlide, previousSlide, goToSlide } =
    useCarousel(4);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") previousSlide();
      if (e.key === "ArrowRight") nextSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, previousSlide]);

  const getSlideClass = (slideIndex: number) => {
    if (curIdx === slideIndex) {
      return `${styles.carouselSlide} ${styles.slideVisible}`;
    } else if (curIdx > slideIndex) {
      return `${styles.carouselSlide} ${styles.slideHiddenLeft}`;
    } else {
      return `${styles.carouselSlide} ${styles.slideHiddenRight}`;
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.carouselContainer}>
          <div className={`${getSlideClass(0)} ${styles.slideBlack}`}>
            <SortSlide isActive={curIdx === 0} />
          </div>

          <div className={`${getSlideClass(1)} ${styles.slidePurple}`}>
            <ButtonsSlide isActive={curIdx === 1} />
          </div>

          <div className={`${getSlideClass(2)} ${styles.slideWave}`}>
            <CanvasSlide isActive={curIdx === 2} />
          </div>

          <div className={`${getSlideClass(3)} ${styles.slidePink}`}>
            <ThreeSlide isActive={curIdx === 3} />
          </div>
        </div>

        {/* Carousel Navigation */}
        <div className={styles.navigation}>
          {Array.from({ length: totalIdx }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`${styles.navDot} ${
                index === curIdx ? styles.navDotActive : ""
              }`}
            />
          ))}
        </div>
        {/* Navigation Arrows */}
        <button
          onClick={previousSlide}
          className={`${styles.arrowButton} ${styles.arrowLeft}`}
        >
          <ChevronLeft size={48} />
        </button>
        <button
          onClick={nextSlide}
          className={`${styles.arrowButton} ${styles.arrowRight}`}
        >
          <ChevronRight size={48} />
        </button>
      </main>

      <Footer />
    </div>
  );
}
