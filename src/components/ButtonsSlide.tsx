import styles from "@/styles/ButtonsSlide.module.css";

interface ButtonsSlideProps {
  isActive: boolean;
}
export default function ButtonsSlide({ isActive }: ButtonsSlideProps) {
  return (
    <div className={styles.container}>
      <div>2</div>
    </div>
  );
}
