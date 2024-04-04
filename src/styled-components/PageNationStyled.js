import styled from "styled-components";

export const PageNationWapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PageNumber = styled.li`

  margin: 13px 5px 0px 5px;
  
  
  .page-active {
    border: 2px solid white;
    background-color: white;
    font-weight: bold;
    color: #222f54;
  }

  .page-num {
    text-decoration: none;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
    border-radius: 100%;
  }

  .page-non-focus{
    color: white;
    transition: 0.3s;
  }

  .page-non-focus:hover{
    background-color: #31447a;
      transition: 0.3s;
      transform: translateY(2px);
  }
`;
