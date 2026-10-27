// 'use strict'

(() => {
  window.learning_app = {};
  learning_app.learninglog = [];
  learning_app.category = [];
  learning_app.success = [];
  learning_app.learningtime = [];
  learning_app.biko = [];
  learning_app.categoryCheck = [];
  learning_app.successCheck = [];
  learning_app.learningtimeCheck = [];
  learning_app.bikoCheck = [];


})();

//logcheck.html
function clicklComplete() {
  alert("追加されました");
  if (alert) {
    window.location.href = '../home.html';
  }
}

function clickTitle() {
  window.location.href = '../home.html';
}
let complete = document.getElementById("click-btn-complete");
if (complete !== null) {
  complete.addEventListener("click", clicklComplete)
}

//study.html

function clickStart() {
  if (start.value === "学習終了") {
    let lastTime = new Date();
    let start = localStorage.getItem("startTime")
    let ago = dayjs(lastTime).diff(start, "minute")
    ago = ago
    console.log(ago)
    localStorage.setItem("time", ago);
    window.location.href = '../log/logcreate.html';
  } else {
    start.value = "学習終了"
    let startTime = new Date()
    let category = document.getElementById('category').value;
    localStorage.setItem("category", category);
    localStorage.setItem("startTime", startTime);
  }
}

let start = document.getElementById("click-btn-leraning");
if (start !== null) {
  start.addEventListener("click", clickStart)
}

let login = document.getElementById('click-btn-torikomi');
if (login !== null) {
  login.addEventListener("click", () => {
    let nyuryoku = window.prompt('名前を入力してください')
    let username = localStorage.getItem('username')
    if (username === null) {
      window.prompt("はじめまして 名前の登録を行います")
      localStorage.setItem("username", nyuryoku);
      window.alert("ようこそ")
      window.location.href = 'home.html';
    } else if (username === nyuryoku) {
      window.location.href = 'home.html';
    } else {
      window.alert("不正な名前です。")
    }
  })
}

//log
//記録を見せるフィールドにhtmlを追加する。
function readLogcategoty(log) {

  let logValue = document.createElement('div');
  logValue.className = "category"
  logValue.innerText = log['category']
  category.append(logValue)
}


function readLogsuccess(log) {
  logValue = document.createElement('div');
  logValue.className = "success"
  logValue.innerText = log["success"] + "問"
  success.append(logValue)

}

function readLoglearningtime(log) {
  logValue = document.createElement('div');
  logValue.className = "learningtime"
  logValue.innerText = log["learningtime"] + "分"
  learningtime.append(logValue)
}

function readLogbiko(log) {
  logValue = document.createElement('div');
  logValue.className = "biko"
  logValue.innerText = log["biko"]
  biko.append(logValue)
}

//ログリストにあるデータを一つ一つ出す。
let containerEl = document.getElementById('learninglog');
function showLog() {
  const strlogList = localStorage.getItem("logList");
  let logList = JSON.parse(strlogList);
  const learninglog = document.querySelector('#learninglog');
  for (let i = 0; i < logList.length; i++) {
    let obj = logList[i];
    readLogcategoty(obj);
    readLogsuccess(obj);
    readLoglearningtime(obj);
    readLogbiko(obj);

  }

}

window.addEventListener("DOMContentLoaded", () => {
  showLog();
});

//create

//logListの中にオブジェクトを入れる
function createlogObj(obj) {
  let logList = [];
  if (localStorage.getItem("logList") !== null) {
    const strlogList = localStorage.getItem("logList");
    logList = JSON.parse(strlogList);
  }
  logList.push(obj);
  const serializedArray = JSON.stringify(logList);
  localStorage.setItem("logList", serializedArray)
  // window.location.href = 'logcheck.html'
}

//入力された値をオブジェクトにする
function creatObject() {
  if (localStorage.getItem("time") !== "") {
    document.getElementById('learningtime').value = localStorage.getItem("time");
    localStorage.setItem("time", "");
  }
  if (localStorage.getItem("category") !== "") {
    document.getElementById('category').value = localStorage.getItem("category");
    localStorage.setItem("category", "");

  }
  let category = document.getElementById('category').value;
  let success = document.getElementById('success').value;
  let learningtime = document.getElementById('learningtime').value;
  let biko = document.getElementById('biko').value;
  if (biko === "") {
    biko = "　";
  }


  if (category.value !== '' && success.value !== '' && learningtime !== '') {
    let learninglogObj = {
      category: category,
      success: success,
      learningtime: learningtime,
      biko: biko,
    }
    // createlogObj(learninglogObj);

    let strObj = JSON.stringify(learninglogObj)
    localStorage.setItem("checkLog", strObj)
    window.location.href = 'logcheck.html';

  }
}

window.addEventListener("DOMContentLoaded", () => {
  checkLog();
});


let create = document.getElementById("click-btn-create")
if (create !== null) {
  create.addEventListener("click", creatObject);
}

function checkLog() {
  let strobj = localStorage.getItem("checkLog")
  let obj = JSON.parse(strobj);
  let logValue;

  removeTag()

  logValue = document.createElement('div');
  logValue.className = "category"
  logValue.innerText = obj['category']
  categoryCheck.append(logValue)

  logValue = document.createElement('div');
  logValue.className = "success"
  logValue.innerText = obj["success"] + "問"
  successCheck.append(logValue)

  logValue = document.createElement('div');
  logValue.className = "learningtime"
  logValue.innerText = obj["learningtime"] + "分"
  learningtimeCheck.append(logValue)

  logValue = document.createElement('div');
  logValue.className = "biko"
  logValue.innerText = obj["biko"]
  bikoCheck.append(logValue)

  let create = document.getElementById("click-btn-complete")
  if (create !== null) {
    create.addEventListener("click", () => createlogObj(obj));
    localStorage.setItem("checkLog", "");

  }


}

function removeTag() {
  const categoryEl = document.querySelectorAll('.category')
  remove(categoryEl);
  const successEl = document.querySelectorAll('.success')
  remove(successEl);
  const learningtimeEl = document.querySelectorAll('.learningtime')
  remove(learningtimeEl);
  const bikoEl = document.querySelectorAll('.biko')
  remove(bikoEl);

}

function remove(array) {
  for (let val of array) {
    val.remove();
  }
}

function studyLog() {
  if (localStorage.getItem("time") !== "") {
    document.getElementById('learningtime').value = localStorage.getItem("time");
  }
  if (localStorage.getItem("category") !== "") {
    document.getElementById('category').value = localStorage.getItem("category");

  }

}

window.addEventListener("DOMContentLoaded", () => {
  studyLog()
  let category = document.getElementById("category")
  category.addEventListener('input', checkConditions);
  let success = document.getElementById("success")
  success.addEventListener('input', checkConditions);
  let learningtime = document.getElementById("learningtime")
  learningtime.addEventListener('input', checkConditions);


});

function checkConditions() {
  isKuhaku = category.value !== '' && success.value !== '' && learningtime.value !== '';
  isType = typeof category.valie
  if (isKuhaku) {
    document.getElementById('click-btn-create').disabled = false;
  } else {
    document.getElementById('click-btn-create').disabled = true;
  }
}

