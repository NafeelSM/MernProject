import React,{useEffect,useState}from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useParams,useNavigate} from 'react-router-dom';


function Edit() {
    const navigate=useNavigate();
    const {id}=useParams();
 
    const [input, setInput] = useState({
        empid: "",
        name: "",
        nic: "",
        email: "",
        address: "",
        salary: "",
        phone: "",
        designation: "",
        
    });

  
    useEffect(() => {
        const getAllData = async () => {
            const res=await axios.get(`http://localhost:7000/api/v1/emp/single/${id}`);
          const data = res.data;
          data.isValidPhone = true;
          data.isValidNic=true; // Set isValidContact_No to true
          setInput(data);
          console.log("dis:", setInput);
        };
        getAllData();
               },[id]);
    
    const handleUpdate=async (e) =>{
    e.preventDefault();
   
    const result = await Swal.fire({
        title: 'ARE YOU SURE?',
        text: "DO YOU WANT TO UPDATE THIS",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#32dd32',
        cancelButtonColor: '#da2424',
        confirmButtonText: 'YES'
      });
     if(result.isConfirmed){await axios.put(`http://localhost:7000/api/v1/emp/${id}`, input);
     navigate('/edit');
     }else{
        navigate('/edit');
     }
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        let isValidPhone = input.isValidPhone
        let isValidNic=input.isValidNic
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

        setInput({ ...input, [name]: value,
            isValidPhone: isValidPhone,
            isValidNic:isValidNic
     });
        
        
      };
    
  return (
    <div className='container'>
    <form onSubmit={handleUpdate}>
    <div className='row'>
                    <h4><b>EMPLOYEE DETAILS</b></h4><br></br>
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
                            type="salary_amount"
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
                            id="exampleInputPassword1"
                        />
                          {!input.isValidNic && (
                        <span style={{ color: "red" }}>Invalid NIC Number</span>
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
                        <label for="exampleInputPassword1" class="form-label">DESIGNATION</label>
                        <input
                            name="designation"
                            value={input.designation}
                            onChange={handleInputChange}
                            type="text"
                            class="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">SALARY(LKR)</label>
                        <input
                            name="salary"
                            value={input.salary}
                            onChange={handleInputChange}
                            type="number"
                            class="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">PHONE NO</label>
                        <input
                            name="phone"
                            value={input.phone}
                            onChange={handleInputChange}
                            type="number"
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
            <button type="submit" class="btn btn-primary me-5">UPDATE</button>
        </div>
    </form>
    </div>
    )
}

export default Edit