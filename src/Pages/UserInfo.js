import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import * as U from "../styled-components/UserInfoStyled";
import Navbar from "../components/Navbar";
import { useUserActive, useUserInfo } from "../API/boardApiService";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-04-23
 * 용도 : 로그인 사용자 정보 확인
 * </pre>
 */

const UserInfo = () => {
  const { data, isLoading } = useUserInfo();
  console.log(data);

  const { data: activeData } = useUserActive();
  console.log(activeData);
  return (
    <>
      <Navbar />
      {isLoading ? (
        "로딩중..."
      ) : (
        <U.UserInfoWrapper>
          <Container
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <U.UserInfo>
              <U.UserImg src="/images/user-image.png" />
              <U.UserInfoArea>
                <h2 style={{ marginTop: "100px", fontWeight: "bold" }}>
                  회원 정보
                </h2>
                <U.UserInfoDiv>
                  <p>이메일</p>
                  <U.UserData>{data?.email}</U.UserData>
                </U.UserInfoDiv>

                <U.UserInfoDiv>
                  <p>이름</p>
                  <U.UserData>{data?.name}</U.UserData>
                </U.UserInfoDiv>

                <U.UserInfoDiv>
                  <p>전화번호</p>
                  <U.UserData>{data?.tel}</U.UserData>
                </U.UserInfoDiv>

                <U.UserInfoDiv>
                  <p>등급</p>
                  <U.UserData>{data?.role}</U.UserData>
                </U.UserInfoDiv>

                <U.UserInfoDiv>
                  <p>계정 생성일</p>
                  <U.UserData>
                    {data?.createdTime ? data?.createdTime : "정보 없음"}
                  </U.UserData>
                </U.UserInfoDiv>
              </U.UserInfoArea>
            </U.UserInfo>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <U.UserActivie>
                <h2 style={{ margin: "20px", fontWeight: "bold" }}>
                  {`${data?.name}님의 활동 정보`}
                </h2>
                <U.UserActivieInfo>
                  <h6>가입일</h6>
                  <U.UserActivieArea style={{ marginBottom: "30px" }}>
                    {data?.createdTime ? data?.createdTime : "정보 없음"}
                  </U.UserActivieArea>

                  <h6>작성</h6>
                  <U.UserActivieArea>
                    <p>게시물</p>
                    {activeData?.postCount}개
                  </U.UserActivieArea>

                  <U.UserActivieArea>
                    <p>댓글</p>
                    {activeData?.commentCount}개
                  </U.UserActivieArea>
                </U.UserActivieInfo>
              </U.UserActivie>
              <U.UserContents>user????</U.UserContents>
            </div>
          </Container>
        </U.UserInfoWrapper>
      )}
    </>
  );
};

export default UserInfo;
