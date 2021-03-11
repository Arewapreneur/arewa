// import React from "react";

// import store from "../../store/store";
// import firebase from "../../services/firebase";
// import { useProxy } from "valtio";

// import Link from "next/link";

// import face from "../../public/assets/happy_face.svg";
// import Modal from "../../components/modal/modal";

// const Second = ({ accountInfo, setStep, setAccountInfo, step }) => {
//   const snapshot = useProxy(store);
//   const handleChange = (event) => {
//     const { value, name } = event.target;

//     setAccountInfo({
//       ...accountInfo,
//       [name]: value,
//     });
//   };

//   console.log(step);

//   const saveInfo = () => {
//     store.loading = true;
//     firebase
//       .database()
//       .ref("userinfo/" + snapshot.user.uid)
//       .set(snapshot.accountInfo)
//       .then(() => {
//         store.loading = false;
//         setStep(3);
//       });
//   };
//   return (
//     <>
//       <div className="form-col mt-2">

//         <div className="form-group mb-2">
//           <label className="text-mini">Account Number</label>
//           <input
//             type="number"
//             className="form-input mt-1"
//             placeholder="Enter your bank account no."
//             name="bank_account_number"
//             value={accountInfo.bank_account_number}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group mb-2">
//           <label className="text-mini">Next of Kin Full Name</label>
//           <input
//             type="text"
//             className="form-input mt-1"
//             placeholder="Enter your next of kin full name"
//             name="nok_name"
//             value={accountInfo.nok_name}
//             onChange={handleChange}
//           />
//         </div>

//         <label className="text-mini">Next of Kin Phone Number</label>
//         <div className="phone-input input">
//           <p>+234</p>
//           <input
//             type="number"
//             placeholder="Enter phone number"
//             name="nok_phone"
//             value={accountInfo.nok_phone}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="btn-holder-2 mt-3">
//           <button
//             className="btn btn-outline"
//             style={{ width: "120px" }}
//             onClick={() => setStep(1)}
//           >
//             Prev
//           </button>
//           <button
//             className="btn btn-primary"
//             style={{ width: "120px" }}
//             onClick={saveInfo}
//           >
//             Save
//           </button>
//         </div>
//       </div>
//       {step === 3 && (
//         <Modal>
//           <div className="pop-message">
//             <img src={face} height={55} width={55} />
//             <h1 className="heading mb-3">Mun gode!</h1>
//             <p className="sub-heading">Account Updated</p>
//             <p className="text-gray mt-1">
//               Your account details was updated successfully!
//             </p>
//             <p className="text-gray mt-1">
//               Congratulation! Your request is successfully made. Kindly wait for
//               call from us and subsequent personal and business verification.
//               Thanks.
//             </p>
//             <Link href="/dashboard">
//               <button className="btn btn-primary mt-2">Back to Home</button>
//             </Link>
//           </div>
//         </Modal>
//       )}
//     </>
//   );
// };

// export default Second;
