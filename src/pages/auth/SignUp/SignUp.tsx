import { createSignal, Show } from "solid-js";
import { DOMElement } from "solid-js/jsx-runtime";
import { A } from "@solidjs/router";

import styles from "./SignUp.module.css";

import { useAuthRedirect } from "@/hooks/auth";

import { services } from "@/services";
import { SignUpData } from "@/services/auth";
import { LoadingWithErrorWithSuccess } from "@/types/data";

function SignUp() {
  const [formData, setFormData] = createSignal<
    SignUpData & LoadingWithErrorWithSuccess
  >({
    email: "",
    username: "",
    password: "",
    loading: false,
    error: "",
    success: "",
  });
  useAuthRedirect();

  async function handleSubmit(
    e: SubmitEvent & {
      currentTarget: HTMLFormElement;
      target: DOMElement;
    }
  ) {
    e.preventDefault();

    try {
      setFormData((prev) => ({ ...prev, loading: true }));
      const data = await services.auth.signUp({
        email: formData().email,
        username: formData().username,
        password: formData().password,
      });
      setFormData((prev) => ({
        ...prev,
        email: "",
        username: "",
        password: "",
        error: "",
        success: data.message,
      }));
      window.location.replace("/");
    } catch (error: any) {
      setFormData((prev) => ({ ...prev, error: error.message }));
    } finally {
      setFormData((prev) => ({ ...prev, loading: false }));
    }
  }

  function updateFormDataProp(
    e: InputEvent & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      error: "",
      success: "",
    }));
  }

  return (
    <main class={styles.main}>
      <h1 class={styles.title}>Sign up</h1>
      <form class={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData().email}
          onInput={updateFormDataProp}
          required
        />
        <input
          placeholder="username"
          name="username"
          value={formData().username}
          onInput={updateFormDataProp}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData().password}
          onInput={updateFormDataProp}
          required
        />
        <Show when={formData().error}>
          <p class={styles.error}>{formData().error}</p>
        </Show>
        <Show when={formData().success}>
          <p class={styles.success}>{formData().success}</p>
        </Show>
        <button type="submit" disabled={formData().loading}>
          {formData().loading ? "Loading..." : "Sign up"}
        </button>
        <A href="/auth/sign-in">Sign in</A>
      </form>
    </main>
  );
}

export { SignUp };
