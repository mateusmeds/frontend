export const state = () => ({
    usuarios: [],
    selecionado: null
})

export const mutations = {
    setUsuarios (state, value) {
        state.usuarios = value
    },

    addUsuario (state, value) {
        state.usuarios.push(value)
    },

    atualizarUsuario (state, value) {
        const index = state.usuarios.findIndex(usuario => usuario.id === value.id) 
        state.usuarios.splice(index, 1, value)
    },

    selecionarUsuario (state, value) {
        state.selecionado = value
    },

    excluirUsuario (state, value) {
        state.usuarios.splice(state.usuarios.indexOf(value), 1)
    }
}