# LineNotification

LineNotificationSystem

Using...

- IFTTT(Webhook-LineNotification) 
- GAS(Script)
- GoogleSpreadSheet(DB)

## Setting your Config.gs

please create `config.gs` as below.

```
function getSpreadSheetKey () {
  return "SPREAD_SHEET_KEY"
}

function getIftttKey() {
  return "IFTTT_KEY"
}

function getEventName(event_name) {
  return "EVENT_NAME1";
}
```
## Setting your Spreadsheet

| Name | isPIC | 
| -- | -- | 
| NAME1 | FALSE | 
| NAME2 | TRUE |
| NAME3 | FALSE |
| *** | FALSE |
