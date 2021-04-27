<template>
  <div class="main">
    <header class="header">
    <div class="heading"><strong>6nmd.us</strong></div>
    <p class="heading__small">A simple url shortener.</p>
    </header>
    <form @submit.prevent="insertUrl" class="form">
      <input class="input" spellcheck="false" v-model="url" @change="reset" placeholder="https://sysnomid.com" required>
      <input type="submit" value="Shorten!" class="submit">
    </form>
    <div v-if=displaySlugData class="popup success link">
      Success!
      <a :href="slug"> https://6nmd.us/{{slug}}/ </a>
    </div>
    <div v-if=err class="popup error">
      {{ errMessage }} 
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'Home',
  data (){
    return {
      url: "",
      slug: "",
      displaySlugData: false,
      err: false,
      errMessage: ""
    }
  },
  methods: {
    // Auto Reset Errors on Submit
    reset: function(){
      this.err = false
    },

    // Create a URL on Submit
    insertUrl: async function() {
          const res = await axios.post(`${process.env.VUE_APP_API_URL}/url-create`, { url: this.url })
          .then(response => {
            (response.data)
            // On Success, Display Slug 
            this.slug = response.data
            console.log(this.slug)
            this.displaySlugData = true
            // Reset Form Fields
            this.url = ""
          })
          .catch(error => {
            // On Error
            this.err = true;
            // Reset Form Fields
            this.url = ""
            // If error is on Server End, send server response body
            if (error.response){
                this.errMessage = error.response.data
            } 
            // If error is on Request End
            else if (error.request){
              if (error.request.response != ""){
                  this.errMessage = JSON.parse(JSON.stringify(error.request.response))
              } else {
                this.errMessage = "An Unexpected Error Occured"
              }
              console.log(error.request)
            }
            
          })
          res.data.data; 
          res.data.headers['Content-Type'];
    }
  }

}
</script>

<style global>
  .main {
    margin-bottom: 10%;
    margin-top: 13rem;
    margin-right: 15%;
    margin-left: 15%;
  }
  .heading {
    display: flex;
    justify-content: center;
    font-size: 5rem;
    color: rgb(34, 211, 34);
  }
  .heading__small {
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
    color: rgb(147, 148, 167);
    margin-left: 0.5em;
  }
  .header {
    padding-bottom: 3em;
  }
  .link {
    font-size: 1.2em;
  }
  .form {
    display: flex;
    flex-direction: column; 
    margin-bottom: 5vh;
  }
  .submit {
    cursor: pointer;
    font-size: 1.25rem; 
    color: #c4c4c4;
    border: none;
    background-color: #5665bc;
    border-radius: 10px;
    width: 100%;
    padding: 1rem;
    margin-left: 0.5rem;
    box-shadow: 3px 5px 0 0 #ffffff;
    transition: box-shadow 0.2s ease-in-out;
  }
  .input {
    padding: 1rem;
    width: 100%;
    margin-bottom: 2rem;
    background: none;
    border: none;
    color: #ffffff;
    border-bottom: 2px solid #ffffff;
    margin-left: 0.5rem;
    text-align: center;
    font-size: 1.25rem;
    transition: border-bottom-color 0.3s ease-in-out;
    caret-color: #56BC58;
  }
  .popup {
    font-size: 1.15em;
    width: 100%;
    padding: 1.5rem;
    border-radius: 10px;
    margin-left: 0.5rem;
    margin-bottom: 3rem;
    word-break: break-all;
  }
  .error {
     background-color: rgb(165, 37, 37);
  }
  .success {
     background-color: rgb(60, 37, 165);
  }
</style>