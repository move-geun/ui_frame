import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import styles from "@/styles/Navbar.module.css";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.logo}>UI Frame</div>

            {/* 전체화면 */}
            <div className={styles.desktopNav}>
              {/* <button
                onClick={() => scrollToSection("home")}
                className={styles.navButton}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("interactive")}
                className={styles.navButton}
              >
                Interactive
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className={styles.navButton}
              >
                About
              </button> */}
              <button
                onClick={() => scrollToSection("contact")}
                className={styles.navButton}
              >
                Contact
              </button>
            </div>

            {/* 햄버거 */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={styles.mobileButton}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* 반응형 */}
      {isMobileMenuOpen && (
        <div className={styles.mobileOverlay}>
          <div
            className={styles.mobileBackground}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className={styles.mobileMenu}>
            <div className={styles.mobileNavList}>
              {/* <button
                onClick={() => scrollToSection("home")}
                className={styles.mobileNavButton}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("interactive")}
                className={styles.mobileNavButton}
              >
                Interactive
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className={styles.mobileNavButton}
              >
                About
              </button> */}
              <button
                onClick={() => scrollToSection("contact")}
                className={styles.mobileNavButton}
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
