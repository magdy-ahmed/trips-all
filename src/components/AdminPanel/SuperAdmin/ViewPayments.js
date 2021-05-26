import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
//import {Cookies} from 'react-cookie';;
import SearchBlock from '../TripsAdmin/Search-block'



export const AllPayments = () => {
  //const cookies = new Cookies();

  const [show, setShow] = useState(false);
  const [failed, setFailed] = useState(false);
  const [error, setError] = useState({})
  
  const [payments, setPayments] = useState({payments: null, limit: 5});
  const [dataPayment_, setDataPayment_] = useState([{
    id:1,
    chkId:'pid',
    name:'Payment Id',
},{
    id:4,
    chkId:'pay',
    name:'المدفوع',
},{
    id:5,
    chkId:'no_deposit',
    name:'المتبقى',
}])
  useEffect(() => {
    const dataPayments = {'search':'','pid':'','pay':'',
    'no_deposit':'','select':''}
    const searchPayment = localStorage.getItem('search')
    for (let key in dataPayments){
      if (localStorage.getItem(key)!='false'){
        dataPayments[key] = searchPayment
      }
    }
    if (localStorage.getItem('select')=='false'){
      dataPayments['select'] = true
    
    }
    const jwt = localStorage.yemenbus_user_jwt ;
    fetch('/api/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({jwt: jwt, permission: 'superadmin_access'})
    }).then(resp => {
      if (resp.ok){
        setShow(true)
      } else {
        setFailed(true);
      }
    })

    fetch('/api/payments/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },body: JSON.stringify(dataPayments)
    }).then(resp => {
      resp.json().then(data => {
        if (resp.ok){
          setPayments({payments: data.payments, limit: 5})
        }
      })
    })
  }, [])


  if (failed){
    return <Redirect to="/unauthorized"/>
  }
  
  const handleDownloadImage = (e) => {
    e.preventDefault();

    const DownloadImage = async() => {
      await fetch('/api/image/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({key: e.target.id})
      }).then(resp => {
        resp.json().then(data => {
          if (resp.ok){
            // Remove Related Errors
            let errors = error
            delete errors['ImageDownload']
            setError(errors);
            
            window.open(data.download_url)
          } else {
            setError({
              ...error,
              ImageDownload: {
                name: 'تحميل الصورة',
                error: 'فشل تحميل الصورة, الرجاء المحاولة من جديد لاحقاً',
                type: 'warning'
              }
            })
          }
        })
      })
    }

    DownloadImage();

  }

  const handleApproval = (e) => {
    e.preventDefault();

    const handlePayment = async() => {
      await fetch('/api/payments/handle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({'pid': e.target.id, 'is_verified': true})
      }).then(resp => {
        if (resp.ok){
          // Delete Related Errors
          let errors = error;
          delete errors['handlePayment']
          setError(errors);
          window.location.reload()
        } else {
          setError({
            handlePayment: {
              name: 'توثيق عملية الدفع',
              error: 'حدث خطأ أثناء عملية توثيق الدفع, الرجاء المحاولة من جديد لاحقاً.',
              type: 'danger'
            }
          })
        }
      })
    }
    handlePayment();
  }

  const handleDenial = (e) => {
    e.preventDefault();
    const handlePayment = async() => {
      await fetch('/api/payments/handle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({'pid': e.target.id, 'is_denied': true})
      }).then(resp => {
        if (resp.ok){
          // Delete Related Errors
          let errors = error;
          delete errors['handlePayment']
          setError(errors);
          window.location.reload()
        } else {
          setError({
            handlePayment: {
              name: 'رفض عملية الدفع',
              error: 'حدث خطأ أثناء عملية رفض الدفع, الرجاء المحاولة من جديد لاحقاً.',
              type: 'danger'
            }
          })
        }
      })
    }
    handlePayment();
  }

  const LoadPayments = () => {

    const payments_patch = payments.payments && payments.payments.slice(0, payments.limit)
    
    const getTransBtn = (image, type) => {
      // if (image){
      //   return (
      //     <button id={image} onClick={handleDownloadImage} className="btn btn-sm btn-outline-primary">تحميل الصورة</button>
      //   )
      // } else {
      //   return 'لا توجد صورة'
      // }
      if (type === 'delivery_payment') {
        return '//'
      }
      return 'عبر البريد أو الواتساب'
    }

    const getComplete = (boolean) => {
      if (boolean){
        return 'مكتمل'
      } else {
        return 'غير مكتمل'
      }
    }

    const getVerified = (boolean) => {
      if (boolean){
        return ['موثق', 'text-success']
      } else {
        return ['غير موثق', 'text-warning']
      }
    }

    const getPType = (type) => {
      let types = {
        full_payment: 'دفع المبلغ كامل',
        deposit_payment: 'دفع العربون, والباقي عند الإستلام',
        delivery_payment: 'الدفع عند الإستلام'
      }

      return types[type]
    }

    const getPMethod = (method) => {
      if (!method){
        return 'عند الإستلام'
      }
      let types = {
        paypal: 'البايبال | PayPal',
        bank: 'التحويل البنكي',
      }
      
      return types[method]
    }

    return(
      <tbody>
        {payments_patch ? (payments_patch.map((payment, index) => {
          const is_verified = getVerified(payment.is_verified)
          return(
            <tr className="table-light" key={index}>
              <th className="font-weight-bold text-secondary">{payment.pid}</th>
              <td className="font-weight-bold">{getPType(payment.payment_type)}</td>
              <td className="font-weight-bold">{getPMethod(payment.payment_method)}</td>
              {
                payment.type_dir === 'SAYE' ? (
                  <td className="info-weight">{Math.round(parseFloat(payment.payment_price)) || 0} ريال سعودي</td>
                ) : (
                  <td className="info-weight">{Math.round(parseFloat(payment.payment_price*66.76)) || 0} ريال يمني</td>
                )
              }
              {
                payment.type_dir === 'SAYE' ? (
                  <td className="info-weight">{Math.round(parseFloat(payment.remaining_price)) || 0} ريال سعودي</td>
                ) : (
                  <td className="info-weight">{Math.round(parseFloat(payment.remaining_price*66.76)) || 0} ريال يمني</td>
                )
              }
              <td className="info-weight">{getTransBtn(payment.transfer_img, payment.payment_type)}</td>
              <td className="font-weight-bold">{getComplete(payment.is_completed)}</td>
              <td className={`font-weight-bold ${is_verified[1]}`}>{is_verified[0]}</td>
              <td className="info-weight">
                {payment.is_denied ? (<i className="text-danger">مرفوض</i>) : payment.is_verified ? <i className="text-success">موثق بالفعل</i> : (
                  <div>
                    <button id={payment.pid} onClick={handleDenial} className="btn btn-sm btn-outline-danger">رفض</button>
                    <button id={payment.pid} onClick={handleApproval} className="btn btn-sm btn-outline-success">توثيق</button>
                  </div>
                )}
              </td>
            </tr>
          )
        })) : null}
      </tbody>
    )
  }

  const AddLimit = (e) => {
    if (e.target.id === 'payments' && (payments.limit < payments.payments.length)){
      let new_limit = payments.limit + 10;
      setPayments({...payments, limit: new_limit})
    }
  }

  const ReduceLimit = (e) => {
    
    if (e.target.id === 'payments' && (payments.limit > 10)){
      let new_limit = payments.limit - 10;
      setPayments({...payments, limit: new_limit})
    }
  }

  const loadErrors = () => {
		if (Object.keys(error).length !== 0 && error.constructor === Object){
			return (
				<div>
					{error ? Object.entries(error).map((e, id) => {
						return (
              <div key={id} className={`alert alert-${e[1].type} text-right`}>
                <p className="font-weight-bold">
                  - {e[1].name} : {e[1].error}
                </p>
              </div>
						)
					}): null}
				</div>
			)
		}
  }

  return (
    <div className="mb-5 pb-5">
      {show ? (
        <div className="container text-center mt-5 pt-5">
          <span className="display-6 text-primary">
            جميع عمليات الدفع
          </span>
          <hr/>
          <SearchBlock  data = {dataPayment_}/>

          <p className="font-weight-bold text-info"><i className="fa fa-star-of-life fa-xs"/> يتم عرض جميع عمليات الدفع هنا</p>
          <div className="container mt-5">
            {loadErrors()}
            <div className="table-responsive">
              <table className="table bg-grey  table-bordered mt-5">
                <thead>
                  <tr className="table-secondary">
                    <th scope="col">Payment ID</th>
                    <th scope="col">نوع الدفع</th>
                    <th scope="col">وسيلة الدفع</th>
                    <th scope="col">المبلغ المدفوع</th>
                    <th scope="col">المتبقي</th>
                    <th scope="col">صورة التحويل البنكي</th>
                    <th scope="col">الدفع مكتمل</th>
                    <th scope="col">الدفع موثوق (مؤكد)</th>
                    <th scope="col">توثيق الدفع</th>
                  </tr>
                </thead>
                {LoadPayments()}
              </table>
            </div>
          
            <div className="justify-content-center">
              {(payments.payments && payments.limit < payments.payments.length) ? (<button id="payments" onClick={AddLimit} className="btn btn-sm btn-outline-success">عرض المزيد</button>) : null}
              {payments.limit> 5 ? (<button id="payments" onClick={ReduceLimit} className="btn btn-sm btn-outline-danger">عرض أقل</button>) : null}
            </div>
          </div>

        </div>
    
      ) : null}
    </div>
  )
}