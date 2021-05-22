# LineNotification

LineNotificationSystem

Using...

- IFTTT(Webhook-LineNotification) 
- GAS(Script)
- GoogleSpreadSheet(DB)

## How to Write your Config.gs

create `config.gs` as below in the root dir.

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

## References

github - GAS (https://tonari-it.com/gas-github-assistant-install/#toc2)
