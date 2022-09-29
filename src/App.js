import './App.css';
import Menu from './Menu';
import List from './List';
import React from 'react';
//import { query } from 'express';
class App extends React.Component {
  
  constructor(props)
  {
    super(props);
    this.state={
      books:[
        {id:0, rating: 3, title: 'Harry Potter y el caliz de fuego', image: 'libro01.jpg'},
        {id:1, rating: 3, title: 'The shining', image: 'libro02.jpg'},
        {id:2, rating: 4, title: 'El código Da Vinci', image: 'libro03.jpg'},
        {id:3, rating: 5, title: 'El principito', image: 'libro04.jpg'},
        {id:4, rating: 3, title: 'Sobrenatural', image: 'libro05.jpg'},
        {id:5, rating: 5, title: 'El señor de los anillos', image: 'libro06.jpg'},
        {id:6, rating: 5, title: 'El perfume, Historia de un asesino', image: 'libro07.jpg'},
        {id:7, rating: 4, title: 'An orphan in the snow', image: 'libro08.jpg'},
        {id:8, rating: 4, title: 'Cold silence', image: 'libro09.jpg'},
        {id:9, rating: 5, title: 'Don quixote', image: 'libro10.jpg'}

      ], 
      copyBooks:[]
    };
  }

  componentDidMount(){
    this.initBooks();
  }
  initBooks=()=>{
    this.setState((state,props)=>({
      copyBooks:[...state.books]
    }));
  }

  onAdd=(item)=>{
    let temp=[...this.state.books];
    const id=temp[temp.length-1].id + 1;
    item['id']=id;
    temp.push(item);
    
    this.setState({books:[... temp]});

    this.initBooks();
  }
   onSearch=(query)=>{
    if(query==''){
      this.initBooks();
    }
    else{
      const temp=[...this.state.books];
      let res=[];
      
      temp.forEach(item=>{
        if(item.title.toLowerCase().indexOf(query)>-1){
          res.push(item);
        }
      });
      this.setState({copyBooks:[...res]});
    }
   }

   onUpdateRating=(item) =>{
      var temp=[...this.state.books];
      const index= temp.findIndex(x=> x.id==item.id);
      
      temp[index].title=item.title;
      temp[index].image=item.image;
      temp[index].rating=item.rating;

      this.setState({books:[...temp]});
      this.initBooks();

   }
   onRemove=(id)=>{
    var temp=[...this.state.books];
    const res=temp.filter(item=>item.id!=id);
    this.setState({books: [...res]});
    this.initBooks();
   }
  render() {
    return(
    <div className="App">
      <Menu title="booksapp" onadd={this.onAdd} onsearch={this.onSearch}/>
      <List 
      items={this.state.copyBooks} 
      onupdaterating={this.onUpdateRating} 
      onremove={this.onRemove}
      />
    </div>
    );
  }
}
export default App;
