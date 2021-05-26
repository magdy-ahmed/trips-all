/* معاملات السفارة السعودية في اليمن */
import React from 'react';
import { Link } from 'react-router-dom';
/* Main Page Image */
import homeImg from '../../../Static/Images/Home/passp.png';



export const TSEY = () => {

  const transactions = [
    'زيارة عائلية لليمن.',
    'معاملة زيارة ضيافة مقيم.',
    'معاملة تأشيرة فيزة عمل.',
    'معاملة تمديد خروج وعودة.',
    'معاملة  التحقق من بصمة  سابقة ( الجوزات السعودية).',
    'معاملة اضافة طفل جديد.',
    'معاملة تأشيرة عمرة.',
    'معاملة  تأشيرة حج.',
    'معاملة تاشيرة سياحية.',
    'معاملة تاشيرة تجارية.',
    'معاملة تصديق شهادات.',
    'معاملة تصديق عقود العمل.'
  ]

  const offices = [
    'وكالة الحديدة لخدمات الايدي العاملة.',
    'شركة انجاز لخدمات الايدي العاملة.',
    'وكالة الدليل للسفريات والسياحة.',
    'مجموعة اجياد للتمية السياحية.',
    'العواضي للسفريات والسياحة.',
    'نسك للاستثمار السياحي.',
    'مكتب باشافعي.',
    'مجموعة اجياد عدن.',
    'مكتب الحبيب لتشغيل الايدي العاملة.',
    'مجوعة العمل الدولية.',
    'مكتب باشافعي عدن.',
    'وكالة بامطرف للسياحة والسفر.',
    'البيت السعودي للسفريات.',
    'مكتب العيسائبى عدن.',
    'مكتب المضياف عدن.',
    'مكتب عدن الدولي عدن.',
    'مكتب اجياد عدن.',
    'مكتب بيت الكمبيوتر عدن.',
    'مكتب نحد الجزيرة.',
    'مكتب الحجر الأسود.',
    'وكالة رواسي للسفريات والسياحة.',
    'وكالة انهار الفردوس.',
    'وكالة رواد المستقبل.',
    'مستشفى صابر عدن  للفحص الطبي.',
    'مستشفى الرازي للفخص الطبي عدن.',
    'المستشفى السعودي الالماني للفحص الطبي صنعاء.',
    'مستشفى ازال للفحص الطبي صنعاء.'
  ]

  return (
    <div className="mb-5 pb-5">
      
      <div className="carousel-item active" style={{backgroundImage: `url(${homeImg})`, opacity: 0.82}}>
        <div className="text-info carousel-caption flex-center">
          <h3 className="display-5">معاملات السفارة السعودية في اليمن</h3>
        </div>
      </div>

      <div className="container text-center mt-4">
        <span className="display-6">أقسام المعاملات</span>
        <hr/>
        <p className="lead font-weight-bold">
          <Link className="text-primary" to="/transactions"> المعاملات </Link>|
          <Link className="text-primary" to="/transactions/trsa"> معاملات المقيمين في السعودية </Link>|
          <Link className="text-primary" to="/transactions/iesy"> تقسيط الخدمات التعليميه في اليمن </Link>
        </p>
      </div>

      <div className="container text-center mt-5 pt-5">
        <span className="display-6 text-primary">عن الخدمة</span>
        <hr/>
        <div className="lead font-weight-bold">
          <p className="text-danger">عزيزي المغترب اليمني في السعودية.</p>
          <p className="text-dark">هل لديك معاملة ترغب بإنجازها في السفارة السعودية في اليمن؟</p>
          <p className="text-primary">كيف يتم ذلك؟</p>
          <p className="text-dark">يمكنك طلب إنجاز المعاملة ودفع الرسوم عند إستلام المعاملة منجزة.</p>
          <p className="text-dark">ويمكنك الدفع الرسوم على ثلاث دفعات.</p>
        </div>
      </div>

      <div className="container text-center mt-5">
        <span className="display-6 text-secondary">قائمة المعاملات المعتمدة</span>
        <hr/>
        <div className="lead font-weight-bold">
          {transactions ? (transactions.map((trans, index) => {
            return(<p className="text-dark" key={index}><i className="fa fa-circle fa-xs"/> {trans}</p>)
          })) : null}
        </div>
      </div>

      <div className="container text-center mt-5">
        <span className="display-6 text-secondary">قائمة المكاتب المعتمدة</span>
        <hr/>
        <div className="lead font-weight-bold">
          {offices ? (offices.map((office, index) => {
            return(<div className="text-dark" key={index}><i className="fa fa-circle fa-xs"/> {office}</div>)
          })) : null}
        </div>
      </div>

      <div className="container text-center mt-5">
        <span className="display-6 text-secondary">كيف تتم الخدمة</span>
        <hr/>
        <div className="lead font-weight-bold">
          يمكنك طلب إتمام المعاملة عن طريق تعبأت الطلب <Link to={{pathname: '/transactions/order', state: {transaction: 'TSEY'}}}>من هنا</Link>
        </div>
        <p className="text-success font-weight-bold mt-1"><i className="fa fa-star fa-xs"/>خدماتنا ضمان لك.</p>
      </div>

    </div>
  )
}