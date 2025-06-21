import { useState, useRef } from "react";

export interface DragItem {
  id: string;
  label: string;
  color: string;
  icon: string;
}

export function useDragAndDrop(initialItems: DragItem[]) {
  const [items, setItems] = useState<DragItem[]>(initialItems);
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);
  const draggedIndexRef = useRef<number | null>(null);

  const handleDragStart = (
    e: React.DragEvent,
    item: DragItem,
    index: number
  ) => {
    // 아이템 저장
    setDraggedItem(item);
    draggedIndexRef.current = index;
    e.dataTransfer.effectAllowed = "move";
    // 미리보기 생성
    const dragElement = e.currentTarget as HTMLElement;
    const rect = dragElement.getBoundingClientRect();
    e.dataTransfer.setDragImage(dragElement, rect.width / 2, rect.height / 2);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDraggedOverIndex(index);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // 현재 위치 확인
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDraggedOverIndex(null);
    }
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    // 위치 확인
    // 아이템 정렬
    e.preventDefault();

    const dragIndex = draggedIndexRef.current;
    if (dragIndex === null || dragIndex === dropIndex) {
      setDraggedItem(null);
      setDraggedOverIndex(null);
      draggedIndexRef.current = null;
      return;
    }

    const newItems = [...items];
    const draggedItem = newItems[dragIndex];

    newItems.splice(dragIndex, 1);

    const insertIndex = dragIndex < dropIndex ? dropIndex - 1 : dropIndex;
    newItems.splice(insertIndex, 0, draggedItem);

    setItems(newItems);
    setDraggedItem(null);
    setDraggedOverIndex(null);
    draggedIndexRef.current = null;
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDraggedOverIndex(null);
    draggedIndexRef.current = null;
  };

  const resetOrder = () => {
    setItems(initialItems);
  };

  const shuffleItems = () => {
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setItems(shuffled);
  };

  return {
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
  };
}
