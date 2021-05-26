import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import SearchBlock from './TripsAdmin/Search-block'


//import {Cookies} from 'react-cookie';;


export const MyOffers = (props) => {


  const currentState = props.location.state;
  const flash = currentState && currentState.flash;

  const [show, setShow] = useState(false);
  const [failed, setFailed] = useState(false);

  const [offers, setOffers] = useState({offers: null, company: null, limit: 3})

  // Edit
  const [isEdit, setEdit] = useState({edit: false, type: null, offer: null});
  const [dataOffers_, setDataOffers_] = useState([{
    id:1,
    chkId:'idto_offers',
    name:'Offer Id',
},{
    id:2,
    chkId:'type_offers',
    name:'نوع الطلب',
},{
    id:3,
    chkId:'company_offers',
    name:'الشركة',
},{
    id:9,
    chkId:'information_offers',
    name:'معلومات ألعرض',
},{
  id:10,
  chkId:'notes_offers',
  name:'ملاحظات',
}])

  useEffect((offers) => {
    const jwt = localStorage.yemenbus_user_jwt ;
    const dataOffers = {'search':'','idto_offers':'','type_offers':'',
    'company_offers':'','curency_offers':'',
    'total_offers':'','pay_offers':'','remainder_offers':'','curency_offers':'',
    'tax_offers':'','information_offers':'','notes_offers':'','select':''}
    const searchOffers = localStorage.getItem('search')
    for (let key in dataOffers){
      if (localStorage.getItem(key)!='false'){
        dataOffers[key] = searchOffers
      }
    }
    if (localStorage.getItem('select')=='false'){
      dataOffers['select'] = true
    
    }
    fetch('/api/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({jwt: jwt, permission: 'company_access'})
    }).then(resp => {
      if (resp.ok){
        setShow(true)
      } else {
        setFailed(true);
      }
    })
    fetch('/api/offers/search/company', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },body:JSON.stringify(dataOffers)
    }).then(resp => {
      resp.json().then(data => {
        if (resp.ok){
          setOffers({
            offers: data.offers,
            company: data.company,
            limit: 3
          })
        }
      })
    });
  }, []);


  const getStatus = (status)  => {
    const types = {
      'pending': ['قيد المراجعة', 'text-secondary'],
      'ok': ['في إنتظار المشتري', 'text-info'],
      'accepted': ['مقبول', 'text-primary'],
      'declined': ['مرفوض', 'text-warning'],
      'canceled': ['ملغي', 'text-danger'],
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
  const handleSubmit = (e) => {
    e.preventDefault();
    
  }
  const handleChange = (e) => {
    e.preventDefault();
    
    localStorage.setItem('search', e.target.value);
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
          let offerInfo = getInfo(offer.info);
          return(
            <tr className="table-light" key={index}>
              <th className="font-weight-bold">{offer.oid}</th>
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
              <td className="info-weight break-line">{offer.notes || 'لم يتم إضافة ملاحظات'}</td>
              <td className={"font-weight-bold " + status[1]}>{status[0]}</td>
              <td className="info-weight text-danger">
                {
                  offer.status === 'pending' ? (
                  <button onClick={() => {setEdit({edit: true, type:orderInfo[1], offer: offer})}} className="btn btn-sm btn-grey">تعديل العرض</button>
                  ) : 'لا يمكن تعديل العرض'
                }
              </td>
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
    if ((offers.limit > 3)){
      let new_limit = offers.limit - 3;
      setOffers({...offers, limit: new_limit})
    }
  }


  if (failed){
    return <Redirect to="/unauthorized"/>
  }

  if (isEdit.edit){
    if (isEdit.type === 'طلب تخليص معاملة/أقساط'){
      return <Redirect to={{
        pathname: "/admin/transactions/offer/edit",
        state: {offer: isEdit.offer}
      }}/>
    } else{
      return <Redirect to={{
        pathname: "/admin/trips/offer/edit",
        state: {offer: isEdit.offer}
      }}/>
    }
  }

  return(
    <div className="mb-4 pb-4 ">
      {show ? (
        <div className="container text-center mt-5 pt-5">
          <span className="display-6 text-primary">
            عروضي
          </span>

          <hr/>
          {offers.company === 'All' ? (
            <p className="font-weight-bold text-info"><i className="fa fa-star-of-life fa-xs"/> يتم عرض جميع العروض الخاصة بكل الشركات هنا</p>
          ) : (
            <p className="font-weight-bold text-info"><i className="fa fa-star-of-life fa-xs"/> يتم عرض جميع العروض الخاصة بشركتك هنا</p>
          )}
          
          {flash ? (
            <div className={`mt-4 alert ${flash.type} text-right`}>
              <p className="font-weight-bold">{flash.name} : {flash.message}</p>
            </div>
          ) : null}

          <div className="container mt-5">
            <span className="display-7 mb-2">عروض ( {offers.company === 'All' ? 'كل الشركات' : offers.company} )</span>
            <hr/>
            <SearchBlock  data = {dataOffers_}/>

            <div className="table-responsive">  
              <table name="TripsTable" className="table bg-grey  table-bordered mt-5">
              <thead>
                <tr className="table-secondary">
                  <th scope="col">Offer ID</th>
                  <th scope="col">نوع الطلب</th>
                  <th scope="col">الشركة</th>
                  <th scope="col">العملة</th>
                  <th scope="col">الإجمالي</th>
                  <th scope="col">العربون</th>
                  <th scope="col">الإجمالي دون العربون</th>
                  <th scope="col">الضريبة (%)</th>
                  <th scope="col">معلومات العرض</th>
                  <th scope="col">ملاحظات إضافية</th>
                  <th scope="col">الحالة</th>
                  <th scope="col">تعديل العرض</th>
                </tr>
              </thead>
              {LoadOffers()}
            </table>
            </div>
            <div className="justify-content-center">
              {(offers.offers && offers.limit < offers.offers.length) ? (<button onClick={AddLimit} className="btn btn-sm btn-outline-success">عرض المزيد</button>) : null}
              {offers.limit > 3 ? (<button onClick={ReduceLimit} className="btn btn-sm btn-outline-danger">عرض أقل</button>) : null}
            </div>
          </div>
        </div>
    
      ) : null}
      
    </div>
  )
}