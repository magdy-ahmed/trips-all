import React, { useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useState } from 'react';



export const EditOffer = (props) => {
//const cookies = new Cookies();

const curState = props.location.state;
const offerInfo = curState && curState.offer;
const oid = offerInfo.tripOID || offerInfo.deliveryOID;


const [state, setState] = useState({});
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

  fetch(`/api/orders/${oid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(resp => {
    resp.json().then(data => {
      if (resp.ok){
        setOrder(data.order)
        setState({
          company: offerInfo.company,
          price_per_baby: offerInfo.info.babies_price,
          price_per_kid: offerInfo.info.kids_price,
          price_per_elder: offerInfo.info.elders_price,
          price_per_kilogram: offerInfo.info.price_per_kilogram
        })
      }
    })
  })
}, [])

if (failed){
  return <Redirect to="/unauthorized"/>
}

const handleChange = (e) => {
  e.preventDefault();

  setError({});
  
  if (order.order_type === 'trip'){
    // Add Order Values To State.
    setState({
      ...state,
      [e.target.id]: e.target.value,
      orderID: oid,
      num_elders: order.num_elders||"0",
      num_kids: order.num_kids||"0",
      num_babies: order.num_babies||"0"
    })
  } else if (order.order_type === 'delivery'){

    if (parseInt(order.package_weight) > 0){
      setState({
        ...state,
        [e.target.id]: e.target.value,
        orderID: oid,
        package_weight: order.package_weight,
      });
    } else {
      setState({
        ...state,
        [e.target.id]: e.target.value,
        orderID: oid,
      })
    }

  }

}

const handleSubmit = (e) => {
  e.preventDefault();
  let offer_type = order.order_type === 'trip' ? ('trips') : ('delivery');
  
  const submitOffer = async() => {
    await fetch(`/api/${offer_type}/offer/${offerInfo.oid}`, {
      method: 'PATCH',
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
              name: 'تعديل العرض',
              message: `تم تعديل العرض بنجاح, رقم العرض #${data.oid}`,
              type: 'alert-success'
            }
          })
        } else {
          setCompleted({
            completed: true,
            flash: {
              name: 'تعديل العرض',
              message: 'لا يمكن تعديل العرض حالياً, الرجاء المحاولة لاحقاً.',
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
        لا يمكنك تعديل العرض حتى تعيَّن لشركة, الرجاء التواصل مع مسؤول الموقع ليتم تعيينك لشركة.
      </span>
    </div>
  )

  const companyInput = () => {
    return(
      <div className="input-group">
        {company === 'All' ? (
          <select defaultValue={offerInfo.company} onChange={handleChange} required id="company" className="custom-select">
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
        <legend className="display-6 font-weight-bold text-primary">تعديل العرض</legend>
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
              <option value="" defaultValue>* مدة العرض</option>
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
            <input defaultValue={offerInfo.info.elders_price} onChange={handleChange} required type="number" min="0" step="1" placeholder="سعر تذكرة البالغ" id="price_per_elder" className="form-control"/>
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
            <input defaultValue={offerInfo.info.kids_price} onChange={handleChange} required type="number" min="0" step="1" placeholder="سعر تذكرة الأطفال (دون 12 سنة)" id="price_per_kid" className="form-control"/>
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
            <input defaultValue={offerInfo.info.babies_price} onChange={handleChange} required id="price_per_baby" type="number" min="0" step="1" placeholder="سعر التذكرة للرضع" className="form-control"/>
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
          <button type="submit" id="SubmissionBtn" className="btn btn-md btn-outline-success">تعديل العرض</button>
        </div>
        <p className="font-weight-light text-primary"><i className="fa fa-star-of-life fa-xs"/> السعر شامل للضرائب والعمولات كاملةً.</p>

      </form>
    )
  }

  const deliveryOffer = () => {
    return(
      <form onSubmit={handleSubmit} className="container text-center mt-4" name="offerForm">
        <legend className="display-6 font-weight-bold text-primary">تعديل العرض</legend>
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
              <option value="" defaultValue>* مدة العرض</option>
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
              <input defaultValue={offerInfo.info.price_per_kilogram} onChange={handleChange} required id="price_per_kilogram" type="text" placeholder="السعر لكل كيلو" className="form-control"/>
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
              <input defaultValue={offerInfo.info.price} required onChange={handleChange} id="price" type="text" placeholder="السعر الإجمالي" className={"form-control " + (error['price'] ? 'is-invalid' : '')}/>
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
          <button type="submit" id="SubmissionBtn" className="btn btn-md btn-outline-success">تعديل العرض</button>
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
          <span className="card-title display-6">تعديل العرض</span>
          <hr/>
          <div className="card-body text-right">
            
            <div className="mt-3">
              <p className="font-weight-bold text-warning"><i className="fa fa-star-of-life fa-xs"/> بإمكانك تقديم عرض واحد لكل طلب.</p>
              
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