import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
//import {Cookies} from 'react-cookie';;


export const AdminHome = () => {
  //const cookies = new Cookies();

  // User Authentication
  const [show, setShow] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const jwt = localStorage.yemenbus_user_jwt ;
    fetch('/api/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({jwt: jwt, permission: 'company_access'})
    }).then(resp => {
      if (resp.ok){
        setShow(true)
      } else {
        setFailed(true);
      }
    })
  }, [])

  const AccessLvl = localStorage.access_level;

  const SUPERADMIN = (
    <div className="row justify-content-center">
      
      <div className="col-sm-3">
        <div className="dropdown show">
          <Link to="#" className="btn btn-md btn-outline-info dropdown-toggle font-weight-bold" id="dropdown1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
            إدارة الرحلات
          </Link>

          <div className="dropdown-menu text-right" aria-labelledby="dropdown1">
            <Link className="dropdown-item text-primary" to="/admin/trips/create">إضافة رحلة</Link>
            <Link className="dropdown-item text-primary" to="/admin/trips/offer">إضافة عرض</Link>
            <div className="dropdown-divider"/>
            <Link className="dropdown-item text-primary" to="/admin/trips/orders">الطلبات</Link>
            <div className="dropdown-divider"/>
            <Link className="dropdown-item text-primary" to="/admin/myoffers">عروضي</Link>
            <Link className="dropdown-item text-primary" to="/admin/trips">رحلاتي</Link>
            <div className="dropdown-divider"/>
            <Link className="dropdown-item text-primary" to="/admin/trips-hajj">برامج حج و عمرة</Link>
          </div>
        </div>
      </div>

      <div className="col-sm-3">
        <div className="dropdown show">
          <Link to="#" className="btn btn-md btn-outline-info dropdown-toggle font-weight-bold" id="dropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
            إدارة المعاملات
          </Link>

          <div className="dropdown-menu text-right" aria-labelledby="dropdown2">
            <Link className="dropdown-item text-primary" to="/admin/transactions/offer">إضافة عرض</Link>
            <div className="dropdown-divider"/>
            <Link className="dropdown-item text-primary" to="/admin/transactions/orders">الطلبات</Link>
            <div className="dropdown-divider"/>
            <Link className="dropdown-item text-primary" to="/admin/myoffers">عروضي</Link>
          </div>
        
        </div>
      </div>

      <div className="col-sm-3">
        <div className="dropdown show">
          <Link to="#" className="btn btn-md btn-outline-secondary dropdown-toggle font-weight-bold" id="dropdown1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
            الإدارة
          </Link>

          <div className="dropdown-menu text-right" aria-labelledby="dropdown3">
            <Link className="dropdown-item text-primary" to="/admin/alltrips">إدارة الرحلات</Link>
            <div className="dropdown-divider"/>
            <Link className="dropdown-item text-primary" to="/admin/allorders">إدارة الطلبات</Link>
            <div className="dropdown-divider"/>
          <Link className="dropdown-item text-primary" to="/admin/allorders-hajj">إدارة طلبات الحج و العمرة</Link>
            <div className="dropdown-divider"/>
            <Link className="dropdown-item text-primary" to="/admin/alloffers">إدارة العروض</Link>
            <div className="dropdown-divider"/>
            <Link className="dropdown-item text-primary" to="/admin/alltrips-hajj">إدارة الحج والعمرة</Link>
          </div>
        
        </div>
      </div>

      <div className="col-sm-3">
        <div className="dropdown show">
          <Link to="#" className="btn btn-md btn-outline-danger dropdown-toggle font-weight-bold" id="dropdown4" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
            مسؤول الموقع
          </Link>

          <div className="dropdown-menu text-right" aria-labelledby="dropdown4">
            <Link className="dropdown-item text-primary" to="/admin/companies">الشركات</Link>
            <Link className="dropdown-item text-primary" to="/admin/companies/create">إضافة شركة</Link>
            <div className="dropdown-divider"/>
            <Link className="dropdown-item text-primary" to="/admin/users">المستخدمين</Link>
            <div className="dropdown-divider"/>
            <Link className="dropdown-item text-primary" to="/admin/payments">عمليات الدفع</Link>
          </div>
        
        </div>
      </div>

    </div>
  )

  const TRIPCOMPANY = (      
    <div className="dropdown show">
      <Link to="#" className="btn btn-md btn-outline-info dropdown-toggle font-weight-bold" id="dropdown3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
        إدارة الشركة
      </Link>

      <div className="dropdown-menu text-right" aria-labelledby="dropdown3">
        <Link className="dropdown-item text-primary" to="/admin/trips/create">إضافة رحلة</Link>
        <Link className="dropdown-item text-primary" to="/admin/trips/offer">إضافة عرض</Link>
        <div className="dropdown-divider"/>
        <Link className="dropdown-item text-primary" to="/admin/trips/orders">الطلبات</Link>
        <div className="dropdown-divider"/>
        <Link className="dropdown-item text-primary" to="/admin/myoffers">عروضي</Link>
        <Link className="dropdown-item text-primary" to="/admin/alltrips">رحلاتي</Link>
      </div>
    
    </div>

  )

  const TRANSCOMPANY = (
    <div className="dropdown show">
      <Link to="#" className="btn btn-md btn-outline-info dropdown-toggle font-weight-bold" id="dropdown3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
        إدارة الشركة
      </Link>

      <div className="dropdown-menu text-right" aria-labelledby="dropdown3">
        <Link className="dropdown-item text-primary" to="/admin/transactions/offer">إضافة عرض</Link>
        <div className="dropdown-divider"/>
        <Link className="dropdown-item text-primary" to="/admin/transactions/orders">الطلبات</Link>
        <div className="dropdown-divider"/>
        <Link className="dropdown-item text-primary" to="/admin/myoffers">عروضي</Link>
      </div>
    
    </div>
  )

  const TRIPADMIN = (
    <div className="dropdown show">
      <Link to="#" className="btn btn-md btn-outline-info dropdown-toggle font-weight-bold" id="dropdown3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
        مسؤول رحلات
      </Link>
      <div className="dropdown-menu text-right" aria-labelledby="dropdown3">
        <Link className="dropdown-item text-primary" to="/admin/trips/create">إضافة رحلة</Link>
        <Link className="dropdown-item text-primary" to="/admin/trips/offer">إضافة عرض</Link>
        <div className="dropdown-divider"/>
        <Link className="dropdown-item text-primary" to="/admin/trips/orders">الطلبات</Link>
        <div className="dropdown-divider"/>
        <Link className="dropdown-item text-primary" to="/admin/myoffers">عروضي</Link>
        <Link className="dropdown-item text-primary" to="/admin/trips">رحلاتي</Link>
      </div>
  
    </div>      
  )

  const TRANSADMIN = (
    <div className="dropdown show">
      <Link to="#" className="btn btn-md btn-outline-info dropdown-toggle font-weight-bold" id="dropdown3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
        مسؤول معاملات
      </Link>

      <div className="dropdown-menu text-right" aria-labelledby="dropdown3">
        <Link className="dropdown-item text-primary" to="/admin/transactions/offer">إضافة عرض</Link>
        <div className="dropdown-divider"/>
        <Link className="dropdown-item text-primary" to="/admin/transactions/orders">الطلبات</Link>
        <div className="dropdown-divider"/>
        <Link className="dropdown-item text-primary" to="/admin/myoffers">عروضي</Link>
      </div> 
    
    </div>
  )

  if (failed){
    return <Redirect to="/unauthorized"/>
  }

  return (
    <div className="mb-5 pb-5">
      {show ? (
        <div className="container mt-5 pt-5" >
          <div className="text-dark text-center">
            <h3 className="display-5">صفحة الإدارة  Admin Page</h3>
          </div>
          <div className="container text-center mt-5">
            {AccessLvl === 'SUPERADMIN' ? (SUPERADMIN) : null}
            {AccessLvl === 'TRIPCOMPANY' ? (TRIPCOMPANY) : null}
            {AccessLvl === 'TRANSCOMPANY' ? (TRANSCOMPANY) : null}
            {AccessLvl === 'TRIPADMIN' ? (TRIPADMIN) : null}
            {AccessLvl === 'TRANSADMIN' ? (TRANSADMIN) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}