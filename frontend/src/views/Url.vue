<template>
  <div>
    <p>Loading...
    </p>
  </div>
</template>
<script>
import axios from "axios"
//E
export default {
  data (){
    return {
      id: this.$route.params.id
    }
  },
  async mounted(){
    const data = await axios.get(process.env.VUE_APP_API_URL + "/" + this.id)
        .then(response => {
          (response.data)
          window.location.replace(response.data)
        })
        .catch(error => {
            console.log(error)
            this.$router.push('/pages/err')
        });
      console.log(data)
  }
}
</script>