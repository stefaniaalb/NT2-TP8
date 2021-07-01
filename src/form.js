import Vue from 'vue'
import VueForm from 'vue-form'

Vue.use(VueForm, options)

const options = {
    validators : {
        'no-spaces' : function(value) {
            return !value.includes(' ')
        }
    }
}