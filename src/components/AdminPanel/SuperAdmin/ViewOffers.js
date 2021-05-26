import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import SearchBlock from '../TripsAdmin/Search-block'

//import {Cookies} from 'react-cookie';;


export const AllOffers = () => {
  //const cookies = new Cookies();

  const [offers, setOffers] = useState({offers: null, limit: 3})
  const [status, setStatus] = useState({});
  // User Authentication
  const [show, setShow] = useState(false);
  const [failed, setFailed] = useState(false);
  const [dataOffers_, setDataOffers_] = useState([{
    id:1,
    chkId:'idto',
    name:'Offer Id',
},{
    id:2,
    chkId:'status',
    name:'الحالة',
},{
    id:3,
    chkId:'type',
    name:'نوع الطلب',
},{
    id:4,
    chkId:'company',
    name:'الشركة',
},{
  id:10,
  chkId:'information',
  name:'معلومات العرض',
},{
  id:11,
  chkId:'notes',
  name:'معلومات أضافية',
}])
const dataOffers = {'search':'','idto':'','type':'',
'company':'','curency':'',
'price':'','deposit':'','price_no_deposit':'','curency':'',
'tax':'','information':'','notes':'','select':'','num':'','min':0,'max':100000}
const searchOffers = localStorage.getItem('search')

dataOffers['search'] = searchOffers
for (let key in dataOffers){
  if (localStorage.getItem(key)!='false'){
    dataOffers[key] = searchOffers
  }
  if(localStorage.getItem('search')==''){

  }
}
if (localStorage.getItem('select')=='false'){
  dataOffers['select'] = true

}

  useEffect((offers) => {
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
    fetch('/api/search/offers/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },body:JSON.stringify(dataOffers)
    }).then(resp => {
      resp.json().then(data => {
        if (resp.ok){
          setOffers({offers: data.offers, limit: 3})
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateStatuses = async() => {
      await fetch('/api/offers/status', {
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
    if (e.target.value === 'ok') {
      el.className = "custom-select font-weight-bold text-success"
    } else if (e.target.value === 'canceled') {
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

  const StatusSwitch = (oid, status) => {
    let types = {
      'pending': (
        <optgroup>
          <option value="" className="text-dark" defaultValue>إختر الحالة</option>
          <option value="ok" className="text-success font-weight-bold">قبول العرض</option>
          <option value="canceled" className="text-warning font-weight-bold">إلغاء العرض</option>
          <option value="delete" className="text-danger font-weight-bold">حذف</option>
        </optgroup>
      ),
      'ok': (
        <optgroup>
          <option value="" className="text-dark" defaultValue>إختر الحالة</option>
          <option value="canceled" className="text-warning font-weight-bold">إلغاء العرض</option>
          <option value="delete" className="text-danger font-weight-bold">حذف</option>
        </optgroup>
      ),
      'accepted': (
        <optgroup>
          <option value="" className="text-dark" defaultValue>إختر الحالة</option>
          <option value="canceled" className="text-warning font-weight-bold">إلغاء العرض</option>
        </optgroup>
      ),
      'declined': (
        <optgroup>
          <option value="" className="text-dark" defaultValue>إختر الحالة</option>
          <option value="delete" className="text-danger font-weight-bold">حذف</option>
        </optgroup>
      ),
      'canceled': (
        <optgroup>
          <option value="" className="text-dark" defaultValue>إختر الحالة</option>
          <option value="delete" className="text-danger font-weight-bold">حذف</option>
        </optgroup>
      ),
      'closed': (
        <optgroup>
          <option value="" className="text-dark" defaultValue>إختر الحالة</option>
          <option value="delete" className="text-danger font-weight-bold">حذف</option>
        </optgroup>
      )
    }
    return(
      <select onChange={handleSwitch} id={oid} className="custom-select font-weight-bold">
        {status && types[status]}
      </select>
    )
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
      num_installments: 'عدد الأقساط',
      price: 'الإجمالي'
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
              <td className="font-weight-bold">{StatusSwitch(offer.oid, offer.status)}</td>
              <th className="info-weight">{orderInfo ? orderInfo[1] : 'لا يوجد'}</th>
              <td className="info-weight">{offer.company}</td>
              {
                offer.currency === 'SAYE' ? (
                  <td className="info-weight">ريال سعودي</td>
                ) : (
                  <td className="info-weight">ريال يمني</td>
                )
              }
              {
                offer.currency === 'SAYE' ? (
                  <td className="info-weight">{Math.round(parseFloat(offer.price)) || 0} ريال</td>
                ) : (
                  <td className="info-weight">{Math.round(parseFloat(offer.price * 66.76))} ريال</td>
                )
              }
              {
                offer.currency === 'SAYE' ? (
                  <td className="info-weight">{Math.ceil(parseFloat(offer.deposit))} ريال</td>
                ) : (
                  <td className="info-weight">{Math.ceil(parseFloat(offer.deposit * 66.76))} ريال</td>
                )
              }
              {
                offer.currency === 'SAYE' ? (
                  <td className="info-weight">{Math.floor(parseFloat(offer.price_no_deposit))} ريال</td>
                ) : (
                  <td className="info-weight">{Math.floor(parseFloat(offer.price_no_deposit * 66.76))} ريال</td>
                )
              }
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
      let new_limit = offers.limit + 3;
      setOffers({...offers, limit: new_limit})
    }
  }

  const ReduceLimit = (e) => {
    let new_limit = offers.limit - 3;
    if ((offers.limit > 3)){
      setOffers({...offers, limit: new_limit})
    }

    // Delete Hidden Trips Status Changes.
    let tripsStatus = Object.entries(status);
    let shownTrips = offers.offers && offers.offers.slice(0, new_limit)

    tripsStatus && tripsStatus.map(key => {
      let trip = shownTrips.find(t => t.tid === key[0]);
      if (!trip) {
        let currentStatus = status;
        delete currentStatus[key[0]]
        setStatus(currentStatus);
      }
    })
  }
  const handleChange = (e) => {
    e.preventDefault();
    
    localStorage.setItem('search', e.target.value);
  }
  return(
    <div className="mb-4 pb-4 ">
      {show ? (
        <div className="container text-center mt-5 pt-5">
          <span className="display-6 text-primary">
            جميع العروض
          </span>

          <hr/>
          <SearchBlock  data = {dataOffers_} />

          <p className="font-weight-bold text-info"><i className="fa fa-star-of-life fa-xs"/> يتم عرض جميع العروض هنا</p>
          
          <div className="container mt-5">
            <div className="table-responsive">  
              <table name="TripsTable" className="table bg-grey  table-bordered mt-5">
              <thead>
                <tr className="table-secondary">
                  <th scope="col">Offer ID</th>
                  <th scope="col">الحالة</th>
                  <th scope="col">تغيير الحالة (راجع العرض أولاً)</th>
                  <th scope="col">نوع الطلب</th>
                  <th scope="col">الشركة</th>
                  <th scope="col">العملة</th>
                  <th scope="col">الإجمالي</th>
                  <th scope="col">العربون</th>
                  <th scope="col">الإجمالي دون العربون</th>
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
              <button onClick={handleSubmit} className="btn btn-sm btn-outline-primary">تغيير الحالات</button>
              {offers.limit> 3 ? (<button onClick={ReduceLimit} className="btn btn-sm btn-outline-danger">عرض أقل</button>) : null}
            </div>

          </div>
        </div>
    
      ) : null}
    </div>
  )
}