<template>
    <b-form class="mt-3" inline @submit="cadastrarOuAtualizar">
        <b-input v-model="form.nome" type="text" class="mb-2 mr-2" placeholder="Nome" required />
        <b-input v-model="form.email" type="email" class="mb-2 mr-2" placeholder="E-mail" required />
        <b-input v-model="form.senha" type="password" class="mb-2 mr-2" placeholder="Senha" required />

        <b-button type="submit" class="mb-2" variant="info">Salvar</b-button>         
    </b-form>
</template>

<script>
export default {
    data () {
        return {
            form:  {
                nome: '',
                email: '',
                senha: ''
            }
        }
    },

    computed: {
        selecionado () {
            return this.$store.state.selecionado
        }
    },

    watch: {
        selecionado (value) {
            this.form = Object.assign({}, value)
        }
    },

    methods: {
        cadastrarOuAtualizar (evt) {
            evt.preventDefault()
            this.$axios({ method: this.getMetodo(), url: this.getUrl(), data: this.form }).then(({ data }) => {
                this.$swal({
                    icon: 'success',
                    text: 'Usuário salvo com sucesso!'
                })
                this.salvarUsuario(data)
                this.resetar()
            }).catch(() => 
                this.$swal({
                    icon: 'error',
                    text: 'Erro! Não foi possível salvar o usuário.'
                })
            )
        },

        addUsuario (usuario) {
            this.$store.commit('addUsuario', usuario)
        },

        salvarUsuario (usuario) {
            if(this.selecionado) {
                this.$store.commit('atualizarUsuario', usuario)
            } else {
                this.$store.commit('addUsuario', usuario)
            }
        },

        getMetodo () {
            return this.selecionado ? 'put' : 'post'
        },

        getUrl () {
            return this.selecionado ? `/usuarios/${this.selecionado.id}` : '/usuarios'
        },

        resetar () {
            this.$store.commit('selecionarUsuario', null)
            this.form = {
                nome: '',
                email: '',
                senha: ''
            }
        }
    }
}
</script>

<style>
</style>