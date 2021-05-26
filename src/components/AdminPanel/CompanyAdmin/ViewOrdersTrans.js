import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
//import {Cookies} from 'react-cookie';;


export const CompanyTransOrders = () => {
  //const cookies = new Cookies();

  const [transactionsOrders, setTransactions] = useState({orders: null, limit: 5});
  const [status, setStatus] = useState({});

  // User Authentication
  const [show, setShow] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect((transactionsOrders) => {
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
    fetch('/api/transactions/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(resp => {
      resp.json().then(data => {
        if (resp.ok){
          setTransactions({orders: data.orders, limit: 5})
        }
      })
    });
  }, []);

  if (failed){
    return <Redirect to="/unauthorized"/>
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
      'fulfilled': ['مكتفي العروض', 'text-primary'],
      'waiting': ['في إنتظار الدفع', 'text-info'],
      'closed': ['مغلق', 'text-dark'],
      'rejected': ['مرفوض', 'text-danger'],
    }
    return (types[status])
  }

  const getTransType = (type) => {
    const types = {
      'TRSA': 'معاملات المقيمين في السعودية',
      'TSEY': 'معاملات السفارة السعودية في اليمن',
      'IESY': 'تقسيط الخدمات التعليمية في اليمن'
    }
    return (types[type])
  }

  const LoadTransactions = () => {
    const orders_patch = transactionsOrders.orders && transactionsOrders.orders.slice(0, transactionsOrders.limit)

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
              <td className="info-weight">{getTransType(order.type)}</td>
              <td className="info-weight">{order.service}</td>
              <td className="info-weight">{order.num_documents || 1}</td>
              <td className="info-weight break-line">{order.notes || 'لا توجد ملاحظات إضافية'}</td>
            </tr>
          )
        })) : null}
      </tbody>
    )
  }

  const AddLimit = (e) => {
    const id = e.target.id
    if ( id === "transactions" && (transactionsOrders.limit < transactionsOrders.orders.length)){
      let new_limit = transactionsOrders.limit + 5;
      setTransactions({...transactionsOrders, limit: new_limit})
    }
  }

  const ReduceLimit = (e) => {
    const id = e.target.id
    if ( id === "transactions" && (transactionsOrders.limit > 5)){
      let new_limit = transactionsOrders.limit - 5;
      setTransactions({...transactionsOrders, limit: new_limit})

      // Delete Hidden Transactions Status Changes.
      let ordersStatus = Object.entries(status);
      let shownOrders = transactionsOrders.orders.slice(0, new_limit)

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
            <span className="display-7 mb-2">طلبات المعاملات</span>
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
                  <th scope="col">نوع المعاملة</th>
                  <th scope="col">إسم المعاملة (الخدمة)</th>
                  <th scope="col">عدد الوثائق (الجوازات/الهويات)</th>
                  <th scope="col">ملاحظات إضافية</th>
                  
                </tr>
              </thead>
              {LoadTransactions()}
            </table>
            </div>
            <div className="justify-content-center">
              {(transactionsOrders.orders && transactionsOrders.limit < transactionsOrders.orders.length) ? (<button id="transactions" onClick={AddLimit} className="btn btn-sm btn-outline-success">عرض المزيد</button>) : null}
              {transactionsOrders.limit> 5 ? (<button id="transactions" onClick={ReduceLimit} className="btn btn-sm btn-outline-danger">عرض أقل</button>) : null}
            </div>
          </div>
        
        </div>
    
      ) : null}
    </div>
  )
}