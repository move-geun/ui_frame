import { useWaveAnimation } from "@/hooks/useWaveAnimation";
import styles from "@/styles/CanvasSlide.module.css";

interface CanvasSlideProps {
  isActive: boolean;
}

export default function CanvasSlide({ isActive }: CanvasSlideProps) {
  const canvasRef = useWaveAnimation(isActive);
  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.content}>
        <h1 className={styles.title}>Water Ripples</h1>
        <p className={styles.description}>마우스를 움직여보세요.</p>
      </div>
    </div>
  );
}
