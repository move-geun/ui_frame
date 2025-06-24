import { useState } from "react";
import { Rocket, Star, Zap, Leaf, Flame, Wand2 } from "lucide-react";
import styles from "@/styles/ButtonsSlide.module.css";

interface ButtonsSlideProps {
  isActive: boolean;
}

const buttonConfigs = [
  {
    icon: Rocket,
    label: "Rocket",
    styleClass: "buttonBlue",
    animation: "bounce",
  },
  { icon: Star, label: "Star", styleClass: "buttonPink", animation: "pulse" },
  {
    icon: Zap,
    label: "Lightning",
    styleClass: "buttonCyan",
    animation: "flash",
  },
  { icon: Leaf, label: "Leaf", styleClass: "buttonGreen", animation: "shake" },
  {
    icon: Flame,
    label: "Fire",
    styleClass: "buttonOrange",
    animation: "wiggle",
  },
  {
    icon: Wand2,
    label: "Magic",
    styleClass: "buttonPurple",
    animation: "spin",
  },
];

export default function ButtonsSlide({ isActive }: ButtonsSlideProps) {
  const [clickedButton, setClickedButton] = useState<number | null>(null);

  const handleButtonClick = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const ripple = document.createElement("div");
    ripple.className = styles.waveRipple;
    ripple.style.left = x - 150 + "px";
    ripple.style.top = y - 150 + "px";

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 2000);

    setClickedButton(index);
    setTimeout(() => setClickedButton(null), 1000);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Interactive Elements</h2>
      <p className={styles.description}>버튼을 클릭해보세요.</p>
      <div className={styles.buttonGrid}>
        {buttonConfigs.map((config, index) => {
          const IconComponent = config.icon;
          const buttonClass = `${styles.interactiveButton} ${
            styles[config.styleClass]
          } ${clickedButton === index ? styles.clicked : ""} ${
            clickedButton === index ? styles[config.animation] : ""
          } ${index % 2 === 0 ? styles.rotateRight : styles.rotateLeft}`;

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
