import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import Head from "next/head";
import firebase from "../../services/firebase";
import store from "../../store/store";
import { useProxy } from "valtio";
import { useRouter } from "next/router";
import Link from "next/link";

const Profile = () => {

const validation = {
  BVN:"12345678901",
  FirstName:"Uchenna",
  MiddleName:"Chijioke",
  LastName:"Nwanyanwu",
  DateOfBirth:"22-Oct-1970",
  PhoneNumber:"07033333333",
  RegistrationDate:"16-Nov-2014",
  EnrollmentBank:"900",
  EnrollmentBranch:"Victoria Island",
  WatchListed:"NO"
}
const router = useRouter();
useEffect(() => {
  store.loading = true;
  firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
      router.push("/login");
    } else {
      store.loading = false;
    }
  });
}, []);

  return (
    <Layout>
      <Head>
          <title>Profile</title>
      </Head>
      <div className="dashboard text-left">
        <div className="">
        <h1>Welcome, Uchenna </h1>
        <p> BVN: <span className="text-primary "> {validation.BVN}</span></p>
        <p> First Name: <span className="text-primary"> {validation.FirstName}</span></p>
        <p> Middle Name : <span className="text-primary"> {validation.MiddleName}</span></p>
        <p> Last Name: <span className="text-primary"> {validation.LastName} </span></p>
        <p> Date Of Birth : <span className="text-primary"> {validation.DateOfBirth} </span></p>
        <p> Phone Number : <span className="text-primary"> {validation.PhoneNumber} </span></p>
        </div>
        <Link href="/dashboard">
          <button className="btn btn-primary mt-2">Back to Home</button>
        </Link>
      </div>
    </Layout>
  )
};

export default Profile;
