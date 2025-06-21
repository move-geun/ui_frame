import { useDragAndDrop, type DragItem } from "@/hooks/useDragNDrop";
import styles from "@/styles/SortSlide.module.css";

interface SortSlideProps {
  isActive: boolean;
}

const startItems: DragItem[] = [
  { id: "1", label: "말", color: "#3b82f6", icon: "🐴" },
  { id: "2", label: "호랑이", color: "#10b981", icon: "🐯" },
  { id: "3", label: "원숭이", color: "#f59e0b", icon: "🐒" },
  { id: "4", label: "개", color: "#ef4444", icon: "🐕" },
  { id: "5", label: "돼지", color: "#8b5cf6", icon: "🐷" },
  { id: "6", label: "닭", color: "#06b6d4", icon: "🐔" },
];

export default function SortSlide({ isActive }: SortSlideProps) {
  const {
    items,
    draggedItem,
    draggedOverIndex,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
    resetOrder,
    shuffleItems,
  } = useDragAndDrop(startItems);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Sortable Interface</h2>
        <p className={styles.description}>
          Drag and drop으로 순서를 바꿔보세요.
        </p>

        <div className={styles.dragContainer}>
          <div className={styles.itemList}>
            {items.map((item, index) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                className={`
                  ${styles.dragItem}
                  ${draggedItem?.id === item.id ? styles.dragItemDragging : ""}
                  ${draggedOverIndex === index ? styles.dragItemDropTarget : ""}
                `}
                style={{ borderLeftColor: item.color }}
              >
                <div className={styles.itemIcon}>{item.icon}</div>
                <div className={styles.itemLabel}>{item.label}</div>
                <div className={styles.itemNumber}>{index + 1}</div>
              </div>
            ))}
          </div>

          <div className={styles.controlButtons}>
            <button
              onClick={resetOrder}
              className={`${styles.button} ${styles.resetButton}`}
            >
              Reset Order
            </button>
            <button
              onClick={shuffleItems}
              className={`${styles.button} ${styles.shuffleButton}`}
            >
              Shuffle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
