import { useState, useCallback } from "react";

export function useCarousel(totalIdx: number) {
  const [curIdx, setcurIdx] = useState(0);

  const nextSlide = useCallback(() => {
    setcurIdx((prev) => (prev + 1) % totalIdx);
  }, [totalIdx]);

  const previousSlide = useCallback(() => {
    setcurIdx((prev) => (prev - 1 + totalIdx) % totalIdx);
  }, [totalIdx]);

  const goToSlide = useCallback(
    (slideIndex: number) => {
      if (slideIndex >= 0 && slideIndex < totalIdx) {
        setcurIdx(slideIndex);
      }
    },
    [totalIdx]
  );

  return {
    curIdx,
    totalIdx,
    nextSlide,
    previousSlide,
    goToSlide,
  };
}
