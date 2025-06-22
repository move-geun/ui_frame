import { useThreeJS } from "@/hooks/useThreeJS";
import styles from "@/styles/ThreeSlide.module.css";

interface ThreeSlideProps {
  isActive: boolean;
}

export default function ThreeSlide({ isActive }: ThreeSlideProps) {
  const { changeObjects, changeColors } = useThreeJS(isActive);

  return (
    <div className={styles.container}>
      <div className={styles.threeContainer} />

      <div className={styles.content}>
        <h2 className={styles.title}>3D Morphing Objects</h2>
        <p className={styles.description}>3D 요소를 변경해보세요.</p>
        <div className={styles.buttonGroup}>
          <button
            onClick={changeObjects}
            className={`${styles.button} ${styles.changeButton}`}
          >
            Change Shape
          </button>
          <button
            onClick={changeColors}
            className={`${styles.button} ${styles.colorButton}`}
          >
            Change Colors
          </button>
        </div>
      </div>
    </div>
  );
}
