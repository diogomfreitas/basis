<template>
    <div class="list row">
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Buscar por nome ou matrícula..."
            v-model="name"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click="searchServant"
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
      <h4>Lista de Servidores</h4>

      <table class="table table-striped">
          <thead>
              <tr>
                  <th>Nome</th>
                  <th>Matrícula</th>
                  <th>Departamento</th>
                  <th>Categoria</th>
                  <th></th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="servant in servants" :key="servant.id">
                  <td>{{servant.name}}</td>
                  <td>{{servant.registration}}</td>
                  <td>{{servant.department}}</td>
                  <td>{{servant.category.title}}</td>
                  <td><router-link :to="'/servants/' + servant.id" class="badge badge-warning">Edit</router-link></td>
                  <td><button class="badge badge-danger" @click="deleteServant">Delete</button></td>
              </tr>
          </tbody>
      </table>

    </div>
  </template>
  
  <script>
  import ServantDataService from "../services/ServantDataService";
  
  export default {
    name: "servants-list",
    data() {
      return {
        servants: [],
        currentServant: null,
        currentIndex: -1,
        name: ""
      };
    },
    methods: {
      retrieveServants() {
        ServantDataService.getAll()
          .then(response => {
            this.servants = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      refreshList() {
        this.retrieveServants();
        this.currentServant = null;
        this.currentIndex = -1;
      },
  
      setActiveServant(servant, index) {
        this.currentServant = servant;
        this.currentIndex = servant ? index : -1;
      },
      
      searchServant() {
        if(this.name.replace(/\s/g, '') !== '') { 
          ServantDataService.findByName(this.name)
            .then(response => {
              this.servants = response.data;
              this.setActiveServant(null);
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
        } else {
          ServantDataService.getAll()
          .then(response => {
              this.servants = response.data;
              this.setActiveServant(null);
            })
            .catch(e => {
              console.log(e);
            });
        }
      },
  
      deleteServant() {
        ServantDataService.delete(this.currentServant.id)
          .then(response => {
            this.servants.splice(this.servants.indexOf(this.currentServant), 1);
            this.setActiveServant(null);
            console.log(response.data);
            this.$router.push({ name: "servants" });
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    mounted() {
      this.retrieveServants();
    }
  };
  </script>
  
  <style>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }
  </style>