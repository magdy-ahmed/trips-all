import React, { useEffect } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import $ from 'jquery';
import {Cookies} from 'react-cookie';



const AdminNav = () => {

  // useEffect(() => {
  //   // add padding top to show content behind navbar
  //   // $('body').css('padding-top', $('.navbar').outerHeight() + 'px')

  //   // detect scroll top or down
  //   if ($('.smart-scroll').length > 0) { // check if element exists
  //       var last_scroll_top = 0;
  //       $(window).on('scroll', function() {
  //           let scroll_top = $(this).scrollTop();
  //           if(scroll_top < last_scroll_top) {
  //               $('.smart-scroll').removeClass('scrolled-down').addClass('scrolled-up');
  //           }
  //           else {
  //               $('.smart-scroll').removeClass('scrolled-up').addClass('scrolled-down');
  //           }
  //           last_scroll_top = scroll_top;
  //       });
  //   }
  // }, [])

  const cookies = new Cookies();
  const AccessLvl = localStorage.access_level;

  const handleLogout = (e) => {
    e.preventDefault();
    const Logout = async() => {
      await fetch('/api/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(resp => {
        resp.json().then(_ => {
          // document.cookie = "yemenbus_user_jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC"
          cookies.remove('yemenbus_user_jwt', {path: '/'})
          localStorage.removeItem('yemenbus_user_jwt')
          localStorage.removeItem('access_level')
          window.location.pathname = '/'
        })
      })
    }
    Logout();
  }

  const current_user = localStorage.yemenbus_user_jwt

  const LoginLinks = (
    <ul className="navbar-nav flex-row">
      <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
        <Link to="#" onClick={handleLogout} className="btn btn-sm font-weight-bold btn-outline-danger">
          <i title="تسجيل الخروج" className="fas fa-sign-out-alt"/>
          <span className="mobile-hidden"> خروج</span>
        </Link>
      </li>
    </ul>
  )

  const LogoutLinks = (
    <ul className="navbar-nav flex-row">

      <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
        <Link to="/login"className="btn btn-sm font-weight-bold btn-outline-success">
          <i title="تسجيل الدخول" className="fa fa-sign-in-alt"/>
          <span className="mobile-hidden"> دخول</span>
        </Link>
      </li>

      <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
        <Link to="/register" className="btn btn-sm font-weight-bold btn-outline-primary">
          <i title="تسجيل مشترك جديد" className="fas fa-user-plus"/>
          <span className="mobile-hidden"> جديد</span>
        </Link>
      </li>

      <li className="nav-item mobile-hidden" data-toggle="collapse" data-target=".navbar-collapse.show">
        <Link to="/reset" className="nav-link text-dark">
          <i title="إعادة تعيين كلمة المرور" className="fa fa-unlock-alt"/>
        </Link>
      </li>
    
    </ul>
  )

  const SUPERADMIN = (
    <ul className="navbar-nav font-weight-nav mr-auto ml-5">

      <li className="nav-item dropdown" data-toggle="collapse" data-target=".navbar-collapse.show">
              
        <Link to="#" className="nav-link text-info font-weight-nav dropdown-toggle" id="dropdown3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
          الرحلات
        </Link>
        <div className="dropdown-menu text-right" aria-labelledby="dropdown3">
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
      
      </li>

      <li className="nav-item dropdown" data-toggle="collapse" data-target=".navbar-collapse.show">
              
        <Link to="#" className="nav-link text-info font-weight-nav dropdown-toggle" id="dropdown3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
          المعاملات
        </Link>
        <div className="dropdown-menu text-right" aria-labelledby="dropdown3">
          <Link className="dropdown-item text-primary" to="/admin/transactions/offer">إضافة عرض</Link>
          <div className="dropdown-divider"/>
          <Link className="dropdown-item text-primary" to="/admin/transactions/orders">الطلبات</Link>
          <div className="dropdown-divider"/>
          <Link className="dropdown-item text-primary" to="/admin/myoffers">عروضي</Link>
        </div>
      
      </li>

      <li className="nav-item dropdown" data-toggle="collapse" data-target=".navbar-collapse.show">
              
        <Link to="#" className="nav-link text-info font-weight-nav dropdown-toggle" id="dropdown3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
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
          <Link className="dropdown-item text-primary" to="/admin/alltrips-hajj">إدارة الحج و العمرة</Link>
        </div>
      
      </li>

      <li className="nav-item dropdown" data-toggle="collapse" data-target=".navbar-collapse.show">
              
        <Link to="#" className="nav-link text-info font-weight-nav dropdown-toggle" id="dropdown3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
          مسؤول الموقع
        </Link>
        <div className="dropdown-menu text-right" aria-labelledby="dropdown3">
          <Link className="dropdown-item text-primary" to="/admin/companies">الشركات</Link>
          <Link className="dropdown-item text-primary" to="/admin/companies/create">إضافة شركة</Link>
          <div className="dropdown-divider"/>
          <Link className="dropdown-item text-primary" to="/admin/users">المستخدمين</Link>
          <div className="dropdown-divider"/>
          <Link className="dropdown-item text-primary" to="/admin/payments">عمليات الدفع</Link>
        </div>
      
      </li>

      <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
        <Link onClick={handleLogout} to="#" className="nav-link text-secondary font-weight-nav">الصفحة الرئيسية</Link>
      </li>
    
    </ul>
  )
  const TRIPCOMPANY = (
    <ul className="navbar-nav font-weight-nav mr-auto ml-5">

      <li className="nav-item dropdown" data-toggle="collapse" data-target=".navbar-collapse.show">
              
        <Link to="#" className="nav-link text-info font-weight-nav dropdown-toggle" id="dropdown3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
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
      
      </li>

      <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
        <Link onClick={handleLogout} to="#" className="nav-link text-secondary font-weight-nav">الصفحة الرئيسية</Link>
      </li>
    
    </ul>
  )
  const TRANSCOMPANY = (
    <ul className="navbar-nav font-weight-nav mr-auto ml-5">

      <li className="nav-item dropdown" data-toggle="collapse" data-target=".navbar-collapse.show">
              
        <Link to="#" className="nav-link text-info font-weight-nav dropdown-toggle" id="dropdown3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
          إدارة الشركة 
        </Link>
        <div className="dropdown-menu text-right" aria-labelledby="dropdown3">
          <Link className="dropdown-item text-primary" to="/admin/transactions/offer">إضافة عرض</Link>
          <div className="dropdown-divider"/>
          <Link className="dropdown-item text-primary" to="/admin/transactions/orders">الطلبات</Link>
          <div className="dropdown-divider"/>
          <Link className="dropdown-item text-primary" to="/admin/myoffers">عروضي</Link>
        </div>
      
      </li>

      <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
        <Link onClick={handleLogout} to="#" className="nav-link text-secondary font-weight-nav">الصفحة الرئيسية</Link>
      </li>
    
    </ul>
  )
  const TRIPADMIN = (
    <ul className="navbar-nav font-weight-nav mr-auto ml-5">

      <li className="nav-item dropdown" data-toggle="collapse" data-target=".navbar-collapse.show">
              
        <Link to="#" className="nav-link text-info font-weight-nav dropdown-toggle" id="dropdown3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
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
      
      </li>

      <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
        <Link onClick={handleLogout} to="#" className="nav-link text-secondary font-weight-nav">الصفحة الرئيسية</Link>
      </li>
    
    </ul>
  )
  const TRANSADMIN = (
    <ul className="navbar-nav font-weight-nav mr-auto ml-5">

      <li className="nav-item dropdown" data-toggle="collapse" data-target=".navbar-collapse.show">
              
        <Link to="#" className="nav-link text-info font-weight-nav dropdown-toggle" id="dropdown3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
          مسؤول معاملات
        </Link>
        <div className="dropdown-menu text-right" aria-labelledby="dropdown3">
          <Link className="dropdown-item text-primary" to="/admin/transactions/offer">إضافة عرض</Link>
          <div className="dropdown-divider"/>
          <Link className="dropdown-item text-primary" to="/admin/transactions/orders">الطلبات</Link>
          <div className="dropdown-divider"/>
          <Link className="dropdown-item text-primary" to="/admin/myoffers">عروضي</Link>
        </div>
      
      </li>

      <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
        <Link onClick={handleLogout} to="#" className="nav-link text-secondary font-weight-nav">الصفحة الرئيسية</Link>
      </li>
    
    </ul>
  )
  
  return(
    <nav className='navbar navbar-templete smart-scroll navbar-expand-lg navbar-light bg-light'>
      
      <NavLink className="navbar-brand mr-auto custom-divider text-primary font-weight-bold" to="/admin" style={{textDecoration: "none"}}>
        صفحة الإدارة
      </NavLink>
      <button className='navbar-toggler' type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"/>
      </button>

      {current_user ? (LoginLinks) : (LogoutLinks)}

      <div className="collapse navbar-collapse text-right order-3 order-lg-2" id="navbarSupportedContent">
        {AccessLvl === 'SUPERADMIN' ? (SUPERADMIN) : null}
        {AccessLvl === 'TRIPCOMPANY' ? (TRIPCOMPANY) : null}
        {AccessLvl === 'TRANSCOMPANY' ? (TRANSCOMPANY) : null}
        {AccessLvl === 'TRIPADMIN' ? (TRIPADMIN) : null}
        {AccessLvl === 'TRANSADMIN' ? (TRANSADMIN) : null}
      </div>

    </nav>
  )
}

export default withRouter(AdminNav)