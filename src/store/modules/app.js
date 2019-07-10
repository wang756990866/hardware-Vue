import Cookies from 'vue-cookies'

const app = {
  state: {
    sidebar: {
      opened: Cookies.get('sidebarStatus'),
      /* opened: !+function(){
        let cookiesVal=this.$cookies.get('sidebarStatus');
        return cookiesVal;
      }, */
      withoutAnimation: false
    },
    device: 'desktop'
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      debugger
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      debugger
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      debugger
      state.device = device
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      debugger
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      debugger
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({ commit }, device) {
      debugger
      commit('TOGGLE_DEVICE', device)
    }
  }
}
export default app
