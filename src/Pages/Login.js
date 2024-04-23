import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMail, HiLockClosed, HiOutlineExclamation } from "react-icons/hi";
import * as L from "../styled-components/LoginStyled";
import { useForm } from "react-hook-form";
import { useLoginData } from "../API/loginApiService";
import { emailRegex, passwordRegex } from "../common/ValidateUser";

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
  const { mutate } = useLoginData();
  const onSubmit = async (data) => {
    mutate(data);
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

        {/* 이메일 파트---------------------------------------------------- */}
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
            {...register("username", { required: true, pattern: emailRegex })}
          />
          <L.WarningMessage>
            {errors.email && errors.email.type === "required" && (
              <>
                <HiOutlineExclamation />
                <p>이메일을 입력하세요.</p>
              </>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <>
                <HiOutlineExclamation />
                <p>올바른 이메일 양식이 아닙니다.</p>
              </>
            )}
          </L.WarningMessage>
          {!errors.email && <br />}
        </L.InputWapper>
        {/* --------------------------------------------------------------- */}

        {/* 비밀번호 파트--------------------------------------------------- */}
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
            {...register("password", {
              required: true,
              pattern: passwordRegex,
            })}
          />
          <L.WarningMessage>
            {errors.password && errors.password.type === "required" && (
              <>
                <HiOutlineExclamation />
                <p>비밀번호를 입력하세요.</p>
              </>
            )}
            {errors.password && errors.password.type === "pattern" && (
              <>
                <HiOutlineExclamation />
                <p>
                  비밀번호는 특수문자, 대문자, 소문자를 포함한 8글자 이상입니다.
                </p>
              </>
            )}
          </L.WarningMessage>
          {!errors.password && <br />}
        </L.InputWapper>
        {/* --------------------------------------------------------------- */}

        {/* 로그인 버튼 */}
        <L.LoginButton>LOGIN</L.LoginButton>
        
        {/* 회원가입 페이지로 이동 */}
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
