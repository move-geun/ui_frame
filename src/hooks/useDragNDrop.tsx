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

  const handleDragStart = (
    e: React.DragEvent,
    item: DragItem,
    index: number
  ) => {
    // 아이템 저장
    // 미리보기 생성
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    // 이벤트 막기
    // 인덱스 찾기
  };

  const handleDragEnter = (e: React.DragEvent) => {
    // 이벤트막기
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // 현재 위치 확인
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    // 위치 확인
    // 아이템 정렬
  };

  const handleDragEnd = () => {
    // 초기화
  };

  const resetOrder = () => {
    // 아이템 위치 초기화
  };

  const shuffleItems = () => {
    // 랜덤
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
