<template>
  <SiteHeader />
  <NavigationHead :activeSection="currentSection" @section-change="toggleSection" />
  <div class="body">
    <NavigationSide />
    <HomePanel v-if="currentSection === 'home'" />
    <CommunityPanel v-if="currentSection === 'community'" />
    <FAQsPanel v-if="currentSection === 'faqs'" />
    <RightHandSide v-if="currentSection === 'home'" :currentSection="currentSection" />
  </div>
</template>


<script>
import SiteHeader from './components/SiteHeader.vue';
import NavigationHead from './components/NavigationHead.vue';
import NavigationSide from './components/NavigationSide.vue';
import HomePanel from './components/HomePanel.vue';
import CommunityPanel from './components/CommunityPanel.vue'; 
import FAQsPanel from './components/FAQsPanel.vue';
import RightHandSide from './components/RightHandSide.vue';

export default {
  components: {
    SiteHeader,
    NavigationHead,
    NavigationSide,
    HomePanel,
    CommunityPanel,
    FAQsPanel,
    RightHandSide,
  },
  data() {
    return {
      currentSection: 'home',
      bankImage: require('@/assets/BOA.png'),
    };
  },
  methods: {
    toggleSection(section) {
      this.currentSection = section;
    },
  },
};
</script>
