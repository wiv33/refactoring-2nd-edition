module.exports = {
  exists() {
    return ["email", "pNumber", "number", "address", "name", "gBirth", "zipcode", "itemType", "itemQuantitiy", "participationNumber", "story", "agree"]
  },

  obj() {
    return {
      name : {enable : true, type : "text", message : "참가자 이름을 확인해주세요."},
      gName : {enable : true, type: "text", message : "보호자 이름을 확인해주세요."},
      gBirth : {enable : true, type: "birth", message : "생년월일을 확인해주세요."},
      address : {enable : true, type: "address", message : "주소를 확인해주세요.", focusElementId : "address01"},
      number : {enable : true, type: "number", message : "전화 번호를 확인해주세요.", focusElementId : "number02"},
      pNumber : {enable : true, type: "number", message : "휴대폰 번호를 확인해주세요.", focusElementId : "pNumber02"},
      email : {enable : true, type: "email", message : "이메일 주소를 확인해주세요.", focusElementId : "email01"},

      itemQuantitiy : {enable : true, type : "num", message : "예상 물품수량을 확인해주세요. ",focusElementId:""},
      participationNumber : {enable : true, type : "num", message : "위아자 참여횟수를 확인해주세요.",focusElementId:""},
      story : {enable : true, type : "text", message : "신청사연을 입력해주세요.",focusElementId:""},
      agree : {enable : true, type : "checkbox", message : "개인정보 수집 및 이용목적에 동의해주세요.",focusElementId:""},
      itemType : {enable : true, type : "checkbox", message : "물품 종류를 선택해주세요.",focusElementId:""},
    }
  }
}