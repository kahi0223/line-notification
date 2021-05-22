class Trash {
    constructor() {
      this.monday = "";
      this.tuseday = "普通ゴミ";
      this.wednesday = "";
      this.thursday = "缶・ビン・ペットボトル・乾電池";
      this.friday = "普通ゴミとダンボール";
      this.saturday = "プラスチック";
      this.sunday = "";
    }

  getTrash(weekNum) {
      let trash = ""
      if (weekNum === 1) {
        trash = this.monday}
      else if (weekNum === 2) {
        trash = this.tuseday}
      else if (weekNum === 3) {
        trash = this.wednesday}
      else if (weekNum === 4) {
        trash = this.thursday}
      else if (weekNum === 5) {
        trash = this.friday}
      else if (weekNum === 6) {
        trash = this.saturday}
      else{
        trash = this.sunday}
      return(trash)
    }

    getTomorrowTrash(weekNum)
    {
      return this.getTrash(weekNum + 1);
    }
  }

function getTodayWeekNum() {
  const date = new Date();
  const dayOfWeek = date.getDay();
  return dayOfWeek
  }

function getThisWeekPerson(sheet, nameColumn, trashColumn) {
  const lastRow = sheet.getLastRow();
  let thisWeekPerson = "";
  for(let i = 2; i <= lastRow; i++) {
    let cell = sheet.getRange(i, trashColumn)
    let cellValue = cell.getValue()
    if(cellValue === true){ 
      let cellOfThisWeekPerson = sheet.getRange(i, nameColumn);
      thisWeekPerson = cellOfThisWeekPerson.getValue();
    }
  }
  return thisWeekPerson
}

function changePersonToNext(sheet, nameColumn, trashColumn) {
  const lastRow = sheet.getLastRow();
  let currentTrueTrashCell = null;
  for(let i = 2; i <= lastRow; i++) {
    let cell = sheet.getRange(i, trashColumn)
    let cellValue = cell.getValue()
    if(cellValue === true){ 
      currentTrueTrashCell = cell
      cell.setValue(false)
    }
  }
  let isBottomCell = currentTrueTrashCell.activate().offset(1,0).isBlank();
  if (isBottomCell) {
    sheet.getRange(2, trashColumn).setValue(true);
    }
  else {
    currentTrueTrashCell.offset(1, 0).setValue(true);
  }
}

function notifyChangePerson(url, pic) {
  const data = {
    'value1': 'ゴミ当番交代のお知らせです。<br> 来週のゴミ当番: ' + pic,
  };
  const options = {
    'method' : 'post',
    'contentType': 'application/json',
    'payload' : JSON.stringify(data)
  };
  UrlFetchApp.fetch(url, options);
  Logger.info("[info]  URL FETCHED:" + url)
}

function notifyTomorrowTrash(url, trash, pic){
  const data = {
    'value1': '明日のゴミのお知らせです。<br> 明日のゴミ: ' + trash + '<br>現在のゴミ当番:' + pic,
  };
  const options = {
    'method' : 'post',
    'contentType': 'application/json',
    'payload' : JSON.stringify(data)
  };
  UrlFetchApp.fetch(url, options);
  Logger.info("[info]  URL FETCHED:" + url)
}

function myFunction() {
  const SPREAD_SHEET_TAB_NAME = 'Residents';
  const EVENT_NAME = "message_to_me";

  const nameColumn = 1;
  const trashColumn = 2;

  const spreadSheetKey = getSpreadSheetKey();
  const residentsSheet = SpreadsheetApp.openById(spreadSheetKey).getSheetByName(SPREAD_SHEET_TAB_NAME);
  const lineUrl = "https://maker.ifttt.com/trigger/" + getEventName(EVENT_NAME) + "/with/key/" + getIftttKey();

  const trash = new Trash();
  const todayWeekNum = getTodayWeekNum();
  tomorrowTrash = trash.getTomorrowTrash(todayWeekNum);

  let thisWeekPerson = "";
  if (todayWeekNum === 0) {
    changePersonToNext(residentsSheet, nameColumn, trashColumn);
    thisWeekPerson = getThisWeekPerson(residentsSheet, nameColumn, trashColumn);
    notifyChangePerson(lineUrl, thisWeekPerson);
    Logger.log("[info] ChangedPIC")
  }

  thisWeekPerson = getThisWeekPerson(residentsSheet, nameColumn, trashColumn);

  Logger.log("[WeekNum] " + todayWeekNum) ;
  Logger.log("[TomorrowTrash] " + tomorrowTrash);
  Logger.log("[ThisWeekPIC] " + thisWeekPerson);

  if (!tomorrowTrash == ""){ 
    notifyTomorrowTrash(lineUrl, tomorrowTrash, thisWeekPerson);
  }
}
