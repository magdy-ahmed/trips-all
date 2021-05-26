/* صفحة طلبات المستخدم */
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import homeImg from '../../../Static/Images/Home/order.jpg';




export const SearchOrders = () => {
  const [state, setState] = useState({});
  const [error, setError] = useState({});
  const [order, setOrder] = useState();
  const [redirect, setRedirect] = useState({redirect: false, oid: null});

  const handleSubmit = (e) => {
    e.preventDefault();

    const Search = async() => {
      await fetch('/api/orders/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(state)
      }).then(resp => {
        resp.json().then(data => {
          if (resp.ok){
            setOrder(data.order)
          } else {
            setError({
              ...error,
              invalid: {
                name: 'رقم معرف الطلب',
                error: 'الطلب غير موجود, الرجاء التأكد من رقم معرف الطلب'
              }
            })
          }
        })
      })
    }

    Search();
    setState({});
    document.SearchForm && document.SearchForm.reset();
    
  }

  const handleChange = (e) => {
    e.preventDefault();
    let id = e.target.id;

    if (id === "orderID") {
      if (state.orderID && state.orderID.length >= 9) {

        // Check if Value length is Increasing (> 9)
        if (e.target.value >= 9){
          document.getElementById(id).value = state.orderID;
        } else {
          setState({
            ...state,
            [id]: e.target.value
          });
        }
        
      
      } else {
        setState({
          ...state,
          [id]: e.target.value
        });
      }
    
  
    }
    setError({});
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

  const getOrderType = (type) => {
    const types = {
      trip: 'طلب رحلة',
      transaction: 'طلب تخليص معاملة',
      delivery: 'طلب إرسال رسالة أو طرد'
    }

    return (types[type])
  }

  const getStatusType = (status) => {
    const types = {
      pending: 'قيد المراجعة',
      open: 'مفتوح للعروض',
      fulfilled: 'مكتفي العروض',
      waiting: 'في إنتظار الدفع',
      closed: 'مغلق',
      canceled: 'ملغي'
    }
    return(types[status])
  }

  const handleOrder = (e) => {
    e.preventDefault();
    setRedirect({redirect: true, oid: e.target.id})
  }

  const loadOrder = (
    <tbody>
      <tr className="table-info ">
        <th className="font-weight-bold" scope="row">{order && order.oid}</th>
        <td className="info-weight">{getOrderType(order && order.order_type)}</td>
        <td className="info-weight break-line">{getStatusType(order && order.status)}</td>
        <td><button id={order && order.oid} onClick={handleOrder} className="btn info-weight btn-sm btn-primary">معلومات الطلب</button></td>
      </tr>
    </tbody>
  )

  if (redirect.redirect) {
    return <Redirect to={`/orders/${redirect.oid}`}/>
  }

  return (
    <div className="mb-5 pb-5">
      
      <div className="carousel-item active" style={{backgroundImage: `url(${homeImg})`, opacity: 0.82}}>
        <div className="text-info carousel-caption flex-center">
          <h3 className="display-5">الطلبات</h3>
        </div>
      </div>

      <div className="container text-center mt-4">
        <span className="display-6">أقسام الطلبات</span>
        <hr/>
        <p className="lead font-weight-bold">
          <Link className="text-primary" to="/transactions"> جميع المعاملات </Link>|
          <Link className="text-primary" to="/"> جميع الرحلات </Link>|
          <Link className="text-primary" to="/trips/order"> طلب حجز رحلة </Link>|
          <Link className="text-primary" to="/delivery/order"> طلب إرسال رسالة أو طرد </Link>|
          <Link className="text-primary" to="/transactions/order"> طلب تخليص معاملة </Link>
        </p>
      </div>

      <div className="container text-center mt-5">
        <span className="display-6">إبحث في الطلبات</span>
        <hr/>
        {loadErrors()}
        <form onSubmit={handleSubmit} name="SearchForm">
          <legend className="text-right">إبحث : </legend>
          
          <p className="text-primary font-weight-normal text-right"><i className="fa fa-star-of-life"/> تأكد من إدخال رقم الطلب بشكل صحيح.</p>
          <div className="form-inline mr-4 mt-3">
            <label htmlFor="orderID" className="ml-sm-2">رقم الطلب</label>
            <input onChange={handleChange} type="number" maxLength="9" id="orderID" required className="form-control ml-sm-2"/>

            <div className="input-group mr-md-3">
              <button type="submit" className="btn btn-md btn-outline-primary">إبحث</button>
            </div>
            
          </div>
        </form>

      </div>
    
      <div className="container mt-5 pt-5">
        {order ? (
          <div className="text-center">
            <table className="table table-hover table-responsive-sm bg-grey mt-5">
              <thead>
                <tr className="table-secondary">
                  <th scope="col">Order ID</th>
                  <th scope="col">نوع الطلب</th>
                  <th scope="col">حالة الطلب</th>
                  <th scope="col">للمزيد من المعلومات</th>
                </tr>
              </thead>
              {loadOrder}
            </table>
          </div>
        ) : null}
      </div>

    </div>
  )
}



/* On Submit */
// // Regex To Check Phone Number Validation.
    // let SAPhone = /[0][5][0-9]{8}/g
    // let YEPhone = /[7][0-9]{8}/g

    // if (!(SAPhone.test(state.phone)) && !(YEPhone.test(state.phone))){
    //   setError({
    //     ...error,
    //     phone: {
    //       name: 'رقم الجوال',
    //       error: 'يجب أن يكون شكل الرقم السعودي (05XXXXXXXX), و شكل الرقم اليمني (7XXXXXXXX).'
    //     }
    //   })
    // } else {
    //   setError({});
    //   Search();
    //   document.SearchForm && document.SearchForm.reset();
    //   setState({});
    // }
/* END */

/* On Change */
// else if (id === "phone") {

//   if (state.phone && state.phone.length >= 10){

//     // Check if Value length is Increasing (> 10)
//     if (e.target.value.length >= 10){
//       document.getElementById(id).value = state.phone;
//     } else {
//       let errors = error;
//       delete errors['phone'];
//       setError(errors);
//       setState({
//         ...state,
//         [id]: e.target.value
//       });
//     }

//   } else {
//     let errors = error;
//     delete errors['phone'];
//     setError(errors);
//     setState({
//       ...state,
//       [id]: e.target.value
//     });
//   }
// }
/* END */  