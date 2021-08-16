import React  from "react";
import { css } from "@emotion/react";
import RiseLoader from "react-spinners/RiseLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function LoaderRise() {

  let loading = true
  let color = "#3f51b5"
  
  return (
    
      <RiseLoader color={color} loading={loading} css={override} size={40} />
    
  );
}

export default LoaderRise;