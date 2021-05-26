import React from 'react';
import { Link } from 'react-router-dom';


export const NotFound = () => {

  return(
    <div className="container text-center mt-5 p-5">
      <span className="display-6">الصفحة غير موجودة | Page Not Found (404)</span>
      <p className="lead mt-3">
        الصفحة غير موجودة, أو قد تكون محذوفة.
      </p>

      <p className="lead mt-1">
      للعودة للصفحة الرئيسية  <Link to="/" className="text-primary">إضغط هنا</Link>, 
      للإبلاغ عن أي مشكلة, الرجاء التواصل <Link to="/contact" className="text-info">من هنا</Link>
      </p>
    </div>
  )
}