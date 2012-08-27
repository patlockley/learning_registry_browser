  
  var url_cache = new Array();
  
  chrome.extension.onMessage.addListener(
  
    function(request, sender, sendResponse) {
	
		if(request.data=="search"){
		
			var xmlHttpRequest = new XMLHttpRequest();
			
			url = request.url_to_show;
																
			xmlHttpRequest.open("GET","http://alpha.mimas.ac.uk/harvest/getrecord?by_resource_id=TRUE&request_id=" + escape(url), true);
			
			xmlHttpRequest.onreadystatechange=function(){  
			  
				if (xmlHttpRequest.readyState==4){
														
					var my_JSON_object = JSON.parse(xmlHttpRequest.responseText);
						
					if(my_JSON_object.getrecord.record!=""){
						
						url_cache[sender.tab.id] = new Array();
						
						for(x = 0; x<my_JSON_object.getrecord.record.length; x++){
																			
							var data_set = new Array(my_JSON_object.getrecord.record[x].header.identifier,my_JSON_object.getrecord.record[x].resource_data.node_timestamp,my_JSON_object.getrecord.record[x].resource_data.resource_data);													
							url_cache[sender.tab.id].push(data_set);
							
							chrome.tabs.connect(sender.tab.id);
			
							chrome.pageAction.show(sender.tab.id);
							
						}
																							
					}		
							
				}
					
			};				
		
			xmlHttpRequest.send();
			
		}else if(request.wanting=="tab_id"){
		
			active_data = url_cache[curr_tab];
		
		}		
		     
      sendResponse({});
    }
  
  );
  
  var curr_tab = "";
  
  chrome.tabs.onSelectionChanged.addListener(function(tabId, selectInfo) {
  	
		curr_tab = tabId;	
	
  });  
  