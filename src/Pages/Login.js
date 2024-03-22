import React, { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HiMail, HiLockClosed, HiOutlineExclamation } from "react-icons/hi";
import * as L from "../styled-components/LoginStyled";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = ({setIsLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // 서버에 로그인 요청을 보냅니다.
      const response = await axios.post('http://localhost:8080/login', data);
      const { data:responseData } = response;
  
      // 서버로부터 받은 응답 데이터를 확인합니다.
      if (responseData === 'loginSuccess') {
        // 로그인이 성공한 경우 처리
        // 예를 들어, 토큰을 저장하거나 페이지를 이동하는 등의 작업을 수행합니다.
        alert("로그인이 완료되었습니다.", data);
        setIsLogin(true);
        navigate("/");

      } else {
        // 로그인이 실패한 경우 처리
        alert("유효하지 않은 회원입니다.")
        console.log("유효하지 않은 회원입니다.")
      }
    } catch (error) {
      console.error('로그인 에러:', error);
      alert(error);
      // 서버 요청에 실패한 경우 에러 처리
    }
  };
  return (
    <L.LoginWapper>
      <L.LoginForm onSubmit={handleSubmit(onSubmit)}>
        <h1
          style={{
            fontWeight: "bold",
            marginBottom: "20px",
            fontFamily: "'NanumSquare', sans-serif",
          }}
        >
          LOGIN
        </h1>
        <L.InputWapper>
          <L.Label for="input-email">
            <HiMail style={{ fontSize: "30px" }} />
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>E-Mail</span>
          </L.Label>
          <L.InputBox
            type="text"
            id="input-email"
            placeholder="이메일을 입력하세요."
            onChange={(e)=>setEmail(e.target.value)}
            {...register("email", { required: true })}
          />
          {errors.email && errors.email.type === "required" && (
            <L.WarningMessage>
              <HiOutlineExclamation />
              <p>이메일을 입력하세요.</p>
            </L.WarningMessage>
          )}
          {!errors.email && <br />}
        </L.InputWapper>
        <L.InputWapper>
          <L.Label for="input-password">
            <HiLockClosed style={{ fontSize: "30px" }} />{" "}
            <span style={{ fontWeight: "bold", fontSize: "20px" }}> P/W</span>
          </L.Label>
          <L.InputBox
            type="password"
            id="input-password"
            placeholder="비밀번호를 입력하세요."
            onChange={(e)=>setPassword(e.target.value)}
            {...register("password", { required: true })}
          />
          {errors.password && errors.password.type === "required" && (
            <L.WarningMessage>
              <HiOutlineExclamation />
              <p>비밀번호를 입력하세요.</p>
            </L.WarningMessage>
          )}
          {!errors.password && <br />}
        </L.InputWapper>
        <L.LoginButton>LOGIN</L.LoginButton>
        <L.SingUpPage>

            아직 회원이 아니신가요?
            <Link
              to="/signup"
              style={{
                marginLeft: "5px",
                fontWeight: "bold",
                textDecoration: "none",
              }} 
            >
              회원 가입
            </Link>
        
        </L.SingUpPage>
        <hr />
        <L.CopyRight>
          <p>© 2024. IOPS All rights reserved.</p>
        </L.CopyRight>
      </L.LoginForm>
    </L.LoginWapper>
  );
};

export default Login;
