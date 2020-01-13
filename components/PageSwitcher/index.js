import React, { useContext } from 'react';
import styled from 'styled-components';
import StateContext from 'app/context/StateContext';

const PageSwitcher = ({ pages }) => {
  const {
    state: { pageIndex },
  } = useContext(StateContext);
  const pageCount = pages.length;
  const rowWidth = `calc( 100vw * ${pageCount})`;

  return (
    <Wrapper>
      <Row rowWidth={rowWidth} pageIndex={pageIndex}>
        {pages.map((page, index) => (
          <Col key={index} index={index} isActive={index === pageIndex}>
            {page}
          </Col>
        ))}
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #000;
  color: white;
  min-height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  -webkit-overflow-scrolling: touch !important;
  overflow-x: visible;
`;

const Row = styled.div`
  width: 300vw;
  /* transform: ${({ pageIndex }) => `left(${(1 - pageIndex) * 100}vw)`}; */
  margin-left: ${({ pageIndex }) => `${(1 - pageIndex) * 100}vw`};
  transition: margin 0.5s;
  will-change:margin;
  display: flex;
  flex-direction: row;
`;

const Col = styled.div`
  width: calc(100% / 3);
  height: ${({ isActive }) => (isActive ? '100%' : 'auto')};
`;

export default PageSwitcher;
