/**
 * Created by Knaufux on 8/30/2015.
 */

// ---- quadTree ----

function QuadTree(bounds, pointQuad, maxDepth, maxChildren){
    var node;
    if(pointQuad)
        node = new Node(bounds, 0, maxDepth, maxChildren);
    else
        node = new BoundsNode(bounds, 0, maxDepth, maxChildren);

    this.root = node;
}

QuadTree.prototype.root = null;

QuadTree.prototype.insert = function(item){
    if(item instanceof Array) {
        for (var i = 0; i < item.length; i++)
            this.root.insert(item[i]);
    }
    else
        this.root.insert(item);
};

QuadTree.prototype.clear = function(){
    this.root.clear();
};

QuadTree.prototype.retrieve = function(item){
    return this.root.retrieve(item).slice(0);
};


// ---- Node ----

function Node(_bounds, _depth, _maxDepth, _maxChildren){
    this.bounds = _bounds;
    this.children = [];
    this.nodes = [];

    if(_maxChildren)
        this.maxChildren = _maxChildren;

    if(_maxDepth)
        this.maxDepth = _maxDepth;

    if(_depth)
        this.depth = _depth;
}

Node.prototype.nodes = null;
Node.prototype._classConstructor = Node;

Node.prototype.children = null;
Node.prototype.bounds = null;

Node.prototype.depth = 0;

Node.prototype.maxChildren = 4;
Node.prototype.maxDepth = 4;

Node.TOP_LEFT = 0;
Node.TOP_RIGHT = 1;
Node.BOTTOM_LEFT = 2;
Node.BOTTOM_RIGHT = 3;

Node.prototype.insert = function(item){
    if(this.nodes.length){
        var index = this._findIndex(item);
        this.nodes[index].insert(item);
        return;
    }
    this.children.push(item);

    var len = this.children.length;
    if(!(this.depth >= this.maxDepth) &&
        len > this.maxChildren){
        this.subdivide();

        for(var i = 0; i < len; i++)
            this.insert(this.children[i]);
        this.children.length = 0;
    }
};

Node.prototype.retrieve = function(item){
    if(this.nodes.length){
        var index = this._findIndex(item);
        return this.nodes[index].retrieve(item);
    }
    return this.children;
};

Node.prototype._findIndex = function(item){
    var b = this.bounds;
    var left = !(item.x > b.x + b.width / 2);
    var top = !(item.y > b.y + b.height / 2);

    var index = Node.TOP_LEFT;
    if(left){
        if(!top)
            index = Node.BOTTOM_LEFT;
    }
    else{
        if(top)
            index = Node.TOP_RIGHT;
        else
            index = Node.TOP_LEFT;
    }
    return index;
};

Node.prototype.subdivide = function () {
    var depth = this.depth + 1;

    var bx = this.bounds.x;
    var by = this.bounds.y;

    var b_w_h = (this._bounds.width / 2) | 0; //todo: Math.floor?
    var b_h_h = (this._bounds.height / 2) | 0;
    var bx_b_w_h = bx + b_w_h;
    var by_b_h_h = by + b_h_h;

    this.nodes[Node.TOP_LEFT] = new this._classConstructor({
            x: bx,
            y: by,
            width: b_w_h,
            height: b_h_h
        },
        depth, this._maxDepth, this._maxChildren);

    this.nodes[Node.TOP_RIGHT] = new this._classConstructor({
            x: bx_b_w_h,
            y: by,
            width: b_w_h,
            height: b_h_h
        },
        depth, this._maxDepth, this._maxChildren);

    this.nodes[Node.BOTTOM_LEFT] = new this._classConstructor({
            x: bx,
            y: by_b_h_h,
            width: b_w_h,
            height: b_h_h
        },
        depth, this._maxDepth, this._maxChildren);

    this.nodes[Node.BOTTOM_RIGHT] = new this._classConstructor({
            x: bx_b_w_h,
            y: by_b_h_h,
            width: b_w_h,
            height: b_h_h
        },
        depth, this._maxDepth, this._maxChildren);
};

Node.prototype.clear = function(){
    this.children.length = 0;

    for(var i = 0; i < this.nodes.length; i++)
        this.nodes[i].clear();
    this.nodes.length = 0;
};

// ---- BoundsNode ----

function BoundsNode(bounds, depth, maxChildren, maxDepth) {
    Node.call(this, bounds, depth, maxChildren, maxDepth);
    this.stuckChildren = [];
}

BoundsNode.prototype = new Node();
BoundsNode.prototype._classConstructor = BoundsNode;
BoundsNode.prototype.stuckChildren = null;


BoundsNode.prototype.out = [];

BoundsNode.prototype.insert = function (item) {
    if (this.nodes.length) {
        var index = this._findIndex(item);
        var node = this.nodes[index];

        if (item.x >= node.bounds.x &&
            item.x + item.width <= node.bounds.x + node.bounds.width &&
            item.y >= node.bounds.y &&
            item.y + item.height <= node.bounds.y + node.bounds.height) {

            this.nodes[index].insert(item);

        } else
            this.stuckChildren.push(item);

        return;
    }

    this.children.push(item);

    var len = this.children.length;

    if (!(this._depth >= this._maxDepth) &&
        len > this._maxChildren) {

        this.subdivide();

        var i;
        for (i = 0; i < len; i++)
            this.insert(this.children[i]);

        this.children.length = 0;
    }
};

BoundsNode.prototype.getChildren = function () {
    return this.children.concat(this.stuckChildren);
};

BoundsNode.prototype.retrieve = function (item) {
    var out = this.out;
    out.length = 0;
    if (this.nodes.length) {
        var index = this._findIndex(item);
        var node = this.nodes[index];

        if (item.x >= node.bounds.x &&
            item.x + item.width <= node.bounds.x + node.bounds.width &&
            item.y >= node.bounds.y &&
            item.y + item.height <= node.bounds.y + node.bounds.height) {

            out.push.apply(out, this.nodes[index].retrieve(item));
        } else {
            if (item.x <= this.nodes[Node.TOP_RIGHT].bounds.x) {
                if (item.y <= this.nodes[Node.BOTTOM_LEFT].bounds.y)
                    out.push.apply(out, this.nodes[Node.TOP_LEFT].getAllContent());

                if (item.y + item.height > this.nodes[Node.BOTTOM_LEFT].bounds.y)
                    out.push.apply(out, this.nodes[Node.BOTTOM_LEFT].getAllContent());
            }

            if (item.x + item.width > this.nodes[Node.TOP_RIGHT].bounds.x) {//position+width bigger than middle x
                if (item.y <= this.nodes[Node.BOTTOM_RIGHT].bounds.y) {
                    out.push.apply(out, this.nodes[Node.TOP_RIGHT].getAllContent());
                }

                if (item.y + item.height > this.nodes[Node.BOTTOM_RIGHT].bounds.y) {
                    out.push.apply(out, this.nodes[Node.BOTTOM_RIGHT].getAllContent());
                }
            }
        }
    }

    out.push.apply(out, this.stuckChildren);
    out.push.apply(out, this.children);

    return out;
};

BoundsNode.prototype.getAllContent = function () {
    var out = this.out;
    if (this.nodes.length) {

        var i;
        for (i = 0; i < this.nodes.length; i++) {
            this.nodes[i].getAllContent();
        }
    }
    out.push.apply(out, this.stuckChildren);
    out.push.apply(out, this.children);
    return out;
};

BoundsNode.prototype.clear = function () {

    this.stuckChildren.length = 0;

    this.children.length = 0;

    var len = this.nodes.length;

    if (!len) {
        return;
    }

    var i;
    for (i = 0; i < len; i++) {
        this.nodes[i].clear();
    }

    this.nodes.length = 0;

};

module.exports = QuadTree;