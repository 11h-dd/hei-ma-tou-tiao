export default {
    namespaced: true,
    state: {
        tokenInfo:{}
    },
    mutations: {
        undateTokenInfo(state,py){
            state.tokenInfo = py
            console.log(state.tokenInfo)
        }
        
    },
    actions: {
        
    },
    getters:() => ({

    }),
}