import  React ,{useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter,ModalHeader} from 'reactstrap';
function App() {
const baseurl="http://localhost:38149/api/contacts";
const [data, setData]=useState([]);
const[modalInsert,setModalInsert]=useState(false);
const[modalEdit,setModalEdit]=useState(false);
const[modalDelete,setModalDelete]=useState(false);
const[selectedContact, setSelectedContact]=useState({
  id:'',
  firstName:'',
  lastName:'',
  middleName:'',
  phoneCell:'',
  phoneOffice:'',
  email:'',
  address:''
})

const handleChange=e=>{
const{name,value}=e.target;
setSelectedContact({
    ...selectedContact,
    [name]:value
  });
  console.log(selectedContact);
}

const openCloseInsertModal=()=>{
  setModalInsert(!modalInsert);
}

const openCloseEditModal=()=>{
  setModalEdit(!modalEdit);
}

const openCloseDeleteModal=()=>{
  setModalDelete(!modalDelete);
}

const get=async()=>{
  await axios.get(baseurl)
  .then(response=>{
    setData(response.data);
  }).catch(error=>{
    console.log(error);
  })
}

const post=async()=>{
  delete selectedContact.id;
  await axios.post(baseurl,selectedContact)
  .then(response=>{
    setData(data.concat(response.data));
    openCloseInsertModal();
  }).catch(error=>{
    console.log(error);
  })
}

const put=async()=>{
  await axios.put(baseurl + "/" + selectedContact.id,selectedContact)
  .then(response=>{
    var answer=response.data;
    var aux=data;
    aux.map(contact=>{
      if(contact.id===selectedContact.id){
        contact.firstName=answer.firstName;
        contact.lastName=answer.lastName;
        contact.middleName=answer.middleName;
        contact.phoneCell=answer.phoneCell;
        contact.phoneOffice=answer.phoneOffice;
        contact.email=answer.email;
        contact.address=answer.address;
      }
    });
    openCloseEditModal();
  }).catch(error=>{
    console.log(error);
  })
}

const deleteContact =async()=>{
  await axios.delete(baseurl + "/" + selectedContact.id)
  .then(response=>{
    setData(data.filter(contact=>contact.id!==response.data.id));
    openCloseDeleteModal();
  }).catch(error=>{
    console.log(error);
  })
}

const selectContact=(contact, flag)=>{
  setSelectedContact(contact);
  (flag==="Edit")?
  openCloseEditModal(): openCloseDeleteModal();
}

useEffect(()=>{
  get();
},[])

  return (
    <div className="App">
      <br/>
      <br/>
      <button onClick={()=>openCloseInsertModal()} className="btn btn-success">Add New Contact</button>
      <br/>
      <br/>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Middle Name</th>
            <th>Phone Cell</th>
            <th>Phone Office</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(contact=>(
            <tr key={contact.id}> 
            <td>{contact.id}</td>
            <td>{contact.firstName}</td>
            <td>{contact.lastName}</td>
            <td>{contact.middleName}</td>
            <td>{contact.phoneCell}</td>
            <td>{contact.phoneOffice}</td>
            <td>{contact.email}</td>
            <td>{contact.address}</td>
            <td>
              <button className="btn btn-primary" onClick={()=>selectContact(contact,"Edit")}>Edit</button>{"  "}
              <button className="btn btn-danger" onClick={()=>selectContact(contact,"Delete")}>Delete</button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      <Modal isOpen={modalInsert}>
        <ModalHeader>Add New Contact </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>First Name</label>
            <br/>
            <input type="text" className="form-control" name="firstName" onChange={handleChange}/>
            <br/>
            <label>Last Name</label>
            <br/>
            <input type="text" className="form-control" name="lastName" onChange={handleChange}/>
            <br/>
            <label>Middle Name</label>
            <br/>
            <input type="text" className="form-control" name="middleName" onChange={handleChange}/>
            <br/>
            <label>Phone Cell</label>
            <br/>
            <input type="text" className="form-control" name="phoneCell" onChange={handleChange}/>
            <br/>
            <label>Phone Office</label>
            <br/>
            <input type="text" className="form-control" name="phoneOffice" onChange={handleChange}/>
            <br/>
            <label>Email</label>
            <br/>
            <input type="text" className="form-control" name="email" onChange={handleChange}/>
            <br/>
            <label>Address</label>
            <br/>
            <input type="text" className="form-control" name="address" onChange={handleChange}/>
            <br/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>post()}>Add</button>{"  "}
          <button className="btn btn-danger" onClick={()=>openCloseInsertModal()}>Cancel</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEdit}>
        <ModalHeader>Edit Contact </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Id:</label>
            <br/>
            <input type="text" className="form-control" readOnly value={selectedContact && selectedContact.id} />
            <br/>
            <label>First Name</label>
            <br/>
            <input type="text" className="form-control" name="firstName" onChange={handleChange} value={selectedContact && selectedContact.firstName}/>
            <br/>
            <label>Last Name</label>
            <br/>
            <input type="text" className="form-control" name="lastName" onChange={handleChange} value={selectedContact && selectedContact.lastName}/>
            <br/>
            <label>Middle Name</label>
            <br/>
            <input type="text" className="form-control" name="middleName" onChange={handleChange} value={selectedContact && selectedContact.middleName}/>
            <br/>
            <label>Phone Cell</label>
            <br/>
            <input type="text" className="form-control" name="phoneCell" onChange={handleChange} value={selectedContact && selectedContact.phoneCell}/>
            <br/>
            <label>Phone Office</label>
            <br/>
            <input type="text" className="form-control" name="phoneOffice" onChange={handleChange} value={selectedContact && selectedContact.phoneOffice}/>
            <br/>
            <label>Email</label>
            <br/>
            <input type="text" className="form-control" name="email" onChange={handleChange} value={selectedContact && selectedContact.email}/>
            <br/>
            <label>Address</label>
            <br/>
            <input type="text" className="form-control" name="address" onChange={handleChange} value={selectedContact && selectedContact.address}/>
            <br/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>put()}>Save</button>{"  "}
          <button className="btn btn-danger" onClick={()=>openCloseEditModal()}>Cancel</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalDelete}>
        <ModalHeader>Delete Contact </ModalHeader>
        <ModalBody>
          Are you sure that you want to delete the contact?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>deleteContact()}>Yes</button>
          <button className="btn btn-secondary" onClick={()=>openCloseDeleteModal()}>No</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
