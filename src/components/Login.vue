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
      <div class="form-group">
        <label for="password">Kiosk ID:</label>
        <input v-model="kioskId" name="kioskId" class="login-input" />
        <span>{{ kioskIdError }}</span>
      </div>
      <div class="button-container">
        <PrimaryButton
          button-type="submit"
          :disabled="loading"
          center-content
          class="login-button"
        >
          <Spinner v-if="loading" class="spinner" />
          Login</PrimaryButton
        >
        <div v-if="showPleaseWaitTrigger" class="please-wait-text">
          Please wait... Server is taking a long time to respond
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import PrimaryButton from "../common/PrimaryButton.vue";
import {
  useForm,
  useField,
  useValidateForm,
  useIsFormValid,
} from "vee-validate";
import * as yup from "yup";
import { login } from "../api";
import { saveDataToLocalStorage } from "../utils/auth";
import { AxiosError } from "axios";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { showErrorToast, showSuccessToast } from "../utils/toaster";
import { useStore } from "../store";
import {
  getKioskIdFromLocalStorage,
  saveKioskIdToLocalStorage,
} from "../utils/kioskInfo";
import Spinner from "../common/Spinner.vue";
import useDebouncedRef from "../composables/useDebouncedRef";

export default defineComponent({
  name: "Landing",
  components: {
    PrimaryButton,
    Spinner,
  },
  setup() {
    // Define a validation schema
    const schema = yup.object({
      email: yup.string().required().email().label("Email Address"),
      password: yup.string().required().label("Password"),
      kioskId: yup.string().required().label("Kiosk ID"),
    });

    useForm({
      validationSchema: schema,
    });
    const validate = useValidateForm();
    const isFormValid = useIsFormValid();
    const router = useRouter();
    const toast = useToast();
    const store = useStore();
    const loading = ref(false);
    // showPleaseWaitTrigger turns true when assigned, only after specified timeout (4000ms)
    const showPleaseWaitTrigger = useDebouncedRef(false, 4000);

    const onSubmit = async () => {
      await validate();
      if (isFormValid.value) {
        try {
          loading.value = true;
          showPleaseWaitTrigger.value = true;
          const data = await login(email.value, password.value);
          if (data) {
            saveDataToLocalStorage(data);
            saveKioskIdToLocalStorage(kioskId.value);
            store.commit("auth/saveAuthInfo", data);
            store.commit("auth/saveKioskInfo", kioskId.value);
            toast.clear();
            showSuccessToast("Login success!");
            router.push("/");
          }
        } catch (err) {
          const error = err as AxiosError;
          if (
            error.response?.status === 400 ||
            error.response?.status === 401
          ) {
            showErrorToast("Invalid credentials");
            return;
          }
          showErrorToast("Unknown error occured while logging in");
        } finally {
          showPleaseWaitTrigger.value = false;
          loading.value = false;
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
    const { value: kioskId, errorMessage: kioskIdError } = useField<string>(
      "kioskId",
      undefined,
      {
        validateOnValueUpdate: false,
      }
    );

    kioskId.value = getKioskIdFromLocalStorage() || "";

    return {
      email,
      emailError,
      password,
      passwordError,
      kioskId,
      kioskIdError,
      onSubmit,
      loading,
      showPleaseWaitTrigger,
    };
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
  position: relative;
  min-height: 200px;
}

.login-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.please-wait-text {
  position: absolute;
  top: 82%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  width: 100%;
}

.spinner {
  margin-inline-end: 1rem;
}
</style>
