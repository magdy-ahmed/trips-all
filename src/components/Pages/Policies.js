import React from 'react';
import poliImg from '../../Static/Images/Home/policies.jpg';




export const Policies = () => {

  const GCCSDoc = [
    'حمل بطاقة الأحوال/الهوية الأصل.',
    'حمل دفتر العائلة الأصل (للمرافقين).',
    'خطاب التعريف للطلاب, أو بطاقة طالب سارية المفعول, للإستفادة من العودة المجانية للطلاب.',
    'أصل بطاقة الشؤون الإجتماعية لذوي الإحتياجات الخاصة (داخل المملكة فقط).',
    'لا يسمح بسفر المرافق بالجواز, من دون سفر صاحب الجواز.'
  ]

  const NonGCCSDoc = [
    'حمل الإقامة النظامية الأصل, أو جواز السفر ساري المفعول للزوار.'
  ]

  const inBusRules = [
    'لا تتحمل الناقلة أي  مسؤولية عن أي خسارة أو ضرر أو مصروفات تنشأ عن أي تأخير في تشغيل الخدمة.',
    'التدخين ممنوع داخل الحافلة في كافة الرحلات الدولية والمحلية.',
    'المقاعد الأمامية مخصصة للعائلات.',
    'على الركاب الحضور قبل الموعد المجدول لمغادرة الرحلة بما لا يقل عن ساعة واحدة للرحلات الداخلية, وساعتين للرحلات الدولية.'
  ]

  const returnPolicies = [
    'يتم عمل إجراءات إسترداد التذكرة المصدرة إلكترونياً (عبر خدمة الإنترنت) في المحطات وفقاً لإجرائات الإسترجاع المتبعة.',
    'صلاحية التذكرة هي 6 شهور (قابلة للتعديل والإلغاء بما لا يتجاوز 6 أشهر) تبدأ من الدفع الفعلي لقيمة التذكرة والإصدار الفعلة لها, ولا يتم إسترداد أو إلغاء التذاكر بعد هذه الفترة.',
    'لا تسترد قيمة التذكرة التي تم إستخدام جزء منها.',
    'جميع تذاكر العروض المخفضة غير قابلة للإسترداد.',
    'إلغاء السفر أو الحجز يكون قبل موعج السفر ب 4 - 16 ساعة, ويتم خصم 25% من قيمة التذكرة.',
    'يتم إرجاع المبلغ إلى الحساب القادم من التحويل.'
  ]

  const paymentPolicies = [
    'يمكن إتمام عملية الدفع بإستخدام خدمة "التحويل البنكي أو عبر شركة الصرافة و إرسال صورة التحويل" أو "البطاقات الإئتمانية".',
    'في حال إختيار خدمة التحويل أو عبر شركة الصرافة, لإتمام عملية الدفع وإصدار التذكرة يجب إتمام عملية الدفع الفعلي بحد أقصى 3 ساعات, وسيتم إلغاء الحجز إذا لم يتم الدفع.',
    'نقبل الدفع بإستخدام بطاقة الإئتمان, على أن يكون صاحب البطاقة من المسافرين, ويجب إحضارها عند السفر. فمن الممكن طلب هذه البطاقة للتحقق من صحتها, أو كتابة رقم هوية صاحب البطاقة, ورقم جواله للرجوع إليه في حالة إعادة المبلغ إلى حسابة.'
  ]

  const luggageRules = [
    'يجب وضع الاستكر الخاص بالإمتعة على جميع الأمتعة المصاحبة للراكب، وتصدر الاستكرات من المحطات.',
    'يجوز للراكب حمل بعض الأمتعة دون دفع مصروفات إضافية وذلك في حدود الوزن المجاني المسموح به،',
    'يجب أن يكون حجم الأمتعة مناسباً لمساحة مخزن الأمتعة في الحافلة حسب سياسة الشركة ووفقاً للأبعاد التالية ( 50سم عرض – 90 سم طول – 40 سم ارتفاع ).',
    'الحقائب اليدوية والمقتنيات الشخصية من مسؤولية الراكب والشركة غير مسئولة عن أي يضرر يلحق بها. كما ان وزن الحقيبة اليدوية يجب ان لا يزيد عن 7 كيلو جرام.',
    'الوزن الزائد : يترتب على الراكب دفع مبالغ إضافية عن نقل الأمتعة الزائدة عن الحد المجاني الذي يسمح به.',
    'الشركة غير مسئولة عن فقدان الأشياء الثمينة ، و تتحدد مسئوليتها في حالة فقدان الأمتعة المسجلة بتعويض 350 ريال كحد أقصى للقطعة الواحدة بعد استكمال الإجراءات النظامية و توفر الإستكر الخاص بالقطعة المفقودة.',
    'في حالة فقدان الأمتعة يجب الإبلاغ عن القطع المفقودة عند وصول الرحلة فوراً.',

  ]

  const bannedLuggage = [
    'المواد التي يحظر نقلها بموجب القوانين، اللوائح، الأوامر المعمول بها في المملكة العربية السعودية، أو الدول التي تمتد خدماتنا اليها.',
    'المواد التي تعتبر غير ملائمة للنقل نظراً لأنها خطيرة ، أو غير آمنة أو بسبب وزنها ، حجمها ، شكلها أو سماتها أو المعرضة للكسر أو التلف و منها ( المواد القابلة للاشتعال – المتفجرات و الاسلحة والذخائر – الحيوانات و الزواحف – المواد السائلة ، و الأحماض ).',
    'يجب أن لا تضع في الأمتعة المسجلة مواد ثمينة ،مبالغ المالية، مجوهرات، معادن الثمينة، أجهزة كمبيوتر، أجهزة إلكترونية شخصية ، مستندات ذات قيمة أو أهمية قصوى، الأوراق القابلة للتداول.',
    'إجراءات الأمتعة للرحلات الدولية (  بين الدول ) تختلف عنها في الرحلات الداخلية حيث يشترط وزن وإتمام إجراءات الأمتعة قبل فترة لا تقل عن ساعتين عن المواعيد المجدولة لمغادرة الرحلة للركاب المغادرين من محطات.'
  ]

  const kidsPolicies = [
    'لأطفال دون ال 12 سنة تمنح لهم نصف قيمة تذكرة.',
    'يمنع سفر الأطفال لمن هم دون سن ال 13 بمفردهم على الحافلة .',
    'يمكن لمن هو بين ال 13 و ال 17 سنة السفر لوحدهم بعد تعبئة نموذج موافقة السفر .',
    'الرضيع ( أقل من عامين ) يجب أن يسجل و يمنح تذكرة مجانية بدون مقعد.'
  ]

  const specialNeedsPolicies = [
    'سفر ذوي الاحتياجات الخاصة يكون مع مرافق.',
    'يجب احضار الهوية الاصل مع ارفاق صورة من بطاقة ذوي الاحتياجات الخاصة .',
    'يمكن سفر ذوي الاحتياجات الخاصة في الحالات البسيطة بمفردهم دون مرافق',
    'يشترط ان تكون حالة ذوي الاحتياجات الخاصة تسمح له بالسفر والجلوس على مقاعد الحافلة.',
    'يحق لمرافق ذوي الاحتياجات الخاصة الحصول على التخفيض الممنوح لذوي الاحتياجات الخاصة في حال مرافقتهم.'
  ]
  
  return(
    <div className="mb-5 pb-5">
      
      <div className="carousel-item active" style={{backgroundImage: `url(${poliImg})`, opacity: 0.82}}>
        <div className="text-info carousel-caption flex-center">
          <h3 className="display-5">السياسات والشروط</h3>
        </div>
      </div>

      <div className="container text-center mt-4">
        <span className="display-6 text-dark">السياسات والشروط العامة لحجوزات الرحلات</span>
        <hr/>
        <div className="lead font-weight-bold pt-2">
          <p className="text-dark">
            من خلال خدمة الحجز وإصدار التذاكر عبر الإنترنت, يمكن إجراء مافة عمليات الإستعلام والبحث عن الرحلات و إجراء حجوزات وإتمام عملية الدفع بإستخدام خدمة "التحويل البنكي" أو "البطاقات الإئتمانية" ومن ثم إصدار التذكرة.
          </p>
          <p className="text-primary">
            يجب التأكد من أن بيانات الراكب / الركاب على التذكرة / التذاكر تتطابق مع البيانات على الهوية الخاصة بكل راكب.
          </p>
          <p className="text-danger">
            قد يؤدي السفر بدون الأوراق و الوثائق الصحيحة إلى منع المسافر من السفر أو الدخول إلى البلد التي يقصدها أو محطات التوقف, ومن الممكن ترحيلة أو سجنة, وفي مثل هذه الحالات سوف يتحمل المسافر وحده مسؤولية أية تكاليف أو خسائر أو أضرار يتعرض لها المسافر أو نتعرض لها نحن أو وكلاؤنا أو موظفينا.
          </p>
        </div>
      </div>

      <div className="container text-center mt-5 pt-5">
        <span className="display-6 text-info">الوثائق اللازمة للركاب أثناء السفر على الحافلات إلى اليمن</span>
        <hr/>
        <div className="lead font-weight-bold pt-2">
          <div className="pt-2">
            <span className="text-primary"><i className="fa fa-star-of-life fa-xs"/> لمواطني دول مجلس التعاون</span>
            <hr/>
            {GCCSDoc ? (GCCSDoc.map((doc, index) => {
              return(<p className="text-dark" key={index}><i className="fa fa-circle fa-xs"/> {doc}</p>)
            })) : null}
          </div>
          <div className="pt-2">
            <span className="text-primary"><i className="fa fa-star-of-life fa-xs"/> لغير مواطني دول مجلس التعاون</span>
            <hr/>
            {NonGCCSDoc ? (NonGCCSDoc.map((doc, index) => {
              return(<p className="text-dark" key={index}><i className="fa fa-circle fa-xs"/> {doc}</p>)
            })) : null}
          </div>
        </div>
      </div>

      <div className="container text-center mt-5 pt-5">
        <span className="display-6 text-info">القوانين والشروط الخاصة بالحافلات</span>
        <hr/>
        <div className="lead font-weight-bold pt-2">
            {inBusRules ? (inBusRules.map((rule, index) => {
              return(<p className="text-dark" key={index}><i className="fa fa-circle fa-xs"/> {rule}</p>)
            })) : null}
        </div>
      </div>

      <div className="container text-center mt-5 pt-5">
        <span className="display-6 text-info">سياسة الإسترداد و الإلغاء</span>
        <hr/>
        <div className="lead font-weight-bold pt-2">
          {returnPolicies ? (returnPolicies.map((polic, index) => {
            return(<p className="text-dark" key={index}><i className="fa fa-circle fa-xs"/> {polic}</p>)
          })) : null}
        </div>
      </div>

      <div className="container text-center mt-5 pt-5">
        <span className="display-6 text-info">سياسة سداد قيمة التذكرة</span>
        <hr/>
        <div className="lead font-weight-bold pt-2">
          {paymentPolicies ? (paymentPolicies.map((polic, index) => {
            return(<p className="text-dark" key={index}><i className="fa fa-circle fa-xs"/> {polic}</p>)
          })) : null}
        </div>
      </div>

      <div className="container text-center mt-5 pt-5">
        <span className="display-6 text-info">سياسة إجرائات الأمتعة</span>
        <hr/>
        <div className="lead font-weight-bold pt-2">
          {luggageRules ? (luggageRules.map((rule, index) => {
            return(<p className="text-dark" key={index}><i className="fa fa-circle fa-xs"/> {rule}</p>)
          })) : null}
          <div className="pt-4">
            <span className="text-danger"><i className="fa fa-star-of-life fa-xs"/> المواد المحظورة التي يتعين على الراكب عدم نقلها ضمن الأمتعة</span>
            <hr/>
            {bannedLuggage ? (bannedLuggage.map((ban, index) => {
              return(<p className="text-warning" key={index}><i className="fa fa-circle fa-xs"/> {ban}</p>)
            })) : null}
          </div>
        </div>
      </div>

      <div className="container text-center mt-5 pt-5">
        <span className="display-6 text-info">سياسة سفر الأطفال</span>
        <hr/>
        <div className="lead font-weight-bold pt-2">
            {kidsPolicies ? (kidsPolicies.map((polic, index) =>{
              return(<p className="text-dark" key={index}><i className="fa fa-circle fa-xs"/> {polic}</p>)
            })) : null}
        </div>
      </div>

      <div className="container text-center mt-5 pt-5">
        <span className="display-6 text-info">سياسة سفر ذوي الإحتياجات الخاصة</span>
        <hr/>
        <div className="lead font-weight-bold pt-2">
            {specialNeedsPolicies ? (specialNeedsPolicies.map((polic, index) =>{
              return(<p className="text-dark" key={index}><i className="fa fa-circle fa-xs"/> {polic}</p>)
            })) : null}
        </div>
      </div>

    </div>
  )
}