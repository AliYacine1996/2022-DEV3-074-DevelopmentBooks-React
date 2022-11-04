import React from "react";
import BookImages from "./book-images/book-images"
import {Book} from "../../shared/model/book";
import Content from "./content/content";

type BookState = {
    books: Book[];
}

class Homepage extends React.Component<any, BookState> {

    componentDidMount() {
        fetch('http://localhost:8181/books').then((response) => response.json()).then(booksList => {
            this.setState({books: booksList});
        });
    }

    render() {
        if(this.state){
            const imageUrls = this.state && this.state.books.map(book => book.imageUrl)
            const bookse = {books:this.state.books}
            return (
                <div>
                    <BookImages images={imageUrls}></BookImages>
                    <Content  {... bookse}> </Content>
                </div>);
        }
            return undefined;


    }

}
export default Homepage