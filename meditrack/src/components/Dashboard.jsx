import React, {useEffect, useState} from 'react';
import PatientList from './PatientList';
import DoctorDashboard from './DoctorDashboard';
import Navbar from './Navbar'
const Dashboard = props => {
    const [patientsArray, setPatientsArray] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [doctorstatus, setdoctorstatus] =useState(false);
    const[fetchURL, setFetchURL]=useState("/api/dashboard")
    const [DocAppointArray, setDocAppointArray]=useState([]);
useEffect(()=>{
const isdoctorornot=async()=>{
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }
    try{

        const isdoctor = await getCookie('doctor');
        console.log('isdoctor',isdoctor);
        if(isdoctor==="true"){
            console.log('setting doctorstatus to true');
        setdoctorstatus(true);  
        setFetchURL("/api/dashboard/doctor");
        } 
    }
    catch(err){
        console.log(err);
    }
}
isdoctorornot();
    },[]
    )

useEffect( () => {
        // console.log("useEffect fetch")
        fetch(fetchURL)
        .then((data) => data.json()) 
        .then((data) => {
            console.log(data)
            setFirstName(data.firstName);
            if(doctorstatus){
                setDocAppointArray(data.appointments);
            }
            else{

                setPatientsArray(data.patients);
            }

        })
        .catch(() => console.log("error in dashboard.js"))

    }, [doctorstatus,fetchURL]);
    
    const handleAddPatient = () => {
        
            // let update = [...patientsArray];
            const newPatient = {
                firstName,
                lastName,
                age,
                weight
            }
        fetch(`/api/addPatient`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newPatient)//removed id temporarily JB 7/21
        }).then((data => {
            console.log(data)
            reloadPatients();
        }))
    }

    const reloadPatients = () => {
        fetch(`/api/dashboard`)
        .then((data) => data.json()) 
        .then((data) => {
            // console.log(data);
            setPatientsArray(data.patients);
        })
        // .then(data => console.log("log" ,data))
        .catch(() => console.log("got nothing"))
    }

    return (
        <div>
        <Navbar />
        <div className = 'dashboard-container'>
            <h2>Welcome, {firstName}!</h2>
            {
                !doctorstatus &&
                <div className="patientscontainer">
                <h3 className="patients-header">Patients</h3>
                <div className="patients-container">
                {patientsArray && <PatientList className="patients-list" patients = { patientsArray } handleAddPatient={handleAddPatient}></PatientList>}
                </div>
                <form className="form-input" id="add-patient-form" onSubmit={(event) => {
                    event.preventDefault();
                    handleAddPatient();
                    }}>
                    <span className="add-patient">Add Patient</span>
                    <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e)=>setFirstName(e.target.value)}
                    >
                    </input>
                    <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e)=>setLastName(e.target.value)}
                    >
                    </input>
                    <input
                    type="text"
                    placeholder="Age"
                    value={age}
                    onChange={(e)=>setAge(e.target.value)}
                    >
                    </input>
                    <input
                    type="text"
                    placeholder="Weight"
                    value={weight}
                    onChange={(e)=>setWeight(e.target.value)}
                    >
                    </input><br></br>
                    <input type="submit"></input>
                </form>
                    </div>
            }
        {
            doctorstatus &&
            <DoctorDashboard className="doctordashboard" DocAppointArray={DocAppointArray}>
            </DoctorDashboard>
        }
        </div>
        </div>
    );
};

export default Dashboard;