<template>
	  <div class="login">
		  	<div class="login-cont">
		  			<h1>CRM客户管理系统</h1>
			   		<div class="login-cont-user">
							  <el-input placeholder="请输入账号" v-model="user">
							    	<template slot="prepend">账号</template>
							  </el-input>
						</div>
						<div class="login-cont-password">
							  <el-input placeholder="请输入密码" v-model="password" type="password">
							    	<template slot="prepend">密码</template>
							  </el-input>
						</div>
						<div class="login-cont-btn">
								<el-button type="primary" @click="login">登录</el-button>
								<el-button type="primary">取消</el-button>
						</div>
			  </div>
	  </div>
</template>

<script>
export default {
	  name: 'login',
	  data () {
		    return {
			     user:"", 
			     password:""
		    }
	  },
	  methods:{	 
	  	
					 
		  	login(){
		  		this.$http.post("user/login",{
		  				 phone:this.user, 	
		  				 pass:this.password
		  			})
		  			.then((res)=>{
		  			
		  					if(res.data.flag==1){
		  					  localStorage.setItem("token",res.data.data.token)		  					 
		  					  let str=JSON.stringify(res.data.data.menus) 
							 		localStorage.setItem("str",str)							 	
							 		localStorage.setItem("roleId",res.data.data.user_id)							 						 		
		  						this.$router.push({path:"/home/defaultpage"})
		  					}else{
		  						alert(res.data.message)
		  					}
		  				
			  				
					 	})
		  			
		  	}
	  }
}
</script>

<style scoped>
	.login{
		width: 100%;
		height: 100%;
		background: #000;
	}
	.login-cont{
		width: 500px;
		margin: 0 auto;
		margin-top: 200px;
		background: blue;
		padding: 10px 20px;
		border-radius: 5px ;
	}
	.login-cont h1{
		height: 44px;
		line-height: 44px;
		text-align: center;
		color: #fff;
	}
	.login-cont-user{
		margin-bottom: 20px;
	}
	.login-cont-btn{
		margin: 20px 0;
		display: flex;
		justify-content: space-around;
	}
</style>
