import React, { useEffect, useState } from "react";
import firebase from "../../services/firebase";
import Layout from "../../components/layout";
import { getInfo } from "../../services/userService";
import store from "../../store/store";

import { useProxy } from "valtio";
import First from "../../components/account/first";
<<<<<<< HEAD
import Second from "../../components/account/second";
import Third from "../../components/account/third";
=======
>>>>>>> d01ea426525e003b0d903ae1ea3af182e9880d83
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
    ...snapshot.accountInfo
  });
  const [step, setStep] = useState(1);

  const handleChange = (event) => {
    const { value, name } = event.target;

    setAccountInfo({
      ...accountInfo,
      [name]: value,
    });
  };

<<<<<<< HEAD
  const splitNumber = (number) => {
    let phone = number.split("");
    phone.splice(0, 4);
    return phone;
  };

// useEffect(() => {
//   if(verification){
//     setAccountInfo({
//       bvn: "",
//       first_name: verification.FirstName,
//       last_name: verification.LastName,
//       bank_name: "",
//       bank_account_number: "",
//       nok_name: "",
//       nok_phone: ""
//     })
//   }

// }, [verification])

=======
>>>>>>> d01ea426525e003b0d903ae1ea3af182e9880d83
  useEffect(() => {
    store.loading = true;
  const unsubscribe =  firebase.auth().onAuthStateChanged(function (user) {
      console.log(user)
      if (!user) {
        router.push("/login");
      } else {
        store.user = user;
        getInfo(user);
        setShowDash(true);
        store.loading = false;
      }
    })
  return () => {unsubscribe()}
  }, []);

<<<<<<< HEAD
  // useEffect(() => {
  //   if (snapshot.accountInfo) {
  //     store.loading = false;
  //     setAccountInfo(snapshot.accountInfo);
  //   }
  //   console.log('snapshot')
  // }, [snapshot.accountInfo]);
  //
=======
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

>>>>>>> d01ea426525e003b0d903ae1ea3af182e9880d83
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
<<<<<<< HEAD
              <div className="form-group mb-2">
                <label className="text-mini">First Name</label>
                <input
                  type="text"
                  className="form-input mt-1"
                  name="first_name"
                  placeholder="Enter your first name"
                  value={accountInfo.first_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mb-2">
                <label className="text-mini">Last Name</label>
                <input
                  type="text"
                  className="form-input mt-1"
                  name="last_name"
                  placeholder="Enter your last name"
                  value={accountInfo.last_name}
                  onChange={handleChange}
                />
              </div>
              <label className="text-mini">Phone</label>
              <div className="phone-input">
                <p>+234</p>
                <p className="text-normal">
                  0{splitNumber(snapshot.user?.phoneNumber || "")}
                </p>
              </div>
              <p className="text-mini text-gray mb-2">
                Must be the phone number linked to your BVN
              </p>
=======
>>>>>>> d01ea426525e003b0d903ae1ea3af182e9880d83
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
<<<<<<< HEAD
              <p className="text-mini text-gray">
                Why do I need to input my BVN ?
              </p>
=======
              <Link href="">
                <p className="text-mini text-gray">
                  Why do I need to input my BVN ?
                </p>
              </Link>

>>>>>>> d01ea426525e003b0d903ae1ea3af182e9880d83
              <div className="btn-holder-2 ">
                <div />
                <button
                  className="btn btn-primary"
                  style={{ width: "120px" }}
<<<<<<< HEAD
                  onClick={() => setStep(2)}
=======
                  onClick={fetchBVN}
                  disabled={accountInfo.bvn == ""}
>>>>>>> d01ea426525e003b0d903ae1ea3af182e9880d83
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
<<<<<<< HEAD
              <Second
                handleChange={handleChange}
                accountInfo={accountInfo}
                setAccountInfo={setAccountInfo}
                setStep={setStep}
              />
            )}
=======
            <First
              handleChange={handleChange}
              accountInfo={accountInfo}
              setAccountInfo={setAccountInfo}
              setStep={setStep}
            />
          )}
>>>>>>> d01ea426525e003b0d903ae1ea3af182e9880d83
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
