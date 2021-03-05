<template>
  <div class="home">
    <h1 class="green name">6nmd.us</h1>
    <p>Sysnomid Url Shortener</p>
    <form @submit.prevent="insertUrl">
      <input @change="clean" v-model="url" placeholder="https://sysnomid.com">
      <input type="submit" label="Shorten!">
    </form>
    <div v-if=displaySlug class="background">
      Success!
      <a :href="slug"> https://6nmd.us/{{slug}}/ </a>
    </div>
    <div v-if=err class="background-red">
      Enter a valid URL
    </div>
    <p> Created by Sysnomid, <a href="https://sysnomid.com"> https://sysnomid.com </a></p>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'Home',
  data (){
    return {
      url: "https://",
      slug: "",
      displaySlug: false,
      err: false
    }
  },
  methods: {
    clean: function(){
      this.displaySlug = false
      this.err = false
    },
    insertUrl: async function() {
          const res = await axios.post(process.env.VUE_APP_API_URL_REGISTER, { url: this.url })
          .then(response => {
            (response.data)
            this.slug = response.data
            console.log(this.slug)
            this.displaySlug = true
          })
          .catch(error => {
            this.err = true;
            console.log(error)
          })
          res.data.data; 
          res.data.headers['Content-Type'];
    }
  }

}
</script>

<style global>
.background {
  background-color: #020b59;
  margin: 5%;
  padding: 5%;
  border-radius: 10px;
}
.background-red {
  background-color: #590202;
  margin: 5%;
  padding: 5%;
  border-radius: 10px;
}
input {
    padding: 1em;
    margin: 1em;
    font-size: 15px;
    background-color: rgb(218, 218, 218);
    border-radius: 10px;
    border: none;
}
button {
    padding: 1em;
    margin: 1em;
    font-size: 13px;
    background-color: rgb(172, 81, 81);
    border-radius: 5px;
    border: none;
    cursor: pointer;
}
.name {
  font-size: 3em;
}
.green {
  color: #00ff37;
}
</style>