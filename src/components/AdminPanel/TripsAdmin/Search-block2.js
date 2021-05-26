import React ,{Component} from 'react';
import Search from './search'
class SearchBlock2 extends Component{
    constructor(props){
        super()
        this.handleChange = this.handleChange.bind(this);
        this.state=props.data

    }
        
     handleChange = (e) => {
        e.preventDefault();
        
        localStorage.setItem('search', e.target.value);

      }
       handelResulCount(){
        if (this.state.count>0){
            return this.state.count+"عدد نتائج البحث هو"
        }
      }
    
    render(){
        localStorage.setItem('select', false); 
        localStorage.setItem(this.state.chkId, false)
        localStorage.setItem('search','');
        const fildsTrips = this.state.map(column=><Search key={column.id} column={column}/>)
        return(
            <form>
               
                <input onChange={this.handleChange} id='search-faild' type='text' className='search-faild'/>
                <input class='btn-search' type="submit" value=" بحث "/>
                <div className='colm-3'>
                </div>
                <div className='custom-search'>
                    {fildsTrips}
                </div>

                <h6>{this.handelResulCount} </h6>
            </form>
        )
    }
}
export default SearchBlock2