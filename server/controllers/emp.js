import empModel from "../models/emp.js"

class empController{
    static getAllEmp = async (req, res) => {
        try {
            //try & catch error execution
            const allEmp = await empModel.find({});
            if(allEmp){
                return res.status(200).json(allEmp);
            }
        } catch (error) {
            return res.status(400).json(error);
        }
    };

    static createEmp = async (req, res) => {
        const {empid, name, nic, email, address,designation, salary, phone} = req.body;
        try {
            if(empid && name && nic && email && address && designation&& salary && phone){
                const newEmp = empModel({
                    empid,
                    name,
                    nic,
                    email,
                    address,
                    designation,
                    salary,
                    phone,
                });

                const saved_emp = await newEmp.save();
                if(saved_emp){
                    return res.status(201).json(saved_emp);
                }
                else{
                    return res.status(400).json({message: "wrong"});
                }
            }
            else{
                return res.status(400).json({message: "all feilds are required"});
            }
        } catch (error) {
            return res.status(400).json(error);
        }
    };

    static getSingleEmp = async (req, res) => {
        const {id} = req.params;
        try {
            if(id){
                const getSingleData = await empModel.findById(id);
                return res.status(200).json(getSingleData);
            }
            else{
                return res.status(400).json({message: "id not found"});
            }
        } catch (error) {
            return res.status(400).json(error);
        }
    };

    static updateEmp = async (req, res) => {
        const {id} = req.params;
        try {
            if(id){
                const getUpdatedData = await empModel.findByIdAndUpdate(id, req.body);
                return res.status(200).json(getUpdatedData);
            }
            else{
                return res.status(400).json({message: "id not found"});
            }
        } catch (error) {
            return res.status(400).json(error);
        }
    };

    static deleteEmp = async (req, res) => {
        const {id} = req.params;
        try {
            if(id){
                const getDeleteData = await empModel.findByIdAndDelete(id);
                return res.status(200).json(getDeleteData);
            }
            else{
                return res.status(400).json({message: "id not found"});
            }
        } catch (error) {
            return res.status(400).json(error);
        }
    }; 
    static getsearchemployee=async(req,res)=>{
        const { query } = req;
        const { name, empid } = query;
        
        try {
            let searchResults = [];
        
            if (name && empid) {
              // If both name and distributor ID are present in the query parameters
              searchResults = await empModel.find({
                $or: [
                  { name: { $regex: new RegExp(name, 'i') } },
                  { empid: { $regex: new RegExp(empid, 'i') } },
                ]
              });
            } else if (name) {
              // If only name is present in the query parameters
              searchResults = await empModel.find({
                name: { $regex: new RegExp(name, 'i') }
              });
            } else if (empid) {
              // If only distributor ID is present in the query parameters
              searchResults = await empModel.find({
                empid: { $regex: new RegExp(empid, 'i') }
              });
            }
        
            return res.status(200).json(searchResults);
          } catch (error) {
            return res.status(400).json(error);
          }
    };
}

export default empController;