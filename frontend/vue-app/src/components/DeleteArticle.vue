<template>
  <button class="deleteButton" @click="deleteArticle" type="button">
    Supprimer
  </button>
</template>


<script>
import axios from "axios";
export default {
  name: "deleteButton",
  data: function () {
    return {};
  },

  methods: {
    deleteArticle() {
      const user = JSON.parse(localStorage.getItem("user"));
      const urlId = this.$route.params.id;
      axios({
        method: "DELETE",
        url: "http://localhost:3000/api/articles/" + urlId,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      })
        .then(() => {
          this.$router.push("/home");
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>