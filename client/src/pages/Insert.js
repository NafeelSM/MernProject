import React, { useState } from 'react';//useState add a functional components
import axios from "axios";//Communicate with backend, make request and return data from the API
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
function Insert() {
    const [ render,setRender] = useState(false);

    const [input, setInput] = useState({
        empid: "",
        name: "",
        nic: "",
        email: "",
        address: "",
        designation: "",
        salary: "",
        phone: "",
        isValidNic: true,
        isValidPhone: true
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.empid || !input.name || !input.nic || !input.email || !input.address || !input.salary || !input.phone || !input.designation) {
            Swal.fire({
              icon: 'error',
              title: 'PLEASE FILL ALL FIELDS',
              text: 'PLEASE FILL IN all required fields before submitting the form',
            });
            return;
          }
          
        Swal.fire({
            icon: "success",
            title: "Employee Added!",
            confirmButtonText: "OK",
            onConfirm: () => {

            },
        })
        

       
        await axios.post("http://localhost:7000/api/v1/emp", input);
        console.log("employee:",input)
        setRender(true)
        setInput({
            empid: "",
            name: "",
            nic: "",
            email: "",
            address: "",
            designation: "",
            salary: "",
            phone: "",
            isValidNic: true,
               
        })
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        let isValidNic = input.isValidNic;
        let isValidPhone = input.isValidPhone
        if (name === 'nic') {
            // NIC validation logic
            isValidNic = false;
            if (value.length === 10 && value.match(/^\d{9}[vV]$/)) {
              isValidNic = true;
            } else if (value.length === 12 && value.match(/^\d{12}$/)) {
              isValidNic = true;
            }
          }
          if (name === 'phone') {
            // Check if the input field being updated is the contactNo field 
             isValidPhone = false;
             if (value.length === 10) {
                 isValidPhone = true;
             } 
           }

        setInput(prevFormData => ({
            ...prevFormData,
            [name]: value,
            isValidNic: isValidNic,
            isValidPhone: isValidPhone,
        }));
        
    };
   
    return (
        <div className='container'>
            
            <form className='con' onSubmit={handleSubmit}>
                <div className='row'>
                    <h2><b>INSERT NEW EMPLOYEE</b></h2><br></br>
                    <div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label">EMPLOYEE ID</label>
                        <input
                            name="empid"
                            value={input.empid}
                            onChange={handleInputChange}
                            type="text"
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">EMPLOYEE NAME</label>
                        <input
                            name="name"
                            value={input.name}
                            onChange={handleInputChange}
                            type="text"
                            class="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">NIC</label>
                        <input
                            name="nic"
                            value={input.nic}
                            onChange={handleInputChange}
                            type="text"
                            class="form-control"
                            id="exampleNic"
                        />
                       {!input.isValidNic && (
                        <span style={{ color: "red" }}>Invalid NIC number</span>
                        )}
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">EMAIL</label>
                        <input
                            name="email"
                            value={input.email}
                            onChange={handleInputChange}
                            type="email"
                            class="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">ADDRESS</label>
                        <input
                            name="address"
                            value={input.address}
                            onChange={handleInputChange}
                            type="text"
                            class="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="designation" class="form-label">DESIGNATION</label>
                        <input
                            name="designation"
                            value={input.designation}
                            onChange={handleInputChange}
                            type="text"
                            class="form-control"
                            id="designation"
                        />
                        
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="salary_amount" class="form-label">SALARY(LKR)</label>
                        <input
                            name="salary"
                            value={input.salary}
                            onChange={handleInputChange}
                            type="text"
                            class="form-control"
                            id="salary_amount"
                        />
                        
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">PHONE NO</label>
                        <input
                            name="phone"
                            value={input.phone}
                            onChange={handleInputChange}
                            type="number"
                            autocomplete="off"
                            class="form-control"
                            id="exampleInputPassword1"
                        />
                        {!input.isValidPhone && (
                        <span style={{ color: "red" }}>Invalid Phone Number</span>
                        )}
                        
                    </div>
                    </div>
                    
                </div>
              
        <div class="my-3">
            <button type="submit" class="btn btn-success me-5">SUBMIT</button>
            <Link to={"/"}><button className='btn btn-danger'>CANCEL</button></Link>
        </div>
            
            </form>
            
        </div>
    )
}

export default Insert