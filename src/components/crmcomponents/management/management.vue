<template>
	<div class="management">
		<div class="management-header">
			<ul>		
				<li><el-button type="primary" @click="dialogVisibles = true">添加角色</el-button></li>
			</ul>
		</div>
		<div class="management-list">
			<el-table :data="managementArr"  border style="width: 100%" >
				    <el-table-column prop="id" label="角色ID"  show-overflow-tooltip align="center"></el-table-column>
				    <el-table-column prop="name" label="角色名称"  show-overflow-tooltip align="center"></el-table-column>
				    <el-table-column prop="createDate" label="创建时间"  show-overflow-tooltip align="center"></el-table-column>				  
				    <el-table-column  label="操作"  align="center" show-overflow-tooltip>
			        <template slot-scope="scope">
			        	<el-button size="mini" @click="compile(scope.$index, scope.row,managementArr)" type="primary">编辑</el-button>
				        <el-button size="mini" @click="handleDel(scope.$index, scope.row,managementArr)" type="danger">删除</el-button>					       
			      	</template>
		         </el-table-column>
  				</el-table>
		</div>
		
		
		<!--添加角色-->
		<el-dialog title="添加角色" :visible.sync="dialogVisibles" width="30%" :before-close="handleCloses">
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="角色名称">
				    <el-input v-model="form.character"></el-input>
				</el-form-item>
			</el-form>		   
		    <span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisibles = false">取 消</el-button>
			    <el-button type="primary" @click.native="addcharacter">确 定</el-button>
		    </span>
		</el-dialog>
		<!--删除角色-->
		<el-dialog title="删除角色" :visible.sync="dialogVisibleOut" width="30%" :before-close="handleCloses">
			<span>确定删除这一条数据么？</span>	   
		    <span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisibleOut = false">取 消</el-button>
			    <el-button type="primary" @click.native="managementOut">确 定</el-button>
		    </span>
		</el-dialog>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				form:{
					character:""					
				},
				dialogVisibles:false,
				dialogVisibleOut:false,
				managementArr:null,
				index:null, 
				row:null,
			}
		},
		created(){
			    //获取角色数据
			    this.getJiaoSe()
		},
		methods:{
			//编辑
			compile(index,row){	
				localStorage.setItem("user_name",row.name)
				this.$router.push({path:"/home/compilemanagement/"+row.id})
			},
			//获取所有角色
			getJiaoSe(){
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
			 		console.log(res.data.data.records)
			     	this.managementArr=res.data.data.records			 		
			 	})
			},
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
			//关闭弹窗
	        handleCloses(done) {
		        this.$confirm('确认关闭？')
		          .then(_ => {         
		            done();
		          })
		          .catch(_ => {});
	        },
	        //添加角色
	    	addcharacter(){
	    		let stringReg=this.CheckValue(this.form.character)
	    		if(stringReg){    			
	    			const obj={
	    				name:this.form.character
	    			}
	    			this.$http.post("user/role/add",obj,{
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
						    return JSON.stringify(obj);
						}]
				  	})
				 	.then((res)=>{	
				 		
				 		if(res.data.flag==1){
				 			this.getJiaoSe()
				 			this.dialogVisibles=false
				 		}else{
				 			alert(res.data.message)
				 		}
				 	})
	    		}
	    		
	    	},
			//点击删除
			handleDel(index, row, data){
				this.dialogVisibleOut=true
				this.index=index
				this.row=row
			},
			//确定删除执行的函数
			managementOut(){
				this.managementArr.splice(this.index,1)
				const delData={id:this.row.id}
				this.$http.post("user/role/delete",delData,{
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
					    return JSON.stringify(delData);
					}]
			  	})
			 	.then((res)=>{	
			 		console.log(res.data)
			 		if(res.data.flag==1){
			 			
			 			this.dialogVisibleOut=false
			 		}else{
			 			alert(res.data.message)
			 		}
			      	
			 	})
			},
		}
	}
</script>

<style scoped>
	.management-header{
		margin-bottom: 10px;
	}
	.management-header ul {
		display: flex;
	}
	.management-header ul li {
		margin-right: 10px;
	}
</style>