new Vue({
	el:"#container",
	data:{
         addressList:[],
         limitNum:4,
         currentIndex:0,
          delStatus: false,
          incFlag:false,
          name:'',
          addressName:"",
          phone:"",
          fromStatus:0

       
	},
	mounted:function(){
          this.getData();
	},
	computed:{   //计算出返回的值可以直接用作变量，而不是函数,实时计算
         limitBy:function(){
         	return this.addressList.slice(0,this.limitNum);
         }
	},
	methods:{
		getData:function(){
			var _this=this
			this.$http.get("data/address.json").then(function(res){
            _this.addressList=res.data.result;
            console.log(_this.addressList);
			})
		},
		moreLoad:function(){
			var length=this.addressList.length;
			this.limitNum=length;
		},
		setDefault:function(){
			var _this=this;
			this.addressList.forEach(function(item,index){
				if(index==_this.currentIndex)
				item.isDefault=true;
				else{
					item.isDefault=false;
				}
			})
		},
		
		del:function(index){
			this.delStatus=true;
		},
		confirmDel:function(){
			this.addressList.splice(this.currentIndex,1);
			this.delStatus=false;
		},

		edit:function(){
      	this.incFlag=true;
		this.fromStatus=0;
		},
		editAddr:function(){
			
          this.addressList.splice(this.currentIndex,1,{isDefault:false,
          	streetName:this.addressName,
          	tel:this.phone,
          	userName:this.name});
		},
		tianjia:function(){
			this.fromStatus=1;
			this.incFlag=true;
		},

		add:function(){
			
          
          this.addressList.push({
          	addressId:this.addressList[this.addressList.length-1].addressId++,
          	isDefault:false,
          	streetName:this.addressName,
          	tel:this.phone,
          	userName:this.name

          });
          var length=this.addressList.length;
			this.limitNum=length;


		},
		save:function(){
			if(this.fromStatus==0){
				this.editAddr();
			}
			if(this.fromStatus==1){
				this.add();
			}
			this.incFlag=false;
		}

	}

})