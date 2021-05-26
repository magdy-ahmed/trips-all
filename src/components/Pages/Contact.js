import React, { useState } from 'react';
import ContImg from '../../Static/Images/Home/contact.jpg'
import { Link } from 'react-router-dom';



export const Contact = () => {

  const [message, setMessage] = useState({
    full_name: '',
    email: '',
    title: '',
    content: ''
  });
  const [error, setError] = useState({});
  const [clicked, setClicked] = useState(false);
  const [sent, setSent] = useState(false);

  const handleClick = (e) => {
    let value = e.target.id;
    
    if (window.confirm('سيتم فتح رابط خارجي, هل أنت متأكد؟')){
      window.open(value)
    }
  }

  const handleChange = (e) => {
    e.preventDefault();
    setError({})
    setMessage({
      ...message,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    const sendMessage = async() => {
      await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(message)
      }).then(resp => {
        resp.json().then(data => {
          if (resp.ok){
            setSent(true);
          } else {
            setClicked(false);
            if (data.code === 'INVALID_MESSAGE'){
              setError({
                message: {
                  name: 'خطأ',
                  error: 'يجب عليك تعبئة جميع الخانات المطلوبة.',
                  type: 'warning'
                }
              })
            }
            if (data.code === 'EMPTY_FIELD'){
              setError({
                message: {
                  name: 'خطأ',
                  error: 'يجب عليك تعبئة جميع الخانات المطلوبة.',
                  type: 'warning'
                }
              })
            }
            if (data.code === 'SERVER'){
              setError({
                message: {
                  name: 'خطأ',
                  error: 'حدثت مشكلة في السيرفر أثناء إرسال الرسالة, الرجاء المحاولة من جديد لاحقاً.',
                  type: 'danger'
                }
              })
            }
          }
        })
      })
    };
    setClicked(true);
    sendMessage();
  }

  const loadErrors = () => {
    if (Object.keys(error).length !== 0 && error.constructor === Object){
      return (
        <div>
          {error ? Object.entries(error).map((e, id) => {
            return (
              <div key={id} className={`alert alert-${e[1].type} text-right`}>
                <p className="font-weight-bold">
                  {e[1].name} : {e[1].error}
                </p>
              </div>
            )
          }): null}
        </div>
      )
    }
  }

  return (
    <div className="mb-5 pb-5">
      
      <div className="carousel-item active" style={{backgroundImage: `url(${ContImg})`, opacity: 0.82}}>
        <div className="text-info carousel-caption flex-center">
          <h3 className="display-5">تواصل معنا</h3>
        </div>
      </div>

      <div className="container text-center mt-4 pb-5">
          <form onSubmit={handleSubmit} className=" container mt-2" id="email">
            <span className="display-7">التواصل عن طريق البريد الإلكتروني</span>
            <hr/>
            {loadErrors()}
            <div className="form-inline justify-content-center mt-4">
              <label htmlFor="fullname" className="form-label"/>
              <input disabled={sent} onChange={handleChange} type="text" id="fullname" placeholder="الإسم الكامل" className="form-control col-sm-8"/>
            </div>

            <div className="form-inline justify-content-center mt-4">
              <label htmlFor="email" className="form-label"/>
              <input disabled={sent} onChange={handleChange} type="email" id="email" placeholder="البريد الإلكتروني" className="form-control col-sm-8"/>
            </div>

            <div className="form-inline justify-content-center mt-4">
              <label htmlFor="title" className="form-label"/>
              <input disabled={sent} onChange={handleChange} type="text" id="title" placeholder="عنوان الرسالة" className="form-control col-sm-8"/>
            </div>

            <div className="form-inline justify-content-center mt-4">
              <label htmlFor="message" className="form-label"/>
              <textarea disabled={sent} onChange={handleChange} id="message" placeholder="الرسالة" cols="20" rows="10" className="form-control col-sm-8"/>
            </div>

            {sent ? (
              <div className="mt-4">
                <span className="text-center font-weight-bold text-success">
                  تم إرسال الرسالة بنجاح!
                </span>
              </div>
            ) : (
              <div className="input-group justify-content-center mt-4">
                <button disabled={clicked} type="submit" className="btn btn-outline-info">إرسال</button>
              </div>
            )}
          
          </form>
        
        </div>
      

      <div className="container text-center mt-1" id="social">
        <span className="display-7">أو عن طريق برامج التواصل الإجتماعي التالية</span>
        <hr/>
        <div className="row">
          <div className="col-md-12 col-sm-8 py-5">
            <div className="mb-5 flex-center">
              
              <Link to="#" className="fb-ic text-primary">
                <span id="https://www.facebook.com/profile.php?id=100053890684673" onClick={handleClick} className="fab fa-facebook-f fa-lg fa-3x mr-md-5 mr-3 fa-2x"/>
              </Link>

              <Link to="#" className="li-ic text-info">
                <span id="https://twitter.com/HakeemH11012166?s=09" onClick={handleClick} className="fab fa-twitter fa-lg fa-3x mr-md-5 mr-3 fa-2x"/>
              </Link>

              <Link to="#" className="wa-ic text-success">
                <span id="https://wa.me/+966567928521" onClick={handleClick} className="fab fa-whatsapp fa-lg fa-3x mr-md-5 mr-3 fa-2x"/>
              </Link>

              <Link to="#" className="ins-ic text-warning">
                <span id="https://www.instagram.com/yemenbus1/" onClick={handleClick} className="fab fa-instagram fa-lg fa-3x mr-md-5 mr-3 fa-2x"/>
              </Link>
            
            </div>
          </div>
        </div>
      </div>
    
      </div>
  )
}
