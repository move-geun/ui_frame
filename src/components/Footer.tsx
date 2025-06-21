import {
  Github,
  FileText,
  Mail,
  Code,
  Palette,
  Zap,
  Layers,
} from "lucide-react";
import toast from "react-hot-toast";
import styles from "@/styles/Footer.module.css";

export default function Navbar() {
  const socialIcon = [
    {
      icon: Github,
      href: "https://github.com/move-geun",
      label: "Github",
      hoverClass: "socialBlue",
    },
    {
      icon: FileText,
      href: "https://drive.google.com/file/d/1xCbDC7_GwrmsRAEDTVc5BXWdPRLW4sbP/view?usp=drive_link",
      label: "Portfolio PDF",
    },
    {
      icon: Mail,
      href: "ehdrms1426@gmail.com",
      label: "Mail",
      hoverClass: "socialBlue",
    },
  ];
  const technologies = [
    { icon: Code, text: "React & TypeScript" },
    { icon: Palette, text: "CSS Modules" },
    { icon: Zap, text: "Canvas & Three.js" },
    { icon: Layers, text: "Interactive UI" },
  ];

  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* 소개 */}
          <div className={`${styles.section} ${styles.aboutSection}`}>
            <h3 className={styles.logoTitle}>UI Frame</h3>
            <p className={styles.description}>
              학습한 내용들을 바탕으로 웹 프론트엔드 개발에 <br />
              필요한 기능들을 담아보았습니다. <br />
            </p>
            <p className={styles.descriptionSecond}>
              Three.js와 같이 다소 어려운 내용은 <br />
              GhapGPT의 도움을 받았습니다.
            </p>
          </div>

          {/* 소셜 */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>About Me</h4>
            <div className={styles.socialIcon}>
              {socialIcon.map((link) => {
                const IconComponent = link.icon;

                // 메일일 경우 버튼 처리
                if (link.label === "Mail") {
                  return (
                    <a
                      key={link.label}
                      onClick={(e) => {
                        e.preventDefault();
                        navigator.clipboard.writeText(link.href);
                        toast.success("이메일 주소가 복사되었습니다.");
                      }}
                      className={`${styles.socialLink} ${
                        styles[link.hoverClass]
                      }`}
                      aria-label={link.label}
                      type="button"
                    >
                      <IconComponent size={28} />
                    </a>
                  );
                }
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`${styles.socialLink} ${
                      styles[link.hoverClass]
                    }`}
                    aria-label={link.label}
                  >
                    <IconComponent size={28} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* 적용기술 */}
          <div className={`${styles.section} ${styles.techSection}`}>
            <h4 className={styles.sectionTitle}>Using Stacks</h4>
            <div className={styles.techList}>
              {technologies.map((tech) => {
                const IconComponent = tech.icon;
                return (
                  <div key={tech.text} className={styles.techItem}>
                    <IconComponent size={16} />
                    <span>{tech.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>&copy; Frontend Web UI Page </p>
        </div>
      </div>
    </footer>
  );
}
