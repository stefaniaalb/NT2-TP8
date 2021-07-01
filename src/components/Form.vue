<template>
  <span class="src-components-form">
    <div class="jumbotron">
      <h2>1. Formulario</h2>
      <hr>
      <vue-form :state="formState">
        <validate tag="div">
          <label for="nombre" >Nombre</label>
          <input type="text" id="nombre" name="nombre" autocomplete="off" class="form-control" v-model.trim="formData.nombre" :minlength="nombreMinLength" :maxlength="nombreMaxLength" required no-espacios>
          <field-messages name="nombre" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
            <div slot="no-espacios" class="alert alert-danger mt-1">No se permiten espacios en el campo</div>
            <div slot="minlength" class="alert alert-danger mt-1">Este campo requiere al menos {{ nombreMinLength }} caracteres</div>
            <div v-if="formData.nombre.length == nombreMaxLength" class="alert alert-danger mt-1">Este campo debe tener como máximo {{ nombreMaxLength }} caracteres</div>
          </field-messages>
        </validate>

        <validate tag="div">
          <label for="edad">Edad</label>
          <input type="number" id="edad" name="edad" autocomplete="off" class="form-control" v-model.number="formData.edad" required :min="edadMin" :max="edadMax">
          <field-messages name="edad" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
            <div slot="min" class="alert alert-danger mt-1">La edad mínima es de {{edadMin}} años</div>
            <div slot="max" class="alert alert-danger mt-1">La edad máxima es de {{edadMax}} años</div>
          </field-messages>
        </validate>

        <validate tag="div">
          <label for="email" >Email</label>
          <input type="email" id="email" name="email" autocomplete="off" class="form-control" v-model.trim="formData.email" minlength="3" required>
          <field-messages name="email" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
            <div slot="email" class="alert alert-danger mt-1">Email invalido</div>
          </field-messages>
        </validate>
          <button class="btn btn-success m-3" type="submit" :disabled="formState.$invalid" @click="postUserAsyncAwait()">Enviar - Async Await</button>
          <button class="btn btn-success m-3" type="submit" :disabled="formState.$invalid" @click="postUserThenCatch()">Enviar - Then Catch</button>
        
      </vue-form>
    </div>
  </span>
</template>

<script>

  export default  {
    name: 'src-components-form',
    props: [],
    mounted () {

    },
    data () {
      return {
        formData : this.getInitialData(),
        formState : {},
        nombreMaxLength : 15,
        nombreMinLength : 5,
        edadMin : 18,
        edadMax : 120,
        users : [],
        url : 'https://609dbeea33eed800179570ad.mockapi.io/users',
        user: this.$store.state.usuario
      }
    },
    methods: {

      getInitialData() {
        return {
          nombre: '',
          edad: '',
          email: ''
        }
      },

      async postUserAsyncAwait() {

        this.$store.state.usuario.name =  this.formData.nombre
        this.$store.state.usuario.edad = this.formData.edad
        this.$store.state.usuario.email = this.formData.email

        try {
          let respuesta = await this.axios.post(this.url, this.$store.state.usuario, {'content-type' : 'application/json'})
          console.log(respuesta)
          this.users.push(user)
          this.formData = this.getInitialData();
          this.formState._reset();
        }
        catch(error) {
          console.error(error)
        }
      },

      postUserThenCatch() {
        let user = {
          nombre : this.formData.name,
          edad : this.formData.edad,
          email : this.formData.email
        }
        this.axios.post(this.url, user, {'content-type' : 'application/json'})
        .then(respuesta => {
          this.users.push(user)
          console.log(respuesta)
        })
        .catch(error => console.error(error))
      }

    },
    computed: {

    }
}
</script>

<style scoped lang="css">
  .src-components-form {

  }

  input {
    margin: 7px;
  }
</style>
