<template>
    <div class="container">
        <h4 class="mt-3">Cadastrar ou Atualizar</h4>
        <FormUsuario />
        <TabelaUsuarios />
    </div>
</template>

<script>
import FormUsuario from "../components/FormUsuario.vue";
import TabelaUsuarios from "../components/TabelaUsuarios.vue";
export default {
  components: {
    FormUsuario,
    TabelaUsuarios,
  },
};
</script>

<style>

</style>
