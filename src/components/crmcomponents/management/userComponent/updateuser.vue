<template>
	<div class="updateuser">
		<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="用户名">
				    <el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="电话">
				    <el-input v-model="form.phone"></el-input>
				</el-form-item>
				<el-form-item label="密码">
				    <el-input v-model="form.password"></el-input>
				</el-form-item>
				<el-form-item label="角色" >
				    <el-select v-model="form.roleId" placeholder="请选择活动区域">
				       <el-option :label="item.name" :value="item.id" v-for="(item , index ) in managementArr" :key="index"></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item>
				    <el-button type="primary" @click="onSubmit">提交</el-button>
				    <el-button @click="goback">取消</el-button>
				</el-form-item>
			</el-form>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				userData:"",
				managementArr:null,
				form:null
			}
		},
		created(){
			this.getJiao()
			this.form=this.$store.state.UpdateUserData
      
		},
		methods:{
			//获取角色
			getJiao(){
				const pageData={
			 		size: 14,//每页显示条数
					current: 1,//第几页
					params: {
						page_id: "role_page",//分页类型参数
					}
			 	}
			 	this.$http.post("/page/page",pageData,{
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
					    return JSON.stringify(pageData);
					}]
			  	})
			 	.then((res)=>{
			     	this.managementArr=res.data.data.records
			 	})
			},
			//提交信息
			onSubmit(){
				const formData={
					  id:this.form.id,
			          name:this.form.name,
			          phone:this.form.phone,
			          password:this.form.password,
			          roleId:this.form.roleId
				}
		        this.$http.post("/user/update",formData,{
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
		            return JSON.stringify(formData);
		          }]
		        })
	            .then((res)=>{
		            if(res.data.flag===1) {
		              this.$router.go(-1)
		            }
	            })
			},
			//取消返回用户列表
			goback(){
				this.$router.push({path:"/home/user"})
			},
		},
	}
</script>

<style scoped>
</style>
