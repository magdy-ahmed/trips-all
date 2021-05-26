/* تقسيط الخدمات التعليمية في اليمن */
import React from 'react';
import { Link } from 'react-router-dom';
/* Main Page Image */
import homeImg from '../../../Static/Images/Home/uni.jpg';



export const IESY = () => {

  const governUniv = [
    {
      city: 'صنعاء',
      name: 'جامعة صنعاء'
    },
    {
      city: 'عدن',
      name: 'جامعة عدن'
    },
    {
      city: 'تعز',
      name: 'جامعة تعز'
    },
    {
      city: 'الحديدة',
      name: 'جامعة الحديدة'
    },
    {
      city: 'حضرموت',
      name: 'جامعة حضرموت'
    },
    {
      city: 'ذمار',
      name: 'جامعة ذمار'
    },
    {
      city: 'إب',
      name: 'جامعة إب'
    },
    {
      city: 'عمران',
      name: 'جامعة عمران'
    },
    {
      city: 'البيضاء',
      name: 'جامعة البيضاء'
    },
    {
      city: 'صنعاء',
      name: 'جامعة 21 سبتمبر'
    }
  ]

  const privateUniv = [

    {'city': 'عدن', 'name': 'جامعة ابن خلدون'},
    {'city': 'صنعاء', 'name': 'جامعة ازال  للعلوم وتكنولوجيا'},
    {'city': 'صنعاء', 'name': 'جامعة اقراء للعلوم وتكنلوجيا'}, 
    {'city': 'صنعاء', 'name': 'جامعة الاتحاد للعلوم وتكنولوجيا'}, 
    {'city': 'تريم', 'name': 'جامعة الاحقاف'}, 
    {'city': 'صنعاء', 'name': 'جامعة الامارات الدولية'}, 
    {'city': 'صنعاء', 'name': 'جامعة الاندلس للعلوم والتنمية'}, 
    {'city': 'صنعاء', 'name': 'الجامعة البريطانية باليمن'}, 
    {'city': 'اب', 'name': 'جامعة الجزيرة'}, 
    {'city': 'عدن', 'name': 'جامعة الحضارة'}, 
    {'city': 'صنعاء', 'name': 'جامعة الحكمة'}, 
    {'city': 'صنعاء', 'name': 'جامعة الرازي'}, 
    {'city': 'تعز', 'name': 'جامعة السعيد'}, 
    {'city': 'صنعاء', 'name': 'الجامعة العربية للعلوم والتقنية'}, 
    {'city': 'صنعاء', 'name': 'جامعة العلوم الحديثة'}, 
    {'city': 'صنعاء', 'name': 'جامعة العلوم وتكنولوجيا'}, 
    {'city': 'صنعاء', 'name': 'جامعة القرآن الكريم والعلوم الإسلامية'}, 
    {'city': 'عدن - صنعاء - تعز', 'name': 'الجامعة اللبنانية الدولية'}, 
    {'city': 'صنعاء', 'name': 'جامعة المستقبل'}, 
    {'city': 'صنعاء', 'name': 'جامعة المعرفة والعلوم الحديثة'}, 
    {'city': 'صنعاء', 'name': 'جامعة الملكة اروى'}, 
    {'city': 'صنعاء', 'name': 'الجامعة الوطنية'}, 
    {'city': 'صنعاء', 'name': 'جامعة اليمن'}, 
    {'city': 'صنعاء', 'name': 'جامعة اليمن والخليج للعلوم والتكنولوجيا'}, 
    {'city': 'صنعاء - تعز', 'name': 'الجامعة اليمنية'}, 
    {'city': 'صنعاء', 'name': 'الجامعة اليمنية الاردنية'}, 
    {'city': 'صنعاء', 'name': 'جامعة تونيك الدولية للتكنولوجيا'}, 
    {'city': 'صنعاء', 'name': 'جامعة دار السلام للعلوم وتكنولوجيا'}, 
    {'city': 'الحديدة ', 'name': 'جامعة دار العلوم الشرعية'}, 
    {'city': 'صنعاء', 'name': 'جامعة سبأ'}, 
    {'city': 'تعز', 'name': 'كلية ٢٢ مايو الطبية'}, 
    {'city': 'حضرموت', 'name': 'كلية الامام الشافعي'}, 
    {'city': 'المكلا ', 'name': 'كلية الريان'}, 
    {'city': 'الحبيلين', 'name': 'كلية ردفان للقرآن'}
  ]

  const Institutes = [
    {city: 'صنعاء', name: 'معهد سييدز للغة الإنجليزية والكمبيوتر'},
    {city: 'صنعاء', name: 'معهد اكسيد للغة الإنجليزية'},
    {city: 'صنعاء', name: 'معهد يالى للغة الإنجليزية'},
    {city: 'صنعاء', name: 'المعهد البريطاني  للغة الإنجليزية'},
    {city: 'تعز', name: 'المعهد الكندي للغة الإنجليزية'},
    {city: 'صنعاء', name: 'معهد نيو هوريزون للغة الإنجليزية'}
  ]

  return (
    <div className="mb-5 pb-5">
      
      <div className="carousel-item active" style={{backgroundImage: `url(${homeImg})`, opacity: 0.82}}>
        <div className="text-info carousel-caption flex-center">
          <h3 className="display-5">تقسيط الخدمات التعليمية في اليمن</h3>
        </div>
      </div>

      <div className="container text-center mt-4">
        <span className="display-6">أقسام المعاملات</span>
        <hr/>
        <p className="lead font-weight-bold">
          <Link className="text-primary" to="/transactions"> المعاملات </Link>|
          <Link className="text-primary" to="/transactions/trsa"> معاملات المقيمين في السعودية </Link>|
          <Link className="text-primary" to="/transactions/tsey"> معاملات السفارة السعودية في اليمن </Link>
        </p>
      </div>

      <div className="container text-center mt-5 pt-5">
        <span className="display-6 text-primary">عن الخدمة</span>
        <hr/>
        <div className="lead font-weight-bold">
          <p className="text-danger">عزيزي المغترب اليمني في السعودية.</p>
          <p className="text-dark">هل ترغب بإتمام دراسة أبنائك في اليمن؟</p>
          <p className="text-primary">كيف ذلك؟</p>
          <p className="text-dark">نحن نقوم بتوفير خدمات تقسيط للرسوم الدراسية للجامعات اليمنية الحكومية والأهلية, ومعاهد اللغة والكمبيوتر.</p>
        </div>
      </div>

      <div className="container text-center mt-5">
        <span className="display-6 text-secondary">برامج التقسيط</span>
        <hr/>
        <div className="lead font-weight-bold">
          <p className="text-danger">برامج التقسيط المتاحة : </p>
          <p className="text-dark"><i className="fa fa-circle fa-xs"/> 4 دفع للرسوم الدراسية</p>
          <p className="text-dark"><i className="fa fa-circle fa-xs"/> 6 دفع للرسوم الدراسية</p>
          <p className="text-dark"><i className="fa fa-circle fa-xs"/> 8 دفع للرسوم الدراسية</p>
          <p className="text-dark"><i className="fa fa-circle fa-xs"/> 10 دفع للرسوم الدراسية</p>
          <p className="text-dark"><i className="fa fa-circle fa-xs"/> 12 دفعة للرسوم الدراسية</p>
          <p className="text-success">أين يتم دفع رسوم التقسيط؟</p>
          <p className="text-dark">يتم الدفع في السعودية عبر برنامج <i className="text-primary">يمن تقسيط</i></p>
        </div>
      </div>

      <div className="container text-center mt-5">
        <span className="display-6 text-secondary">قائمة الجامعات الحكومية</span>
        <hr/>
        <div className="lead font-weight-bold">
          {governUniv ? (governUniv.map((uni, index) => {
            return(<p className="text-dark" key={index}><i className="fa fa-circle fa-xs"/> {uni.name} - {uni.city}.</p>)
          })) : null}
        </div>
      </div>

      <div className="container text-center mt-5">
        <span className="display-6 text-secondary">قائمة الجامعات الأهلية</span>
        <hr/>
        <div className="lead font-weight-bold">
          {privateUniv ? (privateUniv.map((uni, index) => {
              return(<div className="text-dark" key={index}><i className="fa fa-circle fa-xs"/> {uni.name} - {uni.city}.</div>)
            })) : null}
        </div>
      </div>

      <div className="container text-center mt-5">
        <span className="display-6 text-secondary">قائمة معاهد اللغة الإنجليزية والكمبيوتر</span>
        <hr/>
        <div className="lead font-weight-bold">
          {Institutes ? (Institutes.map((uni, index) => {
              return(<p className="text-dark" key={index}><i className="fa fa-circle fa-xs"/> {uni.name} - {uni.city}.</p>)
            })) : null}
        </div>
      </div>

      <div className="container text-center mt-5">
        <span className="display-6 text-secondary">كيف تتم الخدمة</span>
        <hr/>
        <div className="lead font-weight-bold">
          يمكنك طلب إتمام المعاملة عن طريق تعبأت الطلب <Link to={{pathname: '/transactions/order', state: {transaction: 'IESY'}}}>من هنا</Link>
        </div>
        <p className="text-success font-weight-bold mt-1"><i className="fa fa-star fa-xs"/>خدماتنا ضمان لك.</p>
      </div>

    </div>
  )
}