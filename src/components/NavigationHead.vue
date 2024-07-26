<template>
  <div class="navbar">
    <div class="budgetwise-logo">
      <img :src="logoImage" style="width:30px; height:40px;" alt="logo-img">
      <span>BudgetWise</span>
    </div>
    <ul class="nav">
      <a href="#" :class="{ active: activeSection === 'home' }" @click.prevent="toggleSection('home')">Home</a>
      <a href="#" :class="{ active: activeSection === 'community' }" @click.prevent="toggleSection('community')">Community</a>
      <a href="#" :class="{ active: activeSection === 'faqs' }" @click.prevent="toggleSection('faqs')">FAQs</a>
    </ul>
    <button class="account">
      <img :src="userImage" style="width:30px; height:30px;" alt="user-img">
      <span class="user-name">John Doe</span>
      <i class="fa-solid fa-angle-down"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'NavigationHead',
  props: ['activeSection'], 
  data() {
    return {
      logoImage: require('@/assets/Logo1.png'),
      userImage: require('@/assets/John Doe.jpeg')
    };
  },
  methods: {
    toggleSection(section) {
      this.$emit('section-change', section); 
    },
  },
};
</script>

<style scoped>

.navbar{
      display: flex;
      flex: 0 0 auto;
      align-items: center;
      position: fixed;
      min-width:300px;
      left: 0px;
      height: 48px;
      transition: inherit;
      width: calc(100% + 0px);
      padding: 0 32px;
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,.4);
      z-index: 1004;
    }

    .budgetwise-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20.5px;
    gap: 10px;
    color: #5157bf;
    }

  .logo{
  width: 50px;
  height: 50px;
  -o-object-fit: contain;
  object-fit: contain;
  }

  .nav {
    display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3rem;
  }

 .nav a.active{
  color: #5157bf;
  border-bottom: 2px solid #5157bf;
  padding: 0;
}

.nav a{
  all: unset;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  cursor: pointer;
  font-size: 14px;
  color: #707070;
  letter-spacing: .5px;
  transition: all .3s ease-in-out;
  font-family: Outfit;
  font-style: normal;
  font-size: 20px;
  line-height: 145%;
  text-align: center;
  letter-spacing: -1px;
}

.account {
  all: unset;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 45%;
}

.account img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 2px solid #fff;
  filter: drop-shadow(0 4px 4px rgba(0,0,0,.25));
}

.user-name {
  letter-spacing: .2px;
  transition: all .3s ease-in-out;
  cursor: pointer;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 130%;
  display: flex;
  align-items: flex-end;
  color: #000;
}

</style>
