import styled from "styled-components";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-03-08
 * 용도 : BoardItem Styled-Component
 * </pre>
 */

export const BoardWapper = styled.div`
  background-color: white;
  text-align: center;
  border-bottom: 2px solid black;
  padding: 20px 0 9px 0;
  font-size: 1.2rem;
  transition: 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  &:hover {
    background-color: aliceblue;
    transition: 0.2s;
  }
`;

export const BoardContentsItem = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;

`;
