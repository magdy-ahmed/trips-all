import React ,{Component} from 'react';
import Search from './search'
class SearchBlock extends Component{
    constructor(props){
        super()
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeMin = this.handleChangeMin.bind(this);
        this.handleChangeMax = this.handleChangeMax.bind(this);
        this.decimalAdjust = this.decimalAdjust.bind(this);
        this.handlerangefrom = this.handlerangefrom.bind(this);
        this.handlerangeto = this.handlerangeto.bind(this);
        this.handlegroup = this.handlegroup.bind(this);
        this.handleprice = this.handleprice.bind(this);

        this.state={
            data1:props.data,
            data2:[{
                id:6,
                chkId:'price',
                name:'الأجمالى',
            },{
                id:7,
                chkId:'deposit',
                name:'العربون',
            },{
                id:8,
                chkId:'price_no_doposit',
                name:'الأجمالى بدون عربون',
            }],
            curency:'ريال يمنى',
            count:props.count
        }
        

    }
     
decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }
  floor10 = (value, exp) => this.decimalAdjust('floor', value, exp);
  round10 = (value, exp) => this.decimalAdjust('round', value, exp);   
    handleprice(level,value,curency='ريال يمنى'){
        if (curency == 'ريال سعودى'){

        let amount = this.round10(parseInt(value),-1)        
        localStorage.setItem(level, amount);
        console.log(localStorage.getItem(level))
        }
        else{
        let amount = this.round10(parseInt(value)/ 66.76,-1)        
        localStorage.setItem(level, amount);
        console.log(localStorage.getItem(level))
    }}
  handleChange = (e) => {
        e.preventDefault();
        
        localStorage.setItem('search', e.target.value);

      }
      handleChangeMin = (e) => {
        e.preventDefault();
        this.handleprice('min',e.target.value,document.getElementById('select').value)

      }
      handleChangeMax = (e) => {
        e.preventDefault();
        this.handleprice('max',e.target.value,document.getElementById('select').value)

      }
       handelResulCount(){
        if (this.state.count>0){
            return this.state.count+"عدد نتائج البحث هو"
        }
      }
      handlerangefrom =(e)=>{
        e.preventDefault();
        this.handleprice('min',e.target.value,document.getElementById('select').value)
        console.log(localStorage.getItem('min'))
        document.getElementById('price-from').value = e.target.value
      }

      handlerangeto =(e)=>{
        e.preventDefault();
        this.handleprice('max',e.target.value,document.getElementById('select').value)
        console.log(localStorage.getItem('max'))
        document.getElementById('price-to').value = e.target.value
      }

      handlegroup =(e)=>{
        e.preventDefault();

        // let curency = e.target.options[ e.target.selectedIndex ].value 
    this.setState({curency: e.target.value})

    }
    render(){
        localStorage.setItem('select', false); 
        localStorage.setItem(this.state.chkId, false)
        localStorage.setItem('search','');
        localStorage.setItem('min',0);
        localStorage.setItem('max',10000000);
        console.log(this.state.count)
        const fildsTrips1 = this.state.data1.map(column=><Search key={column.id} column={column}/>)
        const fildsTrips2 = this.state.data2.map(column=><Search key={column.id} column={column}/>)

        return(
            <form>
               
                <input placeholder='كلمة البحث' onChange={this.handleChange} id='search-faild' type='text' className='search-faild'/>
                <input  class='btn-search' type="submit" value=" بحث "/>
                <div className='colm-3'>
                </div>
                <div className='custom-search'>
                    {fildsTrips1}
                </div>

              
            </form>
        )
    }
}
export default SearchBlock