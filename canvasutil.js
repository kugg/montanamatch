function HSV(h, s, v) {
	if (h <= 0) { h = 0; }
	if (s <= 0) { s = 0; }
	if (v <= 0) { v = 0; }
 
	if (h > 360) { h = 360; }
	if (s > 100) { s = 100; }
	if (v > 100) { v = 100; }
 
	this.h = h;
	this.s = s;
	this.v = v;
}

function HSL(h, s, l) {
	if (h <= 0) { h = 0; }
	if (s <= 0) { s = 0; }
	if (l <= 0) { l = 0; }
 
	if (h > 360) { h = 360; }
	if (s > 100) { s = 100; }
	if (l > 100) { l = 100; }
 
	this.h = h;
	this.s = s;
	this.l = l;
}
 
function RGB(r, g, b) {
	if (r <= 0) { r = 0; }
	if (g <= 0) { g = 0; }
	if (b <= 0) { b = 0; }
 
	if (r > 255) { r = 255; }
	if (g > 255) { g = 255; }
	if (b > 255) { b = 255; }
 
	this.r = r;
	this.g = g;
	this.b = b;
}
 
function CMYK(c, m, y, k) {
	if (c <= 0) { c = 0; }
	if (m <= 0) { m = 0; }
	if (y <= 0) { y = 0; }
	if (k <= 0) { k = 0; }
 
	if (c > 100) { c = 100; }
	if (m > 100) { m = 100; }
	if (y > 100) { y = 100; }
	if (k > 100) { k = 100; }
 
	this.c = c;
	this.m = m;
	this.y = y;
	this.k = k;
}
 
var ColorConverter = {
 
	_RGBtoHSV : function  (RGB) {
		var result = new HSV(0, 0, 0);
 
		r = RGB.r / 255;
		g = RGB.g / 255;
		b = RGB.b / 255;
 
		var minVal = Math.min(r, g, b);
		var maxVal = Math.max(r, g, b);
		var delta = maxVal - minVal;
 
		result.v = maxVal;
 
		if (delta == 0) {
			result.h = 0;
			result.s = 0;
		} else {
			result.s = delta / maxVal;
			var del_R = (((maxVal - r) / 6) + (delta / 2)) / delta;
			var del_G = (((maxVal - g) / 6) + (delta / 2)) / delta;
			var del_B = (((maxVal - b) / 6) + (delta / 2)) / delta;
 
			if (r == maxVal) { result.h = del_B - del_G; }
			else if (g == maxVal) { result.h = (1 / 3) + del_R - del_B; }
			else if (b == maxVal) { result.h = (2 / 3) + del_G - del_R; }
 
			if (result.h < 0) { result.h += 1; }
			if (result.h > 1) { result.h -= 1; }
		}
 
		result.h = Math.round(result.h * 360);
		result.s = Math.round(result.s * 1000)/10;
		result.v = Math.round(result.v * 1000)/10;
 
		return result;
	},
 
	_HSVtoRGB : function  (HSV) {
		var result = new RGB(0, 0, 0);
 
		var h = HSV.h / 360;
		var s = HSV.s / 100;
		var v = HSV.v / 100;
 
		if (s == 0) {
			result.r = v * 255;
			result.g = v * 255;
			result.v = v * 255;
		} else {
			var_h = h * 6;
			var_i = Math.floor(var_h);
			var_1 = v * (1 - s);
			var_2 = v * (1 - s * (var_h - var_i));
			var_3 = v * (1 - s * (1 - (var_h - var_i)));
 
			if (var_i == 0) {var_r = v; var_g = var_3; var_b = var_1}
			else if (var_i == 1) {var_r = var_2; var_g = v; var_b = var_1}
			else if (var_i == 2) {var_r = var_1; var_g = v; var_b = var_3}
			else if (var_i == 3) {var_r = var_1; var_g = var_2; var_b = v}
			else if (var_i == 4) {var_r = var_3; var_g = var_1; var_b = v}
			else {var_r = v; var_g = var_1; var_b = var_2};
 
			result.r = var_r * 255;
			result.g = var_g * 255;
			result.b = var_b * 255;
 
			result.r = Math.round(result.r);
			result.g = Math.round(result.g);
			result.b = Math.round(result.b);
		}
 
		return result;
	},

	_RGBtoHSL : function  (RGB) {
		var result = new HSL(0, 0, 0);
 
		r = RGB.r / 255;
		g = RGB.g / 255;
		b = RGB.b / 255;
 
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  result.l=(max + min) / 2;

  if (max == min) {
    result.h = result.s = 0; // achromatic
  } else {
    var d = max - min;
    result.s = result.l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: result.h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: result.h = (b - r) / d + 2; break;
      case b: result.h = (r - g) / d + 4; break;
    }
  } 
    result.h=Math.round(result.h*60);
    result.s=Math.round(result.s*1000)/10;
    result.l=Math.round(result.l*1000)/10;
 
		return result;
	},

	_HSLtoRGB : function  (HSL) {
		var result = new RGB(0, 0, 0);
    var h=HSL.h/360;
    var s=HSL.s/100;
    var l=HSL.l/100;
      
  if (s == 0) {
    result.r = result.g = result.b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    result.r = hue2rgb(p, q, h + 1/3);
    result.g = hue2rgb(p, q, h);
    result.b = hue2rgb(p, q, h - 1/3);
  }
  result.r=Math.round(result.r*255);
  result.g=Math.round(result.g*255);
  result.b=Math.round(result.b*255);
  
		return result;
	},
     
	_CMYKtoRGB : function (CMYK){
		var result = new RGB(0, 0, 0);
 
		c = CMYK.c / 100;
		m = CMYK.m / 100;
		y = CMYK.y / 100;
		k = CMYK.k / 100;
 
		result.r = 1 - Math.min( 1, c * ( 1 - k ) + k );
		result.g = 1 - Math.min( 1, m * ( 1 - k ) + k );
		result.b = 1 - Math.min( 1, y * ( 1 - k ) + k );
 
		result.r = Math.round( result.r * 255 );
		result.g = Math.round( result.g * 255 );
		result.b = Math.round( result.b * 255 );
 
		return result;
	},
 
	_RGBtoCMYK : function (RGB){
		var result = new CMYK(0, 0, 0, 0);
 
		r = RGB.r / 255;
		g = RGB.g / 255;
		b = RGB.b / 255;
 
		result.k = Math.min( 1 - r, 1 - g, 1 - b );
		if ((1 - result.k) == 0 ){
		  result.c = 0 ;
		  result.m = 0 ;
		  result.y = 0 ;
    } else {
		result.c = ( 1 - r - result.k ) / ( 1 - result.k );
		result.m = ( 1 - g - result.k ) / ( 1 - result.k );
		result.y = ( 1 - b - result.k ) / ( 1 - result.k );
    }
		result.c = Math.round( result.c * 100 );
		result.m = Math.round( result.m * 100 );
		result.y = Math.round( result.y * 100 );
		result.k = Math.round( result.k * 100 );
 
		return result;
	},
 
	toRGB : function (o) {
		if (o instanceof RGB) { return o; }
		if (o instanceof HSV) {	return this._HSVtoRGB(o); }
		if (o instanceof HSL) {	return this._HSLtoRGB(o); }
		if (o instanceof CMYK) { return this._CMYKtoRGB(o); }
	},
 
	toHSV : function (o) {
		if (o instanceof HSV) { return o; }
		if (o instanceof RGB) { return this._RGBtoHSV(o); }
		if (o instanceof CMYK) { return this._RGBtoHSV(this._CMYKtoRGB(o)); }
	},

	toHSL : function (o) {
		if (o instanceof HSL) { return o; }
		if (o instanceof RGB) { return this._RGBtoHSL(o); }
		//if (o instanceof CMYK) { return this._RGBtoHSV(this._CMYKtoRGB(o)); }
	},
 
	toCMYK : function (o) {
		if (o instanceof CMYK) { return o; }
		if (o instanceof RGB) { return this._RGBtoCMYK(o); }
		if (o instanceof HSV) { return this._RGBtoCMYK(this._HSVtoRGB(o)); }
	}
 
}

function dec2hex(i){
 var result = "00";
 if   (i >= 0  && i <= 15)  { result = "0" + i.toString(16); }
 else if (i >= 16  && i <= 255)  { result = i.toString(16); }
 return result
}
var c=document.getElementById("myCanvas");
var cxt=c.getContext("2d");
var img = new Image();
img.crossOrigin = "Anonymous";

function refresh_canvas(){
	var maxWidth = 800 ;
	if (screen.width<500){
	  maxWidth=screen.width;
	} else {
	  if (maxWidth>screen.width){maxWidth=screen.width;}
	  else {maxWidth=screen.width-680;}
	} 

	var maxHeight = 380 ;
	if (screen.width<500){//mobile phone
	  if (maxHeight>screen.height){maxHeight=screen.height;}
	  else {maxHeight=screen.height/2;}
	} else { //table or pc
	  if (maxHeight>screen.height){maxHeight=screen.height;}
	  else {maxHeight=screen.height/2;}
	}

	var rWidth=1,rHeight= 1;

	if(img.width > maxWidth){rWidth = maxWidth/img.width;} 
	if(img.height > maxHeight){rHeight = maxHeight/img.height;} 
	var ratio=Math.min(rWidth,rHeight);
	nWidth=img.width*ratio;
	nHeight=img.height*ratio;
	c.width=nWidth;
	c.height=nHeight;
	c.style.width=nWidth+'px';
	c.style.height=nHeight+'px';

	cxt.drawImage(img, 0, 0, img.width, img.height, 0, 0, c.width, c.height);  
	   
}
function loadPic() {
	url = document.getElementById("url").value;
	img.addEventListener("load", refresh_canvas);
	img.src = url;
}

c.onmousemove=function(e){
var x,y;

if (e.pageX || e.pageY) { 
  x = e.pageX;
  y = e.pageY;
} else { 
  x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
  y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
}
var element = c.offsetParent;
while (element !== null) {
  x = parseInt(x) - parseInt(element.offsetLeft);
  y = parseInt(y) - parseInt(element.offsetTop);
  element = element.offsetParent;
}
x -= c.offsetLeft;
y -= c.offsetTop;
var cData = cxt.getImageData(x,y,1,1).data;
var mr=cData[0],mg=cData[1],mb=cData[2];
var hex = dec2hex(mr) + dec2hex(mg) + dec2hex(mb);

var cmyk=ColorConverter.toCMYK(new RGB(mr,mg,mb));


document.getElementById('divMouseColorPanel').style.background='#'+hex; 

document.getElementById('divMouseColor').innerHTML = 
  'X='+x+',Y='+y
  +'<br>HEX #'+hex+'<br>RGB ('+mr+','+mg+','+mb+')<br>CMYK ('+cmyk.c+','+cmyk.m+','+cmyk.y+','+cmyk.k+')';
}

c.onclick = function( e ){
var ww = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
if (ww>800) {aww=ww-400;} else {aww=ww;}//remove width of ad block 
//block per line
if (aww<=400){ bpl=3;}
else if (aww<500){ bpl=4;}
else if (aww<600){ bpl=5;}
else if (aww<800){ bpl=6;}
else { bpl=7;}

var x;
var y;

if (e.pageX || e.pageY) { 
  x = e.pageX;
  y = e.pageY;
} else { 
  x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
  y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
} 
var element = c.offsetParent;
while (element !== null) {
  x = parseInt(x) - parseInt(element.offsetLeft);
  y = parseInt(y) - parseInt(element.offsetTop);
  element = element.offsetParent;
}

x -= c.offsetLeft;
y -= c.offsetTop;

var cData = cxt.getImageData(x, y, 3, 3).data;
var mr = Math.round((cData[0] + cData[4] + cData[8] + cData[12] + cData[16] + cData[20] + cData[24]+ cData[28]+ cData[32]) / 9 );
var mg = Math.round((cData[1] + cData[5] + cData[9] + cData[13] + cData[17]+ cData[21]+ cData[25]+ cData[29]+ cData[33]) / 9) ;
var mb = Math.round((cData[2] + cData[6] + cData[10] + cData[14] + cData[18]+ cData[22]+ cData[26]+ cData[30]+ cData[34]) / 9) ;
var hex = dec2hex(mr) + dec2hex(mg) + dec2hex(mb);

                                          
var cmyk=ColorConverter.toCMYK(new RGB(mr,mg,mb));

document.getElementById('Matchingto').innerHTML =                 
'<table><tr><td><div id="divSelectedColorPanel" style="background-color:#'+hex+'" '+
'onclick="javascript:copy_color_code(this);" hex="#'+hex+'" rgb="rgb('+mr+','+mg+','+mb+')" '+
'cmyk="cmyk('+cmyk.c+','+cmyk.m+','+cmyk.y+','+cmyk.k+')"></div></td>'+
'<td><div>'+'<strong>Selected Color Code</strong><br>'+ 
'HEX #' + hex+'<br>RGB ('+ mr +','+ mg +','+ mb +')<br>CMYK ('+cmyk.c+','+cmyk.m+','+cmyk.y+','+cmyk.k+')'+
'</div></td></tr></table>';

document.getElementById('colors').value = document.getElementById('colors').value + "\n" + "#" + hex
checkInput()
document.getElementById('divCopyColorCode').style.display='block';
//save history
for(var i=clkhistory.length-1;i>=0;i--){
  if ((clkhistory[i].r==mr) && (clkhistory[i].g==mg) && (clkhistory[i].b==mb)){
    clkhistory.splice(i,1);
  }
}
clkhistory.push({r:mr,g:mg,b:mb,c:cmyk.c,m:cmyk.m,y:cmyk.y,k:cmyk.k,hex:hex});
var divCH=document.getElementById('divClkHistory');
if (clkhistory.length>1){
sTmp='<div style="float:left;width:70px;height:42px;font-weight:bold;margin:2px;padding-top:8px">Selected<br>Colors :</div>';
  for(var i=0;i<clkhistory.length;i++){
    sTmp+='<div class="selectedCH" style="background:#'+clkhistory[i].hex+'" onclick="javascript:copy_color_code(this);" '+
    'hex="#'+clkhistory[i].hex+'" rgb="rgb('+clkhistory[i].r+','+clkhistory[i].g+','+clkhistory[i].g+')" '+
    'cmyk="cmyk('+clkhistory[i].c+','+clkhistory[i].m+','+clkhistory[i].y+','+clkhistory[i].k+')" onmouseenter="change_title(this);" title="rgb('+mr+','+mg+','+mb+')">'+
    '</div>';
  } 
divCH.innerHTML=sTmp+'<br style="clear:both">';
divCH.style.display="block";
} else {
  divCH.innerHTML='';
  divCH.style.display="none";
} 

} 
clkhistory=new Array();

function copy_color_code(t){
var copy_attr='';
var copy_codes = document.getElementsByName('copy_code');
for (var i = 0, length = copy_codes.length; i < length; i++){
 if (copy_codes[i].checked){
  copy_attr=copy_codes[i].value;
  break;
 }
}

var attr=t.getAttribute(copy_attr);
if (attr!=null && attr!=''){
if(copyStringToClipboard(attr)){tempAlert("copied<br>"+attr,3000);}}
}

function change_title(t){
var copy_codes = document.getElementsByName('copy_code');
try{
for (var i = 0, length = copy_codes.length; i < length; i++){
 if (copy_codes[i].checked){
  t.title=t.getAttribute(copy_codes[i].value); 
  break;
 }
}
}catch (e) {}
}

