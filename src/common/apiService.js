import axios from "axios";


/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-04-03
 * 용도 : http://localhost:8080 -> API 통신 고정값 설정
 * </pre>
 */

//기본 경로 설정---------------------------------
const BASE_URL = "http://localhost:8080";

export const apiService = axios.create({
  baseURL: BASE_URL,
});
