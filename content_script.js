chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	
	chrome.extension.sendMessage({wanting:"url_please", data_url:document.location.href});
	
});  

console.log(document.location.href);

chrome.extension.sendMessage({data:"search",url_to_show: document.location.href});
    