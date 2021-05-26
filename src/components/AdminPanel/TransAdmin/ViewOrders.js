import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
// import {Cookies} from 'react-cookie';


export const TransactionsOrders = () => {
  // const cookies = new Cookies();

  const [orders, setOrders] = useState({orders: null, limit: 5})
  const [offer, setOffer] = useState({offer: false, oid: null})

  // User Authentication
  const [show, setShow] = useState(false);
  const [failed, setFailed] = useState(false);

  // User Authentication + Content Loading
  useEffect((orders) => {
    // User Authentication
    const jwt = localStorage.yemenbus_user_jwt;
    fetch('/api/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({jwt: jwt, permission: 'trans_access'})
    }).then(resp => {
      if (resp.ok){
        setShow(true)
      } else {
        setFailed(true);
      }
    })

    // Content Loading
    fetch('/api/transactions/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(resp => {
      resp.json().then(data => {
        if (resp.ok){
          setOrders({orders: data.orders, limit: 5})
        }
      })
    });
  }, []);

  

  if (failed){
    return <Redirect to="/unauthorized"/>
  }

  const handleOffer = (e) => {
    e.preventDefault();
    setOffer({offer: true, oid: e.target.id})
  }

  const getTransType = (type) => {
    const types = {
      'TRSA': 'معاملات المقيمين في السعودية',
      'TSEY': 'معاملات السفارة السعودية في اليمن',
      'IESY': 'تقسيط الخدمات التعليمية في اليمن'
    }
    return (types[type])
  }

  const getStatus = (status)  => {
    if (status === 'open'){
      return true
    } else {
      return false
    }
  }

  const LoadTransactions = () => {
    const orders_patch = orders.orders && orders.orders.slice(0, orders.limit)

    return(
      <tbody>
        {orders_patch ? (orders_patch.map((order, index) => {
          let offers = order.offers;
          let status = getStatus(order.status);
          return(
            <tr className="table-light" key={index}>
              <th className="font-weight-bold" scope="row">
                {offers >= 4 ? (
                  <i className="tc text-secondary">{order.toid}</i>
                ) : (
                  <Link to="#" id={order.toid} className="text-secondary" onClick={handleOffer}>{order.toid}</Link>
                )}
              </th>
              <td className="info-weight">{getTransType(order.type)}</td>
              <td className="info-weight break-line">{order.service}</td>
              <td className="info-weight">{order.num_documents || 1}</td>
              <td className="info-weight break-line">{order.notes || 'لا توجد ملاحظات إضافية'}</td>
              <td>
                {offers >= 4 ? (
                  <i className="tc font-weight-bold text-secondary">مكتفي العروض</i>
                ) : status ? (
                  <button id={order.toid} onClick={handleOffer} className="btn info-weight btn-sm btn-outline-success">إضافة عرض</button>
                ) : (
                  <i className="tc font-weight-bold text-dark">لا يستقبل عروض</i>
                )}
              </td>
            </tr>
          )
        })) : null}
      </tbody>
    )
  }

  const AddLimit = (e) => {
    if ((orders.limit < orders.orders.length)){
      let new_limit = orders.limit + 5;
      setOrders({...orders, limit: new_limit})
    }
  }

  const ReduceLimit = (e) => {
    if ((orders.limit > 5)){
      let new_limit = orders.limit - 5;
      setOrders({...orders, limit: new_limit})
    }
  }

  if (offer.offer) {
    return <Redirect to={{
      pathname: '/admin/transactions/offer',
      state: {orderID: offer.oid}
    }} />
  }

  return(
    <div className="mb-4 pb-4 ">
      {show ? (
        <div className="container text-center mt-5 pt-5">
          <span className="display-6 text-primary">
            جميع الطلبات
          </span>

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
                  <th scope="col">نوع المعاملة</th>
                  <th scope="col">إسم المعاملة (الخدمة)</th>
                  <th scope="col">عدد الوثائق (الجوازات/الهويات)</th>
                  <th scope="col">ملاحظات إضافية</th>
                  <th scope="col">إضافة عرض</th>
                </tr>
              </thead>
              {LoadTransactions()}
            </table>
            </div>
            <div className="justify-content-center">
              {(orders.orders && orders.limit < orders.orders.length) ? (<button onClick={AddLimit} className="btn btn-sm btn-outline-success">عرض المزيد</button>) : null}
              {orders.limit> 5 ? (<button onClick={ReduceLimit} className="btn btn-sm btn-outline-danger">عرض أقل</button>) : null}
            </div>
          </div>
        
        </div>
    
      ) : null}
    </div>
  )
}