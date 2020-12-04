<template>
  <div id="login">
    <v-card id="loginWrap" elevation="2">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Senha"
          type="password"
          required
        ></v-text-field>

        <v-btn color="success" :loading="loading" @click="submit">
          Login
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    email: "renanjoppert@outlook.com",
    emailRules: [
      v => !!v || "E-mail é obrigatório",
      v => /.+@.+\..+/.test(v) || "Digite um e-mail válido"
    ],
    password: "123456",
    passwordRules: [v => !!v || "Senha é obrigatória"],
    loading: false
  }),

  methods: {
    submit() {
      // valida o form
      if (this.$refs.form.validate() == false) {
        this.$toast.error("Você deve preencher seus dados corretamente.");
        return false;
      }

      this.loading = true;
      // valida os dados do usuário na API
      this.$axios
        .$get("http://localhost:3000/users", {
          params: {
            email: this.email
          }
        })
        .then(res => {
          // Caso não retorne algum usuário da API
          if (res.length == 0) {
            this.$toast.error(
              "Não foi possível fazer o login. Verifique os dados digitados e tente novamente!"
            );
            return false;
          }

          // se o login foi um sucesso
          if (res[0].email == this.email && res[0].password == this.password) {
            // guarda o token no local storage
            localStorage.setItem("token", res[0].hash);
            this.$toast.success("Login realizado com sucesso");
            this.$router.push("/dashboard");
            return true;
          } else {
            // caso a senha esteja arrada
            this.$toast.error(
              "Não foi possível fazer o login. Verifique os dados digitados e tente novamente!"
            );
          }
        })
        .catch(err => {
          // Caso não retorne algum usuário da API
          if (res.length == 0) {
            this.$toast.error(
              "Não foi possível fazer o login. Verifique os dados digitados e tente novamente!"
            );
            return false;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#login {
  min-height: 80vh;
  align-items: center;
  display: flex;

  #loginWrap {
    min-width: 350px;
    max-width: 100%;
    padding: 50px;
    align-self: center;
    justify-self: center;
    margin: auto;
  }
}
</style>
