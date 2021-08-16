import React from "react";
import { css } from "@emotion/react";
import PuffLoader from "react-spinners/PuffLoader";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Puffloader() {
  let loading =true;
  let color = "#3f51b5";

  return (
    <div style={{margin:'40px'}} className="sweet-loading">
       <PuffLoader  color={color} loading={loading} css={override} size={250} />
    </div>
  );
}

export default Puffloader;