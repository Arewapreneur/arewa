import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import Head from "next/head";
import firebase from "../services/firebase";
import Borrow from "../components/dashboard/borrow/borrow";
import Products from '../components/dashboard/access/products'
import store from "../store/store";
import { useProxy } from "valtio";
import { useRouter } from "next/router";

const Dashboard = () => {
  const snapshot = useProxy(store);
  const router = useRouter();
  const [showDash, setShowDash] = useState(false);
  const [activeTab, setActive] = useState("borrow");

  const getInfo = (user) => {
    let data = {};
    firebase
      .database()
      .ref("userinfo")
      .child(user.uid)
      .on("value", (snapshot) => {
        data = snapshot.val();
        store.userInfo = data;
        console.log("userinfo:", data);
        if (!data) {
          console.log("starting");
          createUserInfo(user);
        }
        // updateStarCount(postElement, data);
      });
  };

  const getInvestment = (user) => {
    let data = [];
    firebase
      .database()
      .ref("userinfo/" + user.uid)
      .child("investments")
      .on("child_added", (snapshot) => {
        data.push(snapshot.val());

        console.log("investment:", snapshot.investments);
        store.investments.total = calculateTotal(data);
        store.investments.earnings = calculateEarnings(data);
      });
  };

  const calculateTotal = (data) => {
    let total = 0;
    for (let i in data) {
      total += data[i].amount;
    }
    return total;
  };

  const calculateEarnings = (data) => {
    let investment = 0;
    for (let i in data) {
      investment += data[i].investment;
    }
    return investment;
  };

  const createUserInfo = (user) => {
    firebase.database().ref("userinfo").child(user.uid).set(
      {
        amountborrowed: 0,
        payment_due: 0,
      },
      console.log("added user")
    );
  };

  useEffect(() => {
    store.loading = true;
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        router.push("/login");
      } else {
        store.user = user;
        getInfo(user);
        getInvestment(user);
        setShowDash(true);
        store.loading = false;
      }
    });
  }, []);
  return showDash ? (
    <Layout>
      <Head>
          <title>ArewaPrenuer</title>
      </Head>
      <div className="dashboard">
        <div className="tabs">
          <span
            className={activeTab === "borrow" ? "active" : null}
            onClick={() => setActive("borrow")}
          >
            Account
          </span>
          <span
            className={activeTab === "products" ? "active" : null}
            onClick={() => setActive("products")}
          >
            Products
          </span>
        </div>
        <div className="content">
          {activeTab === "borrow" ? <Borrow /> : <Products />}
        </div>
      </div>
    </Layout>
  ) : null;
};

export default Dashboard;
