<template>
  <div>
    <form @submit.prevent="submitForm()">
      <h3>Form Tutorial (Two Way Binding)</h3>
      <div>
        <label for="name">Name: </label>
        <input type="text" id="name" v-model.trim.lazy="formValues.name" />
      </div>
      <div>
        <label for="profile">Profile Summary: </label>
        <textarea id="profile" v-model="formValues.profileSummary"></textarea>
      </div>
      <div>
        <label for="country">Country: </label>
        <select id="country" v-model="formValues.country">
          <option value="">Select a Country</option>
          <option value="india">India</option>
          <option value="vietnam">Vietnam</option>
        </select>
      </div>
      <div>
        <label for="job">Job Location: </label>
        <select id="job" v-model="formValues.jobLocation" multiple>
          <option value="india">India</option>
          <option value="vietnam">Vietnam</option>
          <option value="newyork">New York</option>
        </select>
      </div>
      <div>
        <input
          type="checkbox"
          id="remoteWork"
          v-model="formValues.remoteWork"
          true-value="Yes"
          false-value="No"
        />
        <label for="remoteWork">Open to remote work?</label>
      </div>
      <div>
        <label for="skillset">Skillset: </label>
        <input
          type="checkbox"
          id="html"
          value="html"
          v-model="formValues.skillset"
        />
        <label for="html">HTML</label>
        <input
          type="checkbox"
          id="css"
          value="css"
          v-model="formValues.skillset"
        />
        <label for="css">CSS</label>
        <input
          type="checkbox"
          id="javascript"
          value="javascript"
          v-model="formValues.skillset"
        />
        <label for="javascript">JavaScript</label>
      </div>
      <div>
        <label>Years of Experience: </label>
        <input
          type="radio"
          id="0-2"
          value="0-2"
          v-model="formValues.yearsOfExperience"
        />
        <label for="0-2">0-2</label>
        <input
          type="radio"
          id="3-5"
          value="3-5"
          v-model="formValues.yearsOfExperience"
        />
        <label for="3-5">3-5</label>
        <input
          type="radio"
          id="6-10"
          value="6-10"
          v-model="formValues.yearsOfExperience"
        />
        <label for="6-10">6-10</label>
      </div>
      <div>
        <!-- @keyup="submitForm" -->
        <label for="age">Age: </label>
        <input type="number" id="age" v-model.number="formValues.age" />
      </div>
      <div>
        <button>Submit</button>
      </div>
    </form>

    <br />
    <div>{{ formValues }}</div>
  </div>
</template>

<script>
export default {
  name: "formComponent",
  data() {
    return {
      formValues: {
        name: "",
        profileSummary: "",
        country: "",
        jobLocation: [],
        remoteWork: "No",
        skillset: [],
        yearsOfExperience: "",
        age: null,
      },
    };
  },
  methods: {
    submitForm() {
      // event.preventDefault();
      console.log(this.formValues);
    },
  },
};
</script>

<style></style>
