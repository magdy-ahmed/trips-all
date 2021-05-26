import React, { useState } from 'react';
import { Link, Redirect ,useParams} from 'react-router-dom';
import homeImg from '../../../Static/Images/Home/order.jpg';

// Default Preview Image
import preview_img from '../../../Static/Images/Preview/preview.png'

// Finished ... 

export const HajjTrip = () => {
  const { tid } = useParams();
  const [state, setState] = useState({
    companies: [],
    type: null,
    tid:tid
  }); // Set State to Sent Data To API

  const [error, setError] = useState({}); // Set Errors in Forms
  const [day, setDay] = useState(); // Set Day By Date
  const [complete, setComplete] = useState({completed: false, order: null});
  
  // For Image Upload
  const [upBtn, setUpBtn] = useState('btn')
  const weekdays = [
    {name: 'الأحد', value: 'Sunday'},
    {name: 'الإثنين', value: 'Monday'},
    {name: 'الثلاثاء', value: 'Tuesday'},
    {name: 'الأربعاء', value: 'Wednesday'},
    {name: 'الخميس', value: 'Thursday'},
    {name: 'الجمعة', value: 'Friday'},
    {name: 'السبت', value: 'Saturday'},
  ]
  
  const cities = [
    'جدة',
    'مكة',
    'الرياض',
    'الدمام',
    'الطوال',
    'جيزان',
    'شرورة',
    'وادي الدواسر',
    "صنعاء",
    "عدن",
    "تعز",
    "الحديدة",
    "مارب",
    "ذمار",
    "اب",
    "المكلا",
    "عفار",
    "البيضاء",
    "رداع",
    "الجراجي",
    "زبيد",
    "عتق",
    "الغيظة",
    "سيئون",
    "باجل",
    "حجة",
    "صعدة",
    "شبوة",
    "الضحي",
    "لحج"
  ]
  
  const YEcities = [
    "صنعاء",
    "عدن",
    "تعز",
    "الحديدة",
    "مارب",
    "ذمار",
    "اب",
    "المكلا",
    "عفار",
    "البيضاء",
    "رداع",
    "الجراجي",
    "زبيد",
    "عتق",
    "الغيظة",
    "سيئون",
    "باجل",
    "حجة",
    "صعدة",
    "شبوة",
    "الضحي",
    "لحج"
  ]

  const Companies = [
    "يمن باص",
    "البركة",
    "النور",
    "اعتماد",
    "الأفضل",
    "أبو سرهد",
    "النورس",
    "راحة",
    "السراج",
    "البراق",
    "بن معمر",
    "النصر",
    "المتحدة",
    "النقل الجماعي",
    "العربي",
    "العربية",
    "الأولى",
    "المسافر العربي",
    "الإمبرطور",
    "آسيا"
  ]

  const YECompanies = [
    'يمن باص',
    'الاولى',
    'راحة',
    'النور',
    'البراق',
    'النقل الجماعي'
  ]


  const handleType = (e) => {
    // Reset Forms
		const Form = document.TripForm;
    Form && Form.reset();
    let image_form = document.getElementById('image_preview')
    if (image_form){
      image_form.src = preview_img
    }
    // Reset State & set Type, and Errors
    
		setState({companies: [], type: e.target.value});
    setError({});
     console.log(state.tid)   
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const Order = async() => {
      await fetch('/api/hajj/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({...state, hostname: window.location.origin})
      }).then(resp => {
        resp.json().then(data =>{
          if (resp.ok) {
            setComplete({completed: true, order: data.oid})
          } else {
            document.getElementById("SubmissionBtn").disabled = false;
            document.getElementById('waitingText').classList.add('d-none')
            setError({
              Submit: {
                name: 'خطأ',
                error: 'حدث خطأ أثناء معالجة الطلب, الرجاء المحاولة من جديد لاحقاً!'
              }
            })
          }
        })
      })
    }

    // Values To Validate Tickets
    // let elders = parseInt(state['num_elders']) || 0
    // let kids = parseInt(state['num_kids']) || 0
    // let babies = parseInt(state['num_babies']) || 0
    // let tickets = parseInt(state['num_tickets']) || 0


    if ((!state['phone_sa'] && !state['phone_ye'])) {
      setError({
        ...error,
        phone: {
          name: 'أرقام الهاتف',
          error: 'يجب أن تقوم بإضافة رقم هاتف واحد على الأقل'
        }
      });
    } else if ((state['phone_sa'] && state['phone_sa'].length < 10) || (state['phone_ye'] && state['phone_ye'].length < 9)) {
      setError({
        ...error,
        phone: {
          name: 'أرقام الهاتف',
          error: 'يجب أن يكون طول رقم الهاتف السعودي 10 والهاتف اليمني 9'
        }
      });
    } else if (!state['companies'] || (state['companies'] && state['companies'].length === 0)) {
      setError({
        ...error,
        companies: {
          name: 'شركات النقل',
          error: 'الرجاء تحديد شركة نقل واحدة على الأقل'
        }
      })
    }
     else if (!state['date'] || state.date === '') {
      setError({
        ...error,
        date: {
          name: 'التاريخ',
          error: 'الرجاء إدخال تاريخ الرحلة, ويجب أن يكون خلال 7 أيام من تاريخ اليوم.'
        }
      })

    } else {
      // Re-set Error
      setError({})

      // Sending Order To Backend, Disabling the submission button in case of delay
      document.getElementById("SubmissionBtn").disabled = true;
      document.getElementById('waitingText').classList.remove('d-none')
      Order();
    
    }
  }

  const handleChange = (e) => {
    // Not Preventing Default when Using Checkbox
    if (e.target.name !== 'companies[]'){
      e.preventDefault();
    }

    if (e.target.id === 'phone_sa' || e.target.id === 'phone_ye') {
      // Remove No-existing Phone Number Error
      let errors = error;
      delete errors['phone'];
      setError(errors);



      let phone = e.target.value
      const re = /\D/g;
      phone = phone.replace(re, '');
      // Validate SaudiArabia & Yemen Phone Number
      if (e.target.id === 'phone_sa') {
        let maxLength = 10;
        // Check First two (must match 05)
        if (phone.length >= 2 && (phone[0] === '0' && phone[1] === '5')) {
          
          if ((phone.length < maxLength)){
            setError({
              ...error,
              [e.target.id]: {
                error: 'يجب أن يحتوي رقم الهاتف السعودي على 10 أرقام',
                name: 'رقم الهاتف السعودي',
                type: 'warning'
              }
            })

          } else {
            // Delete PhoneSA errors
            let errors = error
            delete errors[e.target.id]
            setError(errors)
          }
        
        } else if (phone.length >= 2 && (phone[0] !== '0' || phone[1] !== '5')) {
          setError({
            ...error,
            [e.target.id]: {
              error: 'يجب أن يبدأ رقم الهاتف السعودي بـ 05',
              name: 'رقم الهاتف السعودي'
            }
          })
        
        } else {
          let errors = error
          delete errors[e.target.id]
          setError(errors)
        }
        // Check Length
        if (phone.length > maxLength) {
          phone = phone.slice(0, (maxLength-1))
        }
      } else {
        let maxLength = 9;
        // Check First (must match 7)
        if (phone.length >= 1 && phone[0] === '7') {
          if ((phone.length < maxLength)){
            setError({
              ...error,
              [e.target.id]: {
                error: 'يجب أن يحتوي رقم الهاتف اليمني على 9 أرقام',
                name: 'رقم الهاتف اليمني',
                type: 'warning'
              }
            })

          } else {
            // Delete PhoneSA errors
            let errors = error
            delete errors[e.target.id]
            setError(errors)
          }

        } else if (phone.length >= 1 && phone[0] !== '7') {
          setError({
            ...error,
            [e.target.id]: {
              error: 'يجب أن يبدأ رقم الهاتف اليمني بـ 7',
              name: 'رقم الهاتف اليمني'
            }
          })
          
        } else {
          let errors = error
          delete errors[e.target.id]
          setError(errors)
        }
        // Check Length
        if (phone.length > maxLength) {
          phone = phone.slice(0, (maxLength-1))
        }
      }
      e.target.value = phone;
      // Set Phone Number
      setState({
        ...state,tid:tid,
        [e.target.id]: e.target.value
      })
    } else if (e.target.id === 'date') {
      var date = new Date(e.target.value);
      var index = date.getDay();
      var value = weekdays[index] && weekdays[index].name;
      setDay(value);
      setState({...state, [e.target.id]: e.target.value, day: value});

    } else if (e.target.name === 'companies[]') {
      let id = e.target.id;
      // If User is checking a box
      if (document.getElementById(id).checked) {
        var limit = 4;
        if (state.companies.length < limit) {
          setState({...state, companies: [...state.companies, e.target.value]})
        } else {
          document.getElementById(id).checked = false;
        }
        // Delete Companies Errors
        let errors = error;
        delete errors['companies']
        setError(errors)
      }
      // If User is unChecking a box
      else {
        var companies = state.companies;
        const index = companies.indexOf(e.target.value);
        if (index > -1){
          companies.splice(index, 1)
        }
        setState({...state, companies: companies})
      }
    }  else if (e.target.id === 'date') {
      let errors = error;
      delete errors['date'];
      setError(errors);

      setState({
        ...state,
        [e.target.id]: e.target.value
      })

    } else {
      setState({
        ...state,
        [e.target.id]: e.target.value
      })
    }
  }

  // const handlePassengerChange = (e) => {
  //   e.preventDefault();

  //   // Get keys => Namespace & ID
  //   var keys = e.target.id.split('-')
  //   let namespace = keys[0]
  //   let id = keys[1]

  //   //  Keeping The State & Adding Info
  //   let CurState = {...state}
  //   let CurPasInfo = [...CurState.passengers.data]

  //   let TargetPass = {...CurPasInfo[id], [namespace]: e.target.value}

  //   CurPasInfo[id] = TargetPass

  //   setState({
  //     ...state,
  //     passengers: {
  //       ...state.passengers,
  //       data: CurPasInfo
  //     }
  //   });
  // }

  // const addPassenger = (e) => {
  //   e.preventDefault();

  //   setState({
  //     ...state,
  //     passengers: {
  //       ...state.passengers,
  //       num: state.passengers.num + 1
  //     }
  //   })
  // }

  // const removePassenger = (e) => {
  //   e.preventDefault();
  //   // Get To Remove Passenger ID
  //   const id = state.passengers.num - 1;

  //   // Remove Passenger with ID
  //   const passengers = state.passengers.data;
  //   passengers.splice(id, 1)

  //   setState({
  //     ...state,
  //     passengers: {
  //       data: passengers,
  //       num: state.passengers.num - 1
  //     }
  //   })

  // }

  const TripForm = () => {

    const getCurrentDate = (date) => {

      var dd = String(date.getDate());
      var mm = String(date.getMonth() + 1);
      var yy = date.getFullYear();
  
      return [yy,
        (mm>9 ? '' : '0') + mm,
        (dd>9 ? '' : '0') + dd].join('-');
    }
  
    const getWeekDate = (date) => {
     date.setMonth(date.getMonth()+6)
      var dd = date.getDate() ;
      var mm = date.getMonth() + 1;
      var yy = date.getFullYear();
  
      return [yy,
        (mm>9 ? '' : '0') + mm,
        (dd>9 ? '' : '0') + dd].join('-');
      
    }

    const CustomerInfo = (
      <div>
                <div className="form-inline mt-4">
          <label htmlFor="name" className="ml-sm-4"/>
          <div className="input-group">
            <input required type="text" id="name" value={state.name ? state.name : ''} onChange={handleChange} placeholder="* إسم المسافر (واحد)" className={'form-control ml-sm-4 ' + (error['name'] ? 'is-invalid': '')}/>
          </div>
        </div>

        <div className="form-inline mt-4">
          <label htmlFor="phone_sa" className="ml-sm-4"/>
          <div className="input-group">
            <input onChange={handleChange} type="number" value={state.phone_sa ? state.phone_sa : ''} id="phone_sa" placeholder="رقم الجوال السعودي" className={'form-control num-input ' + (error['phone_sa'] || error['phone'] ? 'is-invalid': '')}/>
            <div className="input-group-append">
              <div className="input-group-text">966+</div>
            </div>
          </div>
          

          <label htmlFor="phone_ye" className="ml-sm-4"/>
          <div className="input-group pt-special">
            <input onChange={handleChange} type="number" value={state.phone_ye ? state.phone_ye : ''} id="phone_ye" placeholder="رقم الجوال اليمني" className={'form-control num-input ' + (error['phone_ye'] || error['phone'] ? 'is-invalid': '')}/>
            <div className="input-group-append">
              <div className="input-group-text">967+</div>
            </div>
          </div>
        </div>

        <div className="form-inline mt-4">
          <label htmlFor="email" className="ml-sm-4"/>
            <div className="input-group">
              <input onChange={handleChange} type="email" value={state.email ? state.email : ''} id="email" placeholder="البريد الإلكتروني" className="form-control"/>
            </div>
        </div>

      </div>
    )

    // const PassengersInfo = (
    //   <div className="form-inline">
    //     {[...Array(parseInt(state.passengers.num))].map((_, index) => (
    //       <div key={index} className="form-inline mt-4">
    //         <div className="container text-right mr-md-4">
    //           <p className="font-weight-bold">* بيانات الراكب {index+1} : </p>
    //         </div>
            
    //         <label htmlFor={`name-${index}`} className="ml-sm-4"/>
    //         <div className="input-group">
    //           <input onChange={handlePassengerChange} id={`name-${index}`} type="text" placeholder={`إسم الراكب ${index+1}`} className={"form-control " + (error[`name-${index}`] ? 'is-invaild' : '')}/>
    //         </div>

    //         <label htmlFor={`age-${index}`} className="ml-sm-4"/>
    //         <div className="input-group pt-special">
    //           <select required onChange={handlePassengerChange} id={`age-${index}`} className={"custom-select font-weight-bold " + (error[`age-${index}`] ? 'is-invalid' : '')}>
    //             <option value="" defaultValue>* الفئه العمرية للراكب {index+1}</option>
    //             <option value="بالغ" className="">بالغ</option>
    //             <option value="طفل" className="">طفل (بين السنتين و 12 سنة)</option>
    //             <option value="رضيع" className="">رضيع (تحت السنتين)</option>
    //           </select>
    //         </div>

    //         <label htmlFor={`gender-${index}`} className="ml-sm-4"/>
    //         <div className="input-group pt-special">
    //           <select onChange={handlePassengerChange} id={`gender-${index}`} className="custom-select font-weight-bold">
    //             <option value="" defaultValue>جنس الراكب {index+1}</option>
    //             <option value="ذكر" className="">ذكر</option>
    //             <option value="أنثى" className="">أنثى</option>
    //           </select>
    //         </div>

    //         <label htmlFor={`documentID-${index}`} className="ml-sm-4"/>
    //         <div className="input-group pt-special">
    //           <input onChange={handlePassengerChange} id={`documentID-${index}`} type="text" placeholder={`رقم هوية الراكب ${index+1}`} className="form-control"/>
    //         </div>

    //       </div>
    //     ))}
    //     <div className="input-group mt-2">
    //       <button onClick={addPassenger} className="btn btn-md btn-outline-dark mr-md-4">إضافة راكب</button>
    //       {
    //         state.passengers.num > 1 ? (
    //             <button onClick={removePassenger} className="btn btn-md btn-outline-danger mr-md-4">حذف راكب</button>
    //         ) : null
    //       }
    //     </div>
    //   </div>  
    // )

    const current_date = new Date();

    const currentDate = getCurrentDate(current_date)
    const weekLater = getWeekDate(current_date);

    const hajj = (
      <div>

        {CustomerInfo}

        <div className="form-inline mt-4">
          <label htmlFor="from" className="ml-sm-4"/>
          <div className="input-group">
            <select required onChange={handleChange} id="from" className={"custom-select " + (error['from'] ? 'is-invalid': '')}>
              <option value="" defaultValue>* مدينة الصعود </option>
              {cities ? (cities.map((city, index) => {
                return(<option value={city} key={index}>{city}</option>)
              })) : null}
            </select>
          </div>

          {/* <label htmlFor="to" className="ml-sm-4"/>
          <div className="input-group pt-special">
            <select required onChange={handleChange} id="to" className={"custom-select " + (error['to'] ? 'is-invalid': '')}>
              <option value="" defaultValue>* مدينة النزوال (السعودية)</option>
              {SAcities ? (SAcities.map((city, index) => {
                return(<option value={city} key={index}>{city}</option>)
              })) : null}
            </select>
          </div>*/}
        </div> 

        <div className="form-inline mt-4">
          <label htmlFor="date" className="ml-sm-4"/>
          <div className="input-group">
            <input required onChange={handleChange} type="text" onFocus={(e) => {e.target.type='date'}} value={state.date ? state.date : ''} id="date" min={currentDate} max={weekLater} placeholder="التاريخ" className={"form-control " + (error['date'] ? 'is-invalid': '')}/>
          </div>

          <label htmlFor="day" className="ml-sm-4"/>
          <div className="input-group pt-special">
            <input readOnly type="text" id="day" value={day || '* اليوم'}  className="form-control"/>
          </div>
        </div>

        <div className="form-inline mt-4">
          
          <label htmlFor="notes" className="ml-sm-4"/>
          <div className="input-group">
            <textarea type="text" onChange={handleChange} value={state.notes ? state.notes : ''} id="notes" cols="66" placeholder="ملاحظات..." className={"form-control " + (error['notes'] ? 'is-invalid': '')}/>
          </div>

        </div>
        {/* <div className="form-inline mt-4">
          <label for="avatar" className="ml-sm-4">أرفاق ملف مضغوط للأوراق المطلوبة:</label>
 
          <div className="input-group">
            <input type="file"
            className="form-control"
                  id="avatar" name="avatar"
                  accept="image/png, image/jpeg"/>
          </div>
         </div>
        {PassengersInfo} */}

        <p className="font-weight-bold text-info mt-2">سيتم طلب الأوراق الازمة كجواز السفر للزائرين كخطوة لاحقة</p>

      
      </div>
    )

    const umrah = (
      <div>
        
        {CustomerInfo}

        <div className="form-inline mt-4">

          <label htmlFor="from" className="ml-sm-4"/>
          <div className="input-group">
            <select required onChange={handleChange} id="from" className={"custom-select " + (error['from'] ? 'is-invalid': '')}>
              <option value="" defaultValue>* مدينة الصعود </option>
              {cities ? (cities.map((city, index) => {
                return(<option value={city} key={index}>{city}</option>)
              })) : null}
            </select>
          </div>

          {/* <label htmlFor="to" className="ml-sm-4"/>
          <div className="input-group pt-special">
            <select required onChange={handleChange} id="to" className={"custom-select " + (error['to'] ? 'is-invalid': '')}>
              <option value="" defaultValue>* مدينة النزوال (اليمن)</option>
              {YEcities ? (YEcities.map((city, index) => {
                return(<option value={city} key={index}>{city}</option>)
              })) : null}
            </select>
          </div> */}
        </div>
        
        <div className="form-inline mt-4">
          <label htmlFor="date" className="ml-sm-4"/>
          <div className="input-group">
            <input required onChange={handleChange} type="text" onFocus={(e) => {e.target.type='date'}} value={state.date ? state.date : ''} id="date" min={currentDate} max={weekLater} placeholder="التاريخ" className={"form-control " + (error['date'] ? 'is-invalid': '')}/>
          </div>

          <label htmlFor="day" className="ml-sm-4"/>
          <div className="input-group pt-special">
            <input readOnly type="text" id="day" value={day || '* اليوم'}  className="form-control"/>
          </div>
        </div>

        <div className="form-inline mt-4">
          
          <label htmlFor="notes" className="ml-sm-4"/>
          <div className="input-group">
            <textarea type="text" onChange={handleChange} value={state.notes ? state.notes : ''} id="notes" cols="66" placeholder="ملاحظات..." className={"form-control " + (error['notes'] ? 'is-invalid': '')}/>
          </div>

        </div>
        {/* <div className="form-inline mt-4">
          <label for="avatar" className="ml-sm-4">أرفاق ملف مضغوط للأوراق المطلوبة:</label>
 
          <div className="input-group">
            <input type="file"
            className="form-control"
                  id="avatar" name="avatar"
                  accept="image/png, image/jpeg"/>
          </div>
         </div>
        {PassengersInfo} */}

        <p className="font-weight-bold text-info mt-2">سيتم طلب الأوراق الازمة كجواز السفر للزائرين كخطوة لاحقة</p>

      </div>
    )

    if (state.type === "hajj"){return hajj}
    if (state.type === "umrah"){return umrah}

  }

  const SubmitAndLeave = (
    <div className="mt-4">
      <div className="input-group justify-content-center mt-4">
        <button type="submit" id="SubmissionBtn" className="btn btn-lg btn-outline-success">إرسال الطلب</button>
      </div>
      <p id="waitingText" className="text-info font-weight-bold d-none">
        يتم معالجة الطلب, الرجاء الإنتظار...
      </p>
    </div>
  )

  const formPage = (
    <div>
      <legend className="display-6 text-primary">حجز تذكرة</legend>

      <div name="SomeDiv" className="row">
        
        <div className="form-group col mt-5">
          <p className="font-weight-lighter font-info text-right text-muted">الحقول المطلوبة مسبوقة بعلامة <strong>*</strong></p>
          <p className="font-weight-lighter font-info text-right text-muted">يجب إضافة رقم هاتف واحد على الأقل</p>

          <div className="form-inline">
            <label htmlFor="type" className="ml-sm-4"/>
            <div className="input-group">
              <select onChange={handleType} value={state.type ? state.type : ''} required id="type" className="custom-select font-weight-bold">
                <option className="font-weight-bold" value="" defaultValue>* نوع الطلب</option>
                <option className="font-weight-bold" value="umrah">تقديم طلب للعمرة</option>
                <option className="font-weight-bold" value="hajj">تقديم طلب للحج</option>
              </select>
            </div>
          </div>
          
          <form name="TripForm" onSubmit={handleSubmit }>
            {state.type && state.type !== 'YEYE' ? (
              <div className="form-group text-right mt-3">
                <span className="font-weight-bold">* إختر شركات النقل (4 كحد أقصى)</span>
                <fieldset className={"companies checkbox-list mr-md-4 mt-2 " + (error['companies'] ? 'border border-danger' : '')}>
                  {Companies ? (Companies.map((company, index) => {
                    return(
                      <div className="form-check" key={index}>
                        <input type="checkbox" id={index} value={company} name="companies[]" onClick={handleChange} className="form-check-input mr-1"/>
                        <label htmlFor={`company${index}`} className="form-check-label mr-4">{company}</label>
                      </div> 
                    )
                  })) : null}
                </fieldset>
              </div>
            ) : state.type && state.type === 'YEYE' ? (
              <div className="form-group text-right mt-3">
                <span className="font-weight-bold">* إختر شركات النقل (4 كحد أقصى)</span>
                <fieldset className={"companies checkbox-list mr-md-4 mt-2 " + (error['companies'] ? 'border border-danger' : '')}>
                  {YECompanies ? (YECompanies.map((company, index) => {
                    return(
                      <div className="form-check" key={index}>
                        <input type="checkbox" id={index} value={company} name="companies[]" onClick={handleChange} className="form-check-input mr-1"/>
                        <label htmlFor={`company${index}`} className="form-check-label mr-4">{company}</label>
                      </div> 
                    )
                  })) : null}
                </fieldset>
              </div>
            ) : null}

            {TripForm()}

            {state.type ? SubmitAndLeave : null}
          </form>
        
        </div>

      </div>
    </div>
  )
  const loadErrors = () => {
    if (Object.keys(error).length !== 0 && error.constructor === Object){
      return (
        <div className="alert alert-info text-right mt-4">
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

  if (complete.completed) {
    return <Redirect to={`/hajj-orders/${complete.order}`}/>
  }

  return (
    <div className="mb-5 pb-5">
      
      <div className="carousel-item active" style={{backgroundImage: `url(${homeImg})`, opacity: 0.82}}>
        <div className="text-info carousel-caption flex-center">
          <h3 className="display-5">طلب حجز رحلة</h3>
        </div>
      </div>

      <div className="container text-center mt-4">
        <span className="display-6">أقسام الطلبات</span>
        <hr/>
        <p className="lead font-weight-bold">
          <Link className="text-primary" to="/"> جميع الرحلات </Link>|
          <Link className="text-primary" to="/orders"> طلباتي </Link>|
          <Link className="text-primary" to="/delivery/order"> طلب إرسال رسالة أو طرد </Link>|
          <Link className="text-primary" to="/transactions/order"> طلب تخليص معاملة </Link>
        </p>
        <p className="lead text-info font-weight-bold mt-4"><i className="fa fa-star-of-life fa-xs"/>الرجاء الإطلاع على <Link to="/policies" className="text-danger">السياسات والشروط</Link> قبل إجراء أي طلب.</p>
      </div>
    
      <div className="container text-center mt-5">
        <div className="card p-3 bg-grey shadow">
          <span className="card-title display-6">طلب حجز تذكرة رحلة</span>
          <hr/>
          <div className="card-body">
						{formPage}
            {/* {state.type ? DocumentInfo : null} */}
            {loadErrors()}
          </div>
        </div>
      </div>
    
    </div>
  )
}
