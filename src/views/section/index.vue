<template>
  <div class="app-container">
    <h1>项目列表</h1>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="4" :xl="4"><span>&nbsp;</span></el-col>
      <el-col :xs="8" :sm="8" :md="6" :lg="4" :xl="4">
        <el-input v-model="itemsSelect.itemsId" placeholder="项目ID" class="titleStytle"></el-input>
      </el-col>
      <el-col :xs="8" :sm="8" :md="6" :lg="4" :xl="4">
        <el-input v-model="itemsSelect.itemsName" placeholder="项目名称" class="titleStytle"></el-input>
      </el-col>
      <el-col :span="2" class="titleStytle">
        <el-button type="primary" @click="onGetItemsByIdAndName()">查&nbsp;&nbsp;&nbsp;&nbsp;询</el-button>
      </el-col>
      <el-col :xs="8" :sm="8" :md="6" :lg="4" :xl="4" class="titleStytle">
        <el-button type="primary" @click="itemsAddShow()">添加项目</el-button>
      </el-col>
    </el-row>
    <div>
      <el-table :data="tableData" style="width: 100%" v-if="itemsShow">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item :key="itemTemplates.attribute_id" v-for="itemTemplates in itemTemplate" 
                :label="itemTemplates.attribute_name_val">
                <span>{{ props.row[itemTemplates.attribute_name] }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="项目ID"
          prop="itemsId">
        </el-table-column>
        <el-table-column
          label="项目名称"
          prop="itemsName">
        </el-table-column>
        <el-table-column
          label="项目描述"
          prop="describe">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
              @click="handleEdit(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini"
              @click="handleUpdate(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
          
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="添加项目"
      :visible.sync="centerDialogVisible"
      width="60%"
      center>
      <el-row :gutter="24">
        <el-col :span="24" style="height: 2rem;"></el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" :key="attributeList.attribute_id" 
          v-for="attributeList in this.itemTemplate">
          <el-col :span="24" v-if="attributeList.attribute_type == '01'">
            <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
              <el-main>
                <span class="dialogTitle">{{attributeList.attribute_name_val}}：</span>
              </el-main>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
              <el-input v-model="attributeList.attributeQVal" :placeholder="attributeList.attribute_name_val"></el-input>
            </el-col>
          </el-col>
          <el-col :span="24" v-if="attributeList.attribute_type == '02'">
            <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
              <el-main>
                <span class="dialogTitle">{{attributeList.attribute_name_val}}：</span>
              </el-main>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
              <el-select v-model="attributeList.attributeQVal" clearable filterable placeholder="请选择">
                <el-option
                  v-for="item in attributeList.attributeList"
                  :key="item.attribute_val_id"
                  :label="item.attribute_val"
                  :value="item.attribute_val_id">
                </el-option>
              </el-select>
            </el-col>
          </el-col>
        </el-col>
        <el-col :span="24" style="height: 2rem;"></el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="itemsAdd()" :loading="this.loadingVal">确 定</el-button>
      </span>
    </el-dialog>
    
    <el-dialog
      title="修改项目"
      :visible.sync="centerUpdate"
      width="60%"
      center>
      <el-row :gutter="24">
        <el-col :span="24" style="height: 2rem;"></el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" :key="attributeList.attribute_id" 
          v-for="attributeList in this.itemTemplate">
          <el-col :span="24" v-if="attributeList.attribute_type == '01'">
            <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
              <el-main>
                <span class="dialogTitle">{{attributeList.attribute_name_val}}：</span>
              </el-main>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
              <el-input v-model="attributeList.attributeQVal" :placeholder="attributeList.attribute_name_val"></el-input>
            </el-col>
          </el-col>
          <el-col :span="24" v-if="attributeList.attribute_type == '02'">
            <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
              <el-main>
                <span class="dialogTitle">{{attributeList.attribute_name_val}}：</span>
              </el-main>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
              <el-select v-model="attributeList.attributeQVal" clearable filterable placeholder="请选择">
                <el-option
                  v-for="item in attributeList.attributeList"
                  :key="item.attribute_val_id"
                  :label="item.attribute_val"
                  :value="item.attribute_val_id">
                </el-option>
              </el-select>
            </el-col>
          </el-col>
        </el-col>
        <el-col :span="24" style="height: 2rem;"></el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerUpdate = false">取 消</el-button>
        <el-button type="primary" @click="itemsUpdate()" :loading="this.loadingVal">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import  { getItems,getItemsByIdAndName,setItems,itemsDelete,itemsUpdate1 }  from '../../api/items.js'

export default {
  name: 'SidebarItem',
  data : function(){
    return {
      itemsId : '',
      itemsYear : '',
      itemsBranch : '',
      itemsShow : false,
      centerUpdate : false,
      itemTemplate : [],
      tableData: [],
      itemsSelect: {
        itemsId : '',
        itemsName : ''
      },
      centerDialogVisible : false,
      loadingVal : false,
    }
  },
  components: {
  },
  computed: {
  },
  methods: {
    //获取后台数据 包括项目信息和列表信息
    getRequest : function (){
      if(this.$route.params){
        let routeName=this.$route.name;
        this.itemsYear = routeName.substring(4,8);
        let items_branch = routeName.substring(8);
        if(items_branch == 1){
          items_branch='技术一部'
        }else{
          items_branch='技术二部'
        }
        this.itemsBranch = items_branch;
        getItems(items_branch,this.itemsYear).then(response=>{
          debugger
          console.log(response.data.attribute);
          this.itemTemplate = response.data.attribute;
          this.tableData = response.data.items; 
        })
      }
    },
    // 查看  产品 
    handleEdit: function(index, row) {
      debugger
      console.log(row.itemsId);
      let branch=this.itemsBranch;
      if(branch == "技术一部" ){
        this.$router.push({
            path: '/section1/hardware1/'+row.itemsId,
            params: {
              id: row.itemsId
            }
        })
      }else {
        this.$router.push({
            path: '/section2/hardware2/'+row.itemsId,
            params: {
              id: row.itemsId
            }
        })
      }
      
    },
    //根据条件查询项目信息
    onGetItemsByIdAndName: function () {
      getItemsByIdAndName(this.itemsSelect.itemsId,this.itemsSelect.itemsName,this.itemsBranch,this.itemsYear).then(response=>{
        this.itemTemplate = response.data.attribute;
        this.tableData = response.data.items;
      })
    },
    //添加项目信息
    itemsAdd: function () {
      this.loadingVal = true;
      let data=JSON.stringify(this.itemTemplate);
      setItems(data,this.itemsBranch,this.itemsYear).then(response=>{
        
        this.loadingVal = false;
        this.centerDialogVisible = false;
        this.getRequest();
      }).catch(err=>{
        console.log("数据添加失败了");
        this.loadingVal = false;
      })
    },
    //打开对话框
    itemsAddShow: function () {
      this.centerDialogVisible = true;
    },
    //修改项目属性
    handleUpdate: function(index, row){
      this.centerUpdate = true;
      
      for (let i = 0; i < this.itemTemplate.length; i++) {
        let itemsAttribute = this.itemTemplate[i];
        let val = row[itemsAttribute.attribute_name];
        this.itemTemplate[i].attributeQVal = val;
        if(itemsAttribute.attribute_name == "itemsId"){
          this.itemsId = itemsAttribute.attributeQVal;
        }
      }
    },
    itemsUpdate: function() {
      let data=JSON.stringify(this.itemTemplate);
      
      itemsUpdate1(data,this.itemsId).then(response=>{
        
        this.loadingVal = false;
        this.centerUpdate = false;
        this.getRequest();
      }).catch(err=>{
        console.log("数据添加失败了");
        this.loadingVal = false;
      })
      
      
    },
    //删除项目
    handleDelete: function(index, row){
      let itemsId = row.itemsId;
      this.$confirm('此操作将永久删除该项目及其下属硬件设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        itemsDelete(itemsId).then(response=>{
          debugger
          this.$message({
            message: '数据删除成功了',
            type: 'success'
          });
          this.getRequest();
        }).catch(err=>{
          this.$message({
            type: 'info',
            message: '数据失败成功了'
          })
          this.loadingVal = false;
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })  
      
    }
  },
  //进入当前页面执行方法
  mounted: function (){
    this.getRequest();
  },
  //监听方法
  watch: {
    //监听路由变化
    '$route'(to,from){
      this.getRequest();
    },
    //监听
    itemTemplate (newVal, oldVal) {
      debugger
      let size=this.itemTemplate.length;
      if(size >= 1){
        this.itemsShow = true;
      }
    }
  }
}
</script>

<style scoped="scoped">
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.titleStytle{
  padding: 1rem;
}
</style>
