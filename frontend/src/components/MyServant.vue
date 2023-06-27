<template>
    <div v-if="currentServant" class="edit-form">
      <h4>Servant</h4>
      <form>
        <div class="form-group">
          <label for="name">Nome</label>
          <input type="text" class="form-control" id="name"
            v-model="currentServant.name"
          />
        </div>
        <div class="form-group">
          <label for="registration">Matrícula</label>
          <input type="text" class="form-control" id="registration"
            v-model="currentServant.registration"
            v-on:keypress="numbersOnly"
          />
        </div>
        <div class="form-group">
          <label for="department">Departamento</label>
          <input type="text" class="form-control" id="department"
            v-model="currentServant.department"
          />
        </div>
        <div class="form-group">
          <label for="category">Categoria</label>
          <select v-model="currentServant.category" class="form-control" id="category">
            <option disabled value="">Please select one</option>
            <option v-for="item in categories" :key="item.id" :value="item">{{item.title}}</option>
        </select>
        </div>
      </form>
  
      <button class="badge badge-danger mr-2"
        @click="deleteServant"
      >
        Delete
      </button>
  
      <button type="submit" class="badge badge-success"
        @click="updateServant"
      >
        Update
      </button>
      <p>{{ message }}</p>
    </div>
  
    <div v-else>
      <br />
      <p>Please click on a Servant...</p>
    </div>
  </template>
  
  <script>
  import ServantDataService from "../services/ServantDataService";
  import CategoryDataService from "../services/CategoryDataService";
  
  export default {
    name: "my-servant",
    data() {
      return {
        currentServant: null,
        categories: null,
        message: ''
      };
    },
    methods: {
      getServant(id) {
        ServantDataService.get(id)
          .then(response => {
            this.currentServant = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },

      getCategories() {
        CategoryDataService.getAll()
          .then(response => {
            this.categories = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      updateServant() {
        ServantDataService.update(this.currentServant.id, this.currentServant)
          .then(response => {
            console.log(response.data);
            this.message = 'The servant was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      deleteServant() {
        ServantDataService.delete(this.currentServant.id)
          .then(response => {
            console.log(response.data);
            this.$router.push({ name: "servants" });
          })
          .catch(e => {
            console.log(e);
          });
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
      this.message = '';
      this.getServant(this.$route.params.id);
      this.getCategories();
    }
  };
  </script>
  
  <style>
  .edit-form {
    max-width: 300px;
    margin: auto;
  }
  </style>