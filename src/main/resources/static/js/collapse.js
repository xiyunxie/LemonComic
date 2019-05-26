
        function Collapse(className,close_prev,default_open){        
        this._elements = [];
        this._className = String(className);
        this._previous = Boolean(close_prev)
        this._default = typeof(default_open)==="number" ? default_open: -1
        this.getCurrent  
        this.init();
    }


    Collapse.prototype.collectElementbyClass = function(){
        this._elements = [];
        var allelements = document.getElementsByTagName("div");

        for(var i=0;i<allelements.length;i++){
            var collapse_div = allelements[i];
            if (typeof collapse_div.className === "string" && collapse_div.className === this._className){

                var h3s = collapse_div.getElementsByTagName("h3");
                var collapse_body = collapse_div.getElementsByClassName("collapse_body");
                if(h3s.length === 1 && collapse_body.length === 1){
                    h3s[0].style.cursor = "pointer";    
                    
                    if(this._default === this._elements.length){
                        collapse_body[0].style.visibility = "visible";
                      collapse_body[0].style.height = collapse_body[0].scrollHeight+"px"
                    }else{
                        collapse_body[0].style.height = "0px";
                      collapse_body[0].style.visibility = "hidden";    
                    }
                    this._elements[this._elements.length] = collapse_div;
                }                
            }
        }
    }
    Collapse.prototype.open = function(elm){
        elm.style.visibility = "visible";
        elm.style.height = elm.scrollHeight + "px"
        
    }
    Collapse.prototype.close = function(elm){
      elm.style.height = "0px";
      elm.style.visibility = "hidden";
    }
    Collapse.prototype.isOpen = function(elm){    
    
      return elm.style.visibility === "visible"
    }
    
    Collapse.prototype.getCurrent = function(header){
        var cur ;
        if(window.addEventListener){
            cur = header.parentNode
        }else{
            cur = header.parentElement
        }
        return cur.getElementsByClassName("collapse_body")[0]
        }
    
    Collapse.prototype.toggleDisplay = function(header){
        
        var cur = this.getCurrent(header)
        //console.log(cur)
        if(this.isOpen(cur)){
            this.close(cur);
        }else{
            this.open(cur);
        }        
        if(this._previous){
            for(var i=0;i<this._elements.length;i++){
                if(this._elements[i] !== (cur.parentNode||cur.parentElement)){                
                    var collapse_body = this._elements[i].getElementsByClassName("collapse_body");
                    collapse_body[0].style.height = "0px";
                    collapse_body[0].style.visibility = "hidden";
                            
                }
            }
        }
    }    
    
    Collapse.prototype.init = function(){        
        var instance = this;
        this.collectElementbyClass();
        if(this._elements.length === 0){
            return;
        }
        
        for(var i=0;i<this._elements.length;i++){
            var h3s = this._elements[i].getElementsByTagName("h3");            
            if(window.addEventListener){
                h3s[0].addEventListener("click",function(){ instance.toggleDisplay(this);},false); 
            }else{
                h3s[0].onclick = function(){instance.toggleDisplay(this);}
            }
        }
    }
 var myCollapse = new Collapse("collapseDiv",true);
