import React, { useState, useEffect, useRef } from 'react';
import homeImg from '../../../Static/Images/Home/order.jpg';
import { Link, Redirect } from 'react-router-dom';


export const PayPalPayment = (props) => {

  const state = props.location.state

  // const [state, setState] = useState(currentState);

  // Pay Using Paypal
  const paypalRef = useRef();
  const [error, setError] = useState({});
  const [completed, setCompleted] = useState(false);
  
  // Case Of Server Side Error
  const [redirect, setRedirect] = useState(false);
  
  useEffect(() => {

    const SetPayment = async() => {
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
              },
              Redirect: {
                name: 'إعادة توجيه',
                error: 'سيتم إعادة توجيهك للصفحة الرئيسية خلال 10 ثوان.',
                type: 'info'
              }
            })
          }
        })
      })
    }

    // Load Paypal Buttons
    if (state){
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: 'YemenBus Service Fees',
                  amount: {
                    currency_code: 'USD',
                    value: parseFloat(parseFloat(state.payment_price)/3.75).toFixed(2),
                  },
                }
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();

            if (order.status === 'COMPLETED'){
              SetPayment()
            } else {
              setError({
                Payment: {
                  name: 'الدفع',
                  error: 'لم تتم عملية الدفع بنجاح, الرجاء المحاولة من جديد, إذا كنت تعتقد ان هذا خطأ, الرجاء التواصل مع الإدارة.',
                  type: 'danger'
                }
              })
            }
            
          },
          onError: err => {
            setError({
              PaymentBtns: {
                name: 'خطأ فني',
                error: 'حدث خطأ في تكوين صفحة الدفع, الرجاء تحديث الصفحة. في حال تكرر الأمر, الرجاء التواصل مع الإدارة.',
                type: 'warning'
              }
            })
          },
        })
        .render(paypalRef.current);
    }
    
  }, [])

  const redirectFunc = () => {
    setRedirect(true)
  }

  if (error.Redirect){
    setTimeout(redirectFunc, 10000)
  }

  if (completed){
    return <Redirect to={{
      pathname: '/payments',
    }}/>
  }

  if (redirect){
    return <Redirect to="/"/>
  }

  const loadErrors = () => {
    if (Object.keys(error).length !== 0 && error.constructor === Object){
      return (
        <div>
          {error ? Object.entries(error).map((e, id) => {
            return (
              <div key={id} className={`alert alert-${e[1].type} text-right`}>
                <p className="font-weight-bold">
                  {e[1].name} : {e[1].error}
                </p>
              </div>
            )
          }): null}
        </div>
      )
    }
  }

  // Check If not State
  if (!state) {
    return <Redirect to="/"/>
  }

  // إظهار الصفحة
  return(
    <div className="mb-5 pb-5">
      <div className="carousel-item active" style={{backgroundImage: `url(${homeImg})`, opacity: 0.82}}>
        <div className="text-info carousel-caption flex-center">
          <h3 className="display-5">صفحة الدفع (PayPal)</h3>
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
          <span className="card-title display-6">دفع قيمة الخدمة ({state && state.orderID}#)</span>
          <hr/>
          <div className="card-body">
            {loadErrors()}
            <span className="display-6 text-primary">الدفع بإستخدام الـ PayPal</span>
            <div id="paymentBtn" className="mt-5" ref={paypalRef}/>
          </div>
        </div>
      </div>

    </div>
  )
}
