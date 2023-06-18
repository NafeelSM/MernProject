import React,{useState,useEffect}from 'react';
import axios from "axios";

function Home() {
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
      
      <h2 class="text-center"><b> ALL EMPLOYEE DETAILS</b></h2>
            
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
                       {employees&& employees.map((employee,index)=>{
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
        
    )
}

export default Home