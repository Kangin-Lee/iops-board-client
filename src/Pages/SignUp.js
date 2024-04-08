import React, { useRef } from "react";
import {
  HiMail,
  HiLockClosed,
  HiUser,
  HiPhone,
  HiOutlineExclamation,
} from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as S from "../styled-components/SignUpStyled";
import axios from "axios";
import { useSignUpData } from "../API/apiService";

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

  //이메일 및 비밀번호 유효성 검사 변수==============================================================
  // 영문 대소문자, 숫자, 밑줄, 마침표, 퍼센트, 더하기, 하이픈으로 시작하는 이메일 주소를 검증하며, 이메일 도메인은 최소 2자 이상의 영문 대소문자로 이루어져야 합니다
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

  // 최소한 하나의 특수 문자, 대문자, 소문자를 포함해야 하는 8글자 이상의 비밀번호 패턴을 검증합니다.
  const passwordRegex =
    /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;

  // 전화번호의 양식이 "000-0000-0000" 또는 "000-000-0000"과 같이 세 자리, 네 자리 숫자로 이루어진 양식이어야 함을 나타냅니다.
  const telRegex = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/;

  return (
    <S.SignUpWapper>
      <S.SignUpForm onSubmit={handleSubmit(onSubmit)}>
        <h1>SIGNUP</h1>
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
          {errors.email && errors.email.type === "required" && (
            <S.WarningMessage>
              <HiOutlineExclamation />
              <p>이메일을 입력하세요.</p>
            </S.WarningMessage>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <S.WarningMessage>
              <HiOutlineExclamation />
              <p>올바른 이메일 양식이 아닙니다.</p>
            </S.WarningMessage>
          )}
          {!errors.email && <br />}
        </S.InputWapper>
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
