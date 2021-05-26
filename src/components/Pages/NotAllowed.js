import React from 'react';
import { Link } from 'react-router-dom';



export const NotAllowed = () => {

  return(
    <div className="container text-center mt-5 p-5">
      <span className="display-6">لا تملك صلاحيات الدخول للصفحة | UnAuthorized (401)</span>
      <p className="lead mt-3">
        لا تمتلك الصلاحيات التي تسمح لك بالدخول لهذه الصفحة
      </p>
      <p className="lead mt-1">
      للعودة للصفحة الرئيسية  <Link to="/" className="text-primary">إضغط هنا</Link>, 
      للإبلاغ عن أي مشكلة, الرجاء التواصل <Link to="/contact" className="text-info">من هنا</Link>
      </p>
    </div>
  )
}