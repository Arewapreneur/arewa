import React, { useEffect, useState } from "react";
import firebase from "../../services/firebase";
import Layout from "../../components/layout";
import { getInfo } from "../../services/userService";
import store from "../../store/store";

import { useProxy } from "valtio";
import First from "../../components/account/first";
import Modal from "../../components/modal/modal";
import face from "../../public/assets/happy_face.svg";

import Link from "next/link";

const Index = () => {
  const snapshot = useProxy(store);
  const [showDash, setShowDash] = useState(false);
  const [accountInfo, setAccountInfo] = useState({
    bvn: "",
    first_name: "",
    last_name: "",
    Date_Of_Birth: "",
    PhoneNumber: "",
    bank_name: "",
    bank_account_number: "",
    nok_name: "",
    nok_phone: "",
  });
  const [step, setStep] = useState(1);

  const handleChange = (event) => {
    const { value, name } = event.target;

    setAccountInfo({
      ...accountInfo,
      [name]: value,
    });
  };

  useEffect(() => {
    store.loading = true;
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        router.push("/login");
      } else {
        store.user = user;
        getInfo(user);
        setShowDash(true);
        store.loading = false;
      }
    });
  }, []);

  const fetchBVN = async () => {
    await fetch("https://verify-bvn.herokuapp.com/verify/bvn", {
      method: "POST",
      body: JSON.stringify({
        bvn: 12345678901,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setAccountInfo({
          ...accountInfo,
          [name]: value,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setStep(2);
  };

  useEffect(() => {
    if (snapshot.accountInfo) {
      store.loading = false;
      setAccountInfo(snapshot.accountInfo);
    }
  }, [snapshot.accountInfo]);

  useEffect(() => {
    if (snapshot.accountInfo) {
      let newInfo = {
        ...snapshot.userInfo,
        ...accountInfo,
      };
      store.accountInfo = newInfo;
    }
  }, [accountInfo]);
  return (
    <Layout>
      <div className="container">
        <div className="account">
          <h5 className="heading" style={{ fontSize: "25px" }}>
            Update your account
          </h5>
          {step === 1 ? (
            <div className="form-col mt-2">
              <div className="form-group mb-1">
                <label className="text-mini">Bank Verification Number</label>
                <input
                  type="number"
                  className="form-input mt-1"
                  name="bvn"
                  placeholder="Enter your BVN"
                  value={accountInfo.bvn}
                  onChange={handleChange}
                />
              </div>
              <Link href="">
                <p className="text-mini text-gray">
                  Why do I need to input my BVN ?
                </p>
              </Link>

              <div className="btn-holder-2 ">
                <div />
                <button
                  className="btn btn-primary"
                  style={{ width: "120px" }}
                  onClick={fetchBVN}
                  disabled={accountInfo.bvn == ""}
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <First
              handleChange={handleChange}
              accountInfo={accountInfo}
              setAccountInfo={setAccountInfo}
              setStep={setStep}
            />
          )}
          {step === 3 && (
            <Modal>
              <div className="pop-message">
                <img src={face} height={55} width={55} />
                <h1 className="heading mb-3">Mun gode!</h1>
                <p className="sub-heading">Account Updated</p>
                <p className="text-gray mt-1">
                  Your account details was updated successfully!
                </p>
                <Link href="/dashboard">
                  <button className="btn btn-primary mt-2">Back to Home</button>
                </Link>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
