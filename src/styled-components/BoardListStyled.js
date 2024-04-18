import styled from "styled-components";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-03-08
 * 용도 : BoardList Styled-Component
 * </pre>
 */

export const BoardWapper = styled.div`
    background-color: #222f54;
    border-radius: 10px;
`;

export const BoardHeader = styled.div`
    text-align: center;
    padding: 20px 0 9px 0;
    margin-top: 30px;
    font-weight: bold;
    font-size: 1.2rem;
`;

export const BoardTopTitleArea = styled.ul`
    display: flex;
    list-style: none;
    padding: 0;
    li{
        color: white;
        border-right: 3px solid white;
    }
    li:last-child{
        border-right: none;
    }
`

export const RoadingSpinner =styled.div`
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ErrorMessage = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    font-weight: bold;
    font-size: 2rem;
`