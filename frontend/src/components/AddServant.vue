<template>
    <div class="submit-form">
      <div v-if="!submitted">
        <div class="form-group">
          <label for="name">Nome</label>
          <input
            type="text"
            class="form-control"
            id="name"
            required
            v-model="servant.name"
            name="name"
          />
        </div>
  
        <div class="form-group">
          <label for="registration">Matrícula</label>
          <input
            class="form-control"
            id="registration"
            required
            v-model="servant.registration"
            v-on:keypress="numbersOnly"
            name="registration"
          />
        </div>
  
        <div class="form-group">
            <label for="department">Departamento</label>
            <input
            class="form-control"
            id="department"
            required
            v-model="servant.department"
            name="department"
            />
        </div>

        <div class="form-group">
          <label for="category">Categoria</label>
          <select v-model="servant.category" class="form-control" id="category">
            <option disabled value="">Please select one</option>
            <option v-for="item in categories" :key="item.id" :value="item">{{item.title}}</option>
        </select>
        </div>
  
        <button @click="saveServant" class="btn btn-success">Submit</button>
      </div>
  
      <div v-else>
        <h4>You submitted successfully!</h4>
        <button class="btn btn-success" @click="newServant">Add</button>
      </div>
    </div>
  </template>
  
  <script>
  import ServantDataService from "../services/ServantDataService";
  import CategoryDataService from "../services/CategoryDataService";
  
  export default {
    name: "add-servant",
    data() {
      return {
        servant: {
          id: null,
          name: "",
          registration: "",
          department: "",
          category: null
        },
        submitted: false,
        categories: null
      };
    },
    methods: {
      saveServant() {
        var data = {
          name: this.servant.name,
          registration: this.servant.registration,
          department: this.servant.department,
          category: this.servant.category
        };
  
        ServantDataService.create(data)
          .then(response => {
            this.servant.id = response.data.id;
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
      },

      getCategories() {
        CategoryDataService.getAll()
          .then(response => {
            this.categories = response.data;
          })
          .catch(e => {
            console.log(e);
          });
      },
      
      newServant() {
        this.submitted = false;
        this.servant = {};
      },

      numbersOnly(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
          evt.preventDefault();
        } else {
          return true;
        }
      }
    },
    mounted() {
      this.getCategories();
    }
  };
  </script>
  
  <style>
  .submit-form {
    max-width: 300px;
    margin: auto;
  }
  </style>