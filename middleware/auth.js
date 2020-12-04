export default function ({
  store,
  redirect,
  $axios,
  $toast
}) {
    // BASE URL API
  const apiURL = 'http://localhost:3000'

  // Verifica se já possuí o token
  if (localStorage.getItem('token')) {

    // Valida o token na api
    $axios.$get(apiURL + "/users", {
      params: {
        hash: localStorage.getItem('token')
      }
    }).then(res => {
        // se o token bater com o registro
      if (res.length > 0) {
          // registra na Vuex User
        store.commit("user/setUserData", res[0]);
      } else {
          // Caso não ache um registro com o token informado, remove o token e redireciona para o login
        localStorage.removeItem('token')
        return redirect('/')
      }
    }).catch(() => {
        // Se houver erro, apaga o token e redireciona para o login
      localStorage.removeItem('token')
      return redirect('/')
    })
  } else {
      // Caso não possua o token, redireciona para o login
    return redirect('/')
  }
}
