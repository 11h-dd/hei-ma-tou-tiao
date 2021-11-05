let initState = {
    tokenInfo: {
        token: '',
        refresh_token: ''
    }
}
const stateste = window.localStorage.getItem('state')
console.log(stateste)
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
            this.commit('he/saveStateToStorage')
            console.log(state.tokenInfo)
        },
        saveStateToStorage(state) {
            window.localStorage.setItem('state', JSON.stringify(state.tokenInfo))
        },
        cleanState(state) {
            state.tokenInfo = {
                token: '',
                refresh_token: ''
            }
            window.localStorage.removeItem('state')
        }
        

    },
    actions: {

    },
    getters: () => ({

    }),
}