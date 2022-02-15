function waitForElementToDisplay(id:any, callback:Function, checkFrequencyInMs:number, timeoutInMs:number) {
  var startTimeInMs = Date.now();
  (function loopSearch() {
    if (document.getElementById(id) != null) {
      callback();
      return;
    }
    else {
      setTimeout(function () {
        if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs)
          return;
        loopSearch();
      }, checkFrequencyInMs);
    }
  })();
}
function delay(ms: number, cb:Function) {
  return new Promise( resolve => setTimeout(()=>{
    return resolve(cb());
  }, ms) );
}
function roundedToFixed(input:number, digits:number): number{
  var rounded = Math.pow(10, digits);
  return parseFloat((Math.round(input * rounded) / rounded).toFixed(digits));
}
function insertAfter(node:any, precedingNode:any) {
  var nextNode = precedingNode.nextSibling, parent = precedingNode.parentNode;
  if (nextNode) {
      parent.insertBefore(node, nextNode);
  } else {
      parent.appendChild(node);
  }
  return node;
}
export {
  waitForElementToDisplay,
  delay,
  roundedToFixed,
  insertAfter
}
