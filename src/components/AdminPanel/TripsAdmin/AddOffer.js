import React, { useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useState } from 'react';
//import {Cookies} from 'react-cookie';;


export const AddOffer = (props) => {
  //const cookies = new Cookies();

  const orderInformation = props.location.state;
  const [info, setInfo] = useState({...orderInformation});

  const [state, setState] = useState({expire:0});
  const [order, setOrder] = useState();
  const [error, setError] = useState({});

  const [completed, setCompleted] = useState({completed: false, flash: null})

  const [company, setCompany] = useState();
  const Companies = [
    "يمن باص",
    "البركة",
    "النور",
    "اعتماد",
    "الأفضل",
    "أبو سرهد",
    "النورس",
    "راحة",
    "السراج",
    "البراق",
    "بن معمر",
    "النصر",
    "المتحدة",
    "النقل الجماعي",
    "راحة سفر",
    "العربي",
    "العربية",
    "الأولى",
    "المسافر العربي",
    "الإمبرطور",
    "آسيا"
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
      body: JSON.stringify({jwt: jwt, permission: 'trip_access'})
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

  const getExpire = (expire=0) => {
    let sloppy_date = new Date();

    sloppy_date.setHours(sloppy_date.getHours() +expire);  
    
      let tzDifference = sloppy_date.getTimezoneOffset();
    let current_date = new Date (sloppy_date.getTime() );
    // let date_exp = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(current_date)
    return current_date

  }
  const handleOrderChange = (e) => {
    e.preventDefault()
    
    setInfo({
      ...state,
      [e.target.id]: e.target.value
    })
  }

  const handleInfoSubmit = (e) => {
    e.preventDefault();

    const fetchDelivOrderInfo = async() => {
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
    }

    const fetchTripOrderInfo = async() => {
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
            fetchDelivOrderInfo();
          }
        })
      })
    }
    fetchTripOrderInfo();

    // Reset Forms
    let Forms = document.offerForm
    Forms && Forms.reset()
    // Reset State
    setState({});
  }

  const handleChange = (e) => {
    e.preventDefault();

    setError({});
    
    if (order.order_type === 'trip'){
      // Add Order Values To State.
      let x = 0
      console.log(state.expire)
      if (state.expire != undefined ){
        x = parseInt(state.expire)
      }
      setState({
        ...state,
        [e.target.id]: e.target.value,
        orderID: info.orderID,
        num_elders: order.num_elders||"0",
        num_kids: order.num_kids||"0",
        num_babies: order.num_babies||"0",

        exp: getExpire(x),

      })
    } else if (order.order_type === 'delivery'){

      if (parseInt(order.package_weight) > 0){
        setState({
          ...state,
          [e.target.id]: e.target.value,
          orderID: info.orderID,
          package_weight: order.package_weight,
        });
      } else {
        setState({
          ...state,
          [e.target.id]: e.target.value,
          orderID: info.orderID,
        })
      }

    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(state.exp)
    let offer_type = order.order_type === 'trip' ? ('trips') : ('delivery');
    
    const submitOffer = async() => {
      await fetch(`/api/${offer_type}/offer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(state,{hostname: window.location.origin})
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
                message: 'لا يمكن تقديم أكثر من عرض لنفس الشركة.',
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
    
    const tripOrder = () => {
      const getDate = (date) => {
        let mm = date.getMonth() + 1
        let dd = date.getDate();
    
        return [date.getFullYear(),
                (mm>9 ? '' : '0') + mm,
                (dd>9 ? '' : '0') + dd].join('-');
      }
      return(
        <div className="container text-center mt-4">
          <span className="display-6 text-info font-weight-bold">معلومات الطلب</span>
          <hr/>
          <div className="container">

            <div className="mt-2">
              <span className="font-weight-bold">مدينة الصعود : </span>
              <i dir='ltr'>{order.from}</i>
              <span className="font-weight-bold mr-sm-4">مدينة النزول : </span>
              <i dir='ltr'>{order.to}</i>
            </div>

            <div className="mt-2">
              <span className="font-weight-bold">التاريخ : </span>
              {order.date ? (<i dir="ltr">{getDate(new Date(order.date))}</i>) : 'غير مرفق'}

              <span className="font-weight-bold mr-sm-4">اليوم : </span>
              {order.day}
            </div>

            <hr/>

            <div className="mt-2">
              <span className="font-weight-bold">عدد التذاكر : </span>
              {order.tickets}
              <span className="font-weight-bold mr-sm-4">عدد البالغين : </span>
              {order.num_elders || 0}
            </div>

            <div className="mt-2">
              <span className="font-weight-bold">عدد الأطفال (دون 12 سنة) : </span>
              {order.num_kids || 0}
              <span className="font-weight-bold mr-sm-4">عدد الرضع : </span>
              {order.num_babies || 0}
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

    const deliveryOrder = () => {
      const getPackageType = (type) => {
        const types = {
          'merchant': 'بضائع تجارية',
          'package': 'طرد',
          'letter': 'رسالة'
        }
    
        return (types[type])
      }
      return (
        <div className="container text-center mt-4">
          <span className="display-6 text-info font-weight-bold">معلومات الطلب</span>
          <hr/>
          <div className="container">

            <div className="mt-2">
              <span className="font-weight-bold">مدينة الصعود : </span>
              <i dir='ltr'>{order.from}</i>
              <span className="font-weight-bold mr-sm-4">مدينة النزول : </span>
              <i dir='ltr'>{order.to}</i>
            </div>

            <div className="mt-2">
              <span className="font-weight-bold">نوع الطرد : </span>
              {getPackageType(order.package_type)}
              <span className="font-weight-bold mr-sm-4">وزن الطرد : </span>
              <i dir='ltr'>{order.package_weight} kg</i>
            </div>

            <div className="mt-2">
              <span className="font-weight-bold">محتوى الطرد : </span>
              <p className="break-line mt-2">{order.content}</p>
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

    if (order && order.order_type === 'trip'){return tripOrder()}
    if (order && order.order_type === 'delivery'){return deliveryOrder()}
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
      return(
        <div className="input-group">
          {company === 'All' ? (
            <select onChange={handleChange} required id="company" className="custom-select">
              <option value="" defaultValue>* شركة النقل</option>
              {Companies ? (Companies.map((company, index) => {
                return(<option value={company} key={index}>{company}</option>)
              })) : null}
            </select>
          ) : (
            <input type="text" disabled value={company || 'لم يتم تعيينك لشركة بعد'} className="form-control"/>
          )}
        </div>
      )
    }

    const tripOffer = () => {
      return(
        <form onSubmit={handleSubmit} className="container text-center mt-4" name="offerForm">
          <legend className="display-6 font-weight-bold text-primary">إضافة عرض</legend>
          <p className="font-weight-lighter font-info text-right text-muted mt-2">
            <i className="fa fa-star-of-life fa-xs"/>  
              التكلفة الإجمالية تكون بالنحو التالي : (سعر تذكرة البالغ * عدد البالغين) + (سعر تذكرة الطفل * عدد الأطفال) + (سعر التذكرة للرضع * عدد الرضع)
          </p>
          <hr/>
          {loadErrors()}

          <div className="form-inline justify-content-center">
            <label htmlFor="company" className="ml-sm-4"/>
            {companyInput()}
            <label htmlFor="expire" className="ml-sm-4"/>
            <div className="input-group pt-special">
              <select required onChange={handleChange} id="expire" className="custom-select">
                <option value="0" defaultValue>* مدة العرض</option>
                <option value="2">ساعتين</option>
                <option value="4">4 ساعات</option>
                <option value="6">6 ساعات</option>
                <option value="12">12 ساعة</option>
                <option value="24">يوم</option>
              </select>
            </div>

            <label htmlFor="currency" className="ml-sm-4"/>
            <div className="input-group pt-special">
              <select required onChange={handleChange} id="currency" className="custom-select">
                <option value="" defaultChecked>* العملة</option>
                <option value="YER">الريال اليمني</option>
                <option value="SAR">الريال السعودي</option>
              </select>
            </div>
          
          </div>

          <div className="form-inline justify-content-center mt-4">

            <label htmlFor="price_per_elder" className="ml-sm-4"/>
            <div className="input-group">
              <input onChange={handleChange} required type="number" min="0" step="1" placeholder="سعر تذكرة البالغ" id="price_per_elder" className="form-control"/>
            </div>

            <label htmlFor="num_elders" className="ml-sm-4"/>
            <div className="input-group pt-special">
              <input disabled type="text" value={`عدد البالغين : ${order.num_elders || 0}`} id="num_elders" className="form-control"/>
            </div>

            <label htmlFor="adults_price" className="ml-sm-4"/>
            <div className="input-group pt-special">
              <input disabled type="text" value={`المجمل (للبالغين) : ${parseInt(order.num_elders) * parseInt(state.price_per_elder) || 0}`} id="adults_price" className="form-control"/>
            </div>

          </div>

          <div className="form-inline justify-content-center mt-4">

            <label htmlFor="price_per_kid" className="mr-sm-4"/>
            <div className="input-group pt-special">
              <input onChange={handleChange} required type="number" min="0" step="1" placeholder="سعر تذكرة الأطفال (دون 12 سنة)" id="price_per_kid" className="form-control"/>
            </div>

            <label htmlFor="num_kids" className="mr-sm-4"/>
            <div className="input-group pt-special">
              <input disabled type="text" value={`عدد الأطفال : ${order.num_kids || 0}`} id="num_kids" className="form-control"/>
            </div>

            <label htmlFor="kids_price" className="mr-sm-4"/>
            <div className="input-group pt-special">
              <input disabled type="text" value={`المجمل (للإطفال) : ${parseInt(order.num_kids) * parseInt(state.price_per_kid) || 0}`} id="kids_price" className="form-control"/>
            </div>

          </div>

          <div className="form-inline justify-content-center mt-4">

            <label htmlFor="price_per_baby" className="ml-sm-4"/>
            <div className="input-group">
              <input onChange={handleChange} required id="price_per_baby" type="number" min="0" step="1" placeholder="سعر التذكرة للرضع" className="form-control"/>
            </div>

            <label htmlFor="num_babies" className="ml-sm-4"/>
            <div className="input-group pt-special">
              <input disabled id="num_babies" type="text" value={`عدد الرضع : ${order.num_babies || 0}`} className="form-control"/>
            </div>

            <label htmlFor="babies_price" className="ml-sm-4"/>
            <div className="input-group pt-special">
              <input disabled id="babies_price" type="text" value={`المجمل (للرضع) : ${parseInt(order.num_babies) * parseInt(state.price_per_baby)|| 0}`} className="form-control"/>
            </div>

          </div>

          <div className="form-inline justify-content-center mt-4">
            
            <label htmlFor="price" className="ml-sm-4"/>
            <div className="input-group pt-special">
              <input disabled id="price" type="text"
                value={`الإجمالي : ${ (parseInt((order.num_elders*state.price_per_elder)||0)+parseInt((order.num_kids*state.price_per_kid)||0)+parseInt((order.num_babies*state.price_per_baby)||0)) || 0}`} 
                className={"form-control " + (error['price'] ? 'is-invalid' : '')}/>
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

    const deliveryOffer = () => {
      return(
        <form onSubmit={handleSubmit} className="container text-center mt-4" name="offerForm">
          <legend className="display-6 font-weight-bold text-primary">إضافة عرض</legend>
          <p className="font-weight-lighter font-info text-right text-muted mt-2">
            <i className="fa fa-star-of-life fa-xs"/>  
              التكلفة الإجمالية تكون بالنحو التالي : (السعر للكيلو * وزن الطرد)
          </p>
          <hr/>
          {loadErrors()}

          <div className="form-inline justify-content-center">
            <label htmlFor="company" className="ml-sm-4"/>
            {companyInput()}

            <label htmlFor="expire" className="ml-sm-4"/>
            <div className="input-group pt-special">
              <select required onChange={handleChange} id="expire" className="custom-select">
                <option value="0" defaultValue>* مدة العرض</option>
                <option value="2">ساعتين</option>
                <option value="4">4 ساعات</option>
                <option value="6">6 ساعات</option>
                <option value="12">12 ساعة</option>
                <option value="24">يوم</option>
              </select>
            </div>

            <label htmlFor="currency" className="ml-sm-4"/>
            <div className="input-group pt-special">
              <select required onChange={handleChange} id="currency" className="custom-select">
                <option value="" defaultChecked>* العملة</option>
                <option value="YER">الريال اليمني</option>
                <option value="SAR">الريال السعودي</option>
              </select>
            </div>
          </div>

          <div className="form-inline justify-content-center mt-4">

            <label htmlFor="price_per_kilogram" className="ml-sm-4"/>
            {order.package_weight && parseInt(order.package_weight) > 0 ? (
              <div className="input-group">
                <input onChange={handleChange} required id="price_per_kilogram" type="number" min="0" step="1" placeholder="السعر لكل كيلو" className="form-control"/>
              </div>
            ) : null}
            

            <label htmlFor="num_kilograms" className="ml-sm-4"/>
            {order.package_weight && parseInt(order.package_weight) > 0 ? (
                <div className="input-group pt-special">
                  <input disabled id="num_kilograms" type="text" value={`الوزن بالكيلو :  ${order.package_weight}`} className="form-control"/>
                </div>
            ) : null}

            <label htmlFor="price" className="ml-sm-4"/>
            {order.package_weight && parseInt(order.package_weight) > 0 ? (
              <div className="input-group pt-special">
                <input disabled id="price" type="text" placeholder={`السعر الإجمالي : ${ parseInt(state.price_per_kilogram) * parseInt(order.package_weight) || 0}`} className={"form-control " + (error['price'] ? 'is-invalid' : '')}/>
              </div>
            ) : (
              <div className="input-group pt-special">
                <input required onChange={handleChange} id="price" type="number" min="0" step="1" placeholder="السعر الإجمالي" className={"form-control " + (error['price'] ? 'is-invalid' : '')}/>
              </div>
            )}
            
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

    if (order && order.order_type === 'trip'){
      return tripOffer()
    }
    if (order && order.order_type === 'delivery'){
      return deliveryOffer()
    }
    
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
                <p className="font-weight-bold text-warning"><i className="fa fa-star-of-life fa-xs"/> يمكنك أضافة عرض واحد لكل شركة بحد أقصى خمس عروض.</p>
                {error.orderID ? (loadErrors()) : null}
                <div className="mt-4">
                  
                  <form onSubmit={handleInfoSubmit} className="form-inline">
                    <label htmlFor="orderID" className="ml-sm-4">أدخل معرف الطلب (Order ID) : </label>
                    <div className="input-group">
                      <input onChange={handleOrderChange} type="text" id="orderID" defaultValue={info.orderID || ''}  className="form-control"/>
                    </div>

                    <div className="input-group mr-sm-4">
                      <button className="btn btn-md btn-outline-primary">عرض الطلب</button>
                    </div>

                  </form>
                  
                  <p className="font-weight-bold text-primary mt-2">أو قم بتحديد الطلب <Link to="/admin/trips/orders" className="text-success">من هنا</Link></p>
                </div>
                
                {orderInfo()}

                {order && order.offers >= 5 ? (
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
