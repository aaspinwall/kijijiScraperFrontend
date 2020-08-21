import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  padding: 0 !important;
  .attrs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: left;
    span {
      padding: 1rem 0;
    }
  }

  font-size: 1rem;
  > span {
  }
  .icon {
    display: inline-flex;
  }
  .slideRight {
    padding-left: 0.5rem;
  }
  .amen-grid {
    margin: 0 0 1rem;
    grid-template-columns: 1fr 1fr;
    > div {
      :nth-child(1) {
        text-align: left;
      }
      :nth-child(2) {
        text-align: right;
      }
    }
  }
`;
