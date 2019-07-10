<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      mode="vertical"
    >
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  methods: {
    routerData() {//调用子组件方法
      debugger
      debugger
      var routerData=this.$router.options.routes;
      for(let i=0;i<routerData.length;i++){
        var routesList=routerData[i];
        if(routesList.name === "Section"){
          let childrenData=routesList.children;
          for (let x = 0; x < childrenData.length; x++) {
            let childrenVal=childrenData[x].children;
            for(let y=0;y<childrenVal.length;y++){
              debugger
              let itemPath=childrenVal[y].path;
              if(itemPath == "itemsList/:item"){
                itemPath = itemPath.substr(0,itemPath.length-5);
                itemPath = itemPath + childrenVal[y].name;
                console.log(itemPath);
                childrenVal[y].path=itemPath;
              }
              debugger
            }
            childrenData[x].children=childrenVal;
          }
          routesList.children=childrenData;
        }
        routerData[i]=routesList;
      }
      this.$router.options.routes = routerData;
      return routerData;
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      
      return this.routerData()
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
