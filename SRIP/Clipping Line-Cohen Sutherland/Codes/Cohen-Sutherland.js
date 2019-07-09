
var canvas=document.getElementById("canvas");
var context = canvas.getContext("2d");
context.globalCompositeOperation = 'source-over';

/*var background = new Image();
background.src = "Images/Regions.gif";

background.onload = function(){
    context.drawImage(background, 0, 0, background.width,    background.height,     // source rectangle
                   0, 0, canvas.width, canvas.height); // destination rectangle 
}*/
var INSIDE = 0; // 0000 
var LEFT = 1;   // 0001 
var RIGHT = 2;  // 0010 
var BOTTOM = 4; // 0100 
var TOP = 8;    // 1000 



			var start=[];
			var end=[];

			//Stack that keep tracks of the end points.
			var stack=[];
			var rx1,rx2,ry1,ry2,ax,bx,cx,dx,ay,by,cy,dy,xmin,ymin,xmax,ymax,ox1,oy1,ox2,oy2;
			 rx1=document.getElementById("rx1").value;
			 ry1=document.getElementById("ry1").value;
			 rx2=document.getElementById("rx2").value;
			 ry2=document.getElementById("ry2").value;
			 ox1=document.getElementById("x1").value;
			 oy1=document.getElementById("y1").value;
			 ox2=document.getElementById("x2").value;
			 oy2=document.getElementById("y2").value;

			//bounding rectangle is a square of vertices a, b, c and d
			 ax = parseInt(rx1);
			 ay = parseInt(ry1);
			 bx = parseInt(rx2);
		     by = parseInt(ry1);
			 cx = parseInt(rx2);
			 cy = parseInt(ry2);
			 dx = parseInt(rx1);
			 dy = parseInt(ry2);

			//min max values required to create the outcodes
			xmin = ax
			xmax = cx
			ymin = ay;
			ymax = cy;

//Print the results of the algorithm and which side it is being clipped with respect to			
var p1=document.getElementById("Stmnt1");
var p2=document.getElementById("Stmnt2");
var p3=document.getElementById("Stmnt3");
var p4=document.getElementById("Stmnt4");
var p5=document.getElementById("Stmnt5");
var p6=document.getElementById("Stmnt6");
var p7=document.getElementById("Stmnt7");
var p8=document.getElementById("Stmnt8");
var p9=document.getElementById("Stmnt9");


			function init_square(){
			drawSquare();
		    }
		    function init_line(){
		    	draw_line(ox1,oy1,ox2,oy2)
		    }
		    function grid(){
		    	drawGrid();
		    }
			canvas.addEventListener('click', function(evt)
			{
				var end_points;
				
				if(stack.length > 0)
					end_points = stack.pop();
				console.log('end points of line : ' + end_points[0] + " to " + end_points[1]);
				next_iteration(end_points);

			});

	function set_outcode(point)
	{
				var code;
				outcode ='';

				x = point[0];
				y = point[1];

				//console.log(point);

				if(y > ymax)
				{
					//console.log(ymax);
					code|=TOP;
					//console.log(code);
				}
				if(y < ymin)
				{
					//console.log(ymin);
					code|=BOTTOM;
					//console.log(code);
				}
				if(x > xmax)
				{
					code|=RIGHT;
				}
				if(x < xmin)
				{
					code|=LEFT;
				}
				return code;
			}
	
    p2.innerHTML="";
    p1.innerHTML="";
    p3.innerHTML="";
	p4.innerHTML="";
	p5.innerHTML="";
	p6.innerHTML="";
	p7.innerHTML="";
	p8.innerHTML="";
	p9.innerHTML="";

var l=1;
function next_iteration(end_points)
{
	clip(end_points);
	l++;
}


function clip(end_points){
				
                start_ = end_points[0];
				end_ = end_points[1];

				//console.log(start_,end_);

				 o11 = set_outcode(start_);
				 o22 = set_outcode(end_);

				// console.log(o11,o22);

				 var o11_temp="";
				 var o22_temp="";
				 //o11_temp=~o11_temp;
				 //o22_temp=~o22_temp;

				 //var a1=decbin(o11_temp,4);
				 //var a2=decbin(o22_temp,4);

				 //console.log(a1,a2);

                 o1=decbin(o11,4);
                 o2=decbin(o22,4);

                 if(o1=="0101")
                 	o11_temp="1001";
                 else if(o1=="0110")
                 	o11_temp="1010"

                 p1.style.color="BlueViolet";

				 if(o11_temp)
				 p1.innerHTML="The outcodes are "+o11_temp+ ' and '+o2;
				else 
					p1.innerHTML="The outcodes are "+o1+ ' and '+o2;
				 //console.log(o11&o22);

				if(o1 == '0000' && o2 == '0000')
				{
                    highlightline(end_,start_);
                  //  context.fillText("("+start_[0]+","+start_[1]+")",start_[0],start_[1]);
                    //context.fillText("("+end_[0]+","+end_[1]+")",end_[0],end_[1]);

                    console.log('accept');
				}

				//both the outcodes have the same bit set when both end points are outside bounding rectangle
				else if( (o11 & o22) ==1)
				{	
					console.log('reject');
					//context.fillText("("+start_[0]+","+start_[1]+")",start_[0],start_[1]);
                    //context.fillText("("+end_[0]+","+end_[1]+")",end_[0],end_[1]);

					delete_line(start_, end_);
				}

				//One end point inside bounding rectangle and one outside bounding rectangle
				else if( (o11 & o22) == 0 &&(o1 == '0000' || o2 == '0000'))
				{
					var intersections = find_intersection(o1, end_points,xmin,ymin,xmax,ymax);
					var intersections1 = find_intersection(o2, end_points,xmin,ymin,xmax,ymax);
					if(o1 != '0000')
					{

						//var intersections = find_intersection(o1, end_points,xmin,ymin,xmax,ymax);
						p6.innerHTML="Intersections are : " + intersections[0];
						//console.log("Intersections for o2 are : " + intersections1[0]);

						//delete_line(end_,intersections[0]);
						// context.fillText("("+intersections[0]+")",intersections[0],intersections[0]);
                        // context.fillText("("+end_[0]+","+end_[1]+")",end_[0],end_[1]);

						delete_line(start_, intersections[0]);
						highlightline(end_,intersections[0]);
					}
					else if(o2 != '0000')
					{
						//var intersections1 = find_intersection(o2, end_points,xmin,ymin,xmax,ymax);
						p7.innerHTML="Intersections are : " + intersections1[0];

						//console.log("Intersections for o1 are : " + intersections[0]);

						highlightline(start_,intersections1[0]);
                        delete_line(intersections1[0],end_);
                        //delete_line(start_,end_);
						//highlightline(end_,intersections[0]);

					}
				}

				//When both end points are outside but portion of line is inside
				else if( (o11 & o22) == 0&&(o11>0&&o22>0))
				{
					var intersections = find_intersection(o1, end_points,xmin,ymin,xmax,ymax);
					var intersections1 = find_intersection(o2, end_points,xmin,ymin,xmax,ymax);
					p8.innerHTML="Intersections of start point : " + intersections[0];
					p9.innerHTML="Intersections of end point : " + intersections1[0];

					highlightline(intersections[0],intersections1[0]);
					delete_line(start_, intersections[0]);
					delete_line(end_,intersections1[0]);
				}
			}

function find_intersection(outcode, end_points,xmin,ymin,xmax,ymax){

                context.strokeStyle = 'darkviolet';
	            context.lineWidth = 1.5;
				start_ = end_points[0];
				end_ = end_points[1];

				//All lines are of the form y = mx + c
				//m = (y2-y1)/(x2-x1)
				x1 = start_[0];
				x2 = end_[0];
				y1 = start_[1];
				y2 = end_[1];

				//Keeps track of all intersections
				//We use a list because if the outcode contains 2 '1's, we need to calculate 2 intersections
				intersections_list = []
				//To temporarily store an intersection point
				intersect=[0, 0];
				var minv=(x2-x1)/(y2-y1);
				var m = (y2-y1)/(x2-x1);
				var t1=(ymax-y1)*minv;
				var t2=(ymin-y1)*minv;
				var t3=(xmax-x1)*m;
				var t4=(xmin-x1)*m;

				c = y1 - m*x1;

				if(x1==x2) // slope INFINITY
				{
					if(outcode.charAt(0)=='1')
					{
						 intersect[0] = parseInt(x1)+parseInt((ymax - y1)*minv); 
                         intersect[1] = parseInt(ymax);  
					     intersections_list.push(intersect);
					return intersections_list;
					}
					else if(outcode.charAt(1)=='1')
					{
						  intersect[0] = parseInt(x1) +parseInt((ymin - y1)*minv); 
                          intersect[1] = parseInt(ymin); 
						  intersections_list.push(intersect)
					return intersections_list;
					}

				}

			else if(x1!=x2) // when the slope is not INFINITY
			{

				if(outcode.charAt(0) == '1') //TOP
				{
					p2.style.color='red'
					p2.innerHTML="Clipped w.r.t BOTTOM";
					intersect[0] = Math.round((ymax - c)/m);
					intersect[1] = (ymax);
					intersections_list.push(intersect);
					context.beginPath();
			        context.moveTo(ax,cy);
			        context.lineTo(cx, cy);
			        context.stroke();	
						

				}

				if(outcode.charAt(1) == '1') // BOTTOM
				{
					p3.style.color='tomato'
					p3.innerHTML="Clipped w.r.t TOP";
					intersect[0] = Math.round((ymin - c)/m);
					intersect[1] = (ymin);
					intersections_list.push(intersect);
					context.beginPath();
			        context.moveTo(ax, ay);
			        context.lineTo(cx, ay);
			        context.stroke();	
				}

				 if(outcode.charAt(2) == '1')// RIGHT
				{
					p4.style.color='coral'
					p4.innerHTML="Clipped w.r.t RIGHT";
					intersect[0] = (xmax);
					intersect[1] = Math.round((m * xmax + c));
					intersections_list.push(intersect);
					context.beginPath();
			        context.moveTo(cx, ay);
			        context.lineTo(cx, cy);
			        context.stroke();	
				}

				if(outcode.charAt(3) == '1') // LEFT
				{
					p5.style.color='orange'
					p5.innerHTML="Clipped w.r.t LEFT";
					intersect[0] = (xmin);
					intersect[1] = Math.round((m * xmin + c));
					intersections_list.push(intersect);
					context.beginPath();
			        context.moveTo(ax, ay);
			        context.lineTo(ax, cy);
			        context.stroke();	
				}

				return intersections_list;
			}
		}

function draw_line(oxx1,oyy1,oxx2,oyy2){

			  start = [oxx1,oyy1]; // get from html text field
				end = [oxx2, oyy2];

				stack.push([start, end]);

				context.beginPath();
				context.moveTo(start[0], start[1]);
				context.lineTo(end[0], end[1]);
				//context.fillText("("+end[0]+","+end[1]+")",end[0],end[1]);

				//context.fillText("("+start[0]+","+start[1]+")",start[0],start[1]);

				context.strokeStyle = "#ff00ff";
				context.lineWidth = 0.75;
				context.stroke();
		      
		      }

 function drawSquare(){

	        drawGrid();

	      	//context.clearRect(0,0,600,600);
	        context.strokeStyle = 'black' ;
	        context.lineWidth = 1.75;
			context.beginPath();
			context.moveTo(ax, ay);
			context.lineTo(bx, by);
			context.stroke();	

			//drawing line y=200, length 300 pixels
			context.beginPath();
			context.moveTo(bx, by);
			context.lineTo(cx,cy);
			context.stroke();

			//drawing line x=500
			context.beginPath();
			context.moveTo(cx, cy);
			context.lineTo(dx, dy);
			context.stroke();

			//drawing line y=500
			context.beginPath();
			context.moveTo(dx, dy);
			context.lineTo(ax, ay);
			context.stroke();

//context.fillText("("+start_[0]+","+start_[1]+")",start_[0],start_[1]);
                    //context.fillText("("+end_[0]+","+end_[1]+")",end_[0],end_[1]);
			context.fillText("("+ax+","+ay+")",ax,ay);
            context.fillText("("+ax+","+cy+")",ax,cy);
            context.fillText("("+cx+","+cy+")",cx,cy);
            context.fillText("("+cx+","+ay+")",cx,ay);
}

function highlightline(start_,end_){

                    context.beginPath();
				    context.moveTo(start_[0], start_[1]);
				    context.lineTo(end_[0], end_[1]);
				
				    context.strokeStyle = 'crimson';
				    context.lineWidth = 2;
				    context.stroke();
			

			}

function delete_line(start_, end_){

				context.beginPath();
				context.moveTo(start_[0], start_[1]);
				context.lineTo(end_[0], end_[1]);
				var r=255;
				var g=255;
				var b=255;
				
				var alpha = 1;
                context.strokeStyle = "white";
				context.lineWidth = 1.5;
				context.stroke();
			}

				    


function decbin(dec,length){
  var out = "";
  while(length--)
    out += (dec >> length ) & 1;    
  return out;  
}

function drawGrid(){

var r=255;
var g=140;
var b=0;
var alpha = 0.33;
context.lineWidth = 0.45;
for(let i=0;i<=600;i=i+200)
{

	
	context.moveTo(i,0);
	context.lineTo(i,600);
    context.strokeStyle = "rgba("+r+","+g+","+b+","+alpha+")";
	context.stroke();
}

for(let j=0;j<=600;j=j+200)
{
	
	context.moveTo(0,j);
	context.lineTo(600,j);
	context.strokeStyle = "rgba("+r+","+g+","+b+","+alpha+")";
    context.stroke();
}
}

var canvasOffset = $("#canvas").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;

function handleMouseMove(e) {
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY-  offsetY);
    $("#movelog").html("Coordinates will be displayed as X and Y: " + mouseX +" and " + mouseY);

    // Put your mousemove stuff here

}
$("#canvas").mousemove(function (e) {
    handleMouseMove(e);
});

$('.equipCatValidation').on('keydown keyup', function(e){
    if ($(this).val() > 600
        && e.keyCode !== 46 // keycode for delete
        && e.keyCode !== 8 // keycode for backspace
       ) {
       e.preventDefault();
       $(this).val(600);
    }
});