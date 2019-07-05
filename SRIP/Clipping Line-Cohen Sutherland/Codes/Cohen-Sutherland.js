
//var canvas=document.getElementById("canvas");
var context = canvas.getContext("2d");
context.globalCompositeOperation = 'source-over';



/*for(let var i=0;i<=600;i=i+200)
{
	
	context.moveTo(i,0);
	context.lineTo(i,600);
	context.stroke();
}

for(let var j=0;j<=600;j=j+200)
{
	
	context.moveTo(0,j);
	context.lineTo(600,j);
	context.stroke();
}*/

var factor=50;
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

			function init_square()
			{
			drawSquare();
		    }
		    function init_line()
		    {
		    	draw_line(ox1,oy1,ox2,oy2)
		    }
		    function grid()
		    {
		    	drawGrid();
		    }
			canvas.addEventListener('click', function(evt)
			{
				var end_points;
				
				if(stack.length > 0)
					end_points = stack.pop();
				console.log('end points of line : ' + end_points[0] + " to " + end_points[1]);
				clip(end_points);

			});

	function set_outcode(point)
	{
				var code=INSIDE;
				outcode ='';

				x = point[0];
				y = point[1];

				if(y > ymax)
				{
					code|=TOP;
				}
				if(y < ymin)
				{
					code|=BOTTOM;
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
	


function clip(end_points)
			{
				
                start_ = end_points[0];
				end_ = end_points[1];

				 o11 = set_outcode(start_);
				 o22 = set_outcode(end_);

                 o1=decbin(o11,4);
                 o2=decbin(o22,4);
				
				 console.log('outcodes are : ' + o1 + ' and ' + o2);
				 console.log(o11&o22);

				if(o1 == '0000' && o2 == '0000')
				{
                    highlightline(end_,start_);
					console.log('accept');
				}

				//both the outcodes have the same bit set when both end points are outside bounding rectangle
				else if( (o11 & o22) ==1)
				{	
					console.log('reject');
					delete_line(start_, end_);
				}

				//One end point inside bounding rectangle and one outside bounding rectangle
				else if( (o11 & o22) == 0 &&(o1 == '0000' || o2 == '0000'))
				{
					if(o1 != '0000')
					{
						var intersections = find_intersection(o1, end_points,xmin,ymin,xmax,ymax);
						console.log("Intersections for o1 are : " + intersections[0]);

						//delete_line(end_,intersections[0]);
						delete_line(start_, intersections[0]);
						highlightline(end_,intersections[0]);
					}
					else if(o2 != '0000')
					{
						var intersections1 = find_intersection(o2, end_points,xmin,ymin,xmax,ymax);
						console.log("Intersections for o2 are : " + intersections1[0]);
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
					console.log("Intersections of start point : " + intersections[0]);
					console.log("Intersections of end point : " + intersections1[0]);

					//highlightline(intersections[0]);
					delete_line(start_, intersections[0]);
					delete_line(end_,intersections1[0]);
				}
			}

			function delete_line(start_, end_)
			{
				context.beginPath();
				context.moveTo(start_[0], start_[1]);
				context.lineTo(end_[0], end_[1]);
				
				context.strokeStyle = '#ffffff';
				context.lineWidth = 2.5;
				context.stroke();
			}

			function find_intersection(outcode, end_points,xmin,ymin,xmax,ymax)
			{

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
					intersect[0] = (ymax - c)/m;
					intersect[1] = ymax;
					intersections_list.push(intersect);
				}

				if(outcode.charAt(1) == '1') // BOTTOM
				{
					
					intersect[0] = (ymin - c)/m;
					intersect[1] = ymin;
					intersections_list.push(intersect)
				}

				if(outcode.charAt(2) == '1')// RIGHT
				{
					intersect[0] = xmax;
					intersect[1] = (m * xmax + c);
					intersections_list.push(intersect);
				}

				if(outcode.charAt(3) == '1') // LEFT
				{
					intersect[0] = xmin;
					intersect[1] = (m * xmin + c);
					intersections_list.push(intersect);
				}

				return intersections_list;
			}
		}

function draw_line(oxx1,oyy1,oxx2,oyy2)
    {
			  start = [oxx1,oyy1]; // get from html text field
				end = [oxx2, oyy2];

				stack.push([start, end]);

				context.beginPath();
				context.moveTo(start[0], start[1]);
				context.lineTo(end[0], end[1]);

				context.strokeStyle = "#ff00ff";
				context.lineWidth = 1;
				context.stroke();
		      
		      }

 function drawSquare() 
	      {

	      	context.clearRect(0,0,600,600);
	        context.strokeStyle = 'black' ;
	        context.lineWidth = 2.75;
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
}

          function highlightline(start_,end_)
			{
                    context.beginPath();
				    context.moveTo(start_[0], start_[1]);
				    context.lineTo(end_[0], end_[1]);
				
				    context.strokeStyle = 'darkgreen';
				    context.lineWidth = 2;
				    context.stroke();
			}
				    


function decbin(dec,length){
  var out = "";
  while(length--)
    out += (dec >> length ) & 1;    
  return out;  
}

function drawGrid()
{

	/*var leftMargin =0;

	var bottomMargin =610;

	var align=(factor/2)-5;

	context.beginPath();

	for(i=0; i<=600; i++)

	{

		if(i<600)

		{

			context.fillStyle = "white";

			context.font="15px Arial";

			context.fillText(i,leftMargin+i*factor+align,bottomMargin+15)

		}

		context.moveTo(leftMargin+i*factor,bottomMargin);

		context.lineTo(leftMargin+i*factor,bottomMargin-600*factor);

	}

	for(i=0; i<=600; i++)

	{

		if(i<600)

		{

			context.fillStyle = "white";

			context.font="15px Arial";

			context.fillText(i,leftMargin-15,bottomMargin-i*factor-align)

		}

		context.moveTo(leftMargin,bottomMargin-i*factor);

		context.lineTo(leftMargin+600*factor,bottomMargin-i*factor);

	}

	context.lineWidth = 1;

	context.strokeStyle = 'white';

	context.stroke();*/
context.lineWidth = 0.75;
for(let i=0;i<=600;i=i+200)
{

	
	context.moveTo(i,0);
	context.lineTo(i,600);
	context.strokeStyle='gold';
	context.stroke();
}

for(let j=0;j<=600;j=j+200)
{
	
	context.moveTo(0,j);
	context.lineTo(600,j);
	context.strokeStyle='gold';
    context.stroke();
}
}




var canvasOffset = $("#canvas").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;

/*function handleMouseDown(e) {
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    $("#downlog").html("Down: " + mouseX + " / " + mouseY);

    // Put your mousedown stuff here

}

function handleMouseUp(e) {
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    $("#uplog").html("Up: " + mouseX + " / " + mouseY);

    // Put your mouseup stuff here
}

function handleMouseOut(e) {
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    $("#outlog").html("Out: " + mouseX + " / " + mouseY);

    // Put your mouseOut stuff here
}*/

function handleMouseMove(e) {
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY-offsetX);
    $("#movelog").html(" X Coordinate will be displayed as X: " + mouseX);

    // Put your mousemove stuff here

}
$("#canvas").mousemove(function (e) {
    handleMouseMove(e);
});

/*$("#canvas").mousedown(function (e) {
    handleMouseDown(e);
});
$("#canvas").mousemove(function (e) {
    handleMouseMove(e);
});
$("#canvas").mouseup(function (e) {
    handleMouseUp(e);
});
$("#canvas").mouseout(function (e) {
    handleMouseOut(e);
});*/




$('.equipCatValidation').on('keydown keyup', function(e){
    if ($(this).val() > 600
        && e.keyCode !== 46 // keycode for delete
        && e.keyCode !== 8 // keycode for backspace
       ) {
       e.preventDefault();
       $(this).val(600);
    }
});