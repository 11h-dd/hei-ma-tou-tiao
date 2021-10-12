let initState = {
    tokenInfo: {
        token: '',
        refresh_token: ''
    }
}
const stateste = window.localStorage.getItem('state')
if (stateste) {
    initState.tokenInfo = JSON.parse(stateste)  
}
export default {
    namespaced: true,
    state: {
        tokenInfo: initState.tokenInfo
    },
    mutations: {
        undateTokenInfo(state, py) {
            state.tokenInfo = py
            this.commit('saveStateToStorage')
            console.log(state.tokenInfo)
        },
        saveStateToStorage(state) {
            window.localStorage.setItem('state', JSON.stringify(state.tokenInfo))
        }

    },
    actions: {

    },
    getters: () => ({

    }),
}