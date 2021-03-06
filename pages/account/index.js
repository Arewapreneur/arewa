import React, { useEffect, useState } from "react";
import firebase from "../../services/firebase";
import Layout from "../../components/layout";
import { getInfo } from "../../services/userService";
import store from "../../store/store";
import face from "../../public/assets/happy_face.svg";
import { useProxy } from "valtio";
import First from "../../components/account/first";
import Second from "../../components/account/second";
import Modal from "../../components/modal/modal";
import Link from "next/link";
import { nibss } from 'innovation-sandbox'

const Index = () => {
  const snapshot = useProxy(store);
  const [showDash, setShowDash] = useState(false);
  const [accountInfo, setAccountInfo] = useState({
    bvn: "",
    first_name: "",
    last_name: "",
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

  const splitNumber = (number) => {
    let phone = number.split("");
    phone.splice(0, 4);
    return phone;
  };

  const sendSMS = () => {
    const sms = functions.https.onRequest((req, res) => {
      axios.post('https://sandboxapi.fsi.ng/atlabs/messaging', (err, response) => {
        if (error) {
          throw error;
        }
        atlabs.SMS.SMSService({
          sandbox_key: "3c47f1e48aa32425b63f241aba9cf4cf",
          payload: {
            to: snapshot.user?.phoneNumber,
            from: "FSI",
            message: "Congratulation, You request are successfully made. We will get back to you soon. Thanks"
          }
        }).then(result => {
          res.status(200).json({
            result,
            message: "Message sent"
          }).catch(err => {
            res.json(err)
          })
        })
      })
    })
  }

  const resetBVN = () => {
    const sms = functions.https.onRequest((req, res) => {
      axios.post('https://sandboxapi.fsi.ng/nibss/bvnr/Reset', (err, response) => {
        if (error) {
          throw error;
        }
        nibss.Bvnr.Reset({
          sandbox_key: '3c47f1e48aa32425b63f241aba9cf4cf',
          organisation_code: '11111'
        }).then(result => {
          res.status(200).json({
            result,
            message: "Credential Recieved"
          }).catch(err => {
            res.json(err)
          })
        })
      })
    })
  }

  const verifyBVN = () => {
    const sms = functions.https.onRequest((req, res) => {
      axios.post(
        'https://sandboxapi.fsi.ng/nibss/bvnr/VerifySingleBVN',
        (err, response) => {
          if (error) {
            throw error;
          }
          nibss.Bvnr.VerifySingleBVN({
            bvn: '22285614288',
            sandbox_key: '3c47f1e48aa32425b63f241aba9cf4cf',
            organisation_code: '11111',
            password: "^o'e6EXK5T ~^j2=",
            ivkey: "eRpKTBjdOq6T67D0",
            aes_key: "9+CZaWqfyI/fwezX",
            host: ''
          }).then(result => {
            res.status(200).json({
              result,
              message: "Message sent"
            }).catch(err => {
              res.json(err)
            })
          })
        })
    })
  }

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
              <p className="text-mini text-gray">
                Why do I need to input my BVN ?
              </p>
              <div className="btn-holder-2 ">
                <div />
                <button
                  className="btn btn-primary"
                  style={{ width: "120px" }}
                  onClick={() => setStep(2)}
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
              <Second
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
                <p className="text-gray mt-1">
                  Congratulation! Your request is successfully made. Kindly wait
                  for call from us and subsequent personal and business verification.
                  Thanks.
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
