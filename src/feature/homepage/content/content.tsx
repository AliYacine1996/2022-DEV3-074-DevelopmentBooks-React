import React from "react";
import {Book} from "../../../shared/model/book";
import {ShoppingCart} from "../../../shared/model/shopping-cart";

type BookProps = {
    books: Book[];
}

class Content extends React.Component<BookProps, ShoppingCart> {
    constructor(props:BookProps) {
        super(props);
        this.state = {
            bookCart: new Map()
        }
    }
    render() {

        if(this.state){

            return (
                <div>
                    {this.props.books.map((book,index)=> {
                        return (<div key={index}>
                        <span>
                            {book.id} - {book.title} - {book.author} - {book.year} - {book.price}€
                        </span>
                            <button onClick={()=>this.addToCart(book)}>Add </button>
                            <span> {this.getNbOfBookSelectedById(book.id)} </span>
                            <button onClick={()=>this.removeToCart(book)}>Remove </button>
                        </div>)
                    })}
                    <div>
                        <button onClick={()=>this.calculateTotalPrice()}>Calcul Total </button>
                        {
                            this.state.totalPrice && (<div>
                            Total : {this.state.totalPrice}
                            </div>)
                        }
                    </div>
                </div>);
        }
        return undefined;
    }
    addToCart(book:Book):void{

       const bookCart = this.state.bookCart;
        if(bookCart.has(book.id)){
            bookCart.set(book.id,bookCart.get(book.id)!+1)
        }else{
            bookCart.set(book.id,1);
        }
        this.setState({bookCart})
    }
    removeToCart(book:Book):void{
        const bookCart = this.state.bookCart;
        if(bookCart.has(book.id) && bookCart.get(book.id)!>0){
            bookCart.set(book.id,bookCart.get(book.id)!-1)
        }else{
            bookCart.delete(book.id)
        }
        this.setState({bookCart})
    }
    getNbOfBookSelectedById(bookId:string):number{
        return this.state.bookCart.has(bookId) ? this.state.bookCart.get(bookId)! : 0
    }
    calculateTotalPrice():void{

       const body = this.props.books.filter(book =>
            this.state.bookCart.has(book.id)
        ).map(book => {
            return {
                bookId:book.id,
                count:this.state.bookCart.get(book.id)
            }
        })
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)};
        fetch('http://localhost:8181/books/calculateTotal',requestOptions).then((response) => response.json()).then(totalPrice => {
            this.setState({...this.state, totalPrice,bookCart:new Map()});
        });
    }
}

export default Content