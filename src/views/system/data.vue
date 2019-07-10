<template>
  <div>
    <span>&nbsp;</span><br />
    <h1>动态数据字段管理</h1><br />
    <el-tabs type="card">
      <el-tab-pane label="项目属性管理">
        <el-row :gutter="24">
          <el-col :xs="24" :sm="24" :lg="24" :xl="24">
            <h2>项目属性管理</h2>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="24" :xl="24">
            <span>&nbsp;</span><br />
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12" :xl="12">
            <span>&nbsp;</span>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12" :xl="12">
            <el-button type="primary" round @click="addItemsAttribute01()">添加属性</el-button>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="24" :xl="24">
            <span>&nbsp;</span><br />
          </el-col>
          <el-col :lg="2" :xl="2" class="">
            <span>&nbsp;</span>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="20" :xl="20">
             <template>
              <el-table
                :data="itemTableData"
                border
                stripe
                style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand"
                      v-for="items in props.row.attributeList" :key="items">
                      <el-form-item label="属性值:" >
                        <span>{{ items.attribute_val }}</span><br />
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="attribute_id"
                  label="ID" >
                </el-table-column>
                <el-table-column
                  prop="attribute_name_val"
                  label="属性名称">
                </el-table-column>
                <el-table-column
                  prop="attribute_name"
                  label="属性代号">
                </el-table-column>
                <el-table-column
                  prop="attribute_type"
                  label="属性类别"
                  width="180">
                </el-table-column>
                <el-table-column label="操作"
                  width="260"
                >
                  <template slot-scope="scope">
                    <el-button
                      @click="itemAttributeUpdate(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      @click="itemAttributeDelete1(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-col>
        </el-row>
        
        <el-dialog
          title="添加字段"
          :visible.sync="addItemsAttribute"
          width="60%"
          center>
          <el-row :gutter="24">
            <el-form ref="attributeRules" :model="attributeEntey"  :rules="attributeRules">
              <el-col :span="24" style="height: 2rem;"></el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                    <el-main>
                      <span class="dialogTitle">属性名称：</span>
                    </el-main>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
                    <el-input v-model="attributeEntey.attribute_name_val" placeholder="X分类,X名称"></el-input>
                  </el-col>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                    <el-main>
                      <span class="dialogTitle">属性代号：</span>
                    </el-main>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
                    <el-input v-model="attributeEntey.attribute_name" placeholder="X分类,X名称"></el-input>
                  </el-col>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                    <el-main>
                      <span class="dialogTitle">属性类型：</span>
                    </el-main>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <el-select v-model="attributeEntey.attribute_type" placeholder="请选择">
                      <el-option
                        v-for="item in attribute_type"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :lg="2" :xl="2" >
                    <svg-icon 
                     @click="itemsAttributeListAdd()" icon-class="insert01" class-name="card-panel-icon" />
                  </el-col>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"
                  v-for="(thisIsItems,indexVal) in attributeEntey.attributeList" :key="thisIsItems">
                  <el-col  :lg="10" :xl="10">
                    <el-main>
                      <span class="dialogTitle">属性值{{indexVal}}：</span>
                    </el-main>
                  </el-col>
                  <el-col :lg="12" :xl="12">
                    <el-input v-model="thisIsItems.attribute_val" placeholder="X分类..."></el-input>
                  </el-col>
                  <el-col :lg="1" :xl="1" >
                    <svg-icon 
                     @click="itemsAttributeListDelect(indexVal)" icon-class="insert01" class-name="card-panel-icon" />
                  </el-col>
                </el-col>
              </el-col>
              <el-col :span="24" style="height: 2rem;"></el-col>
            </el-form>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addItemsAttribute = false">取 消</el-button>
            <el-button type="primary" @click="itemsAttributeAdd01()" :loading="this.loadingVal">确 定</el-button>
          </span>
        </el-dialog>
        
        <el-dialog
          title="修改字段"
          :visible.sync="updateItemsAttribute"
          width="60%"
          center>
          <el-row :gutter="24">
            <el-form ref="attributeRules" :model="attributeEntey"  :rules="attributeRules">
              <el-col :span="24" style="height: 2rem;"></el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                    <el-main>
                      <span class="dialogTitle">属性名称：</span>
                    </el-main>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
                    <el-input v-model="attributeEntey.attribute_name_val" placeholder="X分类,X名称"></el-input>
                  </el-col>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                    <el-main>
                      <span class="dialogTitle">属性代号：</span>
                    </el-main>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
                    <el-input v-model="attributeEntey.attribute_name" placeholder="X分类,X名称"></el-input>
                  </el-col>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                    <el-main>
                      <span class="dialogTitle">属性类型：</span>
                    </el-main>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <el-select v-model="attributeEntey.attribute_type" placeholder="请选择">
                      <el-option
                        v-for="item in attribute_type"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :lg="2" :xl="2" >
                    <svg-icon 
                     @click="itemsAttributeListAdd()" icon-class="insert01" class-name="card-panel-icon" />
                  </el-col>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"
                  v-for="(item,indexCVal) in attributeEntey.attributeList" :key="item">
                  <el-col  :lg="10" :xl="10">
                    <el-main>
                      <span class="dialogTitle">属性值{{indexCVal}}：</span>
                    </el-main>
                  </el-col>
                  <el-col :lg="12" :xl="12">
                    <el-input v-model="item.attribute_val" placeholder="X分类..."></el-input>
                  </el-col>
                  <el-col :lg="1" :xl="1" >
                    <svg-icon 
                     @click="itemsAttributeListDelect(indexCVal)" icon-class="insert01" class-name="card-panel-icon" />
                  </el-col>
                </el-col>
              </el-col>
              <el-col :span="24" style="height: 2rem;"></el-col>
            </el-form>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button @click="updateItemsAttribute = false">取 消</el-button>
            <el-button type="primary" @click="itemAttributeUpdateClick()" :loading="this.loadingVal">确 定</el-button>
          </span>
        </el-dialog>
        
      </el-tab-pane>
      
      
      
      
      
      <!-- - - - - - - - - - - - -  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
      
      <el-tab-pane label="硬件属性管理">
        <el-row :gutter="24">
          <el-col :xs="24" :sm="24" :lg="24" :xl="24">
            <h2>硬件属性管理</h2>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="24" :xl="24">
            <span>&nbsp;</span><br />
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12" :xl="12">
            <span>&nbsp;</span><br />
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12" :xl="12">
            <el-button type="primary" round @click="addHardwareAttributeClassify01()">添加属性类别</el-button>
            <el-button type="primary" round @click="addHardwareAttribute01()">添加属性</el-button>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="24" :xl="24">
            <span>&nbsp;</span><br />
          </el-col>
          
          <el-col :xs="24" :sm="24" :lg="24" :xl="24" v-for="dataVal in hardwareTableData" :key="dataVal.classify_id" 
            style="margin-top: 4rem;">
            <el-col :xs="24" :sm="24" :lg="24" :xl="24" style="" class="hardwareClassifyNameClass">
              <span>属性类别:{{dataVal.classify_name}}</span><br />
            </el-col>
            <el-col :lg="2" :xl="2" class="">
              <span>&nbsp;</span>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="20" :xl="20">
               <template>
                <el-table
                  :data="dataVal.attributeList"
                  border
                  stripe
                  style="width: 100%">
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <el-form label-position="left" inline class="demo-table-expand"
                        v-for="items in props.row.attributeList" :key="items">
                        <el-form-item label="属性值:" >
                          <span>{{ items.attribute_val }}</span><br />
                        </el-form-item>
                      </el-form>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="attribute_id"
                    label="ID" >
                  </el-table-column>
                  <el-table-column
                    prop="attribute_name"
                    label="属性名称">
                  </el-table-column>
                  <el-table-column
                    prop="attribute_code"
                    label="属性代号">
                  </el-table-column>
                  <el-table-column
                    prop="attribute_type"
                    label="属性类别"
                    width="180">
                  </el-table-column>
                  <el-table-column label="操作"
                    width="260"
                  >
                    <template slot-scope="scope">
                      <el-button
                        @click="hardwareAttributeUpdate(scope.$index, scope.row)">编辑</el-button>
                      <el-button
                        @click="hardwareAttributeDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
              
            </el-col>
            
            <el-col :xs="24" :sm="24" :lg="24" :xl="24" style="margin: 1rem;">
              <el-button v-if='dataVal.classify_name != "通用"'  type="primary"
                  @click="hardwareAttributeClassifyDel(dataVal.classify_id)">删除</el-button>
            </el-col>
          </el-col>
          
        </el-row>
        
        <el-dialog
          title="添加属性分类"
          :visible.sync="addHardwareAttributeClassify"
          width="60%"
          center>
          <el-row :gutter="24">
            <el-form ref="attributeRules" :model="hardwareAttributeClassifyEntey"  :rules="attributeRules">
              <el-col :span="24" style="height: 2rem;"></el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                    <el-main>
                      <span class="dialogTitle">属性类别名称：</span>
                    </el-main>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
                    <el-input v-model="hardwareAttributeClassifyEntey.classify_name" placeholder="X分类,X名称"></el-input>
                  </el-col>
                </el-col>
              </el-col>
              <el-col :span="24" style="height: 2rem;"></el-col>
            </el-form>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addHardwareAttributeClassify = false">取 消</el-button>
            <el-button type="primary" @click="hardwareAttributeClassifyAdd01()" :loading="this.loadingVal">确 定</el-button>
          </span>
        </el-dialog>
        
        
        
        <el-dialog
          title="添加硬件属性"
          :visible.sync="addHardwareAttribute"
          width="60%"
          center>
          <el-row :gutter="24">
            <el-form ref="attributeRules" :model="hardwareAttributeEntey"  :rules="attributeRules">
              <el-col :span="24" style="height: 2rem;"></el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                    <el-main>
                      <span class="dialogTitle">属性名称：</span>
                    </el-main>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
                    <el-input v-model="hardwareAttributeEntey.attribute_name" placeholder="X分类,X名称"></el-input>
                  </el-col>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                    <el-main>
                      <span class="dialogTitle">属性分类：</span>
                    </el-main>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
                    <el-select v-model="hardwareAttributeEntey.classify_id" placeholder="请选择">
                      <el-option
                        v-for="item in hardwareTableData"
                        :key="item.classify_id"
                        :label="item.classify_name"
                        :value="item.classify_id">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                    <el-main>
                      <span class="dialogTitle">属性类型：</span>
                    </el-main>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <el-select v-model="hardwareAttributeEntey.attribute_type" placeholder="请选择">
                      <el-option
                        v-for="item in attribute_type"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :lg="2" :xl="2" >
                    <svg-icon 
                     @click="hardwareAttributeListAdd()" icon-class="insert01" class-name="card-panel-icon" />
                  </el-col>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"
                  v-for="(item,indexCVal) in hardwareAttributeEntey.attributeList" :key="item">
                  <el-col  :lg="10" :xl="10">
                    <el-main>
                      <span class="dialogTitle">属性值{{indexCVal}}：</span>
                    </el-main>
                  </el-col>
                  <el-col :lg="12" :xl="12">
                    <el-input v-model="item.attribute_val" placeholder="X分类..."></el-input>
                  </el-col>
                  <el-col :lg="1" :xl="1" >
                    <svg-icon 
                     @click="hardawreAttributeListDelect(indexCVal)" icon-class="insert01" class-name="card-panel-icon" />
                  </el-col>
                </el-col>
              </el-col>
              <el-col :span="24" style="height: 2rem;"></el-col>
            </el-form>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addHardwareAttribute = false">取 消</el-button>
            <el-button type="primary" @click="hardwareAttributeAdd01()" :loading="this.loadingVal">确 定</el-button>
          </span>
        </el-dialog>
        
        <el-dialog
          title="修改字段"
          :visible.sync="updateHardwareAttribute"
          width="60%"
          center>
          <el-row :gutter="24">
            <el-form ref="attributeRules" :model="hardwareAttributeEntey"  :rules="attributeRules">
              <el-col :span="24" style="height: 2rem;"></el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                    <el-main>
                      <span class="dialogTitle">属性名称：</span>
                    </el-main>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
                    <el-input v-model="hardwareAttributeEntey.attribute_name" placeholder="X分类,X名称"></el-input>
                  </el-col>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                    <el-main>
                      <span class="dialogTitle">属性代号：</span>
                    </el-main>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
                    <el-input v-model="hardwareAttributeEntey.attribute_code" placeholder="X分类,X名称"></el-input>
                  </el-col>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                    <el-main>
                      <span class="dialogTitle">属性类型：</span>
                    </el-main>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <el-select v-model="hardwareAttributeEntey.attribute_type" placeholder="请选择">
                      <el-option
                        v-for="item in attribute_type"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :lg="2" :xl="2" >
                    <svg-icon 
                     @click="hardwareAttributeListAdd()" icon-class="insert01" class-name="card-panel-icon" />
                  </el-col>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"
                  v-for="item in hardwareAttributeEntey.attributeList" :key="item">
                  <el-col  :lg="10" :xl="10">
                    <el-main>
                      <span class="dialogTitle">属性值{{item.attribute_val_id}}：</span>
                    </el-main>
                  </el-col>
                  <el-col :lg="13" :xl="13">
                    <el-input v-model="item.attribute_val" placeholder="X分类..."></el-input>
                  </el-col>
                </el-col>
              </el-col>
              <el-col :span="24" style="height: 2rem;"></el-col>
            </el-form>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button @click="updateHardwareAttribute = false">取 消</el-button>
            <el-button type="primary" @click="hardwareAttributeUpdateClick()" :loading="this.loadingVal">确 定</el-button>
          </span>
        </el-dialog>
        
      </el-tab-pane>
    </el-tabs>
    
  </div>
</template>

<script>
import  { itemsAttributeAdd02,getItemsAttribute,itemAttributeDelete,itemAttributeUpdate01 }  from '../../api/items.js'
import  { hardwareAttributeAdd02,getHardwareAttribute,hardwareAttributeDelete,hardwareAttributeClassifyAdd,hardwareAttributeClassifyDelete }  from '../../api/hardware.js'

export default {
  name: 'Data',
  data : function(){
    return {
      value: '',
      addItemsAttribute : false,
      updateItemsAttribute : false,
      addHardwareAttribute : false,
      addHardwareAttributeClassify : false,
      updateHardwareAttribute : false,
      loadingVal : false,
      Classify : '',
      attributeListSize : [{
        attribute_val_id : 0,
        attribute_val : ''
      }],
      attribute_type: [{
        value: '01',
        label: '自由输入'
      }, {
        value: '02',
        label: '多选'
      }],
      attributeEntey: {
        attribute_id: '',
        attribute_name_val: '',
        attribute_name: '',
        attributeList:[],
        attribute_type: '',
      },
      hardwareAttributeClassifyEntey:{
        classify_id: '',
        classify_name: '',
        classify_code: '',
        attributeList:[],
        attributeQVal: '',
      },
      hardwareAttributeEntey:{
        attribute_id: '',
        attribute_code: '',
        attribute_name: '',
        attributeList:[],
        attribute_type: '',
        classify_id: '',
      },
      attributeRules: {
        attribute_id: [{ required: true, trigger: 'blur'}],
        attribute_name_val: [{ required: true, trigger: 'blur'}],
        attribute_name: [{ required: true, trigger: 'blur'}],
        attributeList:[],
        attribute_type: [{ required: true, trigger: 'blur'}],
        
      },
      itemTableData: [],
      
      hardwareTableData: [],
    }
  },
  components: {
  },
  computed: {
  },
  methods: {
    //获取后台数据 包括项目信息和列表信息
    getRequest : function (){
      
      getItemsAttribute().then(request =>{
        debugger
        this.itemTableData = request.data;
      }).catch(err=>{
        this.$message.error('项目属性数据获取失败了，请联系管理员');
      });
      
      getHardwareAttribute().then(request =>{
        debugger
        this.hardwareTableData = request.data;
      }).catch(err=>{
        this.$message.error('硬件属性数据获取失败了，请联系管理员');
      });
      
    },
    dataVerify: function (dataVal) {
      debugger
      this.loadingVal = true;
      this.itemsAttributeAdd = false;
      let attributeType = "";
      let lise = [];
      let data = "";
      if(dataVal == 1){
        attributeType=this.attributeEntey.attribute_type;
        lise=this.attributeEntey.attributeList;
        data=JSON.stringify(this.attributeEntey);
      }else
      if(dataVal == 2){
        attributeType=this.hardwareAttributeEntey.attribute_type;
        lise=this.hardwareAttributeEntey.attributeList;
        data=JSON.stringify(this.hardwareAttributeEntey);
      }
      if(dataVal == 3){
        data=JSON.stringify(this.hardwareAttributeClassifyEntey);
        attributeType = '01'
      }
      
      
      if(attributeType == '01' && lise != null && lise.length >= 1){
        this.$message.error('自由输入不能添加属性值');
        this.loadingVal = false;
        return 1;
      }
      if(attributeType != '01' &&  lise.length <= 1){
        this.$message.error('多选必须添加属性值');
        return 1;
      }
      
      
      return data;
    },
    itemsAttributeAdd01: function () {
      let data =this.dataVerify(1);
      if(data == 1){
        return
      }
      itemsAttributeAdd02(data).then(request =>{
        this.$message({
          message: '恭喜你，数据添加成功了',
          type: 'success'
        });
        
        this.addItemsAttribute = false;
        this.loadingVal = false;
        this.getRequest();
      }).catch(err=>{
        this.$message.error('数据添加失败了');
        this.loadingVal = false;
      })
      
    },
    hardwareAttributeClassifyAdd01: function () {
      debugger
      let data =this.dataVerify(3);
      if(data == 1){
        return
      }
      hardwareAttributeClassifyAdd(data).then(request =>{
        this.$message({
          message: '恭喜你，数据添加成功了',
          type: 'success'
        });
        this.loadingVal = false;
        
        this.addHardwareAttributeClassify = false;
        this.getRequest();
      }).catch(err=>{
        this.$message.error('数据添加失败了');
        this.loadingVal = false;
      })
    },
    hardwareAttributeAdd01: function () {
      let data =this.dataVerify(2);
      if(data == 1){
        return
      }
      hardwareAttributeAdd02(data).then(request =>{
        this.$message({
          message: '恭喜你，数据添加成功了',
          type: 'success'
        });
        this.loadingVal = false;
        this.addHardwareAttribute = false;
        this.getRequest();
      }).catch(err=>{
        this.$message.error('数据添加失败了');
        this.loadingVal = false;
      })
    },
    itemsAttributeListAdd:function () {
      let itIs=this.attributeEntey.attributeList.length;
      this.attributeEntey.attributeList.push({
        attribute_val_id : itIs,
        attribute_val : ''
      });
      console.log(this.attributeEntey.attributeList);
    },
    itemsAttributeListDelect: function (index) {
      
      this.attributeEntey.attributeList.splice(index, 1);
    },
    hardawreAttributeListDelect: function (index) {
      
      this.hardwareAttributeEntey.attributeList.splice(index, 1);
    },
    hardwareAttributeListAdd:function () {
      
      let itIs=this.hardwareAttributeEntey.attributeList.length;
      this.hardwareAttributeEntey.attributeList.push({
        attribute_val_id : itIs,
        attribute_val : ''
      });
    },
    addItemsAttribute01:function () {
      this.addItemsAttribute = true;
      this.attributeEntey.attributeList.length = 0;
    },
    addHardwareAttribute01: function () {
      this.addHardwareAttribute = true;
      this.attributeEntey.attributeList.length = 0;
    },
    addHardwareAttributeClassify01: function () {
      this.addHardwareAttributeClassify = true;
      
    },
    itemAttributeUpdate: function (index,row){
      this.updateItemsAttribute = true;
      this.attributeEntey = row;
      
    },
    itemAttributeDelete1: function (index,row){
      
      this.loadingVal = true;
      this.attributeEntey = row;
      let attribute_id=this.attributeEntey.attribute_id;
      this.$confirm('此操作将永久删除所有项目中的属性,请谨慎操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        itemAttributeDelete(attribute_id).then(request =>{
          this.$message({
            message: '恭喜你，项目属性删除成功了',
            type: 'success'
          });
          this.loadingVal = false;
          this.getRequest();
        }).catch(err=>{
          this.$message.error('数据删除失败了');
          this.loadingVal = false;
        })
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      
      
    },
    itemAttributeUpdateClick: function (index,row){
      debugger
      this.loadingVal = true;
      let data =this.dataVerify(1);
      itemAttributeUpdate01(data).then(request =>{
        this.$message({
          message: '恭喜你，项目属性修改成功了',
          type: 'success'
        });
        this.loadingVal = false;
        this.getRequest();
      }).catch(err=>{
        this.$message.error('数据删除失败了');
        this.loadingVal = false;
      })
      
    },
    hardwareAttributeUpdate: function (index,row){
      this.updateHardwareAttribute = true;
      this.hardwareAttributeEntey = row;
      
    },
    hardwareAttributeUpdateClick: function (index,row){
      this.loadingVal = true;
      let data =this.dataVerify(2);
      
    },
    //删除该分类
    hardwareAttributeClassifyDel: function (classifyId){
      
      this.$confirm('此操作将永久删除所有该分类及其该分类下的所有属性,请谨慎操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        debugger
        hardwareAttributeClassifyDelete(classifyId).then(request =>{
          
          this.$message({
            message: '恭喜你，数据删除成功了',
            type: 'success'
          });
          this.getRequest();
        }).catch(err=>{
          this.$message.error('数据删除失败了');
        })
        
      }).catch(() => {
        debugger
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    hardwareAttributeDelete: function (index,row){
      this.hardwareAttributeEntey = row;
      let attribute_id=this.hardwareAttributeEntey.attribute_id;
      this.$confirm('此操作将永久删除所有硬件中的属性,请谨慎操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        hardwareAttributeDelete(attribute_id).then(request =>{
          this.$message({
            message: '恭喜你，数据删除成功了',
            type: 'success'
          });
          this.getRequest();
        }).catch(err=>{
          this.$message.error('数据删除失败了');
        })
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      
      
    },
   
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
    /* itemTemplate (newVal, oldVal) {
      debugger
      let size=this.itemTemplate.length;
      if(size >= 1){
        this.itemsShow = true;
      }
    } */
  }
}
</script>

<style scoped="scoped">
.bd1{
  border: 1px solid;
}
.hardwareClassifyNameClass{
  line-height: 4rem;
  font-size: 1.5rem;
}
</style>
