import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
//import {Cookies} from 'react-cookie';;
import SearchBlock from '../TripsAdmin/Search-block2'


export const AllUsers = (props) => {
  //const cookies = new Cookies();
  const [dataUsers_, setDataUsers_] = useState([{
    id:1,
    chkId:'idu',
    name:'USER Id',
},{
    id:2,
    chkId:'userName',
    name:'أسم المستخدم',
},{
    id:3,
    chkId:'name',
    name:'الأسم',
},{
    id:4,
    chkId:'email',
    name:'الأيميل',
},{
    id:5,
    chkId:'phone',
    name:'الهاتف',
},{
    id:6,
    chkId:'company',
    name:'الشركة',
}])

  const currentState = props.location.state;
  const flashMessage = currentState ? currentState.flash : null

  const [show, setShow] = useState(false);
  const [failed, setFailed] = useState(false);
  
  const [admins, setAdmins] = useState({admins: null, limit: 5});
  const [users, setUsers] = useState({users: null, limit: 5});

  const [redirect, setRedirect] = useState({redirect: false, uid: null, user: null})

  useEffect(() => {
    const dataUsers = {'search':'','idu':'','userName':'',
'name':'','email':'',
'phone':'','company':'','rol':'','select':''}
const searchUsers = localStorage.getItem('search')
for (let key in dataUsers){
  if (localStorage.getItem(key)!='false'){
    dataUsers[key] = searchUsers
  }
}
if (localStorage.getItem('select')=='false'){
  dataUsers['select'] = true

}
    const jwt = localStorage.yemenbus_user_jwt ;
    fetch('/api/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({jwt: jwt, permission: 'superadmin_access'})
    }).then(resp => {
      if (resp.ok){
        setShow(true)
      } else {
        setFailed(true);
      }
    })

    fetch('/api/search/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },body:JSON.stringify(dataUsers)
    }).then(resp => {
      resp.json().then(data => {
        if (resp.ok){
          setAdmins({admins: data.admin_users, limit: 5})
          setUsers({users: data.normal_users, limit: 5})
        }
      })
    })
  }, [])

  

  if (failed){
    return <Redirect to="/unauthorized"/>
  }

  const getAccessLevels = (access_level, company) => {
    let curCompany = company || 'غير محدد'
    let levels = {
      'SuperAdmin': ["danger", "مسؤول الموقع"],
      'TripCompany': ["secondary", `إداري الشركة (${curCompany})`],
      'TransCompany': ["secondary", `إداري الشركة (${curCompany})`],
      'TripAdmin': ["primary", "مسؤول رحلات"],
      'TransAdmin': ["primary", "مسؤول معاملات"],
      'hajjAdmin': ["primary", "مسؤول الحج و العمرة"],
      'hajjCompany': ["primary", "شركة حج و عمرة"],
      'Customer': ["warning", "مستخدم غير مفعل"],
    }

    return levels[access_level]
  }

  const LoadAdmins = () => {

    const admins_patch = admins.admins && admins.admins.slice(0, admins.limit)

    return(
      <tbody>
        {admins_patch ? (admins_patch.map((admin, index) => {
          let access_level = getAccessLevels(admin.access_level, admin.company)
          return(
            <tr className="table-light" key={index}>
              <th className="font-weight-bold">{admin.uid}</th>
              <td className="info-weight">{admin.username}</td>
              <td className="info-weight">{admin.fullname}</td>
              <td className="info-weight">{admin.email}</td>
              <td className="info-weight">{admin.phone}</td>
              <td className="info-weight">{admin.company === 'All' ? 'كل الشركات' : admin.company ? admin.company : 'لم يتم تحديد الشركة'}</td>
              <td className={`font-weight-bold text-${access_level[0]}`}>{access_level[1]}</td>
              <td className="font-weight-bold text-danger">
                {admin.access_level === 'SuperAdmin' ? (
                  <button onClick={() => {setRedirect({redirect: true, uid:admin.uid, user: admin})}} className="btn btn-sm btn-outline-secondary">بيانات المستخدم</button>
                ) : (
                  <button onClick={() => {setRedirect({redirect: true, uid:admin.uid, user: admin})}} className="btn btn-sm btn-outline-danger">تعديل المستخدم</button>
                )}
              </td>
            </tr>
          )
        })) : null}
      </tbody>
    )
  }

  const LoadUsers = () => {
    const users_patch = users.users && users.users.slice(0, users.limit)
    return(
      <tbody>
        {users_patch ? (users_patch.map((user, index) => {
          let access_level = getAccessLevels(user.access_level)
          return(
            <tr className="table-light" key={index}>
              <th className="font-weight-bold">{user.uid}</th>
              <td className="info-weight">{user.username}</td>
              <td className="info-weight">{user.fullname}</td>
              <td className="info-weight">{user.email}</td>
              <td className="info-weight">{user.phone}</td>
              <td className="info-weight">{user.company || "لم يتم تحديد الشركة"}</td>
              <td className={`font-weight-bold text-${access_level[0]}`}>{access_level[1]}</td>
              <td className="font-weight-bold text-danger"><button onClick={() => {setRedirect({redirect: true, uid:user.uid, user: user})}} className="btn btn-sm btn-outline-primary">تعديل المستخدم</button></td>
            </tr>
          )
        })) : null}
      </tbody>
    )
  }

  const AddLimit = (e) => {
    if (e.target.id === 'admins' && (admins.limit < admins.admins.length)){
      let new_limit = admins.limit + 10;
      setAdmins({...admins, limit: new_limit})
    }
    if (e.target.id === 'users' && (users.limit < users.users.length)){
      let new_limit = users.limit + 10;
      setUsers({...users, limit: new_limit})
    }
  }

  const ReduceLimit = (e) => {
    
    if (e.target.id === 'admins' && (admins.limit > 10)){
      let new_limit = admins.limit - 10;
      setAdmins({...admins, limit: new_limit})
    }

    if (e.target.id === 'users' && (users.limit > 10)){
      let new_limit = users.limit - 10;
      setUsers({...users, limit: new_limit})
    }
  }

  if (redirect.redirect){
    return <Redirect to={{
      pathname: `/admin/users/${redirect.uid}`,
      state: {user: redirect.user}
    }} />
  }

  return (
    <div className="mb-5 pb-5">
      {show ? (
        <div className="container text-center mt-5 pt-5">
          {flashMessage ? (
            <div className={`mt-4 alert alert-${flashMessage.type}`}>
              <p className="font-weight-bold text-right">
                {flashMessage.name} : {flashMessage.message}
              </p>
            </div>
          ) : null}
          <span className="display-6 text-primary mt-5">
            جميع المستخدمين
          </span>

          <hr/>
          <p className="font-weight-bold text-info"><i className="fa fa-star-of-life fa-xs"/> يتم عرض جميع المستخدمين هنا</p>

          <div className="container mt-5">
            <span className="display-7 mb-2">الإداريين</span>
            <hr/>
            <SearchBlock  data = {dataUsers_}/>

            <div className="table-responsive">
              <table className="table bg-grey  table-bordered mt-5">
                <thead>
                  <tr className="table-secondary">
                    <th scope="col">User ID</th>
                    <th scope="col">إسم المستخدم</th>
                    <th scope="col">الإسم</th>
                    <th scope="col">البريد الإلكتروني</th>
                    <th scope="col">رقم الجوال</th>
                    <th scope="col">الشركة التابعة</th>
                    <th scope="col">مستوى الوصول</th>
                    <th scope="col">تعديل بيانات وصلاحيات المستخدم</th>
                  </tr>
                </thead>
                {LoadAdmins()}
              </table>
            </div>
          
            <div className="justify-content-center">
              {(admins.admins && admins.limit < admins.admins.length) ? (<button id="admins" onClick={AddLimit} className="btn btn-sm btn-outline-success">عرض المزيد</button>) : null}
              {admins.limit> 5 ? (<button id="admins" onClick={ReduceLimit} className="btn btn-sm btn-outline-danger">عرض أقل</button>) : null}
            </div>
          </div>

          <div className="container mt-5">
            <span className="display-7 mb-2">مستخدمين في إنتظار التفعيل</span>
            <hr/>

            <div className="table-responsive">
              <table className="table bg-grey  table-bordered mt-5">
                <thead>
                <tr className="table-secondary">
                    <th scope="col">User ID</th>
                    <th scope="col">إسم المستخدم</th>
                    <th scope="col">الإسم</th>
                    <th scope="col">البريد الإلكتروني</th>
                    <th scope="col">رقم الجوال</th>
                    <th scope="col">الشركة التابعة</th>
                    <th scope="col">مستوى الوصول</th>
                    <th scope="col">تعديل بيانات وصلاحيات المستخدم</th>
                  </tr>
                </thead>
                {LoadUsers()}
              </table>
            </div>
          
            <div className="justify-content-center">
              {(users.users && users.limit < users.users.length) ? (<button id="users" onClick={AddLimit} className="btn btn-sm btn-outline-success">عرض المزيد</button>) : null}
              {users.limit> 5 ? (<button id="users" onClick={ReduceLimit} className="btn btn-sm btn-outline-danger">عرض أقل</button>) : null}
            </div>
          </div>
        </div>
    
      ) : null}
    </div>
  )
}