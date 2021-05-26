import React ,{Component} from 'react'
import Search from './search'
import { useState, useEffect } from 'react';

class SearchTrips extends Component{
    constructor(){
        super()
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        const data =''
        this.state={
            value:'',
            columns:[{
                id:1,
                chkId:'order-id',
                name:'Order Id',
            },{
                id:2,
                chkId:'city1',
                name:'مدينة الصعود',
            },{
                id:3,
                chkId:'city2',
                name:'مدينة الهبوط',
            },{
                id:4,
                chkId:'day',
                name:'اليوم',
            },{
                id:5,
                chkId:'date',
                name:'التاريخ',
            },{
                id:6,
                chkId:'tickets',
                name:'عدد التذاكر',
            },{
                id:7,
                chkId:'babies',
                name:'عدد الرضع',
            },{
                id:8,
                chkId:'children',
                name:'عدد الأطفال',
            },{
                id:9,
                chkId:'adults',
                name:'عدد البالغين',
            },{
                id:10,
                chkId:'nots',
                name:'ملاحظات أضافية',
            },{
                id:11,
                chkId:'offer',
                name:'أضافة عرض',
            },]

        }

    }
    
 
    handleChange(event) {    this.setState({value: event.target.value});  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

    render(){
        const filds = this.state.columns.map(column=><Search key={column.id} column={column}/>)
        return(
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} value={this.state.value} id='search-faild' type='text' className='search-faild'/>
                <input class='btn-search' type="submit" value="Submit"/>
                <div className='colm-3'>
            <input   className= 'chk-search' id='chk-all' type='checkbox'/>
            <label style={{'padding-right':'5px'}} className='lbl-search' for='chk-all'> الكل</label>
        </div>
                <div className='custom-search'>
            {filds}
            </div>
            </form>
        );
    }
}
export default SearchTrips 

