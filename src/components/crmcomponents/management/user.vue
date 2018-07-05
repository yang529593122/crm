<template>
	<div class="user">
		<div class="user-header">
			<ul>
				<li><el-button type="primary" @click="dialogVisible = true">添加用户</el-button></li>				
			</ul>
		</div>
		<div class="user-list">
			<el-table :data="userArr.records"  border style="width: 100%" >
				    <el-table-column prop="name" label="姓名"  show-overflow-tooltip align="center"></el-table-column>
				    <el-table-column prop="phone" label="电话"  show-overflow-tooltip align="center"></el-table-column>
				    <el-table-column prop="password" label="密码" show-overflow-tooltip align="center"></el-table-column>
				    <el-table-column prop="rolename" label="角色"  show-overflow-tooltip align="center"></el-table-column>				  				  
				    <el-table-column  label="操作"  align="center" show-overflow-tooltip>
			        <template slot-scope="scope">
				        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="primary">编辑</el-button>	
				        <el-button size="mini" @click="handleDel(scope.$index, scope.row)" type="danger">删除</el-button>
			      	</template>
		         </el-table-column>
  			</el-table>
		</div>
		<div class="user-footer">
			<div class="pagebox">
				<el-pagination background layout="prev, pager, next" :total="userArr.total" :page-size="userArr.size"  @current-change="currentspage"></el-pagination>						
			</div>
			
		</div>
		<!--添加用户-->
		<el-dialog title="添加用户" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="用户名">
				    <el-input v-model="form.name"></el-input>				   
				</el-form-item>
				<el-form-item label="电话">
				    <el-input v-model="form.phone"></el-input>
				   
				</el-form-item>
				<el-form-item label="角色" >
				    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
				       <el-option :label="item.name" :value="item.id" v-for="(item , index ) in managementArr"></el-option>				      
				    </el-select>
				 </el-form-item>
			</el-form>		   
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="adduser">确 定</el-button>
		  </span>
		</el-dialog>
		<!--删除-->
		<el-dialog title="提示" :visible.sync="del" width="30%" :before-close="handleClose">
			<span>确定删除该数据么？</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="del = false">取 消</el-button>
		    <el-button type="primary" @click="delData">确 定</el-button>
		  </span>
		</el-dialog>
		
	</div>
</template>

<script>
	export default{
		data() {
		      return {
		      		del:false, //删除信息提示框
			        dialogVisible: false, //用户的弹窗	
			        id:"", //当前数据ID
			        index:"",
			        form:{
			        	name:"",	
			        	phone:""
			        },
			        ruleForm:{
			        	region:""
			        },
			        managementArr:null,
			        userArr:{}
		      };
	   },	   
	    created(){
	    		//获取所有的角色
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
			 	//获取用户数据源
			 	
			 	this.currentspage(1)
    	   		
			  
		},
	    methods: {
	    	//正则判断字符串不能为空
	    	CheckValue(value) {          
	            if (value.indexOf(" ")>=0) {
	                alert("内容不能包含空格！");
	                return false;
	            }else if (value== "") {
	                alert("请输入内容！");
	                return false;
	            }else{
	            	return true;
	            }
	        },
	      
	        //添加用户
	        adduser(){
	        	let characterstringReg
	        	let namestringReg=this.CheckValue(this.form.name)
	        	if(namestringReg){
	        		characterstringReg=this.CheckValue(this.ruleForm.region)
	        	}      	
	        	if(namestringReg && characterstringReg){
	    			//console.log(this.form.name)
	    			//console.log(this.ruleForm.region)
	    			const jiaose={
				    	   name:this.form.name,
				    	   phone:this.form.phone,
				    	   roleId:this.ruleForm.region
			    	  }
	       			this.$http.post("user/add",jiaose,{
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
				 		if(res.data.flag==1){
				 			this.currentspage(1)
				 			this.dialogVisible=false
				 		}
				 	})
	    		}
	        },
	        
	    	//关闭用户弹窗
	     	handleClose(done) {
		        this.$confirm('确认关闭？')
		          .then(_ => {
		            done();
		          })
		          .catch(_ => {});
	        },
	        //分页
	        currentspage(a){
	        	const pageDatas={
			 		size: 14,//每页显示条数
					current: a,//第几页
					params: {
						page_id: "userrole_page"
					}
			 	}	 	
			 	this.$http.post("/page/page",pageDatas,{
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
					    return JSON.stringify(pageDatas);
					}]
			  	})
			 	.then((res)=>{					 		
			     	this.userArr=res.data.data		 		
			 	})
	        },
	    	//编辑
	    	handleEdit(index,row,data){
	    		this.$store.state.UpdateUserData=row
	    		this.$router.push({path:"/home/updateuser/"+row.id})
	    	},
	    	//删除弹出确认框
	    	handleDel(index,row){
	    		this.index=index
	    		this.id=row.id
	    		this.del=true
	    	},
	    	//执行删除该条数据
	    	delData(){
	    		this.userArr.records.splice(this.index,1)
	    		const delObj={
	    			id:this.id
	    		}
	    		this.$http.post("user/delete",delObj,{
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
					    return JSON.stringify(delObj);
					}]
			  	})
			 	.then((res)=>{	
			 		if(res.data.flag==1){
			 			
			 			this.del=false
			 		}else{
			 			alert(res.data.message)
			 		}
			      	
			 	})
	    	},
	    }
		
	}
</script>

<style scoped>
	.user{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.user-header{
		margin-bottom: 10px;
	}
	.user-header ul {
		display: flex;
	}
	.user-header ul li {
		margin-right: 10px;
	}
	.user-footer{
		margin-top: 10px;
	}
	.pagebox{
		width: 500px;
		margin: 0 auto;
		overflow: hidden;
	}
</style>