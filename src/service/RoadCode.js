const roadName = ['台24', '182縣道', '阿婆灣']

export function getCurrentRoadCode() {
  return localStorage.getItem("RoadCode")
}

export function getCurrRoadName() {
  switch (parseInt(getCurrentRoadCode())) {
    case 0:
      return roadName[0];
    case 1:
      return roadName[1];
    case 2:
      return roadName[2];
    default:
      return "未知錯誤";
  }
}