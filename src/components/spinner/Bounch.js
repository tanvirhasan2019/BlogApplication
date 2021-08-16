import React  from "react";
import { css } from "@emotion/react";
import BounceLoader from "react-spinners/BounceLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Bounch() {

  let loading = true
  let color = "#3f51b5"
  
  return (
    <div style={{marginTop:'40px', marginBottom:'40px'}} className="sweet-loading">
      <BounceLoader color={color} loading={loading} css={override} size={150} />
    </div>
  );
}

export default Bounch;