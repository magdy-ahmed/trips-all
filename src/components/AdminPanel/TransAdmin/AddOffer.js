import React, { useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useState } from 'react';
//import {Cookies} from 'react-cookie';;


export const AddOffer = (props) => {
  //const cookies = new Cookies();
  
  const orderInformation = props.location.state;
  const [info, setInfo] = useState({...orderInformation})

  const [state, setState] = useState({});
  const [order, setOrder] = useState();
  const [error, setError] = useState({});

  const [completed, setCompleted] = useState({completed: false, flash: null})

  const [company, setCompany] = useState();

  // IESY
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

  // TRSA
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

  // TSEY

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


  // User Authentication
  const [show, setShow] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const jwt = localStorage.yemenbus_user_jwt ;
    fetch('/api/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({jwt: jwt, permission: 'trans_access'})
    }).then(resp => {
      resp.json().then(data => {
        if (resp.ok){
          setCompany(data.company)
          setShow(true)
        } else {
          setFailed(true);
        }
      })
    })
  }, [])

  

  if (failed){
    return <Redirect to="/unauthorized"/>
  }


  const handleOrderChange = (e) => {
    e.preventDefault()

    // Reset State, Order, & Error
    setOrder();
    setState({});
    setError({});

    setInfo({
      ...state,
      [e.target.id]: e.target.value
    })
  }

  const handleInfoSubmit = (e) => {
    e.preventDefault();

    const fetchTransOrderInfo = async() => {
      await fetch('/api/orders/' + info.orderID, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({user: 'company'})
      }).then(resp => {
        resp.json().then(data => {
          if (resp.ok) {
            setOrder(data.order)
          } else {
            setError({
              orderID: {
                name: 'معرف الطلب',
                error: `لا يوجد طلب بالمعرف التالي ${info.orderID}#`
              }
            });
          }
        })
      })
    };

    fetchTransOrderInfo();

    // Reset Forms
    let Forms = document.offerForm
    Forms && Forms.reset();
    // Reset State
    setState({});
  }

  const getInstallments = (service) => {
    let stringToInt = service.replace(/[^\d.]/g, '');

    return (parseInt(stringToInt))
  }

  const handleChange = (e) => {
    e.preventDefault();

    setError({});

    if (order.type === 'IESY'){      
      setState({
        ...state,
        [e.target.id]: e.target.value,
        orderID: info.orderID,
        num_installments: getInstallments(order.service).toString()
      });
    } else {
      setState({
        ...state,
        [e.target.id]: e.target.value,
        orderID: info.orderID,
        num_documents: order.num_documents
      })
    }
  }
  const getExpire = (expire) => {
    let sloppy_date = new Date();

    let tzDifference = sloppy_date.getTimezoneOffset();

    let current_date = new Date (sloppy_date.getTime() + tzDifference * 60 * 1000);

    return current_date + (3600000*expire)

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setState({
      ...state,
      exp: getExpire(parseInt(state.expire)),
    })
    const submitOffer = async() => {
      await fetch('/api/transactions/offer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(state)
      }).then(resp => {
        resp.json().then(data => {
          if (resp.ok){
            setCompleted({
              completed: true,
              flash: {
                name: 'إضافة عرض',
                message: `تم إضافة العرض بنجاح, رقم العرض #${data.oid}`,
                type: 'alert-success'
              }
            })
          } else {
            setCompleted({
              completed: true,
              flash: {
                name: 'إضافة عرض',
                message: 'لا يمكن أضافة أكثر من عرض لنفس الشركة.',
                type: 'alert-danger'
              }
            })
          }
        })
      })
    }

    //Disable Submission Button
    document.getElementById("SubmissionBtn").disabled = true;
    submitOffer();
  }


  const orderInfo = () => {

    const transOrder = () => {
      const getTransType = (type) => {
        const types = {
          'TRSA': 'معاملات المقيمين في السعودية',
          'TSEY': 'معاملات السفارة السعودية في اليمن',
          'IESY': 'تقسيط الخدمات التعليمية في اليمن'
        }
        return (types[type])
      }
      return(
        <div className="container text-center mt-4">
          <span className="display-6 text-info font-weight-bold">معلومات الطلب</span>
          <hr/>
          <div className="container">

            <div className="mt-2">
              <span className="font-weight-bold">نوع الخدمة : </span>
              <p>{getTransType(order.type)}</p>
              <span className="font-weight-bold">إسم الخدمة/عدد الأقساط : </span>
              <p>{order.service}</p>
              <span className="font-weight-bold">عدد الوثائق (الجوازات/الهويات) : </span>
              <p>{order.num_documents}</p>
            </div>

            <hr/>

            <div className="mt-2">
              <span className="font-weight-bold">ملاحظات إضافية : </span>
              <p className="break-line mt-2">{order.notes || 'لا توجد ملاحظات إضافية'}</p>
            </div>

          </div>
        </div>
      )
    }

    if (order){return transOrder()}
  }

  const offerForm = () => {

    const noOffer = (
      <div className="container text-center mt-4">
        <span className="display-8 text-warning mt-5">
          لا يمكنك إضافة عرض حتى تعيَّن لشركة, الرجاء التواصل مع مسؤول الموقع ليتم تعيينك لشركة.
        </span>
      </div>
    )

    const companyInput = () => {

      if (order.type === 'IESY'){
        return(
          <div className="input-group">
            {company === "All" ? (
              <select id="company" onChange={handleChange} className="custom-select">
                <option value="" defaultValue>* مزود الخدمة</option>
                <option value="" disabled className="font-weight-bold">-----الجامعات الحكومية-----</option>
                {governUniv ? (governUniv.map((uni, index) => {
                  return(<option value={uni.name} key={index}>{uni.name}</option>)
                })) : null}
                <option value="" disabled className="font-weight-bold">-----الجامعات الخاصة/الأهلية-----</option>
                {privateUniv ? (privateUniv.map((uni, index) => {
                  return(<option value={uni.name} key={index}>{uni.name}</option>)
                })) : null}
                <option value="" disabled className="font-weight-bold">-----معاهد اللغة والكمبيوتر-----</option>
                {Institutes ? (Institutes.map((uni, index) => {
                  return(<option value={uni.name} key={index}>{uni.name}</option>)
                })) : null}
              </select>
            ) : (
              <input type="text" disabled value={company} className="form-control"/>
            )}
          </div>
        )
      }

      if (order.type === 'TRSA'){
        return(
          <div className="input-group">
            {company === "All" ? (
              <select id="company" onChange={handleChange} className="custom-select">
                <option value="" defaultValue>* مزود الخدمة</option>
                {dealers ? (dealers.map((comp, index) => {
                  return(<option value={comp.name} key={index}>{comp.name} - {comp.city}</option>)
                })) : null}
              </select>
            ) : (
              <input type="text" disabled value={company} className="form-control"/>
            )}
          </div>
        )
      }

      if (order.type === 'TSEY'){
        return(
          <div className="input-group">
            {company === "All" ? (
              <select id="company" onChange={handleChange} className="custom-select">
                <option value="" defaultValue>* مزود الخدمة</option>
                {offices ? (offices.map((comp, index) => {
                  return(<option value={comp} key={index}>{comp}</option>)
                })) : null}
              </select>
            ) : (
              <input type="text" disabled value={company} className="form-control"/>
            )}
          </div>
        )
      }
    }

    const transOffer = () => {
      return(
        <form onSubmit={handleSubmit} name="offerForm" className="container text-center mt-4">
          <legend className="display-6 font-weight-bold text-primary">إضافة عرض</legend>
          <p className="font-weight-light font-info text-right text-muted">
            <i className="fa fa-star-of-life fa-xs"/> التكلفة الإجمالية تكون بالنحو التالي : (عدد الوثائق * السعر للوثيقة الواحدة)
          </p>
            
          <hr/>
          {loadErrors()}

          <div className="form-inline justify-content-center">
            <label htmlFor="company" className="ml-sm-4"/>
            {companyInput()}
          </div>

          <div className="form-inline justify-content-center mt-4">

            <label htmlFor="price_per_document" className="ml-sm-4"/>
            <div className="input-group">
              <input onChange={handleChange} type="text" required id="price_per_document" placeholder="السعر لكل وثيقة (جواز/هوية(" className="form-control"/>
            </div>

            <label htmlFor="num_documents" className="ml-sm-4"/>
            <div className="input-group">
              <input disabled type="text" required id="num_documents" value={`عدد الوثائق : ${order.num_documents}`} className="form-control"/>
            </div>

            <label htmlFor="price" className="ml-sm-4"/>
            <div className="input-group pt-special">
              <input disabled type="text" id="price" value={`الإجمالي : ${(parseInt(order.num_documents)*parseInt(state.price_per_document))||0}`} className="form-control"/>
            </div>

          </div>
          
          <div className="form-inline justify-content-center mt-4">
            <label htmlFor="expire" className="ml-sm-4"/>
            <div className="input-group">
              <select required onChange={handleChange} id="expire" className="custom-select">
                <option value="" defaultValue>* مدة العرض</option>
                <option value="2">ساعتين</option>
                <option value="4">4 ساعات</option>
                <option value="6">6 ساعات</option>
                <option value="12">12 ساعة</option>
                <option value="24">يوم</option>
              </select>
            </div>
          </div>

          <div className="form-inline justify-content-center mt-4">
            <label htmlFor="notes" className="ml-sm-4"/>
            <div className="input-group">
              <textarea onChange={handleChange} id="notes" cols="66" placeholder="ملاحظات..." className="form-control"/>
            </div>
          </div>

          <div className="input-group justify-content-center mt-4">
            <button type="submit" id="SubmissionBtn" className="btn btn-md btn-outline-success">إضافة عرض</button>
          </div>
          <p className="font-weight-light text-primary"><i className="fa fa-star-of-life fa-xs"/> السعر شامل للضرائب والعمولات كاملةً.</p>

        </form>
      )
    }

    const installmentOffer = () => {
      
      return(
        <form onSubmit={handleSubmit} name="offerForm" className="container text-center mt-4">
          <legend className="display-6 font-weight-bold text-primary">إضافة عرض</legend>
          <p className="font-weight-light font-info text-right text-muted">
            <i className="fa fa-star-of-life fa-xs"/> التكلفة الإجمالية تكون بالنحو التالي : (عدد الأقساط * السعر للقسط الواحد)
          </p>

          <hr/>
          {loadErrors()}

          <div className="form-inline justify-content-center">
            <label htmlFor="company" className="ml-sm-4"/>
            {companyInput()}
          </div>

          <div className="form-inline justify-content-center mt-4">

            <label htmlFor="price_per_installment" className="ml-sm-4"/>
            <div className="input-group">
              <input onChange={handleChange} required id="price_per_installment" type="text" placeholder="السعر لكل قسط" className="form-control"/>
            </div>

            <label htmlFor="num_installments" className="ml-sm-4"/>
            <div className="input-group">
              <input type="text" id="num_installments" disabled value={`عدد الأقساط : ${getInstallments(order.service)}`} placeholder="عدد الأقساط" className="form-control"/>
            </div>

            <label htmlFor="price" className="ml-sm-4"/>
            <div className="input-group pt-special">
              <input disabled type="text" id="price" value={`الإجمالي : ${parseInt(getInstallments(order.service) * state.price_per_installment)||0}`} className="form-control"/>
            </div>

          </div>

          <div className="form-inline justify-content-center mt-4">
            <label htmlFor="expire" className="ml-sm-4"/>
            <div className="input-group">
              <select required onChange={handleChange} id="expire" className="custom-select">
                <option value="" defaultValue>* مدة العرض</option>
                <option value="2">ساعتين</option>
                <option value="4">4 ساعات</option>
                <option value="6">6 ساعات</option>
                <option value="12">12 ساعة</option>
                <option value="24">يوم</option>
              </select>
            </div>
          </div>
          
          <div className="form-inline justify-content-center mt-4">
            <label htmlFor="notes" className="ml-sm-4"/>
            <div className="input-group">
              <textarea onChange={handleChange} id="notes" cols="66" placeholder="ملاحظات..." className="form-control"/>
            </div>
          </div>

          <div className="input-group justify-content-center mt-4">
            <button type="submit" id="SubmissionBtn" className="btn btn-md btn-outline-success">إضافة عرض</button>
          </div>
          <p className="font-weight-light text-primary"><i className="fa fa-star-of-life fa-xs"/> السعر شامل للضرائب والعمولات كاملةً.</p>

        </form>
      )
    }

    if (order && !company){
      return noOffer
    }

    if (order && order.type !== 'IESY'){return(transOffer())}
    if (order && order.type === 'IESY'){return(installmentOffer())}
  }

  const loadErrors = () => {
    if (Object.keys(error).length !== 0 && error.constructor === Object){
      return (
        <div className="alert alert-info text-right">
          {error ? Object.entries(error).map((e, id) => {
            return (
              <p key={id}>
                {e[1].name} : {e[1].error}
              </p>
            )
          }): null}
        </div>
      )
    }
  }

  if (completed.completed) {
    return <Redirect to={{
      pathname: '/admin/myoffers',
      state: {flash: completed.flash}
    }} />
  }

  return (
    <div className="mb-5 pb-5">

      {show ? (
        <div className="container text-center mt-5 pt-5">
          <div className="card p-3 shadow bg-grey">
            <span className="card-title display-6">إضافة عرض جديد</span>
            <hr/>
            <div className="card-body text-right">
              
              <div className="mt-3">
                <p className="font-weight-bold text-warning"><i className="fa fa-star-of-life fa-xs"/> بإمكانك تقديم عرض واحد لكل طلب.</p>
                {error.orderID ? (loadErrors()) : null}
                <div className="mt-4">

                <form onSubmit={handleInfoSubmit} className="form-inline">

                  <label htmlFor="orderID" className="ml-sm-4">أدخل معرف الطلب (Order ID) : </label>
                  <div className="input-group">
                    <input onChange={handleOrderChange} type="text" id="orderID" value={info.orderID ? info.orderID : ''} className="form-control"/>
                  </div>
                
                  <div className="input-group mr-sm-4">
                    <button className="btn btn-md btn-outline-primary">عرض الطلب</button>
                  </div>

                
                </form>
                
                <p className="font-weight-bold text-primary mt-2">أو قم بتحديد الطلب <Link to="/admin/transactions/orders" className="text-success">من هنا</Link></p>
              </div>

                {orderInfo()}
                
                {order && order.offers >= 4 ? (
                  <div className="text-center mt-5">
                    <span className="display-8 text-secondary">الطلب مكتفي العروض</span>
                  </div>
                ) : offerForm()}
              
              </div>
            </div>
          </div>
        </div>

      ) : null}
    </div>
  )
}
