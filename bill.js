/*
 * 0
 * 1	date
 * 2 	name
 * 3	price div{{cancel or not}}
 * 4 	type
 * 5 	where
 * 6	more detail
 *
 */


/*
 * function name: totalByPage
 * description: 
 *		calculate total price of {{page}} pages from current page using setInterval
 *		this method will go through those selected pages 
 * params: 
 * 		start 		---		start page
 *		end 		---		end page
 * 		interval 	---		interval time
 * return:
 *		total price of these pages
 */
function totalByPage(start, end, interval){
	if(end < start ){
			console.log("Please change end date");
			return;
	}
	total=0;
	var page=window.location.href.split("=");
	var index=parseInt(page[1]);
	var right=index>start?false:true;


	function move(){
		
		if(right){
			if(start<=index){
				var a = $(".trip-expand__origin td");
				for(var i=3;i<a.length;i+=7){
					var priceString = a.get(i).textContent.replace(/\s/g, '');
					if(priceString[0] == '$'){
						var price = parseFloat(priceString.substring(1));
						console.log(price);
						total+=price;
					}
				}
			}
			
			if(index==end){
				clearInterval(timer);
				console.log("total price: "+total);
			}else{
				$(".pagination__next").trigger("click");
			}
			index++;
		}else{
			index--;
			$(".pagination__previous").trigger("click");
			if(index==start){
				right=true;
			}

		}

			
		

		
	}
	var timer = setInterval(move,interval.toString());
}

// example
totalByPage(3,15,800)

/*
 * function name: totalByPageAjax
 * description:
 *		calculate total price of {{page}} pages from current page using ajax
 * params:
 * 		start 		---		start page
 *		end 		---		end page
 * return:
 *		total prices of these pages
 */

function totalByPageAjax(start,end){
	var a;
	total = 0;
	for(var n=start;n<=end;n++){
		$.get("https://riders.uber.com/trips?page="+n.toString(),function(data,status){
			a=data.match(/trip-expand__origin.+?\$[0-9]+.[0-9]{2}/g);
			var b=a.join();
			a = b.match(/[0-9]+\.[0-9]{2}/g);
			for(var i=0;i<a.length;i++){
				var price = parseFloat(a[i]);
				total += price;
			}
			

		});
	}
}

// example
totalByPageAjax(1,27);

/*
 * function name: translateDate
 * description: 
 *		convert date from "mm/dd/yy" to "yy,mm,dd"
 * params:
 *		date 	---		date with form "mm/dd/yy"
 * return:
 * 		date with form "yy,mm,dd"
 */
function translateDate(date){
	var ori = date.split("/");
	var temp1 = ori[2];
	var temp2 = ori[1];
	ori[1] = ori[0];
	ori[0] = temp1;
	
	ori[2] = temp2;
	return ori.join()

}

/*
 *
 * params: 
 * 		start	---		more recent date, start date with form "yy/mm/dd" 
 *		end 	--- 	end date with form "yy/mm/dd" 
 */
function PartTotalByDateAjax(n,start,end){
	$.get("https://riders.uber.com/trips?page="+n.toString(),function(data,status){
		a = data.match(/trip-expand__origin.+?\$[0-9]+.[0-9]{2}/g)
		var exceed = false;
		for(var i=0;i<a.length;i++){
			var date = translateDate(a[i].match(/[0-1][0-9]\/[0-3][0-9]\/[0-9][0-9]/)[0]);console.log(date);
			if(date <= start){
				if( date >= end){
					var price = parseFloat(a[i].match(/[0-9]+\.[0-9]{2}/)[0]);//console.log(price);
					total += price;
				}else{
					exceed = true;//console.log("break");
					break;
				}
			}

		}

		if(!exceed){
			PartTotalByDateAjax(n+1,start,end);
		}else{
			console.log("finished");
			return ;
		}

	});
}

function totalByDateAjax(start,end){
	total = 0;
	PartTotalByDateAjax(1,start,end);
}

// example
totalByDateAjax("17,10,22","16,08,12");




