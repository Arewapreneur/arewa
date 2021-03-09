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
          </h5>
              <div className="form-group mb-1">
                <label className="text-mini">Bank Verification Number</label>
                <p className="text-gray mt-1">Please click verify button to continue the Verification </p>
                <input
                  type="number"
                  className="form-input mt-1"
                  name="bvn"
                  placeholder="Enter 12345678901"
                  value="12345678901"
                  onChange={handleChange}
                />
              </div>
                <Link href="/validation">
                  <button className="btn btn-primary mt-2">Verify</button>
                </Link>
              </div>
        </div>
    </Layout>
  );
};

export default Index;
