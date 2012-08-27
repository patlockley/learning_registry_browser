  chrome.extension.onMessage.addListener(

	function(request, sender, sendResponse) {
	
		
	}
	
  );
	

  function init(){
	
		chrome.extension.sendMessage({wanting:"tab_id"}, function(data){
			
			populate_window();
			
		});
  
  }
  
  function populate_window(){
	
	var bkg = chrome.extension.getBackgroundPage(); 
	
	obj = bkg.active_data;

	parent_node = document.getElementById("attrib_iframe").contentDocument;
	
	var page_url = document.createElement("H2");
	newtext=document.createTextNode("Documents in the Learning Registry Node");
	page_url.appendChild(newtext);
	parent_node.body.appendChild(page_url);	
	
	counter = 1;

	function more_open(){
	
		if(document.getElementById("attrib_iframe").contentWindow.document.getElementById('document_' + this.div_action).style.display=='block'){
			document.getElementById("attrib_iframe").contentWindow.document.getElementById('document_' + this.div_action).style.display='none'
			this.value = "See document";	
		}else{
			document.getElementById("attrib_iframe").contentWindow.document.getElementById('document_' + this.div_action).style.display='block'
			this.value = "Hide document";
		}
		
	}
	
	while(value = obj.pop()){
	
		var page_url = document.createElement("A");
		page_url.href = "http://alpha.mimas.ac.uk/obtain?by_doc_ID=true&request_ID=" + value[0];
		page_url.innerHTML = "Document ID " + value[0];
		page_url.target = "_blank";
		parent_node.body.appendChild(page_url);	
		
		day = value[1].split("T");
		date = day[0];
		date = date.split("-");
		
		var page_url = document.createElement("P");
		newtext=document.createTextNode("Submitted " + date[2] + "/" + date[1] + "/" + date[0]);
		page_url.appendChild(newtext);
		parent_node.body.appendChild(page_url);	
		
		var page_reveal_segment = document.createElement("FORM");		
		var page_reveal_segment_button = document.createElement("INPUT");	
		page_reveal_segment_button.setAttribute("type","button");
		page_reveal_segment_button.setAttribute("value","See Document");	
		page_reveal_segment.appendChild(page_reveal_segment_button);		
		parent_node.body.appendChild(page_reveal_segment);
		page_reveal_segment_button.div_action = counter;
		page_reveal_segment_button.addEventListener("click",more_open);
		
		var page_url = document.createElement("P");
		newtext=document.createTextNode(value[2]);
		page_url.appendChild(newtext);
		page_url.id = "document_" + counter++;
		page_url.style.display="none";
		parent_node.body.appendChild(page_url);	
	}
	
  }
  
  window.addEventListener("load",init);