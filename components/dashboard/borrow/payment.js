import React, { useState } from "react";
import { InputMoney, parseMoney, FormatCard } from "../../formats/money";

const Payment = ({ action }) => {
  const [step, setStep] = useState(1);

  const [paymentInfo, setPayment] = useState({
    card_number: "",
    expiry: "",
    cvv: "",
    amount: 0,
  });

  const handleChange = (event) => {
    const { value, name } = event.target;

    if (name === "card_number" && value.length > 19) {
      console.log(paymentInfo.card_number);
      return;
    }
    if (name === "expiry" && value.length === 2) {
      console.log("dman");
      setPayment({
        ...paymentInfo,
        [name]: `${value} / `,
      });
      return;
    }
    if (name === "expiry" && value.length === 4) {
      let number = value.split("");
      console.log(number);
      setPayment({
        ...paymentInfo,
        [name]: number[0],
      });
      return;
    }
    if (name === "cvv" && value.toString().length > 3) {
      return;
    }
    setPayment({
      ...paymentInfo,
      [name]: value,
    });
  };

  return step === 1 ? (
    <div className="pop-payment">
      <p className="text-mini mb-1">ENTER YOUR AREWA CARD PIN TO PAY</p>
      <div className="outline mb-2">
        <p
          className="text-mini text-primary mb-1"
          style={{ textAlign: "left" }}
        >
          Card Pin
        </p>
        <input
          type="text"
          placeholder="0000 0000 0000 0000"
          name="card_number"
          style={{ fontSize: "20px" }}
          value={FormatCard(parseMoney(paymentInfo.card_number))}
          onChange={handleChange}
        />
      </div>
      <div
        // style={{
        //   display: "flex",
        //   width: "100%",
        //   justifyContent: "space-between",
        // }}
      >

      </div>
      <button className="btn btn-primary mt-2" onClick={action}>
        Pay Now
      </button>
    </div>
  ) : step === 2 ? (
    <div
      className="pop-payment"
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <p className="sub-heading">Enter Amount</p>
      <input type="number" className="form-input" placeholder="#20,000" />
      <div className="btn-holder-2" style={{ width: "100%" }}>
        <button className="btn btn-outline" onClick={() => setStep(1)}>
          Prev
        </button>
        <button className="btn btn-primary">Pay</button>
      </div>
    </div>
  ) : null;
};

export default Payment;
