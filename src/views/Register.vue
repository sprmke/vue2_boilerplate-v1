<template>
  <div id="signup">
    <div class="signup-form">
      <form @submit.prevent="onSubmit">
        <div class="input" :class="{'invalid': $v.email.$error}">
          <label for="email">Email</label>
          <input
                  type="email"
                  id="email"
                  v-model="email"
                  @input="$v.email.$touch()">
          <span v-if="!$v.email.email" class="error-message">Please enter a valid email address</span>
          <span v-if="!$v.email.required && $v.email.$dirty" class="error-message">This field is required</span>
        </div>
        <div class="input" :class="{'invalid': $v.age.$error}">
          <label for="age">Your Age</label>
          <input
                  type="number"
                  id="age"
                  v-model.number="age"
                  @input="$v.age.$touch()">
          <span v-if="!$v.age.minValue" class="error-message">You have to be atleast {{ $v.age.$params.minValue.min }} years old</span>
          <span v-if="!$v.age.required && $v.age.$dirty" class="error-message">This field is required</span>
        </div>
        <div class="input" :class="{'invalid': $v.password.$error}">
          <label for="password">Password</label>
          <input
                  type="password"
                  id="password"
                  v-model="password"
                  @input="$v.password.$touch()">
          <span v-if="!$v.password.minLength" class="error-message">You have to be atleast {{ $v.password.$params.minLength.min }} years old</span>
          <span v-if="!$v.password.required && $v.password.$dirty" class="error-message">This field is required</span>
        </div>
        <div class="input" :class="{'invalid': $v.confirmPassword.$error}">
          <label for="confirm-password">Confirm Password</label>
          <input
                  type="password"
                  id="confirm-password"
                  v-model="confirmPassword"
                  @input="$v.confirmPassword.$touch()">
          <span v-if="$v.confirmPassword.required && !$v.confirmPassword.sameAs && $v.confirmPassword.$dirty" class="error-message">Password and confirm password do not match</span>
          <span v-if="!$v.confirmPassword.required  && !$v.confirmPassword.sameAs && $v.confirmPassword.$dirty" class="error-message">This field is required</span>
          <div>{{ $v.confirmPassword }}</div>
        </div>
        <div class="input">
          <label for="country">Country</label>
          <select id="country" v-model="country">
            <option value="usa">USA</option>
            <option value="india">India</option>
            <option value="uk">UK</option>
            <option value="germany">Germany</option>
          </select>
        </div>
        <div class="hobbies">
          <h3>Add some Hobbies</h3>
          <button @click="onAddHobby" type="button">Add Hobby</button>
          <div class="hobby-list">
            <div
                    class="input"
                    v-for="(hobbyInput, index) in hobbyInputs"
                    :key="hobbyInput.id">
              <label :for="hobbyInput.id">Hobby #{{ index }}</label>
              <input
                      type="text"
                      :id="hobbyInput.id"
                      v-model="hobbyInput.value">
              <button @click="onDeleteHobby(hobbyInput.id)" type="button">X</button>
            </div>
          </div>
        </div>
        <div class="input inline">
          <input type="checkbox" id="terms" v-model="terms">
          <label for="terms">Accept Terms of Use</label>
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { required, email, numeric, minValue, minLength, sameAs } from 'vuelidate/lib/validators';

  export default {
    name: "signup",
    data () {
      return {
        email: '',
        age: null,
        password: '',
        confirmPassword: '',
        country: 'usa',
        hobbyInputs: [],
        terms: false
      }
    },
    validations: {
      email: {
        required,
        email
      },
      age: {
        required,
        numeric,
        minValue: minValue(18)
      },
      password: {
        required,
        minLength: minLength(6)
      },
      confirmPassword: {
        required,
        // sameAs: sameAs('password')
        sameAs: sameAs(vm => {
          return vm.password
        })
      }
    },
    methods: {
      onAddHobby () {
        const newHobby = {
          id: Math.random() * Math.random() * 1000,
          value: ''
        }
        this.hobbyInputs.push(newHobby)
      },
      onDeleteHobby (id) {
        this.hobbyInputs = this.hobbyInputs.filter(hobby => hobby.id !== id)
      },
      onSubmit () {
        const formData = {
          email: this.email,
          age: this.age,
          password: this.password,
          confirmPassword: this.confirmPassword,
          country: this.country,
          hobbies: this.hobbyInputs.map(hobby => hobby.value),
          terms: this.terms
        }
        console.log(formData)
        this.$store.dispatch('register', formData)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .signup-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  .input {
    margin: 10px auto;

    &.invalid {
      input,
      input:focus {
        border: 1px solid red;
      }
      .error-message {
        color: red;
      }
    }
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input.inline label {
    display: inline;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #41b883;
    background-color: #eee;
  }

  .input select {
    border: 1px solid #ccc;
    font: inherit;
  }

  .hobbies button {
    border: 1px solid #41b883;
    background: #41b883;
    color: white;
    padding: 6px;
    font: inherit;
    cursor: pointer;
  }

  .hobbies button:hover,
  .hobbies button:active {
    background-color: #41b883;
  }

  .hobbies input {
    width: 90%;
  }

  .submit button {
    background: #41b883;
    border: 1px solid #41b883;
    color: #fff;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
    transition: background-color 0.1s ease-in-out;
  }

  .submit button:hover,
  .submit button:active {
    background-color: lighten(#41b883, 5%);
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }
</style>