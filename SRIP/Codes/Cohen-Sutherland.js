var canv= document.getElementById("Canvas"); 
var context = canv.getContext("2d");
context.globalCompositeOperation = 'source-over';

var x1s,x2s,y1s,y2s,line_coords,line_coords_length;
var xx,xx1,yy,yy1;
var coordinates=[[0,0],[0,0]];
var INSIDE = 0; // 0000 
var LEFT = 1;   // 0001 
var RIGHT = 2;  // 0010 
var BOTTOM = 4; // 0100 
var TOP = 8;    // 1000 
var ax,ay,bx,by,cx,cy,dx,dy;

var xmin,xmax,ymax,ymin;

var Iterated_till_now=[];
var line_mov=[];
var remaining=[];
var start=[];
var end=[];

//i introduced this to understand stepwise progress of the code(algorithm)
var side_br=1;

var iteration=0;

var p1=document.getElementById("Stmnt1");
var p2=document.getElementById("Stmnt2");
var p3=document.getElementById("Stmnt3");
var p4=document.getElementById("Stmnt4");
var p5=document.getElementById("Stmnt5");
var p6=document.getElementById("Stmnt6");
var p7=document.getElementById("Stmnt7");
var p8=document.getElementById("Stmnt8");
var p9=document.getElementById("Stmnt9");
var p0=document.getElementById("Stmnt0");

var s1,s2,e1,e2;


//Function To init The Default values And Overwrite the Line values
function init() 
{
	//Updating wrong Inputs


  	//Getting All the Inputs Given by the User 
	x1s=document.getElementById("x1s").value;
	x2s=document.getElementById("x2s").value;
	y1s=document.getElementById("y1s").value;
	y2s=document.getElementById("y2s").value;
	xx=document.getElementById("x1").value;
	xx1=document.getElementById("x2").value;
    yy=document.getElementById("y1").value;
    yy1=document.getElementById("y2").value;
	ax = x1s;
	ay = y1s;
	bx = x2s;
	by = y1s;
	cx = x2s;
	cy = y2s;
	dx = x1s;
	dy = y2s;
	xmin = ax;
	xmax = cx;
	ymin = ay;
	ymax = cy;
	Iterated_till_now=[];
	line_mov=[];
	remaining=[];
	start=[];
	end=[];
	side_br=1;
	iteration=0;


	context.clearRect(0,0,600,600);

   /*context.font = 'italic 18px Courier New';
    context.textAlign = 'center';
   // context. textBaseline = 'middle';
    context.fillStyle = 'black';  // a color name or by using rgb/rgba/hex values
    context.fillText('Let Us Begin!', 300, 300); // text and position*/
   // alert("Let us begin!");
    /*
    context.fillText('Press Start to draw the line and clipping rectangle!', 310, 320); 
    context.fillText('Press Next step and Previous Step to ',340,350);
    context.fillText('understand the Cohen Sutherland algorithm',320,370);*/

	p2.innerHTML="Demonstration of the cohen sutherland algorithm";
	p3.innerHTML="";
	p4.innerHTML="";
	p5.innerHTML="";
	p6.innerHTML="";
	p7.innerHTML="";
	p8.innerHTML="";
	p9.innerHTML="";
	p0.innerHTML="";

	
}  
function begin()
{

	    init();
	    //console.log(xx,xx1,yy,yy1);
	    alert("Let us begin");
		var i;
		start=[document.getElementById("x1").value,document.getElementById("y1").value];
		end=[document.getElementById("x2").value,document.getElementById("y2").value];
		coordinates[0][0]=document.getElementById("x1").value;
		coordinates[0][1]=document.getElementById("y1").value;
		coordinates[1][0]=document.getElementById("x2").value;
		coordinates[1][1]=document.getElementById("y2").value;
		
	    //start=[coordinates[0][0],coordinates[0][1]];
        //end=[coordinates[1][0],coordinates[1][1]];
        //console.log(start,end);
		for (i = 0; i<2; i++) 
		{
			line_mov.push([coordinates[i][0], coordinates[i][1]]);
		}
		Iterated_till_now.push(line_mov);
		rep(line_mov);
}


//var start=[coordinates[0][0],coordinates[0][1]];
//var end=[coordinates[1][0],coordinates[1][1]];
//console.log(start,end);

//Function Clipped executes On Clicking Clip Everytime
function next_iteration()
{
	clip();
	iteration++;
}
function highlightline(start,end){

                    context.beginPath();
				    context.moveTo(start[0], start[1]);
				    context.lineTo(end[0], end[1]);
				
				    context.strokeStyle = 'crimson';
				    context.lineWidth = 2;
				    context.stroke();
			

			}
//Previous Iteration
function prev_iteration()
{
	p1.innerHTML="";
	p2.innerHTML="";
	p3.innerHTML="";
	p4.innerHTML="";
	p5.innerHTML="";
	p6.innerHTML="";
	p7.innerHTML="";
	p8.innerHTML="";
	p9.innerHTML="";
	iteration=0;
	remaining=[];
	if(side_br == 1)
	{
		line_mov= Iterated_till_now[0].slice();
	}
	else if(side_br == 2)
	{
		line_mov= Iterated_till_now[0].slice();
		side_br = 1;
		Iterated_till_now.splice(1,);
	}
	else if(side_br == 3)
	{
		line_mov= Iterated_till_now[1].slice();
		side_br = 2;
		Iterated_till_now.splice(2,)
	}
	else if(side_br == 4)
	{
		line_mov= Iterated_till_now[2].slice();
		side_br = 3;
		Iterated_till_now.splice(3,);
	}
	else if(side_br == 5)
	{
		line_mov = Iterated_till_now[3].slice();
		side_br = 4;
		Iterated_till_now.splice(4,);
	}
	else
	{
		side_br--;
	}
	rep(line_mov);
}
//Function To clip the edge It gets called by Clipped() function and it clips the respective edge
function clip()
{
	    //var a=parseInt(line_mov[0][0]);
	    /*var b=parseInt(line_mov[0][1]);
	    var c=parseInt(line_mov[1][0]);
	    var d=parseInt(line_mov[1][1]);
	    var a1=[a,b];
	    var a2=[c,d];
	    var o1=set_outcode(a1);
		var o2=set_outcode(a2);
		o1=decbin(o1,4);
		o2=decbin(o2,4);*/
	switch(side_br)
	{
		case 1: 
				side_left(line_mov,iteration);
				//console.log(line_mov);
				break;
		
		case 2: 
				side_top(line_mov,iteration);
				//console.log(line_mov);
				break;

		case 3: 
				side_right(line_mov,iteration);
				//console.log(line_mov);
				break;

		case 4: 
				side_down(line_mov,iteration);
				//console.log(line_mov);
				break;
		
		case 5: if(line_mov.length!=0)
				{
					p1.style.color="orangered";
					p1.innerHTML = "Final coordinates of the clipped line are";
					//console.log(line_mov);
					if(line_mov.length===4)
					{
						p2.style.color='red';
                     p2.innerHTML ="("+line_mov[0][0]+" , "+line_mov[0][1]+")"+" & "+"("+line_mov[2][0]+","+line_mov[2][1]+")";
                     }
                    else
                    { 
                    	p2.style.color='red';
                    	 p2.innerHTML ="("+line_mov[0][0]+" , "+line_mov[0][1]+") " + " & " + " ("+line_mov[1][0]+","+line_mov[1][1]+")";
                    	}
                    p4.style.color="orangered";
					p4.innerHTML = "You can now enter new values!";
					p5.innerHTML = " ";
					p6.innerHTML = "";
					rep(line_mov);
				}
				else
				{
					//rep(line_mov);
					if(xx==xx1)
					{
						if(xx>xmax)
						{
							alert("Rejected ,"+" "+"the bitwise AND of both outcodes of the endpoints is not 0 ");
							p1.innerHTML = "Line is rejected, No part is inside the Bounding rectangle";
					        p4.innerHTML = "Experiment Ends Here";
					    }
					    else if(xx>=xmin&& xx<=xmax)
					    {
					    context.clearRect(0,0,600,600);
					    drawSquare();
						context.beginPath();
						context.moveTo(xx,ymin);
		     			context.lineTo(xx1,ymax);
		     			context.lineWidth = 2;
	         			context.strokeStyle = 'crimson';
	         			context.stroke();
	         			p1.style.color="Indigo";
						p1.innerHTML = "Final coordinates of the clipped line are";
						p2.innerHTML ="("+xx+" , "+ymin+")"+"and"+"("+xx1+","+ymax+")";
						//context.scale(2, 2);
						context.fillText("("+xx1+","+ymin+")",xx1,ymin,100);
						context.fillText("("+xx1+","+ymax+")",xx1,ymax,100);
					   }

					}
					else
					{
					alert("Rejected ,"+" "+"the bitwise AND of both outcodes of the endpoints is not 0 ");
					p1.innerHTML = "Line is rejected, No part is inside the Bounding rectangle";
					p4.innerHTML = "Experiment Ends Here";
                }
            }
				break;
	}
}

function set_outcode(point){
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
				//if(code==0)
					//return -1;
				return code;
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

function decbin(dec,length)
{
  var out = "";
  while(length--)
    out += (dec >> length ) & 1;    
  return out;  
}


function side_left(path,i)
{
	/*var flag=0;
	var o11=set_outcode(start);
	var o22=set_outcode(end);
	o11=decbin(o11,4);
	o22=decbin(o22,4);
	//console.log(o11&o22);
	for(let j=0;j<4;j++)
		{
			if(o11.charAt(j)==o22.charAt(j))
				flag=1;
		}
		if(flag==1)
		{
			delete_line(start,end);
			alert("Line has been rejected, both outcodes have same bit set");
			p2.innerHTML = "Line has been rejected";
			return;
		}*/
	p3.style.color="darkblack";
	p4.style.color="darkblack";
	p2.style.color="darkorchid";
	p2.innerHTML = "Against Left Side";
	
	if(i>=0 && i<path.length-1)
	{
		var o1=set_outcode(path[i]);
		var o2=set_outcode(path[i+1]);
		o1=decbin(o1,4);
		o2=decbin(o2,4);
		p1.innerHTML = "Clipped  line joining ("+ path[i] + ") & (" + path[i+1] + ")";
		drawLine(path[i],path[i+1],'left_side');
		if(!check(path[i], 'left_side') && !check(path[i+1], 'left_side'))
		{//No point Inside

			endpoints = [path[i], path[i+1]];
			var i1=find_intersections_oc(o1,endpoints);
			var i2=find_intersections_oc(o2,endpoints);
			//console.log(i1,i2);
			//highlightline(i1,i2);
		}
		
		if(check(path[i], 'left_side') && check(path[i+1], 'left_side'))
		{//Both Inside 
			p3.innerHTML="The outcode is"+" "+o1;
			p4.innerHTML="The outcode is"+" "+o2;
			
			remaining.push(path[i+1]);
		}
		
		else if(check(path[i], 'left_side') && !check(path[i+1], 'left_side'))
		{//First In second out
			p3.innerHTML="The outcode is"+" "+o1;
			p4.innerHTML="The outcode is"+" "+o2;
			endpoints = [path[i], path[i+1]];
			intersection = find_intersection(endpoints, 'left_side');
			remaining.push(intersection);
		}
		
		else if(!check(path[i], 'left_side') && check(path[i+1], 'left_side'))
		{//First Out Second In 
			p3.innerHTML="The outcode is"+" "+o1;
			p4.innerHTML="The outcode is"+" "+o2;
			
			endpoints = [path[i], path[i+1]];
			intersection = find_intersection(endpoints, 'left_side');
			remaining.push(intersection);
			remaining.push(path[i+1]);
		}
	}
	else if(i == path.length-1)
	{
		var o1=set_outcode(path[i]);
		var o2=set_outcode(path[0]);
		o1=decbin(o1,4);
		o2=decbin(o2,4);
		p1.innerHTML = "Clipped  line joining ("+ path[path.length-1] + ") & (" + path[0] + ")";
		//For Adding Last Point And First Point
		drawLine(path[path.length-1],path[0],'left_side');
		if(!check(path[path.length-1], 'left_side') && !check(path[0], 'left_side'))
		{//No point Inside
			p3.innerHTML="The outcode is"+" "+o1;
			p4.innerHTML="The outcode is"+" "+o2;
			endpoints = [path[i], path[0]];
			var i1=find_intersections_oc(o1,endpoints);
			var i2=find_intersections_oc(o2,endpoints);
			//console.log(i1,i2);
			//highlightline(i1,i2);
		}
		
		if(check(path[path.length-1], 'left_side') && check(path[0], 'left_side'))
		{//Both Inside 
			p3.innerHTML="The outcode is"+" "+o1;
			p4.innerHTML="The outcode is"+" "+o2;
			remaining.push(path[0]);
		}
		
		else if(check(path[path.length-1], 'left_side') && !check(path[0], 'left_side'))
		{//First In second out
			p3.innerHTML="The outcode is"+" "+o1;
			p4.innerHTML="The outcode is"+" "+o2;
			endpoints = [path[path.length-1], path[0]];
			intersection = find_intersection(endpoints, 'left_side');
			remaining.push(intersection);
		}
		
		else if(!check(path[path.length-1], 'left_side') && check(path[0], 'left_side'))
		{//First Out Second In 
			p3.innerHTML="The outcode is"+" "+o1;
			p4.innerHTML="The outcode is"+" "+o2;
			endpoints = [path[path.length-1], path[0]];
			intersection = find_intersection(endpoints, 'left_side');
			remaining.push(intersection);
			remaining.push(path[0]);
		}	
	}
	else if(i == path.length)
	{
		p1.innerHTML = "Clipped Line w.r.t. left side";
		p2.innerHTML = " ";
		p3.innerHTML = " ";
		p4.innerHTML = " ";
		Iterated_till_now.push(remaining);
		line_mov=remaining.slice();
		remaining = [];
		side_br++;
		iteration=-1;
		if(line_mov.length==0)
		{
			side_br=5;
		}
		else
		{
			rep(line_mov);
		}
	}
}

//Clip the Top Edge
function side_top(path,i)
{

	/*var flag=0;
	var o11=set_outcode(start);
	var o22=set_outcode(end);
	o11=decbin(o11,4);
	o22=decbin(o22,4);
	//console.log(o11&o22);
	for(let j=0;j<4;j++)
		{
			if(o11.charAt(j)==o22.charAt(j))
				flag=1;
		}
		if(flag==1)
		{
			delete_line(start,end);
			alert("Line has been rejected, both outcodes have same bit set");
			p2.innerHTML = "Line has been rejected";
			return;
		}*/
	p2.innerHTML = "Against Top Side";
	
	if(i<path.length-1)
	{
		var o1=set_outcode(path[i]);
		var o2=set_outcode(path[i+1]);
		o1=decbin(o1,4);
		o2=decbin(o2,4);
		p1.innerHTML = "Clipped  line joining ("+ path[i] + ") & (" + path[i+1] + ")";
		drawLine(path[i],path[i+1],'top_side');
		//if()
		if(!check(path[i], 'top_side') && !check(path[i+1], 'top_side'))
		{//No point Inside
			if((xx==xx1)&&(yy<ymin)&&(yy1>ymax))
			{
				//console.log("hhhhhhfsjdd");
				p3.innerHTML="The outcode is"+" "+o1;
			     p4.innerHTML="The outcode is"+" "+o2;
			 context.beginPath();
			 context.moveTo(xx,ymin);
		     context.lineTo(xx1,ymax);
		     context.lineWidth = 2;
	         context.strokeStyle = 'crimson';
	         context.stroke();
			}
			
		}
		
		if(check(path[i], 'top_side') && check(path[i+1], 'top_side'))
		{//Both Inside 
			p3.innerHTML="The outcode is"+" "+o1;
			p4.innerHTML="The outcode is"+" "+o2;
			remaining.push(path[i+1]);
		}
		
		else if(check(path[i], 'top_side') && !check(path[i+1], 'top_side'))
		{//First In second out
			p3.innerHTML="The outcode is"+" "+o1;
			p4.innerHTML="The outcode is"+" "+o2;
			endpoints = [path[i], path[i+1]];
			intersection = find_intersection(endpoints, 'top_side');
			remaining.push(intersection);
		}
		
		else if(!check(path[i], 'top_side') && check(path[i+1], 'top_side'))
		{//First Out Second In 
			p3.innerHTML="The outcode is"+" "+o1;
			p4.innerHTML="The outcode is"+" "+o2;
			endpoints = [path[i], path[i+1]];
			intersection = find_intersection(endpoints, 'top_side');
			remaining.push(intersection);
			remaining.push(path[i+1]);
		}
	}
	else if(i == path.length-1)
	{
		var o1=set_outcode(path[i]);
		var o2=set_outcode(path[0]);
		o1=decbin(o1,4);
		o2=decbin(o2,4);
		p1.innerHTML = "Clipped  line joining ("+ path[path.length-1] + ") & (" + path[0] + ")";
		//For Adding Last Point And First Point
		drawLine(path[path.length-1],path[0],'top_side');
		if(!check(path[path.length-1], 'top_side') && !check(path[0], 'top_side'))
		{//No point Inside
			if(xx==xx1&&(yy<ymin)&&(yy1>ymax))
			{
				//console.log("hhhhhhfsjdd");
				p3.innerHTML="The outcode is"+" "+o1;
			     p4.innerHTML="The outcode is"+" "+o2;
			 context.beginPath();
			context.moveTo(xx,ymin);
		     context.lineTo(xx1,ymax);
		     context.lineWidth = 2;
	         context.strokeStyle = 'crimson';
	         context.stroke();
			}
			endpoints = [path[i], path[0]];
			var i1=find_intersections_oc(o1,endpoints);
			var i2=find_intersections_oc(o2,endpoints);
			//console.log(i1,i2);
			//highlightline(i1,i2);
		}
		
		if(check(path[path.length-1], 'top_side') && check(path[0], 'top_side'))
		{//Both Inside 
			p3.innerHTML="The outcode is"+" "+o1;
			p4.innerHTML="The outcode is"+" "+o2;
			remaining.push(path[0]);
		}
		
		else if(check(path[path.length-1], 'top_side') && !check(path[0], 'top_side'))
		{//First In second out
			p3.innerHTML="The outcode is"+" "+o1;
			p4.innerHTML="The outcode is"+" "+o2;
			endpoints = [path[path.length-1], path[0]];
			intersection = find_intersection(endpoints, 'top_side');
			remaining.push(intersection);
		}
		
		else if(!check(path[path.length-1], 'top_side') && check(path[0], 'top_side'))
		{//First Out Second In 
			p3.innerHTML="The outcode is"+" "+o1;
			p4.innerHTML="The outcode is"+" "+o2;
			endpoints = [path[path.length-1], path[0]];
			intersection = find_intersection(endpoints, 'top_side');
			remaining.push(intersection);
			remaining.push(path[0]);
		}	
	}
	else if(i == path.length)
	{
		p1.innerHTML = "Clipped Line w.r.t. Top Side";
		p2.innerHTML = " ";
		p3.innerHTML = " ";
		p4.innerHTML = " ";
		Iterated_till_now.push(remaining);
		context.clearRect(0, 0, 600, 600);
		side_br++;
		line_mov=remaining.slice();
		remaining = [];
		iteration=-1;
		if(line_mov.length==0)
		{
			side_br=5;
		}
		else
		{
			rep(line_mov);
		}
	}	
}

//Clip the Right Edge
function side_right(path,i)
{
	/*var flag=0;
	var o11=set_outcode(start);
	var o22=set_outcode(end);
	o11=decbin(o11,4);
	o22=decbin(o22,4);
	//console.log(o11&o22);
	for(let j=0;j<4;j++)
		{
			if(o11.charAt(j)==o22.charAt(j))
				flag=1;
		}
		if(flag==1)
		{
			delete_line(start,end);
			alert("Line has been rejected, both outcodes have same bit set");
			p2.innerHTML = "Line has been rejected";
			return;
		}*/
	p2.innerHTML = "Against Right Side";
	
	if(i<path.length-1)
	{
		var o1=set_outcode(path[i]);
		var o2=set_outcode(path[i+1]);
		o1=decbin(o1,4);
		o2=decbin(o2,4);
		p1.innerHTML = "Clipped  line joining ("+ path[i] + ") & (" + path[i+1] + ")";
		drawLine(path[i],path[i+1],'right_side');
		if(!check(path[i], 'right_side') && !check(path[i+1], 'right_side'))
		{//No point Inside
			endpoints = [path[i], path[i+1]];
		    var i1=find_intersections_oc(o1,endpoints);
			var i2=find_intersections_oc(o2,endpoints);
			//console.log(i1,i2);
			//highlightline(i1,i2);
		}
		
		if(check(path[i], 'right_side') && check(path[i+1], 'right_side'))
		{//Both Inside 
			p3.innerHTML="The outcode is"+" "+o1;
			p4.innerHTML="The outcode is"+" "+o2;
			remaining.push(path[i+1]);
		}
		
		else if(check(path[i], 'right_side') && !check(path[i+1], 'right_side'))
		{//First In second out
			p3.innerHTML="The outcode is"+" "+o1;
			p4.innerHTML="The outcode is"+" "+o2;
			endpoints = [path[i], path[i+1]];
			intersection = find_intersection(endpoints, 'right_side');
			remaining.push(intersection);
		}
		
		else if(!check(path[i], 'right_side') && check(path[i+1], 'right_side'))
		{//First Out Second In 
			p3.innerHTML="The outcode is"+" "+o1;
			p4.innerHTML="The outcode is"+" "+o2;
			endpoints = [path[i], path[i+1]];
			intersection = find_intersection(endpoints, 'right_side');
			remaining.push(intersection);
			remaining.push(path[i+1]);
		}
	}
	else if(i == path.length-1)
	{
		var o1=set_outcode(path[i]);
		var o2=set_outcode(path[0]);
		o1=decbin(o1,4);
		o2=decbin(o2,4);
		p1.innerHTML = "Clipped  line joining ("+ path[path.length-1] + ") & (" + path[0] + ")";
		//For Adding Last Point And First Point
		drawLine(path[path.length-1],path[0],'right_side');
		if(!check(path[path.length-1], 'right_side') && !check(path[0], 'right_side'))
		{//No point Inside
			endpoints = [path[i], path[0]];
			var i1=find_intersections_oc(o1,endpoints);
			var i2=find_intersections_oc(o2,endpoints);
			//console.log(i1,i2);
			//highlightline(i1,i2);
		}
		
		if(check(path[path.length-1], 'right_side') && check(path[0], 'right_side'))
		{//Both Inside 
			p3.innerHTML="The outcode is"+" "+o1;
			p4.innerHTML="The outcode is"+" "+o2;
			remaining.push(path[0]);
		}
		
		else if(check(path[path.length-1], 'right_side') && !check(path[0], 'right_side'))
		{//First In second out
			p3.innerHTML="The outcode is"+" "+o1;
			p4.innerHTML="The outcode is"+" "+o2;
			endpoints = [path[path.length-1], path[0]];
			intersection = find_intersection(endpoints, 'right_side');
			remaining.push(intersection);
		}
		
		else if(!check(path[path.length-1], 'right_side') && check(path[0], 'right_side'))
		{//First Out Second In 
			p3.innerHTML="The outcode is"+" "+o1;
			p4.innerHTML="The outcode is"+" "+o2;
			endpoints = [path[path.length-1], path[0]];
			intersection = find_intersection(endpoints, 'right_side');
			remaining.push(intersection);
			remaining.push(path[0]);
		}	
	}
	else if(i == path.length)
	{
		p1.innerHTML = "Clipped Line w.r.t. Right Side";
		p2.innerHTML = " ";
		p3.innerHTML = " ";
		p4.innerHTML = " ";
		Iterated_till_now.push(remaining);
		side_br++;
		line_mov=remaining.slice();
		remaining = [];
		iteration=-1;
		if(line_mov.length==0)
		{
			side_br=5;
		}
		else
		{
			rep(line_mov);
		}
	}		
}

//Clip the Bottom Edge
function side_down(path,i)
{
	/*var flag=0;
	var o11=set_outcode(start);
	var o22=set_outcode(end);
	o11=decbin(o11,4);
	o22=decbin(o22,4);
	//console.log(o11&o22);
	for(let j=0;j<4;j++)
		{
			if(o11.charAt(j)==o22.charAt(j))
				flag=1;
		}
		if(flag==1)
		{
			delete_line(start,end);
			alert("Line has been rejected, both outcodes have same bit set");
			p2.innerHTML = "Line has been rejected";
			return;
		}*/
	p2.innerHTML = "Against Bottom Side";
	
	if(i<path.length-1)
	{
		var o1=set_outcode(path[i]);
		var o2=set_outcode(path[i+1]);
		o1=decbin(o1,4);
		o2=decbin(o2,4);
		p1.innerHTML = "Clipped  line joining ("+ path[i] + ") & (" + path[i+1] + ")";
		drawLine(path[i],path[i+1],'bottom_side');
		if(!check(path[i], 'bottom_side') && !check(path[i+1], 'bottom_side'))
		{//No point Inside
			if(xx==xx1&&(yy<ymin)&&(yy1>ymax))
			{
				//console.log("hhhhhhfsjdd");
				p3.innerHTML="The outcode is"+" "+o1;
			     p4.innerHTML="The outcode is"+" "+o2;
			 context.beginPath();
			context.moveTo(xx,ymin);
		     context.lineTo(xx1,ymax);
		     context.lineWidth = 2;
	         context.strokeStyle = 'crimson';
	         context.stroke();
			}
			endpoints = [path[i], path[i+1]];
		    var i1=find_intersections_oc(o1,endpoints);
			var i2=find_intersections_oc(o2,endpoints);
			//console.log(i1,i2);
			//highlightline(i1,i2);
		}
		
		if(check(path[i], 'bottom_side') && check(path[i+1], 'bottom_side'))
		{//Both Inside 
			p3.innerHTML="The outcode is"+" "+o1;
			p4.innerHTML="The outcode is"+" "+o2;
			remaining.push(path[i+1]);
		}
		
		else if(check(path[i], 'bottom_side') && !check(path[i+1], 'bottom_side'))
		{//First In second out
			p3.innerHTML="The outcode is"+" "+o1;
			p4.innerHTML="The outcode is"+" "+o2;
			endpoints = [path[i], path[i+1]];
			intersection = find_intersection(endpoints, 'bottom_side');
			remaining.push(intersection);
		}
		
		else if(!check(path[i], 'bottom_side') && check(path[i+1], 'bottom_side'))
		{//First Out Second In 
			p3.innerHTML="The outcode is"+" "+o1;
			p4.innerHTML="The outcode is"+" "+o2;
			endpoints = [path[i], path[i+1]];
			intersection = find_intersection(endpoints, 'bottom_side');
			remaining.push(intersection);
			remaining.push(path[i+1]);
		}
	}
	else if(i == path.length-1)
	{
		var o1=set_outcode(path[i]);
		var o2=set_outcode(path[0]);
		o1=decbin(o1,4);
		o2=decbin(o2,4);
		p1.innerHTML = "Clipped  line joining ("+ path[path.length-1] + ") & (" + path[0] + ")";
		//For Adding Last Point And First Point
		drawLine(path[path.length-1],path[0],'bottom_side');
		if(!check(path[path.length-1], 'bottom_side') && !check(path[0], 'bottom_side'))
		{//No point Inside
			//p3.innerHTML = path[path.length-1] + " is Outside & " + path[0] +" is Outside";
			//p4.innerHTML = "Therefore Adding No Points";
			if(xx==xx1&&(yy<ymin)&&(yy1>ymax))
			{
				//console.log("hhhhhhfsjdd");
				p3.innerHTML="The outcode is"+" "+o1;
			     p4.innerHTML="The outcode is"+" "+o2;
			 context.beginPath();
			 context.moveTo(xx,ymin);
		     context.lineTo(xx1,ymax);
		     context.lineWidth = 2;
	         context.strokeStyle = 'crimson';
	         context.stroke();
			}
			endpoints = [path[i], path[0]];
			var i1=find_intersections_oc(o1,endpoints);
			var i2=find_intersections_oc(o2,endpoints);
			//highlightline(i1,i2);
		}
		
		if(check(path[path.length-1], 'bottom_side') && check(path[0], 'bottom_side'))
		{//Both Inside 
			p3.innerHTML="The outcode is"+" "+o1;
			p4.innerHTML="The outcode is"+" "+o2;
			remaining.push(path[0]);
		}
		
		else if(check(path[path.length-1], 'bottom_side') && !check(path[0], 'bottom_side'))
		{//First In second out
			p3.innerHTML="The outcode is"+" "+o1;
			p4.innerHTML="The outcode is"+" "+o2;
			endpoints = [path[path.length-1], path[0]];
			intersection = find_intersection(endpoints, 'bottom_side');
			remaining.push(intersection);
		}
		
		else if(!check(path[path.length-1], 'bottom_side') && check(path[0], 'bottom_side'))
		{//First Out Second In 
			p3.innerHTML="The outcode is"+" "+o1;
			p4.innerHTML="The outcode is"+" "+o2;
			endpoints = [path[path.length-1], path[0]];
			intersection = find_intersection(endpoints, 'bottom_side');
			remaining.push(intersection);
			remaining.push(path[0]);
		}	
	}
	else if(i == path.length)
	{
		p1.innerHTML = "Clipped Line w.r.t. Bottom Side";
		p2.innerHTML = " ";
		p3.innerHTML = " ";
		p4.innerHTML = " ";
		Iterated_till_now.push(remaining);
		side_br++;
		line_mov=remaining.slice();
		remaining = [];
		iteration=-1;
		if(line_mov.length==0)
		{
			side_br=5;
		}
		else
		{
			rep(line_mov);
		}
	}
}

function find_intersections_oc(outcode, end_points){

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
				intersections_list = [];
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
						p2.style.color='red'
					    p2.innerHTML="Clipped w.r.t BOTTOM";
						 intersect[0] = parseInt(x1)+parseInt((ymax - y1)*minv); 
                         intersect[1] = parseInt(ymax);  
					     intersections_list.push(intersect);
					return intersections_list;
					}
					else if(outcode.charAt(1)=='1')
					{
						p3.style.color='tomato'
					     p3.innerHTML="Clipped w.r.t TOP";
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
			        return intersections_list;
						

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
			        return intersections_list;
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
			        return intersections_list;
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
			        return intersections_list;	

				}

				//return intersections_list;
			}
		}

function find_intersection(endpoints, edge)
{
	
	intersection = [];

	
	start = endpoints[0];
	end = endpoints[1];
	//console.log(start,end);
	var x1 = start[0];
	var y1 = start[1];
	var x2 = end[0];
	var y2 = end[1];

	intersections_list = [];
    intersect=[0, 0];
	var minv=(x2-x1)/(y2-y1);
	var m = (y2-y1)/(x2-x1);

	c = y1 - m*x1;
	if(edge == 'left_side')
	{
		intersection[0] = xmin;
		intersection[1] = m*xmin + c;
	}
	else if(edge == 'right_side')
	{
		intersection[0] = xmax;
		intersection[1] = m*xmax + c;
	}
	else if(edge == 'top_side')
	{
		intersection[0] = (ymin - c)/m;
		intersection[1] = ymin;
		if(x1 == x2)
		{
			//console.log('HHHH'+ymin);
			//console.log(x1);
			intersection[0]=x1;
		}
	}
	else if(edge == 'bottom_side')
	{
		intersection[0] = (ymax - c)/m;
		intersection[1] = ymax;
		if(x1 == x2)
		{
			//console.log(x1);
			intersection[0]=x1;
		}
	}
	intersection[0]=Math.round(intersection[0]);
	intersection[1]=Math.round(intersection[1]);
	return intersection;
}	

//returns true if the point is inside Clipped  a particular edge else false
function check(point, orientation)
{
	x = point[0];
	y = point[1];

	if(orientation == 'left_side')
	{
		if(x > xmin)
			return true;
		else
			return false;
	}

	if(orientation == 'top_side')
	{
		if(y > ymin)
			return true;
		else
			return false;
	}

	if(orientation == 'right_side')
	{
		if(x < xmax)
			return true;
		else
			return false;
	}

	if(orientation == 'bottom_side')
	{
		if(y < ymax)
			return true;
		else
			return false;
	}
}
function rep(path)
{
	context.clearRect(0,0,600,600);
	drawSquare();
	//if(x1!=x2&&((y1<ymin)||(y2>ymin)))
	//{
	context.beginPath();
	context.moveTo(path[0][0], path[0][1]);
	context.font="15px Sans serif";
	context.fillText("Bounding Rectangle  - ["+ax+","+ay+"] ["+bx+","+by+"] ["+cx+","+cy+"] ["+dx+","+dy+"]",10,520);
	context.fillText("("+path[0][0]+","+path[0][1]+")",path[0][0],path[0][1]);
	for(i=1; i<path.length; i++)
	{
		//console.log(path.length);
		context.lineTo(path[i][0], path[i][1]);
		context.fillText("("+path[i][0]+","+path[i][1]+")",path[i][0],path[i][1]);
		//console.log(path);
	}
	context.lineTo(path[0][0], path[0][1]);
	context.lineWidth = 3;
	context.strokeStyle = 'black';

	if(side_br >=5)
	{
		context.strokeStyle= 'crimson';
		
	}
	context.stroke();
//}
}

function drawSquare()  
{
	drawGrid();
	context.strokeStyle = 'black' ;
	context.lineWidth = 2;
	//context.stroke();
	context.font = "15px Arial";
	context.fillText("("+ax+","+ay+")",ax-3,ay-4);
    context.fillText("("+ax+","+cy+")",ax,cy);
    context.fillText("("+cx+","+cy+")",cx,cy);
    context.fillText("("+cx+","+ay+")",cx,ay);

	context.beginPath();
	context.moveTo(ax, ay);
	context.lineTo(bx, by);
	context.stroke();	

	
	context.beginPath();
	context.moveTo(bx, by);
	context.lineTo(cx,cy);
	context.stroke();

	
	context.beginPath();
	context.moveTo(cx, cy);
	context.lineTo(dx, dy);
	context.stroke();


	context.beginPath();
	context.moveTo(dx, dy);
	context.lineTo(ax, ay);
	context.stroke();

	//context.restore();
	
}

function drawLine(point1,point2,orientation)
{
	//context.fillText("("+point1[0]+","+point1[1]+")",point1[0]+2,point1[1]+2);
	context.beginPath();
	if(orientation == 'left_side')
	{
		context.moveTo(ax,ay);
		context.lineTo(dx,dy);
	}
	else if(orientation == 'top_side')
	{
		context.moveTo(ax,ay);
		context.lineTo(bx,by);
	}
	else if(orientation == 'right_side')
	{
		context.moveTo(bx,by);
		context.lineTo(cx,cy);
	}
	else if(orientation == 'bottom_side')
	{
		context.moveTo(cx,cy);
		context.lineTo(dx,dy);
	}
	context.lineWidth = 2;
	context.strokeStyle = 'mediumblue';
	context.stroke();

	context.beginPath();
	context.moveTo(point1[0],point1[1]);
	context.lineTo(point2[0],point2[1]);
	context.lineWidth = 2;
	context.strokeStyle = 'yellow';
	context.stroke();
}

function drawGrid(){

var r=255;
var g=140;
var b=0;
var alpha = 0.9;
context.lineWidth = 1.0;
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

$('.numLimit').on('keydown keyup', function(e){
    if ($(this).val() > 600
        && e.keyCode !== 46 // keycode for delete
        && e.keyCode !== 8 // keycode for backspace
       ) {
       e.preventDefault();
       $(this).val(600);
    }
});

/*$(function() {
    $( "#dialog" ).dialog({
      autoOpen: false,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "explode",
        duration: 1000
      }
    });
 
    $( "#opener" ).click(function() {
      $( "#dialog" ).dialog( "open" );
    });
  });*/

/*var win = {
    element: document.getElementById("Canvas"),
    width: 600,
    height: 600,
    safeWidth: 590,
    safeHeight: 590
  },
  
  resizewin = function () {
	
    var viewport, newwinWidth, newwinHeight, newwinX, newwinY;
					
    // Get the dimensions of the viewport
    viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // Determine win size
    if (win.height / win.width > viewport.height / viewport.width) {
      if (win.safeHeight / win.width > viewport.height / viewport.width) {
          // A
          newwinHeight = viewport.height * win.height / win.safeHeight;
          newwinWidth = newwinHeight * win.width / win.height;
      } else {
          // B
          newwinWidth = viewport.width;
          newwinHeight = newwinWidth * win.height / win.width;
      }
    } else {
      if (win.height / win.safeWidth > viewport.height / viewport.width) {
        // C
        newwinHeight = viewport.height;
        newwinWidth = newwinHeight * win.width / win.height;
      } else {
        // D
        newwinWidth = viewport.width * win.width / win.safeWidth;
        newwinHeight = newwinWidth * win.height / win.width;
      }
    }
  
    win.element.style.width = newwinWidth + "px";
    win.element.style.height = newwinHeight + "px";
			
    newwinX = (viewport.width - newwinWidth)/4;
    newwinY = (viewport.height - newwinHeight)/4;
			
    // Set the new padding of the win so it will be centered
    //win.element.style.margin = newwinY + "px " + newwinX + "px";
  };

window.addEventListener("resize", resizewin);
resizewin();*/
"use strict";

function main() {
  var canvas = document.getElementById("Canvas");
  var gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }

  // setup GLSL program
  var program = webglUtils.createProgramFromScripts(gl, ["2d-vertex-shader", "2d-fragment-shader"]);
  gl.useProgram(program);

  // look up where the vertex data needs to go.
  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

  // lookup uniforms
  var colorLocation = gl.getUniformLocation(program, "u_color");
  var matrixLocation = gl.getUniformLocation(program, "u_matrix");

  // Create a buffer to put three 2d clip space points in
  var positionBuffer = gl.createBuffer();

  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  requestAnimationFrame(drawScene);

  // Draw the scene.
  function drawScene(now) {
    now *= 0.001; 

    resize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas.
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // Turn on the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
        positionAttributeLocation, size, type, normalize, stride, offset);

    // Set Geometry.
    var radius = Math.sqrt(gl.canvas.width * gl.canvas.width + gl.canvas.height * gl.canvas.height) * 0.5;
    var angle = now;
    var x = Math.cos(angle) * radius;
    var y = Math.sin(angle) * radius;
    var centerX = gl.canvas.width  / 2;
    var centerY = gl.canvas.height / 2;
    setGeometry(gl, centerX + x, centerY + y, centerX - x, centerY - y);

    // Compute the matrices
    var projectionMatrix = m3.projection(gl.canvas.width, gl.canvas.height);

    // Set the matrix.
    gl.uniformMatrix3fv(matrixLocation, false, projectionMatrix);

    // Draw in red
    gl.uniform4fv(colorLocation, [1, 0, 0, 1]);

    // Draw the geometry.
    var primitiveType = gl.LINES;
    var offset = 0;
    var count = 2;
    gl.drawArrays(primitiveType, offset, count);

    requestAnimationFrame(drawScene);
  }

  function resize(canvas) {
    // Lookup the size the browser is displaying the canvas.
    var displayWidth  = canvas.clientWidth;
    var displayHeight = canvas.clientHeight;

    // Check if the canvas is not the same size.
    if (canvas.width  !== displayWidth ||
        canvas.height !== displayHeight) {

      // Make the canvas the same size
      canvas.width  = 2*displayWidth;
      canvas.height = displayHeight;
    }
  }
}

main();
