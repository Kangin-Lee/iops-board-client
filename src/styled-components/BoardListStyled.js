import styled from "styled-components";

export const BoardWapper = styled.div`
    background-color: #222f54;
    border-radius: 10px;
`;

export const BoardHeader = styled.div`
    /* display: flex;
    align-items: center;
    justify-content: space-around; */
    text-align: center;
    padding: 20px 0 9px 0;
    margin-top: 30px;
    font-weight: bold;
    font-size: 1.2rem;
`;

// export const BoardTopTitleArea = styled.div`
//     display: flex;

// ` 

// export const BoardTopTitle = styled.div`
//     div:contains()
// ` 

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