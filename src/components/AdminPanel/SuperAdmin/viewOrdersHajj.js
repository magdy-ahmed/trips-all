import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import SearchBlock from '../TripsAdmin/Search-block2'

//import {Cookies} from 'react-cookie';;


export const AllOrdersHajj = () => {
  //const cookies = new Cookies();
  const [editRedirect,setEditRedirect]= useState({edit:false,id:null})

 
  const [dataTrips_, setDataTrips_] = useState([{

  id:11,
  chkId:'id',
  name:'Order Id',
},{
    id:2,
    chkId:'name',
    name:'الأسم',
},{
  id:5,
  chkId:'nick',
  name:'التاريخ',
},{
    id:3,
    chkId:'phone_s',
    name:'رقم الجوال السعودى',
},{
    id:4,
    chkId:'phone_y',
    name:'رقم الجوال اليمنى',
},{
    id:7,
    chkId:'from',
    name:'مدينة الصعود',
}])
const [dataPilgrims_, setDataPilgrims_] = useState([{
  id:1,
  chkId:'oid',
  name:'ID',
},{
id:11,
chkId:'id',
name:'Order Id',
},{
  id:2,
  chkId:'name',
  name:'الأسم',
},{
id:5,
chkId:'nick',
name:'الأسم المستعار',
},{
  id:3,
  chkId:'phone_s',
  name:'رقم الجوال السعودى',
},{
  id:4,
  chkId:'phone_y',
  name:'رقم الجوال اليمنى',
},{
  id:6,
  chkId:'passport_id',
  name:'رقم الجواز',
},{
  id:7,
  chkId:'city',
  name:'المدينة',
},{
  id:8,
  chkId:'village',
  name:'القرية',
},{
  id:9,
  chkId:'post',
  name:'المركز',
},{
  id:10,
  chkId:'nots',
  name:'ملاحظات أضافية',
}])


  const [tripsOrders, setTrips] = useState({orders: null, limit: 5});
  const [pilgrims,setPilgrims] = useState({orders: null, limit: 5});
  const [status, setStatus] = useState({});

  // User Authentication
  const [show, setShow] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect((tripsOrders, pilgrims) => {
    const jwt = localStorage.yemenbus_user_jwt ;
    const dataTrips={'idto':'','name':'','to':'','day':'',
    'date':'','ticket':'','phone_y':'','phone_s':'',
    'from':'','nots':'','offer':'','search':'','select':''}
    // Authentication
    const searchTrips = localStorage.getItem('search')

    const dataPilgrims={'id':'','oid':'','name':'','nick':'',
    'passport_id':'','city':'','post':'','phone_s':'',
    'village':'','nots':'','phone_y':'','search':'','select':''}
    const searchPilgrims = localStorage.getItem('search')
    
    for (let key in dataTrips){
      if (localStorage.getItem(key)!='false'){
        dataTrips[key] = searchTrips
        console.log(dataTrips[key])
      }
    }
    if (localStorage.getItem('select')=='false'){
      dataTrips['select'] = true

    }
    for (let key in dataPilgrims){
      if (localStorage.getItem(key)!='false'){
        dataPilgrims[key] = searchPilgrims
        console.log(dataPilgrims[key])
      }
    }
    if (localStorage.getItem('select')=='false'){
      dataPilgrims['select'] = true
      
    }
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
    fetch('/api/hajj/search/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },body:JSON.stringify(dataTrips)
    }).then(resp => {
      resp.json().then(data => {
        if (resp.ok){
          setTrips({orders: data.orders, limit: 5})
        }
      })
    });

    fetch('/api/search/pilgrims', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },body:JSON.stringify(dataPilgrims)
    }).then(resp => {
      resp.json().then(data => {
        if (resp.ok){
         setPilgrims({orders: data.pilgrims, limit: 5})
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

  const getTransType = (type) => {
    const types = {
      'TRSA': 'معاملات المقيمين في السعودية',
      'TSEY': 'معاملات السفارة السعودية في اليمن',
      'IESY': 'تقسيط الخدمات التعليمية في اليمن'
    }
    return (types[type])
  }

  const getPackageType = (type) => {
    const types = {
      'merchant': 'بضائع تجارية',
      'package': 'طرد',
      'letter': 'رسالة'
    }

    return (types[type])
  }

  const loadOrders = () => {
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
              <td className="info-weight">{(order.date && getDate(new Date(order.date))) || 'غير مرفق'}</td>
              <td className="info-weight">{order.tickets}</td>
              <td className="info-weight">{order.num_babies || '0'}</td>
              <td className="info-weight">{order.num_kids || '0'}</td>
              <td className="info-weight">{order.num_elders || '0'}</td>
              <td className="info-weight break-line">{false?<button className="btn btn-success">تحميل الوثائق</button>:'مغلق'}</td>
              <td className="info-weight break-line">{false?<button className="btn btn-primary">تأكيد بيانات</button>:'مغلق'}</td>
              <td className="info-weight break-line">{order.notes || 'لم يتم إضافة ملاحظات'}</td>
              
            </tr>
          )
        })) : null}
      </tbody>
    )
  }
  const loadPilgrims = () => {
    const orders_patch = pilgrims.orders && pilgrims.orders.slice(0, pilgrims.limit)

    return(
      <tbody>
        {orders_patch ? (orders_patch.map((order, index) => {
          return(
            <tr className="table-light" key={index}>
              
              <th className="font-weight-bold" scope="row">{order.phid}</th>
              <td className="info-weight">{order.hoid || ''}</td>
              <td className="info-weight">{order.name}</td>
              <td className="info-weight">{order.nick}</td>

              <td className="info-weight">{order.phone_sa ? (<i dir="ltr" className="tc">{order.phone_sa}</i>) : ('غير مرفق')}</td>
              <td className="info-weight">{order.phone_ye ? (<i dir="ltr" className="tc">{order.phone_ye}</i>) : ('غير مرفق')}</td>

              <td className="info-weight">{order.passport_id || 'غير محدد'}</td>
              <td className="info-weight">{order.issue_date || 'غير محدد'}</td>
              <td className="info-weight">{order.expire_date || 'غير محدد'}</td>
              <td className="info-weight">{order.birth_date || 'غير محدد'}</td>
              <td className="info-weight">{order.gender|| 'غير محدد'}</td>
              <td className="info-weight">{order.relation || 'غير محدد'}</td>
              <td className="info-weight">{order.sick || 'معافى من الأمراض'}</td>
              <td className="info-weight">{order.city || 'غير محدد'}</td>
              <td className="info-weight">{order.post || 'غير محدد'}</td>
              <td className="info-weight">{order.village || 'غير محدد'}</td>



              <td className="info-weight break-line">{order.notes || 'لم يتم إضافة ملاحظات'}</td>
              <td className="info-weight break-line">{false?<button className="btn btn-danger btn-sm">تأكيد</button>:'مغلق'}</td>
              <td className="info-weight break-line"><button onClick={editPilgrim} value={order.phid} className="btn btn-danger btn-sm">تحديث بيانات</button></td>
              
            </tr>
          )
        })) : null}
      </tbody>
    )
  }


const editPilgrim =(e)=>{
  e.preventDefault();
  setEditRedirect({edit:true,id:e.target.value})
}
if(editRedirect.edit){
  return <Redirect to={`/admin/allorders-hajj/${editRedirect.id}/active`}/>
}
  const AddLimit = (e) => {
    const id = e.target.id
    if ( id === "trips" && (tripsOrders.limit < tripsOrders.orders.length)){
      let new_limit = tripsOrders.limit + 5;
      setTrips({...tripsOrders, limit: new_limit})
    }

  }

  const ReduceLimit = (e) => {
    const id = e.target.id
    
    if ( id === "trips" && (tripsOrders.limit > 5)){
      let new_limit = tripsOrders.limit - 5;
      setTrips({...tripsOrders, limit: new_limit})

      // Delete Hidden Trips Status Changes.
      let ordersStatus = Object.entries(status);
      let shownOrders =  tripsOrders.orders.slice(0, new_limit)

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



  }


  return(
    <div className="mb-4 pb-4 ">
      {show ? (
        <div className="container text-center mt-5 pt-5">


          <div className="text-md-left justify-content-sm-center mt-2">
            <button onClick={handleSubmit} className="btn btn-sm btn-outline-primary">تغيير الحالات</button>
            <p className="text-primary font-info"><i className="fa fa-star-of-life fa-xs"/> تغيير جميع الحالات المحددة</p>
          </div>

          
          <div className="container mt-5">
            <span className="display-7 mb-2">طلبات الحج والعمرة</span>
            <hr/>
            <SearchBlock  data = {dataTrips_}/>

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
                  <th scope="col">التاريخ</th>
                  <th scope="col">عدد التذاكر</th>
                  <th scope="col">عدد الرضع</th>
                  <th scope="col">عدد الأطفال</th>
                  <th scope="col">عدد البالغين</th>
                  <th scope="col">تحميل الوثائق</th>
                  <th scope="col">ـأكيد بيانتات</th>
                  <th scope="col">ملاحظات إضافية</th>

                  
                </tr>
              </thead>
              {loadOrders()}
            </table>
            </div>   
            <div className="justify-content-center">
              {(tripsOrders.orders && tripsOrders.limit < tripsOrders.orders.length) ? (<button id="trips" onClick={AddLimit} className="btn btn-sm btn-outline-success">عرض المزيد</button>) : null}
              {tripsOrders.limit> 5 ? (<button id="trips" onClick={ReduceLimit} className="btn btn-sm btn-outline-danger">عرض أقل</button>) : null}
            </div>
          </div>
        </div>
    
      ) : null}
       <div className="container text-center mt-5 pt-5">


<div className="text-md-left justify-content-sm-center mt-2">
  <button onClick={handleSubmit} className="btn btn-sm btn-outline-primary">تغيير الحالات</button>
  <p className="text-primary font-info"><i className="fa fa-star-of-life fa-xs"/> تغيير جميع الحالات المحددة</p>
</div>


<div className="container mt-5">
  <span className="display-7 mb-2">تأكيد بيانات الحجاج والمعتمرين</span>
  <hr/>
  <SearchBlock  data = {dataPilgrims_}/>

  <div className="table-responsive">     
    <table className="table bg-grey  table-bordered mt-5">
    <thead>
      <tr className="table-secondary">
        <th scope="col">Order ID</th>
        <th scope="col">ID </th>
        <th scope="col">الأسم</th>
        <th scope="col">الأسم المستعار</th>

        <th scope="col">رقم الجوال السعودي</th>
        <th scope="col">رقم الجوال اليمني</th>
        <th scope="col">رقم جواز السفر</th>
        <th scope="col">تاريخ الأصدار</th>
        <th scope="col"> تاريخ الأنتهاء</th>
        <th scope="col"> تاريخ الميلاد</th>
        <th scope="col"> الجنس</th>
        <th scope="col"> الصلة بالمسافر</th>
        <th scope="col"> الحالة المرضية</th>
        <th scope="col"> المدينة</th>
        <th scope="col"> القرية</th>
        <th scope="col"> المركز</th>

        <th scope="col">ملاحظات إضافية</th>
        <th scope="col">تحميل الوثائق</th>
        <th scope="col">تأكيد الهوية</th>





        
      </tr>
    </thead>
        {loadPilgrims()}
  </table>
  </div>   
  <div className="justify-content-center">
    {(pilgrims.orders && pilgrims.limit < pilgrims.orders.length) ? (<button id="trips" onClick={AddLimit} className="btn btn-sm btn-outline-success">عرض المزيد</button>) : null}
    {pilgrims.limit> 5 ? (<button id="trips" onClick={ReduceLimit} className="btn btn-sm btn-outline-danger">عرض أقل</button>) : null}
  </div>
</div>
</div>
    </div>
  )
}