<template>

        <div class="left-sidebar">
          <ul class= "sidebar">
            <li><a  href="#" class="overview">Overview</a></li>
            <li><a  href="#" class="budget">Budget</a></li>
            <li><a  href="#" class="transactions">Transactions</a></li>
            <li><a  href="#" class="trends">Trends</a></li>
            <li><a  href="#" class="savings">Savings Goals</a></li>
            <li><a  href="#" class="alerts">Alerts</a></li>
          </ul>
        </div>
</template>
<script>
export default {
  name: 'NavigationSide',
 
};
</script>

<style scoped>
.left-sidebar{
  max-height: 100%;
  overflow: hidden;
  position: fixed;
}

.sidebar {
  all: unset;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  height: 200rem;
  box-sizing: border-box;
  text-align: left;
  width: min-content;
  padding: 100px 30px 0 30px;
  gap: 25px;
  border-right: 1px solid #dbdbdb;
  white-space: nowrap;
}

.overview {
  color: unset;
}

a{
cursor: pointer;
  font-size: 14px;
  color: #000;
  text-decoration: none;
  font-size: 20px;
  position: relative;
  font-weight: 400;
  color: #707070;
}

.sidebar a.overview:before {
  content: "";
  width: 3px;
  height: 100%;
  left: -15px;
  background-color: #2b2b2b;
  position: absolute;
}
</style>