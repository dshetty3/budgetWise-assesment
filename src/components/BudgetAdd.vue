<template>
    <div>
      <div class="overlay" @click="closePopup"></div>
      <div id="popup1" class="popup-new">
        <div v-if="message" class="alert">
          {{ message }}
        </div>
  
        <form class="popup-form" @submit.prevent="budgetAdd">
          <label for="category">Category</label>
          <select v-model="budgetForm.label" class="category1" id="category">
            <option value="" disabled>Select a Category</option>
            <option v-for="(category, name) in categories" :key="name" :value="name">
                {{ name }}
            </option>
            </select>
  
          <label for="amount">Amount</label>
          <div class="amount-input">
            <input class="category1" v-model.number="budgetForm.spent" placeholder="Spent">
            <input class="category1" v-model.number="budgetForm.total" placeholder="Total"><br>
          </div>
  
          <button type="submit" class="save-button">Add</button>
          <button type="button" @click="closePopup">Close</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BudgetAdd',
    props: {
      categories: Object,
    },
    data() {
      return {
        budgetForm: {
          label: "",
          spent: null,
          total: null,
        },
        message: "",
      };
    },
    methods: {
      budgetAdd() {
        if (!this.budgetForm.label || !this.budgetForm.spent || !this.budgetForm.total) {
          this.message = "Please fill in all the necessary fields.";
          return;
        }
  
        this.$emit('add-budget', { ...this.budgetForm });
        
        this.message = `${this.budgetForm.label} category added successfully.`;
        this.budgetForm.label = "";
        this.budgetForm.spent = 0;
        this.budgetForm.total = 0;
        this.closePopup();
      },
      closePopup() {
        this.$emit('close-popup');
      },
    },
  };
  </script>
  
  <style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); 
  z-index: 999;
}
.popup {
  margin: 70px auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 30%;
  position: relative;
  transition: all 0.5s ease-in-out;
  top: 100px;
}

.popup h2 {
  margin: 10px;
  margin-top: 0;
  color: #333;
  font-family: Tahoma, Arial, sans-serif;
  font-size: 16px;
}

.popup .close {
  position: absolute;
  top: 20px;
  right: 30px;
  transition: all 200ms;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}
.popup .close:hover {
  color: #06D85F;
}

#category{
  display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 5rem;
    flex-basis: auto;
    
}

form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border-radius: 4px;

}

.amount-input {
  display: flex;
  justify-content: space-between;
  gap: 5px;
}

.amount-input input {
  width: 48%;
}


.popup-new {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000; 
  width: 30%;
  border-radius: 20px;
}

.overlay::target{
  visibility: visible;
  opacity: 1;
 
}


.popup-form {
  max-width: 400px; 
  margin: 0 auto;
}

input.category1 {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}


select.category1 {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}


button {
  padding: 10px 20px;
  margin: 10px 5px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

button.save-button {
  background-color: #6970c9;
  color: white;
}

button:hover {
  opacity: 0.8;
}
  </style>
  