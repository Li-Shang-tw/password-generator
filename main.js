

//----varaiable
let newPassword ="";


//-------初始化--------
const range =  document.querySelector("#length");
const showBoard = document.querySelector(".showBoard");
//預設長度是8,顯示初始長度
showBoard.textContent = range.value; 
//---顯示初始的強度

//顯示長度
showLength();
//顯示預設的密碼強度
decidePasswordStrength(getlength(),getOptions());


//====事件區======
//---------按鈕事件:產生密碼--------
const btn = document.querySelector(".btn");
btn.addEventListener('click', (event) => { 
    //range- length of password
    let lenOfPassword =   getlength()
    //checkbox-element type of password
    let passwordElements = getOptions();
    //呼叫generatePassword
    newPassword = generatePassword(lenOfPassword,passwordElements);
    //呼叫顯示password
    showPassword(newPassword);     
             
}); 

//--------複製按鈕,將密碼複製到Clipboard---------
const copyBtn = document.querySelector(".toClip");
copyBtn.addEventListener("click",(event)=>{
    copyPasswordToClipboard(newPassword);
})
//------監聽密碼變化,顯示密碼強度------
const form = document.querySelector(".form");
form.addEventListener("change",(event)=>{
   //取得密碼長度
   const lenPassword = getlength();  
   //取得條件
   const options = getOptions();
    //判斷密碼強度
   decidePasswordStrength(lenPassword,options);  
  
}
)




//=====function 區========

//----生成密碼----------
function generatePassword(lenOfPassword,passwordElements){
    //set list of upperletter, lowerletter,numbers,symobl
    const uppercase = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    const lowercase = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    const numbers =[1,2,3,4,5,6,7,8,9,0];
    const symbols = ["!","@","#","$","^","%","&","*","(",")","__","=","+","[","{","]","}","/","<",">","?"];

    //check passwordElement to determine  which elements are included
    let choosenElements = [];
    passwordElements.forEach((elementType)=>{
        switch (elementType) {
            case "uppercase":
                choosenElements =choosenElements.concat(uppercase);
                break;
            case "lowercase":
                choosenElements =choosenElements.concat(lowercase);
                break;
            case "numbers":
                choosenElements =choosenElements.concat(numbers);
                break;
            case "symbols":
                choosenElements =choosenElements.concat(symbols);
                break;      
        };
    });

    //generate password
    let password = "";
    for (let i =0;i<lenOfPassword;i++){
       let randomSelectNum = Math.floor(Math.random()*choosenElements.length);
       let choosenChar = choosenElements[randomSelectNum];
       password +=choosenChar;       
    }
   //return generatedPassword
   return password;   
}

//------show length-------
function showLength(){
    let range =  document.querySelector("#length");
    let showBoard = document.querySelector(".showBoard");
    range.addEventListener("change",(event)=>{
        let lengthNow = event.target.value;
        showBoard.textContent = lengthNow;
    })
}

//顯示生成的密碼
function showPassword(newPassword){
    const generatedPassword = document.querySelector(".generatedPassword");
    generatedPassword.textContent =newPassword;
}
//判斷密碼強度
function decidePasswordStrength(lenPassword,options){

    //例外處理,沒有勾選條件
    //並且在重新設計密碼時,清空舊密碼
    if(options.length==0){
        alert("Please select at least one option");
        document.querySelector(".generatedPassword").textContent ="Please select at least one option";
        //加上報錯的樣式
        document.querySelector(".generatedPassword").classList.add("error__msg");


    }else{
        document.querySelector(".generatedPassword").textContent ="";
        //移除報錯的樣式
        document.querySelector(".generatedPassword").classList.remove("error__msg");
    }
    
    //顯示強度的位置
     const strengthLevel = document.querySelector(".strength-Level");
    //強度的條圖
     const strengthBars = document.querySelectorAll(".icon");
     //判斷密碼強度
     if(lenPassword > 7 && options.length==4){
        strengthLevel.textContent="STRONG";
        strengthBars.forEach((bar)=>{
            removeClass(bar);
            bar.classList.add("strong");
        })
       }else if(lenPassword > 7 && options.length==3){
        strengthLevel.textContent="MEDIUM";
        for(i=0;i<3;i++){
            removeClass(strengthBars[i]);
            strengthBars[i].classList.add("medium");
        };
        removeClass(strengthBars[3]);
       }else if(lenPassword <5 || options.length==1){
        strengthLevel.textContent="VERY WEAK";
        for(i=0;i<4;i++){
            removeClass(strengthBars[i]);        
        };  
        strengthBars[0].classList.add("veryWeak");
       }else{
        strengthLevel.textContent="WEAK";
        for(i=0;i<4;i++){
            removeClass(strengthBars[i]);        
        };
        for(i=0;i<2;i++){
            strengthBars[i].classList.add("weak");       
        };   
       }
    }

//check options
function getOptions(){
    let checkboxes = document.querySelectorAll('input[name="element"]:checked');

    let passwordElements = [];
    checkboxes.forEach((checkbox) => {
        passwordElements.push(checkbox.value);
    });
    return passwordElements;
}
//取得密碼的長度
function getlength(){
    let length = parseInt( document.querySelector(".field-length input").value);
    return length;
}
//移除strengthBars的樣式
function removeClass(bar){
    bar.classList.remove("strong");
    bar.classList.remove("weak");
    bar.classList.remove("medium");
    bar.classList.remove("veryWeak");  
  }   
  

//-----clipboard:將密碼複製到clipboard
function copyPasswordToClipboard(password){
    const copyContent = async () => {
        try {
          await navigator.clipboard.writeText(password);
          alert('Content copied to clipboard');
        } catch (err) {
        alert('Failed to copy: ', err);
        }
      }
      copyContent();
}


