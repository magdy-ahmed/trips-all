import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
//import {Cookies} from 'react-cookie';;


export const CompanyTripOrders = () => {
  //const cookies = new Cookies();

  const [tripsOrders, setTrips] = useState({orders: null, limit: 5});
  const [deliveriesOrders, setDeliveries] = useState({orders: null, limit: 5});
  const [status, setStatus] = useState({});

  // User Authentication
  const [show, setShow] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect((tripsOrders, deliveriesOrders) => {
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
    fetch('/api/trips/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(resp => {
      resp.json().then(data => {
        if (resp.ok){
          setTrips({orders: data.orders, limit: 5})
        }
      })
    });
    fetch('/api/delivery/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(resp => {
      resp.json().then(data => {
        if (resp.ok){
          setDeliveries({orders: data.orders, limit: 5})
        }
      })
    });
  }, []);

  

  if (failed){
    return <Redirect to="/unauthorized"/>
  }

  

  const getDate = (date) => {
    let mm = date.getMonth() + 1
    let dd = date.getDate();

    return [date.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd].join('-');
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateStatuses = async() => {
      await fetch('/api/orders/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({status: status, hostname: window.location.origin})
      }).then(resp => {
        resp.json().then(_ => {
          if (resp.ok) {
            window.location.reload()
          }
        })
      })
    }

    updateStatuses();

  }

  const handleSwitch = (e) => {
    // Change Color Of Select Element.
    let el = document.getElementById(e.target.id);
    if (e.target.value === 'open') {
      el.className = "custom-select font-weight-bold text-primary"
    } else if (e.target.value === 'closed') {
      el.className = "custom-select font-weight-bold text-info"
    } else if (e.target.value === 'rejected') {
      el.className = "custom-select font-weight-bold text-warning"
    } else if (e.target.value === 'delete') {
      el.className = "custom-select font-weight-bold text-danger"
    } else {
      el.className = "custom-select font-weight-bold"
    }

    if (e.target.value){
      setStatus({...status, [e.target.id]: e.target.value});
    } else {
      let currentStatus = status;
      delete currentStatus[e.target.id];
      setStatus(currentStatus);
    }
   
  }

  const StatusSwitch = (tid, status) => {
    let types = {
      'pending': (
        <optgroup>
          <option value="" className="text-dark" defaultValue>إختر الحالة</option>
          <option value="open" className="text-primary font-weight-bold">قبول الطلب</option>
          <option value="rejected" className="text-warning font-weight-bold">رفض الطلب</option>
          <option value="delete" className="text-danger font-weight-bold">حذف الطلب</option>
        </optgroup>
      ),
      'open': (
        <optgroup>
          <option value="" className="text-dark" defaultValue>إختر الحالة</option>
          <option value="closed" className="text-dark font-weight-bold">إغلاق الطلب</option>
          <option value="delete" className="text-danger font-weight-bold">حذف الطلب</option>
        </optgroup>
      ),
      'waiting': (
        <optgroup>
          <option value="" className="text-dark" defaultValue>إختر الحالة</option>
          <option value="closed" className="text-dark font-weight-bold">إغلاق الطلب</option>
          <option value="delete" className="text-danger font-weight-bold">حذف الطلب</option>
        </optgroup>
      ),
      'rejected': (
        <optgroup>
          <option value="" className="text-dark" defaultValue>إختر الحالة</option>
          <option value="delete" className="text-danger font-weight-bold">حذف الطلب</option>
        </optgroup>
      ),
      'closed': (
        <optgroup>
          <option value="" className="text-dark" defaultValue>إختر الحالة</option>
          <option value="delete" className="text-danger font-weight-bold">حذف الطلب</option>
        </optgroup>
      ),
    }

    return(
      <select onChange={handleSwitch} id={tid} className="custom-select font-weight-bold">
        {status && types[status]}
      </select>
    )
  }

  const getStatus = (status)  => {
    const types = {
      'pending': ['قيد المراجعة', 'text-secondary'],
      'open': ['مفتوح للعروض', 'text-success'],
      'fulfilled': ['وصلت ل 5 عروض', 'text-primary'],
      'waiting': ['في إنتظار الدفع', 'text-info'],
      'closed': ['مغلق', 'text-dark'],
      'rejected': ['مرفوض', 'text-danger'],
    }
    return (types[status])
  }

  const getPackageType = (type) => {
    const types = {
      'merchant': 'بضائع تجارية',
      'package': 'طرد',
      'letter': 'رسالة'
    }

    return (types[type])
  }

  const LoadTrips = () => {
    const orders_patch = tripsOrders.orders && tripsOrders.orders.slice(0, tripsOrders.limit)

    return(
      <tbody>
        {orders_patch ? (orders_patch.map((order, index) => {
          let status = getStatus(order.status);
          return(
            <tr className="table-light" key={index}>
              <th className="font-weight-bold" scope="row">{order.toid}</th>
              <td className={"font-weight-bold " + status[1]}>{status[0]}</td>
              <td className="font-weight-bold">{StatusSwitch(order.toid, order.status)}</td>
              <td className="info-weight">{order.customer_name}</td>
              <td className="info-weight">{order.phone_sa ? (<i dir="ltr" className="tc">{order.phone_sa}</i>) : ('غير مرفق')}</td>
              <td className="info-weight">{order.phone_ye ? (<i dir="ltr" className="tc">{order.phone_ye}</i>) : ('غير مرفق')}</td>
              <td className="info-weight">{order.from}</td>
              <td className="info-weight">{order.to}</td>
              <td className="info-weight">{order.day}</td>
              <td className="info-weight">{(order.date && getDate(new Date(order.date))) || 'غير مرفق'}</td>
              <td className="info-weight">{order.tickets}</td>
              <td className="info-weight">{order.num_babies || '0'}</td>
              <td className="info-weight">{order.num_kids || '0'}</td>
              <td className="info-weight">{order.num_elders || '0'}</td>
              <td className="info-weight break-line">{order.notes || 'لم يتم إضافة ملاحظات'}</td>
              
            </tr>
          )
        })) : null}
      </tbody>
    )
  }

  const LoadDeliveries = () => {
    const orders_patch = deliveriesOrders.orders && deliveriesOrders.orders.slice(0, deliveriesOrders.limit)

    return(
      <tbody>
        {orders_patch ? (orders_patch.map((order, index) => {
          let status = getStatus(order.status);
          return(
            <tr className="table-light" key={index}>
              <th className="font-weight-bold" scope="row">{order.doid}</th>
              <td className={"font-weight-bold " + status[1]}>{status[0]}</td>
              <td className="font-weight-bold">{StatusSwitch(order.doid, order.status)}</td>
              <td className="info-weight">{getPackageType(order.package_type)}</td>
              <td className="info-weight break-line">{order.content}</td>
              <td className="info-weight">{order.sender_name}</td>
              <td className="info-weight">{order.sender_phone_sa ? (<i dir="ltr" className="tc">{order.sender_phone_sa}</i>) : ('غير مرفق')}</td>
              <td className="info-weight">{order.sender_phone_ye ? (<i dir="ltr" className="tc">{order.sender_phone_ye}</i>) : ('غير مرفق')}</td>
              <td className="info-weight">{order.from}</td>
              <td className="info-weight">{order.to}</td>
              <td className="info-weight break-line">{order.notes || 'لم يتم إضافة ملاحظات'}</td>
              
            </tr>
          )
        })) : null}
      </tbody>
    )
  }

  const AddLimit = (e) => {
    const id = e.target.id
    if ( id === "trips" && (tripsOrders.limit < tripsOrders.orders.length)){
      let new_limit = tripsOrders.limit + 5;
      setTrips({...tripsOrders, limit: new_limit})
    }
    if ( id === "deliveries" && (deliveriesOrders.limit < deliveriesOrders.orders.length)){
      let new_limit = deliveriesOrders.limit + 5;
      setDeliveries({...deliveriesOrders, limit: new_limit})
    }
  }

  const ReduceLimit = (e) => {
    const id = e.target.id
    
    if ( id === "trips" && (tripsOrders.limit > 5)){
      let new_limit = tripsOrders.limit - 5;
      setTrips({...tripsOrders, limit: new_limit})

      // Delete Hidden Trips Status Changes.
      let ordersStatus = Object.entries(status);
      let shownOrders =  tripsOrders.orders.slice(0, new_limit).concat(deliveriesOrders.orders)

      ordersStatus && ordersStatus.map(key => {
        let toid = shownOrders.find(o => o.toid === key[0]);
        let doid = shownOrders.find(o => o.doid === key[0]);
        if (!toid && !doid) {
          let currentStatus = status;
          delete currentStatus[key[0]]
          setStatus(currentStatus)
        }
      });
    }

    if ( id === "deliveries" && (deliveriesOrders.limit > 5)){
      let new_limit = deliveriesOrders.limit - 5;
      setDeliveries({...deliveriesOrders, limit: new_limit})

      // Delete Hidden Deliveries Status Changes.
      let ordersStatus = Object.entries(status);
      let shownOrders = deliveriesOrders.orders.slice(0, new_limit).concat(tripsOrders.orders)

      ordersStatus && ordersStatus.map(key => {
        let toid = shownOrders.find(o => o.toid === key[0]);
        let doid = shownOrders.find(o => o.doid === key[0]);
        if (!toid && !doid) {
          let currentStatus = status;
          delete currentStatus[key[0]]
          setStatus(currentStatus);
        }
      });
    }
  }


  return(
    <div className="mb-4 pb-4 ">
      {show ? (
        <div className="container text-center mt-5 pt-5">
          <span className="display-6 text-primary">
            جميع الطلبات
          </span>

          <div className="text-md-left justify-content-sm-center mt-2">
            <button onClick={handleSubmit} className="btn btn-sm btn-outline-primary">تغيير الحالات</button>
            <p className="text-primary font-info"><i className="fa fa-star-of-life fa-xs"/> تغيير جميع الحالات المحددة</p>
          </div>
          <hr/>
          <p className="font-weight-bold text-info"><i className="fa fa-star-of-life fa-xs"/> يتم عرض جميع الطلبات التي تم إضافة شركتك بها هنا</p>
          
          <div className="container mt-5">
            <span className="display-7 mb-2">طلبات الرحلات</span>
            <hr/>
            <div className="table-responsive">     
              <table className="table bg-grey  table-bordered mt-5">
              <thead>
                <tr className="table-secondary">
                  <th scope="col">Order ID</th>
                  <th scope="col">الحالة</th>
                  <th scope="col">تغيير حالة الطلب (راجع الطلب قبل التغيير)</th>
                  <th scope="col">الإسم</th>
                  <th scope="col">رقم الجوال السعودي</th>
                  <th scope="col">رقم الجوال اليمني</th>
                  <th scope="col">مدينة الصعود</th>
                  <th scope="col">مدينة النزول</th>
                  <th scope="col">اليوم</th>
                  <th scope="col">التاريخ</th>
                  <th scope="col">عدد التذاكر</th>
                  <th scope="col">عدد الرضع</th>
                  <th scope="col">عدد الأطفال</th>
                  <th scope="col">عدد البالغين</th>
                  <th scope="col">ملاحظات إضافية</th>
                  
                </tr>
              </thead>
              {LoadTrips()}
            </table>
            </div>   
            <div className="justify-content-center">
              {(tripsOrders.orders && tripsOrders.limit < tripsOrders.orders.length) ? (<button id="trips" onClick={AddLimit} className="btn btn-sm btn-outline-success">عرض المزيد</button>) : null}
              {tripsOrders.limit> 5 ? (<button id="trips" onClick={ReduceLimit} className="btn btn-sm btn-outline-danger">عرض أقل</button>) : null}
            </div>
          </div>

          <div className="container mt-5">
            <span className="display-7 mb-2">طلبات إرسال الرسائل والطرود</span>
            <hr/>
            <div className="table-responsive">  
              <table className="table bg-grey  table-bordered mt-5">
              <thead>
                <tr className="table-secondary">
                  <th scope="col">Order ID</th>
                  <th scope="col">الحالة</th>
                  <th scope="col">تغيير حالة الطلب (راجع الطلب قبل التغيير)</th>
                  <th scope="col">نوع الطرد</th>
                  <th scope="col">محتوى الطرد</th>
                  <th scope="col">إسم المرسل</th>
                  <th scope="col">رقم جوال المرسل السعودي</th>
                  <th scope="col">رقم جوال المرسل اليمني</th>
                  <th scope="col">مدينة المرسل</th>
                  <th scope="col">مدينة المرسل إليه</th>
                  <th scope="col">ملاحظات إضافية</th>
                  
                </tr>
              </thead>
              {LoadDeliveries()}
            </table>
            </div>
            <div className="justify-content-center">
              {(deliveriesOrders.orders && deliveriesOrders.limit < deliveriesOrders.orders.length) ? (<button id="deliveries" onClick={AddLimit} className="btn btn-sm btn-outline-success">عرض المزيد</button>) : null}
              {deliveriesOrders.limit> 5 ? (<button id="deliveries" onClick={ReduceLimit} className="btn btn-sm btn-outline-danger">عرض أقل</button>) : null}
            </div>
          </div>

        </div>
    
      ) : null}
    </div>
  )
}