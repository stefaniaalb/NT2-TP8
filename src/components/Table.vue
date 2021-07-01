<template lang="html">

  <section class="src-components-table">
    <div class="jumbotron">
      <h2>2. Axios</h2>
      <hr>
      <div class="text-center">
        <button class="btn btn-outline-warning m-3 mb-4" @click="getUsersAxiosThenCatch()">Pedir AXIOS - Then Catch</button> 
        <button class="btn btn-outline-warning m-3 mb-4" @click="getUsersAsyncAwait()">Pedir AXIOS - Async Await</button> 
      </div>
      <div class="text-center">
        <button class="btn btn-outline-secondary m-2 mb-4" @click="resetUsers()">Resetear</button>
      </div>
      <div v-if="users.length" class="table-responsive">
        <div class="alert alert-secondary">Se encontraron {{ users.length }} usuarios</div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th v-for="(col,index) in getCols" :key="index">{{ col }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="index">
              <td v-for="(col,index) in getCols" :key="index">{{user[col]}}</td>
            </tr>
          </tbody>
        </table>

        
      </div>
      <div v-else class="alert alert-danger">No se encontraron Usuarios</div>
    </div>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'src-components-table',
    props: [],
    mounted () {

    },
    data () {
      return {
        url : 'https://609dbeea33eed800179570ad.mockapi.io/users', 
        users : []

      }
    },
    methods: {
      getUsersAxiosThenCatch() {
          this.axios(this.url)
          .then( respuesta => {
            this.users = respuesta.data
          })
          .catch(error => console.error(error))
      },

      async getUsersAsyncAwait() {
        try{
          let respuesta = await this.axios(this.url)
          this.users = respuesta.data
        }
        catch(error) {
          console.error(error)
        }
      },

      resetUsers() {
        this.users = []
      }

    },
    computed: {
      getCols() {
        return Object.keys(this.users[0])
      }

    }
}


</script>

<style scoped lang="css">
  .src-components-table {

  }
</style>
