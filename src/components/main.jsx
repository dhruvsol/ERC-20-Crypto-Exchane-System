import React, { useState, useRef } from "react";
import BuyForm from "./buyForm";
import SellForm from "./sellForm.jsx";

const main = (props) => {
  const [form, setForm] = useState("buy");

  let content;
  if (form == "buy") {
    content = (
      <BuyForm
        etherBalance={props.etherBalance}
        tokenBalance={props.tokenBalance}
        buyTokens={props.buyTokens}
      />
    );
  } else {
    content = (
      <SellForm
        etherBalance={props.etherBalance}
        tokenBalance={props.tokenBalance}
        sellTokens={props.sellTokens}
      />
    );
  }
  return (
    <div id="content" className="mt-3">
      <div className="d-flex justify-content-between mb-3">
        <button
          onClick={() => {
            setForm("buy");
          }}
          className="btn btn-warning"
        >
          Buy
        </button>

        {/* <span className="text-muted">&lt; &nbsp; &gt;</span> */}
        <button
          onClick={() => {
            setForm("sell");
          }}
          className="btn btn-warning"
        >
          Sell
        </button>
      </div>

      <div className="card mb-4">
        <div className="card-body">{content}</div>
      </div>
    </div>
  );
};

export default main;
