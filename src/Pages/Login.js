import React, { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { HiMail, HiLockClosed, HiOutlineExclamation } from "react-icons/hi";
import * as L from "../styled-components/LoginStyled";
import { useForm } from "react-hook-form";
import { useLoginData } from "../API/loginApiService";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-03-08
 * 용도 : 게시판 로그인 API
 * </pre>
 */

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //로그인 리액트 쿼리로 처리하기--------------------------------
  const {mutate} = useLoginData();
  const onSubmit = async (data) => {
    const {email} = data;
    mutate(data, email);
  };
  //-----------------------------------------------------------
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
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
