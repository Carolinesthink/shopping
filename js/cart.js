new Vue({
	el:"#app",
	data:{
       productList:[],
       checkF:false,
       totalmoney:0,
       delFlag:false,
       condel:{}
	},
	 mounted:function(){//this 千万不要忘了，this的使用方法
      this.getdata();
	 },
	methods:{
       getdata:function(){//用到实例 的变量要用this
       var _this=this;
       	this.$http.get("data/cartData.json").then(function(res){
       		// this.result
       		_this.productList=res.data.result.list;
       		console.log(_this.productList);//this作用域会发生改变，所以要先定义一个赋值
       	});

       },
       changeNumber:function(item,type){
       	if(type=="+"){
       		item.productQuantity++;
       	}else{
       		if(item.productQuantity<1){
       		item.productQuantity=0;	

       		}else{
       			item.productQuantity--;
       	    }
       		
       	}
       	 this.calc();
  

       },
       check:function(item){
       	if(typeof item.checkFlag=='undefined'){
       		Vue.set(item,"checkFlag",true);
       		var flag1=true;

       		


       		//单选全部选中则全选  中
       		this.productList.forEach(function(item,index){

       			if(item.checkFlag!=true){
                  flag1=false;
       			}
       			this.checkF=flag1;
       		})
       		
       	}else{
       		item.checkFlag=!item.checkFlag;
       		var flag1=true;

       		

       		//单选全选中则全选  中
       		this.productList.forEach(function(item,index){

       			if(item.checkFlag!=true){
                  flag1=false;
       			}
       			this.checkF=flag1;
       		})
       	}
       	 this.calc();

       },
       selectAll:function(flag){
       	this.checkF=flag;
          this.productList.forEach(function(item,index){
	          	if(typeof item.checkFlag=='undefined'){
	       		Vue.set(item,"checkFlag",flag);
	       		
		       	}else{
		       		item.checkFlag=flag;
		       	}

          })

          this.calc();
       },
       calc:function(){
       	  var _this=this;
             this.totalmoney=0;
       	this.productList.forEach(function(item,index){
	          	if(item.checkFlag){
	       		_this.totalmoney+=item.productQuantity*item.productPrice;
	       	   }
        })
      },
      confirmdel:function(term){
      	this.delFlag=true;
      	this.condel=term;
      },
      del:function(){
      	var index=this.productList.indexOf(this.condel);
      	this.productList.splice(index,1);
      	this.delFlag=false;
      }
       
         
	},
	filters:{
		change:function(value){
			return "￥"+value.toFixed(2);
		}
	}


});
Vue.filter("money",function(value,type){
	return type+value.toFixed(2);
})//全局过滤器和局部过滤器的filter不一样