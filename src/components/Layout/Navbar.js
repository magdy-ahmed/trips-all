import React, { useEffect } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import $ from 'jquery';
import { Cookies } from 'react-cookie';


const Navbar = () => {

  useEffect(() => {
    // Logout User if Exists
    // if (localStorage.yemenbus_user_jwt){
    //   const cookies = new Cookies();
    //   fetch('/api/logout', {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json'
    //     }
    //   }).then(resp => {
    //     resp.json().then(_ => {
    //       if (resp.ok){
    //         // document.cookie = "yemenbus_user_jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC"
    //         cookies.remove('yemenbus_user_jwt', {path: '/'})
    //         localStorage.removeItem('yemenbus_user_jwt')
    //         localStorage.removeItem('access_level')
    //         window.location.pathname = '/'
    //       }
    //     })
    //   })
    // }


    // add padding top to show content behind navbar
    // $('body').css('padding-top', $('.navbar').outerHeight() + 'px')

    // detect scroll top or down
    if ($('.smart-scroll').length > 0) { // check if element exists
        var last_scroll_top = 0;
        $(window).on('scroll', function() {
            let scroll_top = $(this).scrollTop();
            if(scroll_top < last_scroll_top) {
                $('.smart-scroll').removeClass('scrolled-down').addClass('scrolled-up');
            }
            else {
                $('.smart-scroll').removeClass('scrolled-up').addClass('scrolled-down');
            }
            last_scroll_top = scroll_top;
        });
    }
  }, [])
  
  return(
    <nav className='navbar navbar-template smart-scroll navbar-expand-lg navbar-light bg-light'>
      <NavLink className="navbar-brand mobile-hidden custom-divider text-primary font-weight-bold" to="/" style={{textDecoration: "none"}}>
        يمن باص
        YemenBus
      </NavLink>

      <div className="d-flex flex-row order-2 order-lg-3">
        <button className='navbar-toggler' type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"/>
        </button>
        <NavLink className="navbar-brand float-right desktop-hidden flex-row text-primary font-weight-bold" to="/" style={{textDecoration: "none"}}>
          يمن باص
        </NavLink>

        
        {/* {current_user ? (LoginLinks) : (LogoutLinks)} */}
      </div>


      <div className="collapse text-right navbar-collapse order-3 order-lg-2" id="navbarSupportedContent">
          
          <ul className="navbar-nav font-weight-nav mr-auto ml-5">
            
            <li className="nav-item dropdown" data-toggle="collapse" data-target=".navbar-collapse.show">
              
              <Link to="#" className="nav-link text-info font-weight-nav dropdown-toggle" id="dropdown1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                المعاملات
              </Link>
              <div className="dropdown-menu text-right" aria-labelledby="dropdown1">
                <Link className="dropdown-item text-primary" to="/transactions">المعاملات</Link>
                <div className="dropdown-divider"/>
                <Link className="dropdown-item text-primary" to="/transactions/tsey">إنجاز المعاملات في السفارة السعودية</Link>
                <Link className="dropdown-item text-primary" to="/transactions/trsa">إنجاز المعاملات للمقيم داخل السعودية</Link>
                <Link className="dropdown-item text-primary" to="/transactions/iesy">خدمات التقسيط والتسجيل للجامعات والمعاهد اليمنية</Link>
                <div className="dropdown-divider"/>
                <Link className="dropdown-item text-primary" to="/transactions/order">تخليص المعاملات</Link>
              </div>
            
            </li>

            <li className="nav-item dropdown" data-toggle="collapse" data-target=".navbar-collapse.show">
              
              <Link to="#" className="nav-link text-info font-weight-nav dropdown-toggle" id="dropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                الرحلات
              </Link>
              <div className="dropdown-menu text-right" aria-labelledby="dropdown2">
                <Link className="dropdown-item text-primary" to="/trips/search">البحث عن الرحلات</Link>
                <Link className="dropdown-item text-primary" to="/trips/today">رحلات اليوم</Link>
                <Link className="dropdown-item text-primary" to="/trips/later">الرحلات القادمة</Link>
                <div className="dropdown-divider"/>
                <Link className="dropdown-item text-primary" to="/trips/order">حجز تذاكر الرحلات</Link>
              </div>
            
            </li>
            <li className="nav-item dropdown" data-toggle="collapse" data-target=".navbar-collapse.show">
              
              <Link to="#" className="nav-link text-info font-weight-nav dropdown-toggle" id="dropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                الحج و العمرة
              </Link>
              <div className="dropdown-menu text-right" aria-labelledby="dropdown2">
                <Link className="dropdown-item text-primary" to="/hajj">برامج الحج والعمرة</Link>
              </div>
            
            </li>

            <li className="nav-item dropdown" data-toggle="collapse" data-target=".navbar-collapse.show">
              
              <Link to="#" className="nav-link text-info font-weight-nav dropdown-toggle" id="dropdown3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                الرسائل والطرود
              </Link>
              <div className="dropdown-menu text-right" aria-labelledby="dropdown3">
                <Link className="dropdown-item text-primary" to="/delivery/order">طلب إرسال الرسائل والطرود</Link>
              </div>
            
            </li>

            <li className="nav-item dropdown" data-toggle="collapse" data-target=".navbar-collapse.show">
              
              <Link to="#" className="nav-link text-info font-weight-nav dropdown-toggle" id="dropdown3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                الطلبات
              </Link>
              <div className="dropdown-menu text-right" aria-labelledby="dropdown3">
                <Link className="dropdown-item text-primary" to="/orders">البحث في الطلبات</Link>
                <div className="dropdown-divider"/>
                <Link className="dropdown-item text-primary" to="/trips/order">حجز تذاكر الرحلات</Link>
                <Link className="dropdown-item text-primary" to="/transactions/order">تخليص المعاملات</Link>
                <Link className="dropdown-item text-primary" to="/delivery/order">طلب إرسال الرسائل والطرود</Link>
              </div>
            
            </li>

            <li className="nav-item"  data-toggle="collapse" data-target=".navbar-collapse.show">
              <Link to="/policies" className="nav-link text-danger font-weight-nav">
                السياسات
              </Link>
            </li>

            <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
              <Link to="/contact" className="nav-link text-info font-weight-nav">
                تواصل معنا
              </Link>
            </li>

            
          </ul>
          
        </div> 

    </nav>
  )
}


export default withRouter(Navbar)