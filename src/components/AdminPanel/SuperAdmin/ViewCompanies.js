import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import SearchBlock2 from '../TripsAdmin/Search-block2'
//import {Cookies} from 'react-cookie';;


export const AllComapnies = () => {
  //const cookies = new Cookies();

  const [show, setShow] = useState(false);
  const [failed, setFailed] = useState(false);
  
  const [companies, setCompanies] = useState({companies: null, limit: 5});

  const [newCompany, setNew] = useState(false)
  const [dataCompanies_, setDataComanies_] = useState([{
    id:1,
    chkId:'idto',
    name:'Company Id',
},{
    id:2,
    chkId:'company',
    name:'الشركة',
},{
    id:3,
    chkId:'serv',
    name:'الخدمة',
},{
    id:4,
    chkId:'phone',
    name:'الهاتف',
},{
    id:5,
    chkId:'email',
    name:'البريد الالكترونى',
},{
    id:6,
    chkId:'facebook',
    name:'فيس بوك',
},{
    id:7,
    chkId:'whatsapp',
    name:'واتساب',
},{
    id:8,
    chkId:'adminOrders',
    name:'مدير الطلبات',
},{
    id:9,
    chkId:'adminPhone',
    name:'جوال المدير',
},{
  id:10,
  chkId:'adminEmail',
  name:'بريد المدير',
},{
  id:11,
  chkId:'marketers',
  name:'المسوقين',
}])
const dataCompany = {'search':'','idto':'','company':'',
'serv':'','phone':'','email':'','facebook':'','whatsapp':'',
'adminOrders':'','adminPhone':'','adminEmail':'','marketers':'','select':''}

const handleSubmit = (e) => {
  e.preventDefault();
  
}
const handleChange = (e) => {
  e.preventDefault();
  
  localStorage.setItem('search', e.target.value);
}
  useEffect(() => {
    const searchCompany = localStorage.getItem('search')
    for (let key in dataCompany){
      if (localStorage.getItem(key)!='false'){
        dataCompany[key] = searchCompany
      }
    }
    if (localStorage.getItem('select')=='false'){
      dataCompany['select'] = true
    
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

    fetch('/api/search/companies', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body:JSON.stringify(dataCompany)
    }).then(resp => {
      resp.json().then(data => {
        if (resp.ok){
          setCompanies({companies: data.companies, limit: 5})
        }
      })
    })
  }, [])

  

  if (failed){
    return <Redirect to="/unauthorized"/>
  }

  const getService = (service) => {
    let types = {
      TRIPS: 'رحلات وتوصيل طرود',
      TRSA: 'معاملات المقيمين في اليمن',
      IESY: 'تقسيط للجامعات والمعاهد',
      TSEY: 'معاملات السفارة السعودية'
    }

    return types[service]
  }


  const LoadCompanies = () => {

    const companies_patch = companies.companies && companies.companies.slice(0, companies.limit)
    const getProviders = (providers) => {
      return (
        providers.map((provider, index) => {
          return(<p key={index}>- {provider.fullname}</p>)
        })
      )
    }
    return(
      <tbody>
        {companies_patch ? (companies_patch.map((company, index) => {
          return(
            <tr className="table-light" key={index}>
              <th className="font-weight-bold">{company.cid}</th>
              <td className="font-weight-bold text-info">{company.company}</td>
              <td className="info-weight">{getService(company.service)}</td>
              <td className="info-weight">{company.phone}</td>
              <td className="info-weight">{company.email}</td>
              <td className="info-weight">{company.facebook || 'غير مرفق'}</td>
              <td className="info-weight">{company.whatsapp || 'غير مرفق'}</td>
              <td className="info-weight">{company.manager}</td>
              <td className="info-weight">{company.manager_phone}</td>
              <td className="info-weight">{company.manager_email}</td>
              <td className="info-weight">{company.providers.length > 0 ? getProviders(company.providers) : 'لا يوجد'}</td>
            </tr>
          )
        })) : null}
      </tbody>
    )
  }

  const AddLimit = (e) => {
    if (e.target.id === 'companies' && (companies.limit < companies.companies.length)){
      let new_limit = companies.limit + 10;
      setCompanies({...companies, limit: new_limit})
    }
  }

  const ReduceLimit = (e) => {
    
    if (e.target.id === 'companies' && (companies.limit > 10)){
      let new_limit = companies.limit - 10;
      setCompanies({...companies, limit: new_limit})
    }
  }

  if (newCompany){
    return <Redirect to="/admin/companies/create"/>
  }

  return (
    <div className="mb-5 pb-5">
      {show ? (
        <div className="container text-center mt-5 pt-5">
          <span className="display-6 text-primary">
            جميع الشركات
          </span>

          <div className="text-md-left justify-content-sm-center mt-2">
            <button onClick={() => {setNew(true)}} className="btn btn-md btn-outline-primary">إضافة شركة جديده</button>
          </div>
          <hr/>
          <SearchBlock2  data = {dataCompanies_}/>

          <p className="font-weight-bold text-info"><i className="fa fa-star-of-life fa-xs"/> يتم عرض جميع الشركات هنا</p>
          <div className="container mt-5">
            <div className="table-responsive">
              <table className="table bg-grey  table-bordered mt-5">
                <thead>
                  <tr className="table-secondary">
                    <th scope="col">Comapany ID</th>
                    <th scope="col">الشركة</th>
                    <th scope="col">الخدمة المقدمة</th>
                    <th scope="col">الهاتف الثابت</th>
                    <th scope="col">البريد الإلكتروني</th>
                    <th scope="col">الفيسبوك</th>
                    <th scope="col">الواتساب</th>
                    <th scope="col">مدير الطلبات</th>
                    <th scope="col">جوال مدير الطلبات</th>
                    <th scope="col">بريد مدير الطلبات الإلكتروني</th>
                    <th scope="col">أسماء المسوقين</th>
                  </tr>
                </thead>
                {LoadCompanies()}
              </table>
            </div>
          
            <div className="justify-content-center">
              {(companies.companies && companies.limit < companies.companies.length) ? (<button id="companies" onClick={AddLimit} className="btn btn-sm btn-outline-success">عرض المزيد</button>) : null}
              {companies.limit> 5 ? (<button id="companies" onClick={ReduceLimit} className="btn btn-sm btn-outline-danger">عرض أقل</button>) : null}
            </div>
          </div>

        </div>
    
      ) : null}
    </div>
  )
}