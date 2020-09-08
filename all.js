let inputDetail = document.querySelector('.inputDetail');//計算畫面結果
let inputResult = document.querySelector('.inputResult');//計算畫面結果
let numBtn = document.querySelectorAll('.numBtn');//所有的數字按鈕
let operateBtn = document.querySelectorAll('.operateBtn');//所有的計算子按鈕
let doubleZero = document.querySelector('.doubleZero');//輸入兩個0的按鈕
let decimal = document.querySelector('.decimal');//輸入小數點的按鈕
let reset = document.querySelector('.reset');//清除的按鈕
let backward = document.querySelector('.backward');//單一刪除的按鈕
let showedValue = '0';//宣告變數，用來儲存目前按的數字按鈕，為了配合eval()，所以設定為string type
let tempValue;//宣告暫存運算值
let evalArray = [];//宣告一個空陣列，來儲存eval()會使用到的資料
let inputDetailText = '0';//預設計算歷史記錄為0
let tempHistory = '';

numBtn.forEach(function (item) {
    item.addEventListener('click', updateInputResult);
});//在所有數字按鈕綁定事件

operateBtn.forEach(function (item) {
    item.addEventListener('click', operatorBehavior)
});//在所有運算子按鈕綁定事件

reset.addEventListener('click', clearAll);//綁定reset的事件
decimal.addEventListener('click', decimalBehavior);//綁定小數點的事件
// decimal.addEventListener('click', updateInputDetail);//綁定小數點的事件
backward.addEventListener('click', back);//綁定倒退按鈕的事件
doubleZero.addEventListener('click', addDoubleZero);

function addDoubleZero(e) {
    e.preventDefault();
    if (!(inputDetail.textContent === "0")) {
        tempHistory += '00';
        inputDetail.textContent = tempHistory;//渲染計算過程的畫面
        showedValue += '00';//接著把值帶到運算子的函式內
        inputResult.textContent = showedValue;//渲染畫面
    };
};

function updateInputResult(e) {
    e.preventDefault();
    let btnText = e.target.textContent;
    switch (showedValue) {
        case '0':
            showedValue = '';
            break;
        case '+':
            showedValue = '';
            break;
        case '-':
            showedValue = '';
            break;
        case 'x':
            showedValue = '';
            break;
        case '÷':
            showedValue = '';
            break;
        case '00':
            showedValue = '';
            break;
        default:
            break;
    }
    showedValue += btnText;
    inputResult.textContent = showedValue;
    tempHistory += e.target.textContent;
    inputDetail.textContent = tempHistory;
};//綁定所有數字按鈕的函式

function operatorBehavior(e) {
    e.preventDefault();
    let operator = e.target.textContent;
    switch (operator) {
        case '+':
            tempValue = showedValue;
            showedValue = '+';
            inputResult.textContent = showedValue;
            evalArray.push(tempValue);
            evalArray.push('+');
            tempHistory += '+';
            inputDetail.textContent = tempHistory;
            break;
        case '-':
            tempValue = showedValue;
            showedValue = '-';
            inputResult.textContent = showedValue;
            evalArray.push(tempValue);
            evalArray.push('-');
            tempHistory += '-';
            inputDetail.textContent = tempHistory;
            break;
        case 'x':
            tempValue = showedValue;
            showedValue = 'x';
            inputResult.textContent = showedValue;
            evalArray.push(tempValue);
            evalArray.push('*');
            tempHistory += 'x';
            inputDetail.textContent = tempHistory;
            break;
        case '÷':
            tempValue = showedValue;
            showedValue = '÷';
            inputResult.textContent = showedValue;
            evalArray.push(tempValue);
            evalArray.push('/');
            tempHistory += '÷';
            inputDetail.textContent = tempHistory;
            break;
        case '=':
            evalArray.push(showedValue);
            //讓計算出的數字只到小數後4位
            let count = eval(evalArray.join(' ')).toFixed(2);
            showedValue = count + '';
            inputResult.textContent = showedValue;
            evalArray = []; // 清空陣列
            tempHistory += '=';
            inputDetail.textContent = tempHistory;
            break;
        default:
            break;
    }
};//綁定所有運算子按鈕的函式

function clearAll(e) {
    e.preventDefault();
    showedValue = '0';
    tempValue;
    evalArray = [];
    inputResult.textContent = showedValue;
    inputDetailText = '0';
    inputDetail.textContent = '0';
    tempHistory = '';

};//用來reset的函式

function decimalBehavior(e) {
    e.preventDefault();
    //include可使用在字串或陣列，用來尋找或過濾特定的目標
    if (!showedValue.includes('.')) {
        showedValue += ('.');
    };
    inputResult.textContent = showedValue;
    tempHistory += '.';
    inputDetail.textContent = tempHistory;
};//小數點的函式

function checkType(str) {
    switch (str) {
        case '+':
            return true;
            break;
        case '-':
            return true;
            break;
        case 'x':
            return true;
            break;
        case '÷':
            return true;
            break;
        case '00':
            return true;
            break;
        default:
            return false;
            break;
    };
};//檢驗資料類型的函式

function back(e) {
    e.preventDefault();
    if (showedValue != '0') {
        //使用slice的方法，複製到最後一個字之前
        let backDetail = tempHistory.slice(0, -1);
        inputDetail.textContent = backDetail;
        tempHistory = backDetail;
        console.log(showedValue);
        let showedValueDetail = showedValue.slice(0, -1);
        inputResult.textContent = showedValueDetail;
        showedValue = showedValueDetail;
    }
};