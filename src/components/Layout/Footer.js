import React from 'react';
import { Link } from 'react-router-dom';




export const Footer = () => {
  const currentYear = new Date().getFullYear()

  const handleClick = (e) => {
    let value = e.target.id;
    
    if (window.confirm('سيتم فتح رابط خارجي, هل أنت متأكد؟')){
      window.open(value)
    }
  }


  return (
    <footer className="page-footer font-small bg-darken">

    <div className="bg-sub-footer">
      <div className="container">

        <div className="row py-4 d-flex align-items-center">

          <div className="col-md-6 col-lg-5 text-center text-md-right mb-4 mb-md-0">
            <h6 className="mb-0 font-weight-bold">تواصل معنا عن طريق شبكات التواصل الإجتماعي</h6>
          </div>

          <div className="col-md-6 col-lg-7 text-center text-md-left">

            <Link to="#" className="fb-ic text-primary">
              <span id="https://www.facebook.com/profile.php?id=100053890684673" onClick={handleClick} className="fab fa-facebook-f font-weight-bold mr-4"/>
            </Link>

            <Link to="#" className="li-ic text-info">
              <span id="https://twitter.com/HakeemH11012166?s=09" onClick={handleClick} className="fab fa-twitter font-weight-bold mr-4"/>
            </Link>

            <Link to="#" className="wa-ic text-success">
              <span id="https://wa.me/+966567928521" onClick={handleClick} className="fab fa-whatsapp font-weight-bold mr-4"/>
            </Link>

            <Link to="#" className="ins-ic text-warning">
              <span id="https://www.instagram.com/yemenbus1/" onClick={handleClick} className="fab fa-instagram font-weight-bold mr-4"/>
            </Link>

          </div>

        </div>

      </div>
    </div>

    <div className="container text-center text-md-left mt-5">

      <div className="row mt-3">
        
        <div className="col-md-3 text-right col-lg-2 col-xl-2 mx-auto mb-4">

          <h6 className="text-uppercase font-weight-bold">روابط مفيدة</h6>
          <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: "60px"}}/>
          <p>
            <a className="text-info" href="/">مؤشر الرحلات</a>
          </p>
          <p>
            <a className="text-info" href="/trips/search">البحث عن الرحلات</a>
          </p>
          <p>
            <a className="text-info" href="/transactions">المعاملات</a>
          </p>
          <p>
            <a className="text-danger" href="/policies">الشروط والسياسات</a>
          </p>    
          <p>
            <a className="text-info" href="/contact">لتقديم شكوى أو إقتراح</a>
          </p>

        </div>

        <div className="col-md-2 text-right col-lg-2 col-xl-2 mx-auto mb-4">

          <h6 className="text-uppercase font-weight-bold">الخدمات</h6>
          <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: "60px"}}/>
          
          <p><a  href="/trips/order">حجز رحلة</a></p>
          <p><a  href="/transactions/order">طلب تخليص معاملة</a></p>
          <p><a href="/delivery/order">طلب إرسال طرد</a></p>  

        </div>

        <div className="col-md-3 text-right col-lg-4 col-xl-3 mx-auto mb-4">

          <h6 className="text-uppercase font-weight-bold">يمن باص</h6>
          <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: "60px"}}/>
          <div className="sites">
            <p>
              موقع الكتروني(مؤسسة يمنية) :
            </p>
            <p>
              تقوم بتوفير الاسعار والخدمات للمغتربين اليمنين في السعودية ويربط بين مقدم الخدمة وبين المستهلك (المغترب اليمني) بشكل مباشر, مع ضمان الدفع لمقدم الخدمة عند انجاز العمل.
            </p>
            <p>
              وبضمان الحصول على افضل الاسعار والخدمات سوى كانت رسوم الخدمة نقداً او بالتقسيط لمعظم الخدمات باليمن او بالسعودية.
              مع توفير ضمان للانجاز الخدمة قبل اكتمال دفع. للتسهيل على المغترب اليمني والتحقق من المصداقية.
            </p>
          </div>

        </div>

      </div>

    </div>

    <div className="footer-copyright font-weight-bold text-center py-3">
     جميع الحقوق محفوظة لـ يمن باص {currentYear} ©
    </div>
    </footer>
  )
}