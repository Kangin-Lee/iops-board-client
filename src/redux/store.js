/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-03-08
 * 용도 : redux 사용을 위한 store 생성
 * </pre>
 */

import { createStore } from "redux";
import reducer from "./reducer/reducer";

let store = createStore(reducer);

export default store;