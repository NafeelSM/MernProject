import React,{useState,useEffect,useRef} from 'react'
import axios from "axios";
import {useReactToPrint} from "react-to-print"; //useReactToPrint used to print out the contents


function Emp_details() {
  const[render]=useState(false);
  const [employees,setEmployees]=useState([]);
  const [value, setValue] = useState("");


useEffect(()=>{
     const getAllData=async()=>{
           const res=await axios.get("http://localhost:7000/api/v1/emp");
           setEmployees(res.data);
     };
     getAllData();
            },[render]);

        const handleSearch = async (e) => {
              e.preventDefault();
              try {
                const res = await axios.get(`http://localhost:7000/api/v1/emp/search?empid=${value}&name=${value}}`);
                setEmployees(res.data);
                setValue("");
              } catch (error) {
                console.log(error);
              }
            };

            const componentPDF=useRef();
            const generatePDF=useReactToPrint({
                content: ()=>componentPDF.current,
                documentTitle:"employee Data",
                //onAfterPrint:()=>alert("Data saved in PDF")
            });
            const CompanyLogo = () => {
              return (
                <div className='header'>
                   <img src =  './icon.png' alt="icon" style={{ maxWidth: '10%', height: 'auto' }} />
                   <p>Ragama Pharmacy<br></br>
                    247,main street <br></br>
                    Gampaha
                  </p>
                </div>
              );
            };
           
  return (
    
          <div className='container' >
         
    <form class="d-flex" role="search"   onSubmit={handleSearch}>
      <input class="form-control me-2"
       type="search"
        placeholder="Emp ID" 
        aria-label="Search"
        value={value}
        onChange={(e)=>setValue(e.target.value)}/>
      <button class="btn btn-outline-success" type="submit">SEARCH</button>
    </form>
    <button class="btn btn-primary" onClick={generatePDF} >PRINT REPORT</button>
<div ref={componentPDF} style={{width:'100%'}}>
  <CompanyLogo/>
  
<br></br>
            
<h2 class="text-center"><b>ALL EMPLOYEE DETAILS</b></h2>

              <table class="table">
                  <thead>
                      <tr style={{ backgroundColor:'#0d0d0d' , color:'white'  }}>
                          <th scope="col">NO</th>
                          <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">NIC</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col">ADDRESS</th>
                            <th scope="col">DESIGNATION</th>
                            <th scope="col">SALARY(LKR)</th>
                            <th scope="col">PHONE NO</th>
                            
                            
                      </tr>
                  </thead>
                  <tbody>
                     {employees && employees.map((employee,index)=>{
                      return (
                        <tr key={employee._id}>
                        <td>{index + 1}</td>
                          <td>{employee.empid}</td>
                          <td>{employee.name}</td>
                          <td>{employee.nic}</td>
                          <td>{employee.email}</td>
                          <td>{employee.address}</td>
                          <td>{employee.designation}</td>
                          <td>{employee.salary}</td>
                          <td>{employee.phone}</td>
                      </tr>
                      )
                     })}
                      
                  </tbody>
              </table>
          </div>
          </div>
      
  )
}

export default Emp_details