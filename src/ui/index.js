import * as R from 'ramda';
import styled, { css, createGlobalStyle } from 'styled-components';
import {
  size,
  color,
  space,
  width,
  height,
  border,
  display,
  fontSize,
  flexWrap,
  overflow,
  maxWidth,
  minWidth,
  maxHeight,
  minHeight,
  alignItems,
  borderColor,
  borderRadius,
  flexDirection,
  justifyContent } from 'styled-system';
// //////////////////////////////////////////////////////////////////////////////

export const GlobalStyle = createGlobalStyle`
  body, ul, button {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
  * {
    box-sizing: border-box;
    margin: 0;
  }
  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
    font-weight: 400;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  * :active, :hover, :focus {
    outline: 0;
    outline-offset: 0;
  }
  *::-webkit-scrollbar-track
  {
    background-color: transparent;
  }

  *::-webkit-scrollbar
  {
    width: 8px;
    height: 8px;
  }

  *::-webkit-scrollbar-thumb
  {
    background-color: lightgray;
  }
`

export const hoverStyles = css`
  &:hover {
    background-color: ${({ hoverBg }) => hoverBg};
  }
`

export const Box = styled.div`
  ${size}
  ${color}
  ${space}
  ${width}
  ${height}
  ${border}
  ${display}
  ${fontSize}
  ${overflow}
  ${maxWidth}
  ${minWidth}
  ${maxHeight}
  ${minHeight}
  ${borderColor}
  ${borderRadius}
  cursor: ${({ cursor }) => R.or(cursor, 'initial')};
  ${({ additionalStyles }) => additionalStyles};
`;

export const Flex = styled(Box)`
  ${flexWrap}
  ${alignItems}
  ${flexDirection}
  ${justifyContent}
  display: flex;
`;

