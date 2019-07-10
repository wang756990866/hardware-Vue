<template>
  <div>
    <div v-if="hardwareType">
      <br /><br />
      <h2>硬件产品详情</h2>
      <br /><br />
      <el-row :gutter="20">
        <el-col :xs="1" :sm="1" :lg="1" :xl="1"><span>&nbsp;</span></el-col>
        <el-col :xs="8" :sm="8" :md="6" :lg="4" :xl="4" class="titleStytle">
          <el-select v-model="classify_id" clearable filterable placeholder="分类"
            @keyup.enter.native="getHardwaresByIdAndName()">
              <el-option
                v-for="item in this.hAttributeEntry"
                :key="item.classify_id"
                :label="item.classify_name"
                :value="item.classify_id"
                v-if="item.classify_name != '通用'">
              </el-option>
          </el-select>
        </el-col>
        <!-- <el-col :xs="8" :sm="8" :md="6" :lg="4" :xl="4" class="titleStytle">
          <el-select v-model="hardwareCodeType" clearable filterable placeholder="二维码绑定状态"
            @keyup.enter.native="getHardwaresByIdAndName()">
            <el-option
              v-for="item in hardwareCodeTypeList"
              :key="item.id"
              :label="item.val"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col> -->
        <el-col :xs="8" :sm="8" :md="6" :lg="4" :xl="4" class="titleStytle">
          <el-input v-model="hardwareId" placeholder="硬件ID" @keyup.enter.native="getHardwaresByIdAndName()"></el-input>
        </el-col>
        <el-col :xs="8" :sm="8" :md="6" :lg="4" :xl="4" class="titleStytle">
          <el-input v-model="hardwareName" placeholder="硬件名称" @keyup.enter.native="getHardwaresByIdAndName()"></el-input>
        </el-col>
        <el-col :span="2" class="titleStytle">
          <el-button type="primary" @click="getHardwaresByIdAndName()" @keyup.enter.native="getHardwaresByIdAndName()">
            查&nbsp;&nbsp;&nbsp;&nbsp;询
          </el-button>
        </el-col>
        <el-col :xs="8" :sm="8" :md="6" :lg="2" :xl="2" class="titleStytle">
          <el-button type="primary" @click="setHardware()">绑定硬件</el-button>
        </el-col>
        <el-col :xs="8" :sm="8" :md="6" :lg="2" :xl="2" class="titleStytle">
          <el-button type="primary" @click="codeShow()">二维码管理</el-button>
        </el-col>
      </el-row>
      <br /><br />
      <el-row :gutter="20">
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="20" >
          <template>
            <el-table
              :data="tableData"
              border
              stripe
              height="500"
              style="width: 100%" >
              <el-table-column
                prop="hardware_id"
                label="物品id" >
              </el-table-column>
              <el-table-column
                prop="hardware_name"
                label="物品名称" >
              </el-table-column>
              <el-table-column
                prop="classify_name"
                label="物品类别">
              </el-table-column>
              <el-table-column
                prop="type"
                label="物品状态">
              </el-table-column>
              <el-table-column
                prop="date"
                label="安装时间">
              </el-table-column>
              <el-table-column label="操作"
                width="260"
              >
              <template slot-scope="scope">
                <el-button
                  
                  @click="handleSelect(scope.$index, scope.row)">详情</el-button>
                <el-button
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
              </el-table-column>
            </el-table>
          </template>
        </el-col>
      </el-row>
      <el-dialog
        title="绑定硬件产品"
        :visible.sync="addHardware"
        width="60%"
        center>
        <el-row :gutter="24">
          <el-col :span="24" style="height: 2rem;"></el-col>
          <el-col :span="24" v-if="!this.addHardwareType">
            <el-col :span="12" style="text-align: right;padding-top: 1%;">
              <span>类型：</span>
            </el-col>
            <el-col :span="12">
              <el-select v-model="classify_id" placeholder="请选择">
                <el-option
                  v-for="item in this.hAttributeEntry"
                  :key="item.classify_name"
                  :label="item.classify_name"
                  :value="item.classify_name"
                  v-if="item.classify_name != '通用'">
                </el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="24" v-if="this.addHardwareType">
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" :key="attributeList1.attribute_id" 
              v-for="attributeList1 in this.hAttributeEntry">
              <el-col :span="24" v-for="attributeList in attributeList1.attributeList" :key="attributeList.attribute_id"
                v-if="attributeList1.classify_name == classify_id || attributeList.classify_id == 'classify_00'">
                <el-col :span="24" v-if="attributeList.attribute_type == '01'">
                  <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                    <el-main>
                      <span class="dialogTitle">{{attributeList.attribute_name}}：</span>
                    </el-main>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14"
                    v-show="attributeList.attribute_code != 'codeId'">
                    <el-input v-model="attributeList.attributeQVal" :placeholder="attributeList.attribute_name"></el-input>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14"
                    v-show="attributeList.attribute_code == 'codeId'">
                    <el-autocomplete
                      v-model="attributeList.attributeQVal"
                      :fetch-suggestions="querySearchAsync"
                      @select="codeSelect"
                    ></el-autocomplete>
                  </el-col>
                </el-col>
              
                <el-col :span="24" v-if="attributeList.attribute_type == '02'">
                  <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                    <el-main>
                      <span class="dialogTitle">{{attributeList.attribute_name}}：</span>
                    </el-main>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14"
                    v-show="attributeList.attribute_code != 'codeId'">
                    <el-select v-model="attributeList.attributeQVal" clearable filterable placeholder="请选择">
                      <el-option
                        v-for="item in attributeList.attributeList"
                        :key="item.attribute_val_id"
                        :label="item.attribute_val"
                        :value="item.attribute_val_id">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14"
                    v-show="attributeList.attribute_code == 'codeId'">
                    <el-autocomplete
                      v-model="attributeList.attributeQVal"
                      :fetch-suggestions="querySearchAsync"
                      @select="codeSelect"
                    ></el-autocomplete>
                  </el-col>
                </el-col>
              </el-col>
            </el-col>
          </el-col>
          <el-col :span="24" style="height: 2rem;"></el-col>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="hardwareDelect()">取 消</el-button>
          <el-button type="primary" @click="hardwareSet()" :loading="this.loadingVal">确 定</el-button>
        </span>
      </el-dialog>
      
      
      <el-dialog
        title="查询硬件产品"
        :visible.sync="selectHardware"
        width="60%"
        center>
        <el-row :gutter="24">
          <el-col :span="24" style="height: 2rem;"></el-col>
          <el-col :span="24" :key="attributeList1.attribute_id" 
            v-for="attributeList1 in this.hAttributeEntry">
          
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" :key="attributeList.attribute_id" 
              v-for="attributeList in attributeList1.attributeList"
              v-if="attributeList1.classify_name == classify_id || attributeList.classify_id == 'classify_00'">
              <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                <el-main>
                  <span class="dialogTitle">{{attributeList.attribute_name}}：</span>
                </el-main>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
                <el-main>
                  <span class="dialogTitle">{{tableIndexData[attributeList.attribute_code]}}</span>
                </el-main>
              </el-col>
            </el-col>
          </el-col>
          <el-col :span="24" style="height: 2rem;"></el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="selectHardware = false">取 消</el-button>
        </span>
      </el-dialog>
      
      <el-dialog
        title="编辑硬件产品"
        :visible.sync="updatHardware"
        width="60%"
        center>
        <el-row :gutter="24">
          <el-col :span="24" style="height: 2rem;"></el-col>
          <el-col :span="24" :key="attributeList1.attribute_id" 
            v-for="attributeList1 in this.hAttributeEntry">
            
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" :key="attributeList.attribute_id" 
              v-for="attributeList in attributeList1.attributeList"
              v-if="attributeList1.classify_name == classify_id || attributeList.classify_id == 'classify_00'">
              <el-col :span="24" >
                <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                  <el-main>
                    <span class="dialogTitle">{{attributeList.attribute_name}}：</span>
                  </el-main>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14" 
                  v-if="attributeList.attribute_type == '01' "
                  v-show="attributeList.attribute_code != 'codeId'">
                  
                  <el-input v-model="attributeList.attributeQVal" :placeholder="attributeList.attribute_name"
                  :value="tableIndexData[attributeList.attribute_code]"></el-input>
                  
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14"
                  v-if="attributeList.attribute_type == '02' "
                  v-show="attributeList.attribute_code != 'codeId'">
                  <el-select v-model="attributeList.attributeQVal" clearable filterable placeholder="请选择">
                    <el-option
                      v-for="item in attributeList.attributeList"
                      :key="item.attribute_val_id"
                      :label="item.attribute_val"
                      :value="item.attribute_val_id">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14"
                  v-show="attributeList.attribute_code == 'codeId'">
                  <el-autocomplete
                    v-model="attributeList.attributeQVal"
                    :fetch-suggestions="querySearchAsync"
                    @select="codeSelect"
                  ></el-autocomplete>
                  
                </el-col>
                
              </el-col>
            </el-col>
          </el-col>
          <el-col :span="24" style="height: 2rem;"></el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="updatHardware = false">取 消</el-button>
          <el-button type="primary" @click="hardwareUpdat()" :loading="this.loadingVal">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div v-if="codeType">
      <div style="width: 100%;text-align: left;padding: 2rem 2rem;position: fixed;z-index: 2;">
        <el-button type="primary" round @click="returnHardware()">返回产品</el-button>
      </div>
      <br /><br />
      <h2>硬件二维码详情</h2>
      <br /><br />
      <el-row :gutter="24">
        <el-col :span="12" class="codeTitle">
          <el-button type="primary" @click="addCode = true">新增二维码</el-button>
        </el-col>
      </el-row>
      
      <el-tabs type="card">
        <el-tab-pane label="未绑定">
          <el-row :gutter="24" v-for="num in codeData" :key="num.codeType">
            <el-col :span="24" v-if="num.codeUrl.length >= 1" class="codeTitle">{{num.codeType}}<br/><br/></el-col>
            <el-col :xs="24" :sm="24" :md="6" :lg="4" :xl="4" style="margin: 1rem 1rem;"
              v-for="codeData in num.codeUrl" :key="codeData.code_id"
              v-if="codeData.code_states == '1'">
              <el-image
              style="height: 100%;"
              :src="codeData.code_url"
              fit="contain">
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              
              <div v-if="codeData.code_states == '1'">
                <el-button type="warning" disabled>未绑定</el-button>
              </div>
              <div v-if="codeData.code_states == '2'">
                <el-button type="success" disabled>已绑定</el-button>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="已绑定">
          <el-row :gutter="24" v-for="num in codeData" :key="num.codeType">
            <el-col :span="24" v-if="num.codeUrl.length >= 1" class="codeTitle">{{num.codeType}}<br/><br/></el-col>
            <el-col :xs="24" :sm="24" :md="6" :lg="4" :xl="4" style="margin: 1rem 1rem;"
              v-for="codeData in num.codeUrl" :key="codeData.code_id"
              v-if="codeData.code_states == '2'">
              <el-image
              style="height: 100%;"
              :src="codeData.code_url"
              fit="contain">
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              
              <div v-if="codeData.code_states == '1'">
                <el-button type="warning" disabled>未绑定</el-button>
              </div>
              <div v-if="codeData.code_states == '2'">
                <el-button type="success" disabled>已绑定</el-button>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      
      
      <el-dialog
        title="新增二维码"
        :visible.sync="addCode"
        width="60%"
        center>
        <el-row :gutter="24">
          <el-col :span="24" style="height: 2rem;"></el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <el-col :lg="10" :xl="10">
              <el-main>
                <span class="dialogTitle">数 量:</span>
              </el-main>
            </el-col>
            <el-col :lg="10" :xl="10">
              <el-main>
                <el-input v-model="codeAdd.codeNumber" :placeholder="codeAdd.codeNumber"></el-input>
              </el-main>
            </el-col>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <el-col :lg="10" :xl="10">
              <el-main>
                <span class="dialogTitle">类 别:</span>
              </el-main>
            </el-col>
            <el-col :lg="10" :xl="10">
              <el-main>
                <el-select v-model="codeAdd.codeType" placeholder="请选择">
                  <el-option
                    v-for="item in this.hAttributeEntry"
                    :key="item.classify_name"
                    :label="item.classify_name"
                    :value="item.classify_name">
                  </el-option>
                </el-select>
              </el-main>
            </el-col>
          </el-col>
          <el-col :span="24" style="height: 2rem;"></el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCode = false">取 消</el-button>
          <el-button @click="codeAddFunction()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
  
</template>

<script>
import  { getHardwaresByItemsId,hardwareAdd,setCode,getclassify,hardwareDelete,
        getCode,getCodeByName,hardwareUpdate,getHardwaresByIdAndName1 }  from '../../api/hardware.js'
export default {
  name: 'Hardware',
  data : function(){
    return {
      itemsID : '',//项目ID
      classify : '',// 编辑时当前点击的分类
      classify_id : '',
      hardwareId : '',// 硬件iD
      addHardwareType : false,
      hardwareName : '',//绑定的搜索输入框 硬件的名称
      attributeVal : '',//添加产品时当前选择的类型
      hAttributeEntry : [{ //硬件类型的数据结构
        classify_id : 'classify_00',// 类型的ID
        classify_name : '通用',// 类型的名称
        classify_code : 'tongyong',// 类型的代号
        attributeQVal : '',// 类型的更改值
        attributeList : [{// 类型的属性
          attributeList: [{//属性为多选的属性值
            attributeList: null,//忽略就可以了
            attribute_id: "attribute_02",//属性的ID
            attribute_val: "未采购",//属性为多选的 属性值名称
            attribute_val_id: "attribute_val_id_07",//属性为多选的 属性值ID
          },{
            attributeList: null,
            attribute_id: "attribute_02",//属性的ID
            attribute_val: "采购中",//属性为多选的 属性名称
            attribute_val_id: "attribute_val_id_08"//属性为多选的 属性值ID
          }],
          attributeQVal: "未采购",//更改的值
          attributeValId: null,//属性为1的属性值ID
          attribute_code: "type",//属性的代号
          attribute_id: "attribute_02",//属性的ID
          attribute_name: "状态",//属性的名称
          attribute_type: "02",//属性的类型
          classify_id : "classify_00",
        },{
          attributeList: null,
          attributeQVal: "",
          attributeValId: null,
          attribute_code: "name",
          attribute_id: "attribute_01",
          attribute_name: "名称",
          attribute_type: "01",
          classify_id : "classify_00",
        }]
      },{ //硬件类型的数据结构
        classify_id : 'classify_03',// 类型的ID
        classify_name : '主机',// 类型的名称
        classify_code : 'zhuji',// 类型的代号
        attributeQVal : '',// 类型的更改值
        attributeList : [{// 类型的属性
          attributeList: [],
          attributeQVal: "",//更改的值
          attributeValId: "attribute_val_id_25",//属性为1的属性值ID
          attribute_code: "xitong",//属性的代号
          attribute_id: "attribute_06",//属性的ID
          attribute_name: "系统",//属性的名称
          attribute_type: "01",//属性的类型
          classify_id : "classify_03",
        }]
      },{ //硬件类型的数据结构
        classify_id : 'classify_02',// 类型的ID
        classify_name : '显示器',// 类型的名称
        classify_code : 'xianshiqi',// 类型的代号
        attributeQVal : '',// 类型的更改值
        attributeList : [{// 类型的属性
          attributeList: [{
            attributeList: null,
            attribute_id: "attribute_08",//属性的ID
            attribute_val: "DVI",//属性为多选的 属性名称
            attribute_val_id: "attribute_val_id_18"//属性为多选的 属性值ID
          },{
            attributeList: null,
            attribute_id: "attribute_08",//属性的ID
            attribute_val: "HDMI",//属性为多选的 属性名称
            attribute_val_id: "attribute_val_id_19"//属性为多选的 属性值ID
          },{
            attributeList: null,
            attribute_id: "attribute_08",//属性的ID
            attribute_val: "DP",//属性为多选的 属性名称
            attribute_val_id: "attribute_val_id_20"//属性为多选的 属性值ID
          }],
          attributeQVal: "",//更改的值
          attributeValId: "attribute_val_id_25",//属性为1的属性值ID
          attribute_code: "jiekouleixing",//属性的代号
          attribute_id: "attribute_08",//属性的ID
          attribute_name: "显示接口类型",//属性的名称
          attribute_type: "02",//属性的类型
          classify_id : "classify_02",
        }]
      }],
      hardwareClassify : "",//属性类别选择值
      hardwareClassifyList : [{ //属性类别列表  （初次开发重复）
        attributeList: null,
        attribute_id: "attribute_01",
        attribute_val: "电视",
        attribute_val_id: "attribute_val_id_01",
      },{
        attributeList: null,
        attribute_id: "attribute_01",
        attribute_val: "触摸一体机",
        attribute_val_id: "attribute_val_id_02"
      }],
      hardwareCodeType : '',//二维码选择类别 用于后太模糊查询需要
      hardwareCodeTypeList : [{//二维码类别
        id : "1",//id
        val : "未绑定"//显示值
      },{
        id : "2",
        val : "已绑定"
      }],
      tableData: [{//属性代号和属性值
        classify: "电视",
        codeId: "11111111111111111",
        codeType: "未绑定",
        date: "2019",
        hardware_id: "5e33fa2e2bb7457bb433eef24b4153bc",
        hardware_name: "序厅电视",
        type: "未采购",
      }],
      tableIndexData : {},//点击时的属性值表
      hardwareValDataList : [{// 属性值表
        attributeList: [{
          attributeList: null,
          attribute_id: "attribute_01",
          attribute_val: "电视",
          attribute_val_id: "attribute_val_id_01",
        },{
          attributeList: null,
          attribute_id: "attribute_01",
          attribute_val: "触摸一体机",
          attribute_val_id: "attribute_val_id_02"
        },{
          attributeList: null,
          attribute_id: "attribute_01",
          attribute_val: "主机",
          attribute_val_id: "attribute_val_id_04"
        }],
        attributeQVal: "",
        attributeValId: null,
        attribute_code: "classify",
        attribute_id: "attribute_01",
        attribute_name: "类别",
        attribute_type: "02",
      },{
        attributeList: [{
        attributeList: null,
        attribute_id: "attribute_02",
        attribute_val: "未采购",
        attribute_val_id: "attribute_val_id_07",
        },{
          attributeList: null,
          attribute_id: "attribute_02",
          attribute_val: "采购中",
          attribute_val_id: "attribute_val_id_08"
        }],
        attributeQVal: "未采购",
        attributeValId: null,
        attribute_code: "type",
        attribute_id: "attribute_02",
        attribute_name: "状态",
        attribute_type: "02",
      }],
      codeAdd: {
        codeNumber : 0,
        codeType : '',
      },//添加自定义属性
      codeAttributeList : [],//属性列表
      codeData : [],//二维码列表
      //判定显示隐藏
      addHardware : false,//硬件绑定 
      loadingVal : false,//正在加载 值
      selectHardware : false,//硬件详情详情
      updatHardware : false,//修改硬件 
      hardwareType : true,//硬件模块
      codeType : false,//二维码模块
      addCode : false,//添加二维码模块
    }
  },
  components: {
  },
  computed: {
  },
  methods: {
    //初始化页面
    getRequest : function (){
      debugger
      //获取路由参数
      if(this.$route.params.num){
        
        let itemsID=this.$route.params.num;
        this.itemsID = itemsID;
        if(itemsID == ":num"){
          return
        }else
        if(itemsID.length != 32){
        }
        this.classify == '电视'
        //获取后台数据
        getHardwaresByItemsId(itemsID).then(response=>{
          debugger
          //将类别分类赋值给成参数
          this.tableData = response.data.hardware;
          this.hardwareValDataList = response.data.attribute;
          this.hAttributeEntry = response.data.attribute;
          
          for (var i = 0; i < response.data.attribute.length; i++) {
            let dataVal = response.data.attribute[i];
            if(dataVal.attribute_code == "classify"){
              this.hardwareClassifyList = dataVal.attributeList;
            }
          }
        })
      }
    },
    //点击查看详情展示不可编辑数据
    handleSelect: function(index, row){
      debugger
      this.selectHardware = true;
      this.tableIndexData = row;
      this.classify_id = row.classify_name;
    },
    //点击编辑数据
    handleEdit: function (index, row) {
      //当前点击的分类
      this.classify_id = row.classify_name;
      debugger;
      //显示弹框
      this.updatHardware= true;
      //重新赋值弹窗的参数
      this.tableIndexData = row;
      //当前点击的分类
      //this.classify = row.classify;
      //将显示的数据赋值给分类列表以方便向后台传智
      for (let i = 0; i < this.hardwareValDataList.length; i++) {
        let classifyList = this.hardwareValDataList[i].attributeList;
        for (let x = 0; x < classifyList.length; x++) {
          let attribute_code = classifyList[x].attribute_code;
          let data= row[attribute_code];
          this.hardwareValDataList[i].attributeList[x].attributeQVal = data;
        }
        
      }
    },
    //点击删除按钮
    handleDelete: function(index, row){
      debugger
      let hardwareId = row.hardware_id;
      this.$confirm('此操作将永久删除该硬件设备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          hardwareDelete(hardwareId).then(response=>{
            debugger
            this.$message({
              message: '数据删除成功了',
              type: 'success'
            });
            this.getRequest();
          }).catch(err=>{
            this.$message({
              type: 'info',
              message: '数据获取失败了'
            })
            this.loadingVal = false;
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
        
        
    },
    //显示添加硬件数据
    setHardware: function(){
      
      this.addHardware = true;
      //清空后台穿值表单
      for (let i = 0; i < this.hardwareValDataList.length; i++) {
        let classifyList = this.hardwareValDataList[i].attributeList;
        for (let x = 0; x < classifyList.length; x++) {
          this.hardwareValDataList[i].attributeList[x].attributeQVal = '';
        }
        
      }
    },
    //修改当前硬件
    hardwareUpdat: function () {
      debugger;
      
      //确定按钮不可点击
      this.loadingVal= true;
      //将数据转为json字符串
      let data=JSON.stringify(this.hardwareValDataList);
      //获取当前硬件的ID
      let hardware_id=this.tableIndexData.hardware_id;
      //获取项目ID
      let itemsId = this.itemsID;
      console.log(this.hardwareValDataList);
      //请求后台参数，进行修改
      hardwareUpdate(data,hardware_id,itemsId,this.classify_id).then(response =>{
        //关闭显示
        this.updatHardware= false;
        //可以点击
        this.loadingVal= false;
        //重新获取数据
        this.getRequest();
      }).catch(err =>{
        //可以点击
        this.loadingVal= false;
        console.log("数据添加失败了");
      })
      
    },
    hardwareDelect: function(){
      debugger
      this.addHardware = false;
      this.addHardwareType =  false;
    },
    //添加硬件产品
    hardwareSet: function () {
      debugger
      if(!this.addHardwareType){
        
        if ( null == this.classify_id || this.classify_id == '') {
          this.$message({
            message: '请选择分类',
            type: 'error'
          });
        }else{
          this.addHardwareType =  true;
        }
        
        return;
      }
      let check = this.dataCheck();
      if(!check){
        return;
      }
      //不可点击
      this.loadingVal = true;
      //转换成json字符串
      let data=JSON.stringify(this.hardwareValDataList);
      //当前项目ID
      let itemsId=this.itemsID;
      let classify_id=this.classify_id;
      this.addHardwareType ==  false;
      
      //向后台发送数据
      hardwareAdd(itemsId,data,classify_id).then(response =>{
        console.log(response.data);
        //可以点击
        this.loadingVal = false;
        //隐藏
        this.addHardware = false;
        //重新获取数据
        this.getRequest();
      }).catch(err =>{
        console.log("数据添加失败了");
        //可以点击
        this.loadingVal = false;
      })
    },
    //显示二维码模块
    codeShow: function () {
      //显示隐藏切换
      this.hardwareType = false;
      this.codeType = true;
      //获取当前分类
      let classify= 'attribute_01';
      //请求获取分类
      getclassify(classify).then(response =>{
        this.codeAttributeList = response.data;
      }).catch(err =>{
        console.log("分类获取失败了");
      });
      //请求获取二维码
      getCode(this.itemsID,classify).then(request =>{
        this.codeData = request.data;
      }).catch(err =>{
        console.log("二维码数据获取失败了");
      });
    },
    //切换为硬件展示
    returnHardware: function () {
      this.hardwareType = true;
      this.codeType = false;
    },
    //添加二维码
    codeAddFunction: function () {
      this.loadingVal = true;
      //添加二维码想后台发送请求
      setCode(this.itemsID,this.codeAdd.codeNumber,this.codeAdd.codeType).then(response =>{
        console.log(response.data);
        this.loadingVal = false;
        this.addCode = false;
        this.codeShow();
      }).catch(err =>{
        console.log("二维码添加失败了");
        this.loadingVal = false;
      })
    },
    //模糊搜索添加二维码
    querySearchAsync: function (queryString, cb) {
      debugger
      //向后台请求数据
      getCodeByName(queryString,this.itemsID,this.classify_id).then(response =>{
        cb(response.data);
      }).catch(err =>{
        console.log("没有获取到二维码数据");
      })
      
    },
    //element模糊搜获方法
    codeSelect: function (item) {
      console.log(item);
    },
    //点击通过ID和名字查询
    getHardwaresByIdAndName : function () {
      //向后台请求数据
      getHardwaresByIdAndName1(this.classify_id,this.hardwareCodeType,this.itemsID,this.hardwareId,this.hardwareName).then(response =>{
        //将类别分类赋值给成参数
        this.tableData = response.data.hardware;
        this.hardwareValDataList = response.data.attribute;
      }).catch(err =>{
        console.log("没有获取到二维码数据");
      })
    },
    //数据校验
    dataCheck: function () {
      
      let classify = this.classify_id;
      for (let i = 0; i < this.hardwareValDataList.length; i++) {
        let classifyList = this.hardwareValDataList[i].attributeList;
        let entryName = this.hardwareValDataList[i].classify_name;
        
        if(classify == entryName || entryName == "通用"){
          for (let x = 0; x < classifyList.length; x++) {
            let qVal = this.hardwareValDataList[i].attributeList[x].attributeQVal;
            let name = this.hardwareValDataList[i].attributeList[x].attribute_name;
            if(null == qVal || '' == qVal){
              
              this.$message({
                type: 'error',
                message: name + '不能为空'
              })
              return false;
            }
          }
        }
      }
      return true;
    },
  },
  //启动执行
  mounted: function (){
    this.getRequest();
  },
  //监听方法
  watch: {
    //监听路由变化
    '$route'(to,from){
      debugger
      this.getRequest();
    },
    hardwareValDataList (newValue, oldValue){
      for (let i = 0; i < newValue.length; i++) {
        if (oldValue[i] != newValue[i]) {
          //console.log(newValue)
        }
      }
    }
  }
}
</script>

<style scoped="scoped">
.titleStytle{
  padding: 1rem;
  margin: 1rem;
}
.codeTitle{
  font-size: 24px;
  font-weight: 600;
}
</style>
