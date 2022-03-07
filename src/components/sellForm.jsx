import React, { useState, useRef } from "react";
import logos from "../logo.png";
import etherlogo from "../eth.png";

const sellForm = (props) => {
  const [TokenAmountValue, setTokenAmountValue] = useState();
  const [etherOutput, setEtherOutput] = useState("0");
  const input = useRef(null);
  return (
    <>
      <form
        className="mb-3"
        onSubmit={(event) => {
          event.preventDefault();
          let etherAmount = window.web3.utils.toWei(TokenAmountValue, "Ether");
          props.sellTokens(etherAmount);
        }}
      >
        <div>
          <label className="float-left">
            <b> input </b>{" "}
          </label>

          <span className="float-right text-muted">
            Balance:{window.web3.utils.fromWei(props.tokenBalance, "Ether")}{" "}
            {/*already ether*/}
          </span>
        </div>
        <div className="input-group mb-5">
          <input
            type="text"
            value={TokenAmountValue}
            onChange={(event) => {
              setTokenAmountValue(event.target.value);
              const TokenAmount = event.target.value.toString();
              setEtherOutput(TokenAmount / 100);
              console.log(TokenAmount);
              console.log(etherOutput);
            }}
            ref={input}
            className="form-control form-control-lg"
            placeholder="0"
            required
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <img src={logos} height="32" alt="" />
              &nbsp; LWC
            </div>
          </div>
        </div>
        <div>
          <label className="float-left">
            {" "}
            <b> output </b>{" "}
          </label>

          <span className="float-right text-muted">
            Balance: {props.etherBalance}
          </span>
        </div>
        <div className="input-group mb-5">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="0"
            value={etherOutput}
            disabled
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <img src={etherlogo} height="32" alt="" />
              &nbsp; ETH
            </div>
          </div>
        </div>

        <div>
          <span className="float-left text-muted"> Exchange rate </span>
          <span className="float-right text-muted"> 100 LWC = 1 ETH </span>
        </div>
        <div>
          <button type="submit" className="btn btn-primary btn-block btn-lg">
            {" "}
            Sell Token
          </button>
        </div>
      </form>
    </>
  );
};
export default sellForm;
