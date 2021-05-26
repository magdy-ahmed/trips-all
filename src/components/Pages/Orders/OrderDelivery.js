import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import homeImg from '../../../Static/Images/Home/order.jpg';

// Default Preview Image
import preview_img from '../../../Static/Images/Preview/preview.png'

// Finished....

export const OrderDelivery = () => {
  const [state, setState] = useState({companies: [], type: null}); // Set State to Send Data TO API
  const [error, setError] = useState({}); // Set Errors in Forms
  const [pType, setPType] = useState(); // Set Type of Package
  const [complete, setComplete] = useState({completed: false, order: null});


  const [senderDoc, setSenBtn] = useState('btn');
  const [receiverDoc, setRecBtn] = useState('btn');
  
  const SAcities = [
    'جدة',
    'مكة',
    'الرياض',
    'الدمام',
    'الطوال',
    'جيزان',
    'شرورة',
    'وادي الدواسر'
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
    "راحة سفر",
    "العربي",
    "العربية",
    "الأولى",
    "المسافر العربي",
    "الإمبرطور",
    "آسيا"
  ]


  const handleType = (e) => {
    e.preventDefault();
    // Reset Forms
		const Form = document.TripForm;
		Form && Form.reset();
    // Set Type, Reset State, and Errors
    setError({});
    setState({companies: [], type: e.target.value});    
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const Order = async() => {
			await fetch('/api/delivery/order', {
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

    if ((!state['sender_phone_sa'] && !state['sender_phone_ye'])) {
      setError({
        ...error,
        sender_phone: {
          name: 'أرقام الهاتف',
          error: 'يجب أن تقوم بإضافة رقم هاتف واحد على الأقل'
        }
      });
    } else if ((state['sender_phone_sa'] && state['sender_phone_sa'].length < 10) || (state['sender_phone_ye'] && state['sender_phone_ye'].length < 9)) {
      setError({
        ...error,
        sender_phone: {
          name: 'أرقام الهاتف',
          error: 'يجب أن يكون طول رقم الهاتف السعودي 10 والهاتف اليمني 9'
        }
      });
    } else if((!state['receiver_phone_sa'] && !state['receiver_phone_ye'])) {
      setError({
        ...error,
        receiver_phone: {
          name: 'أرقام الهاتف',
          error: 'يجب أن تقوم بإضافة رقم هاتف واحد على الأقل'
        }
      });
    } else if((state['receiver_phone_sa'] && state['receiver_phone_sa'].length < 10) || (state['receiver_phone_ye'] && state['receiver_phone_ye'].length < 9)) {
      setError({
        ...error,
        receiver_phone: {
          name: 'أرقام الهاتف',
          error: 'يجب أن يكون طول رقم الهاتف السعودي 10 والهاتف اليمني 9'
        }
      });
    } else if (!state['companies'] || (state['companies'] && state['companies'].length === 0)){
      setError({
        ...error,
        companies: {
          name: 'شركات النقل',
          error: 'الرجاء تحديد شركة نقل واحدة على الأقل'
        }
      })

    } else {
      // Deleting Errors Regarding Phone Number
      let errors = error
      delete errors['phone']
      setError(errors)

      // Sending Order To Backend, Disabling the submission button in case of delay
      document.getElementById("SubmissionBtn").disabled = true;
      document.getElementById('waitingText').classList.remove('d-none')
      Order();
    }
  }

  const handleChange = (e) => {
    // Not Preventing Default when Using Checkbox
    if (e.target.name !== 'companies[]') {
      e.preventDefault();
    }
    
    if (e.target.id === 'sender_phone_sa' || e.target.id === 'receiver_phone_sa' || e.target.id === 'sender_phone_ye' || e.target.id === 'receiver_phone_ye') {
      // Remove No-existing Phone Number Error
      if (e.target.id === 'sender_phone_sa' || e.target.id === 'sender_phone_ye'){
        var sender_errors = error;
        delete sender_errors['sender_phone']
        setError(sender_errors)
      } else {
        var reciever_errors = error;
        delete reciever_errors['receiver_phone']
        setError(reciever_errors)
      }
      
      // Validate Phone Number
      let phone = e.target.value
      const re = /\D/g;
      phone = phone.replace(re, '');
      // Validate SaudiArabia & Yemen Phone Number
      if (e.target.id === 'sender_phone_sa' || e.target.id === 'receiver_phone_sa') {
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
            // // Set Phone Number
            // setState({
            //   ...state,
            //   [e.target.id]: e.target.value
            // })
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
            // // Set Phone Number
            // setState({
            //   ...state,
            //   [e.target.id]: e.target.value
            // })
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
        ...state,
        [e.target.id]: e.target.value
      })
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
        // Delete Companies errors
        let errors = error
        delete errors['companies']
        setError(errors)
      }
      // If User is unChecking a box
      else {
        var companies = state.companies;
        const index = companies.indexOf(e.target.value);
        if (index > -1) {
          companies.splice(index, 1)
        }
        setState({...state, companies: companies})
      }
    } else if (e.target.id === 'package_type') {
      setPType(e.target.value);
      setState({
        ...state,
        [e.target.id]: e.target.value
      });
    } else {
      setState({
        ...state,
        [e.target.id]: e.target.value
      })
    }
  }

  // const handleCompanies = (e) => {
  //   let id = e.target.id;
  //   // If User is checking a box
  //   if (document.getElementById(id).checked) {
  //     var limit = 4
  //     if (companies.length < limit) {
  //       setCompany([...companies, e.target.value]);
  //     } else {
  //       document.getElementById(e.target.id).checked = false;
  //     }
  //   }
  //   // If User is unChecking a box 
  //   else {
  //     var companies_list = companies;
  //     const index = companies_list.indexOf(e.target.value)
  //     if (index > -1) {
  //       companies_list.splice(index, 1)
  //     }
  //     setCompany(companies_list);
  //   }
    
  //   // Adding Companies To State
  //   setState({...state, companies: companies});
  // }

  const PackageForm = () => {
    
    const package_ = (
      <div className="form-inline mt-4">
        <label htmlFor="content" className="ml-sm-4"/>
        <div className="input-group">
          <textarea required type="text" value={state.content ? state.content : ''} onChange={handleChange} id="content" cols="66" placeholder="* محتوى الطرد" className={"form-control " + (error['content'] ? 'is-invalid': '')}/>
        </div>
        <hr/>
      </div>
    )

    const letter = (
      <div className="form-inline mt-4">
        <label htmlFor="content" className="ml-sm-4"/>
        <div className="input-group">
          <textarea required type="text" value={state.content ? state.content : ''} onChange={handleChange} id="content" cols="66" placeholder="* محتوى الرسالة" className={"form-control " + (error['content'] ? 'is-invalid': '')}/>
        </div>
        <hr/>
      </div>
    )

    const merchant = (
      <div className="form-inline mt-4">
        <label htmlFor="content" className="ml-sm-4"/>
        <div className="input-group">
          <textarea required type="text" value={state.content ? state.content : ''} onChange={handleChange} id="content" cols="66" placeholder="* محتوى البضائع التجارية" className={"form-control " + (error['content'] ? 'is-invalid': '')}/>
        </div>
        <hr/>
      </div>
    )

    if (pType === 'package'){return package_}
    if (pType === 'letter'){return letter}
    if (pType === 'merchant'){return merchant}

  }

  const TripForm = () => {

    const SenderInfo = (
      <div className="mt-4">

        <div className="form-group text-right mt-4">  
          <span className="font-weight-bold">* إختر شركات النقل (4 كحد أقصى)</span>
          <div className={"companies checkbox-list mr-md-4 mt-2 " + (error['companies'] ? 'border border-danger' : '')}>
            {Companies ? (Companies.map((company, index) => {
              return(
                <div className="form-check" key={index}>
                  <input onClick={handleChange} type="checkbox" name="companies[]" id={`company${index}`} value={company} className="form-check-input mr-1"/>
                  <label htmlFor={`company${index}`} className="form-check-label mr-4">{company}</label>
                </div>
              )
            })) : null}
          </div>
        </div>

        <p className="font-weight-light text-right mr-md-4">بيانات المرسل : </p>
        
        <div className="form-inline mt-2">
          <label htmlFor="sender_name" className="ml-sm-4"/>
          <div className="input-group">
            <input required onChange={handleChange} type="text" value={state.sender_name ? state.sender_name : ''} id="sender_name" placeholder="* إسم المرسل" className={'form-control ml-sm-4 ' + (error['sender_name'] ? 'is-invalid': '')}/>
          </div>
        </div>

        <div className="form-inline mt-4">
          <label htmlFor="sender_phone_sa" className="ml-sm-4"/>
          <div className="input-group">
            <input onChange={handleChange} type="number" value={state.sender_phone_sa ? state.sender_phone_sa : ''} id="sender_phone_sa" placeholder="رقم الجوال السعودي" className={'form-control num-input ' + (error['sender_phone'] ? 'is-invalid': '')}/>
            <div className="input-group-append">
              <div className="input-group-text">966+</div>
            </div>
          </div>
          

          <label htmlFor="sender_phone_ye" className="ml-sm-4 "/>
          <div className="input-group pt-special">
            <input onChange={handleChange} type="number" value={state.sender_phone_ye ? state.sender_phone_ye : ''} id="sender_phone_ye" placeholder="رقم الجوال اليمني" className={'form-control num-input ' + (error['sender_phone'] ? 'is-invalid': '')}/>
            <div className="input-group-append">
              <div className="input-group-text">967+</div>
            </div>
          </div>
        </div>

        <div className="form-inline mt-4">
          <label htmlFor="email" className="ml-sm-4"/>
            <div className="input-group">
              <input onChange={handleChange} type="email" value={state.email ? state.email : ''} id="email" placeholder="البريد الإلكتروني للمرسل" className="form-control"/>
            </div>
        </div>

        <div className="form-inline mt-4">
          <label htmlFor="sender_address" className="ml-sm-4"/>
          <div className="input-group">
            <input required onChange={handleChange} type="text" value={state.sender_address ? state.sender_address : ''} id="sender_address" placeholder="* عنوان المرسل" className={"form-control " + (error['sender_address'] ? 'is-invalid' : '')}/>
          </div>

          <label htmlFor="sender_address_2" className="ml-sm-4"/>
          <div className="input-group pt-special">
            <input onChange={handleChange} type="text" value={state.sender_address_2 ? state.sender_address_2 : ''} id="sender_address_2"  placeholder="عنوان المرسل 2" className="form-control"/>
          </div>
        </div>

      </div>
    )

    const ReceiverInfo = (
      <div className="mt-4">
        <p className="font-weight-light text-right mr-md-4">بيانات المرسل إليه : </p>
        
        <div className="form-inline mt-2">
          <label htmlFor="receiver_name" className="ml-sm-4"/>
          <div className="input-group">
            <input required onChange={handleChange} type="text" value={state.receiver_name ? state.receiver_name : ''} id="receiver_name" placeholder="* إسم المرسل إليه" className={'form-control ml-sm-4 ' + (error['receiver_name'] ? 'is-invalid': '')}/>
          </div>
        </div>

        <div className="form-inline mt-4">
          <label htmlFor="receiver_phone_sa" className="ml-sm-4"/>
          <div className="input-group">
            <input onChange={handleChange} type="number" value={state.receiver_phone_sa ? state.receiver_phone_sa : ''} id="receiver_phone_sa" placeholder="رقم الجوال السعودي" className={'form-control num-input ' + (error['receiver_phone'] ? 'is-invalid': '')}/>
            <div className="input-group-append">
              <div className="input-group-text">966+</div>
            </div>
          </div>
          

          <label htmlFor="receiver_phone_ye" className="ml-sm-4"/>
          <div className="input-group pt-special">
            <input onChange={handleChange} type="number" value={state.receiver_phone_ye ? state.receiver_phone_ye : ''} id="receiver_phone_ye" placeholder="رقم الجوال اليمني" className={'form-control num-input ' + (error['receiver_phone'] ? 'is-invalid': '')}/>
            <div className="input-group-append">
              <div className="input-group-text">967+</div>
            </div>
          </div>
        </div>

        <div className="form-inline mt-4">
          <label htmlFor="receiver_address" className="ml-sm-4"/>
          <div className="input-group">
            <input required onChange={handleChange} type="text" value={state.receiver_address ? state.receiver_address : ''} id="receiver_address" placeholder="* عنوان المرسل إليه" className={"form-control " + (error['receiver_address'] ? 'is-invalid' : '')}/>
          </div>

          <label htmlFor="receiver_address_2" className="ml-sm-4"/>
          <div className="input-group pt-special">
            <input onChange={handleChange} type="text" value={state.receiver_address_2 ? state.receiver_address_2 : ''} id="receiver_address_2" placeholder="عنوان المرسل إليه 2" className="form-control"/>
          </div>
        </div>
      
      </div>
    )

    const YESA = (
      <div>
        {SenderInfo}
        <hr/>
        {ReceiverInfo}
        <hr/>
        
        <div className="form-inline mt-4">
          <label htmlFor="package_type" className="ml-sm-4"/>
          <div className="input-group pt-special">
            <select required onChange={handleChange} id="package_type" className="custom-select font-weight-bold">
              <option className="font-weight-bold" value="" defaultValue>* نوع الطلب</option>
              <option value="package">طرد</option>
              <option value="letter">رسالة</option>
              <option value="merchant">بضائع تجارية</option>
            </select>
          </div>
        
          <label htmlFor="package_weight" className="ml-sm-4"/>
          <div className="input-group pt-special">
            <input required onChange={handleChange} type="text" id="package_weight" placeholder="* الوزن بالكيلو (KG)" className="form-control"/>
          </div>

        </div>
        {PackageForm()}

        <div className="form-inline mt-4">
          <label htmlFor="from" className="ml-sm-4"/>
          <div className="input-group">
            <select required onChange={handleChange} id="from" className={"custom-select " + (error['from'] ? 'is-invalid': '')}>
              <option value="" defaultValue>* مدينة المرسل (اليمن)</option>
              {YEcities ? (YEcities.map((city, index) => {
                return(<option value={city} key={index}>{city}</option>)
              })) : null}
            </select>
          </div>

          <label htmlFor="to" className="ml-sm-4"/>
          <div className="input-group pt-special">
            <select required onChange={handleChange} id="to" className={"custom-select " + (error['to'] ? 'is-invalid': '')}>
              <option value="" defaultValue>* مدينة المرسل إليه (السعودية)</option>
              {SAcities ? (SAcities.map((city, index) => {
                return(<option value={city} key={index}>{city}</option>)
              })) : null}
            </select>
          </div>
        </div>

        <div className="form-inline mt-4">
          
          <label htmlFor="notes" className="ml-sm-4"/>
          <div className="input-group">
            <textarea type="text" onChange={handleChange} value={state.notes ? state.notes : ''} id="notes" cols="66" placeholder="ملاحظات..." className={"form-control " + (error['notes'] ? 'is-invalid': '')}/>
          </div>

        </div>
      </div>
    )

    const SAYE = (
      <div>
        {SenderInfo}
        <hr/>
        {ReceiverInfo}  
        <hr/>

        <div className="form-inline mt-4">
          <label htmlFor="package_type" className="ml-sm-4"/>
          <div className="input-group pt-special">
            <select required onChange={handleChange} id="package_type" className="custom-select font-weight-bold">
              <option className="font-weight-bold" value="" defaultValue>* نوع الطلب</option>
              <option value="package">طرد</option>
              <option value="letter">رسالة</option>
              <option value="merchant">بضائع تجارية</option>
            </select>
          </div>

          <label htmlFor="package_weight" className="ml-sm-4"/>
          <div className="input-group pt-special">
            <input required onChange={handleChange} type="text" id="package_weight" placeholder="* الوزن بالكيلو (KG)" className="form-control"/>
          </div>

        </div>
        {PackageForm()}
        
        <div className="form-inline mt-4">
          <label htmlFor="from" className="ml-sm-4"/>
          <div className="input-group">
            <select required onChange={handleChange} id="from" className={"custom-select " + (error['from'] ? 'is-invalid': '')}>
              <option value="" defaultValue>* مدينة المرسل (السعودية)</option>
              {SAcities ? (SAcities.map((city, index) => {
                return(<option value={city} key={index}>{city}</option>)
              })) : null}
            </select>
          </div>

          <label htmlFor="to" className="ml-sm-4 "/>
          <div className="input-group pt-special">
            <select required onChange={handleChange} id="to" className={"custom-select " + (error['to'] ? 'is-invalid': '')}>
              <option value="" defaultValue>* مدينة المرسل إليه (اليمن)</option>
              {YEcities ? (YEcities.map((city, index) => {
                return(<option value={city} key={index}>{city}</option>)
              })) : null}
            </select>
          </div>
        </div>

        <div className="form-inline mt-4">
          <label htmlFor="notes" className="ml-sm-4"/>
          <div className="input-group">
            <textarea type="text" onChange={handleChange} value={state.notes ? state.notes : ''} id="notes" cols="66" placeholder="ملاحظات..." className={"form-control " + (error['notes'] ? 'is-invalid': '')}/>
          </div>
        </div>

      </div>
      
    )

    const YEYE = (
      <div>
        {SenderInfo}
        <hr/>
        {ReceiverInfo}
        <hr/>

        <div className="form-inline mt-4">
          <label htmlFor="package_type" className="ml-sm-4"/>
          <div className="input-group pt-special">
            <select required onChange={handleChange} id="package_type" className="custom-select font-weight-bold">
              <option className="font-weight-bold" value="" defaultValue>* نوع الطلب</option>
              <option value="package">طرد</option>
              <option value="letter">رسالة</option>
              <option value="merchant">بضائع تجارية</option>
            </select>
          </div>

          <label htmlFor="package_weight" className="ml-sm-4"/>
          <div className="input-group pt-special">
            <input required onChange={handleChange} type="text" id="package_weight" placeholder="* الوزن بالكيلو (KG)" className="form-control"/>
          </div>
          
        </div>
        {PackageForm()}
        
        <div className="form-inline mt-4">
          <label htmlFor="from" className="ml-sm-4"/>
          <div className="input-group">
            <select required onChange={handleChange} id="from" className={"custom-select " + (error['from'] ? 'is-invalid': '')}>
              <option value="" defaultValue>*  مدينة المرسل (اليمن)</option>
              {YEcities ? (YEcities.map((city, index) => {
                return(<option value={city} key={index}>{city}</option>)
              })) : null}
            </select>
          </div>

          <label htmlFor="to" className="ml-sm-4 "/>
          <div className="input-group pt-special">
            <select required onChange={handleChange} id="to" className={"custom-select " + (error['to'] ? 'is-invalid': '')}>
              <option value="" defaultValue>* مدينة المرسل إليه (اليمن)</option>
              {YEcities ? (YEcities.map((city, index) => {
                return(<option value={city} key={index}>{city}</option>)
              })) : null}
            </select>
          </div>
        </div>
        
        <div className="form-inline mt-4">
          <label htmlFor="notes" className="ml-sm-4"/>
          <div className="input-group">
            <textarea type="text" onChange={handleChange} value={state.notes ? state.notes : ''} id="notes" cols="66" placeholder="ملاحظات..." className={"form-control " + (error['notes'] ? 'is-invalid': '')}/>
          </div>
        </div>

      </div>
    )

    if (state.type === "YESA"){return YESA}
    if (state.type === "SAYE"){return SAYE}
    if (state.type === "YEYE"){return YEYE}
  }

  const SubmitAndLeave = (
		<div className="mt-4">
			<div className="input-group justify-content-center">
				<button type="submit" id="SubmissionBtn" className="btn btn-lg btn-outline-success">أرسل الطلب</button>
			</div>
			<p id="waitingText" className="text-info font-weight-bold d-none">
				يتم معالجة الطلب, الرجاء الإنتظار...
			</p>
		</div>
	)

  const formPage = (
    <div>
      <legend className="display-6 text-primary">إرسال رسالة أو طرد</legend>

      <div className="row">
        
        <div className="form-group col mt-5">
          <p className="font-weight-lighter font-info text-right text-muted">الحقول المطلوبة مسبوقة بعلامة <strong>*</strong></p>
          <p className="font-weight-lighter font-info text-right text-muted">يجب إضافة رقم هاتف واحد على الأقل لكل من المرسل و المرسل إليه</p>

          <div className="form-inline">
            
            <label htmlFor="type" className="ml-sm-4"/>
            <div className="input-group"> 
              <select onChange={handleType} value={state.type ? state.type : ''} required id="type" className="custom-select font-weight-bold">
                <option className="font-weight-bold" value="" defaultValue>* إتجاه الرحلة</option>
                <option className="font-weight-bold" value="SAYE">من السعودية إلى اليمن</option>
                <option className="font-weight-bold" value="YESA">من اليمن إلى السعودية</option>
                <option className="font-weight-bold" value="YEYE">بين المدن اليمنية</option>
              </select>
            </div>

          </div>

          <form onSubmit={handleSubmit} name="TripForm">

            {state.type ? (TripForm()) : null}
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
    return <Redirect to={`/orders/${complete.order}`}/>
  }

  return (
    <div className="mb-5 pb-5">
      
      <div className="carousel-item active" style={{backgroundImage: `url(${homeImg})`, opacity: 0.82}}>
        <div className="text-info carousel-caption flex-center">
          <h3 className="display-5">طلب إرسال رسالة أو طرد</h3>
        </div>
      </div>

      <div className="container text-center mt-4">
        <span className="display-6">أقسام الطلبات</span>
        <hr/>
        <p className="lead font-weight-bold">
          <Link className="text-primary" to="/"> جميع الرحلات </Link>|
          <Link className="text-primary" to="/orders"> طلباتي </Link>|
          <Link className="text-primary" to="/trips/order"> طلب حجز تذكرة </Link>| 
          <Link className="text-primary" to="/transactions/order"> طلب تخليص معاملة </Link>
        </p>
        <p className="lead text-info font-weight-bold mt-4"><i className="fa fa-star-of-life fa-xs"/>الرجاء الإطلاع على <Link to="/policies" className="text-danger">السياسات والشروط</Link> قبل إجراء أي طلب.</p>
      </div>
    
      <div className="container text-center mt-5">
        <div className="card p-3 bg-grey shadow">
          <span className="card-title display-6">طلب إرسال رسالة أو طرد</span>
          <hr/>
          <div className="card-body">
						{formPage}
            {loadErrors()}
          </div>
        </div>
      </div>
  
    </div>
  )
}


/*
  Required Inputs (From Users) :
  Package Type                    -----> (package_type)
  Companies                       -----> (companies)
  
  Sender Name                     -----> (sender_name)
  Sender Phone Number (SA-YE)     -----> (sender_phone_saو sender_phone_ye)
  Sender Address 1                -----> (sender_address)
  
  Receiver Name                   -----> (receiver_name)
  Receiver Phone Number (SA-YE)   -----> (receiver_phone_sa, receiver_phone_ye)
  Receiver Address 1              -----> (receiver_address)
  
  Content                         -----> (content)
  From                            -----> (from)
  To                              -----> (to)
*/

/*
  Un-Required Inputs (From Users) : 
  Sender ID & ID Image            -----> (sender_document_id, sender_document_image)
  Receiver ID & ID Image          -----> (receiver_document_id, receiver_document_image)
  Sender Address 2                -----> (sender_address_2)
  Receiver Address 2              -----> (receiver_address_2)
  Notes                           -----> (notes)
  Day of Transferring             -----> (NA)
  Date of Transferring            -----> (NA)
  Day of Arrival                  -----> (NA)
  Date of Arrival                 -----> (NA)
  Package-Letter Status           -----> (NA)
*/


  // const handleSenDocSelect = (e) => {
  //   let fileToUpload = e.target.files
  //   if (e.target.value){
  //     setState({
  //       ...state,
  //       sender_document_img: e.target.value
  //     })
  //     // Clear Related Errors
  //     let errors = error
  //     delete errors["AWSS3"]
  //     setError(errors)
  //     document.getElementById('senderDoc_preview').src = URL.createObjectURL(fileToUpload[0])
  //   }
    
  // }

  // const handleSenDocUpload = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target)

  //   const UploadImage = async() => {
  //     await fetch('/api/image/upload', {
  //       method: 'POST',
  //       body: formData
  //     }).then(resp => {
  //       resp.json().then(data => {
  //         if (resp.ok){
  //           setSenBtn('compl')
  //           setState({
  //             ...state,
  //             sender_document_img: data.key,
  //           });
  //         } else {
  //           setError({
  //             AWSS3: {
  //               name: 'خطأ',
  //               error: 'حدث خطأ أثناء رفع الصورة, الرجاء المحاولة من جديد.',
  //               type: 'warning'
  //             }
  //           });
  //           setSenBtn('btn')
  //         }
  //       })
  //     })
  //   }

  //   // Clear Related Errors
  //   let errors = error
  //   delete errors["AWSS3"]
  //   setError(errors)

  //   setSenBtn('progBar')
  //   UploadImage();
    
  // }

  // const sender_document = () => (
  //   <form form="senderDocForm" onSubmit={handleSenDocUpload} className="mt-4">
	// 		<hr/>
  //     <p className="font-weight-bold text-right mr-md-4 mt-4">* حقول إختيارية : </p>
  //     <p className="font-weight-bold text-right mr-md-4 mt-5"> صورة (جواز/هوية) المرسل : </p>
			
	// 		<div className="form-inline mt-4">
	// 			<label htmlFor="sender_document_id" className="ml-sm-4"/>
	// 			<div className="input-group">
	// 				<input onChange={handleChange} type="text" value={state.sender_document_id ? state.sender_document_id : ''} id="sender_document_id" placeholder="رقم وثيقة المرسل" className={'form-control ml-sm-4 ' + (error['sender_document_id'] ? 'is-invalid': '')}/>
	// 			</div>
	// 		</div>

	// 		<div className="form-inline mt-4">
  //       <label htmlFor="image" className="ml-sm-4 "/>
  //       <div className="input-group pt-special">
  //         <input onChange={handleSenDocSelect} type="file" name="image" id="image" className={"file-custom " + (error['document_img'] ? 'is-invalid': '')} placeholder="إختر صورة الجواز" accept="image/*"/>
  //       </div>
  //       {senderDoc === 'btn' ? (
  //         <input disabled={receiverDoc === 'progBar' ? true : false} type="submit" value="رفع الصورة" className="btn btn-md btn-primary"/>
  //       ) : senderDoc === 'progBar' ? (
  //         <div className="spinner-border text-info" role="status">
  //           <span className="sr-only">قيد الرفع...</span>
  //         </div>
  //       ) : (
  //         <span className="font-weight-bold text-success">تم رفع الصورة بنجاح.</span>
  //       )}
  //     </div>

	// 		<div className="container text-right mt-4">
  //       <img id="senderDoc_preview" src={preview_img} width="160" alt="preview" className="img-fluid img-thumbnail mr-md-2"/>
  //     </div>
		
	// 	</form>
  // )

  // const handleRecDocSelect = (e) => {
  //   let fileToUpload = e.target.files
  //   if (e.target.value){
  //     setState({
  //       ...state,
  //       receiver_document_img: e.target.value
  //     })
  //     // Clear Related Errors
  //     let errors = error
  //     delete errors["AWSS3"]
  //     setError(errors)
  //     document.getElementById('receiverDoc_preview').src = URL.createObjectURL(fileToUpload[0])
  //   }
    
  // }

  // const handleRecDocUpload = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target)

  //   const UploadImage = async() => {
  //     await fetch('/api/image/upload', {
  //       method: 'POST',
  //       body: formData
  //     }).then(resp => {
  //       resp.json().then(data => {
  //         if (resp.ok){
  //           setRecBtn('compl')
  //           setState({
  //             ...state,
  //             receiver_document_img: data.key,
  //           });
  //         } else {
  //           setError({
  //             AWSS3: {
  //               name: 'خطأ',
  //               error: 'حدث خطأ أثناء رفع الصورة, الرجاء المحاولة من جديد.',
  //               type: 'warning'
  //             }
  //           });
  //           setRecBtn('btn')
  //         }
  //       })
  //     })
  //   }

  //   // Clear Related Errors
  //   let errors = error
  //   delete errors["AWSS3"]
  //   setError(errors)

  //   setRecBtn('progBar')
  //   UploadImage();
    
  // }

  // const receiver_document = () => (
  //   <form form="receiverDocForm" onSubmit={handleRecDocUpload} className="mt-4">
	// 		<p className="font-weight-bold text-right mr-md-4"> صورة (جواز/هوية) المرسل إليه : </p>
			
	// 		<div className="form-inline mt-4">
	// 			<label htmlFor="receiver_document_id" className="ml-sm-4"/>
	// 			<div className="input-group">
	// 				<input onChange={handleChange} type="text" value={state.receiver_document_id ? state.receiver_document_id : ''} id="receiver_document_id" placeholder=" رقم وثيقة المرسل إليه" className={'form-control ml-sm-4 ' + (error['receiver_document_id'] ? 'is-invalid': '')}/>
	// 			</div>
	// 		</div>

	// 		<div className="form-inline mt-4">
  //       <label htmlFor="image" className="ml-sm-4 "/>
  //       <div className="input-group pt-special">
  //         <input onChange={handleRecDocSelect} type="file" name="image" id="image" className={"file-custom " + (error['document_img'] ? 'is-invalid': '')} placeholder="إختر صورة الجواز" accept="image/*"/>
  //       </div>
  //       {receiverDoc === 'btn' ? (
  //         <input disabled={senderDoc === 'progBar' ? true : false} type="submit" value="رفع الصورة" className="btn btn-md btn-primary"/>
  //       ) : receiverDoc === 'progBar' ? (
  //         <div className="spinner-border text-info" role="status">
  //           <span className="sr-only">قيد الرفع...</span>
  //         </div>
  //       ) : (
  //         <span className="font-weight-bold text-success">تم رفع الصورة بنجاح.</span>
  //       )}
  //     </div>

	// 		<div className="container text-right mt-4">
  //       <img id="receiverDoc_preview" src={preview_img} width="160" alt="preview" className="img-fluid img-thumbnail mr-md-2"/>
  //     </div>
		
	// 	</form>
  // )