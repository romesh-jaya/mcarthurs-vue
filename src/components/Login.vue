<template>
  <div class="landing-container">
    <div class="category-title">McArthur's Colombo</div>
    <div class="description">Please login to use Kiosk</div>
    <form class="form" @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="email" name="email" class="login-input" />
        <span>{{ emailError }}</span>
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input
          v-model="password"
          name="password"
          type="password"
          class="login-input"
        />
        <span>{{ passwordError }}</span>
      </div>
      <div class="button-container">
        <PrimaryButton button-type="submit">Login</PrimaryButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PrimaryButton from "../common/PrimaryButton.vue";
import {
  useForm,
  useField,
  useValidateForm,
  useIsFormValid,
} from "vee-validate";
import * as yup from "yup";
import { login } from "../api/strapi";
import { saveDataToLocalStorage } from "../utils/auth";
import { AxiosError } from "axios";
import { toaster } from "../utils/toaster";

export default defineComponent({
  name: "Landing",
  components: {
    PrimaryButton,
  },
  setup() {
    // Define a validation schema
    const schema = yup.object({
      email: yup.string().required().email().label("Email Address"),
      password: yup.string().required().label("Password"),
    });

    useForm({
      validationSchema: schema,
    });
    const validate = useValidateForm();
    const isFormValid = useIsFormValid();

    const onSubmit = async () => {
      await validate();
      if (isFormValid.value) {
        try {
          const data = await login(email.value, password.value);
          if (data) {
            saveDataToLocalStorage(data);
            toaster.success("Login success!");
          }
        } catch (err) {
          const error = err as AxiosError;
          if (error.response?.status === 400) {
            toaster.error("Invalid credentials");
            return;
          }
          toaster.error("Unknown error occured while logging in");
        }
      }
    };

    // Need to set validateOnValueUpdate on a field by field basis when using useField
    const { value: email, errorMessage: emailError } = useField<string>(
      "email",
      undefined,
      {
        validateOnValueUpdate: false,
      }
    );
    const { value: password, errorMessage: passwordError } = useField<string>(
      "password",
      undefined,
      {
        validateOnValueUpdate: false,
      }
    );

    return {
      email,
      emailError,
      password,
      passwordError,
      onSubmit,
    };
  },
  methods: {
    onLoginClicked() {
      this.$router.push("/select-category");
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/globals.scss";

.landing-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.description {
  margin-block-start: 3rem;
  font-size: 1.5rem;
}

.login-input {
  height: 2.5rem;
  width: 30rem;
  margin: auto;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-block-start: 2.5rem;

  label {
    font-size: 1.75rem;
  }

  input {
    font-size: 1.5rem;
  }
}

.form {
  display: flex;
  flex-direction: column;
  flex: 1 0px;
}

.button-container {
  flex: 1 0px;
  display: grid;
  place-items: center;
}
</style>
