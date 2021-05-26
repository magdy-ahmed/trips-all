import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
//import {Cookies} from 'react-cookie';;
import { Modal, Button } from 'react-bootstrap';



export const User = (props) => {
  //const cookies = new Cookies();

  const currentState = props.location.state
  const userInformation = currentState && currentState.user
  
  const { uid } = useParams()

  const [state, setState] = useState({uid: uid, access_level: (userInformation ? userInformation.access_level : null)});

  const [completed, setCompleted] = useState({completed: false, flash: null})
  const [error, setError] = useState({});

  const [companies, setCompanies] = useState([])
  // User Authentication
  const [show, setShow] = useState(false);
  const [failed, setFailed] = useState(false);

  // For Modal
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const jwt = localStorage.yemenbus_user_jwt ;
    fetch('/api/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({jwt: jwt, permission: 'superadmin_access'})
    }).then(resp => {
      resp.json().then(_ => {
        if (resp.ok){
          setShow(true)
        } else {
          setFailed(true);
        }
      })
    })
    fetch('/api/search/companies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },body:JSON.stringify({})
    }).then(resp => {
      resp.json().then(data => {
        if (resp.ok){
          setCompanies(data.companies)
        } else {
          setError({
            CompanyError: {
              name: 'خطأ',
              error: 'حدث خطأ في السيرفر, الرجاء المحاولة من جديد لاحقاً.',
              type: 'danger'
            }
          })
        }
      })
    })
  }, [])


  if (failed){
    return <Redirect to="/unauthorized"/>
  }
  if (!userInformation){
    return <Redirect to="/admin/users"/>
  }

  const userInfo = () => {
    const getAccessLevels = (access_level) => {
      let curCompany = userInformation.company || 'غير محدد'
      let levels = {
        'SuperAdmin': ["danger", "مسؤول الموقع"],
        'TripCompany': ["secondary", `إداري الشركة (${curCompany})`],
        'TransCompany': ["secondary", `إداري الشركة (${curCompany})`],
        'TripAdmin': ["primary", "مسؤول رحلات"],
        'TransAdmin': ["primary", "مسؤول معاملات"],
        'hajjAdmin': ["primary", "مسؤول حج وعمرة"],
        'hajjAdmin': ["primary", "مدير شركة حج وعمرة"],
        'Customer': ["warning", "مستخدم غير مفعل"],
      }
  
      return levels[access_level]
    }
    let access_level = getAccessLevels(userInformation.access_level)
    return (
      <div className="container text-center mt-4">
        <span className="display-6 text-info font-weight-bold">معلومات المستخدم</span>
        <hr/>
        <div className="container">

          <div className="mt-2">
            <span className="font-weight-bold">الإسم الكامل : </span>
            {userInformation.fullname}
            <br/>
            <br/>
            <span className="font-weight-bold">إسم المستخدم : </span>
            {userInformation.username}
          </div>

          <hr/>

          <div className="mt-2">
            <span className="font-weight-bold">البريد الإلكتروني : </span>
            <p className="pt-2">{userInformation.email}</p>

            <span className="font-weight-bold">رقم الجوال : </span>
            <p className="pt-2" dir='ltr'>{userInformation.phone}</p>

            <span className="font-weight-bold">الشركة الحالية : </span>
            {userInformation.company === 'All' ? (
              <p className="pt-2">جميع الشركات</p>
            ) : (
              <p className="pt-2">{userInformation.company || 'لا يوجد'}</p>
            )}
          </div>

          <hr/>

          <div className="mt-2">
            <span className="font-weight-bold">مستوى الوصول :</span>
            <p className={`break-line pt-2 font-weight-bold text-${access_level[0]}`}>{access_level[1]}</p>
          </div>


        </div>
      </div>
      
    )
  }

  const handleChange = (e) => {
    e.preventDefault();
    setError({});

    if (e.target.id === 'access_level'){
      setState({
        ...state,
        company: null,
        [e.target.id]: e.target.value
      })
    } else {
      setState({
        ...state,
        [e.target.id]: e.target.value
      })
    }

    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const changeUserPermissions = async() => {
      await fetch('/api/companies/providers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(state)
      }).then(resp => {
        resp.json().then(data => {
          if (resp.ok){
            setCompleted({completed: true, flash: null})
          } else {
            console.log(data)
            if (data.code === 'INVALID_REQUEST'){
              setError({
                CompanyError: {
                  name: 'خطأ',
                  error: 'يجب تعبئة خانة واحدة على الأقل.',
                  type: 'warning'
                }
              })
            }
            if (data.code === 'COMPANY'){
              setError({
                CompanyError: {
                  name: 'شركة',
                  error: 'لا توجد شركة لتعيين المستخدم لها, الرجاء إضافة شركة أولاً',
                  type: 'warning'
                }
              })
            }
            if (data.code === 'SERVER'){
              setError({
                CompanyError: {
                  name: 'خطأ',
                  error: 'حدث خطأ في السيرفر, الرجاء المحاولة من جديد لاحقاً.',
                  type: 'danger'
                }
              })
            }
          }
        })
      })
    }

    changeUserPermissions();
  }

  const handleDeleteUser = (e) => {
    e.preventDefault();

    const DeleteUser = async() => {
      await fetch(`/api/users/${uid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(resp => {
        resp.json().then(_ => {
          if (resp.ok){
            setCompleted({
              completed: true,
              flash: {
                name: `حذف المستخدم ${uid}#`,
                message: 'تم حذف المستخدم بنجاح',
                type: 'success'
              }
            })
          } else {
            setError({
              deleteError: {
                name: 'حذف المستخدم',
                error: 'حدث خطأ أثناء محاولة حذف المستخدم, الرجاء المحاولة من جديد لاحقاً.',
                type: 'warning'
              }
            })
          }
        })
      })
    }

    DeleteUser();
    setOpen(false)
  }

  const userForm = () => {
    const getService = (service) => {
      let types = {
        TRIPS: 'رحلات وتوصيل طرود',
        hajj: 'رحلات حج و عمرة',
        TRSA: 'معاملات المقيمين في اليمن',
        IESY: 'تقسيط للجامعات والمعاهد',
        TSEY: 'معاملات السفارة السعودية'
      }
  
      return types[service]
    }

    return(
      <form onSubmit={handleSubmit} className="container text-center" name="offerForm">
        
        {userInformation.access_level === 'SuperAdmin' ? (
          <div className="form-inline justify-content-center mt-4">

            <label htmlFor="access_level" className="ml-sm-4 mr-md-4 font-weight-bold">مستوى الوصول : </label>
            <div className="input-group">
              <input type="text" disabled value="لا يمكن تغييره لهذا المستخدم" className="form-control"/>
            </div>

          </div>
        ) : (
          <div className="form-inline justify-content-center mt-4">

            <label htmlFor="access_level" className="ml-sm-4 mr-md-4 font-weight-bold">مستوى الوصول : </label>
            <div className="input-group">
              <select onChange={handleChange} id="access_level" value={state.access_level ? state.access_level : (userInformation.access_level ? userInformation.access_level : '')} className="custom-select font-weight-bold">
                <option value="" defaultValue>مستوى الوصول</option>
                <option className="font-weight-bold" value="TripCompany">إدارة شركة الرحلات</option>
                <option className="font-weight-bold" value="TransCompany">إدارة شركة المعاملات</option>
                <option className="font-weight-bold" value="hajjCompany">إدارة شركة الحج والعمرة</option>

                <option className="font-weight-bold" value="TripAdmin">مسؤول رحلات</option>
                <option className="font-weight-bold" value="TransAdmin">مسؤول معاملات</option>
                <option className="font-weight-bold" value="hajjAdmin">مسؤول حج وعمرة</option>
              </select>
            </div>

          </div>
        )}

        

        {userInformation.access_level !== 'Customer' || (state.access_level && state.access_level !== 'Customer') ? (
          <div className="form-inline justify-content-center mt-4">
            <label htmlFor="company" className="ml-sm-4 mr-md-4 font-weight-bold">تعيين كمسوق شركة لـ : </label>
            <div className="input-group">
              <select onChange={handleChange} id="company" value={state.company ? state.company : (userInformation.company ? userInformation.company : '')} className="custom-select font-weight-bold">
                <option className="font-weight-bold" value="" defaultValue>حدد الشركة</option>
                {companies ? (companies.map((company, index) => (
                  <option className="font-weight-bold" value={company.company} key={index}>{company.company} - ({getService(company.service)})</option>
                ))) : null}
              </select>
            </div>
          </div>
        ) : null}

        

        <div className="input-group justify-content-center mt-4">
          <button type="submit" className="btn btn-md btn-outline-success">تغيير الصلاحيات</button>
        </div>

      </form>
    )
  }

  const loadErrors = () => {
    if (Object.keys(error).length !== 0 && error.constructor === Object){
      return (
        <div>
          {error ? Object.entries(error).map((e, id) => {
            return (
              <div key={id} className={`alert alert-${e[1].type} text-right`}>
                <p className="font-weight-bold">
                  {e[1].name} : {e[1].error}
                </p>
              </div>
            )
          }): null}
        </div>
      )
    }
  }

  if (completed.completed){
    return <Redirect to={{
      pathname: '/admin/users',
      state: {flash: completed.flash}
    }} />
  }

  return (
    <div className="mb-5 pb-5">

      {show ? (
        <div className="container text-center mt-5 pt-5">
          <div className="card p-3 shadow bg-grey">
            <span className="card-title display-6">تعديل صلاحيات المستخدم (<i className="tc text-secondary">{uid}#</i>)</span>
            <hr/>
            <div className="card-body text-center">
              
              <div className="mt-3">

                {userInfo()}
                {state.access_level === 'SuperAdmin' ? null : (
                  <div>
                    
                    <span className="display-6 font-weight-bold text-primary">تغيير صلاحيات المستخدم</span>
                    <hr/>
                    {loadErrors()}

                    {userForm()}

                    <div className="input-group justify-content-center mt-2">
                      <button onClick={() => setOpen(true)} className="btn btn-sm btn-danger">حذف المستخدم</button>
                    </div>

                    <Modal show={isOpen} onHide={() => {setOpen(false)}}>
                      <Modal.Header closeButton>
                        <Modal.Title className="text-warning">حذف المستخدم</Modal.Title>
                      </Modal.Header>
                      <Modal.Body className="font-weight-bold">
                        هل أنت متأكد من حذف هذا المستخدم, لا يمكن إلغاء الحذف لاحقاً!
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="grey" onClick={() => {setOpen(false)}}>
                          إلغاء
                        </Button>
                        <Button variant="danger" onClick={handleDeleteUser}>
                          تأكيد
                        </Button>
                      </Modal.Footer>
                    </Modal>

                  </div>
                )}
                
              </div>
            </div>
          </div>
        </div>

      ) : null}
    </div>
  )
}