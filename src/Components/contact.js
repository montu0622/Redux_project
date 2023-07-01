import React, { useState, useEffect } from "react";
import AddUser from "./AddUser";
import { getUser } from "../Services/services";
import { ToastContainer, toast } from "react-toastify";
import { setHeaderHeading } from "../Store/slices/headerSlice";
const Contact = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [userData, setUserData] = useState();
  const [userLoad, setUserLoad] = useState();

  const handleContactButton = () => {
    setShowContactForm(true);
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    setHeaderHeading({
      name:"sjasaahkuassd"
    })
    getUser()
      .then((res) => {
        setUserData(res.data);
        setUserLoad(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userLoad]);

  return (
    <>
      <ToastContainer theme="dark" />
      <div className="page_wrapper">
        <div className="d-flex justify-content-end">
          <button className="btn_primary m-2" onClick={handleContactButton}>
            New Contact
          </button>
        </div>
        <div className="table_body">
          <table className="contact_table" cellPadding="12px">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>E-mail</th>
                <th>Contact</th>
                <th>Gender</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {userData &&
                userData.map((data, index) => {
                  return (
                    <tr>
                      <td>{<input type="checkbox" className="checkbox"/>}</td>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.contact}</td>
                      <td>{data.gender}</td>
                      <td>{calculateAge(data.DOB)}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div>
          {showContactForm && (
            <AddUser
              setShowContactForm={setShowContactForm}
              setUserLoad={setUserLoad}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Contact;
