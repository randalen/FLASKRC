import React from 'react';


const getState = ({ getStore, getActions, setStore }) => {
  return {
          store: {
            token: null,
            message: null,
            demo: [
              {
                title: "FIRST",
                background: "white",
                initial: "white"
              },
              {
                title: "SECOND",
                background: "white",
                initial: "white"
              }
            ]
          },
    actions: {

          login: async (email, password) => {

            const opts ={
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({"email" : "test", "password": "test"})
          
            }
            try {
            const resp =  await fetch('http://localhost:5000/login', opts)
                if (resp.status !== 200) {
                  alert("Error")
                  return false;
                }
                const data = await resp.json();
                console.log("BACKEND: ",data)
                sessionStorage.setItem('token', data.token);
                return true;
            } catch (err) {
                console.error("There was an error logging in", err);
              };
          }

    }
  }

}

export default getState