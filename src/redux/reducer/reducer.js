//state 초기 값 세팅
let initalState = {
    isLogin:false
}

function reducer (state=initalState, action){
    const {type, payload} = action
    if(action.type === "LOGIN"){
        return{...state, isLogin:true}
    }else if(action.type === "LOGOUT"){
        return{...state, isLogin:false}
    }

    return {...state};
}

export default reducer;

