export function useThreeJS(isActive: boolean) {
  // three 캔버스 생성
  // 카메라 세팅
  // 렌더링
  // 오브젝트 생성
  // 오브젝트 재질
  // 오브젝트 생성
  // 빛 추가
  // 애니메이션

  // 오브젝트 변경
  const changeObjects = () => {
    console.log("오브젝트변경");
  };
  // 색 변경
  const changeColors = () => {
    console.log("색변경");
  };

  return {
    changeObjects,
    changeColors,
  };
}
