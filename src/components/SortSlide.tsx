import styles from "@/styles/SortSlide.module.css";

interface SortSlideProps {
  isActive: boolean;
}
export default function SortSlide({ isActive }: SortSlideProps) {
  return (
    <div className={styles.container}>
      <div>1</div>
    </div>
  );
}
