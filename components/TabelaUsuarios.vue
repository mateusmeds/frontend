<template>
    <div class="mt-3">
        <b-table bordered head-variant="light" :items="usuarios" :fields="cabecalho">
            <template v-slot:cell(action)="data">
                <b-button class="mb-1" size="sm" variant="info" @click="editar(data.item)">Editar</b-button>
                <b-button class="mb-1" size="sm" variant="danger" @click="confirmarExclusao(data.item)">Excluir</b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
export default {
    data () {
        return {
            cabecalho: [
                { key: 'nome', label: 'Nome', sortable: true },
                { key: 'email', label: 'E-mail', sortable: true },
                { key: 'action', label: 'Ações'}
            ]
        }
    },

    computed: {
        usuarios () {
            return this.$store.state.usuarios
        }
    },

    mounted () {
        this.buscarUsuarios()
    },

    methods: {
        buscarUsuarios () {
            this.$axios.$get('/usuarios').then((data) => {
                this.$store.commit('setUsuarios', data)
            }).catch(() => this.$swal({
                icon:'error',
                text: 'Erro! Não foi possível listar usuários.'
            })
            )
        },

        editar (usuario) {
            this.$store.commit('selecionarUsuario', usuario)
        },

        confirmarExclusao (usuario) {
            this.$swal({
                text: 'Tem certeza que deseja excluir este usuário?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não',
            }).then((result) => {
                if (result.value) {
                    this.excluir(usuario)
                }
            })
        },

        excluir (usuario) {
            this.$axios.$delete(`/usuarios/${usuario.id}`).then((data) => {
                this.$store.commit('excluirUsuario', usuario)
                this.$swal({
                    icon: 'success',
                    text: 'Usuário excluído com sucesso!'
                })
            }).catch(() => {
                this.$swal({
                    icon: 'error',
                    text: 'Erro! Não foi possível excluir o usuário.'
                })
            })
        }
    }
}
</script>

<style>

</style>