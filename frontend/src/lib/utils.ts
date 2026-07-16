//オブジェクト同士の比較関数
export const isSameObj = (obj1: {}, obj2: {}) => {
  return JSON.stringify(
    Object.entries(obj1).sort((a, b)=> a[0] > b[0] ? 1 : -1 )
  ) === JSON.stringify(
    Object.entries(obj2).sort((a, b)=> a[0] > b[0] ? 1 : -1 )
  );
}
