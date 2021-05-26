import React, { useState } from 'react';
import { Link, useParams, Redirect } from 'react-router-dom';
import homeImg from '../../../Static/Images/Home/order.jpg';
import { useEffect } from 'react';
import QRCode from 'qrcode.react';
import { Modal, Button } from 'react-bootstrap';

export const ViewOrder = () => {
  const { oid } = useParams();
  const [orderInfo, setOrderinfo] = useState();
  const [complete, setComplete] = useState({completed: false, order: null});

  const [offersInfo, setOffers] = useState();
  const [isDelete, setDelete] = useState(false);
  const [time_now, setTime_now] = useState(false);
  
  // Edit Trip Order
  const [isEdit, setEdit] = useState(false);
  const [state, setState] = useState({data: [], num: 1})

  const [isOffer, setOffer] = useState(false);
  const [offerID, setOfferID] = useState(null);

  const [redirect, setRedirect] = useState(false);
  const [home, setHome] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // Errors
  const [error, setError] = useState({});

  // Check if User is Authorized to Access Offers
  const [accessKey, setAccessKey] = useState();
  const [isBuyer, setBuyer] = useState(true);
  const [validationFlash, setValidationFlash] = useState()

  useEffect((orderInfo, offersInfo) => {
    fetch(`/api/orders-hajj/${oid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    }).then(resp => {
      resp.json().then(data => {
        if (resp.ok) {
          setOrderinfo(data.order)

        } else {
          setNotFound(true)
        }
      })
    });

    fetch(`/api/${oid}/offers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    }).then(resp => {
      resp.json().then(data => {
        if (resp.ok) {
          setOffers(data.offers)
          setTime_now(data.time_now)

        }
      })
    })
    
   
  }, [oid]);

  // إظهار منطقة معلومات الطلب
  console.log(orderInfo)
  const getDate = (date) => {
    
    let mm = date.getMonth() + 1
    let dd = date.getDate();

    return [date.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd].join('-');

  }

  const expireOffer = async(oid) => {
    
    await fetch('/api/offers/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({[oid]: 'declined'})
    })
  }

  const getExpire = (expire, oid) => {

    // let tzDifference = sloppy_date.getTimezoneOffset();

    // let current_date = new Date (sloppy_date.getTime() );
    let start_date = new Date(time_now)
    let end_date = new Date(expire);
    
    let diff = (end_date -start_date);

    var diffHrs = Math.floor((diff%86400000)/3600000);
    var diffMins = Math.round(((diff % 86400000) % 3600000) / 60000);
    if (diffHrs <= 0) {
      expireOffer(oid)
      return ['متنهي', false]
    }
    if (diffHrs < 1) {
      return [`باقى${diffMins} دقيقة`, true]
    } else {
      return [`باقى ${diffHrs} ساعة`, true]
    }

  }

  const getStatus = (status)  => {
    const types = {
      'pending': ['قيد المراجعة', 'secondary'],
      'open': ['مفتوح للعروض', 'success'],
      'fulfilled': ['مكتفي العروض', 'primary'],
      'waiting': ['في إنتظار الدفع', 'info'],
      'closed': ['مغلق', 'dark'],
      'rejected': ['مرفوض', 'danger'],
    }
    return (types[status])
  }

  const getTransType = (type) => {
    const transTypes = {
      TRSA: 'معاملات المقيمين في السعودية',
      TSEY: 'معاملات السفارة السعودية في اليمن',
      IESY: 'تقسيط الخدمات التعليمية في اليمن'
    }

    return(transTypes[type])
  }

  const getDelivType = (type) => {
    const deliveryTypes = {
      merchant: 'بضاعة تجارية',
      package: 'طرد',
      letter: 'رسالة'
    }

    return(deliveryTypes[type])
  }
const addPilgrims=(e)=>{
  e.preventDefault();
  setComplete({completed: true, order: null});
  
}
if (complete.completed) {
  return <Redirect to={`/hajj-order/${oid}/active`}/>
}
  const Info = () => {
    
    const TripOrder = () => {
      let status = getStatus(orderInfo.status)
      return(
        <div >

      <div className='text-center'>
      <button name="" onClick={addPilgrims} id="" className="p-5 btn btn-primary text-center" href="#" role="button">أضافة البيانات لحجاج والمعتمرين</button>
      </div>
      <div className="card light-shadow p-3 mt-2 bg-grey">
          <span className="card-title display-6 text-muted">معلومات الطلب</span>
          <p className="lead text-info font-weight-bold"><i className="fa fa-star-of-life fa-xs"/>الرجاء التأكد من معلومات الطلب قبل الإستمرار في إختيار العروض</p>
          <hr/>
          
          <div className="card-body text-center">
            <p className={`badge badge-${status[1]}`}>{status[0]}</p>
            <p className="font-weight-bold lead">رقم الطلب : {orderInfo && orderInfo.toid}</p>
            <div className="container mt-4">
              <span className="display-6 text-info font-weight-bold">معلومات الطلب</span>
              <p className="text-info mt-2 font-weight-normal"><i className="fa fa-star-of-life fa-xs"/> لا تظهر معلوماتك الشخصية إلا عند حجز عرض, وتظهر فقط للشركة المحددة.</p>
              <hr/>
              <div className="container">

                <div className="mt-2">
                <span className="font-weight-bold">نوع الطلب : </span>
                  حجز رحلة
                </div>

                <hr/>

                <div className="mt-2">
                  <span className="font-weight-bold">مدينة الصعود : </span>
                  <i dir='ltr'>{orderInfo.from}</i>
                  <br/>
                  <span className="font-weight-bold">مدينة النزول : </span>
                  <i dir='ltr'>{orderInfo.to}</i>
                </div>

                <div className="mt-2">
                  <span className="font-weight-bold">التاريخ : </span>
                  {orderInfo.date ? (<i dir="ltr">{getDate(new Date(orderInfo.date))}</i>) : 'غير مرفق'}
                  <br/>
                  <span className="font-weight-bold">اليوم : </span>
                  {orderInfo.day}
                </div>

                <hr/>

                <div className="mt-2">
                  <span className="font-weight-bold">عدد التذاكر : </span>
                  {orderInfo.tickets}
                  <br/>
                  <span className="font-weight-bold">عدد البالغين : </span>
                  {orderInfo.num_elders || 0}
                  <br/>
                  <span className="font-weight-bold">عدد الأطفال (دون 12 سنة) : </span>
                  {orderInfo.num_kids || 0}
                  <br/>
                  <span className="font-weight-bold">عدد الرضع : </span>
                  {orderInfo.num_babies || 0}
                </div>

                <hr/>

                <div className="mt-2">
                  <span className="font-weight-bold">ملاحظات إضافية : </span>
                  <p className="break-line mt-2">{orderInfo.notes || 'لا توجد ملاحظات إضافية'}</p>
                </div>


              </div>
            </div>
        
          </div>
        
        </div></div>
      )
    }

    const TransactionOrder = () => {
      let status = getStatus(orderInfo.status)
      return(
        <div className="card light-shadow p-3 mt-2 bg-grey">
          <span className="card-title display-6 text-muted">معلومات الطلب</span>
          <p className="lead text-info font-weight-bold"><i className="fa fa-star-of-life fa-xs"/>الرجاء التأكد من معلومات الطلب قبل الإستمرار في إختيار العروض</p>
          <hr/>
          
          <div className="card-body text-center">
            <p className={`badge badge-${status[1]}`}>{status[0]}</p>
            <p className="font-weight-bold lead">رقم الطلب : {orderInfo && orderInfo.toid}</p>
            <div className="container mt-4">
              <span className="display-6 text-info font-weight-bold">معلومات الطلب</span>
              <p className="text-info mt-2 font-weight-normal"><i className="fa fa-star-of-life fa-xs"/> لا تظهر معلوماتك الشخصية للشركات إلا عند حجز عرض, وتظهر فقط للشركة المحددة.</p>
              <hr/>
              <div className="container">

                <div className="mt-2">
                  <span className="font-weight-bold">نوع الطلب : </span>
                  تخليص معاملة
                </div>

                <div className="mt-2">
                  <span className="font-weight-bold">نوع المعاملة : </span>
                  {getTransType(orderInfo.type)}
                </div>

                <div className="mt-2">
                  <span className="font-weight-bold">إسم المعاملة / خدمة التقسيط : </span>
                  {orderInfo.service}
                </div>

                <div className="mt-2">
                  <span className="font-weight-bold">مقدمي الخدمة : </span>
                  {orderInfo.providers ? orderInfo.providers.split(',').map((provider, index) => {
                    return(<p key={index}>- {provider}</p>)
                  }) : null}
                </div>

                <hr/>

                {parseInt(orderInfo.num_documents) > 0 ? (
                  <div className="mt-2">
                    <span className="font-weight-bold">عدد الوثائق (الجوازات/الهويات) : </span>
                    {orderInfo.num_documents}
                  </div>
                ) : null}

                <hr/>

                <div className="mt-2">
                  <span className="font-weight-bold">ملاحظات إضافية : </span>
                  <p className="break-line mt-2">{orderInfo.notes || 'لا توجد ملاحظات إضافية'}</p>
                </div>


              </div>
            </div>
        
          </div>
        
        </div>
      )
    }

    const DeliveryOrder = () => {
      let status = getStatus(orderInfo.status)
      return (
        <div className="card light-shadow p-3 mt-2 bg-grey">
          <span className="card-title display-6 text-muted">معلومات الطلب</span>
          <p className="lead text-info font-weight-bold"><i className="fa fa-star-of-life fa-xs"/>الرجاء التأكد من معلومات الطلب قبل الإستمرار في إختيار العروض</p>
          <hr/>
          <div className="card-body text-center">
            <p className={`badge badge-${status[1]}`}>{status[0]}</p>
            <p className="font-weight-bold lead">رقم الطلب : {orderInfo && orderInfo.toid}</p>
            <div className="container mt-4">
              <span className="display-6 text-info font-weight-bold">معلومات الطلب</span>
              <p className="text-info mt-2 font-weight-normal"><i className="fa fa-star-of-life fa-xs"/> لا تظهر معلومات المرسل و المرسل إليه الشخصية للشركات إلا عند حجز عرض, وتظهر فقط للشركة المحددة.</p>
              <hr/>
              <div className="container">

                <div className="mt-2">
                  <span className="font-weight-bold">نوع الطلب : </span>
                  إرسال رسالة أو طرد
                </div>

                <div className="mt-3">
                  <span className="font-weight-bold">نوع الطرد : </span>
                  <i>{getDelivType(orderInfo.package_type)}</i>
                  <br/>
                  <span className="font-weight-bold">وزن الطرد: </span>
                  <i dir="ltr">{orderInfo.package_weight} kg</i>
                </div>

                <div className="mt-2">
                  <span className="font-weight-bold">محتوى الطرد : </span>
                  <p className="break-line">{orderInfo.content}</p>
                </div>

                <hr/>

                <div className="mt-3">
                  <span className="font-weight-bold">مدينة المرسل : </span>
                  {orderInfo.from}
                </div>

                <div className="mt-3">
                  <span className="font-weight-bold">مدينة المرسل إليه : </span>
                  {orderInfo.to}
                </div>

                <hr/>

                <div className="mt-2">
                  <span className="font-weight-bold">ملاحظات إضافية : </span>
                  <p className="break-line mt-2">{orderInfo.notes || 'لا توجد ملاحظات إضافية'}</p>
                </div>


              </div>
            </div>
        
          </div>
        </div>
      )  
    }
    
    if (orderInfo){return TripOrder()}
    if (orderInfo && orderInfo.order_type === 'transaction'){return TransactionOrder()}
    if (orderInfo && orderInfo.order_type === 'delivery'){return DeliveryOrder()}
  }

  // Handle Offers

  const handleOffer = (e) => {
    e.preventDefault()
    setOffer(true)
    setOfferID(e.target.id);
  }

  const handleOfferSubmit = (e) => {
    e.preventDefault();
    const AcceptOffer = async() => {
      await fetch('/api/offers/accept', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({orderID: oid, offerID: offerID})
      }).then(resp => {
        resp.json().then(_ => {
          if(resp.ok){
            setRedirect(true)
          } else {
            window.location.reload();
          }
        })
      })
    }

    AcceptOffer();
  }

  // Handle Delete Order

  const handleDelete = (e) => {
    e.preventDefault();

    const Delete = async() => {
      await fetch(`/api/orders/${oid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(resp => {
        resp.json().then(_ => {
          if (resp.ok){
            setHome(true)
          } else {
            setError({
              Delete: {
                name: 'حذف الطلب',
                error: 'حدث خطأ أثناء محاولة حذف الطلب, الرجاء التواصل مع الإدارة لحذف الطلب.'
              }
            })
          }
        })
      })
    }

    Delete();
  }

  // Handle Edit Trip Order
  const onEdit = (e) => {
    e.preventDefault();
    var passengers = orderInfo.passengers
    console.log(passengers)
    let data = passengers['data'];
    let num = data.length;

    setState({
      data: data,
      num: num
    });

    setEdit(true);
  }

  const addPassenger = (e) => {
    e.preventDefault();

    setState({
      ...state,
      num: state.num + 1

    })
  }

  const removePassenger = (e) => {
    e.preventDefault();
    // Get To Remove Passenger ID
    const id = state.num - 1;

    // Remove Passenger with ID
    const passengers = state.data;
    passengers.splice(id, 1)

    setState({

      data: passengers,
      num: state.num - 1
    })

  }

  const handleEditChange = (e) => {
    e.preventDefault();

    // Get keys => Namespace & ID
    var keys = e.target.id.split('-')
    let namespace = keys[0]
    let id = keys[1]

    //  Keeping The State & Adding Info
    let CurState = {...state}
    let CurPasInfo = [...CurState.data]

    let TargetPass = {...CurPasInfo[id], [namespace]: e.target.value}

    CurPasInfo[id] = TargetPass

    setState({
      ...state,
      data: CurPasInfo
    });
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()

    const UpdateOrder = async() => {
      await fetch(`/api/trips/order/${oid}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(state)
      }).then(resp => {
        resp.json().then(_ => {
          if (resp.ok){
            window.location.reload();
          } else {
            setEdit(false)
            setError({
              Update: {
                name: 'تعديل الحجز',
                error: 'حدث خطأ أثناء محاولة تعديل الطلب, الرجاء المحاولة من جديد لاحقاً.'
              }
            })
          }
        })
      })
    }

    UpdateOrder();
  }
  
  // عروض الشركات
  const companiesOffers = () => {
    let status = orderInfo && orderInfo.status
    let offers = orderInfo && orderInfo.offers
    return(
      <div className="mt-2">
        <span className="card-title display-6 text-muted">عروض الشركات</span>
        <hr/>

        <div className="card-body text-center">
          {['pending', 'open', 'fulfilled'].includes(status) ? (
            <div className="container">
              <div className="container order table-responsive mt-5">
                <table className="table order table-bordered table-striped bg-grey">
                  <thead>
                    <tr className="bg-info">
                    <th className="font-weight-bold" scope="col">رقم العرض</th>
                      <th className="font-weight-bold" scope="col">الشركة</th>
                      {orderInfo.type === 'SAYE' ? (
                        <th className="font-weight-bold" scope="col">الإجمالي(سعودي)</th>
                      ) : (
                        <th className="font-weight-bold" scope="col">الإجمالي(يمني)</th>
                      )}
                      <th className="font-weight-bold" scope="col">إنتهاء العرض</th>
                      <th className="font-weight-bold" scope="col">قبول</th>
                    </tr>
                  </thead>
                  <tbody>
                    {offersInfo ? (offersInfo.map((offer, index) => {
                      let expire = getExpire(offer.expire, offer.oid)
                      return(
                        <tr key={index}>
                          <td className="font-weight-nav">{offer.oid}</td>
                          <td className="font-weight-nav">{offer.company}</td>
                          {orderInfo.type === 'SAYE' ? (
                            <td className="font-weight-bold">{Math.round(parseFloat(offer.price)) || 0}</td>
                          ) : (
                            <td className="font-weight-bold">{Math.round(parseFloat(offer.price*66.76)) || 0}</td>
                          )}
                          <td className="font-weight-bold">{expire[0]}</td>
                          <td className="font-weight-bold">{expire[1] ? (<button onClick={handleOffer} id={offer.oid} className="btn btn-sm btn-success">قبول </button>) : (<i className="font-weight-bold text-danger">العرض منتهي</i>)}</td>
                        </tr>
                      )
                    })) : null}
                  </tbody>
                </table>
              
              </div>
              {offers > 0 ? null : (
                  <span className="display-8 text-secondary">لا توجد عروض حتى الآن</span>
                )}
            </div>
        
          ): ['closed', 'rejected'].includes(status) ? (
            <div className="container mt-4">
              <span className="text-dark display-7">الطلب مغلق</span>
              <p className="lead mt-4">الطلب مغلق لأحد الأسباب التالية : </p>
              <p className="font-weight bold text-primary mt-4">
                - تم دفع قيمة الطلب بالفعل.
              </p>
              <p className="font-weight bold text-primary mt-4">
                - تم إغلاق الطلب من قبل الإدارة.
              </p>
            </div>
          ) : (
            <div className="container mt-5">
              <span className="text-info display-7">الطلب في إنتظار الدفع</span>
              <div className="alert alert-danger mt-4">
                <p className="font-weight-bold">
                  الدفع للرحلات بين المدن اليمنية, والرحلات المنطلقة من اليمن, عبر التحويل البنكي أو بوابة الدفع زمزم, أو نقداً فقط.
                </p>
              </div>
              <p className="mt-4 text-success font-weight-bold"><Link to={`${window.location.pathname}/payment`}>للإنتقال لصفحة الدفع</Link></p>
            </div>
          )}
        </div>
        
        <div className="input-group justify-content-center mt-5">
          {orderInfo && orderInfo.status === 'closed' ? null : (
            <button onClick={() => {setDelete(true)}} className="btn btn-md btn-outline-danger font-weight-bold">
              إلغاء الطلب
            </button>
          )}
          {orderInfo && orderInfo.order_type === 'trip' ? 
          (offersInfo && offersInfo.length > 0 ? null : orderInfo && ['pending', 'open', 'fulfilled'].includes(orderInfo.status) ? (
            <button onClick={onEdit} className="btn btn-md btn-outline-secondary font-weight-bold">
              تعديل الحجز
            </button>
            ) : null
          ) : null}
        </div>

      </div>
    )
  }

  const checkBuyer = () => {
    
    const handleAccessKeyVerification = (e) => {
      let order_id = orderInfo.toid || orderInfo.doid
      e.preventDefault();
      const VerifyAccessKey = async() => {
        await fetch('/api/offers/validateKey', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({'orderID': order_id, 'access_key': accessKey})
        }).then(resp => {
          resp.json().then(data => {
            if (resp.ok){
              if (data.isValidate){
                setBuyer(true);
              } else {
                setValidationFlash({
                  name: 'رمز التحقق',
                  error: 'رمز التحقق غير صحيح, لا يمكنك الإطلاع على العروض حتى تقوم بإدخال الرمز الصحيح.',
                  type: 'warning'
                })
              }
            } else {
              if (data.code === 'EMPTY_REQUEST'){
                setValidationFlash({
                  name: 'خطأ',
                  error: 'يجب أن تدخل كافة البيانات المطلوبة.',
                  type: 'danger'
                })
              }
              if (data.code === 'INVALID_REQUEST'){
                setValidationFlash({
                  name: 'رمز التحقق',
                  error: 'يجب أن تدخل رمز التحقق أولاً.',
                  type: 'warning'
                })
              }
              if (data.code === 'SERVER'){
                setValidationFlash({
                  name: 'خطأ',
                  error: 'حدث خطأ في السيرفر أثناء التحقق من الرمز, الرجاء المحاولة من جديد لاحقاً.',
                  type: 'danger'
                })
              }
            }
          })
        })
      }
      VerifyAccessKey();
    }

    const handleAccessKeyChange = (e) => {
      e.preventDefault();
      setValidationFlash()
      setAccessKey(e.target.value)
    }

    const sendAccessKey = async(e) => {
      e.preventDefault();
      await fetch('/api/offers/resend_access_key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({'oid': oid})
      }).then(resp => {
        resp.json().then(data => {
          if (resp.ok){
            setValidationFlash({
              name: 'رمز التحقق',
              error: 'تم إرسال رمز التحقق لأرقام الجوال والبريد الإلكتروني',
              type: 'success'
            })
          } else {
            setValidationFlash({
              name: 'رمز التحقق',
              error: 'حدث خطأ أثناء محاولة إرسال رمز التحقق, الرجاء المحاولة من جديد لاحقاً',
              type: 'danger'
            })
          }
        })
      })
    }

    return (
      <div className="container mt-2">
        {validationFlash ? (
          <div className={`alert alert-${validationFlash.type}`}>
            <p className="font-weight-bold">
              {validationFlash.name} : {validationFlash.error}
            </p>
          </div>
        ) : null}
        <form onSubmit={handleAccessKeyVerification}>
          <div className="form-group justify-content-center mt-2">
            <label htmlFor="access_key" className="font-weight-bold ml-sm-4 mr-md-4">* أدخل رمز التحقق, لمتابعة عروض الشركات : </label>
            <div className="input-group justify-content-center mt-2">
              <input id="access_key" onChange={handleAccessKeyChange} type="text" className="form-control col-sm-2"/>
              <div>
                <button className="btn-outline-success form-control">تحقق</button>
              </div>
            </div>
          </div>
          <span className="text-primary font-weight-light mt-2"><Link onClick={sendAccessKey} to="#"> إرسال رمز التحقق</Link></span>
          <p className="font-info">سيتم إرسال رمز التحقق عبر أرقام الجوال المسجلة, و البريد الإلكتروني المسجل.</p>
        </form>
      </div>
    )
  }

  if (redirect){
    return <Redirect to={`${window.location.pathname}/payment`}/>
  }

  if (notFound){
    return <Redirect to="/orders"/>
  }

  if (home){
    return <Redirect to="/"/>
  }

  const loadErrors = () => {
    if (Object.keys(error).length !== 0 && error.constructor === Object){
      return (
        <div className="alert alert-info text-right mt-4">
          {error ? Object.entries(error).map((e, id) => {
            return (
              <p className="font-weight-bold" key={id}>
                {e[1].name} : {e[1].error}
              </p>
            )
          }): null}
        </div>
      )
    }
  }
  
  return (
    <div className="mb-5 pb-5">
      
      <div className="carousel-item active" style={{backgroundImage: `url(${homeImg})`, opacity: 0.82}}>
        <div className="text-info carousel-caption flex-center">
          <h3 className="display-5">عرض الطلب</h3>
        </div>
      </div>

      <div className="container text-center mt-4">
        <span className="display-6">أقسام الطلبات</span>
        <hr/>
        <p className="lead font-weight-bold">
          <Link className="text-primary" to="/orders"> البحث عن الطلبات </Link>
        </p>
      </div>

      <div className="container text-center mt-5">
        <div className="card light-shadow p-3 mt-2 bg-grey">
          <span className="card-title display-6 text-muted">خيارات متابعة الطلب</span>
          <hr/>
          <div className="card-body display-8 text-center">
            <div className="mt-2">
              <p className="text-primary font-weight-bold">1- نسخ رقم الطلب التالي : </p>
              <p className="text-dark font-weight-bold">{oid}</p>
              <p className="text-primary">وتتبعه بإستخدام <Link className="text-success" to="/orders">البحث عن الطلبات</Link></p>
            </div>
            <div className="mt-5">
              <p className="text-primary font-weight-bold">2- نسخ الرابط التالي مباشرة : </p>
              <p className="text-dark font-weight-bold"><a className="text-info" href={window.location.href}>{window.location.href}</a></p>
            </div>
            <div className="mt-5">
              <p className="text-primary font-weight-bold">3- إستخدام المسح السريع QRCode : </p>
              <QRCode value={window.location.href}/>
            </div>
          </div>
          {/* {orderInfo && orderInfo.uid ? null : (<p className="text-muted link-large">أو قم <Link to={{pathname: '/register', state: {order: oid}}}>بالتسجيل</Link> لتتبع الطلب تلقائياً</p>)} */}
        </div>
      </div>


      <div className="container text-center mt-4">
        {Info()}
        <div className="card light-shadow p-3 mt-2 bg-grey">
          {orderInfo && orderInfo.status === 'waiting' ? companiesOffers() : isBuyer ? companiesOffers() : checkBuyer()}
        </div>
        <div className="container mt-2">
          {loadErrors()}
        </div>
      </div>
      
      {/* Confirm Offer */}
      <Modal show={isOffer} onHide={() => {setOffer(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>تأكيد العرض</Modal.Title>
        </Modal.Header>
        <Modal.Body>هل أنت متأكد من إختيار العرض ؟ علماً أنه لا يمكنك التغيير بعد التأكيد.</Modal.Body>
        <Modal.Footer>
          <Button variant="grey" onClick={() => {setOffer(false)}}>
            إلغاء
          </Button>
          <Button variant="success" onClick={handleOfferSubmit}>
            تأكيد, وإستمرار للدفع
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Confirm Delete */}
      <Modal show={isDelete} onHide={() => {setDelete(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>تأكيد الحذف</Modal.Title>
        </Modal.Header>
        <Modal.Body>هل أنت متأكد من حذف الطلب؟</Modal.Body>
        <Modal.Footer>
          <Button variant="grey" onClick={() => {setDelete(false)}}>
            إلغاء
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            تأكيد الحذف
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Edit Trip Order */}
      <Modal show={isEdit} onHide={() => {setEdit(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>تعديل بيانات الركاب</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleEditSubmit}>
            
            {[...Array(parseInt(state.num))].map((_, index) => (
              <div key={index} className="mt-4">
                <div className="container text-right mr-md-4">
                  <p className="font-weight-bold">* بيانات الراكب {index+1} : </p>
                </div>

                <div className="row">

                  <div className="col-sm-8 col-md-6">
                    
                    <label htmlFor={`name-${index}`} className="ml-sm-4"/>
                    <div className="input-group">
                      <input defaultValue={state.data[index] && state.data[index].name} required onChange={handleEditChange} id={`name-${index}`} type="text" placeholder={`* إسم الراكب ${index+1}`} className="form-control"/>
                    </div>
                    
                  </div>
                  
                  <div className="col-sm-8 col-md-6">
                    
                    <label htmlFor={`age-${index}`} className="ml-sm-4"/>
                    <div className="input-group">
                      <select defaultValue={state.data[index] && state.data[index].age} required onChange={handleEditChange} id={`age-${index}`} className="custom-select font-weight-bold">
                        <option value="" defaultValue={state.data[index] && state.data[index].age ? true : false}>حدد الفئة العمرية للراكب {index+1} </option>
                        <option value="رضيع" className="">رضيع (تحت السنتين)</option>
                        <option value="طفل" className="">طفل (بين السنتين و 12 سنة)</option>
                        <option value="بالغ" className="">بالغ</option>
                      </select>
                    </div>
                    
                  </div>

                  <div className="col-sm-8 col-md-6">
                  
                    <label htmlFor={`gender-${index}`} className="ml-sm-4"/>
                    <div className="input-group">
                      <select defaultValue={state.data[index] && state.data[index].gender} required onChange={handleEditChange} id={`gender-${index}`} className="custom-select font-weight-bold">
                        <option value="" defaultValue={state.data[index] && state.data[index].age ? true : false}>حدد جنس الراكب {index+1} </option>
                        <option value="ذكر" className="">ذكر</option>
                        <option value="أنثى" className="">أنثى</option>
                      </select>
                    </div>
                    
                  </div>

                  <div className="col-sm-8 col-md-6">
                  
                    <label htmlFor={`documentID-${index}`} className="ml-sm-4"/>
                    <div className="input-group">
                      <input defaultValue={state.data[index] && state.data[index].documentID} onChange={handleEditChange} id={`documentID-${index}`} type="text" placeholder={`رقم هوية الراكب ${index+1}`} className="form-control"/>
                    </div>
                    
                  </div>

                </div>

              </div>
            ))}
            <div className="input-group mt-2">
              <button onClick={addPassenger} className="btn btn-md btn-outline-dark mr-md-4">إضافة راكب</button>
              {
                state.num > 1 ? (
                    <button onClick={removePassenger} className="btn btn-md btn-outline-danger mr-md-4">حذف راكب</button>
                ) : null
              }
            </div>
            
            <Modal.Footer className="mt-4">
              <Button variant="grey" onClick={() => {setEdit(false)}}>
                إلغاء
              </Button>
              <Button variant="secondary" type="submit">
                تأكيد التعديلات
              </Button>
            </Modal.Footer>

        </form>  
    
        </Modal.Body>
      </Modal>
      
    </div>
  )
}


/*
    const getInfo = (info) => {    
      let types = {
        babies_price: 'التكلفة لكل رضيع (ريال)',
        kids_price: 'التكلفة لكل طفل (ريال)',
        elders_price: 'التكلفة لكل بالغ (ريال)',
        num_babies: 'عدد الرضَّع',
        num_kids: 'عدد الأطفال',
        num_elders: 'عدد البالغين',
        package_weight: 'وزن الطرد',
        price_per_kilogram: 'التكلفة لكل كيلو (ريال)',
        document_price: 'التكلفة لكل وثيقة (ريال)',
        num_documents: 'عدد الوثائق',
        installment_price: 'التكلفة لكل قسط (ريال)',
        num_installments: 'عدد الأقساط'
      }
      return (info ? Object.entries(info).map((key, index) => {
        return(
          <p key={index}>- {types[key[0]]} : {key[1]}</p>
        )
      }): null)
    }
    */ 