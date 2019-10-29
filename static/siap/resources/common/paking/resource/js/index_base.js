	function uniqueIndex(rs,index,month){
		var h=-1;
		var splitIndex = new Array();
		var splitMonth = new Array();
		var flag=true;
		for(var i=0;i<rs["index"].length;i++){
			var name=rs["index"][i].name;
			if(name.toLowerCase()!="collection1".toLowerCase()){
				h++;
				splitIndex[h]=name.substr(0,name.length-6); 
				splitMonth[h]=parseInt(name.substr(name.length-6,name.length));
				if(name.length>9&&/^_\d{8}$/.test(name.substr(name.length-9,name.length))){
					month[h]=parseInt(name.substr(name.length-8,name.length));
					index[h]=name.substr(0,name.length-9);
				}else if(/^\d{6}$/.test(splitMonth[h])){
					index[h]=splitIndex[h]; 
					month[h]=splitMonth[h];
				}else{
					index[h]=name;
					month[h]=-1;
				}
			}
		}
		for(var j=index.length-1;j>0;j--){
			for(var k=j-1;k>=0;k--){
				if(index[j]==index[k]){
					var m=month[j]>month[k]?k:j;
					month.splice(m,1);
					index.splice(m,1);
				}
			}
		}
		
		for(k=0;k<index.length;k++){
			if(index[k]=="collection1"){
				flag=false;
				break;
			}
		}
		if(flag){
			index[index.length]="collection1";
		}
	}