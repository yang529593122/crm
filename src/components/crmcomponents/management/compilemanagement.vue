<template>
	<div class="cpmpile">
		<div class="permission-jiaose">
			<p>用户角色 </p>
			<div class="permission-input"><el-input v-model="name" placeholder="输入角色名称"></el-input></div>
		</div>
		<div class="permission-cont">
			<div class="permission-cont-item" v-for="(item,index) in this.data">
				<h6>{{ item.name }}</h6>
				<div class="permission-cont-item-mess">
					<el-checkbox-group v-model="type">
					      <el-checkbox :label="it.name" name="type" v-for="(it,ind) in item.menus"></el-checkbox>
			        </el-checkbox-group>
		        </div>
			</div>
		</div>
		<div class="permission-bottom">
			<el-button type="primary" @click.native="postData">提交</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				data:null,
				type: [],
				name:"",
			}
		},
		
		created(){
			this.getUrlData()
		},
		
		methods:{
			//提交
			postData(){
				
				let arr=[];
				    let ada=[];
					for(let i=0;i<this.data.length;i++){
						for(let j=0;j<this.data[i].menus.length;j++){
							let obj={}
							obj.id=this.data[i].menus[j].id
							obj.code=this.data[i].menus[j].code
								arr.push(obj)
						}
					}
				
				for(let k=0;k<this.type.length;k++){
					for(let h=0;h<arr.length;h++){						
						if(this.type[k]==arr[h].code){
							let kkk={}
							kkk.menuId=arr[h].id
						    ada.push(kkk)					
						}
					}
				}	
				const jiaoseData={
						id:this.$route.params.id,
						name:this.name,
						details:ada
					}
					this.$http.post("user/role/update",jiaoseData,{
				  		headers:{
				  			"Content-Type":"application/json",				  						  			
				  		},
				  		transformRequest: [(data, headers)=> {let keys = Object.keys(headers);let normalizedName = 'Content-Type';
						    keys.forEach(name => {
						      if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
						        headers[normalizedName] = headers[name];
						        delete headers[name];
						      }
						    });						    
						    return JSON.stringify(jiaoseData);
						}]
				  	})
				 	.then((res)=>{	
				 		console.log(res.data)
				 		if(res.data.data==true){
				 			this.$router.push('/home/management')
				 		}
				 	})
			},
			//数据源
			getUrlData(){
				this.name=localStorage.getItem("user_name")
				const jiaose={
					roleId:this.$route.params.id
				}
       			this.$http.post("/user/role/menu/all",jiaose,{
			  		headers:{
			  			"Content-Type":"application/json",				  						  			
			  		},
			  		transformRequest: [(data, headers)=> {let keys = Object.keys(headers);let normalizedName = 'Content-Type';
					    keys.forEach(name => {
					      if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
					        headers[normalizedName] = headers[name];
					        delete headers[name];
					      }
					    });						    
					    return JSON.stringify(jiaose);
					}]
			  	})
			 	.then((res)=>{	
			 		console.log(res.data)
			 		this.data=res.data.data
			 		for(let i=0;i<this.data.length;i++){
						for(let j=0;j<this.data[i].menus.length;j++){
							if(this.data[i].menus[j].checked==true){
								this.type.push(this.data[i].menus[j].code)
							}							
						}
					}
			 	})
			},
		}
	}
</script>

<style scoped>
	.permission-jiaose{
		display: flex;
		padding: 10px;
		
		line-height: 40px;
	}
	.permission-jiaose p{
		margin-right: 10px;
	}
	.permission-cont-item h6{
		height: 40px;
		line-height: 40px;
	}
	.permission-bottom{
		margin-top: 20px;
		padding-left: 30px;
	}
	.permission-cont{
		padding-left: 10px;
	}
	.permission-cont-item-mess{
		padding-left: 20px;
	}
</style>