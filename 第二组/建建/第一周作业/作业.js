function Event(){
    this._events={};
}
Event.prototype.on=function(eventName,callback){
    if(this._events[eventName]){
        this._events[eventName].push(callback);
    }else{
        this._events[eventName]=[callback];
    }
};
Event.prototype.once=function(eventName,callback){
    if(!('flag' in callback)){
        callback.flag=true;
    }else{
        return;
    }
    if(this._events[eventName]){
        this._events[eventName].push(callback);
    }else{
        this._events[eventName] = [callback];
    }
};
Event.prototype.emit=function(eventName){
    var arg=Array.prototype.slice.call(arguments,1);
    var cur=this._events[eventName],
        that=this;
    if(cur){
        cur.forEach(function(item,index){
            if(typeof item==='function'){
                if(!('flag' in item)){
                    item.apply(that,arg);
                }else if('flag' in item&&item.flag===true){
                    item.apply(that,arg);
                    item.flag=false;
                }
            }
        })
    }
};
Event.prototype.remove=function(eventName,callback){
    var cur=this._events[eventName];
    if(cur){
        cur.forEach(function(item){
            if(item===callback){
                item=null;
            }
        })
    }
};
function makePAsync(path){
    var ary=path.split('/');
    var n=arguments[1]||1;
    var curP=ary.slice(0,n).join('/'),
        flag=fs.existsSync(curP);
    if(!flag){
        fs.mkdir(curP,function(error){
            if(error){
                console.log(error);
            }else{
                console.log('done');
            }
        })
    }
    while(n<=ary.length){
        n++;
        makePAsync(path,n);
    }
}

