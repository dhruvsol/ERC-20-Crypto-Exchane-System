import React, { useState, useRef } from "react";
import logos from "../logo.png";
import etherlogo from "../eth.png";

const buyForm = (props) => {
  const [etherAmountValue, setEtherAmountValue] = useState();
  const [tokenOutput, setTokenOutput] = useState("0");
  const input = useRef(null);

  return (
    <>
      <form
        className="mb-3"
        onSubmit={(event) => {
          event.preventDefault();
          let etherAmount = window.web3.utils.toWei(etherAmountValue, "Ether");
          props.buyTokens(etherAmount);
        }}
      >
        <div>
          <label className="float-left">
            <b> input </b>{" "}
          </label>

          <span className="float-right text-muted">
            Balance:{props.etherBalance} {/*already ether*/}
          </span>
        </div>
        <div className="input-group mb-5">
          <input
            type="text"
            value={etherAmountValue}
            onChange={(event) => {
              setEtherAmountValue(event.target.value);
              const etherAmount = event.target.value.toString();
              setTokenOutput(etherAmount * 100);
              console.log(etherAmount);
              console.log(tokenOutput);
            }}
            ref={input}
            className="form-control form-control-lg"
            placeholder="0"
            required
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <img src={etherlogo} height="32" alt="" />
              &nbsp; ETH
            </div>
          </div>
        </div>
        <div>
          <label className="float-left">
            {" "}
            <b> output </b>{" "}
          </label>

          <span className="float-right text-muted">
            Balance: {window.web3.utils.fromWei(props.tokenBalance, "Ether")}
          </span>
        </div>
        <div className="input-group mb-5">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="0"
            value={tokenOutput}
            disabled
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <img src={logos} height="32" alt="" />
              &nbsp; LWC
            </div>
          </div>
        </div>

        <div>
          <span className="float-left text-muted"> Exchange rate </span>
          <span className="float-right text-muted"> 1 ETH = 100 LWC </span>
        </div>
        <div>
          <button type="submit" className="btn btn-primary btn-block btn-lg">
            {" "}
            Buy Token
          </button>
        </div>
      </form>
    </>
  );
};

export default buyForm;
