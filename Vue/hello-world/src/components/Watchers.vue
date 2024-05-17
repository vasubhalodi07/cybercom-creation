<template>
  <div>
    <h2>Watcher Example</h2>
    <div>Volume Tracker (0 - 20)</div>
    <div>Current Volume - {{ volume }}</div>
    <div>
      <button @click="volume += 2">Increase</button>
      <button @click="volume -= 2">Decrement</button>
    </div>

    <br />
    <h3>Watch Movie Input</h3>
    <input type="text" v-model="movie" />

    <br />
    <h3>Watch Deep MovieInfo Input</h3>
    <input
      type="text"
      v-model="movieInfo.title"
      placeholder="MovieInfo Title"
    />
    <input
      type="text"
      v-model="movieInfo.actor"
      placeholder="MovieInfo Actor"
    />

    <br />
    <div>
      <ul>
        <li v-for="movie in movieList" :key="movie">{{ movie }}</li>
      </ul>
      <button v-on:click="movieList.push('Wonder Women')">Add Movie</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "WatcherComponent",
  data() {
    return {
      volume: 0,
      movie: "Batman",
      movieInfo: {
        title: "",
        actor: "",
      },
      movieList: ["Batman", "Superman"],
    };
  },
  methods: {},
  computed: {},
  watch: {
    volume(newValue) {
      console.log(`Volume changed from ${this.volume} to ${newValue}`);
      if (newValue === 16) {
        console.log(`volume is to high in log term it damange the ears`);
      }
    },
    movie: {
      handler(newValue) {
        console.log(`Calling API with movie name = ${newValue}`);
      },
      // call handler in inital phase when render the component
      immediate: true,
    },
    movieInfo: {
      handler(newValue) {
        console.log(`Calling API = ${newValue.title} ${newValue.actor}`);
      },
      // for watch deep data like object {}
      deep: true,
    },
    movieList: {
      handler(newValue) {
        console.log(`movieList changed from ${this.movieList} to ${newValue}`);
      },
      deep: true,
    },
  },
};
</script>

<style></style>
