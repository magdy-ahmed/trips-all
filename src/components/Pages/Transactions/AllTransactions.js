import React from 'react';
import { Link } from 'react-router-dom';
/* Main Page Image */
import homeImg from '../../../Static/Images/Home/passp.png';




export const AllTransactions = () => {

  return (
    <div className="mb-5 pb-5">
      
      <div className="carousel-item active" style={{backgroundImage: `url(${homeImg})`, opacity: 0.82}}>
        <div className="text-info carousel-caption flex-center">
          <h3 className="display-5">قسم المعاملات</h3>
        </div>
      </div>

      <div className="container text-center mt-4">
        <span className="display-6">أقسام المعاملات</span>
        <hr/>
        <p className="lead font-weight-bold">
          <Link className="text-primary" to="/transactions/trsa"> معاملات المقيمين في السعودية </Link>|
          <Link className="text-primary" to="/transactions/tsey"> معاملات السفارة السعودية في اليمن </Link>|
          <Link className="text-primary" to="/transactions/iesy"> تقسيط الخدمات التعليميه في اليمن </Link>
        </p>
      </div>

      <div className="container text-center mt-5 pt-5">
        <span className="display-6"><Link to="/transactions/trsa" className="text-secondary">معاملات المقيمين في السعودية</Link></span>
        <hr/>
        <div className="lead font-weight-bold">
          <p className="text-danger">عزيزي المقيم اليمني في السعودية.</p>
          <p className="text-dark">هل لديك معاملة وتبحث على معقب مضمون لإنجاز معاملتك  بالجوازات السعودية, مكتب عمل الغرفة التجارية, أو الخارجية السعودية؟</p>
          <p className="text-dark">نحن نضمن لك إنجاز المعاملة, ولا يتم دفع أتعاب أو رسوم المعاملة للمعقب إلا بعد إنجاز المعاملة.</p>
          <p className="text-primary"><Link to="/transactions/trsa">للمزيد من المعلومات</Link></p>
        </div>
      </div>

      <div className="container text-center mt-5 pt-5">
        <span className="display-6"><Link to="/transactions/tsey" className="text-secondary">معاملات السفارة السعودية في اليمن</Link></span>
        <hr/>
        <div className="lead font-weight-bold">
          <p className="text-danger">عزيزي المغترب اليمني في السعودية.</p>
          <p className="text-dark"> هل لديك معاملة ترغب بإنجازها بالسفارة السعودية في اليمن؟</p>
          <p className="text-dark">إضمن إنجاز معاملاتك  معنا وإدفع الرسوم في السعودية عند إستلام المعاملة منجزة.</p>
          <p className="text-primary"><Link to="/transactions/tsey">للمزيد من المعلومات</Link></p>
        </div>
      </div>

      <div className="container text-center mt-5 pt-5">
        <span className="display-6"><Link to="/transactions/iesy" className="text-secondary">تقسيط الخدمات التعليمية في اليمن</Link></span>
        <hr/>
        <div className="lead font-weight-bold">
          <p className="text-danger">عزيزي المغترب اليمني في السعودية.</p>
          <p className="text-dark">هل ترغب بتدريس أولادك في اليمن, ولكن لا تستطيع دفع رسوم الدراسة دفعة واحدة؟</p>
          <p className="dark-text">نحن نقوم بتوفير خدمات التقسيط للرسوم الدراسية للجامعات اليمنية الحكومية والأهلية  ومعاهد اللغة والكمبيوتر.</p>
          <p className="text-primary"><Link to="/transactions/iesy">للمزيد من المعلومات</Link></p>
        </div>
      </div>

    </div>
  )
}