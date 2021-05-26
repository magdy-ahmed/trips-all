import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
//import {Cookies} from 'react-cookie';;


export const AllCompanyOffers = () => {
  //const cookies = new Cookies();

  const [offers, setOffers] = useState({offers: null, limit: 10})


  // User Authentication
  const [show, setShow] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect((offers) => {
    const jwt = localStorage.yemenbus_user_jwt ;
    fetch('/api/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({jwt: jwt, permission: 'offers_access'})
    }).then(resp => {
      if (resp.ok){
        setShow(true)
      } else {
        setFailed(true);
      }
    })
    fetch('/api/offers/admin', {
      methods: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(resp => {
      resp.json().then(data => {
        if (resp.ok){
          setOffers({offers: data.offers, limit: 10})
        }
      })
    });
  }, []);

  

  if (failed){
    return <Redirect to="/unauthorized"/>
  }

  const getStatus = (status)  => {
    const types = {
      'pending': ['قيد المراجعة', 'text-secondary'],
      'ok': ['في إنتظار المشتري', 'text-info'],
      'accepted': ['مقبول من المشتري', 'text-primary'],
      'declined': ['مرفوض من المشتري', 'text-danger'],
      'canceled': ['ملغي', 'text-warning'],
      'closed': ['تم الدفع', 'text-success']

    }
    return (types[status])
  }

  const getOrder = (tripOID, transOID, deliveryOID) => {
    if (tripOID){
      return [tripOID, 'طلب حجز رحلة']
    }
    if (transOID){
      return [transOID, 'طلب تخليص معاملة/أقساط']
    }
    if (deliveryOID){
      return [deliveryOID, 'طلب إرسال رسالة أو طرد']
    }
  }

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

  const LoadOffers = () => {
    const offers_patch = offers.offers && offers.offers.slice(0, offers.limit)

    return(
      <tbody>
        {offers_patch ? (offers_patch.map((offer, index) => {
          let status = getStatus(offer.status);
          let orderInfo = getOrder(offer.tripOID, offer.transOID, offer.deliveryOID);
          let offerInfo = getInfo(offer.info)
          return(
            <tr className="table-light" key={index}>
              <th className="font-weight-bold">{offer.oid}</th>
              <td className={"font-weight-bold " + status[1]}>{status[0]}</td>
              <th className="info-weight">{orderInfo ? orderInfo[1] : 'لا يوجد'}</th>
              <td className="info-weight">{offer.company}</td>
              <td className="info-weight">{offer.price} ريال</td>
              <td className="info-weight">{offer.deposit} ريال</td>
              <td className="info-weight">{offer.price_no_deposit} ريال</td>
              <td className="info-weight">{offer.VAT}%</td>
              <td className="info-weight">{offerInfo}</td>
              <td className="info-weight break-line">{offer.notes || 'لا توجد ملاحظات إضافية'}</td>
              
            </tr>
          )
        })) : null}
      </tbody>
    )
  }

  const AddLimit = (e) => {
    if ((offers.limit < offers.offers.length)){
      let new_limit = offers.limit + 10;
      setOffers({...offers, limit: new_limit})
    }
  }

  const ReduceLimit = (e) => {
    let new_limit = offers.limit - 10;
    if ((offers.limit > 10)){
      setOffers({...offers, limit: new_limit})
    }
  }

  return(
    <div className="mb-4 pb-4 ">
      {show ? (
        <div className="container text-center mt-5 pt-5">
          <span className="display-6 text-primary">
            جميع العروض
          </span>

          <hr/>
          <p className="font-weight-bold text-info"><i className="fa fa-star-of-life fa-xs"/> يتم عرض جميع العروض هنا</p>
          
          <div className="container mt-5">
            <div className="table-responsive">  
              <table name="TripsTable" className="table bg-grey  table-bordered mt-5">
              <thead>
                <tr className="table-secondary">
                  <th scope="col">Offer ID</th>
                  <th scope="col">الحالة</th>
                  <th scope="col">نوع الطلب</th>
                  <th scope="col">الشركة</th>
                  <th scope="col">الإجمالي (ريال سعودي)</th>
                  <th scope="col">العربون (ريال سعودي)</th>
                  <th scope="col">الإجمالي دون العربون (ريال سعودي)</th>
                  <th scope="col">الضريبة %</th>
                  <th scope="col">معلومات العرض</th>
                  <th scope="col">ملاحظات إضافية</th>
                  
                  
                </tr>
              </thead>
              {LoadOffers()}
            </table>
            </div>
            <div className="justify-content-center">
              {(offers.offers && offers.limit < offers.offers.length) ? (<button onClick={AddLimit} className="btn btn-sm btn-outline-success">عرض المزيد</button>) : null}
              {offers.limit> 10 ? (<button onClick={ReduceLimit} className="btn btn-sm btn-outline-danger">عرض أقل</button>) : null}
            </div>

          </div>
        </div>
    
      ) : null}
    </div>
  )
}