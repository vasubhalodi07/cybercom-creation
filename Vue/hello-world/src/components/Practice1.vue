<template>
  <div>
    <div>{{ msg }}</div>
    <div v-text="vtext"></div>
    <div>{{ vhtml }}</div>
    <div v-html="vhtml"></div>

    <br />

    <div v-bind:id="headingId">Heading</div>
    <button v-bind:disabled="isDisabled">Submit</button>

    <br />
    <h2 v-bind:class="underlineClass">Underline Tag</h2>
    <div v-bind:class="isVisible ? 'visible' : 'invisible'">Visible Check</div>

    <br />
    <div
      v-bind:style="{
        color: 'red',
        fontSize: '20px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
      }"
    >
      Style Binding With Object (inline)
    </div>
    <div v-bind:style="styleObject">Style Binding with Object (script)</div>
    <div v-bind:style="[styleObject, styleObject1]">
      Style Binding with Array & Object (script)
    </div>

    <br />
    <h2>Conditional Rendering</h2>
    <div v-if="num > 0">Show Number: {{ num }}</div>
    <div v-else-if="num < 0">Number is not a negative</div>
    <div v-else>The Number is not zero</div>

    <!-- div change to template and benefits it it hidden tag so not create a DOM element -->
    <template v-if="display">
      <p>No 1</p>
      <p>No 2</p>
      <p>No 3</p>
    </template>

    <div v-show="showElement">Using v-show directive</div>

    <br />
    <h2>List Rendering</h2>
    <div>Listing Arrays</div>
    <div v-for="(name, index) in names" v-bind:key="index">
      <li>{{ index + 1 }}. {{ name }}</li>
    </div>

    <br />

    <div>Listing Array of Objects</div>
    <div v-for="(name, index) in fullNames" v-bind:key="index">
      <li>{{ index + 1 }}. {{ name.first }} {{ name.last }}</li>
    </div>

    <br />

    <div>Listing Actor with their movies name (Array & Object)</div>
    <div v-for="(value, index) in actors" v-bind:key="index">
      <div>{{ value.name }}</div>
      <div v-for="v in value.movies" v-bind:key="v">
        <li>{{ v }}</li>
      </div>
    </div>

    <br />

    <div>Lising Object Key and Value</div>
    <div v-for="(value, key, index) in myInfo" v-bind:key="value">
      <div>{{ index + 1 }}. {{ key }}: {{ value }}</div>
    </div>

    <br />

    <div>Listing Names with Condition</div>
    <template v-for="name in names" :key="name">
      <div v-if="name == 'Brunce'">{{ name }}</div>
    </template>

    <br />
    <h2>Methods</h2>
    <div>Addition</div>
    <div>With string interpolation: {{ 2 + 3 + 2 }}</div>
    <div>with methods: {{ add(2, 1, 2) }}</div>
    <div>Multiplyer: {{ multiply(20) }}</div>

    <br />
    <h2>Event Handling</h2>
    <div>{{ name }}</div>
    <div>
      <button v-on:click="name = 'Change by inline click event '">
        Without Method
      </button>
      <button @click="changeName('Changed Name')">Change name</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PracticeComponent",

  // data properties
  data() {
    return {
      msg: "Welcome to Vue JS Application",
      vtext: "Demo Data",
      vhtml: "<h3>H3 Data</h3>",

      headingId: "heading",
      isDisabled: true,

      underlineClass: "underline",
      isVisible: true,

      // create a style binding object
      styleObject: {
        color: "green",
      },
      styleObject1: {
        textDecoration: "underline",
      },

      // conditional rendering
      num: 10,
      display: false,
      showElement: true,

      // list rendering
      names: ["Brunce", "Clark", "Diana"],
      fullNames: [
        { first: "Bruce", last: "Wayne" },
        { first: "Clark", last: "Kent" },
        { first: "Diana", last: "Prince" },
      ],
      actors: [
        { name: "Bruce Wane", movies: ["Batman", "The Presetige"] },
        { name: "Diana Wane", movies: ["The Presetige", "The Preset"] },
      ],
      myInfo: {
        name: "Vasu Bhalodi",
        age: 21,
        role: "Vue JS Developer",
      },

      // method example properties
      baseMultiplier: 5,

      // event handling
      name: "Vasu Bhalodi",
    };
  },

  // methods
  methods: {
    add(a, b, c) {
      return a + b + c;
    },
    multiply(num) {
      return num * this.baseMultiplier;
    },
    // event handler
    changeName(name) {
      this.name = name;
      return this.name;
    },
  },
};
</script>

<style>
.underline {
  text-decoration: underline;
}
.visible {
  text-decoration: underline;
  background-color: blue;
}
.invisible {
  background-color: red;
  border: 1px solid red;
}
</style>
