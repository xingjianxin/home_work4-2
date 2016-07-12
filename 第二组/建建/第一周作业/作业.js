function Event(){
    this._events={};
}
Event.prototype.on=function(eventName,callback){
    var cur=this._events[eventName];
    if(cur){
        for(var i=0;i<cur.length;i++){
            if(cur[i]===callback){
                return;
            }
        }
        cur.push(callback);
    }else{
        this._events[eventName]=[callback];
    }
};
Event.prototype.once=function(eventName,callback){
    var curEventName=this._events[eventName];
    if(!('flag' in callback)){
        callback.flag=true;
    }else{
        return;
    }
    if(curEventName){
        this._events[eventName].push(callback);
        curEventName.forEach(function(item,index){
            if(item===callback){
                return;
            }
        });
    }else{
        this._events[eventName] = [callback];
    }
};
Event.prototype.emit=function(eventName){
    var arg=Array.prototype.slice.call(arguments,1);
    var cur=this._events[eventName],
        that=this;
    if(cur){
        for(var i=0;i<cur.length;i++){
            if(typeof cur[i]==='function'){
                if(!('flag' in cur[i])){
                    cur[i].apply(that,arg);
                }else if('flag' in cur[i]&&cur[i].flag===true){
                    cur[i].apply(that,arg);
                    cur[i].flag=false;
                }
            }else{
                cur.splice(i,1);
                i--;
            }
        }
    }
};
Event.prototype.remove=function(eventName,callback){
    var cur=this._events[eventName];
    if(cur){
        for(var i=0;i<cur.length;i++){
            if(cur[i]===callback){
                cur[i]=null;
                return;
            }
        }
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
