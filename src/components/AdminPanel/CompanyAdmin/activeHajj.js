import React, { useState } from 'react';
import { Link, Redirect ,useParams} from 'react-router-dom';
import homeImg from '../../../Static/Images/Home/order.jpg';

// Default Preview Image
import preview_img from '../../../Static/Images/Preview/preview.png'

// Finished ... 

export const HajjActiveOrder = () => {
  const {pid} =useParams()

  const [state, setState] = useState({
    companies: [], 
    passengers: {data: [{status:''}], num: 1}, 
    type: null
  }); // Set State to Sent Data To API

  const [error, setError] = useState([{}]); // Set Errors in Forms
  const [age, setAge] = useState([{'years':'','days':'','monthes':''}]);
  const [sick, setSick] = useState([false]);
    const [complete, setComplete] = useState({completed: false, order: null});
  const { tid } = useParams();
  
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
  
  const SAcities = [
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
  const getDate = (date) => {
    
    let mm = date.getMonth() + 1
    let dd = date.getDate();

    return [date.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd].join('-');

  }

//   const handleType = (e) => {
//     // Reset Forms
// 		const Form = document.TripForm;
//     Form && Form.reset();
//     let image_form = document.getElementById('image_preview')
//     if (image_form){
//       image_form.src = preview_img
//     }
//     // Reset State & set Type, and Errors
    
// 		setState({companies: [], passengers: {data: [], num: 1}, type: e.target.value});
//     setError({});
//      console.log(state.tid)   
//   }
const handleChangeOnOff = (e) => {

      let items = [...sick]
      let item = items[e.target.id];
      item = !item;
      items[e.target.id] = item;
      setSick(items)
      
}
  const handleSubmit = (e) => {
    e.preventDefault();
    const mypilgrim = state.passengers.data[0]
    console.log(mypilgrim)

      fetch(`/api/pilgrim/${pid}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({...mypilgrim, hostname: window.location.origin})
      }).then(resp => {
        resp.json().then(data =>{
          if (resp.ok) {
            setComplete({completed: true, pilgrim: pid})
          } else {
      setError({
              Submit: {
                name: 'خطأ',
                error: 'حدث خطأ أثناء معالجة الطلب, الرجاء المحاولة من جديد لاحقاً!'
              }
            })
          }
        })
      })
    

    // Values To Validate Tickets
 
    
    // }
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
    } else if (e.target.name === 'birthDate') {
      e.preventDefault()
      var date = new Date(e.target.value);
      var dateNow = new Date;
      var keys = e.target.id.split('-')
      let namespace = keys[0]
      let id = keys[1]
      let age_ = dateNow - date
      let ageWithOutYears = age_%(1000*60*60*24*365.083333333)
      let years =parseInt(age_/(1000*60*60*24*365.083333333))
      let ageWithOutMonthes = ageWithOutYears%(1000*60*60*24*30.423611111)
      let monthes =parseInt(ageWithOutYears/(1000*60*60*24*30.423611111))
      let ageWithOutDays = ageWithOutMonthes%(1000*60*60*24)
      let days =parseInt(ageWithOutMonthes/(1000*60*60*24))
      let items =  [...age]
      let item = {'years':years,'monthes':monthes,'days':days}
      items[id] = item 
      setAge(items)
      console.log('years ='+years+'monthes = '+monthes+'days = '+days)
      console.log(parseInt(7.99))
    //  console.log('years ='+age.getFullYear()+'monthes = '+monthes+'days = '+days)
      setState({
        ...state,
        [e.target.id]: e.target.value
      })
      // if(age.length>0){
      // setAge([...age,{'years':years,'days':days,'monthes':monthes}])
      // }else{
      //   setAge([{'years':years,'days':days,'monthes':monthes}])
      // }// var value = weekdays[index] && weekdays[index].name;
      
      // setState({...state, [e.target.id]: e.target.value, day: value});

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
    } else if (e.target.id === 'num_tickets' || e.target.id === "num_elders" || e.target.id === "num_kids" || e.target.id === "num_babies") {
      let errors = error;
      delete errors['tickets'];
      setError(errors);

      setState({
        ...state,
        [e.target.id]: e.target.value
      })

    } else if (e.target.id === 'date') {
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

  const handlePassengerChange = (e) => {
    if (e.target.name === 'birthDate') {
      e.preventDefault()
      var date = new Date(e.target.value);
      var dateNow = new Date;
      var keys = e.target.id.split('-')
      let namespace = keys[0]
      let id = keys[1]
      let age_ = dateNow - date
      let ageWithOutYears = age_%(1000*60*60*24*365.083333333)
      let years =parseInt(age_/(1000*60*60*24*365.083333333))
      let ageWithOutMonthes = ageWithOutYears%(1000*60*60*24*30.423611111)
      let monthes =parseInt(ageWithOutYears/(1000*60*60*24*30.423611111))
      let ageWithOutDays = ageWithOutMonthes%(1000*60*60*24)
      let days =parseInt(ageWithOutMonthes/(1000*60*60*24))
      let items =  [...age]
      let item = {'years':years,'monthes':monthes,'days':days}
      items[id] = item 
      setAge(items)
      console.log('years ='+years+'monthes = '+monthes+'days = '+days)
      console.log(parseInt(7.99))
    }
    // Get keys => Namespace & ID
    var keys = e.target.id.split('-')
    let namespace = keys[0]
    let id = keys[1]

    //  Keeping The State & Adding Info
    let CurState = {...state}
    let CurPasInfo = [...CurState.passengers.data]

    let TargetPass = {...CurPasInfo[id], [namespace]: e.target.value}

    CurPasInfo[id] = TargetPass

    setState({
      ...state,
      passengers: {
        ...state.passengers,
        data: CurPasInfo
      }
      
    });
    console.log(state)
  
  }
  const addPassenger = (e) => {
    e.preventDefault();
    setSick([...sick,false])
    setAge([...age,{'years':'','moonthes':'','days':''}])
    setState({
      ...state,
      passengers: {
        ...state.passengers,
        data:[...state.passengers.data,{status:''}],
        num: state.passengers.num + 1
      }
    })
  }

  const removePassenger = (e) => {
    e.preventDefault();
    // Get To Remove Passenger ID
    const id = state.passengers.num - 1;
    const ages = age
    ages.splice(id,1)
    setAge(ages)
    // Remove Passenger with ID
    const passengers = state.passengers.data;
    passengers.splice(id, 1)
    sick.splice(id,1)
    setState({
      ...state,
      passengers: {
        data: passengers,
        num: state.passengers.num - 1
      }
    })

  }

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
  
      var dd = date.getDate() + 7;
      var mm = date.getMonth() + 1;
      var yy = date.getFullYear();
  
      return [yy,
        (mm>9 ? '' : '0') + mm,
        (dd>9 ? '' : '0') + dd].join('-');
      
    }

    const CustomerInfo = (
      <div>
        



      </div>
    )
    const passportInfo =(index) => (
        <div className="pt-5">
          
  <h4>بيانات جواز المسافر والمرافقين</h4>
  <div className="form-inline pt-3">
      
          
          
          <div className="input-group pt-special">
          <label htmlFor={`passportNUM-${index}`} className="ml-sm-4"/>
              <input onChange={handlePassengerChange} id={`passportID-${index}`} type="text" placeholder={`رقم جواز السفر للمرافق ${index+1}`} className="form-control"/>
            </div>
            {state.passengers.data[index]['status']=='مرافق'?
            <div className="input-group pt-special">
            <label htmlFor={`passportStatus-${index}`} className="ml-sm-4"/>

              <input onChange={handlePassengerChange} id={`kinship-${index}`} type="text" placeholder={`صلة القرابة${index+1}`} className="form-control"/>
            </div>
  :''}
            <div className="input-group pt-special">  
            <label  class="switch">
  <input onChange={handleChangeOnOff} id={index}  type="checkbox"/>
  <span class="slider  round"></span>

</label>
{sick[index]?'مريض':'معافى'}
</div>  
  <div className="input-group pt-special">
  <label htmlFor={`documentID-${index}`} className="ml-sm-4"/>
        {sick[index]?< textarea cols="66" onChange={handlePassengerChange} id={`sick${index}`} type="text" placeholder={`نوع المرض زوى أحتيجات ${index+1}`} className="form-control sick"></ textarea>
  :''}</div>
  

<br/></div>
<div className="form-inline">
      
          <div className="input-group">
          <label htmlFor="dateFrom" className="ml-sm-4">تاريخ الأصدار :</label>
            <input required onChange={handlePassengerChange} type="text" onFocus={(e) => {e.target.type='date'}} id={`issue_date-${index}`}  placeholder="تاريخ الأصدار" className={"form-control " }/>
                      </div>
                      
          <div className="input-group">
          <label htmlFor="dateTo" className="ml-sm-4">تاريخ الأنتهاء :</label>
            <input required onChange={handlePassengerChange} type="text" onFocus={(e) => {e.target.type='date'}}  id={`expire_date-${index}`}  placeholder="تاريخ الأصدار" className={"form-control " }/>
                      </div>
                      <div className="input-group pt-special">
            <label htmlFor={`statusPassport-${index}`} className="ml-sm-4"/>
              <select onChange={handlePassengerChange} id={`passport_status-${index}`} className="custom-select font-weight-bold">
                <option value="" defaultValue>حالة الجواز {index+1}</option>
                <option value="ok" className="">صالح</option>
                <option value="expired" className="">غير صالج</option>
              </select>
            </div>
                      </div>

        </div>
        
      )
      const birthInfo  =(index) => (
        <div className="pt-5">
         
          <h4>بيانات تاريخ ومحل المبلاد</h4>
          
                    <div className="input-group pt-3">
          <label htmlFor="birthDate" className="ml-sm-4">تاريخ الميلاد :</label>
            <input required onChange={handlePassengerChange} type="text" onFocus={(e) => {e.target.type='date'}}  id={`birthDate-${index}`} name='birthDate' placeholder="تاريخ الميلاد" className={"form-control" }/>
                      </div>
                      
          <div className="input-group pt-special">
          <label htmlFor="age" className="ml-sm-4"/>
            <input readOnly type="text" id={`age-${index}`} value={((age[index].years>0?age[index].years+'-سنة  ':'')+(age[index].monthes>0?age[index].monthes+'-شهر  ':'')+(age[index].days>0?age[index].days+'-يوم ':''))|| 'العمر'}  className="form-control"/>
          </div>
       
                      <div className="form-inline ">
          <div className="input-group">
            <label htmlFor={`village-${index}`} className="ml-sm-4"/>
              <input onChange={handlePassengerChange} id={`village-${index}`} type="text" placeholder={`الحى-القرية-العزلة ${index+1}`} className={"form-control " + (error[`name-${index}`] ? 'is-invaild' : '')}/>
            </div>
            <div className="input-group">
            <label htmlFor={`post-${index}`} className="ml-sm-4"/>
              <input onChange={handlePassengerChange} id={`post-${index}`} type="text" placeholder={`المديرية ${index+1}`} className={"form-control " + (error[`name-${index}`] ? 'is-invaild' : '')}/>
            </div>
            <div className="input-group">
            <label htmlFor={`city-${index}`} className="ml-sm-4"/>
              <input onChange={handlePassengerChange} id={`city-${index}`} type="text" placeholder={`المحافظة ${index+1}`} className={"form-control " + (error[`name-${index}`] ? 'is-invaild' : '')}/>
            </div>

            <div className="input-group pt-special">
            <label htmlFor={`gender-${index}`} className="ml-sm-4"/>
              <select onChange={handlePassengerChange} id={`gender-${index}`} className="custom-select font-weight-bold">
                <option value="" defaultValue>جنس الراكب {index+1}</option>
                <option value="ذكر" className="">ذكر</option>
                <option value="أنثى" className="">أنثى</option>
              </select>
            </div>
            </div>
        </div>
      )
    const PassengersInfo = (
      <div>      <div className="form-inline">
          
        {[...Array(parseInt(state.passengers.num))].map((_, index) => (
         
         <div key={index} className=" mt-4">
            <div className="container text-right mr-md-4">
              <p className="font-weight-bold text-center">* بيانات المسافر {index+1} : </p>
            </div>
            <div className="form-inline">
            
            <div className="input-group">
            <label htmlFor={`name-${index}`} className="ml-sm-4"/>
              <input onChange={handlePassengerChange} id={`name-${index}`} type="text" placeholder={`إسم الراكب ${index+1}`} className={"form-control " + (error[`name-${index}`] ? 'is-invaild' : '')}/>
            </div>

            
            <div className="input-group pt-special">
            <label htmlFor={`ageR-${index}`} className="ml-sm-4"/>
              <select required onChange={handlePassengerChange} id={`ageR-${index}`} className={"custom-select font-weight-bold " + (error[`ageR-${index}`] ? 'is-invalid' : '')}>
                <option value="" defaultValue>* الفئه العمرية للراكب {index+1}</option>
                <option value="بالغ" className="">بالغ</option>
                <option value="طفل" className="">طفل (بين السنتين و 12 سنة)</option>
                <option value="رضيع" className="">رضيع (تحت السنتين)</option>
              </select>
            </div>

            <div className="input-group pt-special">
            <label htmlFor={`status-${index}`} className="ml-sm-4"/>
              <select onChange={handlePassengerChange} id={`status-${index}`} className="custom-select font-weight-bold">
                <option value="" defaultValue>حالة المسافر {index+1}</option>
                <option value="مسافر" className="">مسافر</option>
                <option value="مرافق" className="">مرافق</option>
                <option value="محارم" className="">محارم</option>
              </select>
            </div>


            
</div>

                {passportInfo(index)}
                {birthInfo(index)}

                <div className="form-inline mt-4">
          
          <label htmlFor="notes" className="ml-sm-4"/>
          <div className="input-group">
            <textarea type="text" onChange={handlePassengerChange}  id={`notes-${index}`} cols="66" placeholder="ملاحظات..." className={"form-control " + (error['notes'] ? 'is-invalid': '')}/>
          </div>

        </div>

          </div>
        ))}
        <div className="input-group mt-2">
        {!pid?  <button onClick={addPassenger} className="btn btn-md btn-outline-dark mr-md-4">إضافة راكب</button>
          :''}{
            state.passengers.num > 1 ? (
                <button onClick={removePassenger} className="btn btn-md btn-outline-danger mr-md-4">حذف راكب</button>
            ) : null
          }
        </div></div>

        <div className="text-center">
        <button name="" id="" onClick={handleSubmit} className="mt-2 btn btn-primary" href="#" role="button">تحديث البيانات</button>
        </div>
      </div>  
    )

    const current_date = new Date();

    const currentDate = getCurrentDate(current_date)
    const weekLater = getWeekDate(current_date);

    const hajj = (
      <div>

        {CustomerInfo}


        {PassengersInfo}

        <p className="font-weight-bold text-info mt-2"> سيتم طلب إثبات الهوية عند الصعود إلى الباص, الرجاء إحضار وثيقة الإثبات (بطاقة الهوية/جواز السفر/أو غيرها)</p>

      
      </div>
    )
    return hajj


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


          
          <form name="TripForm" onSubmit={handleSubmit}>
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

  // if (complete.completed) {
  //   return <Redirect to={`/orders/${complete.order}`}/>
  // }

  return (
    <div className="mb-5 pb-5">



    
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
