import React, { useState, useEffect } from 'react';
import homeImg from '../../../Static/Images/Home/order.jpg';
import { Link, useParams, Redirect } from 'react-router-dom';

// Default Preview Image
import preview_img from '../../../Static/Images/Preview/preview.png'



export const Payment = () => {

  const { oid } = useParams();
  const [error, setError] = useState({});
  const [offerInfo, setOffer] = useState();
  const [available, setAvailable] = useState(true);

  // Check if User is Authorized to Access Payment
  const [accessKey, setAccessKey] = useState();
  const [isBuyer, setBuyer] = useState(true);
  const [validationFlash, setValidationFlash] = useState()

  // Payment Method (Full, Deposit, On Delivery)
  const [payment, setPayment] = useState();

  const [option, setOption] = useState();

  // Pay Using Bank (Button Config)
  const [targetBank, setTargetBank] = useState(null);
  const [payBtn, setPayBtn] = useState('btn') // btn & progBar & compl

  const mailSubject = `صورة تحويل للطلب رقم ${oid}`

  // Payment State
  const [state, setState] = useState({
    orderID: oid,
    offerID: null,
    payment_price: '0',
    deposit_price: '0',
    price_no_deposit: '0',
    full_price: '0',
    type: null,
    method: null,
    transfer_img: null,
    is_verified: null,
    is_completed: null,
    is_done: false
  });

  // For PayPal Only!
  const [payPal, setPayPal] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Redirect if not in Payment State
  const [redirect, setRedirect] = useState(false);
  
  useEffect((state) => {
    
    // Fetch Offer
    fetch(`/api/${oid}/offer`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(resp => {
      resp.json().then(data => {
        if (resp.ok){
          setOffer(data.offer)
          setState({
            offerID: data.offer.oid,
            type_dir: data.type_dir,
            orderID: oid,
            payment_price: '0',
            deposit_price: '0',
            price_no_deposit: '0',
            full_price: '0',
            type: null,
            method: null,
            transfer_img: null,
            is_verified: null,
            is_completed: null,
            is_done: false
          });
        } else {
          setAvailable(false);
        }
      })
    })
  }, [oid])

  const handlePayment = async(e) => {
    e.preventDefault();
    await fetch('/api/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(state)
    }).then(resp => {
      resp.json().then(_ => {
        if (resp.ok){
          setCompleted(true)
        } else {
          setError({
            Server: {
              name: 'السيرفر',
              error: 'حدث خطأ في تسجيل العملية في السيرفر, الرجاء التواصل مع الإدارة لتأكيد الدفع!',
              type: 'warning'
            }
          })
        }
      })
    })
  }

  const handleSwitch = (e) => {
    e.preventDefault();
    // Reset Form & Option
    let PForm = document.paymentForm;
    PForm && PForm.reset()
    setOption();
    setError({});
    
    // Set Payment Method
    setPayment(e.target.value);
    if (e.target.value === 'full_payment'){
      setState({
        ...state,
        method: null,
        type: e.target.value,
        deposit_price: offerInfo.deposit,
        price_no_deposit: offerInfo.price_no_deposit,
        full_price: offerInfo.price,
        is_completed: true,
        payment_price: offerInfo.price
      });
    } 
    else if (e.target.value === 'deposit_payment') {
      setState({
        ...state,
        method: null,
        type: e.target.value,
        deposit_price: offerInfo.deposit,
        price_no_deposit: offerInfo.price_no_deposit,
        full_price: offerInfo.price,
        is_completed: false,
        payment_price: offerInfo.deposit
      });
    } 
    else {
      setState({
        ...state,
        method: null,
        type: e.target.value,
        deposit_price: offerInfo.deposit,
        price_no_deposit: offerInfo.price_no_deposit,
        full_price: offerInfo.price,
        is_completed: false,
        payment_price: '0'
      });
    }
    
  }

  const handleOptions = (e) => {
    setOption(e.target.value)
    // Reset Errors
    setError({});

    if (e.target.value === 'paypal'){
      setState({
        ...state,
        method: e.target.value,
        is_verified: true
      })
    } else {
      setState({
        ...state,
        method: e.target.value,
        is_verified: false
      })
    }
  }

  const handleBankSwitch = (e) => {
    setTargetBank(e.target.value)
  }

  const handleImageSelect = (e) => {
    let fileToUpload = e.target.files
    if (e.target.value){
      // Clear Related Errors
      let errors = error
      delete errors["AWSS3"]
      setError(errors)
      document.getElementById('image_preview').src = URL.createObjectURL(fileToUpload[0])
    }
    
  }

  const handleImageUpload = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)

    const UploadImage = async() => {
      await fetch('/api/image/upload', {
        method: 'POST',
        headers: {
          'Accept': 'multipart/form-data'
        },
        body: formData
      }).then(resp => {
        resp.json().then(data => {
          if (resp.ok){
            setPayBtn('compl')
            setState({
              ...state,
              transfer_img: data.key,
              is_done: true
            });
          } else {
            console.log(data)
            setError({
              AWSS3: {
                name: 'خطأ',
                error: 'حدث خطأ أثناء رفع الصورة, الرجاء المحاولة من جديد.',
                type: 'warning'
              }
            });
            setPayBtn('btn')
          }
        })
      })
    }

    // Clear Related Errors
    let errors = error
    delete errors["AWSS3"]
    setError(errors)

    setPayBtn('progBar')
    UploadImage();
    
  }

  const openZmzm = () => {
    window.location.href = 'http://www.zamzambooking.com/ar/bus-application'
  }

  const openLink = (e) => {
    e.preventDefault();

    window.open(e.target.id);
  }

  const confirmPayment = (
    <div className="container text-center mt-5">
      <div className="justify-content-center">
        <button onClick={handlePayment} className="btn btn-lg btn-outline-success">تأكيد</button>
      </div>
    </div>
  )

  const bankTrans = (
    <div className="container mt-4">
      <hr/>
      
      <div>
        <span className="lead text-info font-weight-bold">
          قم بتحديد الدولة (اليمن/السعودية) للتحويل البنكي : 
        </span>
        <p className="text-primary font-info">
          يجب عليك تحويل المبلغ المطلوب للحساب المحدد.
        </p>
        <div className="form-inline justify-content-center mt-2">
      
          <div className="form-check">
            <input onClick={handleBankSwitch} type="radio" className="form-check-input" name="bankRadios" id="bankRadios1" value="YE"/>
            <label htmlFor="bankRadios1" className="form-check-label mr-3">
              الجمهورية اليمنية
            </label>
          </div>

          <div className="form-check mr-md-5 mt-4 mt-md-0">
            <input onClick={handleBankSwitch} type="radio" className="form-check-input" name="bankRadios" id="bankRadios2" value="SA"/>
            <label htmlFor="bankRadios2" className="form-check-label mr-3">
              المملكة العربية السعودية
            </label>
          </div>
        </div>
        
          {targetBank === 'SA' ? (
            <div className="text-dark mt-4">
              <p className="font-weight-bold text-dark">
                إسم البنك : بنك الجزيرة
                <br/>
                مالك الحساب : مؤسسة أحمد عبدالله أبو لبن للمقاولات العامة
              </p>
              <p className="font-weight-bold text-muted">
                رقم الحساب : 010495014544001
                <br/>
                الرقم الأيبان : SA1460100010495014544001
              </p>
            </div>
          ) : targetBank === 'YE' ? (
            <div className="text-dark mt-4">
              <p className="font-weight-bold text-dark">
                مالك البنك : مصرف كريمي (صنعاء/شارع هائل)
                <br/>
                إسم صاحب الحساب : عبدالحكيم حسن عبدالله
              </p>
              <p className="font-weight-bold text-muted">
                رقم الحساب (ريال سعودي) : 42022775
                <br/>
                رقم الحساب (ريال يمني) : 120247906
                <br/>
                الرقم المميز : 1515161
              </p>
            </div>
          ) : null}
        
      </div>
      
      <hr/>

      <div className="container mt-4">
        <p className="text-primary font-weight-bold">
          الرجاء إرسال صورة التحويل عبر رقم الواتساب أو البريد الإلكتروني عبر الروابط التالية : 
        </p>
        <div className="container mt-2">
          <Link to="#">
            <i id="https://wa.me/+966567928521" onClick={openLink} className="text-success fab fa-whatsapp fa-3x font-weight-bold"/>
          </Link>
          <Link to="#" onClick={openLink}>
            <i id={`mailto:yemenbus1@gmail.com?Subject=${mailSubject}`} className="text-danger fas fa-envelope fa-3x font-weight-bold mr-4"/>
          </Link>
        </div>
      </div>

      <p className="text-muted mt-2">
        سيتم التأكد من التحويل, والتواصل معك مباشرة, من قبل المسوقين
      </p>
      
      <form onSubmit={handlePayment} className="container text-center">
        <div className="form-check mt-4 mr-md-4">
          <input required type="checkbox" className="form-check-input"/>
          <label htmlFor="confirm" className="form-check-label font-weight-bold mr-4">
            قمت بإرسال صورة التحويل عبر الواتساب أو البريد الإلكتروني.
          </label>
        </div>

        <div className="container text-center mt-5">
          <div className="justify-content-center">
            <button type="submit" className="btn btn-lg btn-outline-success">تأكيد</button>
          </div>
        </div>
      </form>

      {/* <div className="form-inline justify-content-center mt-4">
        <label htmlFor="image" className="ml-sm-4 font-weight-bold">* صورة التحويل : </label>
        <div className="input-group">
          <input required onChange={handleImageSelect} type="file" name="image" id="image" className="file-custom" accept="image/*"/>
        </div>
      </div>
      
      <div className="container mt-4">
          <img id="image_preview" src={preview_img} width="480" alt="preview" className="img-fluid img-thumbnail"/>
      </div> */}

      {/* <div className="input-group justify-content-center mt-4">
        {payBtn === 'btn' ? (
          <input type="submit" value="رفع الصورة" className="btn btn-md btn-primary"/>
        ) : payBtn === 'progBar' ? (
          <div className="spinner-border text-info" role="status">
            <span className="sr-only">قيد الرفع...</span>
          </div>
        ) : (
          <span className="display-8 text-success">تم رفع الصورة بنجاح.</span>
        )}
      </div> */}
    </div>
  )

  const paypal = (
    <div className="container mt-4">
      <div className="input-group justify-content-center mt-4">
        <button onClick={() => {setPayPal(true)}} className="btn btn-md btn-outline-primary font-weight-bold">
          تأكيد وأنتقال لصفحة دفع البايبال
        </button>
      </div>
    </div>
  )

  const zamzam = (
    <div className="container mt-4">

      <div className="container mt-2">
        <span className="font-weight-bold">عزيزي العميل</span>
        <p className="text-info mt-2">
          الرجاء الضغط على الزر التالي, للتوجه لصفحة زمزم,
           والرجاء تعبئة بيانات الطلب وإضافة رقم طلبك ({state.orderID}) بالإضافة للنص التالي "طلب عبر يمن باص" في الملاحظات.
        </p>
        <p className="text-muted">
          سيتم التواصل معك للتأكد من الدفع, وإكمال الإجراءات.
        </p>
      </div>

      <div className="input-group justify-content-center mt-4">
        <Link to="#" onClick={openZmzm} className="btn btn-md btn-outline-primary font-weight-bold">
          الدفع عبر موقع زمزم
        </Link>
      </div>
    </div>
  )

  const FullPayment = (
    <div name="paymentForm" className="container text-center mt-5">
      
      <form name="paymentForm">
        <span className="display-6 font-weight-bold text-primary">دفع المبلغ كاملاً عبر الوسائل التالية : </span>
        {
          state.type_dir === 'SAYE' ? (
            <p className="font-weight-bold text-dark mt-4">
              التكلفة : {offerInfo && Math.round(parseFloat(offerInfo.price)) || 0} ريال سعودي
            </p>
          ) : (
            <p className="font-weight-bold text-dark mt-4">
              التكلفة : {offerInfo && Math.round(parseFloat(offerInfo.price*66.76)) || 0} ريال يمني
            </p>
          )
        }
        <div className="form-inline justify-content-center mt-5">

          <div className="form-check">
            <input onClick={handleOptions} type="radio" className="form-check-input" name="paymentRadios" id="paymentRadios1" value="zmzm"/>
            <label htmlFor="paymentRadios1" className="form-check-label mr-3">
              موقع زمزم
            </label>
          </div>

          <div className="form-check mr-md-5 mt-4 mt-md-0">
            <input onClick={handleOptions} type="radio" className="form-check-input" name="paymentRadios" id="paymentRadios2" value="paypal"/>
            <label htmlFor="paymentRadios2" className="form-check-label mr-3">
              البايبال | PayPal
            </label>
          </div>

          <div className="form-check mr-md-5 mt-4 mt-md-0">
            <input onClick={handleOptions} type="radio" className="form-check-input" name="paymentRadios" id="paymentRadios3" value="bank"/>
            <label htmlFor="paymentRadios3" className="form-check-label mr-3">
              التحويل البنكي
            </label>
          </div>

        </div>
      </form>
    </div>
  )

  const PartPayment = (
    <div name="paymentForm" className="container text-center mt-5">
      
      <form name="paymentForm">
        <span className="display-6 font-weight-bold text-primary">دفع العربون عبر الوسائل التالية : </span>
        
        {
          state.type_dir === 'SAYE' ? (
            <div>
              <p className="font-weight-bold text-dark mt-4">
                قيمة العربون : {offerInfo && Math.ceil(parseFloat(offerInfo.deposit))} ريال سعودي
                <br/>
                القيمة المتبقية : {offerInfo && Math.floor(parseFloat(offerInfo.price_no_deposit))} ريال سعودي
              </p>
            </div>
          ) : (
            <div>
              <p className="font-weight-bold text-dark mt-4">
                قيمة العربون : {offerInfo && Math.ceil(parseFloat(offerInfo.deposit*66.76))} ريال يمني
                <br/>
                القيمة المتبقية : {offerInfo && Math.floor(parseFloat(offerInfo.price_no_deposit*66.76))} ريال يمني
              </p>
            </div>
          )
        }

        <div className="form-inline justify-content-center mt-5">
    
        <div className="form-check">
          <input onClick={handleOptions} type="radio" className="form-check-input" name="paymentRadios" id="paymentRadios1" value="zmzm"/>
          <label htmlFor="paymentRadios1" className="form-check-label mr-3">
            موقع زمزم
          </label>
        </div>

        <div className="form-check mr-md-5 mt-4 mt-md-0">
          <input onClick={handleOptions} type="radio" className="form-check-input" name="paymentRadios" id="paymentRadios2" value="paypal"/>
          <label htmlFor="paymentRadios2" className="form-check-label mr-3">
            البايبال | PayPal
          </label>
        </div>

        <div className="form-check mr-md-5 mt-4 mt-md-0">
          <input onClick={handleOptions} type="radio" className="form-check-input" name="paymentRadios" id="paymentRadios3" value="bank"/>
          <label htmlFor="paymentRadios3" className="form-check-label mr-3">
            التحويل البنكي
          </label>
        </div>
      </div>
      </form>
    </div>
  )

  const LaterPayment = (
    <form name="paymentForm" className="container text-center mt-5">
      <span className="display-6 font-weight-bold text-primary">دفع المبلغ كاملاً عند الإستلام</span>
      <p className="text-info font-nav mt-4">
        سيتم التواصل معك من قبل المسوقين عند تأكيد الحجز.
      </p>
      {confirmPayment}

    </form>
  )

  const PaymentForm = () => {

    // Payment Options
    
    if (payment === 'full_payment'){return FullPayment}
    if (payment === 'deposit_payment'){return PartPayment}
    if (payment === 'delivery_payment'){return LaterPayment}
  }

  const checkBuyer = () => {
    
    const handleAccessKeyVerification = (e) => {
      let order_id = oid
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
            <label htmlFor="access_key" className="font-weight-bold ml-sm-4 mr-md-4">* أدخل رمز التحقق, للمتابعة لصفحة الدفع : </label>
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

  
  if (completed){
    return <Redirect to={{
      pathname: '/payments',
    }}/>
  }

  if (payPal){
    return <Redirect to={{
      pathname: '/payments/paypal',
      state: state
    }} />
  }

  if (redirect){
    return <Redirect to={`/orders/${oid}`}/>
  }

  const loadErrors = () => {
    if (Object.keys(error).length !== 0 && error.constructor === Object){
      return (
        <div className="mt-4">
          {error ? Object.entries(error).map((e, id) => {
            return (
              <div key={id} className={`alert alert-${e[1].type} text-right`}>
                <p className="font-weight-bold" >
                  {e[1].name} : {e[1].error}
                </p>
              </div>
            )
          }): null}
        </div>
      )
    }
  }

  if (!available){
    setTimeout(() => {setRedirect(true)}, 3000)
  }

  // إظهار الصفحة
  return(
    <div className="mb-5 pb-5">
      <div className="carousel-item active" style={{backgroundImage: `url(${homeImg})`, opacity: 0.82}}>
        <div className="text-info carousel-caption flex-center">
          <h3 className="display-5">صفحة الدفع</h3>
        </div>
      </div>

      <div className="container text-center mt-4">
        <span className="display-6">أقسام الطلبات</span>
        <hr/>
        <p className="lead font-weight-bold">
          <Link className="text-primary" to="/trips/order"> طلب حجز رحلة </Link>|
          <Link className="text-primary" to="/transactions/order"> طلب تخليص معاملة </Link>|
          <Link className="text-primary" to="/delivery/order"> طلب توصيل طرد </Link>
        </p>
      </div>

      <div className="container text-center mt-5">
        <div className="card p-3 bg-grey shadow">
          <span className="card-title display-6">دفع قيمة الخدمة ({oid}#)</span>
          <hr/>
          <div className="alert alert-danger mt-4">
            <p className="font-weight-bold">
              الدفع للرحلات بين المدن اليمنية, والرحلات المنطلقة من اليمن, عبر التحويل البنكي أو بوابة الدفع زمزم, أو نقداً فقط.
            </p>
          </div>
          <div className="card-body">
            {isBuyer ? (
              <div>
                {available ? (
                <div className="form-inline mt-4">
                  <label htmlFor="payment_method" className="ml-sm-4 mr-md-4 font-weight-bold">* أختر طريقة الدفع : </label>
                  <div className="input-group">
                    <select onChange={handleSwitch} id="payment_method" className="custom-select font-weight-bold">
                      <option className="font-weight-bold text-muted" value="">إختر طريقة الدفع</option>
                      <option className="font-weight-bold" value="deposit_payment">دفع عربون والباقي عند الإستلام (حجز مضمون)</option>
                      <option className="font-weight-bold" value="full_payment">دفع المبلغ كامل (حجز مضمون)</option>
                      <option className="font-weight-bold" value="delivery_payment">الدفع عند الإستلام (حجز إنتظار)</option>
                    </select>
                  </div>
                </div>
            
                ) : (
                  <div className="text-center">
                    <span className="display-8 text-danger">حدث خطأ ما, يبدو أن العرض الذي أخترته غير موجود أو قد تم دفع قيمته.</span>
                    <p className="text-info mt-5">إذا كنت تعتقد بأن هذا خطأ, الرجاء التواصل مع الإدارة <Link to="/contact" className="text-success">من هنا</Link></p>
                  </div>
                )}
                {PaymentForm()}
                {option === 'bank' ? bankTrans : option === 'paypal' ? paypal : option === 'zmzm' ? zamzam : null}
                {loadErrors()}
                {state.is_done ? confirmPayment : null}
              </div>
            ) : checkBuyer()}
          </div>
        </div>
      </div>

    </div>
  )
}
