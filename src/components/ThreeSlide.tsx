import styles from "@/styles/ThreeSlide.module.css";

interface ThreeSlideProps {
  isActive: boolean;
}

export default function ThreeSlide({ isActive }: ThreeSlideProps) {
  return (
    <div className={styles.container}>
      <div>4</div>
    </div>
  );
}
