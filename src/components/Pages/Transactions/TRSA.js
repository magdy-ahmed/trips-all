/* معاملات المقيمين في السعودية */
import React from 'react';
import { Link } from 'react-router-dom';
/* Main Page Image */
import homeImg from '../../../Static/Images/Home/passp.png';



export const TRSA = () => {

  const transactions = [
    'معاملة إستخراج تأشيرة عائلية جديدة (الجوزات السعودية ).',
    'معاملة إستخراج تأشيرة ضيافة مقيم جديد( الجوزات السعودية ).',
    'إلغاء هروب مهني.',
    'إلغاء هروب فردي.',
    'إلغاء رخصة عمل  بغرض الخروج النهائي.',
    'إلغاء خروج نهائي صادر من أبشر والجوزات.',
    'منح خروج نهائي للإقامة المنتهية.',
    'منح خروج نهائى  عليه بلاغ هروب.',
    'تمديد صلاحية الجواز.',
    'نقل معلومات الجواز.',
    'إضافة صفر للجواز.',
    'إسقاط عامل خرج ولم يعد.',
    'تصديق عقود العمل.',
    'إستخراج تأشيرات  للعمالة.',
    'إستخراج تصاريح زواج.'
  ]
  
  const dealers = [
    {
      city: 'جدة',
      name: 'سعيد الأسمري'
    },
    {
      city: 'الرياض',
      name: 'أبو جلال'
    },
    {
      city: 'الشرقية',
      name: 'فارس الرويلي'
    },
    {
      city: 'الجنوب',
      name: 'صالح الحكمى'
    },
    {
      city: 'المنطقة الشمالية',
      name: 'ياسر الشمري'
    }
  ]

  return (
    <div className="mb-5 pb-5">
      
      <div className="carousel-item active" style={{backgroundImage: `url(${homeImg})`, opacity: 0.82}}>
        <div className="text-info carousel-caption flex-center">
          <h3 className="display-5">معاملات المقيمين في السعودية</h3>
        </div>
      </div>

      <div className="container text-center mt-4">
        <span className="display-6">أقسام المعاملات</span>
        <hr/>
        <p className="lead font-weight-bold">
          <Link className="text-primary" to="/transactions"> المعاملات </Link>|
          <Link className="text-primary" to="/transactions/tsey"> معاملات السفارة السعودية في اليمن </Link>|
          <Link className="text-primary" to="/transactions/iesy"> تقسيط الخدمات التعليميه في اليمن </Link>
        </p>
      </div>

      <div className="container text-center mt-5 pt-5">
        <span className="display-6 text-primary">عن الخدمة</span>
        <hr/>
        <div className="lead font-weight-bold">
          <p className="text-danger">عزيزي المقيم اليمني في السعودية</p>
          <p className="text-dark">
            هل لديك معاملة وتبحث عن معقب مضمون لإنجاز معاملتك
            في الجوزات السعودية, مكتب عمل الغرفة التجارية, أو الخارجية السعودية؟
          </p>
          <div>
            <span className="text-primary">كيف يتم ذالك؟</span>
            <p className="text-dark">
              يتم الإتفاق مع المعقب مسبقاً على رسوم وأتعاب المعاملة للمقيم اليمني,
              ولا تدفع الرسوم للمعقب إلا بعد إنجاز المعاملة والتحقق من صحة إنجازها.
            </p>
          </div>
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
        <span className="display-6 text-secondary">قائمة المعقبين المعتمدة</span>
        <hr/>
        <div className="lead font-weight-bold">
          {dealers ? (dealers.map((dealer, index) => {
            return(<p className="text-dark" key={index}><i className="fa fa-circle fa-xs"/> {dealer.name} - {dealer.city}.</p>)
          })) : null}
        </div>
      </div>

      <div className="container text-center mt-5">
        <span className="display-6 text-secondary">كيف تتم الخدمة</span>
        <hr/>
        <div className="lead font-weight-bold">
          يمكنك طلب إتمام المعاملة عن طريق تعبأت الطلب <Link to={{pathname: '/transactions/order', state: {transaction: 'TRSA'}}}>من هنا</Link>
        </div>
        <p className="text-success font-weight-bold mt-1"><i className="fa fa-star fa-xs"/>خدماتنا ضمان للمقيم, وضمان للمعقب.</p>
      </div>

    </div>
  )
}