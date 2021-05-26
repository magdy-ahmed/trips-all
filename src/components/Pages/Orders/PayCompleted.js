import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';



export const PayComp = () => {

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setTimeout(redirectFunc, 7500)
  }, []);

  const redirectFunc = () => {
    setRedirect(true)
  }

  if (redirect){
    return <Redirect to="/"/>
  }

  return(
    <div className="container text-center mt-5 p-5">
      <span className="display-6 text-success">تم إكمال الدفع بنجاح</span>
      <p className="lead mt-3">
        سيتم التواصل معك من قبل المسوقين قريباً عبر الجوال أو البريد الإلكتروني.
      </p>
      <p className="font-weight-bold text-info mt-4">
        سيتم إعادة توجيهك للصفحة الرئيسية تلقائياً...
      </p>
      <p className="lead mt-1">
      للعودة للصفحة الرئيسية  <Link to="/" className="text-primary">إضغط هنا</Link>, 
      للإبلاغ عن أي مشكلة, الرجاء التواصل <Link to="/contact" className="text-info">من هنا</Link>
      </p>
    </div>
  )
}