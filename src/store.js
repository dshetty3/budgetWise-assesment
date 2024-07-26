
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentSection: 'home',
  },
  mutations: {
    setCurrentSection(state, section) {
      state.currentSection = section;
    },
  },
  actions: {
    updateCurrentSection({ commit }, section) {
      commit('setCurrentSection', section);
    },
  },
  getters: {
    currentSection: (state) => state.currentSection,
  },
});
