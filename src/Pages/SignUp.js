import React, { useRef } from "react";
import {
  HiMail,
  HiLockClosed,
  HiUser,
  HiPhone,
  HiOutlineExclamation,
} from "react-icons/hi";
import { useForm } from "react-hook-form";
import * as S from "../styled-components/SignUpStyled";
import { useSignUpData } from "../API/signupApiService";
import { emailRegex, passwordRegex, telRegex } from "../common/ValidateUser";
import { Link } from "react-router-dom";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-03-08
 * 용도 : 게시판 회원가입 페이지
 * </pre>
 */

const SignUp = () => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //회원가입 api 리액트 쿼리로 처리----------------------
  const { mutate } = useSignUpData();
  const onSubmit = async (data) => {
    mutate(data);
  };
  //--------------------------------------------------

  const emailInput = useRef();
  const password = useRef(null);
  password.current = watch("password");

  return (
    <S.SignUpWapper>
      <S.SignUpForm onSubmit={handleSubmit(onSubmit)}>
        <S.FormTitle>
          <Link to="/login" style={{textDecoration:"none"}}>
            <h1 className="login-title">LOGIN</h1>
          </Link>
          <h1>|</h1>
          <h1 className="signup-title">SIGNUP</h1>
        </S.FormTitle>

        {/* 이메일 파트--------------------------------------------------- */}
        <S.InputWapper>
          <S.Label for="input-email">
            <HiMail style={{ fontSize: "30px" }} />
            <span>E-Mail</span>
          </S.Label>
          <S.InputBox
            type="email"
            id="input-email"
            name="email"
            placeholder="이메일을 입력하세요."
            autoFocus
            ref={emailInput}
            {...register("email", { required: true, pattern: emailRegex })}
          />
          <S.WarningMessage>
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
          </S.WarningMessage>
          {!errors.email && <br />}
        </S.InputWapper>
        {/* --------------------------------------------------------------- */}

        {/* 이름 파트------------------------------------------------------ */}
        <S.InputWapper>
          <S.Label for="input-name">
            <HiUser style={{ fontSize: "30px" }} />
            <span>NAME</span>
          </S.Label>
          <S.InputBox
            type="text"
            id="input-name"
            placeholder="이름을 입력하세요."
            {...register("name", { required: true, maxLength: 10 })}
          />
          {errors.name && errors.name.type === "required" && (
            <S.WarningMessage>
              <HiOutlineExclamation />
              <p>이름을 입력하세요.</p>
            </S.WarningMessage>
          )}
          {errors.name && errors.name.type === "maxLength" && (
            <S.WarningMessage>
              <HiOutlineExclamation />
              <p>이름은 10자 이하입니다.</p>
            </S.WarningMessage>
          )}
          {!errors.name && <br />}
        </S.InputWapper>
        {/* --------------------------------------------------------------- */}

        {/* 전화번호 파트--------------------------------------------------- */}
        <S.InputWapper>
          <S.Label for="input-tel">
            <HiPhone style={{ fontSize: "30px" }} />
            <span> TEL</span>
          </S.Label>
          <S.InputBox
            type="tel"
            id="input-tel"
            placeholder="전화번호를 입력하세요."
            {...register("tel", { required: true, pattern: telRegex })}
          />
          {errors.tel && errors.tel.type === "required" && (
            <S.WarningMessage>
              <HiOutlineExclamation />
              <p>전화번호 입력하세요.</p>
            </S.WarningMessage>
          )}
          {errors.tel && errors.tel.type === "pattern" && (
            <S.WarningMessage>
              <HiOutlineExclamation />
              <p>올바른 전화번호 양식이 아닙니다.(ex 000-0000-0000)</p>
            </S.WarningMessage>
          )}
          {!errors.tel && <br />}
        </S.InputWapper>
        {/* --------------------------------------------------------------- */}

        {/* 비밀번호 파트--------------------------------------------------- */}
        <S.InputWapper>
          <S.Label for="input-password">
            <HiLockClosed style={{ fontSize: "30px" }} />
            <span> P/W</span>
          </S.Label>
          <S.InputBox
            type="password"
            id="input-password"
            placeholder="비밀번호를 입력하세요."
            ref={password}
            {...register("password", {
              required: true,
              pattern: passwordRegex,
            })}
          />
          {errors.password && errors.password.type === "required" && (
            <S.WarningMessage>
              <HiOutlineExclamation />
              <p>비밀번호를 입력하세요.</p>
            </S.WarningMessage>
          )}
          {errors.password && errors.password.type === "pattern" && (
            <S.WarningMessage>
              <HiOutlineExclamation />
              <p>
                소문자, 숫자, 특수문자를 각 하나 포함한 8자리 이상이여야 합니다.
              </p>
            </S.WarningMessage>
          )}
          {!errors.password && <br />}
        </S.InputWapper>
        {/* --------------------------------------------------------------- */}

        {/* 비밀번호 재확인 파트-------------------------------------------- */}
        <S.InputWapper>
          <S.Label for="input-password-confirm">
            <HiLockClosed style={{ fontSize: "30px" }} />
            <span>P/W Confirm</span>
          </S.Label>
          <S.InputBox
            type="password"
            id="input-password-confirm"
            placeholder="비밀번호를 입력하세요."
            {...register("password_confirm", {
              required: true,
              validate: (value) => value === password.current,
            })}
          />
          {errors.password_confirm &&
            errors.password_confirm.type === "required" && (
              <S.WarningMessage>
                <HiOutlineExclamation />
                <p>비밀번호를 입력하세요.</p>
              </S.WarningMessage>
            )}
          {errors.password_confirm &&
            errors.password_confirm.type === "validate" && (
              <S.WarningMessage>
                <HiOutlineExclamation />
                <p>비밀번호가 맞지 않습니다.</p>
              </S.WarningMessage>
            )}
          {!errors.password_confirm && <br />}
        </S.InputWapper>
        {/* --------------------------------------------------------------- */}

        {/* 등록버튼 */}
        <S.SignUpButton onSubmit={onSubmit}>SIGNUP</S.SignUpButton>
        <hr />
        <S.CopyRight>
          <p>© 2024. IOPS All rights reserved.</p>
        </S.CopyRight>
      </S.SignUpForm>
    </S.SignUpWapper>
  );
};

export default SignUp;
