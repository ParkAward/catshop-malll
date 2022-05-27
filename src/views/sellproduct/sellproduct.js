import * as Api from '/api.js';
import { randomId } from '/useful-functions.js';

const categorySelectBox = document.querySelector("#categorySelectBox");

const productNameInput = document.querySelector("#productNameInput");
const inventoryInput = document.querySelector("#inventoryInput");
const priceInput = document.querySelector("#priceInput");
const manufacturerInput = document.querySelector("#manufacturerInput");
const shortDescriptionInput = document.querySelector("#shortDescriptionInput");
const detailDescriptionInput = document.querySelector(
  "#detailDescriptionInput"
);
const searchKeywordInput = document.querySelector("#searchKeywordInput");
const keywordContainer = document.querySelector("#keywordContainer");

//버튼
const addNewProductButton = document.querySelector("#addNewProductButton");
const addKeywordButton = document.querySelector("#addKeywordButton");

// 이미지 관련 패턴
const imageInput = document.querySelector("#productimageInput");
const image = document.querySelector("#product-image");

let imagedata = "";

addAllElements();
addAllEvents();

// 파일 업로드 함수 입니다.
function insertImageFile(file) {
  let input = file.target;
  //이미지 파일 유효성 검사
  if (input.files && input.files[0]) {
    const fileReader = new FileReader();
    fileReader.onload = function (data) {
      const uploadedImage = data.target.result;
      console.log(image);
      image.src = uploadedImage;
      image.style.width = "128px";
      image.style.height = "128px";

      imagedata = uploadedImage;
    };
    //readAsDataURL 데이터를 읽습니다. 그리고 fileReader.onload가 진행됩니다.
    fileReader.readAsDataURL(input.files[0]);
  }
}

async function addAllElements() {
  insertCategoryToCategorySelectBox();
}

function addAllEvents() {
  imageInput.addEventListener("change", insertImageFile);
  addNewProductButton.addEventListener("click", handlePatch);
  addKeywordButton.addEventListener('click', addKeywordTag)
}
//카테고리 표시 기능
async function insertCategoryToCategorySelectBox(){
  function insertCategory(value, nameCategory){
      return `
      <option value="${value}" class="notification is-primary is-light"> ${nameCategory} </option>
      `
  }

  try{
    const data  = await Api.get('/api/categories');

    categorySelectBox.insertAdjacentHTML(
      'beforeend',
      data.map(data => insertCategory(data, "임시 카테고리")).join(" ")
    )
  }catch(e){
    console.error(e.massage);
  }
}
//
function addKeywordTag(){
  const keyword = searchKeywordInput.value;
  const rand = randomId();
  searchKeywordInput.value='';
  
  keywordContainer.insertAdjacentHTML(
    'beforeend',
    `
    <div class="control" id="${rand}"
      <div class="tags has-addons">
        <span class="tag is-link is-light">${keyword}</span>
      <a class="tag is-link is-light is-delete"></a>
    </div>
    </div>
    `
  )
  const control = document.querySelector(`#keywordContainer #${rand}`);
  control.querySelector('a').addEventListener('click', ()=>control.remove());
   
}


//회원정보 수정 진행
async function handlePatch(e) {
  e.preventDefault();

  const productName = productNameInput.value;
  const inventory = inventoryInput.value;
  const price = priceInput.value;
  const manufacturer = manufacturerInput.value;
  const shortDescription = shortDescriptionInput.value;
  const detailDescription = detailDescriptionInput.value;
  const categorySelect = categorySelectBox.value;

  const isProductNameValid = productName.length >= 1;
  const isInventoryValid = inventory > 0;
  const isPriceValid = price >= 1000;
  const isManufacturerValid = manufacturer.length >= 1;
  const isShortDescriptionValid = shortDescription
  const isDetailDescriptionValid = detailDescription

  // if(!isProductNameValid){
  //   return alert("제품 이름을 입력해주세요.");
  // }
  // if(!categorySelect){
  //   return alert("카테고리를 선택해주세요.")
  // }
  // if(!isInventoryValid){
  //   return alert("재고 수량은 1 개 이상입니다.");
  // }
  // if(!isPriceValid){
  //   return alert("1000원 이상 입력해주세요.");
  // }
  // if(!isManufacturerValid){
  //   return alert("제조사를 입력해주세요.");
  // }
  const keyword = document.querySelectorAll('span .tag');
  console.log(keyword);
  // if(!isShortDescriptionValid){
  //   return alert("제품에 대한 1~2문장의 설명을 적어주세요.")
  // }


  // try{
  //     const data = { fullName, email, password };
  //     await Api.post('/api/register', data);
  // }catch (err) {
  //   console.error(err.stack);
  //   alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  // }
  //   alert(productName+" "+productText+" "+imagedata);
}
