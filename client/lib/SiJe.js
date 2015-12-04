/**
 * Created by Knaufux on 11/3/2015.
 */

function clearCanvas(context, canvas){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function ColorRGB(_red, _green, _blue, _alpha){
    this.red = _red;
    this.green = _green;
    this.blue = _blue;
    this.alpha = _alpha;
}
ColorRGB.prototype.toHex = function(){
    return new ColorHex(this.red.toString(16) + this.green.toString(16) + this.blue.toString(16), this.alpha);
};

function ColorHex(_hex, _alpha){
    this.hex = _hex;
    this.alpha = _alpha;
}
ColorHex.prototype.toDec = function(){
    return new ColorRGB(parseInt(this.hex.splice(0,3), 16), parseInt(this.hex.splice(3,6), 16), parseInt(this.hex.splice(6,9), 16), this.alpha);
};

function Var(_value, callback){
    var value = _value;
    return {
        getValue: function(){return value;},
        setValue: function(nwValue){ value = nwValue; callback(value)}
    }
}

function Square(_x, _y, _side, _color, _filled, _width){
    this.x = _x;
    this.y = _y;
    this.side = _side;
    this.color = _color || "black";
    this.filled = _filled || false;
    this.width = _width || 1;
}

Square.prototype.area = function(){
    return (this.side * this.side);
};

Square.prototype.draw = function(context){
    context.beginPath();
    context.rect(this.x - this.side/2, this.y - this.side/2, this.side, this.side);
    if(this.filled){
        context.lineWidth = this.width;
        context.strokeStyle = this.color;
        context.stroke();
    }
    else {
        context.fillStyle = this.color;
        context.fill();
    }
};

function Arc(_x, _y, _radius, _angleStart, _angleEnd, _color, _filled, _width){
    this.x = _x;
    this.y = _y;
    this.radius = _radius;
    this.angleStart = _angleStart;
    this.angleEnd = _angleEnd;
    this.color = _color || 'black';
    this.filled = _filled || false;
    this.width = _width || 1;
}

Arc.prototype.draw = function(context){
    context.beginPath();
    context.arc(this.x, this.y, this.radius, this.angleStart, this.angleEnd, true);
    if(this.filled){
        context.lineWidth = this.width;
        context.strokeStyle = this.color;
        context.stroke();
    }
    else {
        context.fillStyle = this.color;
        context.fill();
    }
};

function Rectangle(_x, _y, _width, _height, _color, _filled, _weight){
    this.x = _x;
    this.y = _y;
    this.width = _width;
    this.height = _height;
    this.color = _color || "black";
    this.filled = _filled || false;
    this.weight = _weight || 1;
}

Rectangle.prototype.area = function(){
    return (this.width * this.height);
};

Rectangle.prototype.draw = function(context){
    context.beginPath();
    context.rect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
    if(this.filled){
        context.lineWidth = this.weight;
        context.strokeStyle = this.color;
        context.stroke();
    }
    else {
        context.fillStyle = this.color;
        context.fill();
    }
};

function Map(_width, _height, _wdthVw, _hgthVw, _tileDim, _map){
    this.wdthVw = _wdthVw;
    this.hgthVw = _hgthVw;
    this.width = _width;
    this.height = _height;
    this.tileDim = _tileDim;
    this.map = _map;
    this.mapData = this.map.layers[0].data;
    this.image = new Image();
    this.image.src = "./resources/graphic/Outside_A2.png";
}
Map.prototype.draw = function(xStart, yStart){
    for(var i = yStart; i < yStart + this.hgthVw; i+= this.tileDim){
        for(var j = xStart; j < xStart + this.wdthVw; j += this.tileDim){
            var coorMap = ((i/16)*50) + j/16;
            context.drawImage(this.image,
                (this.mapData[coorMap]%32 - 1) * 16,
                ((this.mapData[coorMap] - (this.mapData[coorMap]%32))/32) * 16,
                16,
                16,
                j - xStart,
                i - yStart,
                16,
                16);
        }
    }
};