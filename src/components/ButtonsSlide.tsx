import { useState } from "react";
import { Rocket, Star, Zap, Leaf, Flame, Wand2 } from "lucide-react";
import styles from "@/styles/ButtonsSlide.module.css";

interface ButtonsSlideProps {
  isActive: boolean;
}

const buttonConfigs = [
  { icon: Rocket, label: "Rocket", styleClass: "buttonBlue" },
  { icon: Star, label: "Star", styleClass: "buttonPink" },
  { icon: Zap, label: "Lightning", styleClass: "buttonCyan" },
  { icon: Leaf, label: "Leaf", styleClass: "buttonGreen" },
  { icon: Flame, label: "Fire", styleClass: "buttonOrange" },
  { icon: Wand2, label: "Magic", styleClass: "buttonPurple" },
];

export default function ButtonsSlide({ isActive }: ButtonsSlideProps) {
  const [clickedButton, setClickedButton] = useState<number | null>(null);

  const handleButtonClick = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    console.log(index, event);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Interactive Elements</h2>
      <p className={styles.description}>
        버튼을 연속으로 클릭하면 더욱 예뻐요.
      </p>
      <div className={styles.buttonGrid}>
        {buttonConfigs.map((config, index) => {
          const IconComponent = config.icon;
          const buttonClass = `${styles.interactiveButton} ${
            styles[config.styleClass]
          } ${clickedButton === index ? styles.clicked : ""} ${
            index % 2 === 0 ? styles.rotateRight : styles.rotateLeft
          }`;

          return (
            <button
              key={index}
              onClick={(e) => handleButtonClick(index, e)}
              className={buttonClass}
            >
              <IconComponent size={48} className={styles.buttonIcon} />
              <div className={styles.buttonLabel}>{config.label}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
