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
            Gurrantor
          </h5>
          {step === 1 ? (
            <Second
              handleChange={handleChange}
              accountInfo={accountInfo}
              setAccountInfo={setAccountInfo}
              setStep={setStep}
            />
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
                <img src={face} height={70} width={70} />
                <p className="sub-heading mt-2">Account Updated</p>
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
