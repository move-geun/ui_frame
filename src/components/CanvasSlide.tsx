import styles from "@/styles/CanvasSlide.module.css";

interface CanvasSlideProps {
  isActive: boolean;
}

export default function CanvasSlide({ isActive }: CanvasSlideProps) {
  return (
    <div className={styles.container}>
      <div>3</div>
    </div>
  );
}
