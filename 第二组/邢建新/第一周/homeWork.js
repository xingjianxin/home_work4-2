/**
 * Created by xjx on 2016/7/15.
 */
//异步创建多个文件夹
    makeP('u/b/c/d')
    function makeP(path){
        var arr=path.split('/');
        var count=0;

        //用于循环遍历创建文件夹
        function createFile(){

            //获取第 count 个文件夹
            var pathFlag = arr.slice(0, count + 1).join('/');

            //判断是否存在当前文件夹啊
            fs.exists(pathFlag,function(exists){
                if(!exists){//如果不存在，创建
                    fs.mkdir(pathFlag,function(){
                        console.log("创建成功")
                    })
                }
                if(count<arr.length){
                    count++;
                    createFile()
                }
            });
        }
        createFile();
    }

//重定义 once 方法
Event.prototype.once = function (eventName, callback) {
    if (typeof callback == 'function')
        function g() {
            this.removeListener(eventName, g);
            callback.apply(this, arguments);
        }
    g.callback = callback;
    this.on(eventName, g);
    return this;
}