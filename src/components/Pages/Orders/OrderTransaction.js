/* قسم طلب المعاملات */
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import homeImg from '../../../Static/Images/Home/order.jpg';

// Default Preview Image
import preview_img from '../../../Static/Images/Preview/preview.png'

// Finished ...

export const OrderTransaction = () => {
  const [state, setState] = useState({providers: [], type: null});
	const [error, setError] = useState({});
	const [complete, setComplete] = useState({completed: false, order: null});


	// For Image Upload
	const [docUpBtn, setDocBtn] = useState('btn')
	const [tranUpBtn, setTranBtn] = useState('btn')
	/* Default Values */

	// For TSEY
	const offices = [
		'وكالة الحديدة لخدمات الايدي العاملة.',
		'شركة انجاز لخدمات الايدي العاملة.',
		'وكالة الدليل للسفريات والسياحة.',
		'مجموعة اجياد للتمية السياحية.',
		'العواضي للسفريات والسياحة.',
		'نسك للاستثمار السياحي.',
		'مكتب باشافعي.',
		'مجموعة اجياد عدن.',
		'مكتب الحبيب لتشغيل الايدي العاملة.',
		'مجوعة العمل الدولية.',
		'مكتب باشافعي عدن.',
		'وكالة بامطرف للسياحة والسفر.',
		'البيت السعودي للسفريات.',
		'مكتب العيسائبى عدن.',
		'مكتب المضياف عدن.',
		'مكتب عدن الدولي عدن.',
		'مكتب اجياد عدن.',
		'مكتب بيت الكمبيوتر عدن.',
		'مكتب نحد الجزيرة.',
		'مكتب الحجر الأسود.',
		'وكالة رواسي للسفريات والسياحة.',
		'وكالة انهار الفردوس.',
		'وكالة رواد المستقبل.',
		'مستشفى صابر عدن  للفحص الطبي.',
		'مستشفى الرازي للفخص الطبي عدن.',
		'المستشفى السعودي الالماني للفحص الطبي صنعاء.',
		'مستشفى ازال للفحص الطبي صنعاء.'
	]

	const tsey_transactions = [
		'زيارة عائلية لليمن.',
		'معاملة زيارة ضيافة مقيم.',
		'معاملة تأشيرة فيزة عمل.',
		'معاملة تمديد خروج وعودة.',
		'معاملة التحقق من بصمة سابقة(الجوزات السعودية).',
		'معاملة اضافة طفل جديد.',
		'معاملة تأشيرة عمرة.',
		'معاملة تأشيرة حج.',
		'معاملة تاشيرة سياحية.',
		'معاملة تاشيرة تجارية.',
		'معاملة تصديق شهادات.',
		'معاملة تصديق عقود العمل.'
	]

	// For TRSA
	const trsa_transactions = [
		'معاملة إستخراج تأشيرة عائلية جديدة (الجوزات السعودية ).',
		'معاملة إستخراج تأشيرة ضيافة مقيم جديد( الجوزات السعودية ).',
		'إلغاء هروب مهني.',
		'إلغاء هروب فردي.',
		'إلغاء رخصة عمل  بغرض الخروج النهائي.',
		'إلغاء خروج نهائي صادر من أبشر والجوزات.',
		'منح خروج نهائي للإقامة المنتهية.',
		'منح خروج نهائى  عليه بلاغ هروب.',
		'تمديد صلاحية الجواز.',
		'نقل معلومات الجواز.',
		'إضافة صفر للجواز.',
		'إسقاط عامل خرج ولم يعد.',
		'تصديق عقود العمل.',
		'إستخراج تأشيرات  للعمالة.',
		'إستخراج تصاريح زواج.'
	]

	const dealers = [
		{
			city: 'جدة',
			name: 'سعيد الأسمري'
		},
		{
			city: 'الرياض',
			name: 'أبو جلال'
		},
		{
			city: 'الشرقية',
			name: 'فارس الرويلي'
		},
		{
			city: 'الجنوب',
			name: 'صالح الحكمى'
		},
		{
			city: 'المنطقة الشمالية',
			name: 'ياسر الشمري'
		}
	]

	// For IESY
	const governUniv = [
		{
			city: 'صنعاء',
			name: 'جامعة صنعاء'
		},
		{
			city: 'عدن',
			name: 'جامعة عدن'
		},
		{
			city: 'تعز',
			name: 'جامعة تعز'
		},
		{
			city: 'الحديدة',
			name: 'جامعة الحديدة'
		},
		{
			city: 'حضرموت',
			name: 'جامعة حضرموت'
		},
		{
			city: 'ذمار',
			name: 'جامعة ذمار'
		},
		{
			city: 'إب',
			name: 'جامعة إب'
		},
		{
			city: 'عمران',
			name: 'جامعة عمران'
		},
		{
			city: 'البيضاء',
			name: 'جامعة البيضاء'
		},
		{
			city: 'صنعاء',
			name: 'جامعة 21 سبتمبر'
		}
	]

	const privateUniv = [

		{'city': 'عدن', 'name': 'جامعة ابن خلدون'},
		{'city': 'صنعاء', 'name': 'جامعة ازال  للعلوم وتكنولوجيا'},
		{'city': 'صنعاء', 'name': 'جامعة اقراء للعلوم وتكنلوجيا'}, 
		{'city': 'صنعاء', 'name': 'جامعة الاتحاد للعلوم وتكنولوجيا'}, 
		{'city': 'تريم', 'name': 'جامعة الاحقاف'}, 
		{'city': 'صنعاء', 'name': 'جامعة الامارات الدولية'}, 
		{'city': 'صنعاء', 'name': 'جامعة الاندلس للعلوم والتنمية'}, 
		{'city': 'صنعاء', 'name': 'الجامعة البريطانية باليمن'}, 
		{'city': 'اب', 'name': 'جامعة الجزيرة'}, 
		{'city': 'عدن', 'name': 'جامعة الحضارة'}, 
		{'city': 'صنعاء', 'name': 'جامعة الحكمة'}, 
		{'city': 'صنعاء', 'name': 'جامعة الرازي'}, 
		{'city': 'تعز', 'name': 'جامعة السعيد'}, 
		{'city': 'صنعاء', 'name': 'الجامعة العربية للعلوم والتقنية'}, 
		{'city': 'صنعاء', 'name': 'جامعة العلوم الحديثة'}, 
		{'city': 'صنعاء', 'name': 'جامعة العلوم وتكنولوجيا'}, 
		{'city': 'صنعاء', 'name': 'جامعة القرآن الكريم والعلوم الإسلامية'}, 
		{'city': 'عدن - صنعاء - تعز', 'name': 'الجامعة اللبنانية الدولية'}, 
		{'city': 'صنعاء', 'name': 'جامعة المستقبل'}, 
		{'city': 'صنعاء', 'name': 'جامعة المعرفة والعلوم الحديثة'}, 
		{'city': 'صنعاء', 'name': 'جامعة الملكة اروى'}, 
		{'city': 'صنعاء', 'name': 'الجامعة الوطنية'}, 
		{'city': 'صنعاء', 'name': 'جامعة اليمن'}, 
		{'city': 'صنعاء', 'name': 'جامعة اليمن والخليج للعلوم والتكنولوجيا'}, 
		{'city': 'صنعاء - تعز', 'name': 'الجامعة اليمنية'}, 
		{'city': 'صنعاء', 'name': 'الجامعة اليمنية الاردنية'}, 
		{'city': 'صنعاء', 'name': 'جامعة تونيك الدولية للتكنولوجيا'}, 
		{'city': 'صنعاء', 'name': 'جامعة دار السلام للعلوم وتكنولوجيا'}, 
		{'city': 'الحديدة ', 'name': 'جامعة دار العلوم الشرعية'}, 
		{'city': 'صنعاء', 'name': 'جامعة سبأ'}, 
		{'city': 'تعز', 'name': 'كلية ٢٢ مايو الطبية'}, 
		{'city': 'حضرموت', 'name': 'كلية الامام الشافعي'}, 
		{'city': 'المكلا ', 'name': 'كلية الريان'}, 
		{'city': 'الحبيلين', 'name': 'كلية ردفان للقرآن'}
	]

	const Institutes = [
		{city: 'صنعاء', name: 'معهد سييدز للغة الإنجليزية والكمبيوتر'},
		{city: 'صنعاء', name: 'معهد اكسيد للغة الإنجليزية'},
		{city: 'صنعاء', name: 'معهد يالى للغة الإنجليزية'},
		{city: 'صنعاء', name: 'المعهد البريطاني  للغة الإنجليزية'},
		{city: 'تعز', name: 'المعهد الكندي للغة الإنجليزية'},
		{city: 'صنعاء', name: 'معهد نيو هوريزون للغة الإنجليزية'}
	]

	const installments = [
		'4 دفعات',
		'6 دفعات',
		'8 دفعات',
		'10 دفعات',
		'12 دفعة'
	]

	/* Default Values */

  const handleSwitch = (e) => {
		e.preventDefault();
		// Reset Forms
		const Form = document.PageForms;
		Form && Form.reset();
		// Reset State, and Errors
		setState({providers: [], type: e.target.value});
		setError({});
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		const Order = async() => {
			await fetch('/api/transactions/order', {
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
    } else if (!state['providers'] || (state['providers'] && state['providers'].length === 0)) {
      setError({
        ...error,
        providers: {
          name: 'الشركات, المعقبين, الجامعات والمعاهد',
          error: 'الرجاء تحديد (شركة, معقب, جامعة/معهد) واحد على الأقل'
        }
      })
    } else {
      let errors = error
      delete errors['phone']
      delete errors['companies']
      setError(errors)

			// Sending Order To Backend, Disabling the submission button in case of delay
			document.getElementById("SubmissionBtn").disabled = true;
			document.getElementById('waitingText').classList.remove('d-none')
			Order()
    
		}
	}

	const handleChange = (e) => {
		// Not Preventing Default when Using Checkbox
		if (e.target.name !== 'providers[]') {
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
        ...state,
        [e.target.id]: e.target.value
      })
		} else if (e.target.name === 'providers[]') {
			let id = e.target.id;
			// If User is Checking a Box
			if (document.getElementById(id).checked){
				var limit = 4;
				if (state.providers && state.providers.length < limit) {
					setState({...state, providers: [...state.providers, e.target.value]})
				} else {
					document.getElementById(id).checked = false;
				}
				// Delete providers errors
				let errors = error;
				delete errors['providers'];
				setError(errors);
			}
			// If User is UnChecking a Box
			else {
				var presenters_list = state.providers;
				const index = presenters_list.indexOf(e.target.value);
				if (index > -1) {
					presenters_list.splice(index, 1);
				}
				setState({...state, providers: presenters_list})
			}
		} else {
			setState({
				...state,
				[e.target.id]: e.target.value
			})
		}
	}

	const loadForms = () => {
		const CustomerInfo = (
			<div>
				<div className="form-inline">  
					<label htmlFor="name" className="ml-sm-4"/>
					<div className="input-group">
						<input required onChange={handleChange} type="text" value={state.name ? state.name : ''} id="name" placeholder="* الإسم" className={'form-control ml-sm-4 ' + (error['name'] ? 'is-invalid': '')}/>
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
	
					<label htmlFor="phone_ye" className="ml-sm-4 pt-special"/>
					<div className="input-group">
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

				{state.type === 'IESY' ? (null) : (
					<div className="form-inline mt-4">
						<label htmlFor="num_documents" className="ml-sm-4"/>
						<div className="input-group">
							<input onChange={handleChange} type="text" required id="num_documents" placeholder="* عدد الوثائق (الجوازات/الهويات)" className="form-control"/>
						</div>
					</div>
				)}
	
			</div>
		)
	
		const TSEYForm = (
			<div>
					
				{CustomerInfo}

				<div className="form-inline mt-4">
					<label htmlFor="service" className="ml-sm-4 pt-special"/>
					<div className="input-group">
						<select required onChange={handleChange} id="service" className={"font-weight-bold custom-select " + (error['transaction'] ? 'is-invalid': '')}>
							<option defaultValue value="">* إختر المعاملة</option>
							{tsey_transactions ? (tsey_transactions.map((trans, index) => {
								return(<option value={trans} key={index}>{trans}</option>)
							})) : null}
						</select>
					</div>
				</div>
				
				<div className="form-group text-right mt-4">
					<span className="font-weight-bold">* إختر المكاتب (4 كحد أقصى)</span>
					<div className={"providers checkbox-list mr-md-4 mt-2 " + (error['providers'] ? 'border border-danger' : '')}>
						{offices ? (offices.map((office, index) => {
							return(
								<div className="form-check" key={index}>
									<input onChange={handleChange} type="checkbox" value={office} className="form-check-input mr-1" name="providers[]" id={`presenter${index}`}/>
									<label htmlFor={`presenter${index}`} className="form-check-label mr-4">{office}</label>
								</div>
							)
						})) : null}
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
	
		const TRSAForm = (
			<div>

				{CustomerInfo}

				<div className="form-inline mt-4">
					
					<label htmlFor="service" className="ml-sm-4"/>
					<div className="input-group">
						<select required onChange={handleChange} id="service" className={"font-weight-bold custom-select " + (error['dealer'] ? 'is-invalid': '')}>
							<option defaultValue value="" className="font-weight-bold" >* إختر المعاملة</option>
							{trsa_transactions ? (trsa_transactions.map((trans, index) => {
								return(<option value={trans} key={index}>{trans}</option>)
							})) : null}
						</select>
					</div>
				
				</div>

				<div className="form-group text-right mt-4">
					<span className="font-weight-bold">* إختر المعقبين (4 كحد أقصى)</span>
					<div className={"providers checkbox-list mr-md-4 mt-2 " + (error['providers'] ? 'border border-danger' : '')}>
						{dealers ? (dealers.map((dealer, index) => {
							return(
								<div className="form-check" key={index}>
									<input onChange={handleChange} type="checkbox" value={dealer.name} className="form-check-input mr-1" name="providers[]" id={`presenter${index}`}/>
									<label htmlFor={`presenter${index}`} className="form-check-label mr-4">{dealer.name} - {dealer.city}</label>
								</div>
							)
						})) : null}
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
	
		const IESYForm = (
			<div>
				{CustomerInfo}

				<div className="form-inline mt-4">
					
					<label htmlFor="service" className="ml-sm-4"/>
					<div className="input-group">
						<select required onChange={handleChange} id="service" className={"font-weight-bold custom-select " + (error['installment'] ? 'is-invalid': '')}>
							<option defaultValue value="" className="font-weight-bold" >* إختر برنامج التقسيط</option>
							{installments ? (installments.map((instal, index) => {
								return(<option value={instal} key={index}>{instal}</option>)
							})) : null}
						</select>
					</div>
				
				</div>

				<div className="form-group text-right mt-4">
					<span className="font-weight-bold">* إختر الجامعات/المعاهد (4 كحد أقصى)</span>
					<div className={"providers checkbox-list mr-md-4 mt-2 " + (error['providers'] ? 'border border-danger' : '')}>
						<span className="font-weight-bold mr-1">الجامعات الحكومية</span>
						{governUniv ? (governUniv.map((uni, index) => {
							return(
								<div className="form-check" key={index}>
									<input onChange={handleChange} type="checkbox" value={uni.name} className="form-check-input mr-1" name="providers[]" id={`Govern${index}`}/>
									<label htmlFor={`Govern${index}`} className="form-check-label mr-4">{uni.name} - {uni.city}</label>
								</div>
							)
						})) : null}
						<span className="font-weight-bold mr-1">الجامعات الخاصة/الأهلية</span>
						{privateUniv ? (privateUniv.map((uni, index) => {
							return(
								<div className="form-check" key={index}>
									<input onChange={handleChange} type="checkbox" value={uni.name} className="form-check-input mr-1" name="providers[]" id={`Private${index}`}/>
									<label htmlFor={`Private${index}`} className="form-check-label mr-4">{uni.name} - {uni.city}</label>
								</div>
							)
						})) : null}
						<span className="font-weight-bold mr-1">معاهد اللغة الإنجليزية والكمبيوتر</span>
						{Institutes ? (Institutes.map((uni, index) => {
							return(
								<div className="form-check" key={index}>
									<input onChange={handleChange} type="checkbox" value={uni.name} className="form-check-input mr-1" name="providers[]" id={`Institute${index}`}/>
									<label htmlFor={`Institute${index}`} className="form-check-label mr-4">{uni.name} - {uni.city}</label>
								</div>
							)
						})) : null}
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

		if (state.type === 'TSEY') {return TSEYForm}
		if (state.type === 'TRSA') {return TRSAForm}
		if (state.type === 'IESY') {return IESYForm}
	}

	const handleDocSelect = (e) => {
    let fileToUpload = e.target.files
    if (e.target.value){
      setState({
        ...state,
        document_img: e.target.value
      })
      // Clear Related Errors
      let errors = error
      delete errors["AWSS3"]
      setError(errors)
      document.getElementById('doc_preview').src = URL.createObjectURL(fileToUpload[0])
    }
    
  }

  const handleDocUpload = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)

    const UploadImage = async() => {
      await fetch('/api/image/upload', {
        method: 'POST',
        body: formData
      }).then(resp => {
        resp.json().then(data => {
          if (resp.ok){
            setDocBtn('compl')
            setState({
              ...state,
              document_img: data.key,
            });
          } else {
            setError({
              AWSS3: {
                name: 'خطأ',
                error: 'حدث خطأ أثناء رفع الصورة, الرجاء المحاولة من جديد.',
                type: 'warning'
              }
            });
            setDocBtn('btn')
          }
        })
      })
    }

    // Clear Related Errors
    let errors = error
    delete errors["AWSS3"]
    setError(errors)

    setDocBtn('progBar')
    UploadImage();
    
  }

	const DocumentInfo = () => (
		<div form="docForm" className="mt-4">
			<hr/>
			<p className="font-weight-bold text-right mr-md-4">* رقم الوثيقة : </p>
			
			<div className="form-inline mt-4">
				<label htmlFor="document_id" className="ml-sm-4"/>
				<div className="input-group">
					<input required onChange={handleChange} type="text" value={state.document_id ? state.document_id : ''} id="document_id" placeholder="* رقم (جواز/هوية) المستفيد" className={'form-control ml-sm-4 ' + (error['document_id'] ? 'is-invalid': '')}/>
				</div>
			</div>

			{/* <div className="form-inline mt-4">
        <label htmlFor="image" className="ml-sm-4 "/>
        <div className="input-group pt-special">
          <input onChange={handleDocSelect} type="file" name="image" id="image" className={"file-custom " + (error['document_img'] ? 'is-invalid': '')} placeholder="إختر صورة الجواز" accept="image/*"/>
        </div>
        {docUpBtn === 'btn' ? (
          <input disabled={tranUpBtn === 'progBar' ? true : false} type="submit" value="رفع الصورة" className="btn btn-md btn-primary"/>
        ) : docUpBtn === 'progBar' ? (
          <div className="spinner-border text-info" role="status">
            <span className="sr-only">قيد الرفع...</span>
          </div>
        ) : (
          <span className="font-weight-bold text-success">تم رفع الصورة بنجاح.</span>
        )}
      </div>

			<div className="container text-right mt-4">
        <img id="doc_preview" src={preview_img} width="160" alt="preview" className="img-fluid img-thumbnail mr-md-2"/>
      </div> */}
		
		</div>
	)

	const handleTranSelect = (e) => {
    let fileToUpload = e.target.files
    if (e.target.value){
      setState({
        ...state,
        transaction_img: e.target.value
      })
      // Clear Related Errors
      let errors = error
      delete errors["AWSS3"]
      setError(errors)
      document.getElementById('tran_preview').src = URL.createObjectURL(fileToUpload[0])
    }
    
  }

  const handleTranUpload = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)

    const UploadImage = async() => {
      await fetch('/api/image/upload', {
        method: 'POST',
        body: formData
      }).then(resp => {
        resp.json().then(data => {
          if (resp.ok){
            setTranBtn('compl')
            setState({
              ...state,
              transaction_img: data.key,
            });
          } else {
            setError({
              AWSS3: {
                name: 'خطأ',
                error: 'حدث خطأ أثناء رفع الصورة, الرجاء المحاولة من جديد.',
                type: 'warning'
              }
            });
            setTranBtn('btn')
          }
        })
      })
    }

    // Clear Related Errors
    let errors = error
    delete errors["AWSS3"]
    setError(errors)

    setTranBtn('progBar')
    UploadImage();
    
  }

	const TransactionInfo = () => (
		<div form="tranForm" className="mt-4">
			<p className="font-weight-bold text-right mr-md-4"> رقم المعاملة : </p>
			
			<div className="form-inline mt-4">
				<label htmlFor="transaction_id" className="ml-sm-4"/>
				<div className="input-group">
					<input type="number" onChange={handleChange} value={state.transaction_id ? state.transaction_id : ''} id="transaction_id" placeholder="رقم المعاملة" className={"form-control ml-sm-4 " + (error['transaction_id'] ? 'is-invalid': '')}/>
				</div>
			</div>

			{/* <div className="form-inline mt-4">
        <label htmlFor="image" className="ml-sm-4 "/>
        <div className="input-group pt-special">
          <input onChange={handleTranSelect} type="file" name="image" id="image" className={"file-custom " + (error['document_img'] ? 'is-invalid': '')} placeholder="إختر صورة الجواز" accept="image/*"/>
        </div>
        {tranUpBtn === 'btn' ? (
          <input disabled={docUpBtn === 'progBar' ? true : false} type="submit" value="رفع الصورة" className="btn btn-md btn-primary"/>
        ) : tranUpBtn === 'progBar' ? (
          <div className="spinner-border text-info" role="status">
            <span className="sr-only">قيد الرفع...</span>
          </div>
        ) : (
          <span className="font-weight-bold text-success">تم رفع الصورة بنجاح.</span>
        )}
      </div>

			<div className="container text-right mt-4">
        <img id="tran_preview" src={preview_img} width="160" alt="preview" className="img-fluid img-thumbnail mr-md-2"/>
      </div> */}
		
		</div>
	)

	const SubmitAndLeave = (
		<div className="mt-4 text-center">
			<p className="font-weight-lighter text-muted">* يجب أن تكمل جميع البيانات قبل إرسال الطلب.</p>
			<div className="input-group justify-content-center">
				<button type="submit" id="SubmissionBtn" className="btn btn-lg btn-outline-success">أرسل الطلب</button>
			</div>
			<p id="waitingText" className="text-info font-weight-bold d-none">
				يتم معالجة الطلب, الرجاء الإنتظار...
			</p>
		</div>
	)

	const loadPage = (
		<div>
			<div className="row">
				
				<div className="form-group col mt-5">
					<p className="font-weight-lighter font-info text-right text-muted">الحقول المطلوبة مسبوقة بعلامة <strong>*</strong></p>
					<p className="font-weight-lighter font-info text-right text-muted">يجب إضافة رقم هاتف واحد على الأقل</p>

					<div className="form-inline">
						<label htmlFor="type" className="ml-sm-4"/>
						<div className="input-group">
							<select onChange={handleSwitch} required value={state.type ? state.type : ''} id="type" className="custom-select font-weight-bold">
								<option className="font-weight-bold" defaultValue>حدد نوع المعاملة</option>
								<option className="font-weight-bold" value="TSEY">طلب إنجاز معاملة في السفارة السعودية</option>
								<option className="font-weight-bold" value="TRSA">طلب إنجاز معاملة للمقيم داخل السعودية</option>
								<option className="font-weight-bold" value="IESY">طلب خدمة تقسيط للتسجيل في الجامعات والمعاهد اليمنية</option>
							</select>
						</div>	
					</div>

					<form onSubmit={handleSubmit} name="PageForms">
						<div className="form-group text-right mt-3">
							{state.type ? (loadForms()) : null}
							{state.type ? DocumentInfo() : null}
							{state.type ? TransactionInfo() : null}
							{state.type ? SubmitAndLeave : null}
						</div>
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
          <h3 className="display-5">طلب تخليص معاملة</h3>
        </div>
      </div>

      <div className="container text-center mt-4">
        <span className="display-6">أقسام الطلبات</span>
        <hr/>
        <p className="lead font-weight-bold">
          <Link className="text-primary" to="/transactions"> جميع المعاملات </Link>|
          <Link className="text-primary" to="/orders"> طلباتي </Link>|
          <Link className="text-primary" to="/trips/order"> طلب حجز رحلة </Link>|
          <Link className="text-primary" to="/delivery/order"> طلب إرسال رسالة أو طرد </Link>
        </p>
      </div>

      <div className="container text-center mt-5">
        <div className="card p-3 bg-grey shadow">
          <span className="card-title display-6">طلب تخليص المعاملات</span>
          <hr/>
          <div className="card-body">
            {loadPage}
						{loadErrors()}
          </div>
        </div>
      </div>

    </div>
  )
}


/*
  Required Inputs (From Users) :

		Transaction Type
		Name
		Phone_SA or Phone_YE
		ID_Number
		ID_Image
		Service (Transaction Name, Installments Number)
		Providers (Offices, Dealers, Univercities)
*/

/*
  Un-Required Inputs (From Users) : 

		Transaction_ID
		Transaction_Image
		Notes
*/